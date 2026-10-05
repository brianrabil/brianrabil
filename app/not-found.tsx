import { Container } from "@/components/container";
import { GlassWing } from "@/components/glass-wing";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<section className="relative overflow-hidden border-b border-line">
			<GlassWing className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block" />
			<Container className="relative py-32 sm:py-40">
				<p className="text-xs tabular text-fg-3">404</p>
				<h1 className="mt-5 text-4xl leading-[1.05] font-medium tracking-[-0.05em] text-fg sm:text-6xl">
					Page not found
				</h1>
				<p className="mt-6 max-w-md text-base leading-7 text-fg-2">
					This address doesn’t point anywhere. It may have moved, or the link
					has a typo.
				</p>
				<div className="mt-10 flex flex-wrap gap-2">
					<Button size="lg" asChild>
						<Link href="/">Go to home</Link>
					</Button>
					<Button size="lg" variant="secondary" asChild>
						<Link href="/articles">Browse writing</Link>
					</Button>
				</div>
			</Container>
		</section>
	);
}
