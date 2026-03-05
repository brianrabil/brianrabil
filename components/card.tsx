import { cn } from "@/lib/utils";
import Link from "next/link";

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
			<path
				d="M6.75 5.75 9.25 8l-2.5 2.25"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function Card({
	as,
	className,
	children,
}: {
	as?: React.ElementType;
	className?: string;
	children?: React.ReactNode;
}) {
	const Component = (as ?? "div") as "div";

	return (
		<Component
			className={cn(
				className,
				"group relative flex flex-col items-start rounded-none border border-border bg-card p-5 transition-colors hover:bg-muted/30",
			)}
		>
			{children}
		</Component>
	);
}

Card.Link = function CardLink({
	children,
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
	return (
		<>
			<Link {...props} className={cn("relative", className)}>
				<span className="absolute inset-0 z-20 rounded-none" />
				<span className="relative z-10 text-foreground">{children}</span>
			</Link>
		</>
	);
};

Card.Title = function CardTitle({
	as,
	href,
	children,
}: {
	as?: React.ElementType;
	href?: string;
	children?: React.ReactNode;
}) {
	const Component = (as ?? "h2") as "h2";

	return (
		<Component className="font-heading text-base font-medium text-foreground text-balance">
			{href ? <Card.Link href={href}>{children}</Card.Link> : children}
		</Component>
	);
};

Card.Description = function CardDescription({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<p className="relative z-10 mt-3 text-sm text-muted-foreground text-pretty">
			{children}
		</p>
	);
};

Card.Cta = function CardCta({ children }: { children: React.ReactNode }) {
	return (
		<div
			aria-hidden="true"
			className="relative z-10 mt-5 flex items-center text-sm font-medium text-foreground"
		>
			{children}
			<ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
		</div>
	);
};

Card.Eyebrow = function CardEyebrow({
	as,
	decorate = false,
	className,
	children,
	...props
}: {
	as?: React.ElementType;
	decorate?: boolean;
	className?: string;
	children?: React.ReactNode;
	[key: string]: unknown;
}) {
	const Component = (as ?? "p") as "p";

	return (
		<Component
			className={cn(
				className,
				"relative z-10 order-first mb-3 flex items-center text-sm text-muted-foreground",
				decorate && "pl-3.5",
			)}
			{...props}
		>
			{decorate && (
				<span
					className="absolute inset-y-0 left-0 flex items-center"
					aria-hidden="true"
				>
					<span className="h-4 w-0.5 rounded-full bg-border" />
				</span>
			)}
			{children}
		</Component>
	);
};
