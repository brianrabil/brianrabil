import { Container } from "@/components/container";
import { Markdown } from "@/components/markdown";
import { StealthField } from "@/components/stealth-field";
import { Button } from "@/components/ui/button";
import { getAllFinds, getFind } from "@/lib/finds";
import { FIND_CATEGORY_LABEL } from "@/lib/finds-schema";
import { formatDate } from "@/lib/formatDate";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
	return (await getAllFinds()).map((find) => ({ slug: find.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const find = await getFind((await params).slug);
	if (!find) return {};
	return { title: `${find.title} · Finds`, description: find.summary };
}

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

export default async function FindPage({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const finds = await getAllFinds();
	const index = finds.findIndex((find) => find.slug === slug);
	if (index === -1) notFound();
	const find = finds[index];
	const newer = finds[index - 1];
	const older = finds[index + 1];

	return (
		<>
			<article>
				<header className="relative overflow-hidden border-b border-line">
					<StealthField variant="band" seed={find.slug} />
					<Container className="relative pt-16 pb-16 sm:pt-20 lg:pb-20">
						<Link
							href="/finds"
							className="group -ml-1 inline-flex h-11 items-center gap-1.5 rounded-md px-1 text-[13px] font-medium text-fg-2 transition-colors duration-150 hover:text-fg md:h-8"
						>
							<ArrowLeft
								aria-hidden="true"
								className="size-3.5 transition-transform duration-150 ease-out-expo group-hover:-translate-x-0.5"
							/>
							Finds
						</Link>
						<h1 className="mt-10 max-w-4xl text-4xl leading-[1.05] font-medium tracking-[-0.05em] text-fg sm:text-6xl">
							{find.title}
						</h1>
						<p className="mt-6 max-w-2xl text-base leading-7 text-fg-2 sm:text-lg sm:leading-8">
							{find.summary}
						</p>
						<div className="mt-10 flex flex-wrap gap-2">
							<Button size="lg" asChild>
								<a href={find.url} target="_blank" rel="noopener noreferrer">
									View source
									<ArrowUpRight aria-hidden="true" />
								</a>
							</Button>
							{find.homepage ? (
								<Button size="lg" variant="secondary" asChild>
									<a
										href={find.homepage}
										target="_blank"
										rel="noopener noreferrer"
									>
										Website
										<ArrowUpRight aria-hidden="true" />
									</a>
								</Button>
							) : null}
						</div>
					</Container>
				</header>

				<div className="border-b border-line">
					<Container className="grid gap-10 py-14 lg:grid-cols-[0.3fr_0.7fr] lg:gap-16 lg:py-20">
						<dl className="grid grid-cols-2 gap-6 self-start sm:grid-cols-4 lg:sticky lg:top-28 lg:grid-cols-1">
							<MetaItem label="Added">
								<time dateTime={find.date} className="tabular">
									{formatDate(find.date)}
								</time>
							</MetaItem>
							<MetaItem label="Category">
								{FIND_CATEGORY_LABEL[find.category]}
							</MetaItem>
							{find.language ? (
								<MetaItem label="Language">{find.language}</MetaItem>
							) : null}
							{find.license ? (
								<MetaItem label="License">{find.license}</MetaItem>
							) : null}
							<MetaItem label="Written by">{find.author}</MetaItem>
						</dl>
						<Markdown source={find.body} className="min-w-0 max-w-[68ch]" />
					</Container>
				</div>

				{newer || older ? (
					<nav aria-label="More finds" className="border-b border-line">
						<Container className="grid gap-4 py-10 sm:grid-cols-2">
							{older ? (
								<Link
									href={`/finds/${older.slug}`}
									className="group rounded-lg p-3 -m-3 transition-colors duration-150 hover:bg-hover"
								>
									<span className="text-sm text-fg-3">Older</span>
									<span className="mt-0.5 block text-base font-medium text-fg">
										{older.title}
									</span>
								</Link>
							) : (
								<span />
							)}
							{newer ? (
								<Link
									href={`/finds/${newer.slug}`}
									className="group rounded-lg p-3 -m-3 text-left transition-colors duration-150 hover:bg-hover sm:text-right"
								>
									<span className="text-sm text-fg-3">Newer</span>
									<span className="mt-0.5 block text-base font-medium text-fg">
										{newer.title}
									</span>
								</Link>
							) : null}
						</Container>
					</nav>
				) : null}
			</article>
		</>
	);
}
