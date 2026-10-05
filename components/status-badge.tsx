import type { ProductStatus } from "@/lib/fleet";
import { cn } from "@/lib/utils";

/** The word shown for each status. Shared with the agent endpoints. */
export const STATUS_LABEL: Partial<Record<ProductStatus, string>> = {
	live: "Live",
	alpha: "Closed alpha",
	building: "Coming soon",
	planning: "Coming soon",
	backlog: "Coming soon",
};

/**
 * Availability, as a quiet pill. Status colour is muted and never the only
 * signal: every badge carries its word.
 */
export function StatusBadge({
	status,
	className,
}: {
	status: ProductStatus;
	className?: string;
}) {
	const label = STATUS_LABEL[status];
	if (!label) return null;

	return (
		<span
			className={cn(
				"inline-flex h-5 shrink-0 items-center gap-1.5 rounded-full border px-2 text-[11px] leading-none font-medium whitespace-nowrap",
				status === "live"
					? "border-[color-mix(in_oklab,var(--success)_35%,transparent)] text-fg"
					: "border-line-2 bg-hover text-fg-2",
				className,
			)}
		>
			{status === "live" ? (
				<span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
			) : null}
			{status === "alpha" ? (
				<span
					aria-hidden="true"
					className="size-1.5 rounded-full border border-fg-2"
				/>
			) : null}
			{label}
		</span>
	);
}
