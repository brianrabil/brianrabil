import { ProjectCategory } from "@/components/project-card";
import type { Route } from "next";

enum TechCategory {
	FRAMEWORK = "Framework",
	HOSTING = "Hosting",
	AI = "AI",
	LANGUAGE = "Language",
	UI = "User Interface",
	OS = "Operating System",
	TOOL = "Tool",
	DATABASE = "Database",
}

interface TechItem {
	name: string;
	description: string;
	url: string;
	logo: string;
	category: TechCategory;
	featured: boolean;
}

interface CareerItem {
	title: string;
	company: string;
	startDate: string;
	endDate: string;
	description: string;
	logo: string;
}

export const config = {
	title: "Brian Rabil",
	description: "Personal Website",
	profile: {
		firstName: "Brian",
		lastName: "Rabil",
		jobTitle: "UX Architect & Full-Stack Engineer",
		stack: [
			{
				name: "Typescript",
				description: "Programming Language",
				url: "https://www.typescriptlang.org/",
				logo: "/logos/typescript-original.svg",
				category: TechCategory.LANGUAGE,
				featured: true,
			},
			{
				name: "Python",
				description: "Programming Language",
				url: "https://www.python.org/",
				logo: "/logos/python-original.svg",
				category: TechCategory.LANGUAGE,
				featured: false,
			},
			{
				name: "Go",
				description: "Programming Language",
				url: "https://go.dev/",
				logo: "/logos/go-light.svg",
				category: TechCategory.LANGUAGE,
				featured: false,
			},
			{
				name: "Next.js",
				description: "React Framework",
				url: "https://nextjs.org/",
				logo: "/logos/nextjs-original.svg",
				category: TechCategory.FRAMEWORK,
				featured: true,
			},
			{
				name: "Turborepo",
				description: "Build System",
				url: "https://turbo.build/repo",
				logo: "/logos/turborepo-original.svg",
				category: TechCategory.TOOL,
				featured: true,
			},
			{
				name: "Vercel",
				description: "Static Site Hosting",
				url: "https://vercel.com/",
				logo: "/logos/vercel-original.svg",
				category: TechCategory.HOSTING,
				featured: false,
			},
			{
				name: "shadcn/ui",
				description: "Components Library",
				url: "https://ui.shadcn.com/",
				logo: "/logos/shadcn-light.svg",
				category: TechCategory.UI,
				featured: true,
			},
			{
				name: "TailwindCSS",
				description: "CSS Framework",
				url: "https://tailwindcss.com/",
				logo: "/logos/tailwindcss-original.svg",
				category: TechCategory.UI,
				featured: true,
			},
			{
				name: "Prisma",
				description: "PostgreSQL ORM",
				url: "https://www.prisma.io/",
				logo: "/logos/prisma-light.svg",
				category: TechCategory.DATABASE,
				featured: true,
			},
			{
				name: "Biomejs",
				description: "Linter & Formatter",
				url: "https://biomejs.dev/",
				logo: "/logos/biomejs-original.svg",
				category: TechCategory.TOOL,
				featured: false,
			},
			{
				name: "n8n",
				description: "Workflow Automation",
				url: "https://n8n.io/",
				logo: "/logos/n8n-original.svg",
				category: TechCategory.TOOL,
				featured: true,
			},
			{
				name: "OpenAI",
				description: "LLM Foundation Model",
				url: "https://openai.com/",
				logo: "/logos/openai-light.svg",
				category: TechCategory.AI,
				featured: true,
			},
			{
				name: "Docker",
				description: "Containerization Platform",
				url: "https://www.docker.com/",
				logo: "/logos/docker-original.svg",
				category: TechCategory.TOOL,
				featured: true,
			},
			{
				name: "Digital Ocean",
				description: "Cloud Hosting",
				url: "https://www.digitalocean.com/",
				logo: "/logos/digitalocean-original.svg",
				category: TechCategory.HOSTING,
				featured: true,
			},
			{
				name: "Arc Browser",
				description: "Web Browser",
				url: "https://arc.net/",
				logo: "/logos/arc-original.svg",
				category: TechCategory.TOOL,
				featured: true,
			},
			{
				name: "Kubernetes",
				description: "Container Orchestration",
				url: "https://kubernetes.io/",
				logo: "/logos/kubernetes-original.svg",
				category: TechCategory.TOOL,
				featured: false,
			},
			{
				name: "PNPM",
				description: "Package Manager",
				url: "https://pnpm.io/",
				logo: "/logos/pnpm-original.svg",
				category: TechCategory.TOOL,
				featured: false,
			},
			{
				name: "Ubuntu",
				description: "Linux Distribution",
				url: "https://ubuntu.com/",
				logo: "/logos/ubuntu-original.svg",
				category: TechCategory.OS,
				featured: false,
			},
			{
				name: "Bun",
				description: "Package Manager",
				url: "https://bun.sh/",
				logo: "/logos/bun-original.svg",
				category: TechCategory.TOOL,
				featured: false,
			},
			{
				name: "Claude AI",
				description: "Large Language Model",
				url: "https://www.anthropic.com/products/claude-3-sonnet",
				logo: "/logos/claude-original.svg",
				category: TechCategory.AI,
				featured: false,
			},
			{
				name: "Cursor",
				description: "AI Code Editor",
				url: "https://www.cursor.com/",
				logo: "/logos/cursor-original.svg",
				category: TechCategory.TOOL,
				featured: true,
			},
			{
				name: "Mistral AI",
				description: "Large Language Model",
				url: "https://mistral.ai/",
				logo: "/logos/mistral-original.svg",
				category: TechCategory.AI,
				featured: false,
			},
			{
				name: "Perplexity",
				description: "Large Language Model",
				url: "https://www.perplexity.ai/",
				logo: "/logos/perplexity-original.svg",
				category: TechCategory.AI,
				featured: false,
			},
		] satisfies TechItem[],
		career: [
			{
				title: "Senior UI Engineer",
				company: "Goldman Sachs",
				startDate: "2021",
				endDate: "Present",
				description:
					"I worked for Cognizant as a Senior Software Engineer for 3 years. I was responsible for designing and developing web and desktop applications for clients in the financial services industry.",
				logo: "/logos/goldman-sachs.jpeg",
			},
			{
				title: "UX Architect",
				company: "Schema Driven",
				startDate: "2019",
				endDate: "2021",
				description:
					"Currently, I work for Schema Driven, a startup that provides enterprise-level automation software. As the lead UX Architect, I work closely with the engineering team to design and build powerful &amp; easy-to-use low-code tooling.",
				logo: "/logos/schema-driven.jpeg",
			},
			{
				title: "Lead Frontend Developer",
				company: "SAIC",
				startDate: "2017",
				endDate: "2019",
				description:
					"I started my career at Accenture as a Software Engineer. I worked on a variety of projects for clients in the healthcare and retail industries.",
				logo: "/logos/saic.jpeg",
			},
			{
				title: "Founder",
				company: "Smart Sale",
				startDate: "2013",
				endDate: "2016",
				description:
					"I started my career at Accenture as a Software Engineer. I worked on a variety of projects for clients in the healthcare and retail industries.",
				logo: "/logos/smart-sale.jpeg",
			},
			{
				title: "Graphic Designer",
				company: "Freelance",
				startDate: "2010",
				endDate: "2013",
				description: "",
				logo: "",
			},
		] satisfies CareerItem[],
	},
	nav: [
		{ name: "Home", href: "/" },
		{ name: "About", href: "/about" },
		{ name: "Works", href: "/works" },
		{ name: "Blog", href: "/posts" },
		{ name: "Contact", href: "/contact" },
	],
	social: {
		email: {
			network: "Email",
			href: "mailto:brianrabil@gmail.com",
		},
		x: {
			network: "X",
			username: "rabilb",
			href: "https://x.com/brianrabil",
		},
		github: {
			network: "GitHub",
			href: "https://github.com/brianrabil",
		},
		linkedin: {
			network: "LinkedIn",
			href: "https://www.linkedin.com/in/brianrabil/",
		},
		youtube: {
			network: "YouTube",
			// TODO: Update with actual YouTube channel
			href: "https://www.youtube.com/@brianrabil",
		},
		tiktok: {
			network: "TikTok",
			// TODO: Update with actual TikTok channel
			href: "https://www.tiktok.com/@brianrabil",
		},
		rss: {
			network: "RSS",
			// TODO: Update with actual RSS feed
			href: "#",
		},
	},
	// tools: [
	// 	{ name: "Tailwind", icon: <Icon.TailwindIcon /> },
	// 	{ name: "Figma", icon: <Icon.FigmaIcon /> },
	// 	// { name: "Python", icon: <Icon.PythonIcon /> },
	// 	{ name: "PostgreSQL", icon: <Icon.PostgresIcon /> },
	// 	// { name: "TypeScript", icon: <Icon.TypescriptIcon /> },
	// 	// { name: "JavaScript", icon: <Icon.JavascriptIcon /> },
	// 	{ name: "Go", icon: <Icon.GoIcon /> },
	// 	// { name: "Rust", icon: <Icon.RustIcon /> },
	// 	{ name: "Bash", icon: <Icon.BashIcon /> },
	// 	{ name: "Next.js", icon: <Icon.NextIcon /> },
	// 	{ name: "Vercel", icon: <Icon.VercelIcon /> },
	// 	// { name: "PNPM", icon: <Icon.PNPMIcon /> },
	// 	{ name: "Prisma", icon: <Icon.PrismaIcon /> },
	// 	// { name: "Express", icon: <Icon.ExpressIcon /> },
	// 	{ name: "Bun", icon: <Icon.BunIcon /> },
	// 	{ name: "Node.js", icon: <Icon.NodeIcon /> },
	// 	// { name: "Tauri", icon: <Icon.TauriIcon /> },
	// 	{ name: "Storybook", icon: <Icon.StorybookIcon /> },
	// 	// { name: "Webpack", icon: <Icon.WebpackIcon /> },
	// 	// { name: "GraphQL", icon: <Icon.GraphQL /> },
	// 	{ name: "AWS", icon: <Icon.AWSIcon /> },
	// 	{ name: "Docker", icon: <Icon.DockerIcon /> },
	// 	{ name: "GitLab", icon: <Icon.GitlabIcon /> },
	// 	{ name: "GitHub", icon: <Icon.GithubIcon /> },
	// 	// { name: "Apple", icon: <Icon.AppleIcon /> },
	// 	{ name: "Arch Linux", icon: <Icon.ArchLinuxIcon /> },
	// 	{ name: "Fedora", icon: <Icon.FedoraIcon /> },
	// 	{ name: "Chrome", icon: <Icon.ChromeIcon /> },
	// 	{ name: "Cypress", icon: <Icon.CypressIcon /> },
	// 	// { name: "Jira", icon: <Icon.JiraIcon /> },
	// 	// { name: "PostCSS", icon: <Icon.PostCSSIcon /> },
	// 	{ name: "Red Hat", icon: <Icon.RedHatIcon /> },
	// 	// { name: "Rollup", icon: <Icon.RollupIcon /> },
	// ],
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
			description: "Designed an intuitive banking application for personal finance management.",
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
			description: "Engineered an AI-powered data analysis tool for business intelligence.",
			image: "/images/saic-sa-module-builder-mockup.png",
		},
		{
			title: "Compeat",
			category: ProjectCategory.APP,
			description: "Designed a competitive analysis platform for small businesses.",
			image: "/images/sd-compeat-mockup.png",
		},
		{
			title: "CAP Map",
			category: ProjectCategory.APP,
			description: "Developed a mapping solution for Civil Air Patrol operations.",
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
			title: "Efficient JavaScript Tooling in 2024: The Latest Build Tools and Optimizations",
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
			title: "Adopting TypeScript in 2024: Tips for Seamless Integration into Existing Projects",
			href: "/blog/adopting-typescript-2024" as Route,
			category: "Guide",
			imageUrl: "https://placehold.co/600x400",
			date: "2024-05-01",
			description:
				"Learn how to smoothly integrate TypeScript into your existing projects with these practical tips.",
			readTime: "10 min read",
		},
	],
} as const;
