declare module "*.json" {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const value: any;
	export default value;
}

namespace NodeJS {
	interface ProcessEnv {
		BROWSERBASE_API_KEY: string;
		BROWSERBASE_PROJECT_ID: string;
		OPENAI_API_KEY: string;
		BROWSERLESS_WS_ENDPOINT: string;
		BROWSERLESS_TOKEN: string;

		X_DOT_COM_USERNAME: string;
		X_DOT_COM_PASSWORD: string;
	}
}
