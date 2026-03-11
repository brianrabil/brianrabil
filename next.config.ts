import createMDX from "@next/mdx";
import type { NextConfig } from "next";
// @ts-expect-error -- no type declarations for this package
import rehypePrism from "@mapbox/rehype-prism";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		dangerouslyAllowSVG: true,
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
