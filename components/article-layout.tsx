import { Container } from "@/components/container";
import { NewsletterSection } from "@/components/newsletter-section";
import { Prose } from "@/components/prose";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";

export function ArticleLayout({
	article,
	children,
}: {
	article: { author: string; date: string; title: string; description: string };
	children: React.ReactNode;
}) {
	return (
		<>
			<Container className="mt-16 lg:mt-32">
				<div className="xl:relative">
					<div className="mx-auto max-w-2xl">
						<Link
							href="/articles"
							className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground/70 hover:text-foreground transition-colors font-mono group"
						>
							<span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">&larr;</span>
							Writing
						</Link>
						<article>
							<header className="flex flex-col">
								<h1 className="font-heading mt-6 text-4xl font-medium tracking-tight text-foreground sm:text-5xl text-balance">
									{article.title}
								</h1>
								<time
									dateTime={article.date}
									className="order-first flex items-center text-sm text-muted-foreground font-mono"
								>
									{formatDate(article.date)}
								</time>
							</header>
							<Prose className="mt-8" data-mdx-content>
								{children}
							</Prose>
						</article>
					</div>
				</div>
			</Container>
			<NewsletterSection className="mt-20 sm:mt-28 mb-8" />
		</>
	);
}
