/**
 * Posting timeline. Turns the replay plan and a replay time into one list of
 * screen-space quads (grid, ruler, bars, backoff lines, the now line, muzzle
 * flashes) and draws it on the page's shared vgpu device or, without WebGPU,
 * on a Canvas 2D context. Ported from Hyperpost's fleet timeline (hyperpost
 * `apps/web/lib/fleet-timeline.ts` at 8c298548f, itself a port of the
 * zig-world devtools Gantt): a fixed scale, now pinned at 80% of the width,
 * ruler ticks on round intervals, and color as state. Changes: the scale is
 * much faster, lines are thin quads so everything is one instanced draw, and
 * each publish puts a small, dim flash on the now line.
 *
 * Owns the failure where a busy frame would overflow the instance buffer:
 * quads stop at MAX_QUADS and the overflow is counted, never written.
 */

import {
	type Painter,
	paintOnce,
	startPainting,
} from "@/components/gpu/shared-gpu";
import { type Gpu, type StorageBuffer, draw, storage, surface } from "vgpu";
import {
	assert,
	MAX_ROWS,
	type Outcome,
	type ReplayPlan,
	type Stage,
} from "./posting-replay";
import { POSTING_TIMELINE_WGSL } from "./posting-timeline.wgsl";

// ---------------------------------------------------------------- limits

/** The scale. Tuned by eye: bars leave the now line like tracer fire and stay readable. */
export const PX_PER_SECOND = 300;
/** Now sits this far across, so most of the width is history. */
export const NOW_AT = 0.8;
export const RULER_PX = 22;
export const ROW_PITCH_PX = 10;
const ROWS_TOP_GAP_PX = 6;
const ROWS_BOTTOM_GAP_PX = 6;
const BAR_PX = 5;
/** The bright leading edge of a running bar. */
const EDGE_PX = 2;
/** Space between a post's segments, so the stages read apart. */
const SEGMENT_GAP_PX = 1;
const MIN_BAR_PX = 1;
const RULER_TICK_PX = 5;
const MIN_TICK_SPACING_PX = 110;
const TICK_STEPS_S = [0.1, 0.2, 0.25, 0.5, 1, 2, 5, 10, 30, 60] as const;
export const MAX_TICKS = 16;
/** The muzzle flash: small, dim, and gone in a sixth of a second. */
const FLASH_S = 0.16;
const FLASH_RADIUS_PX = 4;
const FLASH_ALPHA = 0.5;
const MAX_FLASHES = 16;
/** Frame steps longer than this are clamped, so a stalled tab never jumps. */
export const MAX_FRAME_DT_S = 0.1;
export const MAX_QUADS = 1024;
/** rect (4), color (4), shape (4): matches the WGSL Quad. */
export const QUAD_FLOATS = 12;
const QUAD_BYTES = QUAD_FLOATS * 4;

/** The canvas height that fits every row. */
export const TIMELINE_HEIGHT_PX =
	RULER_PX + ROWS_TOP_GAP_PX + MAX_ROWS * ROW_PITCH_PX + ROWS_BOTTOM_GAP_PX;

/** Bar alpha by state. Finished stages brighten toward the publish, so a post reads as a tracer. */
const RUNNING_ALPHA = 0.55;
const DONE_ALPHA: Record<Stage, number> = {
	draft: 0.26,
	review: 0.34,
	scheduled: 0.44,
};
const OUTCOME_ALPHA: Record<Exclude<Outcome, "done">, number> = {
	retried: 0.5,
	failed: 0.75,
};
const BACKOFF_ALPHA = 0.85;
const BACKOFF_AHEAD_ALPHA = 0.3;
const NOW_ALPHA = 0.4;

// ---------------------------------------------------------------- types

type Rgba = readonly [number, number, number, number];

