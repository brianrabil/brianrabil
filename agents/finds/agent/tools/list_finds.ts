import { listFinds } from "#lib/github.js";
import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
	description:
		"List finds already published on brianrabil.com (slug, date, title, repository URL), newest first. Call this before researching so you skip anything already covered.",
	inputSchema: z.object({
		limit: z.number().int().min(1).max(500).default(200),
	}),
	async execute({ limit }, ctx) {
		const finds = await listFinds(ctx.abortSignal);
		return { total: finds.length, finds: finds.slice(0, limit) };
	},
});
