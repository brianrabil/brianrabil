import { defineAgent } from "eve";

/** AI Gateway model id. Switching models (for example to a Grok model) is this one line. */
export const MODEL = "anthropic/claude-sonnet-5.5";

export default defineAgent({
	model: MODEL,
	reasoning: "medium",
	// No sandbox, shell, or file tools. The agent reads the web and publishes
	// through the typed tools in tools/ only.
	defaultTools: false,
	limits: {
		maxTokenCostUsdPerSession: 3,
		sessionTimeoutMs: 2 * 60 * 60 * 1000,
	},
});
