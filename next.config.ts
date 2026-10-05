// @ts-expect-error -- no type declarations for this package
import rehypePrism from "@mapbox/rehype-prism";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		dangerouslyAllowSVG: true,
	},
	// Files the agent endpoints read at request time with fs.
	outputFileTracingIncludes: {
		"/mcp": [
			"./docs/brand.md",
			"./.claude/skills/plain-voice/SKILL.md",
			"./content/finds/*.md",
		],
		"/llms.txt": ["./content/finds/*.md"],
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeKatex, rehypePrism],
	},
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
