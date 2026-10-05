import { actionClass } from "@/components/brand-kit/action-class";
import { CopyButton } from "@/components/brand-kit/copy-button";
import { Container } from "@/components/container";
import {
	BRAND_PRODUCTS,
	type BrandProduct,
	COLOR_TOKENS,
	INTERFACE_TYPE,
	LOGO_KIND_LABEL,
	LOGO_THEME_LABEL,
	type LogoAsset,
	SWATCH_GROUND,
	TYPE_REGISTERS,
	type TypeRow,
} from "@/lib/brand";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Brand",
	description:
		"Logo files, color tokens, and type registers for Brian Rabil’s products.",
};

const SECTIONS = [
	{ id: "logos", label: "Logos", count: BRAND_PRODUCTS.length },
	{ id: "colors", label: "Colors", count: COLOR_TOKENS.length },
	{
		id: "type",
		label: "Type",
		count: TYPE_REGISTERS.length + INTERFACE_TYPE.length,
	},
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function SectionHeading({ id }: { id: SectionId }) {
	const index = SECTIONS.findIndex((section) => section.id === id);
	const section = SECTIONS[index];
	return (
		<div className="flex items-baseline gap-x-4">
			<span className="text-xs tabular text-fg-4">
				{String(index + 1).padStart(2, "0")}
			</span>
			<h2
				id={`${id}-title`}
				className="shrink-0 text-lg font-medium tracking-[-0.02em] text-fg"
			>
				{section.label}
			</h2>
			<span className="ml-auto shrink-0 text-xs tabular text-fg-3">
				{section.count}
			</span>
		</div>
	);
}

function fileName(path: string) {
	return path.slice(path.lastIndexOf("/") + 1);
}

function LogoTile({
	product,
	asset,
}: { product: BrandProduct; asset: LogoAsset }) {
	const kind = LOGO_KIND_LABEL[asset.kind];
	const theme = LOGO_THEME_LABEL[asset.theme];
	const name = fileName(asset.path);
	return (
		<li className="overflow-hidden rounded-lg border border-line bg-frame">
			<div
				className="flex h-28 items-center justify-center px-6"
				style={{ backgroundColor: SWATCH_GROUND[asset.theme] }}
			>
				<img
					src={asset.path}
					alt={`${product.name} ${asset.kind}, ${asset.theme} theme`}
					className={
						asset.kind === "mark"
							? "size-12"
							: "h-8 w-auto max-w-full object-contain"
					}
				/>
			</div>
			<div className="flex items-center gap-2 border-t border-line py-2 pr-2 pl-3">
				<span
					title={asset.path}
					className="min-w-0 flex-1 truncate text-xs text-fg-2"
				>
					{name}
				</span>
				<CopyButton
					label="Copy SVG"
					subject={`${product.name} ${kind.toLowerCase()}, ${theme.toLowerCase()}`}
					src={asset.path}
				/>
				<a
					href={asset.path}
					target="_blank"
					rel="noopener noreferrer"
					className={actionClass}
				>
					Open
					<span className="sr-only"> {name} in a new tab</span>
				</a>
			</div>
		</li>
	);
}

function Specimen({ row }: { row: TypeRow }) {
	const { specimen } = row;
	if (specimen.type === "wordmark") {
		return (
			<>
				<img
					src={`/brand/${specimen.slug}/wordmark-light.svg`}
					alt={`${specimen.label} wordmark`}
					className="h-7 w-auto max-w-full object-contain object-left dark:hidden"
				/>
				<img
					src={`/brand/${specimen.slug}/wordmark-dark.svg`}
					alt={`${specimen.label} wordmark`}
					className="hidden h-7 w-auto max-w-full object-contain object-left dark:block"
				/>
			</>
		);
	}
	return (
		<span
			aria-hidden="true"
			className={cn("leading-none text-fg", specimen.className)}
		>
			{specimen.text}
		</span>
	);
}

function TypeList({
	label,
	rows,
}: { label: string; rows: readonly TypeRow[] }) {
	return (
		<div>
			<h3 className="text-[15px] font-medium text-fg">{label}</h3>
			<ul className="mt-3 grid divide-y divide-line border-y border-line">
				{rows.map((row) => (
					<li
						key={row.id}
						className="grid gap-3 py-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:items-center sm:gap-8"
					>
						<div className="flex h-10 min-w-0 items-center">
							<Specimen row={row} />
						</div>
						<div className="min-w-0 text-[15px] leading-6">
							<p className="font-medium text-fg">{row.name}</p>
							<p className="text-fg-2">{row.face}</p>
							<p className="text-fg-3">{row.use}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default function BrandPage() {
	return (
		<div className="border-b border-line">
			<Container className="py-16 lg:py-24">
				<h1 className="text-4xl font-medium tracking-[-0.05em] text-fg sm:text-5xl">
					Brand
				</h1>

				<div className="mt-14 grid gap-14 lg:mt-20 lg:gap-16">
					<section
						id="logos"
						aria-labelledby="logos-title"
						className="scroll-mt-24"
					>
						<SectionHeading id="logos" />
						<ul className="mt-4 grid gap-x-10 gap-y-10 lg:grid-cols-2">
							{BRAND_PRODUCTS.map((product) => (
								<li
									key={product.slug}
									id={`logo-${product.slug}`}
									className={cn(
										"min-w-0 scroll-mt-24",
										product.tier === "flagship" && "lg:col-span-2",
									)}
								>
									<h3 className="text-[15px] leading-6">
										<span className="font-medium text-fg">{product.name}</span>
										<span aria-hidden="true" className="px-2 text-fg-4">
											·
										</span>
										<span className="text-fg-3">{product.status}</span>
									</h3>
									{product.assets.length > 0 ? (
										<ul className="mt-3 grid gap-3 sm:grid-cols-2">
											{product.assets.map((asset) => (
												<LogoTile
													key={asset.path}
													product={product}
													asset={asset}
												/>
											))}
										</ul>
									) : (
										<p className="mt-3 text-[15px] leading-6 text-fg-3">
											{product.note ??
												"No logo files. The site shows a monogram until the product has a name."}
										</p>
									)}
								</li>
							))}
						</ul>
					</section>

					<section
						id="colors"
						aria-labelledby="colors-title"
						className="scroll-mt-24"
					>
						<SectionHeading id="colors" />
						<ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
							{COLOR_TOKENS.map((token) => (
								<li
									key={token.name}
									className="min-w-0 rounded-lg border border-line bg-frame p-2"
								>
									<div
										aria-hidden="true"
										className="h-16 rounded-md border border-line"
										style={{ backgroundColor: `var(${token.variable})` }}
									/>
									<div className="mt-2 flex flex-col items-start gap-2 pl-1 sm:flex-row sm:items-center sm:justify-between">
										<span className="text-xs text-fg">{token.name}</span>
										<CopyButton
											label="Copy name"
											subject={`color token ${token.name}`}
											text={token.name}
										/>
									</div>
								</li>
							))}
						</ul>
					</section>

					<section
						id="type"
						aria-labelledby="type-title"
						className="scroll-mt-24"
					>
						<SectionHeading id="type" />
						<div className="mt-4 grid gap-10">
							<TypeList label="Wordmarks" rows={TYPE_REGISTERS} />
							<TypeList label="Interface" rows={INTERFACE_TYPE} />
						</div>
					</section>
				</div>
			</Container>
		</div>
	);
}
