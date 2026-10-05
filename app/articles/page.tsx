import { ArticlesIndexClient } from "@/components/articles-index-client";
import { SimpleLayout } from "@/components/simple-layout";
import { getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Essays",
	description:
		"Essays by Brian Rabil on AI agents, infrastructure, and policy.",
};

export default async function ArticlesIndex() {
	const articles = await getAllArticles();

	return (
		<>
			<SimpleLayout title="Essays">
				<ArticlesIndexClient articles={articles} />
			</SimpleLayout>
		</>
	);
}
