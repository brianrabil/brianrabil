import { object, string } from "zod";
import { z } from "zod";

const SocialNetworkSchema = object({
	network: string(),
	username: string().optional(),
	href: string(),
});

const ProjectLinkSchema = object({
	icon: z.enum(["github", "external", "docs"]),
	href: string(),
	label: string(),
});

const ProjectSchema = object({
	name: string(),
	logo: z
		.object({
			primary: z.string().optional(),
			light: z.string(),
			dark: z.string(),
		})
		.optional(),
	/** URL segment for the store listing at /apps/<slug>. */
	slug: string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
	category: z.enum(["server", "harness", "ade", "desktop", "app", "kit"]),
	status: z.enum([
		"alpha",
		"backlog",
		"planning",
		"building",
		"live",
		"paused",
		"folded",
		"pivoted",
		"acquired",
	]),
	description: string(),
	used: z.array(string()),
	link: z.array(ProjectLinkSchema),
});

const SocialSchema = object({
	email: SocialNetworkSchema,
	x: SocialNetworkSchema,
	github: SocialNetworkSchema,
	rss: SocialNetworkSchema,
});

export const AppConfigSchema = object({
	title: string(),
	description: string(),
	fullName: string(),
	email: string().email(),
	social: SocialSchema,
	projects: z.array(ProjectSchema),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
