import { cn } from "@/lib/utils";
import {
	Apple,
	BetterAuth,
	Bun,
	ClaudeCode,
	CodexOpenai,
	Comfyui,
	Cursor,
	Drizzle,
	Ghostty,
	Grok,
	HuggingFace,
	Langgraph,
	Motion,
	Nextjs,
	NousresearchHermes,
	Obsidian,
	Polar,
	Pydantic,
	Remotion,
	Ruff,
	Rust,
	ShadcnUi,
	Swr,
	Tailwindcss,
	Threejs,
	Tokio,
	Turborepo,
	Ty,
	Uv,
	V0,
	Vercel,
	X,
	Zig,
	Zod,
} from "@thesvg/react";

type Svg = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/** Workflow's pyramid mark, from workflow-sdk.dev. */
function WorkflowMark(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0.789 51.786 39.952"
			fill="currentColor"
			{...props}
		>
			<path d="M10.4565 28.7551C11.2812 28.7551 11.951 29.4275 11.9515 30.2545V39.2417C11.9515 40.069 11.2815 40.7409 10.4565 40.7409H1.49497C0.669969 40.7409 0 40.069 0 39.2417V30.2545C0.000422957 29.4275 0.67023 28.7551 1.49497 28.7551H10.4565Z" />
			<path d="M20.4174 14.7722C21.2419 14.7722 21.9116 15.442 21.9124 16.2688V26.3205C21.9464 27.6651 23.0408 28.7462 24.3883 28.7533H30.3764C31.2012 28.7533 31.871 29.4256 31.8715 30.2526V39.2398C31.8715 40.0672 31.2014 40.7391 30.3764 40.7391H21.415C20.5898 40.7391 19.92 40.0672 19.92 39.2398V29.1881C19.8856 27.861 18.8175 26.7918 17.4942 26.758L17.4302 26.7552H11.4559C10.6311 26.7552 9.96125 26.0858 9.96094 25.2588V16.2688C9.96173 15.442 10.6314 14.7722 11.4559 14.7722H20.4174Z" />
			<path d="M30.3734 0.788925C31.1982 0.788928 31.868 1.46114 31.8684 2.28819V12.3399C31.9028 13.6888 33.0048 14.7728 34.3582 14.7728H40.3325C41.157 14.7728 41.8266 15.4425 41.8274 16.2693V26.321C41.8615 27.6657 42.956 28.7467 44.3034 28.7539H50.2915C51.1163 28.7539 51.7861 29.4262 51.7865 30.2532V39.2404C51.7865 40.0677 51.1166 40.7396 50.2915 40.7396H41.3301C40.5049 40.7396 39.8351 40.0677 39.8351 39.2404V29.1886C39.8007 27.8615 38.7327 26.7924 37.4093 26.7585L37.3453 26.7558H31.371C30.5461 26.7558 29.8764 26.0864 29.8761 25.2593V15.2075C29.8426 13.8797 28.7742 12.8084 27.4502 12.7747H21.412C20.5868 12.7747 19.917 12.1028 19.917 11.2754V2.28819C19.9174 1.46114 20.5871 0.788928 21.412 0.788925H30.3734Z" />
		</svg>
	);
}

/** Stealth's mark, from stealth.pm. */
function StealthMark(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			viewBox="3 4.4 18 13.8"
			fill="currentColor"
			{...props}
		>
			<path d="M12 4.8 3.45 15.75 6.6 16.65 8.13 13.95 9.93 17.73 12 14.85Z" />
			<path
				d="M12 4.8 20.55 15.75 17.4 16.65 15.87 13.95 14.07 17.73 12 14.85Z"
				opacity=".55"
			/>
		</svg>
	);
}

/** Nitro's mark, from nitro.build, with its brand gradient. */
function NitroMark(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg aria-hidden="true" viewBox="0 0 40 40" {...props}>
			<defs>
				<linearGradient
					id="stack-nitro-gradient"
					x1="4"
					x2="43"
					y1="20"
					y2="20"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#31B2F3" />
					<stop offset="0.474" stopColor="#F27CEC" />
					<stop offset="1" stopColor="#FD6641" />
				</linearGradient>
			</defs>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M35.2166 7.02016C28.0478 -1.38317 15.4241 -2.38397 7.02077 4.78481C-1.38256 11.9536 -2.38336 24.5773 4.78542 32.9806C11.9542 41.3839 24.5779 42.3847 32.9812 35.216C41.3846 28.0472 42.3854 15.4235 35.2166 7.02016ZM25.2525 17.5175C26.0233 17.5175 26.5155 18.3527 26.1287 19.0194L26.0175 19.2111L18.4696 31.6294C18.3293 31.8602 18.0788 32.001 17.8088 32.001H17.0883C16.5946 32.001 16.2336 31.5349 16.3573 31.0569L18.4054 23.1384C18.5691 22.5053 18.0912 21.888 17.4373 21.888H14.2914C13.6375 21.888 13.1596 21.2708 13.3232 20.6377L16.4137 8.68289C16.5261 8.28056 16.8904 7.99734 17.3081 8.00208C17.3587 8.00266 17.4046 8.0035 17.4427 8.0047L20.6109 8.00465C21.217 8.00436 21.684 8.53896 21.6023 9.13949L21.5828 9.28246L20.3746 16.349C20.2702 16.9598 20.7406 17.5175 21.3603 17.5175H25.2525Z"
				fill="url(#stack-nitro-gradient)"
			/>
		</svg>
	);
}

