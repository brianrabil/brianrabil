import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import withLlamaIndex from "llamaindex/next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ hostname: "placehold.co/**" }],
		dangerouslyAllowSVG: true,
	},
};

const withMDX = createMDX({
	// Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withLlamaIndex(withMDX(nextConfig));
