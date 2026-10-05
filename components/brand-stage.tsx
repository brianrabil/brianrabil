"use client";

import { HYPERPOST_COMET_WGSL } from "@/components/gpu/hyperpost-comet.wgsl";
import {
	type Painter,
	acquireGpu,
	paintOnce,
	releaseGpu,
	startPainting,
} from "@/components/gpu/shared-gpu";
import { VSWARM_WARP_WGSL } from "@/components/gpu/vswarm-warp.wgsl";
import { cn } from "@/lib/utils";
import {
	type CSSProperties,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { type Effect, type Surface, effect, surface } from "vgpu";

type Variant = "hyperpost" | "vswarm";

const SHADER: Record<
	Variant,
	{ wgsl: string; viewBox: readonly [number, number]; still: number }
> = {
	// Still frame: the head near the right edge with its trail behind it.
	hyperpost: { wgsl: HYPERPOST_COMET_WGSL, viewBox: [636, 72], still: 1.65 },
	vswarm: { wgsl: VSWARM_WARP_WGSL, viewBox: [344, 72], still: 3.3 },
};

const THEME = {
	dark: { ink: [0.93, 0.93, 0.93, 1] as const, intensity: 0.55 },
	light: { ink: [0.08, 0.08, 0.08, 1] as const, intensity: 0.5 },
};

// CSS stand-ins until the first GPU frame, and when WebGPU is unavailable.
const FALLBACK: Record<Variant, CSSProperties> = {
	hyperpost: {
		backgroundImage:
			"radial-gradient(circle at center, color-mix(in oklab, var(--fg) 10%, transparent) 0.6px, transparent 1.1px)",
		backgroundSize: "6px 6px",
		maskImage:
			"linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent)",
	},
	vswarm: {
		backgroundImage:
			"repeating-linear-gradient(to bottom, color-mix(in oklab, var(--fg) 14%, transparent) 0 1px, transparent 1px 4px)",
		maskImage:
			"linear-gradient(to right, #000, transparent 72px), linear-gradient(to bottom, transparent 25%, #000 45%, #000 55%, transparent 75%)",
		maskComposite: "intersect",
	},
};

/**
 * The logo stage of a flagship product card: a live vgpu shader behind the
 * lockup, drawn on the page's shared GPU device. Decorative. Runs only while
 * on screen in a visible tab, draws one still frame under reduced motion or
 * on low-end devices, and speeds up slightly while the card is hovered or
 * focused.
 */
export function BrandStage({
	variant,
	className,
	children,
}: {
	variant: Variant;
	className?: string;
	children: ReactNode;
}) {
	const stageRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const lockupRef = useRef<HTMLDivElement>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const stage = stageRef.current;
		const canvas = canvasRef.current;
		const lockupBox = lockupRef.current;
		if (!stage || !canvas || !lockupBox) return;
		if (typeof navigator === "undefined" || !navigator.gpu) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const nav = navigator as Navigator & { deviceMemory?: number };
		const lowEnd =
			(nav.hardwareConcurrency ?? 8) < 4 || (nav.deviceMemory ?? 8) < 4;
		const still = reducedMotion || lowEnd;
		const shader = SHADER[variant];
		const card: HTMLElement = stage.closest("a") ?? stage;

		let disposed = false;
		let target: Surface | undefined;
		let fx: Effect | undefined;
		let stopPainting: (() => void) | undefined;
		let onScreen = true;
		let stillRequest = 0;
		let time = shader.still;
		let isDark = document.documentElement.classList.contains("dark");
		let hover = 0;
		let hoverTarget = 0;
		// Pointer and lockup art in CSS pixels relative to the stage.
		const pointer = { x: -1e4, y: -1e4 };
		let lockup: [number, number, number, number] = [0, 0, 1, 1];

		// The visible <img> is letterboxed by its SVG viewBox; find the art inside it.
		function measure() {
			const stageRect = stage?.getBoundingClientRect();
			const img = Array.from(lockupBox?.querySelectorAll("img") ?? []).find(
				(candidate) => candidate.getBoundingClientRect().width > 0,
			);
			if (!stageRect || !img) return;
			const box = img.getBoundingClientRect();
			const [w, h] = shader.viewBox;
			const scale = Math.min(box.width / w, box.height / h);
			const x = box.left - stageRect.left + (box.width - w * scale) / 2;
			const y = box.top - stageRect.top + (box.height - h * scale) / 2;
			lockup = [x, y, x + w * scale, y + h * scale];
		}

		function params() {
			const theme = isDark ? THEME.dark : THEME.light;
			const dpr = target?.dpr ?? 1;
			return {
				ink: theme.ink,
				resolution: target?.size ?? [1, 1],
				pointer: [pointer.x * dpr, pointer.y * dpr] as const,
				lockup: lockup.map((value) => value * dpr) as [
					number,
					number,
					number,
					number,
				],
				time,
				intensity: theme.intensity,
				hover,
				dpr,
			};
		}

		const paint: Painter = (current, dt) => {
			if (!target || !fx || target.disposed) return;
			hover += (hoverTarget - hover) * Math.min(dt * 6, 1);
			time += dt * (1 + 0.5 * hover);
			fx.set({ params: params() });
			current.pass(target, fx);
		};

		function requestStill() {
			cancelAnimationFrame(stillRequest);
			stillRequest = requestAnimationFrame(() => {
				if (!disposed) paintOnce(paint);
			});
		}

		function play() {
			if (
				!fx ||
				still ||
				stopPainting ||
				!onScreen ||
				document.hidden ||
				disposed
			)
				return;
			stopPainting = startPainting(paint);
		}

		function pause() {
			stopPainting?.();
			stopPainting = undefined;
		}

		function onEnter() {
			hoverTarget = 1;
		}

		function onLeave() {
			hoverTarget = 0;
		}

		function onPointerMove(event: PointerEvent) {
			if (event.pointerType !== "mouse" || !stage) return;
			const rect = stage.getBoundingClientRect();
			pointer.x = event.clientX - rect.left;
			pointer.y = event.clientY - rect.top;
		}

		function onVisibility() {
			if (document.hidden) pause();
			else play();
		}

		// Repaint even while the loop runs, so a paused or late-loading stage never
		// keeps a frame drawn against a stale lockup position.
		function onLayout() {
			measure();
			requestStill();
		}

		const themeObserver = new MutationObserver(() => {
			isDark = document.documentElement.classList.contains("dark");
			onLayout();
		});
		const resizeObserver = new ResizeObserver(onLayout);
		const intersectionObserver = new IntersectionObserver(([entry]) => {
			onScreen = entry.isIntersecting;
			if (onScreen) play();
			else pause();
		});
		const images = Array.from(lockupBox.querySelectorAll("img"));

		const gpuReady = acquireGpu();
		void (async () => {
			let gpu: Awaited<typeof gpuReady>;
			try {
				gpu = await gpuReady;
			} catch {
				return; // No usable adapter: the CSS stand-in stays.
			}
			if (disposed) return;
			try {
				target = surface(gpu, canvas, {
					dpr: [1, 1.5],
					alphaMode: "premultiplied",
					clearColor: [0, 0, 0, 0],
					label: `brand-stage-${variant}`,
				});
				measure();
				fx = effect(gpu, shader.wgsl, {
					label: `brand-stage-${variant}`,
					blend: "premultiplied",
					set: { params: params() },
				});
				await fx.compile({ colors: [target.format], sampleCount: 1 });
			} catch {
				target?.dispose();
				target = undefined;
				fx = undefined;
				return;
			}
			if (disposed) return;

			themeObserver.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["class"],
			});
			resizeObserver.observe(stage);
			intersectionObserver.observe(stage);
			for (const img of images) img.addEventListener("load", onLayout);
			document.addEventListener("visibilitychange", onVisibility);
			if (!still) {
				card.addEventListener("pointerenter", onEnter);
				card.addEventListener("pointerleave", onLeave);
				card.addEventListener("pointermove", onPointerMove);
				card.addEventListener("focusin", onEnter);
				card.addEventListener("focusout", onLeave);
			}

			// First frame now so the canvas fades in with content, then animate.
			paintOnce(paint);
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
			for (const img of images) img.removeEventListener("load", onLayout);
			document.removeEventListener("visibilitychange", onVisibility);
			card.removeEventListener("pointerenter", onEnter);
			card.removeEventListener("pointerleave", onLeave);
			card.removeEventListener("pointermove", onPointerMove);
			card.removeEventListener("focusin", onEnter);
			card.removeEventListener("focusout", onLeave);
			if (target && !target.disposed) target.dispose();
			releaseGpu();
		};
	}, [variant]);

	return (
		<div ref={stageRef} className={cn("relative overflow-hidden", className)}>
			<div aria-hidden="true" className="pointer-events-none absolute inset-0">
				<div
					className={cn(
						"absolute inset-0 transition-opacity duration-700 ease-out-expo",
						ready ? "opacity-0" : "opacity-100",
					)}
					style={{
						...FALLBACK[variant],
						WebkitMaskImage: FALLBACK[variant].maskImage,
						WebkitMaskComposite:
							FALLBACK[variant].maskComposite === "intersect"
								? "source-in"
								: undefined,
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
			<div ref={lockupRef} className="relative min-w-0">
				{children}
			</div>
		</div>
	);
}
