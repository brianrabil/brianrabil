import { HoverList, HoverRow, HoverStaticRow } from "@/components/hover-list";
import { StatusBadge } from "@/components/status-badge";
import { CATEGORY_LABEL, type Product, getFleet } from "@/lib/fleet";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

/** Logo in a bordered tile, or a monogram when the project has no mark. */
export function ProductLogo({
	product,
	large = false,
}: {
	product: { name: string; logo?: { light: string; dark: string } };
	/** The bigger tile used on full-width product cards. */
	large?: boolean;
}) {
	const tile = cn(
		"flex shrink-0 items-center justify-center border border-line bg-frame",
		large ? "size-14 rounded-2xl" : "size-10 rounded-xl",
	);

	if (!product.logo) {
		return (
			<div
				aria-hidden="true"
				className={cn(tile, "text-xs font-medium text-fg-2")}
			>
				{product.name
					.split(" ")
					.map((word) => word[0])
					.join("")
					.slice(0, 2)
					.toUpperCase()}
			</div>
		);
	}

	const { light, dark } = product.logo;
	const isAvatar = light.startsWith("/avatar");

	return (
		<div className={tile}>
			<div
				className={cn(
					"relative",
					large ? "size-7" : "size-5",
					isAvatar && "size-6 overflow-hidden rounded-full",
				)}
			>
				<Image
					src={light}
					alt=""
					fill
					sizes={large ? "32px" : "24px"}
					className="object-contain dark:hidden"
					unoptimized
				/>
				<Image
					src={dark}
					alt=""
					fill
					sizes={large ? "32px" : "24px"}
					className="hidden object-contain dark:block"
					unoptimized
				/>
			</div>
		</div>
	);
}

function ProductRow({ product }: { product: Product }) {
	const link = product.link[0];
	const meta = (
		<>
			{link ? (
				<span className="inline-flex items-center gap-1 text-fg-2 transition-colors duration-150 group-hover/row:text-fg">
					{link.label}
					<ArrowUpRight aria-hidden="true" className="size-3" />
				</span>
			) : null}
			{product.used.length > 0 ? (
				<span className="text-fg-3">{product.used.join(" · ")}</span>
			) : null}
		</>
	);

	const body = (
		<>
			<ProductLogo product={product} />
			<div className="min-w-0">
				<div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
					<h4 className="text-[15px] font-medium tracking-[-0.01em] text-fg">
						{product.name}
					</h4>
					<StatusBadge status={product.status} />
				</div>
				<p className="mt-1 text-sm leading-6 text-fg-2">
					{product.description}
				</p>
				<p className="mt-2 flex flex-wrap gap-x-3 text-xs sm:hidden">{meta}</p>
			</div>
			<p className="hidden max-w-36 flex-col items-end gap-1 pt-0.5 text-right text-xs leading-5 sm:flex">
				{meta}
			</p>
		</>
	);

	const grid =
		"grid grid-cols-[40px_minmax(0,1fr)] gap-4 px-3 py-4 sm:grid-cols-[40px_minmax(0,1fr)_auto] sm:gap-5";

	if (link) {
		const external = /^https?:\/\//.test(link.href);
		return (
			<li>
				<HoverRow
					value={product.name}
					href={link.href}
					external={external}
					className={grid}
				>
					{body}
				</HoverRow>
			</li>
		);
	}

	return (
		<li>
			<HoverStaticRow className={grid}>{body}</HoverStaticRow>
		</li>
	);
}

export function FleetIndex() {
	const { shelves } = getFleet();

	return (
		<HoverList className="-mx-3 grid gap-10">
			{shelves.map((shelf) => (
				<div key={shelf.category}>
					<div className="flex items-center gap-2.5 border-b border-line px-3 pb-3">
						<h3 className="text-sm font-medium text-fg-2">
							{CATEGORY_LABEL[shelf.category]}
						</h3>
						<span className="ml-auto text-xs tabular text-fg-3">
							{String(shelf.products.length).padStart(2, "0")}
						</span>
					</div>
					<ul className="mt-2 grid">
						{shelf.products.map((product) => (
							<ProductRow key={product.slug} product={product} />
						))}
					</ul>
				</div>
			))}
		</HoverList>
	);
}
