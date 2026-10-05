/**
 * Past projects. Years come from each repository's first and last commit;
 * descriptions come from the project's own copy or its earlier entry on this
 * site. Concepts were listed on the site but never built past planning.
 */
export type ArchiveEntry = {
	name: string;
	years: string;
	description: string;
	note?: string;
	logo?: { light: string; dark: string };
};

export type ArchiveGroup = {
	id: string;
	label: string;
	entries: ArchiveEntry[];
};

const b = "/branding/";

export const ARCHIVE: ArchiveGroup[] = [
	{
		id: "paused",
		label: "Paused",
		entries: [
			{
				name: "Snapclip",
				years: "2026",
				description:
					"Cuts long videos into short vertical clips with subtitles.",
				logo: {
					light: `${b}ai-clipper-logo-light.svg`,
					dark: `${b}ai-clipper-logo-dark.svg`,
				},
			},
			{
				name: "Gigaswarm",
				years: "2026",
				description:
					"A file-first local AI development environment, built with Rust and Tauri.",
				logo: {
					light: `${b}ai-chat-app-logo-light.svg`,
					dark: `${b}ai-chat-app-logo-dark.svg`,
				},
			},
		],
	},
	{
		id: "stopped",
		label: "Stopped",
		entries: [
			{
				name: "Office Machine",
				years: "2026",
				description:
					"An open-source desktop environment with native apps, built with Native SDK and Zig. Now part of Command Center.",
			},
			{
				name: "Workstation",
				years: "2026",
				description:
					"A local-first, open-source workspace for working with agents. Now part of Command Center.",
			},
			{
				name: "Jobhop",
				years: "2024–2026",
				description: "A jobs and companies directory with an AI recruiter.",
				logo: {
					light: `${b}jobhop-logo-light.svg`,
					dark: `${b}jobhop-logo-dark.svg`,
				},
			},
			{
				name: "Bae",
				years: "2025–2026",
				description: "A synthetic character studio for building AI characters.",
				logo: {
					light: `${b}bae-logo-light.svg`,
					dark: `${b}bae-logo-dark.svg`,
				},
			},
			{
				name: "Brandy",
				years: "2026",
				description: "Brand systems for online businesses.",
			},
			{
				name: "World Engine",
				years: "2026",
				description: "An AI persona engine for simulating social behaviour.",
				logo: {
					light: `${b}world-engine-logo-light.svg`,
					dark: `${b}world-engine-dark.svg`,
				},
			},
			{
				name: "AI video editor",
				years: "2026",
				description: "A local-first video editor with AI editing tools.",
			},
			{
				name: "Auraforge",
				years: "2026",
				description: "A self-hostable personal brand platform.",
			},
		],
	},
	{
		id: "concepts",
		label: "Concepts",
		entries: [
			{
				name: "Walljoy",
				years: "2026",
				description:
					"AI-generated artwork, printed and shipped as framed wall art.",
				logo: {
					light: `${b}walljoy-logo-light.svg`,
					dark: `${b}walljoy-logo-dark.svg`,
				},
			},
			{
				name: "Indexwell",
				years: "2026",
				description:
					"A browser extension that turns a webpage into a structured prompt.",
				logo: {
					light: `${b}page-to-prompt-logo-light.svg`,
					dark: `${b}page-to-prompt-logo-dark.svg`,
				},
			},
			{
				name: "Feedframe",
				years: "2026",
				description:
					"A Chrome extension that shows the X timeline in a structured layout.",
			},
			{
				name: "Shadcn Galaxy",
				years: "2026",
				description: "A directory of shadcn components and MCP servers.",
				logo: {
					light: `${b}shadcn-galaxy-logo-light.svg`,
					dark: `${b}shadcn-galaxy-logo-dark.svg`,
				},
			},
			{
				name: "Socialcn",
				years: "2026",
				description: "Social and community UI components for shadcn.",
				logo: {
					light: `${b}socialcn-logo-light.svg`,
					dark: `${b}socialcn-logo-dark.svg`,
				},
			},
			{
				name: "Directory OS",
				years: "2026",
				description: "A reusable framework for building directory sites.",
				logo: {
					light: `${b}directory-os-logo-light.svg`,
					dark: `${b}directory-os-logo-dark.svg`,
				},
			},
		],
	},
	{
		id: "earlier",
		label: "Earlier",
		entries: [
			{
				name: "Smart Sale",
				years: "2014–2017",
				description: "The first company I founded.",
			},
		],
	},
];
