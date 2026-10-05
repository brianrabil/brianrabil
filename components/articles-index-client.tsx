"use client";

import { useMemo, useState } from "react";

import { ArticleList } from "@/components/article-list";
import type { ArticleWithSlug } from "@/lib/articles";
import { cn } from "@/lib/utils";

const SERIES_OPTIONS = [
	"Agent Systems",
	"Reliability",
	"AI UX",
	"Founder Execution",
];

const TAG_OPTIONS = ["Agents", "Reliability", "UX", "Founders", "Tooling"];

const SORT_OPTIONS = [
	{ value: "featured", label: "Most useful" },
	{ value: "newest", label: "Newest" },
] as const;

/** Show the full filter UI only when there are enough articles to warrant it. */
const FILTER_THRESHOLD = 3;

type SortMode = (typeof SORT_OPTIONS)[number]["value"];

function matchQuery(article: ArticleWithSlug, query: string) {
	const normalized = query.toLowerCase().trim();
	if (!normalized) {
		return true;
	}

	const titleMatch = article.title.toLowerCase().includes(normalized);
	const summaryMatch = article.description.toLowerCase().includes(normalized);
	const tagMatch = article.tags?.some((tag) =>
		tag.toLowerCase().includes(normalized),
	);

	return titleMatch || summaryMatch || tagMatch;
}

function articleWeight(article: ArticleWithSlug) {
	if (article.pillar) return 3;
	if (article.featured) return 2;
	return 1;
}

function PillButton({
	active,
	onClick,
	children,
}: {
	active: boolean;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={active}
			className={cn(
				"h-10 rounded-full border px-3 md:h-8 text-[13px] font-medium transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.97]",
				active
					? "border-fg bg-fg text-frame"
					: "border-line-2 text-fg-2 hover:border-fg-3 hover:text-fg",
			)}
		>
			{children}
		</button>
	);
}

export function ArticlesIndexClient({
	articles,
}: { articles: ArticleWithSlug[] }) {
	const [search, setSearch] = useState("");
	const [activeSeries, setActiveSeries] = useState("All");
	const [activeTag, setActiveTag] = useState("All");
	const [sortMode, setSortMode] = useState<SortMode>("featured");

	const showFilters = articles.length >= FILTER_THRESHOLD;

	const filtered = useMemo(() => {
		const results = articles.filter(
			(article) =>
				matchQuery(article, search) &&
				(activeSeries === "All" || article.series === activeSeries) &&
				(activeTag === "All" || article.tags?.some((tag) => tag === activeTag)),
		);

		const withSorting = [...results].sort((a, z) => {
			if (sortMode === "featured") {
				return (
					articleWeight(z) - articleWeight(a) ||
					+new Date(z.updated ?? z.date) - +new Date(a.updated ?? a.date)
				);
			}
			return +new Date(z.date) - +new Date(a.date);
		});

		return withSorting;
	}, [articles, activeSeries, activeTag, search, sortMode]);

	/* Only show series that actually have articles */
	const seriesWithArticles = useMemo(() => {
		return SERIES_OPTIONS.map((series) => ({
			name: series,
			count: articles.filter((article) => article.series === series).length,
		})).filter((s) => s.count > 0);
	}, [articles]);

	/* Only show tags that actually have articles */
	const tagOptions = useMemo(() => {
		return TAG_OPTIONS.map((tag) => ({
			name: tag,
			count: articles.filter((article) =>
				article.tags?.some((item) => item === tag),
			).length,
		})).filter((tag) => tag.count > 0);
	}, [articles]);

	const hasActiveFilter =
		activeSeries !== "All" || activeTag !== "All" || search.length > 0;

	return (
		<div className="max-w-4xl">
			{/* --- Filters: only shown when there's enough content to filter --- */}
			{showFilters && (
				<div className="mb-8 space-y-4">
					{/* Search + sort row */}
					<div className="flex flex-wrap items-center gap-3">
						<label className="min-w-0 flex-1 basis-56">
							<span className="sr-only">Search title or summary</span>
							<input
								value={search}
								onChange={(event) => setSearch(event.target.value)}
								placeholder="Search titles and summaries"
								type="search"
								className="h-11 w-full rounded-md border border-input-edge bg-frame px-3 text-base text-fg transition-[border-color] duration-150 placeholder:text-fg-3 hover:border-fg-2 md:h-10 [@media(pointer:fine)]:text-sm"
							/>
						</label>

						<label className="flex items-center gap-2 text-sm text-fg-2">
							<span>Sort</span>
							<select
								value={sortMode}
								onChange={(event) =>
									setSortMode(event.target.value as SortMode)
								}
								className="h-11 rounded-md border border-input-edge bg-frame px-2.5 text-base text-fg transition-[border-color] duration-150 hover:border-fg-2 md:h-10 [@media(pointer:fine)]:text-sm"
							>
								{SORT_OPTIONS.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</label>
					</div>

					{/* Unified filter pills: series + tags in one row */}
					{(seriesWithArticles.length > 0 || tagOptions.length > 1) && (
						<div className="flex flex-wrap items-center gap-2">
							{seriesWithArticles.length > 0 &&
								seriesWithArticles.map(({ name }) => (
									<PillButton
										key={name}
										active={activeSeries === name}
										onClick={() =>
											setActiveSeries((v) => (v === name ? "All" : name))
										}
									>
										{name}
									</PillButton>
								))}

							{seriesWithArticles.length > 0 && tagOptions.length > 1 && (
								<span aria-hidden="true" className="mx-1 h-4 w-px bg-line-2" />
							)}

							{tagOptions.length > 1 &&
								tagOptions.map(({ name }) => (
									<PillButton
										key={name}
										active={activeTag === name}
										onClick={() =>
											setActiveTag((v) => (v === name ? "All" : name))
										}
									>
										{name}
									</PillButton>
								))}
						</div>
					)}
				</div>
			)}

			{/* --- Article list --- */}
			<section aria-labelledby="all-articles">
				<h2 id="all-articles" className="sr-only">
					All articles
				</h2>
				{filtered.length === 0 ? (
					<div className="rounded-xl border border-dashed border-line-2 px-6 py-12 text-center">
						<p className="text-sm text-fg">
							{search.trim() ? (
								<>No articles match “{search.trim()}”</>
							) : (
								"No articles match these filters"
							)}
						</p>
						{hasActiveFilter && (
							<button
								type="button"
								onClick={() => {
									setSearch("");
									setActiveSeries("All");
									setActiveTag("All");
								}}
								className="mt-3 text-sm font-medium text-fg-2 underline decoration-fg-3 underline-offset-4 transition-colors duration-150 hover:text-fg hover:decoration-fg"
							>
								Clear filters
							</button>
						)}
					</div>
				) : (
					<ArticleList articles={filtered} />
				)}
			</section>
		</div>
	);
}
