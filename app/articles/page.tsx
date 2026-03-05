import { ArticlesIndexClient } from "@/components/articles-index-client";
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
		<SimpleLayout
			title="Writing"
			intro="Field notes from shipping AI-native software: agent systems, reliability, and product execution. Patterns, checklists, and implementation details—written for builders."
		>
			<ArticlesIndexClient articles={articles} />
		</SimpleLayout>
	);
}
