import { defineTool } from "eve/tools";
import { z } from "zod";

type Hit = {
	objectID: string;
	title: string | null;
	url: string | null;
	points: number | null;
	num_comments: number | null;
	created_at: string;
};

export default defineTool({
	description:
		"Search recent Hacker News posts (Show HN by default) for new AI projects. Returns post titles, links, and discussion size. Treat it as a lead, not a source: read the project's own README before writing.",
	inputSchema: z.object({
		query: z.string().describe('Keywords, for example "LLM", "agent", "open source model".'),
		days: z.number().int().min(1).max(60).default(14),
		showHnOnly: z.boolean().default(true),
	}),
	async execute({ query, days, showHnOnly }, ctx) {
		const since = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;
		const params = new URLSearchParams({
			query,
			tags: showHnOnly ? "show_hn" : "story",
			numericFilters: `created_at_i>${since}`,
			hitsPerPage: "25",
		});
		const response = await fetch(`https://hn.algolia.com/api/v1/search?${params}`, {
			signal: ctx.abortSignal,
		});
		if (!response.ok) {
			return { error: `Hacker News search returned ${response.status}`, results: [] };
		}
		const { hits } = (await response.json()) as { hits: Hit[] };
		return {
			results: hits
				.filter((hit) => hit.url)
				.map((hit) => ({
					title: hit.title,
					url: hit.url,
					points: hit.points ?? 0,
					comments: hit.num_comments ?? 0,
					postedAt: hit.created_at.slice(0, 10),
					discussion: `https://news.ycombinator.com/item?id=${hit.objectID}`,
				})),
		};
	},
});
