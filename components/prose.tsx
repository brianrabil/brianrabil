import { cn } from "@/lib/utils";

export function Prose({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			className={cn(
				className,
				"prose prose-zinc max-w-none text-pretty dark:prose-invert prose-p:text-base prose-p:leading-7 prose-li:text-base prose-li:leading-7 prose-ol:text-base prose-ul:text-base prose-headings:text-balance prose-headings:font-heading prose-headings:font-medium prose-headings:text-foreground prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:border-b prose-h2:border-border prose-h2:pb-2 prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-muted-foreground prose-hr:border-border prose-strong:text-foreground prose-figure:mx-0 prose-figcaption:text-sm prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:font-medium prose-code:before:content-none prose-code:after:content-none prose-blockquote:font-medium prose-blockquote:text-foreground/90",
			)}
			{...props}
		/>
	);
}
