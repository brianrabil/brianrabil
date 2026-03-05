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

const START_HERE_SLUGS = [
	"the-ai-product-reliability-playbook",
	"hello-world",
	"writing-product-specs-that-ai-can-actually-build",
];

type SortMode = (typeof SORT_OPTIONS)[number]["value"];

function formatReadingTime(readingTimeMinutes?: number) {
	return `${readingTimeMinutes ?? 8} min`;
}

function formatMetaLine(article: ArticleWithSlug) {
	const badge = article.series || "Article";
	const dateLabel = article.updated
		? `Updated ${formatDate(article.updated)}`
		: formatDate(article.date);
	return `${badge} · ${formatReadingTime(article.readingTimeMinutes)} · ${dateLabel}`;
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

export function ArticlesIndexClient({ articles }: { articles: ArticleWithSlug[] }) {
	const [search, setSearch] = useState("");
	const [activeSeries, setActiveSeries] = useState("All");
	const [activeTag, setActiveTag] = useState("All");
	const [sortMode, setSortMode] = useState<SortMode>("featured");

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

	const startHere = useMemo(
		() =>
			START_HERE_SLUGS.map((slug) =>
				articles.find((article) => article.slug === slug),
			).filter((article): article is ArticleWithSlug => Boolean(article)),
		[articles],
	);

	const seriesCounts = useMemo(() => {
		return SERIES_OPTIONS.map((series) => ({
			name: series,
			count: articles.filter((article) => article.series === series).length,
		}));
	}, [articles]);

	const tagOptions = useMemo(() => {
		const withCounts = TAG_OPTIONS.map((tag) => ({
			name: tag,
			count: articles.filter((article) =>
				article.tags?.some((item) => item === tag),
			).length,
		})).filter((tag) => tag.count > 0);
		return withCounts;
	}, [articles]);

	return (
		<div className="md:max-w-4xl">
			<div className="mb-16">
				<h2 className="font-heading text-2xl font-medium tracking-tight text-foreground">
					Start here
				</h2>
				<p className="mt-2 text-sm text-muted-foreground">
					Three must-reads if you want the core patterns first.
				</p>
				<div className="mt-5 grid divide-y divide-border border-b border-l border-r border-border">
					{startHere.map((article) => (
						<a
							key={article.slug}
							href={`/articles/${article.slug}`}
							className="group flex flex-col gap-2 p-5 transition-colors hover:bg-muted/30 sm:flex-row sm:items-baseline sm:justify-between"
						>
							<div>
								<h3 className="font-medium text-foreground group-hover:text-foreground/80">
									{article.title}
								</h3>
								<p className="mt-1.5 text-sm text-muted-foreground">
									{article.description}
								</p>
							</div>
							<p className="text-xs text-muted-foreground/70 font-mono whitespace-nowrap">
								{formatMetaLine(article)}
							</p>
						</a>
					))}
				</div>
			</div>

			<div className="mb-10 border border-border">
				<div className="p-5 sm:p-6 border-b border-border">
					<h2 className="font-heading text-2xl font-medium tracking-tight text-foreground">
						Series
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						Engineering categories, with active themes and reusable patterns.
					</p>
				</div>
				<div className="flex flex-wrap gap-2 p-5 sm:p-6">
					{seriesCounts.map(({ name, count }) => (
						<button
							key={name}
							type="button"
							onClick={() =>
								setActiveSeries((value) => (value === name ? "All" : name))
							}
							className={`rounded-full border px-3 py-1.5 text-xs font-mono tracking-wide transition ${
								activeSeries === name
									? "border-foreground/30 bg-foreground/10 text-foreground"
									: "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
							}`}
						>
							{name} <span className="text-[10px]">({count})</span>
						</button>
					))}
				</div>
			</div>

			<div className="mb-4 flex flex-wrap items-center gap-3">
				<label className="flex-1 min-w-[210px]">
					<span className="sr-only">Search title or summary</span>
					<input
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search title or summary"
						className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground"
					/>
				</label>

				<label className="text-xs text-muted-foreground flex items-center gap-2">
					<span className="font-mono">Sort</span>
					<select
						value={sortMode}
						onChange={(event) => setSortMode(event.target.value as SortMode)}
						className="h-10 rounded-md border border-border bg-background px-2.5 py-1 text-sm text-foreground"
					>
						{SORT_OPTIONS.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</label>
			</div>

			<div className="mb-8 flex flex-wrap gap-2">
				<button
					type="button"
					onClick={() => setActiveTag("All")}
					className={`rounded-full border px-3 py-1.5 text-xs font-mono tracking-wide transition ${
						activeTag === "All"
							? "border-foreground/30 bg-foreground/10 text-foreground"
							: "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
					}`}
				>
					All
				</button>
				{tagOptions.map(({ name, count }) => (
					<button
						key={name}
						type="button"
						onClick={() => setActiveTag((value) => (value === name ? "All" : name))}
						className={`rounded-full border px-3 py-1.5 text-xs font-mono tracking-wide transition ${
							activeTag === name
								? "border-foreground/30 bg-foreground/10 text-foreground"
								: "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
						}`}
					>
						{name} <span className="text-[10px]">({count})</span>
					</button>
				))}
			</div>

			<section aria-label="All articles" className="mt-2">
				<h2 className="font-heading text-2xl font-medium tracking-tight text-foreground">
					All articles
				</h2>
				{filtered.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						No articles match your filters yet.
					</p>
				) : (
					<div className="grid divide-y divide-border border border-border">
						{filtered.map((article) => (
							<a
								key={article.slug}
								href={`/articles/${article.slug}`}
								className="group grid gap-1.5 border-b border-border p-5 last:border-b-0 transition-colors hover:bg-muted/25"
							>
								<div className="flex items-center gap-2">
									<span className="inline-flex items-center rounded-full border border-foreground/15 px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
										{article.series || "Article"}
									</span>
									{article.tags?.[0] ? (
										<span className="text-[11px] text-muted-foreground/80 font-mono">
											{article.tags[0]}
										</span>
									) : null}
								</div>
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