/** Token colors read from the page, as 0–1 RGBA. */
export type Palette = {
	running: Rgba;
	edge: Rgba;
	done: Rgba;
	failed: Rgba;
	waiting: Rgba;
	ink: Rgba;
	now: Rgba;
	grid: Rgba;
	tick: Rgba;
};

/** The canvas in CSS pixels. */
export type TimelineSize = { width: number; height: number; dpr: number };

/** A ruler tick, for its DOM label. */
export type Tick = { x: number; label: string };

/** One composed frame: how many quads were written and the ruler to label. */
export type Composed = {
	quad_count: number;
	dropped_quads: number;
	ticks: readonly Tick[];
	now_x: number;
};

/** A drawing backend: the shared vgpu device, or Canvas 2D. */
export type Engine = {
	kind: "gpu" | "2d";
	/** Starts the loop; returns the function that stops it. */
	play(): () => void;
	paintStill(): void;
	dispose(): void;
};

/** Called once per drawn frame with the clamped step; fills `quads` and reports. */
export type FrameSource = (dt_s: number) => {
	composed: Composed;
	quads: Float32Array;
	size: TimelineSize;
};

export type EngineResult =
	| { kind: "ready"; engine: Engine }
	| { kind: "no_2d_context" }
	| { kind: "gpu_setup_failed"; message: string };

// ---------------------------------------------------------------- compose

/**
 * Writes the frame at `replay_s` into `quads`, back to front: grid and
 * ruler, bars and backoff lines, now line, flashes. Pure apart from `quads`.
 */
