"use client";

/**
 * Hyperpost's set piece: the posting interface. Four agent lanes on the left
 * write, review, schedule, and publish posts, each changing in place; on the
 * right the posting timeline streams every post in the fleet past the now
 * line. Both read one seeded replay, so a lane's post and its bars always
 * agree. Decorative: it sits inside the card's link and is hidden from
 * assistive tech. Runs only while on screen in a visible tab, holds one still
 * frame under reduced motion or on low-end devices, draws on the page's
 * shared vgpu device, and falls back to Canvas 2D without WebGPU.
 *
 * Owns the failure where a missing or broken GPU would leave the card blank:
 * every engine failure is a typed result that falls through to the next.
 */

import { acquireGpu, releaseGpu } from "@/components/gpu/shared-gpu";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
	assert,
	LANE_ROLES,
	type LaneState,
	REPLAY_SEED,
	laneStatesAt,
	planPostingReplay,
} from "./posting-replay";
import {
	type Composed,
	type Engine,
	type FrameSource,
	MAX_QUADS,
	MAX_TICKS,
	QUAD_FLOATS,
	TIMELINE_HEIGHT_PX,
	type TimelineSize,
	composeTimeline,
	readPalette,
	start2dEngine,
	startGpuEngine,
} from "./posting-timeline";

// ---------------------------------------------------------------- limits

/** Lane text is not motion; it changes at most this often. */
const LANE_UPDATE_INTERVAL_S = 1 / 30;
/** Tick labels this close to the now label are hidden so they never overlap it. */
const NOW_LABEL_CLEAR_PX = 34;
/** Tick labels this close to the right edge are hidden rather than clipped. */
const RIGHT_EDGE_CLEAR_PX = 30;
const TICK_LABEL_OFFSET_PX = 4;
const MAX_DPR = 2;

const PLAN = planPostingReplay(REPLAY_SEED);

/**
 * The still frame, and where the live replay starts: the editor backing off
 * after a failed link check, with its amber line on the timeline, while the
 * writer drafts the next post.
 */
const STILL_REPLAY_S =
	PLAN.loop_s + (PLAN.featured[3]?.review[0]?.end_s ?? 0) + 0.12;
const STILL_LANES = laneStatesAt(PLAN, STILL_REPLAY_S, true);

// ---------------------------------------------------------------- types

/** The DOM nodes one lane writes into. */
type LaneElements = {
	root: HTMLElement;
	glyph: HTMLElement;
	action: HTMLElement;
	text: HTMLElement;
	caret: HTMLElement;
	combo: HTMLElement;
};

// ---------------------------------------------------------------- component

