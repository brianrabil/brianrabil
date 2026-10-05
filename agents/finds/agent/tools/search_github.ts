import { gh, isoDaysAgo } from "#lib/github.js";
import { defineTool } from "eve/tools";
import { z } from "zod";

type Repo = {
	full_name: string;
	html_url: string;
	description: string | null;
	stargazers_count: number;
	language: string | null;
	license: { spdx_id: string | null } | null;
	homepage: string | null;
	created_at: string;
	pushed_at: string;
	fork: boolean;
	archived: boolean;
	topics?: string[];
};

export default defineTool({
	description:
		"Search GitHub for recently created open-source repositories. Use topics (llm, ai-agents, rag, mcp, inference, evals) or keywords. Returns repo metadata only; read the README with web_fetch before writing about one.",
	inputSchema: z.object({
		query: z
			.string()
			.describe('A topic like "topic:llm" or keywords like "agent framework". Qualifiers are added for you.'),
		createdAfterDays: z.number().int().min(1).max(180).default(60),
		minStars: z.number().int().min(0).default(50),
	}),
	async execute({ query, createdAfterDays, minStars }, ctx) {
		const q = `${query} created:>${isoDaysAgo(createdAfterDays)} stars:>=${minStars} fork:false archived:false`;
		const response = await fetch(
			`https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=20`,
			{ headers: gh(), signal: ctx.abortSignal },
		);
		if (!response.ok) {
			return { error: `GitHub search returned ${response.status}`, results: [] };
		}
		const { items } = (await response.json()) as { items: Repo[] };
		return {
			results: items.map((repo) => ({
				name: repo.full_name,
				url: repo.html_url,
				description: repo.description,
				stars: repo.stargazers_count,
				language: repo.language,
				license: repo.license?.spdx_id ?? null,
				homepage: repo.homepage || null,
				createdAt: repo.created_at.slice(0, 10),
				lastPush: repo.pushed_at.slice(0, 10),
				topics: repo.topics ?? [],
			})),
		};
	},
});
