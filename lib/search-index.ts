import { appConfig } from "@/lib/app-config";
import { ARCHIVE } from "@/lib/archive";
import { BRAND_PRODUCTS } from "@/lib/brand";
import { getAllFinds } from "@/lib/finds";
import { PAGE_SHORTCUTS, type SearchItem } from "@/lib/search-shared";
import { SKILL_GROUPS } from "@/lib/skills";
import { STACK } from "@/lib/stack";

/** Everything the ⌘K search can find, built on the server from the data modules. */
export async function getSearchIndex(): Promise<SearchItem[]> {
	const finds = await getAllFinds();

	return [
		...PAGE_SHORTCUTS.map((page) => ({
			kind: "Page" as const,
			title: page.label,
			description: `Press ${page.key.toUpperCase()}`,
			href: page.href,
			external: false,
		})),
		...appConfig.projects.map((product) => {
			const link = product.link[0];
			return {
				kind: "Product" as const,
				title: product.name,
				description: product.description,
				href: link?.href ?? "/#fleet",
				external: Boolean(link && /^https?:\/\//.test(link.href)),
			};
		}),
		...STACK.flatMap((layer) =>
			layer.entries.map((entry) => ({
				kind: "Tool" as const,
				title: entry.name,
				description: entry.role,
				href: entry.href,
				external: true,
			})),
		),
		...SKILL_GROUPS.flatMap((group) =>
			group.skills.map((skill) => ({
				kind: "Skill" as const,
				title: skill.name,
				description: skill.description,
				href: `https://github.com/${group.repo}/tree/main/${skill.path}`,
				external: true,
			})),
		),
		...finds.map((find) => ({
			kind: "Find" as const,
			title: find.title,
			description: find.summary,
			href: `/finds/${find.slug}`,
			external: false,
		})),
		...BRAND_PRODUCTS.filter((product) => product.assets.length > 0).map(
			(product) => ({
				kind: "Brand" as const,
				title: `${product.name} logo`,
				description: `${product.assets.length} SVG files`,
				href: `/brand#logo-${product.slug}`,
				external: false,
			}),
		),
		...ARCHIVE.flatMap((group) =>
			group.entries.map((entry) => ({
				kind: "Archive" as const,
				title: entry.name,
				description: entry.description,
				href: "/archive",
				external: false,
			})),
		),
	];
}
