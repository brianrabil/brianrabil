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
	readonly name: string;
	readonly description: string;
	readonly url: string;
	readonly logo: string;
	readonly category: TechCategory;
	readonly featured: boolean;
}

interface CareerItem {
	readonly title: string;
	readonly company: string;
	readonly startDate: string;
	readonly endDate: string;
	readonly description: string;
	readonly logo: string;
}

interface Project {
	readonly title: string;
	readonly category: ProjectCategory;
	readonly company: {
		name: string;
		logo: string;
	};
	readonly description: string;
	readonly images: {
		src: string;
		alt: string;
	}[];
	readonly url?: string;
	readonly github?: string;
	readonly status: "featured" | "default" | "archived";
}

interface ServiceItem {
	readonly title: string;
	readonly services: string[];
}

export const config = {
	title: "Brian Rabil",
	description: "Personal Website",
	nav: [
		{ name: "Home", href: "/" },
		{ name: "Work", href: "/works" },
		{ name: "About", href: "/about" },
		{ name: "Services", href: "/services" },
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

	tools: [
		{
			name: "Next.js",
			logo: "/logos/nextjs-original.svg",
			category: TechCategory.FRAMEWORK,
			featured: true,
		},
		// {
		// 	name: "React",
		// 	logo: "/logos/react-original.svg",
		// 	category: TechCategory.FRAMEWORK,
		// 	featured: true,
		// },
		{
			name: "TypeScript",
			logo: "/logos/typescript-original.svg",
			category: TechCategory.LANGUAGE,
			featured: true,
		},
		{
			name: "Tailwind CSS",
			logo: "/logos/tailwindcss-original.svg",
			category: TechCategory.UI,
			featured: true,
		},
		{
			name: "Figma",
			logo: "/logos/figma-original.svg",
			category: TechCategory.UI,
			featured: true,
		},
		{
			name: "Github",
			logo: "/logos/github-original.svg",
			category: TechCategory.TOOL,
			featured: true,
		},
		{
			name: "Docker",
			logo: "/logos/docker-original.svg",
			category: TechCategory.TOOL,
			featured: true,
		},
		{
			name: "Kubernetes",
			logo: "/logos/kubernetes-original.svg",
			category: TechCategory.TOOL,
			featured: true,
		},
		{
			name: "Vercel",
			logo: "/logos/vercel-original.svg",
			category: TechCategory.HOSTING,
			featured: true,
		},

		{
			name: "Digital Ocean",
			logo: "/logos/digital-ocean-original.svg",
			category: TechCategory.HOSTING,
			featured: true,
		},
		{
			name: "PostgreSQL",
			logo: "/logos/postgresql-original.svg",
			category: TechCategory.DATABASE,
			featured: true,
		},
		{
			name: "Python",
			logo: "/logos/python-original.svg",
			category: TechCategory.LANGUAGE,
			featured: true,
		},
		{
			name: "Cursor",
			logo: "/logos/cursor-original.svg",
			category: TechCategory.TOOL,
			featured: true,
		},
		{
			name: "Zod",
			logo: "/logos/zod-original.svg",
			category: TechCategory.FRAMEWORK,
			featured: false,
		},
		{
			name: "Tauri",
			logo: "/logos/tauri-original.svg",
			category: TechCategory.FRAMEWORK,
			featured: false,
		},
		{
			name: "n8n",
			logo: "/logos/n8n-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "v0",
			logo: "/logos/v0_light.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Turborepo",
			logo: "/logos/turborepo-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Prisma",
			logo: "/logos/prisma-light.svg",
			category: TechCategory.DATABASE,
			featured: true,
		},
		{
			name: "Arc",
			logo: "/logos/arc-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "OpenAI",
			logo: "/logos/openai-light.svg",
			category: TechCategory.AI,
			featured: true,
		},
		{
			name: "Shadcn UI",
			logo: "/logos/shadcn-light.svg",
			category: TechCategory.UI,
			featured: true,
		},
		{
			name: "Ubuntu",
			logo: "/logos/ubuntu-original.svg",
			category: TechCategory.OS,
			featured: false,
		},
		{
			name: "Perplexity",
			logo: "/logos/perplexity-original.svg",
			category: TechCategory.AI,
			featured: false,
		},
		{
			name: "Biome",
			logo: "/logos/biomejs-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Mistral AI",
			logo: "/logos/mistral-original.svg",
			category: TechCategory.AI,
			featured: false,
		},
		{
			name: "Claude",
			logo: "/logos/claude-original.svg",
			category: TechCategory.AI,
			featured: false,
		},
		{
			name: "Framer Motion",
			logo: "/logos/framermotion-original.svg",
			category: TechCategory.UI,
			featured: false,
		},
		{
			name: "Gentoo",
			logo: "/logos/gentoo-original.svg",
			category: TechCategory.OS,
			featured: false,
		},
		{
			name: "GIMP",
			logo: "/logos/gimp-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "GitHub",
			logo: "/logos/github-original.svg",
			category: TechCategory.TOOL,
			featured: true,
		},
		{
			name: "Inkscape",
			logo: "/logos/inkscape-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Jira",
			logo: "/logos/jira-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "MongoDB",
			logo: "/logos/mongodb-original.svg",
			category: TechCategory.DATABASE,
			featured: true,
		},
		{
			name: "Netlify",
			logo: "/logos/netlify-original.svg",
			category: TechCategory.HOSTING,
			featured: false,
		},
		{
			name: "Neovim",
			logo: "/logos/neovim-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Node.js",
			logo: "/logos/nodejs-original.svg",
			category: TechCategory.FRAMEWORK,
			featured: true,
		},
		{
			name: "npm",
			logo: "/logos/npm-original-wordmark.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Yarn",
			logo: "/logos/yarn-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Xcode",
			logo: "/logos/xcode-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "WordPress",
			logo: "/logos/wordpress-plain.svg",
			category: TechCategory.FRAMEWORK,
			featured: false,
		},
		{
			name: "Windows",
			logo: "/logos/windows11-original.svg",
			category: TechCategory.OS,
			featured: false,
		},
		{
			name: "WebStorm",
			logo: "/logos/webstorm-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Webpack",
			logo: "/logos/webpack-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Vue.js",
			logo: "/logos/vuejs-original.svg",
			category: TechCategory.FRAMEWORK,
			featured: false,
		},
		{
			name: "Vitest",
			logo: "/logos/vitest-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "VS Code",
			logo: "/logos/vscode-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "NixOS",
			logo: "/logos/nixos-original.svg",
			category: TechCategory.OS,
			featured: false,
		},
		{
			name: "Vim",
			logo: "/logos/vim-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "tRPC",
			logo: "/logos/trpc-original.svg",
			category: TechCategory.FRAMEWORK,
			featured: false,
		},
		{
			name: "Svelte",
			logo: "/logos/svelte-original.svg",
			category: TechCategory.FRAMEWORK,
			featured: false,
		},
		{
			name: "Supabase",
			logo: "/logos/supabase-original.svg",
			category: TechCategory.DATABASE,
			featured: false,
		},
		{
			name: "SQLite",
			logo: "/logos/sqlite-original.svg",
			category: TechCategory.DATABASE,
			featured: false,
		},
		{
			name: "RxJS",
			logo: "/logos/rxjs-original.svg",
			category: TechCategory.FRAMEWORK,
			featured: false,
		},
		{
			name: "Red Hat",
			logo: "/logos/redhat-original.svg",
			category: TechCategory.OS,
			featured: false,
		},
		{
			name: "Puppeteer",
			logo: "/logos/puppeteer-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Podman",
			logo: "/logos/podman-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "PostCSS",
			logo: "/logos/postcss-original.svg",
			category: TechCategory.UI,
			featured: false,
		},
		{
			name: "pnpm",
			logo: "/logos/pnpm-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Linux",
			logo: "/logos/linux-original.svg",
			category: TechCategory.OS,
			featured: false,
		},
		{
			name: "jQuery",
			logo: "/logos/jquery-original.svg",
			category: TechCategory.FRAMEWORK,
			featured: false,
		},
		{
			name: "Helm",
			logo: "/logos/helm-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Gulp",
			logo: "/logos/gulp-plain.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "GraphQL",
			logo: "/logos/graphql-plain.svg",
			category: TechCategory.FRAMEWORK,
			featured: false,
		},
		{
			name: "GitLab",
			logo: "/logos/gitlab-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Fedora",
			logo: "/logos/fedora-original.svg",
			category: TechCategory.OS,
			featured: false,
		},
		{
			name: "Emacs",
			logo: "/logos/emacs-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Electron",
			logo: "/logos/electron-original.svg",
			category: TechCategory.FRAMEWORK,
			featured: false,
		},
		{
			name: "Debian",
			logo: "/logos/debian-original.svg",
			category: TechCategory.OS,
			featured: false,
		},
		{
			name: "D3.js",
			logo: "/logos/d3js-original.svg",
			category: TechCategory.FRAMEWORK,
			featured: false,
		},
		{
			name: "Bun",
			logo: "/logos/bun-original.svg",
			category: TechCategory.TOOL,
			featured: true,
		},
		{
			name: "Azure",
			logo: "/logos/azure-original.svg",
			category: TechCategory.HOSTING,
			featured: false,
		},
		{
			name: "ArgoCD",
			logo: "/logos/argocd-original.svg",
			category: TechCategory.TOOL,
			featured: false,
		},
		{
			name: "Arch Linux",
			logo: "/logos/archlinux-original.svg",
			category: TechCategory.OS,
			featured: false,
		},
	],

	services: [
		{
			title: "Technical Consulting",
			services: [
				"Legacy System Modernization",
				"SEO Strategy & Optimization",
				"Performance Optimization",
				"WCAG 2.1 Audits",
				"Security Audits",
			],
		},
		{
			title: "UI & UX Design",
			services: [
				"Experience Strategy",
				"User Flow Design",
				"Wire-framing and Prototyping",
				"User Interface Design",
				"User Research",
				"User Testing",
			],
		},
		{
			title: "App Development",
			services: [
				"Rapid Prototyping",
				"Web App Development",
				"Mobile App Development",
				"API Development",
				"Testing & Deployments",
				"Cloud Hosting",
				"DevOps",
			],
		},
		{
			title: "Content Strategy",
			services: [
				"Search Optimization",
				"Growth Engineering",
				"Content Marketing",
				"Content Creation",
			],
		},
		{
			title: "AI Automation",
			services: [
				"Data Processing",
				"AI Model Integration",
				"Process Optimization",
				"Custom AI Solutions",
			],
		},
	] satisfies ServiceItem[],

	projects: [
		{
			title: "Marcus by Goldman Sachs",
			category: ProjectCategory.APP,
			company: { name: "Goldman Sachs", logo: "/logos/goldman-sachs.jpeg" },
			description: "Designed and built a modern banking application for the Marcus by Goldman Sachs brand.",
			images: [
				{
					src: "/images/gs-marcus-mockup.png",
					alt: "Marcus by Goldman Sachs",
				},
			],
			status: "default",
		},
		{
			title: "Warrior Academy Course Platform",
			category: ProjectCategory.APP,
			company: { name: "Schema Driven", logo: "/logos/schema-driven.jpeg" },
			description:
				"Engineered an AI-powered fitness tracking platform for military recruitment, optimizing candidate selection and training regimens.",
			images: [
				{
					src: "/images/sd-warrior-academy-mockup.png",
					alt: "Warrior Academy Learning",
				},
				{
					src: "/images/sd-warrior-academy-learning-mockup.png",
					alt: "Warrior Academy Learning",
				},
			],
			status: "featured",
		},
		{
			title: "My Financial",
			category: ProjectCategory.APP,
			company: { name: "Schema Driven", logo: "/logos/schema-driven.jpeg" },
			description: "Designed an intuitive banking application for personal finance management.",
			images: [
				{
					src: "/images/sd-my-financial-mockup.png",
					alt: "My Financial",
				},
			],
			status: "archived",
		},
		{
			title: "Synthetic Analyst",
			category: ProjectCategory.APP,
			company: { name: "SAIC", logo: "/logos/saic.jpeg" },
			description: "Engineered an AI-powered data analysis tool for business intelligence.",

			images: [
				{
					src: "/images/saic-sa-module-builder-mockup.png",
					alt: "Synthetic Analyst",
				},
			],
			status: "archived",
		},
		{
			title: "Compeat",
			category: ProjectCategory.APP,
			company: { name: "Schema Driven", logo: "/logos/schema-driven.jpeg" },
			description: "Designed a competitive analysis platform for small businesses.",
			images: [
				{
					src: "/images/sd-compeat-mockup.png",
					alt: "Compeat",
				},
			],
			status: "archived",
		},
		{
			title: "CAP Map",
			category: ProjectCategory.APP,
			company: { name: "SAIC", logo: "/logos/saic.jpeg" },
			description: "Developed a mapping solution for Civil Air Patrol operations.",
			images: [
				{
					src: "/images/saic-cap-map-mockup.png",
					alt: "CAP Map",
				},
			],
			status: "archived",
		},
		{
			title: "GMARS Logo",
			category: ProjectCategory.BRANDING,
			company: { name: "SAIC", logo: "/logos/saic.jpeg" },
			description: "Created a modern logo design for GMARS organization.",
			images: [
				{
					src: "/images/saic-gmars-logo.png",
					alt: "GMARS Logo",
				},
			],
			status: "archived",
		},
	] satisfies Project[],

	profile: {
		firstName: "Brian",
		lastName: "Rabil",
		jobTitle: "UX Architect & Full-Stack Engineer",
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
