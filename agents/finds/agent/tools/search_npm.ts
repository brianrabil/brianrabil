import { defineTool } from "eve/tools";
import { z } from "zod";

type NpmResult = {
	package: {
		name: string;
		version: string;
		description?: string;
		date: string;
		keywords?: string[];
		links: { npm?: string; repository?: string; homepage?: string };
	};
};

export default defineTool({
	description:
		"Search the npm registry for packages. Useful for finding new JavaScript and TypeScript AI libraries and their repositories. Returns registry metadata only.",
	inputSchema: z.object({
		text: z
			.string()
			.describe('Search text; npm qualifiers work, for example "keywords:ai-agent" or "llm sdk".'),
		size: z.number().int().min(1).max(50).default(20),
	}),
	async execute({ text, size }, ctx) {
		const response = await fetch(
			`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(text)}&size=${size}`,
			{ signal: ctx.abortSignal },
		);
		if (!response.ok) {
			return { error: `npm search returned ${response.status}`, results: [] };
		}
		const { objects } = (await response.json()) as { objects: NpmResult[] };
		return {
			results: objects.map(({ package: pkg }) => ({
				name: pkg.name,
				version: pkg.version,
				description: pkg.description ?? null,
				lastPublished: pkg.date.slice(0, 10),
				keywords: pkg.keywords ?? [],
				npm: pkg.links.npm ?? null,
				repository: pkg.links.repository ?? null,
				homepage: pkg.links.homepage ?? null,
			})),
		};
	},
});