export function HyperpostPosting({ className }: { className?: string }) {
	const rootRef = useRef<HTMLDivElement>(null);
	const lanesRef = useRef<HTMLDivElement>(null);
	const canvasHostRef = useRef<HTMLDivElement>(null);
	const ticksRef = useRef<HTMLDivElement>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const root = rootRef.current;
		const lanesBox = lanesRef.current;
		const canvasHost = canvasHostRef.current;
		const ticksBox = ticksRef.current;
		if (!root || !lanesBox || !canvasHost || !ticksBox) return;

		const reduced_motion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const nav = navigator as Navigator & { deviceMemory?: number };
		const is_low_end =
			(nav.hardwareConcurrency ?? 8) < 4 || (nav.deviceMemory ?? 8) < 4;
		const is_still = reduced_motion || is_low_end;
		const lanes = readLaneElements(lanesBox);
		const tickLabels = Array.from(ticksBox.children).filter(
			(child): child is HTMLElement => child instanceof HTMLElement,
		);
		assert(tickLabels.length === MAX_TICKS, "one label per possible tick");

		const quads = new Float32Array(MAX_QUADS * QUAD_FLOATS);
		const written = STILL_LANES.map((lane) => ({ ...lane }));
		let replay_s = STILL_REPLAY_S;
		let since_lanes_s = Number.POSITIVE_INFINITY;
		let size = measure(canvasHost);
		let palette = readPalette(canvasHost);
		let engine: Engine | undefined;
		let stop: (() => void) | undefined;
		let is_on_screen = false;
		let is_disposed = false;
		let has_gpu_ref = false;
		let still_request = 0;

		function placeTicks(composed: Composed) {
			tickLabels.forEach((label, index) => {
				const tick = composed.ticks[index];
				const is_shown =
					tick !== undefined &&
					Math.abs(tick.x - composed.now_x) >= NOW_LABEL_CLEAR_PX &&
					tick.x + RIGHT_EDGE_CLEAR_PX <= size.width;
				if (label.hidden === is_shown) label.hidden = !is_shown;
				if (!tick || !is_shown) return;
				if (label.textContent !== tick.label) label.textContent = tick.label;
				label.style.transform = `translateX(${tick.x + TICK_LABEL_OFFSET_PX}px)`;
			});
		}

		function writeLanes(states: readonly LaneState[]) {
			assert(states.length === lanes.length, "one state per lane element");
			states.forEach((state, index) => {
				const element = lanes[index];
				const last = written[index];
				assert(element !== undefined && last !== undefined, "lane exists");
				if (last.glyph !== state.glyph) element.glyph.textContent = state.glyph;
				if (last.action !== state.action)
					element.action.textContent = state.action;
				if (last.text !== state.text) element.text.textContent = state.text;
				if (last.is_typing !== state.is_typing)
					element.caret.hidden = !state.is_typing;
				if (last.is_idle !== state.is_idle)
					element.root.dataset.idle = String(state.is_idle);
				if (last.combo !== state.combo) {
					element.combo.hidden = state.combo < 2;
					element.combo.textContent = `×${state.combo}`;
				}
				written[index] = state;
			});
		}

		const source: FrameSource = (dt_s) => {
			if (!is_still) replay_s += dt_s;
			const composed = composeFrame();
			since_lanes_s += dt_s;
			if (dt_s === 0 || since_lanes_s >= LANE_UPDATE_INTERVAL_S) {
				since_lanes_s = 0;
				writeLanes(laneStatesAt(PLAN, replay_s, is_still));
			}
			return { composed, quads, size };
		};

		function composeFrame() {
			const composed = composeTimeline(PLAN, replay_s, size, palette, quads);
			placeTicks(composed);
			return composed;
		}

		function play() {
			if (!engine || is_still || stop || !is_on_screen) return;
			if (document.hidden || is_disposed) return;
			stop = engine.play();
		}

		function pause() {
			stop?.();
			stop = undefined;
		}

		// A paused or still timeline repaints once on layout and theme changes.
		function requestStill() {
			cancelAnimationFrame(still_request);
			still_request = requestAnimationFrame(() => {
				if (!is_disposed && !stop) engine?.paintStill();
			});
		}

		function onVisibility() {
			if (document.hidden) pause();
			else play();
		}

		function addCanvas() {
			const canvas = document.createElement("canvas");
			canvas.className = "absolute inset-0 size-full";
			canvasHost?.append(canvas);
			return canvas;
		}

		async function chooseEngine(): Promise<Engine | undefined> {
			if (navigator.gpu) {
				has_gpu_ref = true;
				const gpu = await acquireGpu().then(
					(device) => device,
					// No usable adapter is an expected outcome: Canvas 2D takes over.
					() => undefined,
				);
				if (is_disposed) return undefined;
				if (gpu) {
					const canvas = addCanvas();
					const result = await startGpuEngine(gpu, canvas, source);
					if (result.kind === "ready") return result.engine;
					canvas.remove();
				}
			}
			if (is_disposed) return undefined;
			const canvas = addCanvas();
			const result = start2dEngine(canvas, source);
			if (result.kind === "ready") return result.engine;
			canvas.remove();
			return undefined;
		}

		const resizeObserver = new ResizeObserver(() => {
			size = measure(canvasHost);
			requestStill();
		});
		const themeObserver = new MutationObserver(() => {
			palette = readPalette(canvasHost);
			requestStill();
		});
		const intersectionObserver = new IntersectionObserver(([entry]) => {
			is_on_screen = entry?.isIntersecting ?? false;
			if (is_on_screen) play();
			else pause();
		});

		void chooseEngine().then((chosen) => {
			if (is_disposed) {
				chosen?.dispose();
				return;
			}
			// With no engine at all, the lanes still show the still frame.
			if (!chosen) return;
			engine = chosen;
			root.dataset.engine = chosen.kind;
			resizeObserver.observe(canvasHost);
			themeObserver.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["class"],
			});
			intersectionObserver.observe(root);
			document.addEventListener("visibilitychange", onVisibility);
			chosen.paintStill();
			play();
			setReady(true);
		});

		return () => {
			is_disposed = true;
			cancelAnimationFrame(still_request);
			pause();
			resizeObserver.disconnect();
			themeObserver.disconnect();
			intersectionObserver.disconnect();
			document.removeEventListener("visibilitychange", onVisibility);
			engine?.dispose();
			engine = undefined;
			canvasHost.replaceChildren();
			if (has_gpu_ref) releaseGpu();
		};
	}, []);

	return (
		<div
			ref={rootRef}
			aria-hidden="true"
			className={cn(
				"grid border-t border-line lg:grid-cols-[24rem_minmax(0,1fr)]",
				className,
			)}
		>
			<div
				ref={lanesRef}
				className="flex flex-col justify-between gap-3 px-6 py-5 sm:px-10 lg:pr-6"
			>
				{LANE_ROLES.map((role, index) => (
					<Lane key={role} role={role} state={STILL_LANES[index]} />
				))}
			</div>
			<div className="min-w-0 border-t border-line pt-3 pb-4 lg:border-t-0 lg:border-l">
				<div
					className="relative overflow-hidden"
					style={{ height: TIMELINE_HEIGHT_PX }}
				>
					<div
						ref={canvasHostRef}
						className={cn(
							"absolute inset-0 transition-opacity duration-700 ease-out-expo",
							ready ? "opacity-100" : "opacity-0",
						)}
					/>
					<div ref={ticksRef} className="absolute inset-x-0 top-0">
						{Array.from({ length: MAX_TICKS }, (_, index) => (
							<span
								// Positional slots in a fixed pool; they never reorder.
								// biome-ignore lint/suspicious/noArrayIndexKey: fixed pool
								key={index}
								hidden
								className="absolute top-0 left-0 text-[10px] leading-4 tabular-nums text-fg-3 will-change-transform"
							/>
						))}
					</div>
					<span className="absolute top-0 left-[80%] translate-x-1 text-[10px] leading-4 text-fg-2">
						now
					</span>
				</div>
				<div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-6 pt-3 text-[11px] leading-4 text-fg-3 sm:px-10 lg:px-4">
					<Swatch className="bg-success/60" label="running" />
					<Swatch className="bg-fg-3/50" label="done" />
					<Swatch className="bg-warning/80" label="retry" />
					<Swatch className="bg-danger/75" label="failed" />
					<span className="ml-auto">Simulated replay</span>
				</div>
			</div>
		</div>
	);
}

