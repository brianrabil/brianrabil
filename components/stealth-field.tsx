"use client";

import { STEALTH_FIELD_WGSL } from "@/components/stealth-field.wgsl";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
	type Effect,
	type Frame,
	type FrameLoopHandle,
	type Gpu,
	type Surface,
	effect,
	frame,
	frameLoop,
	init,
	surface,
} from "vgpu";

type Variant = "hero" | "band" | "full";

const MODE: Record<Variant, number> = { hero: 0, band: 1, full: 2 };

const STILL_TIME = 7;

// CSS fallback masks mirror the shader's region mask per variant.
const FALLBACK_MASK: Record<Variant, string> = {
	hero: "linear-gradient(to right, rgb(0 0 0 / 0.14) 8%, #000 72%), linear-gradient(to bottom, transparent, #000 12%, #000 78%, transparent)",
	band: "linear-gradient(to right, rgb(0 0 0 / 0.08) 25%, #000 90%), linear-gradient(to bottom, transparent, #000 20%, #000 70%, transparent)",
	full: "radial-gradient(ellipse at center, rgb(0 0 0 / 0.35) 15%, #000 70%), linear-gradient(to bottom, #000 85%, transparent)",
};

const THEME = {
	dark: { ink: [0.93, 0.93, 0.93, 1] as const, intensity: 0.75 },
	light: { ink: [0.08, 0.08, 0.08, 1] as const, intensity: 0.6 },
};

/** Stable [0, 1) float from a string, so each page gets its own lattice offset. */
function hashSeed(value: string) {
	let hash = 2166136261;
	for (let index = 0; index < value.length; index++) {
		hash ^= value.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0) / 4294967296;
}

/**
 * Instrument field behind a hero or header, rendered with vgpu (WebGPU).
 * Decorative: a CSS crosshair grid stands in until the first GPU frame, and stays
 * when WebGPU is unavailable. Pauses off-screen and in hidden tabs; draws one
 * still frame under reduced motion or on low-end devices.
 */
