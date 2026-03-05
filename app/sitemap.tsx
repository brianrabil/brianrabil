import { getAllArticles } from "@/lib/articles";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const articles = await getAllArticles();

	const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
		url: `https://brianrabil.com/articles/${article.slug}`,
		lastModified: new Date(article.date),
		changeFrequency: "monthly",
		priority: 0.7,
	}));

	return [
		{
			url: "https://brianrabil.com",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: "https://brianrabil.com/articles",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		...articleEntries,
	];
}
