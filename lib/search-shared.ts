/** Search types and page shortcuts, safe to import from client components. */
export type SearchKind =
	| "Page"
	| "Product"
	| "Tool"
	| "Skill"
	| "Find"
	| "Archive"
	| "Brand";

export type SearchItem = {
	kind: SearchKind;
	title: string;
	description: string;
	href: string;
	external: boolean;
};

/** The pages a single key opens. Shown in the nav and search. */
export const PAGE_SHORTCUTS = [
	{ key: "p", href: "/#fleet", label: "Products" },
	{ key: "s", href: "/stack", label: "Stack" },
	{ key: "k", href: "/skills", label: "Skills" },
	{ key: "b", href: "/brand", label: "Brand" },
	{ key: "f", href: "/finds", label: "Finds" },
	{ key: "a", href: "/archive", label: "Archive" },
] as const;
