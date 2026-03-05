import type { AppConfig } from "@/lib/zod";

export const appConfig: AppConfig = {
  title: "Brian Rabil",
  description:
    "Solo founder building a portfolio of AI-native products. Depth over velocity.",
  fullName: "Brian Rabil",
  email: "brianrabil@gmail.com",
  location: "Dallas, TX",
  jobTitle: "Solo Founder",
  education: {
    university: "Harvard University",
    degree: "Bachelor of Liberal Arts, Computer Science (Expected)",
    dates: "2019 - 2025",
  },
  social: {
    email: { network: "Email", href: "mailto:brianrabil@gmail.com" },
    x: { network: "X", username: "rabilb", href: "https://x.com/brianrabil" },
    github: { network: "GitHub", href: "https://github.com/brianrabil" },
    linkedin: {
      network: "LinkedIn",
      href: "https://www.linkedin.com/in/brianrabil/",
    },
    rss: { network: "RSS", href: "/feed.xml" },
  },
  tools: [
    { name: "Next.js", logo: "/images/logos/nextjs-original.svg" },
    { name: "React", logo: "/images/logos/react-original.svg" },
    { name: "TypeScript", logo: "/images/logos/typescript-original.svg" },
    { name: "Tailwind CSS", logo: "/images/logos/tailwindcss-original.svg" },
    { name: "Figma", logo: "/images/logos/figma-original.svg" },
    { name: "GitHub", logo: "/images/logos/github-original.svg" },
    { name: "Docker", logo: "/images/logos/docker-original.svg" },
    { name: "Kubernetes", logo: "/images/logos/kubernetes-original.svg" },
    { name: "Vercel", logo: "/images/logos/vercel-original.svg" },
    { name: "PostgreSQL", logo: "/images/logos/postgresql-original.svg" },
    { name: "Prisma", logo: "/images/logos/prisma-light.svg" },
    { name: "MongoDB", logo: "/images/logos/mongodb-original.svg" },
    { name: "Node.js", logo: "/images/logos/nodejs-original.svg" },
    { name: "Python", logo: "/images/logos/python-original.svg" },
    { name: "OpenAI", logo: "/images/logos/openai-light.svg" },
    { name: "Shadcn UI", logo: "/images/logos/shadcn-light.svg" },
    { name: "Bun", logo: "/images/logos/bun-original.svg" },
    { name: "LangGraph", logo: "/images/logos/langgraph.svg" },
    { name: "Vercel AI SDK", logo: "/images/logos/vercel-ai-sdk.svg" },
    { name: "CrewAI", logo: "/images/logos/crewai.svg" },
    { name: "Langflow", logo: "/images/logos/langflow.svg" },
  ],
  services: [
    {
      title: "Technical Consulting",
      services: [
        "System Modernization",
        "SEO Strategy",
        "Performance Optimization",
      ],
    },
    {
      title: "UX/UI Design",
      services: [
        "Wireframing & Prototyping",
        "User Research",
        "Usability Testing",
      ],
    },
    {
      title: "App Development",
      services: [
        "Rapid Prototyping",
        "Web & Mobile Apps",
        "API Development",
        "CI/CD Automation",
      ],
    },
    {
      title: "AI Solutions",
      services: [
        "AI Integration",
        "Process Automation",
        "Custom AI Development",
      ],
    },
  ],
  projects: [
    {
      name: "Brian Rabil",
      logo: {
        primary: "/avatar.png",
        light: "/avatar.png",
        dark: "/avatar.png",
      },
      status: "live",
      used: [],
      variant: "app",
      description:
        "AI-native portfolio and personal site.",
      link: [
        {
          href: "https://brianrabil.com",
          label: "brianrabil.com",
          icon: "external",
        },
      ],
    },
    {
      name: "RSSX",
      logo: {
        primary: "/branding/rssx-logo-primary.svg",
        light: "/branding/rssx-logo-light.svg",
        dark: "/branding/rssx-logo-dark.svg",
      },
      status: "live",
      used: ["Next.js"],
      description:
        "Reading-first RSS client with structured, filterable feeds.",
      variant: "app",
      link: [
        {
          href: "https://rssx.ai",
          label: "rssx.ai",
          icon: "external",
        },
      ],
    },
    {
      name: "Jobhop",
      logo: {
        primary: "/branding/jobhop-logo-light.svg",
        light: "/branding/jobhop-logo-light.svg",
        dark: "/branding/jobhop-logo-dark.svg",
      },
      status: "live",
      used: ["Next.js"],
      variant: "app",
      description:
        "AI job search that surfaces high-fit roles fast.",
      link: [
        {
          href: "https://jobhop.ai",
          label: "jobhop.ai",
          icon: "external",
        },
      ],
    },
    {
      name: "Indexwell",
      logo: {
        primary: "/branding/page-to-prompt-logo-light.svg",
        light: "/branding/page-to-prompt-logo-light.svg",
        dark: "/branding/page-to-prompt-logo-dark.svg",
      },
      status: "backlog",
      description:
        "Turn any webpage into structured AI prompts.",
      used: ["WXT"],
      variant: "app",
      link: [],
    },
    {
      name: "Hyperpost",
      logo: {
        primary: "/branding/hyperpost-logo-primary.svg",
        light: "/branding/hyperpost-logo-light.svg",
        dark: "/branding/hyperpost-logo-dark.svg",
      },
      used: ["Next.js", "Vercel"],
      status: "backlog",
      description:
        "Content ops workspace for drafting and publishing.",
      variant: "app",
      link: [],
    },
    {
      name: "Walljoy",
      logo: {
        primary: "/branding/walljoy-logo-primary.svg",
        light: "/branding/walljoy-logo-light.svg",
        dark: "/branding/walljoy-logo-dark.svg",
      },
      status: "backlog",
      used: ["Next.js"],
      variant: "app",
      description:
        "Prompt-to-wall-art with framing and fulfillment.",
      link: [],
    },
    {
      name: "Inflect",
      logo: {
        primary: "/branding/ebook-agent-logo-light.svg",
        light: "/branding/ebook-agent-logo-light.svg",
        dark: "/branding/ebook-agent-logo-dark.svg",
      },
      status: "backlog",
      used: ["Rust"],
      variant: "app",
      description:
        "Local-first AI writing studio for long-form.",
      link: [],
    },
    {
      name: "Bae",
      logo: {
        primary: "/branding/bae-logo-primary.svg",
        light: "/branding/bae-logo-light.svg",
        dark: "/branding/bae-logo-dark.svg",
      },
      status: "building",
      description:
        "Social simulation with autonomous AI personas.",
      used: ["Nuxt"],
      link: [],
      variant: "app",
    },
    {
      name: "Gigaswarm",
      logo: {
        primary: "/branding/ai-chat-app-logo-light.svg",
        light: "/branding/ai-chat-app-logo-light.svg",
        dark: "/branding/ai-chat-app-logo-dark.svg",
      },
      status: "building",
      description:
        "Private desktop AI with fully local inference.",
      used: ["Rust"],
      variant: "app",
      link: [],
    },
    {
      name: "Shadcn Galaxy",
      logo: {
        primary: "/branding/shadcn-galaxy-logo-light.svg",
        light: "/branding/shadcn-galaxy-logo-light.svg",
        dark: "/branding/shadcn-galaxy-logo-dark.svg",
      },
      status: "building",
      used: ["Next.js"],
      variant: "directory",
      description:
        "Directory for shadcn components and MCP servers.",
      link: [],
    },
    {
      name: "Snapclip",
      logo: {
        primary: "/branding/ai-clipper-logo-light.svg",
        light: "/branding/ai-clipper-logo-light.svg",
        dark: "/branding/ai-clipper-logo-dark.svg",
      },
      status: "backlog",
      used: ["Rust"],
      variant: "app",
      description:
        "Local video clipper with on-device transcription.",
      link: [],
    },
    {
      name: "Reelway",
      logo: {
        primary: "/branding/ai-torrent-app-logo-light.svg",
        light: "/branding/ai-torrent-app-logo-light.svg",
        dark: "/branding/ai-torrent-app-logo-dark.svg",
      },
      status: "backlog",
      description:
        "AI media manager with smart search and streaming UI.",
      used: ["Rust"],
      variant: "app",
      link: [],
    },
    {
      name: "Feedframe",
      logo: {
        primary: "/logo-primary.svg",
        light: "/logo-primary.svg",
        dark: "/logo-primary.svg",
      },
      status: "backlog",
      description:
        "Chrome extension for a calmer X timeline.",
      used: ["WXT"],
      variant: "app",
      link: [],
    },
    {
      name: "World Engine",
      logo: {
        primary: "/branding/world-engine-primary.svg",
        light: "/branding/world-engine-logo-light.svg",
        dark: "/branding/world-engine-dark.svg",
      },
      status: "building",
      description:
        "Realistic AI persona engine for social sims.",
      used: ["Oasis"],
      link: [],
      variant: "package",
    },
    {
      name: "Socialcn",
      logo: {
        primary: "/branding/socialcn-logo-primary.svg",
        light: "/branding/socialcn-logo-light.svg",
        dark: "/branding/socialcn-logo-dark.svg",
      },
      status: "building",
      used: ["shadcn/ui"],
      variant: "package",
      description:
        "Social and community UI components.",
      link: [],
    },
    {
      name: "Directory OS",
      logo: {
        primary: "/branding/directory-os-logo-primary.svg",
        light: "/branding/directory-os-logo-light.svg",
        dark: "/branding/directory-os-logo-dark.svg",
      },
      status: "building",
      used: ["shadcn/ui"],
      variant: "package",
      description:
        "Reusable directory framework for listing apps.",
      link: [],
    },
  ],
  workHistory: [
    {
      id: "0",
      title: "Independent AI Engineer",
      company: "Self-Employed",
      logo: "/logo-primary.svg",
      start: "2025",
      end: "Present",
    },
    {
      id: "1",
      title: "Full-Stack Engineer, VP",
      company: "Goldman Sachs",
      logo: "/branding/goldman-sachs.jpeg",
      start: "2021",
      end: "2024",
    },
    {
      id: "2",
      title: "UX Architect & Full-Stack Engineer",
      company: "Schema Driven",
      logo: "/branding/schema-driven.jpeg",
      start: "2019",
      end: "2021",
    },
    {
      id: "3",
      title: "Front-End Engineer, Lead",
      company: "SAIC",
      logo: "/branding/saic.jpeg",
      start: "2017",
      end: "2019",
    },
    {
      id: "4",
      title: "Founder",
      company: "Smart Sale",
      logo: "/branding/smart-sale.jpeg",
      start: "2014",
      end: "2017",
    },
  ],
  awards: [
    { title: "Felix Prize", issuer: "Goldman Sachs", date: "Dec 2022" },
    {
      title: "Innovation Award",
      issuer: "Washington Technology",
      date: "Jan 2018",
    },
  ],
};
