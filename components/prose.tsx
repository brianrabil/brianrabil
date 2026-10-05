import { cn } from "@/lib/utils";

/** Reading scale: 16px body at 1.75, headings in the sans at 500, colours from tokens. */
export function Prose({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			className={cn(
				"prose prose-stealth max-w-none text-base leading-[1.75]",
				"prose-p:my-5 prose-headings:font-medium prose-headings:text-fg",
				"prose-h2:mt-14 prose-h2:mb-4 prose-h2:scroll-mt-24 prose-h2:text-2xl prose-h2:tracking-[-0.03em]",
				"prose-h3:mt-10 prose-h3:scroll-mt-24 prose-h3:text-lg prose-h3:tracking-[-0.015em]",
				"prose-a:font-normal prose-a:underline prose-a:decoration-fg-3 prose-a:underline-offset-[3px] hover:prose-a:decoration-fg",
				"prose-strong:font-medium prose-blockquote:border-l-line-2 prose-blockquote:font-normal prose-blockquote:not-italic",
				"prose-code:rounded prose-code:bg-hover prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.875em] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
				"prose-pre:rounded-xl prose-pre:border prose-pre:border-line prose-pre:bg-raised",
				"prose-hr:my-12 prose-hr:border-line prose-figcaption:text-sm",
				"[&_pre_code]:rounded-none [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit",
				className,
			)}
			{...props}
		/>
	);
}