export function composeTimeline(
	plan: ReplayPlan,
	replay_s: number,
	size: TimelineSize,
	palette: Palette,
	quads: Float32Array,
): Composed {
	assert(quads.length >= MAX_QUADS * QUAD_FLOATS, "the quad buffer fits");
	assert(Number.isFinite(replay_s), "replay time is a number");

	const { width, height, dpr } = size;
	const now_x = snap(width * NOW_AT, dpr);
	const history_s = now_x / PX_PER_SECOND;
	assert(history_s < plan.loop_s, "the window is shorter than a loop");

	let quad_count = 0;
	let dropped_quads = 0;
	const quad = (
		x: number,
		y: number,
		w: number,
		h: number,
		color: Rgba,
		alpha: number,
		shape: 0 | 1,
	) => {
		if (quad_count >= MAX_QUADS) {
			dropped_quads += 1;
			return;
		}
		const offset = quad_count * QUAD_FLOATS;
		quads[offset] = x;
		quads[offset + 1] = y;
		quads[offset + 2] = w;
		quads[offset + 3] = h;
		quads[offset + 4] = color[0];
		quads[offset + 5] = color[1];
		quads[offset + 6] = color[2];
		quads[offset + 7] = color[3] * alpha;
		quads[offset + 8] = shape;
		quads[offset + 9] = 0;
		quads[offset + 10] = 0;
		quads[offset + 11] = 0;
		quad_count += 1;
	};
	const hairline = 1 / Math.max(dpr, 1);
	const xAt = (time_s: number) => now_x + (time_s - replay_s) * PX_PER_SECOND;

	// Ruler and grid: round ticks in replay time, rolling left with it.
	const ticks: Tick[] = [];
	const step_s =
		TICK_STEPS_S.find((step) => step * PX_PER_SECOND >= MIN_TICK_SPACING_PX) ??
		TICK_STEPS_S[TICK_STEPS_S.length - 1];
	const first_tick = Math.ceil((replay_s - history_s) / step_s);
	for (let index = first_tick; ticks.length < MAX_TICKS; index += 1) {
		const tick_s = index * step_s;
		const x = snap(xAt(tick_s), dpr);
		if (x > width) break;
		quad(x, RULER_PX, hairline, height - RULER_PX, palette.grid, 1, 0);
		quad(
			x,
			RULER_PX - RULER_TICK_PX,
			hairline,
			RULER_TICK_PX,
			palette.tick,
			1,
			0,
		);
		ticks.push({ x, label: clockLabel(tick_s, step_s) });
	}
	quad(0, RULER_PX - hairline, width, hairline, palette.grid, 1, 0);

	// Bars: the current loop and the one before it, for posts that spill over.
	const rows = Math.min(
		plan.rows,
		Math.floor((height - RULER_PX - ROWS_TOP_GAP_PX) / ROW_PITCH_PX),
	);
	const loop_index = Math.floor(replay_s / plan.loop_s);
	const window_start_s = replay_s - history_s;
	let flashes = 0;
	for (const copy of [loop_index - 1, loop_index]) {
		const shift_s = copy * plan.loop_s;
		for (const post of plan.posts) {
			if (post.row >= rows) continue;
			if (post.start_s + shift_s > replay_s) continue;
			if (post.end_s + shift_s < window_start_s) continue;
			const top = RULER_PX + ROWS_TOP_GAP_PX + post.row * ROW_PITCH_PX;
			const bar_top = top + (ROW_PITCH_PX - BAR_PX) / 2;
			const center = top + ROW_PITCH_PX / 2;

			for (let index = 0; index < post.segments.length; index += 1) {
				const segment = post.segments[index];
				assert(segment !== undefined, "segment exists");
				const start_s = segment.start_s + shift_s;
				const end_s = segment.end_s + shift_s;
				if (start_s > replay_s) break;
				const is_running = end_s > replay_s;
				const x0 = Math.max(xAt(start_s), -EDGE_PX);
				const x1 = xAt(Math.min(end_s, replay_s));
				if (x1 >= 0) {
					const bar_width = Math.max(
						x1 - x0 - (is_running ? 0 : SEGMENT_GAP_PX),
						MIN_BAR_PX,
					);
					if (is_running) {
						quad(
							x0,
							bar_top,
							bar_width,
							BAR_PX,
							palette.running,
							RUNNING_ALPHA,
							0,
						);
						quad(x1 - EDGE_PX, bar_top, EDGE_PX, BAR_PX, palette.edge, 1, 0);
					} else if (segment.outcome === "done") {
						quad(
							x0,
							bar_top,
							bar_width,
							BAR_PX,
							palette.done,
							DONE_ALPHA[segment.stage],
							0,
						);
					} else {
						quad(
							x0,
							bar_top,
							bar_width,
							BAR_PX,
							// A retried attempt is amber like its backoff; only a final failure is red.
							segment.outcome === "retried" ? palette.waiting : palette.failed,
							OUTCOME_ALPHA[segment.outcome],
							0,
						);
					}
				}

				// Backoff between a retried attempt and the next: solid for time
				// waited, faint for time still to wait.
				const next = post.segments[index + 1];
				if (segment.outcome !== "retried" || !next || is_running) continue;
				const waited_x = xAt(Math.min(next.start_s + shift_s, replay_s));
				const line_y = snap(center, dpr) - hairline / 2;
				if (waited_x > Math.max(x1, 0)) {
					quad(
						x1,
						line_y,
						waited_x - x1,
						hairline,
						palette.waiting,
						BACKOFF_ALPHA,
						0,
					);
				}
				const ahead_x = xAt(next.start_s + shift_s);
				if (ahead_x > now_x) {
					quad(
						now_x,
						line_y,
						ahead_x - now_x,
						hairline,
						palette.waiting,
						BACKOFF_AHEAD_ALPHA,
						0,
					);
				}
			}

			// The muzzle flash: a small pop on the now line as the post publishes.
			if (post.published_at_s === null || flashes >= MAX_FLASHES) continue;
			const age_s = replay_s - (post.published_at_s + shift_s);
			if (age_s < 0 || age_s >= FLASH_S) continue;
			const fade = 1 - age_s / FLASH_S;
			quad(
				now_x - FLASH_RADIUS_PX,
				center - FLASH_RADIUS_PX,
				FLASH_RADIUS_PX * 2,
				FLASH_RADIUS_PX * 2,
				palette.ink,
				FLASH_ALPHA * fade * fade,
				1,
			);
			flashes += 1;
		}
	}

	quad(now_x, 0, hairline, height, palette.now, NOW_ALPHA, 0);

	assert(quad_count <= MAX_QUADS, "quads stay under the cap");
	assert(ticks.length <= MAX_TICKS, "ticks stay under the cap");
	return { quad_count, dropped_quads, ticks, now_x };
}

