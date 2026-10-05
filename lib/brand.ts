/**
 * Brand kit data for /brand. Mirrors docs/brand.md (statuses, type registers)
 * and the files in public/brand/ and public/marks/. Static on purpose: when a
 * file is added or renamed on disk, update the lists here.
 */

export type LogoTier = "flagship" | "fleet";

/** Logo status, as written in docs/brand.md. */
export type LogoStatus =
	| "Locked v1"
	| "Approved"
	| "In review"
	| "Interim"
	| "Needs a name"
	| "Wordmark only";

export type LogoKind = "mark" | "wordmark" | "lockup";

/** Which theme the file is drawn for: `dark` files use light ink. */
export type LogoTheme = "dark" | "light";

export type LogoAsset = {
	kind: LogoKind;
	theme: LogoTheme;
	/** Public URL of the file, e.g. `/brand/hyperpost/mark-dark.svg`. */
	path: string;
};

export type BrandProduct = {
	name: string;
	slug: string;
	tier: LogoTier;
	status: LogoStatus;
	assets: readonly LogoAsset[];
	/** Shown instead of the default message when a product has no files. */
	note?: string;
};

export const LOGO_KIND_LABEL: Record<LogoKind, string> = {
	mark: "Mark",
	wordmark: "Wordmark",
	lockup: "Lockup",
};

export const LOGO_THEME_LABEL: Record<LogoTheme, string> = {
	dark: "Dark",
	light: "Light",
};

/**
 * Swatch grounds for previewing logos, so both theme files show in either
 * theme. These are the `--frame` values from app/styles/globals.css.
 */
export const SWATCH_GROUND: Record<LogoTheme, string> = {
	dark: "#0d0d0d",
	light: "#fbfbfa",
};

const THEMES: readonly LogoTheme[] = ["dark", "light"];
const FLAGSHIP_KINDS: readonly LogoKind[] = ["mark", "wordmark", "lockup"];

/** `public/brand/<slug>/{mark,wordmark,lockup}-{dark,light}.svg` */
function flagshipAssets(slug: string): LogoAsset[] {
	return FLAGSHIP_KINDS.flatMap((kind) =>
		THEMES.map((theme) => ({
			kind,
			theme,
			path: `/brand/${slug}/${kind}-${theme}.svg`,
		})),
	);
}

/** `public/marks/<slug>-{dark,light}.svg` */
function fleetAssets(slug: string): LogoAsset[] {
	return THEMES.map((theme) => ({
		kind: "mark",
		theme,
		path: `/marks/${slug}-${theme}.svg`,
	}));
}

/**
 * Flagships first, then the fleet in app-config order. The flagship marks are
 * also copied to public/marks/<slug>-{dark,light}.svg (byte-identical) for
 * app-config; only the public/brand/ copies are listed here.
 */
export const BRAND_PRODUCTS: readonly BrandProduct[] = [
	{
		name: "Hyperpost",
		slug: "hyperpost",
		tier: "flagship",
		status: "Locked v1",
		assets: flagshipAssets("hyperpost"),
	},
	{
		name: "vswarm",
		slug: "vswarm",
		tier: "flagship",
		status: "Locked v1",
		assets: flagshipAssets("vswarm"),
	},
	{
		name: "Workbot",
		slug: "workbot",
		tier: "fleet",
		status: "Approved",
		assets: fleetAssets("workbot"),
	},
	{
		name: "Command Center",
		slug: "command-center",
		tier: "fleet",
		status: "In review",
		assets: fleetAssets("command-center"),
	},
	{
		name: "Arcwrite",
		slug: "arcwrite",
		tier: "fleet",
		status: "Approved",
		assets: fleetAssets("arcwrite"),
	},
	{
		name: "RSSX",
		slug: "rssx",
		tier: "fleet",
		status: "Interim",
		assets: fleetAssets("rssx"),
	},
	{
		name: "Brain",
		slug: "brain",
		tier: "fleet",
		status: "In review",
		assets: fleetAssets("brain"),
	},
	{
		name: "ui",
		slug: "ui",
		tier: "fleet",
		status: "Interim",
		assets: fleetAssets("ui"),
	},
	{
		name: "Zig World",
		slug: "zig-world",
		tier: "fleet",
		status: "Interim",
		assets: [],
		note: "No mark yet. The site shows a ZW monogram until one is drawn.",
	},
	{
		name: "Media Server",
		slug: "media-server",
		tier: "fleet",
		status: "Needs a name",
		assets: [],
	},
];

export type ColorToken = {
	/** Token name, as used in Tailwind utilities (`bg-frame`, `text-fg-2`). */
	name: string;
	/** CSS custom property defined in app/styles/globals.css. */
	variable: `--${string}`;
};

/** The Stealth set, in the order docs/brand.md lists it. */
export const COLOR_TOKENS: readonly ColorToken[] = [
	"page",
	"frame",
	"raised",
	"hover",
	"line",
	"line-2",
	"fg",
	"fg-2",
	"fg-3",
	"fg-4",
	"success",
	"warning",
	"danger",
].map((name) => ({ name, variable: `--${name}` as const }));

export type TypeRow = {
	id: string;
	name: string;
	/** Typeface and setting. */
	face: string;
	/** What it is used for, or which products use it. */
	use: string;
	specimen:
		| { type: "wordmark"; slug: string; label: string }
		| {
				type: "text";
				text: string;
				/** Tailwind classes that set the face, size, and tracking. */
				className: string;
		  };
};

/** Wordmark registers from docs/brand.md. All faces are SIL Open Font License. */
export const TYPE_REGISTERS: readonly TypeRow[] = [
	{
		id: "hyperpost-line",
		name: "Hyperpost line",
		face: "Michroma, wide italic, with the comet blade",
		use: "Hyperpost, Brain",
		specimen: { type: "wordmark", slug: "hyperpost", label: "Hyperpost" },
	},
	{
		id: "vswarm-line",
		name: "vswarm line",
		face: "Big Shoulders Display Black, heavy condensed italic, with the stripe",
		use: "vswarm",
		specimen: { type: "wordmark", slug: "vswarm", label: "vswarm" },
	},
	{
		id: "helpers",
		name: "Helpers",
		face: "Geist 800, lowercase",
		use: "Workbot",
		specimen: {
			type: "text",
			text: "workbot",
			className: "text-[28px] font-extrabold lowercase tracking-[-0.05em]",
		},
	},
];

/** Interface type from docs/brand.md. */
export const INTERFACE_TYPE: readonly TypeRow[] = [
	{
		id: "geist-sans",
		name: "Geist Sans",
		face: "500, −0.06em for display, −0.04em for section titles",
		use: "Interface and headings",
		specimen: {
			type: "text",
			text: "Brand",
			className: "text-[32px] font-medium tracking-[-0.06em]",
		},
	},
	{
		id: "geist-mono",
		name: "Geist Mono",
		face: "400",
		use: "Code blocks only",
		specimen: {
			type: "text",
			text: "npx skills add",
			className: "font-mono text-xl tracking-normal",
		},
	},
];
