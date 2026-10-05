/// <reference types="@webgpu/types" />

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_SITE_URL: string;
		}
	}
}

export {};
