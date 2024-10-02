declare module "*.json" {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const value: any;
	export default value;
}