// ---------------------------------------------------------------- engines

/**
 * The vgpu engine: one storage buffer of quads and one instanced draw,
 * painted inside the page's shared frame loop.
 */
export async function startGpuEngine(
	gpu: Gpu,
	canvas: HTMLCanvasElement,
	source: FrameSource,
): Promise<EngineResult> {
	assert(!gpu.disposed, "the shared device is live");
	assert(canvas.isConnected, "the canvas is in the page");

	let target: ReturnType<typeof surface> | undefined;
	try {
		target = surface(gpu, canvas, {
			dpr: [1, 2],
			alphaMode: "premultiplied",
			clearColor: [0, 0, 0, 0],
			label: "hyperpost-posting",
		});
		const live = target;
		// vgpu 0.5 buffers expose destroy at runtime but not in their type.
		const buffer: StorageBuffer & { destroy?: () => void } = storage(
			gpu,
			MAX_QUADS * QUAD_BYTES,
			"read",
		);
		const quadDraw = draw(gpu, {
			shader: POSTING_TIMELINE_WGSL,
			label: "hyperpost-posting-quads",
			vertices: 6,
			blend: "premultiplied",
		});
		quadDraw.set({ quads: buffer, view: { size: [1, 1], pad: [0, 0] } });
		await quadDraw.compile({ colors: [live.format], sampleCount: 1 });

		const painter: Painter = (current, dt_s) => {
			if (live.disposed) return;
			const { composed, quads, size } = source(Math.min(dt_s, MAX_FRAME_DT_S));
			if (composed.quad_count > 0) {
				buffer.write(quads.subarray(0, composed.quad_count * QUAD_FLOATS));
			}
			quadDraw.set({
				view: {
					size: [Math.max(size.width, 1), Math.max(size.height, 1)],
					pad: [0, 0],
				},
			});
			current.pass(live, (pass) => {
				if (composed.quad_count > 0) {
					pass.draw(quadDraw, { instances: composed.quad_count });
				}
			});
		};

		const engine: Engine = {
			kind: "gpu",
			play: () => startPainting(painter),
			paintStill: () => paintOnce(painter),
			dispose: () => {
				buffer.destroy?.();
				if (!live.disposed) live.dispose();
			},
		};
		return { kind: "ready", engine };
	} catch (error) {
		if (target && !target.disposed) target.dispose();
		return {
			kind: "gpu_setup_failed",
			message: error instanceof Error ? error.message : String(error),
		};
	}
}

/** The Canvas 2D engine: the same quads, filled rect by rect, on its own frame loop. */
export function start2dEngine(
	canvas: HTMLCanvasElement,
	source: FrameSource,
): EngineResult {
	assert(canvas.isConnected, "the canvas is in the page");
	const context = canvas.getContext("2d");
	if (!context) return { kind: "no_2d_context" };

	const paint = (dt_s: number) => {
		const { composed, quads, size } = source(Math.min(dt_s, MAX_FRAME_DT_S));
		const pixel_width = Math.round(size.width * size.dpr);
		const pixel_height = Math.round(size.height * size.dpr);
		if (canvas.width !== pixel_width) canvas.width = pixel_width;
		if (canvas.height !== pixel_height) canvas.height = pixel_height;
		context.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
		context.clearRect(0, 0, size.width, size.height);
		for (let index = 0; index < composed.quad_count; index += 1) {
			fillQuad(context, quads, index * QUAD_FLOATS);
		}
	};

	const engine: Engine = {
		kind: "2d",
		play: () => {
			let request = 0;
			let last_ms = performance.now();
			const loop = (now_ms: number) => {
				paint((now_ms - last_ms) / 1000);
				last_ms = now_ms;
				request = requestAnimationFrame(loop);
			};
			request = requestAnimationFrame(loop);
			return () => cancelAnimationFrame(request);
		},
		paintStill: () => paint(0),
		dispose: () => {
			context.clearRect(0, 0, canvas.width, canvas.height);
		},
	};
	return { kind: "ready", engine };
}

