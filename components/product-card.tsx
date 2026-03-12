"use client"

import type { AppConfig } from "@/lib/zod"
import { Badge } from "@/components/ui/badge"
import { AnimatePresence, motion } from "motion/react"
import { ExternalLink, Github, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useState } from "react"

const CanvasRevealEffect = dynamic(
	() => import("@/components/ui/canvas-reveal-effect").then(m => m.CanvasRevealEffect),
	{ ssr: false }
)

type Product = AppConfig["projects"][number]

const DEFAULT_COLORS = [[140, 140, 140]]

const PRODUCT_COLORS: Record<string, number[][]> = {
	"Brian Rabil": [[140, 140, 140]],
	"RSSX": [[59, 130, 246], [99, 102, 241]],
	"Jobhop": [[16, 185, 129], [52, 211, 153]],
	"Indexwell": [[245, 158, 11], [251, 191, 36]],
	"Hyperpost": [[236, 72, 153], [232, 121, 249]],
	"Walljoy": [[168, 85, 247], [139, 92, 246]],
	"Inflect": [[20, 184, 166], [34, 211, 238]],
	"Bae": [[244, 63, 94], [251, 113, 133]],
	"Gigaswarm": [[99, 102, 241], [129, 140, 248]],
	"ui": [[161, 161, 170]],
	"Snapclip": [[234, 88, 12], [251, 146, 60]],
	"Reelway": [[79, 70, 229], [124, 58, 237]],
	"Feedframe": [[14, 165, 233], [56, 189, 248]],
	"World Engine": [[220, 38, 38], [239, 68, 68]],
}

const getLinkIcon = (icon: string) => {
	switch (icon) {
		case "github":
			return <Github className="h-3.5 w-3.5" aria-hidden="true" />
		case "external":
			return <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
		default:
			return null
	}
}

function StatusBadge({ status }: { status: string }) {
	switch (status) {
		case "live":
			return (
				<Badge className="gap-1 rounded-full border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0 text-[10px] font-medium text-emerald-600 shadow-none dark:text-emerald-400">
					<span className="relative flex h-1.5 w-1.5">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
						<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
					</span>
					Live
				</Badge>
			)
		case "building":
			return (
				<Badge className="gap-1 rounded-full border-amber-500/30 bg-amber-500/10 px-1.5 py-0 text-[10px] font-medium text-amber-600 shadow-none dark:text-amber-400">
					<Loader2 className="h-2.5 w-2.5 animate-spin" />
					Building
				</Badge>
			)
		default:
			return (
				<Badge variant="outline" className="rounded-full px-1.5 py-0 text-[10px] font-normal text-muted-foreground/60 shadow-none">
					Planning
				</Badge>
			)
	}
}

export function ProductCard({ product }: { product: Product }) {
	const [hovered, setHovered] = useState(false)
	const links = product.link ?? []
	const logoLight = product.logo.light ?? product.logo.primary
	const logoDark = product.logo.dark ?? product.logo.light ?? product.logo.primary
	const primaryLink = links[0]
	const isExternal = primaryLink
		? primaryLink.href.startsWith("http://") || primaryLink.href.startsWith("https://")
		: false
	const colors = PRODUCT_COLORS[product.name] ?? DEFAULT_COLORS

	const content = (
		<>
			<AnimatePresence>
				{hovered ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0"
					>
						<CanvasRevealEffect
							animationSpeed={5}
							containerClassName="bg-transparent"
							colors={colors}
							opacities={[0.1, 0.1, 0.1, 0.15, 0.15, 0.15, 0.2, 0.2, 0.2, 0.3]}
							dotSize={2}
							showGradient={false}
						/>
					</motion.div>
				) : null}
			</AnimatePresence>
			<div className="relative z-10 flex items-start justify-between gap-3">
				<div className={`relative h-7 w-7 shrink-0 ${product.logo.light?.endsWith(".png") ? "rounded-full overflow-hidden" : ""}`}>
					<Image
						src={logoLight}
						alt={`${product.name} logo`}
						fill
						className="object-contain dark:hidden"
						sizes="28px"
						unoptimized
					/>
					<Image
						src={logoDark}
						alt={`${product.name} logo`}
						fill
						className="hidden object-contain dark:block"
						sizes="28px"
						unoptimized
					/>
				</div>
				<StatusBadge status={product.status} />
			</div>
			<div className="relative z-10 mt-3">
				<h3 className="font-heading text-sm font-medium text-foreground">
					{product.name}
				</h3>
				<p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
					{product.description}
				</p>
			</div>
			<div className="relative z-10 mt-auto pt-3 flex flex-wrap gap-1.5">
				{links.map((projectLink) => (
					<span
						key={`${product.name}-${projectLink.href}`}
						className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/60 transition-colors group-hover:text-foreground"
					>
						{getLinkIcon(projectLink.icon)}
						{projectLink.label}
					</span>
				))}
			</div>
		</>
	)

	if (primaryLink) {
		return (
			<Link
				href={primaryLink.href}
				target={isExternal ? "_blank" : undefined}
				rel={isExternal ? "noopener noreferrer" : undefined}
				className="group relative flex flex-col border-border border-r border-b p-4 overflow-hidden transition-colors hover:bg-muted/30"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				{content}
			</Link>
		)
	}

	return (
		<div
			className="group relative flex flex-col border-border border-r border-b p-4 overflow-hidden transition-colors hover:bg-muted/30"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{content}
		</div>
	)
}
