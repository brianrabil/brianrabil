import { Prose } from "@/components/prose";
// @ts-expect-error -- no type declarations for this package
import rehypePrism from "@mapbox/rehype-prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders markdown written by people or agents. Raw HTML is dropped, so a
 * file can only produce what markdown can express.
 */
export function Markdown({
	source,
	className,
}: { source: string; className?: string }) {
	return (
		<Prose className={className}>
			<ReactMarkdown
				skipHtml
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[
					// Agents write shell blocks as `sh`; unknown languages render unhighlighted.
					[
						rehypePrism,
						{ ignoreMissing: true, alias: { bash: ["sh", "shell", "zsh"] } },
					],
				]}
				components={{
					a: ({ href, children }) => {
						const external = href ? /^https?:\/\//.test(href) : false;
						return (
							<a
								href={href}
								target={external ? "_blank" : undefined}
								rel={external ? "noopener noreferrer" : undefined}
							>
								{children}
							</a>
						);
					},
				}}
			>
				{source}
			</ReactMarkdown>
		</Prose>
	);
}
