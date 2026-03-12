import type { AppConfig } from "@/lib/zod";

export const appConfig: AppConfig = {
  title: "Brian Rabil",
  description:
    "Building practical AI software with a focus on local-first systems, AI agents, and developer infrastructure.",
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
        "This site.",
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
        "Reading-focused RSS client with powerful filtering and structured feeds.",
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
        "AI-assisted job discovery platform that surfaces high-fit opportunities quickly.",
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
        "Convert webpages into structured prompts and knowledge inputs for AI workflows.",
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
        "Workspace for planning, drafting, and publishing content across multiple platforms.",
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
        "Generate artwork with AI and have it produced and shipped as framed wall art.",
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
        "Local-first writing environment for long-form AI-assisted work.",
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
        "A social simulation platform powered by autonomous AI personas.",
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
        "Private desktop AI environment focused on local inference and multi-agent workflows.",
      used: ["Rust"],
      variant: "app",
      link: [],
    },
    {
      name: "ui",
      logo: {
        primary: "/branding/brianrabil-ui-logo-dark.svg",
        light: "/branding/brianrabil-ui-logo-dark.svg",
        dark: "/branding/brianrabil-ui-logo-light.svg",
      },
      status: "building",
      used: ["Next.js"],
      variant: "directory",
      description:
        "A curated registry of UI components, blocks, tools, and MCP servers for design engineers.",
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
        "Local video clipping tool with on-device transcription and fast editing.",
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
        "AI-assisted media manager with intelligent search and a streaming-style browsing interface.",
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
        "A Chrome extension designed to create a calmer, more structured timeline experience on X.",
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
        "A system for running large-scale AI persona simulations used to test social product ideas and interaction models.",
      used: ["Oasis"],
      link: [],
      variant: "package",
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
