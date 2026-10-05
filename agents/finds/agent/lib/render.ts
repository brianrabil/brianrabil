import { stringify } from "yaml";
import type { FindFrontmatter } from "#lib/find-schema.js";

/**
 * The site parses frontmatter with `yaml` and validates `date` as a string, so
 * every scalar is double-quoted: an unquoted 2026-10-05 must never become a Date.
 */
export function renderFind(frontmatter: FindFrontmatter, body: string) {
	const yaml = stringify(frontmatter, {
		defaultStringType: "QUOTE_DOUBLE",
		defaultKeyType: "PLAIN",
		lineWidth: 0,
	});
	return `---\n${yaml}---\n\n${body.trim()}\n`;
}

const BANNED_WORDS = [
	"game-changer",
	"game changer",
	"gamechanger",
	"supercharge",
	"seamless",
	"seamlessly",
	"powerful",
	"revolutionize",
	"revolutionary",
	"unlock",
	"unleash",
	"blazing",
	"blazingly",
	"next-level",
	"cutting-edge",
];

/**
 * House copy rules the site owner enforces. Returns every violation so the
 * model can rewrite once instead of guessing.
 */
export function copyViolations(frontmatter: Pick<FindFrontmatter, "title" | "summary">, body: string) {
	const violations: string[] = [];
	const text = `${frontmatter.title}\n${frontmatter.summary}\n${body}`;
	const prose = text.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");

	for (const word of BANNED_WORDS) {
		if (new RegExp(`\\b${word.replace(/-/g, "[- ]?")}\\b`, "i").test(prose)) {
			violations.push(`Remove the word "${word}". Describe what the project does instead.`);
		}
	}
	if (/!(?!\[)/.test(prose.replace(/!=/g, ""))) {
		violations.push("Remove exclamation marks.");
	}
	if (/\?\s*$/m.test(prose)) {
		violations.push("Remove rhetorical questions; state facts.");
	}
	if (/\bnot (just )?an? [^.,;]+[,;:—–-]\s*(it'?s|but)\b/i.test(prose) || /, not [a-z]/i.test(prose)) {
		violations.push('Remove "X, not Y" / "not just X, but Y" constructions.');
	}
	if (frontmatter.summary.split(/(?<=[.])\s+/).filter(Boolean).length > 1) {
		violations.push("The summary must be one sentence.");
	}
	if (!/^## Things to know$/m.test(body)) {
		violations.push('The body needs a "## Things to know" section with 2–4 bullets.');
	}
	if (!/^## Try it$/m.test(body) || !/```/.test(body.split(/^## Try it$/m)[1] ?? "")) {
		violations.push('The body needs a "## Try it" section with the install or quick-start command in a code block.');
	}
	const sections = [...body.matchAll(/^## (.+)$/gm)].map((match) => match[1].trim());
	if (sections.join("|") !== "Things to know|Try it") {
		violations.push(
			`Use exactly two ## sections, in this order: "Things to know", then "Try it". Found: ${sections.map((s) => `"${s}"`).join(", ") || "none"}. Put everything else in the two opening paragraphs.`,
		);
	}
	if (/^# /m.test(body)) {
		violations.push("Do not use a top-level # heading in the body; the page renders the title.");
	}
	return violations;
}
