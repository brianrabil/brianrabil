import { getAllArticles } from "@/lib/articles";
import { getAllFinds } from "@/lib/finds";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [articles, finds] = await Promise.all([
		getAllArticles(),
		getAllFinds(),
	]);

	const findEntries: MetadataRoute.Sitemap = finds.map((find) => ({
		url: `https://brianrabil.com/finds/${find.slug}`,
		lastModified: new Date(find.date),
		changeFrequency: "monthly",
		priority: 0.6,
	}));

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
		{
			url: "https://brianrabil.com/finds",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: "https://brianrabil.com/archive",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.4,
		},
		{
			url: "https://brianrabil.com/stack",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: "https://brianrabil.com/skills",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: "https://brianrabil.com/brand",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		...findEntries,
		...articleEntries,
	];
}
