import { cn } from "@/lib/utils";
import type * as React from "react";

interface TypographyProps {
	children: React.ReactNode;
	className?: string;
}

export const typographyStyles = {
	h1: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl scroll-m-20 justify-center max-w-[1200px] overflow-visible p-0 relative w-full font-light mb-2 tracking-tight text-foreground leading-tight",
	h2: "scroll-m-20 text-4xl font-medium leading-[56px] text-left text-foreground break-words",
	h3: "scroll-m-20 text-xl md:text-2xl lg:text-3xl text-foreground mb-4 font-light tracking-tight first:mt-0 leading-tight",
	h4: "scroll-m-20 text-lg md:text-xl lg:text-2xl font-light tracking-tight leading-tight",
	p: "leading-7 text-base md:text-lg lg:text-xl tracking-normal text-left max-w-[1200px] text-foreground font-light [&:not(:first-child)]:mt-6",
	small: "text-sm font-light leading-none",
	large: "text-lg font-light leading-tight",
	inlineCode:
		"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-light leading-tight",
	lead: "text-xl leading-8 font-light text-muted-foreground max-w-[1200px]",
	highlight: "relative z-10 text-nowrap font-light text-primary leading-tight",
} as const;

export function TypographyH1({ children, className }: TypographyProps) {
	return <h1 className={cn(typographyStyles.h1, className)}>{children}</h1>;
}

export function TypographyH2({ children, className }: TypographyProps) {
	return <h2 className={cn(typographyStyles.h2, className)}>{children}</h2>;
}

export function TypographyH3({ children, className }: TypographyProps) {
	return <h3 className={cn(typographyStyles.h3, className)}>{children}</h3>;
}

export function TypographyH4({ children, className }: TypographyProps) {
	return <h4 className={cn(typographyStyles.h4, className)}>{children}</h4>;
}

export function TypographyP({ children, className }: TypographyProps) {
	return <p className={cn(typographyStyles.p, className)}>{children}</p>;
}

export function TypographySmall({ children, className }: TypographyProps) {
	return <small className={cn(typographyStyles.small, className)}>{children}</small>;
}

export function TypographyLarge({ children, className }: TypographyProps) {
	return <div className={cn(typographyStyles.large, className)}>{children}</div>;
}

export function TypographyInlineCode({ children, className }: TypographyProps) {
	return <code className={cn(typographyStyles.inlineCode, className)}>{children}</code>;
}

export function LeadText({ children, className }: TypographyProps) {
	return <p className={cn(typographyStyles.lead, className)}>{children}</p>;
}

export function HighlightText({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<span className={cn(typographyStyles.highlight, className)}>
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
