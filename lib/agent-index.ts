/**
 * Read-only views of the site's data for agents: shared by /llms.txt and the
 * MCP server at /mcp. Everything here is derived from the data modules; no
 * product, tool, skill, or find is copied by hand.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { STATUS_LABEL } from "@/components/status-badge";
import { ARCHIVE } from "@/lib/archive";
import { type Find, getAllFinds } from "@/lib/finds";
import { CATEGORY_LABEL, type Product, getFleet } from "@/lib/fleet";
import { SKILL_GROUPS, type Skill, type SkillGroup } from "@/lib/skills";
import { STACK, type StackEntry, type StackLayer } from "@/lib/stack";

export function siteUrl() {
	return (process.env.NEXT_PUBLIC_SITE_URL || "https://brianrabil.com").replace(
		/\/+$/,
		"",
	);
}

/** The product's own site when it has one, otherwise its place on the home page. */
export function productUrl(product: Product) {
	return product.link[0]?.href ?? `${siteUrl()}/#fleet`;
}

export function toProductRecord(product: Product) {
	return {
		name: product.name,
		slug: product.slug,
		category: product.category,
		categoryLabel: CATEGORY_LABEL[product.category],
		status: product.status,
		statusLabel: STATUS_LABEL[product.status] ?? product.status,
		description: product.description,
		builtWith: product.used,
		url: productUrl(product),
		links: product.link.map(({ href, label }) => ({ href, label })),
	};
}

/** Products in home page order: grouped by category, app-config order within. */
export function getProducts() {
	return getFleet().shelves.flatMap((shelf) => shelf.products);
}

export function toStackRecord(layer: StackLayer, entry: StackEntry) {
	return {
		layer: layer.id,
		layerLabel: layer.label,
		name: entry.name,
		role: entry.role,
		url: entry.href,
		usedBy: entry.products ?? [],
	};
}

export function getStack(layerId?: string) {
	return STACK.filter((layer) => !layerId || layer.id === layerId).flatMap(
		(layer) => layer.entries.map((entry) => toStackRecord(layer, entry)),
	);
}

export function skillUrl(group: SkillGroup, skill: Skill) {
	return `https://github.com/${group.repo}/tree/main/${skill.path}`;
}

export function toSkillRecord(group: SkillGroup, skill: Skill) {
	return {
		group: group.id,
		groupLabel: group.label,
		name: skill.name,
		description: skill.description,
		install: `npx skills add ${group.repo}`,
		url: skillUrl(group, skill),
	};
}

export function getSkills(groupId?: string) {
	return SKILL_GROUPS.filter(
		(group) => !groupId || group.id === groupId,
	).flatMap((group) =>
		group.skills.map((skill) => toSkillRecord(group, skill)),
	);
}

export function findUrl(find: Pick<Find, "slug">) {
	return `${siteUrl()}/finds/${find.slug}`;
}

export function toFindRecord(find: Find) {
	const { body: _body, ...frontmatter } = find;
	return { ...frontmatter, pageUrl: findUrl(find) };
}

export function archiveUrl(groupId: string) {
	return `${siteUrl()}/archive#${groupId}`;
}

export function getArchive() {
	return ARCHIVE.flatMap((group) =>
		group.entries.map((entry) => ({
			group: group.id,
			groupLabel: group.label,
			name: entry.name,
			years: entry.years,
			description: entry.description,
			url: archiveUrl(group.id),
		})),
	);
}

/** Files served as text by the MCP server. Listed in next.config so they deploy. */
export const BRAND_RULES_FILE = "docs/brand.md";
export const VOICE_RULES_FILE = ".claude/skills/plain-voice/SKILL.md";

export function readRepoFile(file: string) {
	return readFile(path.join(process.cwd(), file), "utf8");
}

export type SearchResult = {
	type: "product" | "stack" | "skill" | "find";
	name: string;
	description: string;
	url: string;
};

/** Case-insensitive substring match over names and descriptions. */
export async function search(query: string): Promise<SearchResult[]> {
	const needle = query.trim().toLowerCase();
	if (!needle) return [];
	const matches = (...fields: string[]) =>
		fields.some((field) => field.toLowerCase().includes(needle));

	const products: SearchResult[] = getProducts()
		.filter((product) => matches(product.name, product.description))
		.map((product) => ({
			type: "product",
			name: product.name,
			description: product.description,
			url: productUrl(product),
		}));

	const stack: SearchResult[] = getStack()
		.filter((entry) => matches(entry.name, entry.role))
		.map((entry) => ({
			type: "stack",
			name: entry.name,
			description: entry.role,
			url: entry.url,
		}));

	const skills: SearchResult[] = getSkills()
		.filter((skill) => matches(skill.name, skill.description))
		.map((skill) => ({
			type: "skill",
			name: skill.name,
			description: skill.description,
			url: skill.url,
		}));

	const finds: SearchResult[] = (await getAllFinds())
		.filter((find) => matches(find.title, find.summary))
		.map((find) => ({
			type: "find",
			name: find.title,
			description: find.summary,
			url: findUrl(find),
		}));

	return [...products, ...stack, ...skills, ...finds];
}
