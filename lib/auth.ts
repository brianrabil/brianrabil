import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import Database from "better-sqlite3";

export const auth = betterAuth({
	database: new Database("./sqlite.db"),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [admin()],
	trustedOrigins: [
		process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
	],
});
