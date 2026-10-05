import { defineEvalConfig } from "eve/evals";

// Evals never commit: publish_find returns the rendered file instead.
process.env.FINDS_DRY_RUN = "1";

export default defineEvalConfig({
	timeoutMs: 10 * 60 * 1000,
});
