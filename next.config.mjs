// @ts-check
import createMDX from "@next/mdx";

/** @type {import("next").NextConfig} */
const nextConfig = {
	output: "standalone",
	experimental: {
		typedRoutes: true,
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
