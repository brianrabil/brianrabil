import { cn } from "@/lib/utils";

/** A + mark centred on a grid intersection. */
export function Crosshair({ className }: { className: string }) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 9 9"
			className={cn(
				"pointer-events-none absolute z-10 size-[9px] text-fg-3",
				className,
			)}
		>
			<path d="M4 0h1v9H4zM0 4h9v1H0z" fill="currentColor" />
		</svg>
	);
}

/** Positions for a crosshair on each corner of a hairline grid cell. */
export const CORNERS = [
	"-top-[4.5px] -left-[4.5px]",
	"-top-[4.5px] -right-[4.5px]",
	"-bottom-[4.5px] -left-[4.5px]",
	"-bottom-[4.5px] -right-[4.5px]",
];

/** Crosshairs on all four corners of the enclosing `relative` cell. */
export function CellCorners() {
	return CORNERS.map((corner) => <Crosshair key={corner} className={corner} />);
}
