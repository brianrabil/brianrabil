declare module "*.json" {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const value: any;
	export default value;
}

namespace NodeJS {
	interface ProcessEnv {
		readonly AUTH_ADMIN_DEFAULT_EMAIL: string;
		readonly AUTH_ADMIN_DEFAULT_NAME: string;
		readonly AUTH_ADMIN_DEFAULT_PASSWORD: string;
		readonly AUTH_SECRET: string;
		readonly NEXT_PUBLIC_VAPID_PUBLIC_KEY: string;
		readonly VAPID_PRIVATE_KEY: string;
		readonly DATABASE_URL: string;
	}
}
