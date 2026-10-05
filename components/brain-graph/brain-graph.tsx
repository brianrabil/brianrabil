"use client";

import {
	type Painter,
	acquireGpu,
	paintOnce,
	releaseGpu,
	startPainting,
} from "@/components/gpu/shared-gpu";
import { cn } from "@/lib/utils";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { demoSnapshot } from "./demo-snapshot";
import { buildLayers, plates } from "./layers-model";
import { LayersRenderer } from "./layers-renderer";

const layout = buildLayers(demoSnapshot);

const INK = {
	dark: [0.93, 0.93, 0.93, 1] as const,
	light: [0.08, 0.08, 0.08, 1] as const,
};

// Stand-in until the first GPU frame, and when WebGPU is unavailable: the
// four plates as faint dotted ellipses, roughly where the stack draws.
const FALLBACK_PLATES = [
	{ left: "18%", right: "4%", top: "64%", height: "30%", opacity: 0.5 },
	{ left: "24%", right: "8%", top: "44%", height: "24%", opacity: 0.62 },
	{ left: "30%", right: "12%", top: "25%", height: "20%", opacity: 0.78 },
	{ left: "38%", right: "18%", top: "9%", height: "15%", opacity: 1 },
];

/**
 * The logo stage of Brain's product card: Brain's layered graph view drawn
 * with vgpu on the page's shared GPU device. Sources sit on the floor,
 * memories, entities, and rules on the plates above, and every few seconds a
 * new memory sends a pulse up the stack. The data is a fixed illustrative
 * snapshot. Decorative. Runs only while on screen in a visible tab, draws one
 * still frame under reduced motion or on low-end devices, and leans slightly
 * toward the pointer.
 */
