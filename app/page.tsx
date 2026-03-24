import { Container } from "@/components/container";
import { HeroSwirl } from "@/components/hero-swirl";
import { NewsletterSection } from "@/components/newsletter-section";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/app-config";
import { getAllArticles } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";
import { XIcon } from "@/components/social-icons";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
	const articles = await getAllArticles();
	const featuredArticles = articles.slice(0, 3);
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
				<Container className="relative mt-32 sm:mt-44 pb-20 sm:pb-28">
					<div className="max-w-3xl animate-fade-in-up">
						<h1 className="font-heading text-5xl tracking-tight text-foreground sm:text-7xl">
							Software for single-operator scale.
						</h1>
						<p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl animate-fade-in-up delay-100">
							I build systems that compound — AI-native products, agent
							infrastructure, and tools designed for operators who refuse to stay
							small.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Button asChild>
								<Link href="/#products">View the fleet</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link
									href={appConfig.social.x.href}
									target="_blank"
									rel="noopener noreferrer"
								>
									Follow on{" "}<XIcon className="h-3.5 w-3.5 fill-current inline-block -ml-0.5" />
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
								Products that compound.
							</h2>
						</div>
						<div className="p-6 sm:p-8 flex items-center">
							<p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
								A fleet of AI-native products built on shared infrastructure.
								Flagships push the frontier. Satellites extend reach. Every
								system feeds the others. One operator, one design language,
								compounding leverage.
							</p>
						</div>
					</div>
				</section>
			</Container>

			{/* Products */}
			<Container className="mt-20 sm:mt-28 mb-8">
				<section id="products" aria-label="Products">
					<div className="flex items-baseline justify-between gap-4 pb-4">
						<div>
							<h2 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
								The Fleet
							</h2>
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
								Flagships, satellites, and frontier experiments.
							</p>
						</div>
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
					<div className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-baseline sm:justify-between">
						<div>
							<h2 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
								Writing
							</h2>
							<p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
								Dispatches from the frontier — agent architectures, infrastructure
								decisions, and the economics of building in the singularity. Written
								for operators, not tourists.
							</p>
						</div>
						<Link
							href="/articles"
							className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono flex items-center gap-1 whitespace-nowrap"
						>
							View all writing <ArrowRight className="h-3 w-3" />
						</Link>
					</div>
					<div className="mt-px grid divide-y divide-border border border-border">
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
			<NewsletterSection className="mt-20 sm:mt-28 mb-8" />
		</>
	);
}
