import { cn } from "@/lib/utils";

/**
 * Workbot's mark (public/marks/workbot-*.svg) as inline SVG so it can walk:
 * the legs swing from the hips in opposite phase, the swinging foot lifts,
 * the body bobs once per step and the antenna trails it. Static under reduced
 * motion. Uses currentColor, so it follows the theme.
 */
export function WorkbotMark({
	walking = false,
	className,
}: {
	walking?: boolean;
	className?: string;
}) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 36 36"
			fill="currentColor"
			className={cn("workbot-mark", walking && "is-walking", className)}
		>
			<g className="workbot-leg workbot-leg-back">
				<path d="M21.18 18.43 15.62 25.26 19.65 31.88 22.55 30.12 19.78 25.54 23.82 20.57Z" />
				<path d="M19.40 29.90L22.80 29.90L26.90 32.60L20.90 31.70L17.90 32.60Z" />
			</g>
			<g className="workbot-leg workbot-leg-front">
				<path d="M10.68 18.43 5.12 25.26 9.15 31.88 12.05 30.12 9.28 25.54 13.32 20.57Z" />
				<path d="M8.90 29.90L12.30 29.90L16.40 32.60L10.40 31.70L7.40 32.60Z" />
			</g>
			<g className="workbot-body">
				<path
					fillRule="evenodd"
					d="M9 6.5h15l5 4.5v6.5L26.5 21H9l-3-2.5V9Zm13.5 3.5v4.5h3V10ZM9.5 15.4v1.3H19v-1.3Z"
				/>
				<g className="workbot-antenna">
					<path d="M11 2.8h1.6v3.7H11ZM10 2.6h3.6l-1.8-1.9Z" />
				</g>
			</g>
		</svg>
	);
}
