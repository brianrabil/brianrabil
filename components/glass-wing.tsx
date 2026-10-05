"use client";

import { GlassObject } from "@/components/canvasui/GlassObject";
import { useEffect, useState } from "react";

/**
 * The site's flying-wing mark as a floating piece of liquid glass (Canvas UI's
 * Glass Object, WebGPU build). Decorative. Holds still under reduced motion.
 */
export function GlassWing({ className }: { className?: string }) {
	const [still, setStill] = useState(false);

	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		setStill(query.matches);
		const onChange = () => setStill(query.matches);
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, []);

	return (
		<div aria-hidden="true" className={className}>
			<GlassObject
				src="/brand/b2-wing.svg"
				className="size-full"
				scale={3.2}
				depth={0.12}
				bevel={0.6}
				ior={1.5}
				thickness={1.2}
				roughness={0.05}
				dispersion={1.2}
				environmentIntensity={1}
				floatIntensity={still ? 0 : 1}
				rotationIntensity={still ? 0 : 1}
				floatSpeed={0.8}
			/>
		</div>
	);
}
