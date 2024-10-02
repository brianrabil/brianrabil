import { cn } from "@/lib/utils";
import type * as React from "react";

interface TypographyProps {
	children: React.ReactNode;
	className?: string;
}

export function TypographyD2({ children }: TypographyProps) {
	return (
		<h2 className="text-3xl font-bold mb-2 tracking-tight text-gray-900 sm:text-4xl">
			{children}
		</h2>
	);
}

export function TypographyH1({ children }: TypographyProps) {
	return (
		<h1 className="mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			{children}
		</h1>
	);
}

export function TypographyH2({ children }: TypographyProps) {
	return (
		<h2 className="scroll-m-20 border-b pb-2 text-3xl mb-4 font-semibold tracking-tight first:mt-0">
			{children}
		</h2>
	);
}

export function TypographyH3({ children, className }: TypographyProps) {
	return (
		<h3
			className={cn(
				"scroll-m-20 text-2xl font-semibold tracking-tight",
				className,
			)}
		>
			{children}
		</h3>
	);
}

export function TypographyH4({ children }: TypographyProps) {
	return (
		<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
			{children}
		</h4>
	);
}

export function TypographyP({ children }: TypographyProps) {
	return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}

export function TypographySmall({ children }: TypographyProps) {
	return <small className="text-sm font-medium leading-none">{children}</small>;
}

export function TypographyLarge({ children }: TypographyProps) {
	return <div className="text-lg font-semibold">{children}</div>;
}

export function TypographyInlineCode({ children }: TypographyProps) {
	return (
		<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
			{children}
		</code>
	);
}

export function TypographyLead({ children, className }: TypographyProps) {
	return (
		<p className={cn("text-xl leading-8 text-muted-foreground", className)}>
			{children}
		</p>
	);
}