/** One agent: a glyph, its role and action, and the line it is working on. */
function Lane({ role, state }: { role: string; state: LaneState | undefined }) {
	assert(state !== undefined, "every lane has a still state");
	return (
		<div
			data-lane=""
			data-idle={String(state.is_idle)}
			className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 transition-opacity duration-300 ease-out-expo data-[idle=true]:opacity-50"
		>
			{/* Mono only here: the glyph frames need fixed-width cells to hold still. */}
			<span
				data-glyph=""
				className="whitespace-pre font-mono text-[12px] leading-5 text-fg-2"
			>
				{state.glyph}
			</span>
			<div className="min-w-0">
				<p className="flex items-baseline gap-2 text-[13px] leading-5">
					<span className="shrink-0 font-medium text-fg">{role}</span>
					<span data-action="" className="truncate text-fg-3">
						{state.action}
					</span>
					<span
						data-combo=""
						hidden={state.combo < 2}
						className="ml-auto shrink-0 tabular-nums text-fg-3"
					>
						×{state.combo}
					</span>
				</p>
				<p className="line-clamp-2 h-10 text-[13px] leading-5 text-fg-2">
					<span data-text="">{state.text}</span>
					<span
						data-caret=""
						hidden={!state.is_typing}
						className="ml-px inline-block h-[0.95em] w-[0.45em] translate-y-[0.12em] bg-fg-3"
					/>
				</p>
			</div>
		</div>
	);
}

function Swatch({ className, label }: { className: string; label: string }) {
	return (
		<span className="inline-flex items-center gap-1.5">
			<span className={cn("h-1.5 w-3 rounded-[1px]", className)} />
			{label}
		</span>
	);
}

// ---------------------------------------------------------------- edges

function readLaneElements(box: HTMLElement): LaneElements[] {
	const roots = Array.from(box.querySelectorAll<HTMLElement>("[data-lane]"));
	assert(roots.length === LANE_ROLES.length, "one element per lane");
	return roots.map((root) => {
		const find = (name: string) => {
			const found = root.querySelector<HTMLElement>(`[data-${name}]`);
			assert(found !== null, `lane has a ${name} slot`);
			return found;
		};
		return {
			root,
			glyph: find("glyph"),
			action: find("action"),
			text: find("text"),
			caret: find("caret"),
			combo: find("combo"),
		};
	});
}

function measure(element: HTMLElement): TimelineSize {
	return {
		width: Math.max(element.clientWidth, 1),
		height: Math.max(element.clientHeight, 1),
		dpr: Math.min(window.devicePixelRatio, MAX_DPR),
	};
}
