import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypePrism from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";

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
