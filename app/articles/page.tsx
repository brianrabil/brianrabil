import { ArticlesIndexClient } from "@/components/articles-index-client";
import { NewsletterSection } from "@/components/newsletter-section";
import { SimpleLayout } from "@/components/simple-layout";
import { getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Writing",
	description:
		"Field notes from shipping AI-native software: agent systems, reliability, and product execution.",
};

export default async function ArticlesIndex() {
	const articles = await getAllArticles();

	return (
		<>
			<SimpleLayout
				title="Writing"
				intro="Patterns, checklists, and implementation details from shipping AI-native software."
			>
				<ArticlesIndexClient articles={articles} />
			</SimpleLayout>
			<NewsletterSection className="mt-20 sm:mt-28 mb-8" />
		</>
	);
}
