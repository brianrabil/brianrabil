import type { BlogPostCardProps } from "@/components/blog-post-card";
import type { Route } from "next";

interface Config {
	title: string;
	description: string;
	nav: { name: string; href: Route }[];
	social: {
		x: {
			name: string;
			href: string;
		};
		github: {
			name: string;
			href: string;
		};
		linkedin: {
			name: string;
			href: string;
		};
		rss: {
			name: string;
			href: string;
		};
	};
	posts: BlogPostCardProps[];
}

export const config = {
	title: "Brian Rabil",
	description: "Personal Website",
	nav: [
		{ name: "Home", href: "/" },
		{ name: "About", href: "/about" },
		{ name: "Works", href: "/works" },
		{ name: "Blog", href: "/blog" },
		{ name: "Contact", href: "/contact" },
	],
	social: {
		x: {
			name: "X",
			href: "https://x.com/brianrabil",
		},
		github: {
			name: "GitHub",
			href: "#",
		},
		linkedin: {
			name: "LinkedIn",
			href: "#",
		},
		rss: {
			name: "RSS",
			href: "#",
		},
	},
	posts: [
		{
			id: "1",
			title: "Why Tailwind CSS is the Top Choice for Modern Web Development",
			href: "/blog/why-tailwind-css-is-the-top-choice" as Route,
			category: "Review",
			imageUrl: "https://example.com/tailwind-css-cover.jpg",
			date: "2024-04-20",
			datetime: "2024-04-20",
		},
		{
			id: "2",
			title:
				"Efficient JavaScript Tooling in 2024: The Latest Build Tools and Optimizations",
			href: "/blog/efficient-javascript-tooling-2024" as Route,
			category: "Guide",
			imageUrl: "/dall-e-blog-cover.webp",
			date: "2024-04-25",
			datetime: "2024-04-25",
		},
		{
			id: "3",
			title:
				"Adopting TypeScript in 2024: Tips for Seamless Integration into Existing Projects",
			href: "/blog/adopting-typescript-2024" as Route,
			category: "Guide",
			imageUrl: "https://example.com/typescript-integration.jpg",
			date: "2024-05-01",
			datetime: "2024-05-01",
		},
		{
			id: "4",
			title: "The Future of React: What to Expect in 2025",
			href: "/blog/future-of-react-2025" as Route,
			category: "Prediction",
			imageUrl: "https://example.com/react-future.jpg",
			date: "2024-05-10",
			datetime: "2024-05-10",
		},
	],
} satisfies Config;
