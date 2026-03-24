import { Container } from "@/components/container";
import { NewsletterForm } from "@/components/newsletter-form";

export function NewsletterSection({ className }: { className?: string }) {
	return (
		<Container className={className}>
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
							Signal
						</h2>
						<p className="mt-3 text-sm text-muted-foreground">
							Product launches and strategic thinking from the frontier.
						</p>
					</div>
					<div className="p-6 sm:p-8 flex items-center">
						<NewsletterForm />
					</div>
				</div>
			</section>
		</Container>
	);
}
