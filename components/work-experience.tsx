import {
	BriefcaseBusinessIcon,
	ChevronsDownUpIcon,
	ChevronsUpDownIcon,
} from "lucide-react"
import Image from "next/image"
import type { ComponentProps, ComponentType, ReactNode } from "react"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export type ExperiencePositionItemType = {
	id: string
	title: string
	employmentPeriod: string
	employmentType?: string
	description?: string
	icon?: ComponentType<ComponentProps<"svg">>
	skills?: string[]
	isExpanded?: boolean
}

export type ExperienceItemType = {
	id: string
	companyName: string
	companyLogo?: string
	positions: ExperiencePositionItemType[]
	isCurrentEmployer?: boolean
}

export type WorkExperienceProps = {
	className?: string
	experiences: ExperienceItemType[]
}

export function WorkExperience({ className, experiences }: WorkExperienceProps) {
	return (
		<div className={cn("space-y-8", className)}>
			{experiences.map((experience) => (
				<ExperienceItem key={experience.id} experience={experience} />
			))}
		</div>
	)
}

export type ExperienceItemProps = {
	experience: ExperienceItemType
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
	return (
		<div className="space-y-4">
			<div className="not-prose flex items-center gap-3">
				<div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground">
					{experience.companyLogo ? (
						<Image
							src={experience.companyLogo}
							alt={experience.companyName}
							width={24}
							height={24}
							quality={100}
							className="rounded-[calc(0.5rem-2px)]"
							unoptimized={isRemoteImage(experience.companyLogo)}
						/>
					) : (
						<div className="size-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
					)}
				</div>

				<h3 className="text-xl font-medium text-foreground">{experience.companyName}</h3>

				{experience.isCurrentEmployer && (
					<span className="relative flex items-center justify-center">
						<span className="absolute inline-flex size-3 animate-ping rounded-full bg-info opacity-50" />
						<span className="relative inline-flex size-2 rounded-full bg-info" />
						<span className="sr-only">Current Employer</span>
					</span>
				)}
			</div>

			<div className="relative space-y-4 before:absolute before:left-6 before:top-0 before:-bottom-4 before:w-px before:bg-border">
				{experience.positions.map((position) => (
					<ExperiencePositionItem key={position.id} position={position} />
				))}
			</div>
		</div>
	)
}

export type ExperiencePositionItemProps = {
	position: ExperiencePositionItemType
}

export function ExperiencePositionItem({ position }: ExperiencePositionItemProps) {
	const ExperienceIcon = position.icon ?? BriefcaseBusinessIcon
	const hasDetails = Boolean(position.description)
	const hasSkills = Array.isArray(position.skills) && position.skills.length > 0

	if (!hasDetails && !hasSkills) {
		return (
			<div className="relative pl-10 text-sm">
				<div className="relative z-1 flex items-center gap-3">
					<div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground">
						<ExperienceIcon className="size-4" />
					</div>

					<h4 className="flex-1 text-base font-medium text-foreground">
						{position.title}
					</h4>
				</div>

				<div className="relative z-1 flex items-center gap-2 pl-9 pt-2 text-sm text-muted-foreground">
					{position.employmentType && (
						<>
							<dl>
								<dt className="sr-only">Employment Type</dt>
								<dd>{position.employmentType}</dd>
							</dl>

							<Separator
								className="data-[orientation=vertical]:h-4"
								orientation="vertical"
							/>
						</>
					)}

					<dl>
						<dt className="sr-only">Employment Period</dt>
						<dd>{position.employmentPeriod}</dd>
					</dl>
				</div>
			</div>
		)
	}

	return (
		<details open={position.isExpanded} className="group">
			<summary className="relative block cursor-pointer select-none list-none text-left [&::-webkit-details-marker]:hidden">
				<div className="relative z-1 mb-1 flex items-center gap-3 pl-1">
					<div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground">
						<ExperienceIcon className="size-4" />
					</div>

					<h4 className="flex-1 text-base font-medium text-foreground">
						{position.title}
					</h4>

					<div className="shrink-0 text-muted-foreground group-open:hidden">
						<ChevronsDownUpIcon className="size-4" />
					</div>
					<div className="shrink-0 text-muted-foreground hidden group-open:block">
						<ChevronsUpDownIcon className="size-4" />
					</div>
				</div>

				<div className="relative z-1 flex items-center gap-2 pl-9 text-sm text-muted-foreground">
					{position.employmentType && (
						<>
							<dl>
								<dt className="sr-only">Employment Type</dt>
								<dd>{position.employmentType}</dd>
							</dl>

							<Separator
								className="data-[orientation=vertical]:h-4"
								orientation="vertical"
							/>
						</>
					)}

					<dl>
						<dt className="sr-only">Employment Period</dt>
						<dd>{position.employmentPeriod}</dd>
					</dl>
				</div>
			</summary>

			<div className="pt-2 pl-9">
				{position.description && (
					<MarkdownText text={position.description} className="text-sm leading-relaxed text-muted-foreground" />
				)}

				{hasSkills && (
					<ul className="not-prose mt-3 flex flex-wrap gap-1.5">
						{position.skills?.map((skill, index) => (
							<li key={index} className="flex">
								<Skill>{skill}</Skill>
							</li>
						))}
					</ul>
				)}
			</div>
		</details>
	)
}

