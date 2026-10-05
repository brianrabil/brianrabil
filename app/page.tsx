import { BuildStandards } from "@/components/build-standards";
import { Container } from "@/components/container";
import { FindList } from "@/components/find-list";
import { ProductGrid } from "@/components/product-grid";
import { Section } from "@/components/section";
import { XIcon } from "@/components/social-icons";
import { StealthField } from "@/components/stealth-field";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/app-config";
import { getAllFinds } from "@/lib/finds";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HEADLINE = "AI software products, built and owned by Brian Rabil.";

export default async function Home() {
	const finds = await getAllFinds();

	return (
		<>
			<section
				aria-labelledby="hero-title"
				className="relative overflow-hidden border-b border-line"
			>
				<StealthField variant="hero" />
				<Container className="relative pt-24 pb-20 sm:pt-32 lg:pt-40 lg:pb-28">
					<h1
						id="hero-title"
						className="max-w-3xl text-5xl leading-[1.02] font-medium tracking-[-0.06em] text-fg sm:text-6xl lg:text-7xl"
					>
						{HEADLINE.split(" ").map((word, index) => (
							<span key={word}>
								<span
									data-rise
									className="inline-block"
									style={
										{ "--rise-delay": 60 + index * 45 } as React.CSSProperties
									}
								>
									{word}
								</span>{" "}
							</span>
						))}
					</h1>
					<div
						data-rise
						style={{ "--rise-delay": 400 } as React.CSSProperties}
						className="mt-10 flex flex-wrap gap-2"
					>
						<Button size="lg" asChild>
							<Link href="#fleet">
								See products
								<ArrowRight aria-hidden="true" />
							</Link>
						</Button>
						<Button size="lg" variant="secondary" asChild>
							<a
								href={appConfig.social.x.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Follow on X"
							>
								Follow on
								<XIcon className="-ml-0.5 fill-current" />
							</a>
						</Button>
					</div>
				</Container>
			</section>

			<section
				id="fleet"
				aria-labelledby="fleet-title"
				className="border-b border-line"
			>
				<Container className="py-20 lg:py-28">
					<div className="flex flex-wrap items-end justify-between gap-6">
						<div>
							<h2
								id="fleet-title"
								className="text-3xl font-medium tracking-[-0.04em] text-fg sm:text-4xl"
							>
								Products
							</h2>
						</div>
					</div>
					<div className="mt-12">
						<ProductGrid />
					</div>
				</Container>
			</section>

			<Section id="craft" title="How I build">
				<BuildStandards />
			</Section>

			<Section id="finds" band title="Recent finds">
				<FindList finds={finds.slice(0, 5)} />
				<Link
					href="/finds"
					className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg-2 transition-colors duration-150 hover:text-fg"
				>
					All finds
					<ArrowRight
						aria-hidden="true"
						className="size-3.5 transition-transform duration-150 ease-out-expo group-hover:translate-x-0.5"
					/>
				</Link>
			</Section>
		</>
	);
}
