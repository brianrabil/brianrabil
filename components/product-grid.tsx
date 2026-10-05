import { BrainGraphStage } from "@/components/brain-graph/brain-graph";
import { BrandStage } from "@/components/brand-stage";
import { CommandCenterMark } from "@/components/command-center-mark";
import { CellCorners } from "@/components/crosshair";
import { ProductLogo } from "@/components/fleet-index";
import { StatusBadge } from "@/components/status-badge";
import { WorkbotMark } from "@/components/workbot-mark";
import { type Product, getFleet } from "@/lib/fleet";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

/** Products with finished lockup files in public/brand/<slug>/. */
const LOCKUP_FILES = new Set(["hyperpost", "vswarm"]);

/** Featured products get full-width cards at the top, in this order. */
const FEATURED = ["command-center", "hyperpost", "vswarm", "workbot", "brain"];

/** Regular cards that sit at the end of the grid, in this order. */
const LAST = ["media-server", "rssx", "zig-world"];

function isFeatured(product: Product) {
	return FEATURED.includes(product.slug);
}

/** Featured first, then the rest in config order, then LAST. */
function rank(product: Product) {
	const featured = FEATURED.indexOf(product.slug);
	if (featured >= 0) return featured;
	const last = LAST.indexOf(product.slug);
	return last >= 0 ? 200 + last : 100;
}

/** Flagships with a live shader behind the lockup (components/brand-stage.tsx). */
function isBrandStage(slug: string): slug is "hyperpost" | "vswarm" {
	return slug === "hyperpost" || slug === "vswarm";
}

/** Interim wordmarks until each product's lockup is final. */
function InterimLockup({
	product,
	large = false,
}: { product: Product; large?: boolean }) {
	const isWorkbot = product.slug === "workbot";
	// Command Center: the animated orbit mark beside a heavy all-caps wordmark.
	if (product.slug === "command-center")
		return (
			<div className={cn("flex items-center", large ? "gap-4" : "gap-3")}>
				<span
					className={cn(
						"flex shrink-0 items-center justify-center border border-line bg-frame text-fg",
						large ? "size-14 rounded-2xl" : "size-10 rounded-xl",
					)}
				>
					<CommandCenterMark
						animated
						className={large ? "size-10" : "size-7"}
					/>
				</span>
				<span
					className={cn(
						"font-black uppercase tracking-[-0.03em] text-fg [text-wrap:balance]",
						// Caps have no descenders, so wrapped lines sit tight. Leading
						// goes after the size so tailwind-merge keeps it.
						large ? "text-[40px] leading-[0.92]" : "text-[26px] leading-[0.92]",
					)}
				>
					{product.name}
				</span>
			</div>
		);
	return (
		<div className={cn("flex items-center", large ? "gap-4" : "gap-3")}>
			{isWorkbot ? (
				<span
					className={cn(
						"flex shrink-0 items-center justify-center border border-line bg-frame text-fg",
						large ? "size-14 rounded-2xl" : "size-10 rounded-xl",
					)}
				>
					<WorkbotMark walking className={large ? "size-9" : "size-6"} />
				</span>
			) : (
				<ProductLogo product={product} large={large} />
			)}
			<span
				className={cn(
					"text-fg",
					large ? "text-[40px] leading-[1.05]" : "text-[26px] leading-[1.05]",
					isWorkbot
						? "font-extrabold lowercase tracking-[-0.05em]"
						: "font-semibold tracking-[-0.03em]",
				)}
			>
				{product.name}
				{isWorkbot ? (
					<span
						aria-hidden="true"
						className="ml-[0.12em] inline-block h-[0.72em] w-[0.55em] translate-y-[0.04em] bg-current"
					/>
				) : null}
			</span>
		</div>
	);
}

function Lockup({
	product,
	large = false,
}: { product: Product; large?: boolean }) {
	if (!LOCKUP_FILES.has(product.slug))
		return <InterimLockup product={product} large={large} />;
	return (
		<>
			<img
				src={`/brand/${product.slug}/lockup-light.svg`}
				alt={product.name}
				className={cn("w-auto max-w-full dark:hidden", large ? "h-14" : "h-10")}
			/>
			<img
				src={`/brand/${product.slug}/lockup-dark.svg`}
				alt={product.name}
				className={cn(
					"hidden w-auto max-w-full dark:block",
					large ? "h-14" : "h-10",
				)}
			/>
		</>
	);
}

function ProductCard({ product }: { product: Product }) {
	const flagship = isFeatured(product);
	const link = product.link[0];
	const external = link ? /^https?:\/\//.test(link.href) : false;

	const stageClass = cn(
		"flex items-center px-6",
		flagship ? "h-44 sm:px-10" : "h-36",
	);

	const body = (
		<>
			{isBrandStage(product.slug) ? (
				<BrandStage variant={product.slug} className={stageClass}>
					<Lockup product={product} large={flagship} />
				</BrandStage>
			) : product.slug === "brain" ? (
				// Brain's own layered graph view; the name is a placeholder until the rebrand.
				<BrainGraphStage
					className={cn(
						stageClass,
						"h-64 items-start pt-8 sm:h-56 sm:items-center sm:pt-0",
					)}
				>
					<span className="text-[40px] font-semibold leading-none tracking-[-0.03em] text-fg">
						{product.name}
					</span>
				</BrainGraphStage>
			) : (
				<div className={stageClass}>
					<Lockup product={product} large={flagship} />
				</div>
			)}
			<div className="flex flex-1 flex-col p-6">
				<div className="flex items-center gap-2.5">
					<StatusBadge status={product.status} />
				</div>
				<p className="mt-3 text-sm leading-6 text-fg-2">
					{product.description}
				</p>
				{link ? (
					<p className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-fg">
						{product.status === "alpha"
							? "Request access"
							: `Open ${link.label}`}
						<ArrowUpRight
							aria-hidden="true"
							className="size-3.5 text-fg-2 transition-transform duration-150 ease-out-expo group-hover:-translate-y-px group-hover:translate-x-px"
						/>
					</p>
				) : null}
			</div>
		</>
	);

	const card = "relative flex h-full flex-col bg-page";

	if (link) {
		return (
			<a
				href={link.href}
				target={external ? "_blank" : undefined}
				rel={external ? "noopener noreferrer" : undefined}
				className={cn(
					card,
					"group transition-[background-color] duration-150 ease-out-expo hover:bg-frame active:bg-hover",
				)}
			>
				<CellCorners />
				{body}
			</a>
		);
	}

	return (
		<div className={card}>
			<CellCorners />
			{body}
		</div>
	);
}

export function ProductGrid() {
	const products = [...getFleet().products].sort((a, b) => rank(a) - rank(b));

	return (
		<ul className="grid grid-flow-dense gap-px sm:grid-cols-2 lg:grid-cols-3">
			{products.map((product) => (
				<li
					key={product.slug}
					className={cn(
						"min-w-0 shadow-[0_0_0_1px_var(--line)]",
						isFeatured(product) && "sm:col-span-2 lg:col-span-3",
					)}
				>
					<ProductCard product={product} />
				</li>
			))}
		</ul>
	);
}
