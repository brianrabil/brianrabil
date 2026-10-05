import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

/**
 * The index layout shared by /stack, /skills and /brand: a bare page title,
 * then numbered sections whose heading row holds only the number, the name
 * and a count.
 */
export function IndexPage({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="border-b border-line">
			<Container className="py-16 lg:py-24">
				<h1 className="text-4xl font-medium tracking-[-0.05em] text-fg sm:text-5xl">
					{title}
				</h1>
				<div className="mt-14 grid gap-14 lg:mt-20 lg:gap-16">{children}</div>
			</Container>
		</div>
	);
}

export function IndexSection({
	id,
	index,
	label,
	count,
	children,
}: {
	id: string;
	index: number;
	label: string;
	count: number;
	children: React.ReactNode;
}) {
	return (
		<section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
			<div className="flex items-baseline gap-x-4">
				<span className="text-xs tabular text-fg-4">
					{String(index + 1).padStart(2, "0")}
				</span>
				<h2
					id={`${id}-title`}
					className="shrink-0 text-lg font-medium tracking-[-0.02em] text-fg"
				>
					{label}
				</h2>
				<span className="ml-auto shrink-0 text-xs tabular text-fg-3">
					{count}
				</span>
			</div>
			<div className="mt-4">{children}</div>
		</section>
	);
}

/** One line: optional icon tile, name, a dot, then what it does. */
export function IndexRow({
	href,
	icon,
	name,
	description,
	meta,
	action,
}: {
	/** Leave out for rows with nothing to open. */
	href?: string;
	icon?: React.ReactNode;
	name: string;
	description: string;
	/** Short trailing text, such as years. */
	meta?: string;
	/** A control beside the row, outside the link (for example a copy button). */
	action?: React.ReactNode;
}) {
	const body = (
		<>
			{icon ? (
				<span
					aria-hidden="true"
					className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-raised"
				>
					{icon}
				</span>
			) : null}
			<span className="min-w-0 flex-1 text-[15px] leading-6">
				<span className="font-medium text-fg">{name}</span>
				<span aria-hidden="true" className="px-2 text-fg-4">
					·
				</span>
				<span
					className={cn(
						"text-fg-3",
						href && "transition-colors duration-150 group-hover:text-fg-2",
					)}
				>
					{description}
				</span>
			</span>
			{meta ? (
				<span className="shrink-0 pt-0.5 text-xs leading-5 tabular text-fg-3">
					{meta}
				</span>
			) : null}
		</>
	);
	const row =
		"-mx-2 flex min-w-0 flex-1 items-start gap-3.5 rounded-md px-2 py-2";

	return (
		<li className="flex items-start gap-1">
			{href ? (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						row,
						"group transition-[background-color] duration-150 ease-out-expo hover:bg-frame active:bg-hover",
					)}
				>
					{body}
				</a>
			) : (
				<div className={row}>{body}</div>
			)}
			{action ? <div className="pt-1">{action}</div> : null}
		</li>
	);
}