/** Mux's M, from mux.com. */
function MuxMark(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 500 500"
			fill="currentColor"
			{...props}
		>
			<path d="M437.511,468.521c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m23.915,-463.762c-23.348,-9.672 -50.226,-4.327 -68.096,13.544l-143.331,143.329l-143.33,-143.329c-17.871,-17.871 -44.747,-23.216 -68.096,-13.544c-23.349,9.671 -38.574,32.455 -38.574,57.729l0,375.026c0,34.51 27.977,62.486 62.487,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-224.173l80.843,80.844c24.404,24.402 63.965,24.402 88.369,-0l80.843,-80.844l0,224.173c0,34.51 27.976,62.486 62.486,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-375.026c0,-25.274 -15.224,-48.058 -38.573,-57.729" />
		</svg>
	);
}

/** TypeGraph's mark, from typegraph.dev, without the "TS" label (unreadable at icon size). */
function TypeGraphMark(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg aria-hidden="true" viewBox="0 0 100 100" {...props}>
			<g stroke="#3178c6" strokeWidth="3" strokeLinecap="round">
				<line x1="50" y1="35" x2="50" y2="10" />
				<line x1="65" y1="58" x2="88" y2="70" />
				<line x1="35" y1="58" x2="12" y2="82" />
			</g>
			<polygon points="50,30 68,42 68,62 50,74 32,62 32,42" fill="#3178c6" />
			<circle cx="50" cy="10" r="10" fill="#6aaccc" />
			<circle cx="88" cy="70" r="9" fill="#4080a8" />
			<circle cx="12" cy="82" r="11" fill="#1a3a6c" />
		</svg>
	);
}

/** The "v" from vgpu's serif wordmark on vgpu.sh. */
function VgpuMark(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			viewBox="-3 11 52 50"
			fill="currentColor"
			{...props}
		>
			<path
				transform="translate(0 56.799805)"
				d="M20.160156-42.398438H-2.398438v.320313l6.957032 3.839844L21.359375 1.199219h3.519531L41.839844-39.039063l6.558594-3.121093v-.238282H29.839844v.320313l7.921875 3.839844L25.039062-7.519531 12.160156-38.238281l8-3.839844Z"
			/>
		</svg>
	);
}

/** fx's mark, from fx.sh. */
function FxMark(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			viewBox="166.241 0 155.861 156"
			fill="currentColor"
			{...props}
		>
			<path d="M237.89 0C243.18 0 249.38 1.42 253.03 3.07L255.09 4.01L250.08 18.63L247.68 17.75C244.9 16.72 241.94 15.8 238.49 15.8C234.98 15.8 232.79 16.56 231.08 18.32C229.23 20.23 227.63 23.64 226.23 29.76L226.23 29.76L226.23 29.76L225.14 34.85H241.67L260.43 34.95L260.69 34.95L260.84 35.17L278.85 61.63L296.74 34.95H320.87L291.68 76.74L322.1 119.75H299.33L299.18 119.55L241.14 40.48L239.35 49.4H222.07L205.69 127.21C203.93 135.71 201.19 142.84 196.78 147.87C192.27 153.01 186.2 155.75 178.34 155.75C174.18 155.75 170.75 155.11 167.91 154.11L166.24 153.52V137.18L166.9 137.4L169.53 138.28C172.18 139.16 174.41 139.8 177.14 139.8C178.53 139.8 179.7 139.53 180.73 138.98C181.76 138.43 182.68 137.6 183.52 136.44C185.3 133.99 186.72 130.13 187.9 124.67L203.76 49.4H189.87L191.76 39.44L192.04 39.35L206.82 34.47L208.15 28.64C210.52 18.21 213.77 10.94 218.71 6.32C223.74 1.61 230.13 0 237.89 0ZM273.99 99.08L260.07 120.25H234.54L261 82.02L273.99 99.08Z" />
		</svg>
	);
}

