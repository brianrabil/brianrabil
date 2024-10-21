import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [{ hostname: "placehold.co/**" }],
		dangerouslyAllowSVG: true,
	},
	webpack: (config) => {
		config.externals.push("bun:sqlite");
		return config;
	},
};

const withMDX = createMDX({
	// Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
