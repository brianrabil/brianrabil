import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

/**
 * A full-bleed band on a hairline. The heading block sits in a left column
 * on wide screens and stacks above the content on narrow ones.
 */
export function Section({
	id,
	title,
	intro,
	band = false,
	className,
	children,
}: {
	id: string;
	title: React.ReactNode;
	intro?: React.ReactNode;
	/** Lift the band one surface step to separate it from its neighbours. */
	band?: boolean;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<section
			id={id}
			aria-labelledby={`${id}-title`}
			className={cn("border-b border-line", band && "bg-frame", className)}
		>
			<Container className="grid gap-12 py-20 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16 lg:py-28">
				<div className="lg:sticky lg:top-28 lg:self-start">
					<h2
						id={`${id}-title`}
						className="max-w-md text-3xl font-medium tracking-[-0.04em] text-fg sm:text-4xl"
					>
						{title}
					</h2>
					{intro ? (
						<p className="mt-4 max-w-md text-base leading-7 text-fg-2">
							{intro}
						</p>
					) : null}
				</div>
				<div className="min-w-0">{children}</div>
			</Container>
		</section>
	);
}
