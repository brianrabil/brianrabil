import {
	BRAND_RULES_FILE,
	VOICE_RULES_FILE,
	getProducts,
	getSkills,
	getStack,
	readRepoFile,
	search,
	toFindRecord,
	toProductRecord,
} from "@/lib/agent-index";
import { getAllFinds, getFind } from "@/lib/finds";
import { FIND_CATEGORIES } from "@/lib/finds-schema";
import { SKILL_GROUPS } from "@/lib/skills";
import { STACK } from "@/lib/stack";
import { AppConfigSchema } from "@/lib/zod";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const PRODUCT_STATUSES = AppConfigSchema.shape.projects.element.shape.status;
const STACK_LAYER_IDS = STACK.map((layer) => layer.id);
const SKILL_GROUP_IDS = SKILL_GROUPS.map((group) => group.id);

const readOnly = {
	readOnlyHint: true,
	destructiveHint: false,
	idempotentHint: true,
	openWorldHint: false,
} as const;

function json(value: unknown) {
	return {
		content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
	};
}

function text(value: string) {
	return { content: [{ type: "text" as const, text: value }] };
}

function notFound(message: string) {
	return { isError: true, content: [{ type: "text" as const, text: message }] };
}

const handler = createMcpHandler(
	(server) => {
		server.registerTool(
			"list_products",
			{
				title: "List products",
				description:
					"Lists the software products built and owned by Brian Rabil, with category, status, description, the tools each is built with, and a URL. Optionally filters by status.",
				inputSchema: z.object({
					status: PRODUCT_STATUSES.optional().describe(
						"Only return products with this status, for example live, alpha, or building.",
					),
				}),
				annotations: readOnly,
			},
			async ({ status }) =>
				json(
					getProducts()
						.filter((product) => !status || product.status === status)
						.map(toProductRecord),
				),
		);

		server.registerTool(
			"get_product",
			{
				title: "Get product",
				description:
					"Returns one product by its slug, for example hyperpost or rssx.",
				inputSchema: z.object({
					slug: z.string().min(1).describe("The product slug."),
				}),
				annotations: readOnly,
			},
			async ({ slug }) => {
				const products = getProducts();
				const product = products.find((item) => item.slug === slug);
				if (!product) {
					return notFound(
						`No product with slug "${slug}". Known slugs: ${products.map((item) => item.slug).join(", ")}.`,
					);
				}
				return json(toProductRecord(product));
			},
		);

		server.registerTool(
			"list_stack",
			{
				title: "List stack",
				description:
					"Lists the tools and libraries the products are built with, grouped by layer, with each tool's role, URL, and the products whose code depends on it. Optionally filters by layer id.",
				inputSchema: z.object({
					layer: z
						.enum(STACK_LAYER_IDS)
						.optional()
						.describe("Only return tools in this layer."),
				}),
				annotations: readOnly,
			},
			async ({ layer }) => json(getStack(layer)),
		);

		server.registerTool(
			"list_skills",
			{
				title: "List skills",
				description:
					"Lists the agent skills published by Brian Rabil, with a description, the install command, and a GitHub URL for each. Optionally filters by group id.",
				inputSchema: z.object({
					group: z
						.enum(SKILL_GROUP_IDS)
						.optional()
						.describe("Only return skills in this group."),
				}),
				annotations: readOnly,
			},
			async ({ group }) => json(getSkills(group)),
		);

		server.registerTool(
			"list_finds",
			{
				title: "List finds",
				description:
					"Lists finds, newest first: open-source projects with a title, one-sentence summary, category, tags, and source URL. Does not include the entry text; use get_find for that.",
				inputSchema: z.object({
					limit: z
						.number()
						.int()
						.min(1)
						.max(100)
						.optional()
						.describe("Maximum number of finds to return."),
					category: z
						.enum(FIND_CATEGORIES)
						.optional()
						.describe("Only return finds in this category."),
				}),
				annotations: readOnly,
			},
			async ({ limit, category }) => {
				const finds = (await getAllFinds()).filter(
					(find) => !category || find.category === category,
				);
				return json(finds.slice(0, limit).map(toFindRecord));
			},
		);

		server.registerTool(
			"get_find",
			{
				title: "Get find",
				description:
					"Returns one find by its slug: its metadata as JSON, then its markdown text.",
				inputSchema: z.object({
					slug: z
						.string()
						.min(1)
						.describe("The find slug, as in /finds/<slug>."),
				}),
				annotations: readOnly,
			},
			async ({ slug }) => {
				const find = await getFind(slug);
				if (!find) {
					return notFound(
						`No find with slug "${slug}". Call list_finds to see the slugs.`,
					);
				}
				return {
					content: [
						{
							type: "text" as const,
							text: JSON.stringify(toFindRecord(find), null, 2),
						},
						{ type: "text" as const, text: find.body },
					],
				};
			},
		);

		server.registerTool(
			"get_brand_rules",
			{
				title: "Get brand rules",
				description:
					"Returns the site's brand document (docs/brand.md) as markdown: identity, voice, colors, type, logos, and product statuses.",
				annotations: readOnly,
			},
			async () => text(await readRepoFile(BRAND_RULES_FILE)),
		);

		server.registerTool(
			"get_voice_rules",
			{
				title: "Get voice rules",
				description:
					"Returns the plain-voice skill (SKILL.md) as markdown: the rules for writing copy on this site and its products, with banned shapes and a rewrite procedure.",
				annotations: readOnly,
			},
			async () => text(await readRepoFile(VOICE_RULES_FILE)),
		);

		server.registerTool(
			"search",
			{
				title: "Search",
				description:
					"Case-insensitive text search over product names and descriptions, stack tool names and roles, skill names and descriptions, and find titles and summaries. Returns matches with a type and URL.",
				inputSchema: z.object({
					query: z.string().min(1).max(200).describe("Text to look for."),
				}),
				annotations: readOnly,
			},
			async ({ query }) => json(await search(query)),
		);
	},
	{
		serverInfo: { name: "brianrabil", version: "1.0.0" },
		instructions:
			"Read-only data from brianrabil.com: Brian Rabil's software products, the tools they are built with, his published agent skills, finds, and the site's brand and voice rules.",
	},
);

export { handler as GET, handler as POST, handler as DELETE };
