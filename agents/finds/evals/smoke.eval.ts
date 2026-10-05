import { defineEval } from "eve/evals";

export default defineEval({
	description: "Lists existing finds before doing anything else and finishes the turn.",
	async test(t) {
		await t.send("List the finds that are already published. Do not publish anything.");
		t.succeeded();
		t.calledTool("list_finds");
	},
});
