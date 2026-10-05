import {
	type Frame,
	type FrameLoopHandle,
	type Gpu,
	frame,
	frameLoop,
	init,
} from "vgpu";

/** Draws one canvas inside a shared frame. `dt` is seconds since the last frame (0 for stills). */
export type Painter = (current: Frame, dt: number) => void;

let gpu: Gpu | undefined;
let pending: Promise<Gpu> | undefined;
let refs = 0;
let disposeTimer: number | undefined;
let loop: FrameLoopHandle | undefined;
let lastTick = 0;
const painters = new Set<Painter>();

function scheduleDispose() {
	window.clearTimeout(disposeTimer);
	// Deferred so a remount (StrictMode, fast navigation) reuses the device.
	disposeTimer = window.setTimeout(() => {
		if (refs > 0 || !gpu) return;
		loop?.stop();
		loop = undefined;
		painters.clear();
		gpu.dispose();
		gpu = undefined;
	}, 1000);
}

/**
 * One vgpu device for every decorative canvas on the page, counted by
 * reference. Every call must be paired with `releaseGpu()`, including when
 * the returned promise rejects (no WebGPU adapter).
 */
export function acquireGpu(): Promise<Gpu> {
	refs += 1;
	window.clearTimeout(disposeTimer);
	if (gpu && !gpu.disposed) return Promise.resolve(gpu);
	pending ??= init().then(
		(created) => {
			pending = undefined;
			gpu = created;
			if (refs === 0) scheduleDispose();
			return created;
		},
		(error: unknown) => {
			pending = undefined;
			throw error;
		},
	);
	return pending;
}

export function releaseGpu() {
	refs = Math.max(0, refs - 1);
	if (refs === 0) scheduleDispose();
}

/**
 * Adds a painter to the shared frame loop, which runs while any painter is
 * registered. Returns a function that removes it.
 */
export function startPainting(painter: Painter): () => void {
	painters.add(painter);
	if (!loop && gpu) {
		lastTick = performance.now();
		loop = frameLoop(gpu, (current) => {
			const now = performance.now();
			const dt = Math.min(now - lastTick, 100) / 1000;
			lastTick = now;
			for (const paint of painters) {
				try {
					paint(current, dt);
				} catch {
					// A broken canvas drops out; the others keep drawing.
					painters.delete(paint);
				}
			}
		});
	}
	return () => {
		painters.delete(painter);
		if (painters.size === 0) {
			loop?.stop();
			loop = undefined;
		}
	};
}

/** Draws a single frame outside the loop, for stills and the first frame. */
export function paintOnce(painter: Painter) {
	if (!gpu || gpu.disposed) return;
	frame(gpu, (current) => painter(current, 0));
}
