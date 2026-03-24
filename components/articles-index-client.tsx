"use client";

import { useMemo, useState } from "react";

import { formatDate } from "@/lib/formatDate";
import type { ArticleWithSlug } from "@/lib/articles";

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

function formatMetaLine(article: ArticleWithSlug) {
	const badge = article.series || "Article";
	const dateLabel = article.updated
		? `Updated ${formatDate(article.updated)}`
		: formatDate(article.date);
	return `${badge} · ${dateLabel}`;
}

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
			className={`rounded-full border px-3 py-1.5 text-xs font-mono tracking-wide transition ${
				active
					? "border-foreground/30 bg-foreground/10 text-foreground"
					: "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
			}`}
		>
			{children}
		</button>
	);
}

export function ArticlesIndexClient({ articles }: { articles: ArticleWithSlug[] }) {
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
				(activeTag === "All" ||
					article.tags?.some((tag) => tag === activeTag)),
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

	const hasActiveFilter = activeSeries !== "All" || activeTag !== "All" || search.length > 0;

	return (
		<div className="md:max-w-4xl">
			{/* --- Filters: only shown when there's enough content to filter --- */}
			{showFilters && (
				<div className="mb-8 space-y-4">
					{/* Search + sort row */}
					<div className="flex flex-wrap items-center gap-3">
						<label className="flex-1 min-w-[210px]">
							<span className="sr-only">Search title or summary</span>
							<input
								value={search}
								onChange={(event) => setSearch(event.target.value)}
								placeholder="Search"
								className="h-10 w-full border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground"
							/>
						</label>

						<label className="text-xs text-muted-foreground flex items-center gap-2">
							<span className="font-mono">Sort</span>
							<select
								value={sortMode}
								onChange={(event) => setSortMode(event.target.value as SortMode)}
								className="h-10 border border-border bg-background px-2.5 py-1 text-sm text-foreground"
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
							{seriesWithArticles.length > 0 && (
								<>
									{seriesWithArticles.map(({ name }) => (
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
								</>
							)}

							{seriesWithArticles.length > 0 && tagOptions.length > 1 && (
								<span className="h-4 w-px bg-border" />
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
			<section aria-label="All articles">
				{filtered.length === 0 ? (
					<div className="py-12 text-center">
						<p className="text-sm text-muted-foreground">
							No articles match your filters.
						</p>
						{hasActiveFilter && (
							<button
								type="button"
								onClick={() => {
									setSearch("");
									setActiveSeries("All");
									setActiveTag("All");
								}}
								className="mt-3 text-xs font-mono text-muted-foreground underline underline-offset-4 hover:text-foreground transition"
							>
								Clear filters
							</button>
						)}
					</div>
				) : (
					<div className="grid divide-y divide-border border border-border">
						{filtered.map((article) => (
							<a
								key={article.slug}
								href={`/articles/${article.slug}`}
								className="group grid gap-1.5 p-5 transition-colors hover:bg-muted/25"
							>
								<h3 className="text-lg font-medium text-foreground">
									{article.title}
								</h3>
								<p className="text-sm text-muted-foreground">
									{article.description}
								</p>
								<div className="mt-1 flex items-center justify-between gap-3 text-xs font-mono text-muted-foreground/70">
									<span>{formatMetaLine(article)}</span>
									<span className="text-muted-foreground">Read →</span>
								</div>
							</a>
						))}
					</div>
				)}
			</section>
		</div>
	);
}