export function StealthField({
	variant,
	seed = "brianrabil",
	className,
}: {
	variant: Variant;
	seed?: string;
	className?: string;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [ready, setReady] = useState(false);

	// The hero's entrance plays once per page load; mark it seen after it finishes.
	useEffect(() => {
		if (variant !== "hero") return;
		const timer = window.setTimeout(() => {
			document.documentElement.dataset.heroSeen = "";
		}, 1400);
		return () => window.clearTimeout(timer);
	}, [variant]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || typeof navigator === "undefined" || !navigator.gpu) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const nav = navigator as Navigator & { deviceMemory?: number };
		const lowEnd =
			(nav.hardwareConcurrency ?? 8) < 4 || (nav.deviceMemory ?? 8) < 4;
		const still = reducedMotion || lowEnd;
		const finePointer = window.matchMedia(
			"(hover: hover) and (pointer: fine)",
		).matches;
		const seedValue = hashSeed(seed);

		let disposed = false;
		let gpu: Gpu | undefined;
		let target: Surface | undefined;
		let fx: Effect | undefined;
		let loop: FrameLoopHandle | undefined;
		let onScreen = true;
		let time = STILL_TIME;
		let lastTick = 0;
		let stillRequest = 0;
		let isDark = document.documentElement.classList.contains("dark");

		// Pointer in physical pixels, top-left origin (matches the effect's uv).
		const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, lens: 0, tlens: 0 };
		let rect = canvas.getBoundingClientRect();

		function params() {
			const theme = isDark ? THEME.dark : THEME.light;
			return {
				ink: theme.ink,
				resolution: target?.size ?? [1, 1],
				pointer: [pointer.x, pointer.y] as const,
				time,
				lens: pointer.lens,
				intensity: theme.intensity,
				seed: seedValue,
				mode: MODE[variant],
				dpr: target?.dpr ?? 1,
			};
		}

		function draw(current: Frame) {
			if (!target || !fx) return;
			fx.set({ params: params() });
			current.pass(target, fx);
		}

		function renderStill() {
			if (!gpu || disposed) return;
			frame(gpu, draw);
		}

		function requestStill() {
			cancelAnimationFrame(stillRequest);
			stillRequest = requestAnimationFrame(renderStill);
		}

		function play() {
			if (!gpu || still || loop || !onScreen || document.hidden || disposed)
				return;
			lastTick = performance.now();
			loop = frameLoop(gpu, (current) => {
				const now = performance.now();
				time += Math.min(now - lastTick, 100) / 1000;
				lastTick = now;
				pointer.x += (pointer.tx - pointer.x) * 0.1;
				pointer.y += (pointer.ty - pointer.y) * 0.1;
				pointer.lens += (pointer.tlens - pointer.lens) * 0.08;
				draw(current);
			});
		}

		function pause() {
			loop?.stop();
			loop = undefined;
		}

		function onPointerMove(event: PointerEvent) {
			if (event.pointerType !== "mouse") return;
			const dpr = target?.dpr ?? 1;
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
			pointer.tx = x * dpr;
			pointer.ty = y * dpr;
			pointer.tlens = inside ? 1 : 0;
			if (pointer.x < -9000) {
				pointer.x = pointer.tx;
				pointer.y = pointer.ty;
			}
		}

		function onScroll() {
			rect = canvas?.getBoundingClientRect() ?? rect;
		}

		function onVisibility() {
			if (document.hidden) pause();
			else play();
		}

		const themeObserver = new MutationObserver(() => {
			isDark = document.documentElement.classList.contains("dark");
			if (still) requestStill();
		});

		const resizeObserver = new ResizeObserver(() => {
			rect = canvas.getBoundingClientRect();
			if (still) requestStill();
		});

		const intersectionObserver = new IntersectionObserver(([entry]) => {
			onScreen = entry.isIntersecting;
			if (onScreen) play();
			else pause();
		});

		void (async () => {
			try {
				gpu = await init();
			} catch {
				return; // No usable adapter: the CSS field stays.
			}
			if (disposed) {
				gpu.dispose();
				return;
			}
			try {
				target = surface(gpu, canvas, {
					dpr: [1, 1.5],
					alphaMode: "premultiplied",
					clearColor: [0, 0, 0, 0],
					label: `stealth-field-${variant}`,
				});
				fx = effect(gpu, STEALTH_FIELD_WGSL, {
					label: "stealth-field",
					blend: "premultiplied",
					set: { params: params() },
				});
				await fx.compile({ colors: [target.format], sampleCount: 1 });
			} catch {
				gpu.dispose();
				gpu = undefined;
				return;
			}
			if (disposed) return;

			themeObserver.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["class"],
			});
			resizeObserver.observe(canvas);
			intersectionObserver.observe(canvas);
			document.addEventListener("visibilitychange", onVisibility);
			if (finePointer && !still) {
				window.addEventListener("pointermove", onPointerMove, {
					passive: true,
				});
				window.addEventListener("scroll", onScroll, { passive: true });
			}

			// Draw the first frame now so the canvas fades in with content, then animate.
			renderStill();
			play();
			setReady(true);
		})();

		return () => {
			disposed = true;
			cancelAnimationFrame(stillRequest);
			pause();
			themeObserver.disconnect();
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			document.removeEventListener("visibilitychange", onVisibility);
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("scroll", onScroll);
			gpu?.dispose();
		};
	}, [variant, seed]);

	return (
		<div
			aria-hidden="true"
			className={cn("pointer-events-none absolute inset-0", className)}
		>
			<div
				className={cn(
					"absolute inset-0 transition-opacity duration-700 ease-out-expo",
					ready ? "opacity-0" : "opacity-100",
				)}
				style={{
					backgroundImage:
						"linear-gradient(color-mix(in oklab, var(--fg) 14%, transparent), color-mix(in oklab, var(--fg) 14%, transparent)), linear-gradient(color-mix(in oklab, var(--fg) 14%, transparent), color-mix(in oklab, var(--fg) 14%, transparent))",
					backgroundSize: "5px 1px, 1px 5px",
					backgroundPosition: "11.5px 14px, 14px 11.5px",
					backgroundRepeat: "repeat",
					maskImage: FALLBACK_MASK[variant],
					maskComposite: "intersect",
					WebkitMaskImage: FALLBACK_MASK[variant],
					WebkitMaskComposite: "source-in",
				}}
			/>
			<canvas
				ref={canvasRef}
				className={cn(
					"absolute inset-0 size-full transition-opacity duration-700 ease-out-expo",
					ready ? "opacity-100" : "opacity-0",
				)}
			/>
		</div>
	);
}