function MarkdownText({
	text,
	className,
	...props
}: ComponentProps<"div"> & { text: string }) {
	return (
		<div className={cn("space-y-2 text-sm text-muted-foreground", className)} {...props}>
			{parseMarkdown(text)}
		</div>
	)
}

function parseMarkdown(text: string): ReactNode {
	const lines = text.split(/\r?\n/)
	const nodes: ReactNode[] = []
	let paragraphLines: string[] = []
	let bulletLines: string[] = []

	const pushParagraph = () => {
		if (paragraphLines.length === 0) {
			return
		}

		nodes.push(
			<p key={`p-${nodes.length}`} className="leading-relaxed">
				{renderMarkdownInline(paragraphLines.join(" "))}
			</p>,
		)
		paragraphLines = []
	}

	const pushBullets = () => {
		if (bulletLines.length === 0) {
			return
		}

		nodes.push(
			<ul
				key={`ul-${nodes.length}`}
				className="list-disc space-y-1.5 pl-5 marker:text-muted-foreground"
			>
				{bulletLines.map((item, index) => (
					<li key={`${nodes.length}-item-${index}`}>
						{renderMarkdownInline(item)}
					</li>
				))}
			</ul>,
		)
		bulletLines = []
	}

	for (const line of lines) {
		const trimmed = line.trim()

		if (!trimmed) {
			pushParagraph()
			pushBullets()
			continue
		}

		if (trimmed.startsWith("- ")) {
			pushParagraph()
			bulletLines.push(trimmed.replace(/^- /, ""))
			continue
		}

		if (bulletLines.length > 0) {
			pushBullets()
		}

		paragraphLines.push(trimmed)
	}

	pushParagraph()
	pushBullets()

	return nodes
}

function renderMarkdownInline(text: string): ReactNode {
	const tokens: ReactNode[] = []
	const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
	let lastIndex = 0
	let match = linkPattern.exec(text)

	if (!match) {
		return text
	}

	do {
		const [raw, label, href] = match
		const start = match.index

		if (start > lastIndex) {
			tokens.push(text.slice(lastIndex, start))
		}

		tokens.push(
			<a
				key={`${href}-${start}`}
				href={href}
				target={isExternalLink(href) ? "_blank" : undefined}
				rel={isExternalLink(href) ? "noopener noreferrer" : undefined}
				className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
			>
				{label}
			</a>,
		)

		lastIndex = start + raw.length
		match = linkPattern.exec(text)
	} while (match)

	if (lastIndex < text.length) {
		tokens.push(text.slice(lastIndex))
	}

	return tokens
}

function isExternalLink(value: string) {
	return /^https?:\/\/|^mailto:/.test(value)
}

function isRemoteImage(value: string) {
	return /^https?:\/\//.test(value)
}

function Skill({ className, ...props }: ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-lg border bg-muted/50 px-1.5 py-0.5 text-xs text-muted-foreground",
				className,
			)}
			{...props}
		/>
	)
}
