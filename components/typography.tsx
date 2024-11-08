import { cn } from "@/lib/utils";
import type * as React from "react";

interface TypographyProps {
	children: React.ReactNode;
	className?: string;
}

export function TypographyD2({ children }: TypographyProps) {
	return (
		<h2 className="text-3xl font-bold mb-2 tracking-tight text-gray-900 sm:text-4xl">{children}</h2>
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
		<h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
			{children}
		</h3>
	);
}

export function TypographyH4({ children }: TypographyProps) {
	return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{children}</h4>;
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

export function LeadText({ children, className }: TypographyProps) {
	return <p className={cn("text-xl leading-8 text-muted-foreground", className)}>{children}</p>;
}

export function HighlightText({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<span className={cn("relative z-10 text-nowrap text-primary", className)}>
			{children}
			<svg
				aria-hidden
				xmlns="http://www.w3.org/2000/svg"
				width="249"
				height="22"
				viewBox="0 0 249 22"
				fill="currentColor"
				className="absolute w-full h-auto left-0 right-0 -bottom-[15%] fill-primary/25"
			>
				<title>Underline</title>
				<path d="M247.564 18.5807C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97395 208.996 8.57031 200.846 7.46093C186.542 5.51302 172.169 4.08854 157.79 3.01562C126.033 0.645827 94.0929 0.0338481 62.3387 2.36979C42.1785 3.85416 22.008 5.90885 2.32917 10.8463C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7083C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0807 99.2274 10.6719 118.484 10.9557C142.604 11.3125 166.719 12.8333 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0807 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5807Z" />
			</svg>
		</span>
	);
}
