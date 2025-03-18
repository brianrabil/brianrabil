import { Logo } from "@/components/logo";

export const appConfig = {
  title: "Brian Rabil – AI & Full-Stack Engineer",
  description:
    "Building innovative AI-driven solutions, full-stack applications, and scalable DevOps workflows.",
  fullName: "Brian Rabil",
  email: "brianrabil@gmail.com",
  location: "Dallas, TX",
  jobTitle: "Full Stack Developer & AI Engineer",
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
    { name: "DigitalOcean", logo: "/images/logos/digital-ocean-original.svg" },
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
      name: "jobhop.ai",
      logo: "/logos/jobhop-logo-light.svg",
      logoDark: "/logos/jobhop-logo-dark.svg",
      description:
        "JobHop.ai is an AI-native job search platform that uses smart agents to match you with job opportunities and fast-track interviews.",
      link: {
        href: "https://jobhop.ai",
        label: "jobhop.ai",
      },
    },
    {
      name: "hyperpost.ai",
      logo: "/logos/hyperpost-logo-light.png",
      logoDark: "/logos/hyperpost-logo-dark.svg",
      description:
        "Hyperpost.ai uses smart agents to efficiently create, curate, and schedule social media content automatically.",
      link: {
        href: "https://hyperpost.ai",
        label: "hyperpost.ai",
      },
    },
    {
      name: "rssx.ai",
      logo: "/logos/rssx-logo-light.svg",
      logoDark: "/logos/rssx-logo-dark.svg",
      description:
        "RSSX is an RSS reader that lets you create personalized feeds instantly by simply describing what you want—in plain language.",
      link: {
        href: "https://rssx.ai",
        label: "rssx.ai",
      },
    },
  ],
  workHistory: [
    {
      id: "0",
      title: "Independent Developer",
      company: "Self-Employed",
      logo: "/logos/zendrel.svg",
      start: "2025",
      end: "Present",
    },
    {
      id: "1",
      title: "Full-Stack Engineer, VP",
      company: "Goldman Sachs",
      logo: "/logos/goldman-sachs.jpeg",
      start: "2021",
      end: "2024",
    },
    {
      id: "2",
      title: "UX Architect & Full-Stack Engineer",
      company: "Schema Driven",
      logo: "/logos/schema-driven.jpeg",
      start: "2019",
      end: "2021",
    },
    {
      id: "3",
      title: "Front-End Engineer, Lead",
      company: "SAIC",
      logo: "/logos/saic.jpeg",
      start: "2017",
      end: "2019",
    },
    {
      id: "4",
      title: "Founder",
      company: "Smart Sale",
      logo: "/logos/smart-sale.jpeg",
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
