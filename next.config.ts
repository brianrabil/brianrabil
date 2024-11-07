import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [{ hostname: "placehold.co/**" }],
		dangerouslyAllowSVG: true,
	},
};

const withMDX = createMDX({
	// Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
