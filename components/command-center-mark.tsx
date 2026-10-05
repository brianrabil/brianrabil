import { cn } from "@/lib/utils";

/**
 * Command Center's mark: a tilted orbit with three agent nodes around a
 * diamond command core. When animated, a signal travels the orbit, each node
 * flares as it passes, and the core pulses once per pass. Static under reduced
 * motion. Uses currentColor, so it follows the theme.
 */
export function CommandCenterMark({
	animated = false,
	className,
}: {
	animated?: boolean;
	className?: string;
}) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 32 32"
			fill="none"
			className={cn("cc-mark", animated && "is-animated", className)}
		>
			<g transform="rotate(-18 16 16)">
				<path
					className="cc-orbit"
					d="M29.00 16.00A13 6.2 0 1 1 3.00 16.00A13 6.2 0 1 1 29.00 16.00Z"
				/>
				<path
					className="cc-signal"
					pathLength={66}
					d="M29.00 16.00A13 6.2 0 1 1 3.00 16.00A13 6.2 0 1 1 29.00 16.00Z"
				/>
				<rect
					className="cc-node"
					x="27.70"
					y="14.70"
					width="2.6"
					height="2.6"
				/>
				<rect className="cc-node" x="8.20" y="20.07" width="2.6" height="2.6" />
				<rect className="cc-node" x="8.20" y="9.33" width="2.6" height="2.6" />
			</g>
			<g transform="rotate(45 16 16)">
				<rect className="cc-halo" x="12.6" y="12.6" width="6.8" height="6.8" />
				<rect className="cc-core" x="13.6" y="13.6" width="4.8" height="4.8" />
			</g>
		</svg>
	);
}
