import { Container } from "@/components/container";
import { Prose } from "@/components/prose";
import { StealthField } from "@/components/stealth-field";
import { formatDate } from "@/lib/formatDate";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ArticleMeta = {
	author: string;
	date: string;
	title: string;
	description: string;
	series?: string;
	tags?: string[];
	readingTimeMinutes?: number;
	updated?: string;
};

function MetaItem({
	label,
	children,
}: { label: string; children: React.ReactNode }) {
	return (
		<div>
			<dt className="text-sm text-fg-3">{label}</dt>
			<dd className="mt-0.5 text-sm text-fg">{children}</dd>
		</div>
	);
}

export function ArticleLayout({
	article,
	children,
}: {
	article: ArticleMeta;
	children: React.ReactNode;
}) {
	return (
		<>
			<article>
				<header className="relative overflow-hidden border-b border-line">
					<StealthField variant="band" seed={article.title} />
					<Container className="relative pt-16 pb-16 sm:pt-20 lg:pb-20">
						<Link
							href="/articles"
							className="group -ml-1 inline-flex h-11 items-center gap-1.5 rounded-md px-1 text-[13px] font-medium text-fg-2 transition-colors duration-150 hover:text-fg md:h-8"
						>
							<ArrowLeft
								aria-hidden="true"
								className="size-3.5 transition-transform duration-150 ease-out-expo group-hover:-translate-x-0.5"
							/>
							Essays
						</Link>
						<h1 className="mt-10 max-w-4xl text-4xl leading-[1.05] font-medium tracking-[-0.05em] text-fg sm:text-6xl">
							{article.title}
						</h1>
						<p className="mt-6 max-w-2xl text-base leading-7 text-fg-2 sm:text-lg sm:leading-8">
							{article.description}
						</p>
					</Container>
				</header>

				<div className="border-b border-line">
					<Container className="grid gap-10 py-14 lg:grid-cols-[0.3fr_0.7fr] lg:gap-16 lg:py-20">
						<dl className="grid grid-cols-2 gap-6 self-start sm:grid-cols-4 lg:sticky lg:top-28 lg:grid-cols-1">
							<MetaItem label="Published">
								<time dateTime={article.date} className="tabular">
									{formatDate(article.date)}
								</time>
							</MetaItem>
							{article.readingTimeMinutes ? (
								<MetaItem label="Reading time">
									<span className="tabular">
										{article.readingTimeMinutes} min
									</span>
								</MetaItem>
							) : null}
							{article.series ? (
								<MetaItem label="Series">{article.series}</MetaItem>
							) : null}
							<MetaItem label="Author">{article.author}</MetaItem>
						</dl>
						<Prose className="min-w-0 max-w-[68ch]" data-mdx-content>
							{children}
						</Prose>
					</Container>
				</div>
			</article>
		</>
	);
}
