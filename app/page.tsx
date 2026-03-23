import { Container } from "@/components/container";
import { HeroSwirl } from "@/components/hero-swirl";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/app-config";
import { type ArticleWithSlug, getAllArticles } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
	const articles = await getAllArticles();
	const featuredArticles = [
		{
			slug: "hello-world",
			title:
				"Building Production-Ready AI Agents: Architecture Patterns That Scale",
			description:
				"Architecture patterns for deploying AI agents reliably in production.",
		},
		{
			slug: "the-ai-product-reliability-playbook",
			title: "The AI Product Reliability Playbook",
			description: "How to move from AI demos to dependable products.",
		},
		{
			slug: "how-to-find-your-wedge-as-an-indie-ai-builder",
			title: "How to Find Your Wedge as an Indie AI Builder",
			description:
				"A framework for identifying product opportunities in the AI ecosystem.",
		},
	]
		.map(({ slug, title, description }) => {
			const article = articles.find((item) => item.slug === slug);
			if (!article) return null;
			return { ...article, title, description };
		})
		.filter((article): article is ArticleWithSlug => article !== null);
	const orderedProductNames = [
		"World Engine",
		"Reelway",
		"Snapclip",
		"Gigaswarm",
		"Bae",
		"Inflect",
		"Walljoy",
		"Hyperpost",
		"Jobhop",
		"RSSX",
		"ui",
		"Brian Rabil",
	];
	const orderedProducts = orderedProductNames
		.map((name) => appConfig.projects.find((product) => product.name === name))
		.filter(
			(product): product is (typeof appConfig.projects)[number] =>
				product !== undefined,
		);
	const emptyProductSlots = Array.from(
		{ length: ((4 - (orderedProducts.length % 4)) % 4) + 8 },
		(_, index) => `empty-${index + 1}`,
	);

	return (
		<>
			{/* Hero */}
			<div className="relative overflow-hidden">
				<HeroSwirl />
				<div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
				<Container className="relative mt-32 sm:mt-44 pb-20 sm:pb-28">
					<div className="max-w-3xl animate-fade-in-up">
						<p className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground/50">
							Brian Rabil
						</p>
						<h1 className="font-heading text-5xl tracking-tight text-foreground sm:text-7xl">
							Building practical AI software.
						</h1>
						<p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl animate-fade-in-up delay-100">
							I design and ship AI-native products — developer tools, local AI
							systems, and software that helps people work with information more
							effectively.
						</p>
						<p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
							Most of my work focuses on local-first AI, agent systems, and
							developer infrastructure.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Button asChild>
								<Link href="/#products">View products</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link
									href={appConfig.social.x.href}
									target="_blank"
									rel="noopener noreferrer"
								>
									Follow on X
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</div>

			{/* Mission */}
			<Container className="mt-20 sm:mt-28">
				<section
					id="mission"
					aria-label="Mission"
					className="border border-border"
				>
					<div className="grid sm:grid-cols-[1fr_2fr] divide-y sm:divide-y-0 sm:divide-x divide-border">
						<div className="p-6 sm:p-8 flex flex-col justify-center">
							<p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50">
								Mission
							</p>
							<h2 className="mt-3 font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl leading-snug">
								Products first.
							</h2>
						</div>
						<div className="p-6 sm:p-8 flex items-center">
							<p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
								This site is a portfolio of the systems I&apos;m building. Each
								product explores a real problem: organizing information,
								building better developer tools, improving online feeds, or
								making AI systems more useful in daily workflows. Some projects
								become full products. Others become infrastructure that powers
								the rest. The goal is simple: build useful software that
								compounds over time.
							</p>
						</div>
					</div>
				</section>
			</Container>

			{/* Products */}
			<Container className="mt-20 sm:mt-28 mb-8">
				<section id="products" aria-label="Products">
					<div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
						<div>
							<h2 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
								Products
							</h2>
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
								A collection of active and experimental software projects.
							</p>
						</div>
						<p className="text-xs text-muted-foreground/50 font-mono tabular-nums hidden sm:block">
							{orderedProducts.length} entries
						</p>
					</div>
					<div className="relative mt-8">
						<div className="grid-plus" />
						<div className="grid grid-cols-2 grid-rows-[auto] border-l border-t border-border sm:grid-cols-3 lg:grid-cols-4 [&>*]:min-h-[140px]">
							{orderedProducts.map((product) => (
								<ProductCard key={product.name} product={product} />
							))}
							{emptyProductSlots.map((slotId, index) => (
								<div
									key={slotId}
									className="group relative flex flex-col border-border border-r border-b p-4 overflow-hidden"
								>
									<div
										className="absolute inset-0 animate-empty-scan"
										style={{
											animationDelay: `${index * 1.7}s`,
											background:
												"linear-gradient(180deg, transparent 0%, hsl(var(--foreground) / 0.02) 50%, transparent 100%)",
											backgroundSize: "100% 40%",
											backgroundRepeat: "no-repeat",
										}}
									/>
									<div className="flex items-start justify-between gap-3">
										<div className="h-7 w-7 rounded-sm bg-muted-foreground/[0.03]" />
									</div>
									<div className="mt-3 flex-1 flex flex-col justify-center gap-1.5">
										<div className="h-2.5 w-16 rounded-sm bg-muted-foreground/[0.04]" />
										<div className="h-2 w-24 rounded-sm bg-muted-foreground/[0.03]" />
									</div>
									<div className="mt-auto pt-3" />
								</div>
							))}
						</div>
					</div>
				</section>
			</Container>

			{/* Writing */}
			<Container className="mt-20 sm:mt-28">
				<section id="articles" aria-label="Recent Articles">
					<div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-baseline sm:justify-between">
						<div>
							<h2 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
								Writing
							</h2>
							<p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
								Field notes from shipping AI-native software: agent systems,
								reliability, and product execution. Patterns, checklists, and
								implementation details—written for builders.
							</p>
						</div>
						<Link
							href="/articles"
							className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono flex items-center gap-1"
						>
							View all writing <ArrowRight className="h-3 w-3" />
						</Link>
					</div>
					<div className="mt-px grid divide-y divide-border border-x border-b border-border">
						{featuredArticles.map((article, i) => (
							<Link
								key={article.slug}
								href={`/articles/${article.slug}`}
								className="group grid sm:grid-cols-[auto_1fr_auto] gap-4 p-5 sm:p-6 transition-colors hover:bg-muted/30"
							>
								<span className="text-[10px] font-mono text-muted-foreground/40 tabular-nums pt-1 hidden sm:block">
									{String(i + 1).padStart(2, "0")}
								</span>
								<div>
									<h3 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors">
										{article.title}
									</h3>
									<p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
										{article.description}
									</p>
								</div>
								<div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 sm:pt-1">
									<time
										dateTime={article.date}
										className="text-xs text-muted-foreground/50 font-mono tabular-nums whitespace-nowrap"
									>
										{formatDate(article.date)}
									</time>
									<ArrowRight className="h-3 w-3 text-muted-foreground/30 group-hover:text-foreground transition-colors" />
								</div>
							</Link>
						))}
					</div>
				</section>
			</Container>

			{/* Newsletter */}
			<Container className="mt-20 sm:mt-28 mb-16">
				<section
					id="newsletter"
					aria-label="Newsletter"
					className="border border-border"
				>
					<div className="grid sm:grid-cols-[1fr_1fr] divide-y sm:divide-y-0 sm:divide-x divide-border">
						<div className="p-6 sm:p-8">
							<p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50">
								Newsletter
							</p>
							<h2 className="mt-3 font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl leading-snug">
								Newsletter
							</h2>
							<p className="mt-3 text-sm text-muted-foreground">
								Occasional updates when I ship new products or research.
							</p>
							<p className="mt-2 text-sm text-muted-foreground">
								No noise. Just progress.
							</p>
						</div>
						<div className="p-6 sm:p-8 flex items-center">
							<NewsletterForm />
						</div>
					</div>
				</section>
			</Container>
		</>
	);
}
