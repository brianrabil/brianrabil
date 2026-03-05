"use client";

import { AppContext } from "@/app/providers";
import type { ArticleWithSlug } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { useContext } from "react";
import { ChevronRight } from "lucide-react";

export function ArticleLayout({
	article,
	children,
}: {
	article: ArticleWithSlug;
	children: React.ReactNode;
}) {
	const { previousPathname } = useContext(AppContext);

	return (
		<article className="prose mx-auto px-4 py-24 dark:prose-invert">
			{/* Breadcrumbs */}
			<nav aria-label="Breadcrumb" className="not-prose mb-8">
				<ol className="flex items-center gap-1 text-xs font-mono text-muted-foreground/50">
					<li>
						<Link href="/" className="hover:text-foreground transition-colors">Home</Link>
					</li>
					<li><ChevronRight className="h-3 w-3" /></li>
					<li>
						<Link href="/articles" className="hover:text-foreground transition-colors">Writing</Link>
					</li>
					<li><ChevronRight className="h-3 w-3" /></li>
					<li className="text-muted-foreground truncate max-w-[200px]">{article.title}</li>
				</ol>
			</nav>

			{/* Meta */}
			<div className="not-prose mb-6 flex items-center gap-3 text-xs font-mono text-muted-foreground/50">
				<time dateTime={article.date} className="tabular-nums">
					{formatDate(article.date)}
				</time>
				<span className="h-3 w-px bg-border" />
				<span>{article.author}</span>
			</div>

			{/* Title */}
			<h1 className="text-balance font-extrabold tracking-tight !mt-0">
				{article.title}
			</h1>

			{/* Content */}
			<div data-mdx-content>
				{children}
			</div>
		</article>
	);
}
