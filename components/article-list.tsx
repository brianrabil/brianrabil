import { HoverList, HoverRow } from "@/components/hover-list";
import type { ArticleWithSlug } from "@/lib/articles";
import { formatDateShort } from "@/lib/formatDate";

/** Dated index of articles: date, title and summary, reading time. */
export function ArticleList({ articles }: { articles: ArticleWithSlug[] }) {
	return (
		<HoverList className="-mx-3">
			<ul className="grid">
				{articles.map((article) => (
					<li
						key={article.slug}
						className="border-t border-line first:border-t-0"
					>
						<HoverRow
							value={article.slug}
							href={`/articles/${article.slug}`}
							className="grid gap-x-6 gap-y-2 px-3 py-5 sm:grid-cols-[7rem_minmax(0,1fr)_auto]"
						>
							<time
								dateTime={article.date}
								className="pt-0.5 text-xs tabular text-fg-2"
							>
								{formatDateShort(article.date)}
							</time>
							<div className="min-w-0">
								<h3 className="text-base font-medium tracking-[-0.01em] text-fg">
									{article.title}
								</h3>
								<p className="mt-1.5 line-clamp-2 text-sm leading-6 text-fg-2">
									{article.description}
								</p>
							</div>
							{article.readingTimeMinutes ? (
								<span className="hidden pt-0.5 text-xs tabular text-fg-2 sm:block">
									{article.readingTimeMinutes} min
								</span>
							) : null}
						</HoverRow>
					</li>
				))}
			</ul>
		</HoverList>
	);
}
