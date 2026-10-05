import type { AppConfig } from "@/lib/zod";

export const appConfig: AppConfig = {
	title: "Brian Rabil",
	description:
		"AI software products built and owned by Brian Rabil, including Hyperpost, Workbot, Brain, vswarm, and RSSX.",
	fullName: "Brian Rabil",
	email: "brianrabil@gmail.com",
	social: {
		email: { network: "Email", href: "mailto:brianrabil@gmail.com" },
		x: { network: "X", username: "rabilb", href: "https://x.com/brianrabil" },
		github: { network: "GitHub", href: "https://github.com/brianrabil" },
		rss: { network: "RSS", href: "/feed.xml" },
	},
	projects: [
		{
			name: "Hyperpost",
			slug: "hyperpost",
			category: "server",
			logo: {
				light: "/marks/hyperpost-light.svg",
				dark: "/marks/hyperpost-dark.svg",
			},
			status: "alpha",
			description:
				"An agent that plans, builds, and runs a business. In closed alpha.",
			used: ["Next.js", "Eve", "AI SDK", "Workflow"],
			link: [
				{
					href: "https://hyperpost.ai",
					label: "hyperpost.ai",
					icon: "external",
				},
			],
		},
		{
			name: "vswarm",
			slug: "vswarm",
			category: "server",
			logo: {
				light: "/marks/vswarm-light.svg",
				dark: "/marks/vswarm-dark.svg",
			},
			status: "building",
			description:
				"A self-hosted AI SDK server with chat, docs, and a typed API. MIT licensed.",
			used: ["Next.js", "AI SDK", "Workflow"],
			link: [],
		},
		{
			name: "Media Server",
			slug: "media-server",
			category: "server",
			status: "building",
			description:
				"A self-hosted media server for your personal library, with a streaming-style interface and AI search.",
			used: ["Next.js", "AI SDK", "Workflow", "vgpu"],
			link: [],
		},
		{
			name: "Workbot",
			slug: "workbot",
			category: "harness",
			logo: {
				light: "/marks/workbot-light.svg",
				dark: "/marks/workbot-dark.svg",
			},
			status: "alpha",
			description:
				"A local subagent you plug into Claude Code. It runs on your machine with a local model and works through long jobs in the background.",
			used: ["Nitro", "AI SDK", "Chat SDK", "Workflow"],
			link: [],
		},
		{
			name: "Command Center",
			slug: "command-center",
			category: "desktop",
			logo: {
				light: "/marks/command-center-light.svg",
				dark: "/marks/command-center-dark.svg",
			},
			status: "building",
			description:
				"A Linux distribution for running agents, with its own desktop and native apps. Hyperpost’s desktop app is part of it.",
			used: ["Zig", "Native SDK", "Metal"],
			link: [],
		},
		{
			name: "Arcwrite",
			slug: "arcwrite",
			category: "app",
			logo: {
				light: "/marks/arcwrite-light.svg",
				dark: "/marks/arcwrite-dark.svg",
			},
			status: "building",
			description: "An app where agents help plan, write, and edit books.",
			used: ["Next.js", "Eve", "Workflow"],
			link: [],
		},
		{
			name: "RSSX",
			slug: "rssx",
			category: "app",
			logo: { light: "/marks/rssx-light.svg", dark: "/marks/rssx-dark.svg" },
			status: "live",
			description:
				"An RSS reader with structured feeds, filtering, and semantic search.",
			used: ["Next.js", "AI SDK", "Workflow"],
			link: [{ href: "https://rssx.ai", label: "rssx.ai", icon: "external" }],
		},
		{
			name: "Brain",
			slug: "brain",
			category: "kit",
			logo: { light: "/marks/brain-light.svg", dark: "/marks/brain-dark.svg" },
			status: "alpha",
			description:
				"A memory library for agents. Stores data in your own SQLite, libSQL, PGlite, or Postgres database.",
			used: ["Drizzle", "AI SDK", "Eve"],
			link: [],
		},
		{
			name: "ui",
			slug: "ui",
			category: "kit",
			logo: { light: "/marks/ui-light.svg", dark: "/marks/ui-dark.svg" },
			status: "building",
			description:
				"A registry of shadcn components and blocks used across these products.",
			used: ["Next.js", "shadcn"],
			link: [],
		},
		{
			name: "Zig World",
			slug: "zig-world",
			category: "kit",
			status: "building",
			description:
				"A Workflow World with its engine in Zig: durable workflow state in SQLite or an append-only log, loaded into Node through Node-API and embeddable from any language that calls C. No dependencies.",
			used: ["Zig", "SQLite", "Workflow"],
			link: [],
		},
	],
};