// ---------------------------------------------------------------- edges

/**
 * Reads the Stealth tokens from the page as RGBA. Resolving through a 1×1
 * canvas accepts any CSS color the tokens may hold.
 */
export function readPalette(element: Element): Palette {
	const style = getComputedStyle(element);
	const probe = document.createElement("canvas");
	probe.width = 1;
	probe.height = 1;
	const context = probe.getContext("2d", { willReadFrequently: true });
	const read = (token: string): Rgba => {
		if (!context) return [0.5, 0.5, 0.5, 1];
		context.clearRect(0, 0, 1, 1);
		context.fillStyle = "#808080";
		context.fillStyle = style.getPropertyValue(token).trim();
		context.fillRect(0, 0, 1, 1);
		const [r = 128, g = 128, b = 128, a = 255] = context.getImageData(
			0,
			0,
			1,
			1,
		).data;
		return [r / 255, g / 255, b / 255, a / 255];
	};
	const running = read("--success");
	const ink = read("--fg");
	return {
		running,
		edge: mix(running, ink, 0.45),
		done: read("--fg-3"),
		failed: read("--danger"),
		waiting: read("--warning"),
		ink,
		now: read("--fg-2"),
		grid: read("--line"),
		tick: read("--line-2"),
	};
}

function fillQuad(
	context: CanvasRenderingContext2D,
	quads: Float32Array,
	offset: number,
) {
	const x = quads[offset] ?? 0;
	const y = quads[offset + 1] ?? 0;
	const w = quads[offset + 2] ?? 0;
	const h = quads[offset + 3] ?? 0;
	const r = Math.round((quads[offset + 4] ?? 0) * 255);
	const g = Math.round((quads[offset + 5] ?? 0) * 255);
	const b = Math.round((quads[offset + 6] ?? 0) * 255);
	const a = quads[offset + 7] ?? 0;
	const is_dot = (quads[offset + 8] ?? 0) > 0.5;
	if (!is_dot) {
		context.fillStyle = `rgba(${r},${g},${b},${a})`;
		context.fillRect(x, y, w, h);
		return;
	}
	const radius = w / 2;
	const gradient = context.createRadialGradient(
		x + radius,
		y + radius,
		0,
		x + radius,
		y + radius,
		radius,
	);
	gradient.addColorStop(0, `rgba(${r},${g},${b},${a})`);
	gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
	context.fillStyle = gradient;
	context.fillRect(x, y, w, h);
}

/** Replay clock as m:ss, with tenths when ticks are under a second apart. */
function clockLabel(time_s: number, step_s: number) {
	const tenths = Math.round(time_s * 10);
	const minutes = Math.floor(tenths / 600);
	const seconds = (tenths % 600) / 10;
	const digits = step_s < 1 ? 1 : 0;
	const text = seconds.toFixed(digits).padStart(digits === 1 ? 4 : 2, "0");
	return `${minutes}:${text}`;
}

/** Rounds to the device pixel grid so hairlines stay crisp. */
function snap(value: number, dpr: number) {
	return Math.round(value * dpr) / dpr;
}

function mix(a: Rgba, b: Rgba, amount: number): Rgba {
	return [
		a[0] + (b[0] - a[0]) * amount,
		a[1] + (b[1] - a[1]) * amount,
		a[2] + (b[2] - a[2]) * amount,
		1,
	];
}
