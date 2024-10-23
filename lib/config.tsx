import type { Route } from "next";
import * as Icon from "@/components/dev-icons";
import { ProjectCategory } from "@/components/project-card";

interface Config {
	title: string;
	description: string;

	nav: {
		name: string;
		href: Route;
	}[];

	tools: {
		name: string;
		icon: React.ReactNode;
	}[];

	projects: {
		title: string;
		category: ProjectCategory;
		description: string;
		image: string;
	}[];

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

	testimonials: {
		name: string;
		title: string;
		image: string;
		quote: string;
		feedback: string;
		rating: number;
	}[];

	posts: {
		id: string;
		title: string;
		href: Route;
		category: string;
		imageUrl: string;
		date: string;
		description: string;
		readTime: string;
	}[];
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
	tools: [
		{ name: "Tailwind", icon: <Icon.TailwindIcon /> },
		{ name: "Figma", icon: <Icon.FigmaIcon /> },
		// { name: "Python", icon: <Icon.PythonIcon /> },
		{ name: "PostgreSQL", icon: <Icon.PostgresIcon /> },
		// { name: "TypeScript", icon: <Icon.TypescriptIcon /> },
		// { name: "JavaScript", icon: <Icon.JavascriptIcon /> },
		{ name: "Go", icon: <Icon.GoIcon /> },
		// { name: "Rust", icon: <Icon.RustIcon /> },
		{ name: "Bash", icon: <Icon.BashIcon /> },
		{ name: "Next.js", icon: <Icon.NextIcon /> },
		{ name: "Vercel", icon: <Icon.VercelIcon /> },
		// { name: "PNPM", icon: <Icon.PNPMIcon /> },
		{ name: "Prisma", icon: <Icon.PrismaIcon /> },
		// { name: "Express", icon: <Icon.ExpressIcon /> },
		{ name: "Bun", icon: <Icon.BunIcon /> },
		{ name: "Node.js", icon: <Icon.NodeIcon /> },
		// { name: "Tauri", icon: <Icon.TauriIcon /> },
		{ name: "Storybook", icon: <Icon.StorybookIcon /> },
		// { name: "Webpack", icon: <Icon.WebpackIcon /> },
		// { name: "GraphQL", icon: <Icon.GraphQL /> },
		{ name: "AWS", icon: <Icon.AWSIcon /> },
		{ name: "Docker", icon: <Icon.DockerIcon /> },
		{ name: "GitLab", icon: <Icon.GitlabIcon /> },
		{ name: "GitHub", icon: <Icon.GithubIcon /> },
		// { name: "Apple", icon: <Icon.AppleIcon /> },
		{ name: "Arch Linux", icon: <Icon.ArchLinuxIcon /> },
		{ name: "Fedora", icon: <Icon.FedoraIcon /> },
		{ name: "Chrome", icon: <Icon.ChromeIcon /> },
		{ name: "Cypress", icon: <Icon.CypressIcon /> },
		// { name: "Jira", icon: <Icon.JiraIcon /> },
		// { name: "PostCSS", icon: <Icon.PostCSSIcon /> },
		{ name: "Red Hat", icon: <Icon.RedHatIcon /> },
		// { name: "Rollup", icon: <Icon.RollupIcon /> },
	],
	projects: [
		{
			title: "Warrior Academy",
			category: ProjectCategory.APP,
			description:
				"Engineered an AI-powered fitness tracking platform for military recruitment, optimizing candidate selection and training regimens.",
			image: "/images/sd-warrior-academy-mockup.png",
		},
		{
			title: "My Financial",
			category: ProjectCategory.APP,
			description:
				"Designed an intuitive banking application for personal finance management.",
			image: "/images/sd-my-financial-mockup.png",
		},
		{
			title: "Warrior Academy Course Platform",
			category: ProjectCategory.APP,
			description:
				"Developed a comprehensive military training course platform for Warrior Academy, enhancing soldier preparation and skill development.",
			image: "/images/sd-warrior-academy-learning-mockup.png",
		},
		{
			title: "Synthetic Analyst",
			category: ProjectCategory.APP,
			description:
				"Engineered an AI-powered data analysis tool for business intelligence.",
			image: "/images/saic-sa-module-builder-mockup.png",
		},
		{
			title: "Compeat",
			category: ProjectCategory.APP,
			description:
				"Designed a competitive analysis platform for small businesses.",
			image: "/images/sd-compeat-mockup.png",
		},
		{
			title: "CAP Map",
			category: ProjectCategory.APP,
			description:
				"Developed a mapping solution for Civil Air Patrol operations.",
			image: "/images/saic-cap-map-mockup.png",
		},
		{
			title: "GMARS Logo",
			category: ProjectCategory.BRANDING,
			description: "Created a modern logo design for GMARS organization.",
			image: "/images/saic-gmars-logo.png",
		},
	],
	testimonials: [
		{
			name: "Katy Jackson",
			title: "Designer at Mailgorilla",
			image: "/path-to-katy-image.jpg", // Replace with actual image path
			quote: "Highly skilled and professional",
			feedback:
				"And robusta french bar luwak extra caffeine cup filter macchiato skinny shop cream that variety. Caramel black affogato con frappuccino mocha sweet milk and.",
			rating: 5,
		},
		{
			name: "Sean Murphy",
			title: "Founder of North Agency",
			image: "/path-to-sean-image.jpg",
			quote: "I highly recommend him",
			feedback:
				"And robusta french bar luwak extra caffeine cup filter macchiato skinny shop cream that variety. Caramel black affogato con frappuccino mocha sweet milk and.",
			rating: 5,
		},
		{
			name: "Elaine Foster",
			title: "CEO of Wakatech",
			image: "/path-to-elaine-image.jpg",
			quote: "I’m so lucky I found John!",
			feedback:
				"And robusta french bar luwak extra caffeine cup filter macchiato skinny shop cream that variety. Caramel black affogato con frappuccino mocha sweet milk and.",
			rating: 5,
		},
		{
			name: "Jeff Bick",
			title: "Developer at Bad Inc.",
			image: "/path-to-jeff-image.jpg",
			quote: "I’m really impressed with the quality of his work",
			feedback:
				"And robusta french bar luwak extra caffeine cup filter macchiato skinny shop cream that variety. Caramel black affogato con frappuccino mocha sweet milk and.",
			rating: 5,
		},
	],
	posts: [
		{
			id: "1",
			title: "Why Tailwind CSS is the Top Choice for Modern Web Development",
			href: "/blog/why-tailwind-css-is-the-top-choice" as Route,
			category: "Review",
			imageUrl: "https://placehold.co/600x400",
			date: "2024-04-20",
			description:
				"Explore the benefits of Tailwind CSS and why it's becoming the preferred choice for modern web developers.",
			readTime: "5 min read",
		},
		{
			id: "2",
			title:
				"Efficient JavaScript Tooling in 2024: The Latest Build Tools and Optimizations",
			href: "/blog/efficient-javascript-tooling-2024" as Route,
			category: "Guide",
			imageUrl: "https://placehold.co/600x400",
			date: "2024-04-25",
			description:
				"Discover the most efficient JavaScript build tools and optimization techniques for 2024.",
			readTime: "8 min read",
		},
		{
			id: "3",
			title:
				"Adopting TypeScript in 2024: Tips for Seamless Integration into Existing Projects",
			href: "/blog/adopting-typescript-2024" as Route,
			category: "Guide",
			imageUrl: "https://placehold.co/600x400",
			date: "2024-05-01",
			description:
				"Learn how to smoothly integrate TypeScript into your existing projects with these practical tips.",
			readTime: "10 min read",
		},
	],
} satisfies Config;