/** A lettermark for tools with no published logo. */
function lettermark(text: string) {
	return function Lettermark(props: React.SVGProps<SVGSVGElement>) {
		return (
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				fill="currentColor"
				{...props}
			>
				<text
					x="12"
					y="17"
					textAnchor="middle"
					fontFamily="var(--font-geist-sans), sans-serif"
					fontSize="15"
					fontWeight="700"
					letterSpacing="-0.5"
				>
					{text}
				</text>
			</svg>
		);
	};
}

/** Canvas UI's mark, cropped from canvasui.dev/logo.svg (white artwork, so served as a file). */
function CanvasUiMark(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg aria-hidden="true" viewBox="0 0 81.0113 75.0924" {...props}>
			<image href="/stack/canvas-ui.svg" width="81.0113" height="75.0924" />
		</svg>
	);
}

/** eve's mark, from eve.dev. */
function EveMark(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg aria-hidden="true" viewBox="0 0 169 53" fill="currentColor" {...props}>
			<path d="M169 8.47h-51.39L81.73 53H70.36L113 0H169zM169 44.51v8.47h-45.87V44.5zM45.87 52.98H0V44.5h45.87zM38.66 30.55H0v-8.47h38.66z" />
			<path d="M169 30.55h-38.66v-8.47H169zM75.52 8.47H0V0h75.52z" />
		</svg>
	);
}

/**
 * thesvg ships brand artwork in fixed colours. White-only marks are inverted in
 * the light theme and black-only marks in the dark theme so every icon stays
 * visible; full-colour marks keep their brand colours.
 */
const ICONS: Record<string, { icon: Svg; tone?: "white" | "black" }> = {
	vercel: { icon: Vercel, tone: "white" },
	workflow: { icon: WorkflowMark },
	eve: { icon: EveMark },
	stealth: { icon: StealthMark },
	nitro: { icon: NitroMark },
	motion: { icon: Motion },
	zod: { icon: Zod },
	"claude-code": { icon: ClaudeCode },
	codex: { icon: CodexOpenai },
	grok: { icon: Grok, tone: "white" },
	v0: { icon: V0 },
	polar: { icon: Polar },
	"canvas-ui": { icon: CanvasUiMark, tone: "white" },
	uv: { icon: Uv },
	ruff: { icon: Ruff },
	ty: { icon: Ty },
	pydantic: { icon: Pydantic },
	huggingface: { icon: HuggingFace },
	mlx: { icon: Apple, tone: "white" },
	langgraph: { icon: Langgraph, tone: "black" },
	cursor: { icon: Cursor },
	ax: { icon: lettermark("Ax") },
	inspect: { icon: lettermark("In") },
	fx: { icon: FxMark },
	hermes: { icon: NousresearchHermes },
	tokio: { icon: Tokio, tone: "black" },
	vgpu: { icon: VgpuMark },
	ghostty: { icon: Ghostty },
	comfyui: { icon: Comfyui },
	typegraph: { icon: TypeGraphMark },
	threejs: { icon: Threejs },
	remotion: { icon: Remotion },
	mux: { icon: MuxMark },
	obsidian: { icon: Obsidian },
	x: { icon: X, tone: "black" },
	nextjs: { icon: Nextjs },
	shadcn: { icon: ShadcnUi, tone: "white" },
	swr: { icon: Swr, tone: "white" },
	turborepo: { icon: Turborepo },
	tailwind: { icon: Tailwindcss },
	bun: { icon: Bun },
	zig: { icon: Zig },
	rust: { icon: Rust, tone: "white" },
	drizzle: { icon: Drizzle },
	betterauth: { icon: BetterAuth },
};

export type StackIconName = keyof typeof ICONS;

export function StackIcon({
	name,
	bare = false,
	className,
}: {
	name: StackIconName;
	/** Just the icon, without the tile. */
	bare?: boolean;
	className?: string;
}) {
	const entry = ICONS[name];
	if (!entry) return null;
	const Icon = entry.icon;
	const tone = cn(
		entry.tone === "white" && "invert dark:invert-0",
		entry.tone === "black" && "dark:invert",
	);
	if (bare)
		return (
			<Icon
				aria-hidden="true"
				className={cn("size-4 shrink-0", tone, className)}
			/>
		);
	return (
		<span
			aria-hidden="true"
			className={cn(
				"flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-frame",
				className,
			)}
		>
			<Icon
				className={cn(
					"size-5",
					entry.tone === "white" && "invert dark:invert-0",
					entry.tone === "black" && "dark:invert",
				)}
			/>
		</span>
	);
}
