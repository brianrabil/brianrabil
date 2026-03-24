import { object, string } from "zod";
import { z } from "zod";

const SocialNetworkSchema = object({
  network: string(),
  username: string().optional(),
  href: string(),
});

const ToolSchema = object({
  name: string(),
  logo: string(),
});

const ServiceCategorySchema = object({
  title: string(),
  services: z.array(string()),
});

const ProjectLinkSchema = object({
  icon: z.enum(["github", "external", "docs"]),
  href: string(),
  label: string(),
});

const ProjectSchema = object({
  name: string(),
  logo: z.object({
    primary: z.string().optional(),
    light: z.string(),
    dark: z.string(),
  }),
  status: z.enum([
    "backlog",
    "planning",
    "building",
    "live",
    "folded",
    "pivoted",
    "acquired",
  ]),
  description: string(),
  used: z.array(string()),
  variant: z.enum(["app", "directory", "package", "course", "research", "art"]),
  link: z.array(ProjectLinkSchema),
});

const WorkHistorySchema = object({
  id: string(),
  title: string(),
  company: string(),
  logo: string(),
  start: string(),
  end: string(),
});

const AwardSchema = object({
  title: string(),
  issuer: string(),
  date: string(),
});

const EducationSchema = object({
  university: string(),
  degree: string(),
  dates: string(),
});

const SocialSchema = object({
  email: SocialNetworkSchema,
  x: SocialNetworkSchema,
  github: SocialNetworkSchema,
  linkedin: SocialNetworkSchema,
  rss: SocialNetworkSchema,
});

export const AppConfigSchema = object({
  title: string(),
  description: string(),
  fullName: string(),
  email: string().email(),
  location: string(),
  jobTitle: string(),
  education: EducationSchema,
  social: SocialSchema,
  tools: z.array(ToolSchema),
  services: z.array(ServiceCategorySchema),
  projects: z.array(ProjectSchema),
  workHistory: z.array(WorkHistorySchema),
  awards: z.array(AwardSchema),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
