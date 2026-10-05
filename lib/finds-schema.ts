import { z } from "zod";

/**
 * Frontmatter for a find: one open-source project worth knowing about.
 * Shared by the site (renders content/finds) and the finds agent (validates
 * before it commits), so a file that renders is a file the agent may write.
 */
export const FIND_CATEGORIES = [
	"agents",
	"sdks",
	"inference",
	"evals",
	"data",
	"devtools",
	"ui",
	"infra",
] as const;

export const FIND_CATEGORY_LABEL: Record<
	(typeof FIND_CATEGORIES)[number],
	string
> = {
	agents: "Agents",
	sdks: "SDKs",
	inference: "Inference",
	evals: "Evals",
	data: "Data",
	devtools: "Dev tools",
	ui: "UI",
	infra: "Infra",
};

/** File names are `YYYY-MM-DD-slug.md`; the slug is the URL. */
export const FIND_FILENAME =
	/^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/;

export const findFrontmatterSchema = z
	.object({
		/** The project's own name, as its README writes it. */
		title: z.string().min(1).max(60),
		/** One plain sentence: what it is. No slogans. */
		summary: z.string().min(20).max(200),
		/** Canonical source: the repository URL. */
		url: z.string().url(),
		homepage: z.string().url().optional(),
		category: z.enum(FIND_CATEGORIES),
		tags: z
			.array(z.string().regex(/^[a-z0-9-]+$/))
			.max(6)
			.default([]),
		language: z.string().max(30).optional(),
		license: z.string().max(30).optional(),
		/** Who wrote the entry: a person, or the agent's name. */
		author: z.string().min(1).max(40),
		date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	})
	.strict();

export type FindFrontmatter = z.infer<typeof findFrontmatterSchema>;