export function BrainGraphStage({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	const stageRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const labelsRef = useRef<HTMLDivElement>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const stage = stageRef.current;
		const canvas = canvasRef.current;
		const labelBox = labelsRef.current;
		if (!stage || !canvas || !labelBox) return;
		if (typeof navigator === "undefined" || !navigator.gpu) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const nav = navigator as Navigator & { deviceMemory?: number };
		const lowEnd =
			(nav.hardwareConcurrency ?? 8) < 4 || (nav.deviceMemory ?? 8) < 4;
		const still = reducedMotion || lowEnd;
		const card: HTMLElement = stage.closest("a") ?? stage;
		const labels = Array.from(labelBox.children).filter(
			(element): element is HTMLElement => element instanceof HTMLElement,
		);

		let disposed = false;
		let renderer: LayersRenderer | undefined;
		let stopPainting: (() => void) | undefined;
		let onScreen = true;
		let stillRequest = 0;
		let widths: number[] = [];

		function readTheme() {
			if (!renderer) return;
			const dark = document.documentElement.classList.contains("dark");
			renderer.ink = dark ? INK.dark : INK.light;
		}

		// Labels follow their hub nodes; when two collide, the earlier one wins.
		function placeLabels() {
			if (!renderer) return;
			const points = layout.buffers.points;
			const placed: { left: number; right: number; top: number }[] = [];
			labels.forEach((element, slot) => {
				const i = Number(element.dataset.index);
				const [sx, sy] = renderer?.project(
					points[i * 4] ?? 0,
					points[i * 4 + 1] ?? 0,
					points[i * 4 + 2] ?? 0,
				) ?? [0, 0];
				const top = sy + 6;
				const width = widths[slot] ?? 0;
				const box = { left: sx - width / 2, right: sx + width / 2, top };
				const collides = placed.some(
					(other) =>
						box.left < other.right + 6 &&
						box.right > other.left - 6 &&
						Math.abs(box.top - other.top) < 14,
				);
				element.style.transform = `translate(${sx}px, ${top}px) translateX(-50%)`;
				element.style.opacity = collides ? "0" : "";
				if (!collides) placed.push(box);
			});
		}

		const paint: Painter = (current, dt) => {
			renderer?.paint(current, dt);
			placeLabels();
		};

		function requestStill() {
			cancelAnimationFrame(stillRequest);
			stillRequest = requestAnimationFrame(() => {
				if (!disposed) paintOnce(paint);
			});
		}

		function play() {
			if (!renderer || still || stopPainting || !onScreen || document.hidden)
				return;
			if (disposed) return;
			stopPainting = startPainting(paint);
		}

		function pause() {
			stopPainting?.();
			stopPainting = undefined;
		}

		function onPointerMove(event: PointerEvent) {
			if (event.pointerType !== "mouse" || !renderer || !stage) return;
			const rect = stage.getBoundingClientRect();
			renderer.pointer = {
				x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
				y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
			};
		}

		function onPointerLeave() {
			if (renderer) renderer.pointer = null;
		}

		function onVisibility() {
			if (document.hidden) pause();
			else play();
		}

		function onResize() {
			widths = labels.map((element) => element.offsetWidth);
			requestStill();
		}

		const themeObserver = new MutationObserver(() => {
			readTheme();
			requestStill();
		});
		const resizeObserver = new ResizeObserver(onResize);
		const intersectionObserver = new IntersectionObserver(([entry]) => {
			onScreen = entry?.isIntersecting ?? false;
			if (onScreen) play();
			else pause();
		});

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
				renderer = new LayersRenderer(gpu, canvas);
				renderer.motion = !still;
				renderer.setLayers(layout, plates);
				readTheme();
				await renderer.compile();
			} catch {
				renderer?.dispose();
				renderer = undefined;
				return;
			}
			if (disposed) return;

			themeObserver.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["class"],
			});
			resizeObserver.observe(stage);
			intersectionObserver.observe(stage);
			document.addEventListener("visibilitychange", onVisibility);
			if (!still) {
				card.addEventListener("pointermove", onPointerMove);
				card.addEventListener("pointerleave", onPointerLeave);
			}

			widths = labels.map((element) => element.offsetWidth);
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
			document.removeEventListener("visibilitychange", onVisibility);
			card.removeEventListener("pointermove", onPointerMove);
			card.removeEventListener("pointerleave", onPointerLeave);
			renderer?.dispose();
			releaseGpu();
		};
	}, []);

	return (
		<div ref={stageRef} className={cn("relative overflow-hidden", className)}>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 sm:[mask-image:linear-gradient(to_right,transparent_8%,#000_30%)]"
			>
				<div
					className={cn(
						"absolute inset-0 transition-opacity duration-700 ease-out-expo",
						ready ? "opacity-0" : "opacity-100",
					)}
				>
					{FALLBACK_PLATES.map((plate) => (
						<div
							key={plate.top}
							className="absolute [mask-image:radial-gradient(closest-side,#000_55%,transparent)]"
							style={{
								left: plate.left,
								right: plate.right,
								top: plate.top,
								height: plate.height,
								opacity: plate.opacity,
								backgroundImage:
									"radial-gradient(circle at center, color-mix(in oklab, var(--fg) 22%, transparent) 0.7px, transparent 1.2px)",
								backgroundSize: "7px 7px",
							}}
						/>
					))}
				</div>
				<canvas
					ref={canvasRef}
					className={cn(
						"absolute inset-0 size-full transition-opacity duration-700 ease-out-expo",
						ready ? "opacity-100" : "opacity-0",
					)}
				/>
				<div
					ref={labelsRef}
					className={cn(
						"absolute inset-0 transition-opacity duration-700 ease-out-expo",
						ready ? "opacity-100" : "opacity-0",
					)}
				>
					{layout.labels.map((label) => (
						<span
							key={label.text}
							data-index={label.index}
							className="absolute top-0 left-0 whitespace-nowrap font-sans text-[10px] font-medium leading-3 tracking-[0.06em] text-fg/55 will-change-transform"
						>
							{label.text}
						</span>
					))}
				</div>
			</div>
			<div className="relative min-w-0">{children}</div>
		</div>
	);
}
