import {
	BRAND_RULES_FILE,
	VOICE_RULES_FILE,
	findUrl,
	getArchive,
	getProducts,
	getSkills,
	getStack,
	siteUrl,
	toProductRecord,
} from "@/lib/agent-index";
import { appConfig } from "@/lib/app-config";
import { getAllFinds } from "@/lib/finds";

export const dynamic = "force-static";

const REPO = "https://github.com/brianrabil/brianrabil/blob/main";

function link(title: string, url: string, note: string) {
	return `- [${title}](${url}): ${note}`;
}

function section(title: string, lines: string[]) {
	return [`## ${title}`, "", ...lines].join("\n");
}

export async function GET() {
	const site = siteUrl();
	const finds = await getAllFinds();

	const products = getProducts().map((product) => {
		const record = toProductRecord(product);
		const status = record.description
			.toLowerCase()
			.includes(record.statusLabel.toLowerCase())
			? ""
			: ` ${record.statusLabel}.`;
		return link(
			record.name,
			record.url,
			`${record.description} ${record.categoryLabel}.${status}`,
		);
	});

	const stack = getStack().map((entry) =>
		link(
			entry.name,
			entry.url,
			entry.usedBy.length > 0
				? `${entry.role} Used by ${entry.usedBy.join(", ")}.`
				: entry.role,
		),
	);

	const skills = getSkills().map((skill) =>
		link(
			skill.name,
			skill.url,
			`${skill.description}. Install with \`${skill.install}\`.`,
		),
	);

	const findLines = finds.map((find) =>
		link(find.title, findUrl(find), `${find.summary} Source: ${find.url}`),
	);

	const archive = getArchive().map((entry) =>
		link(
			entry.name,
			entry.url,
			`${entry.description} ${entry.groupLabel}, ${entry.years}.`,
		),
	);

	const body = [
		`# ${appConfig.title}`,
		"",
		"> AI software products built and owned by Brian Rabil, the tools they use, and his published agent skills.",
		"",
		`This file is generated from the site's data. The same data is available as tools from the read-only MCP server at ${site}/mcp.`,
		"",
		section("Products", [
			link("Products", `${site}/#fleet`, "The product list on the home page."),
			...products,
		]),
		"",
		section("Stack", [
			link(
				"Stack",
				`${site}/stack`,
				"Tools and libraries used across the products.",
			),
			...stack,
		]),
		"",
		section("Skills", [
			link(
				"Skills",
				`${site}/skills`,
				"Agent skills published by Brian Rabil.",
			),
			...skills,
		]),
		"",
		section("Finds", [
			link(
				"Finds",
				`${site}/finds`,
				"Open-source projects, each with a short write-up and a link to its source.",
			),
			link("RSS feed", `${site}/feed.xml`, "Finds and articles as RSS."),
			...findLines,
		]),
		"",
		section("Archive", [
			link(
				"Archive",
				`${site}/archive`,
				"Paused, stopped, and earlier projects.",
			),
			...archive,
		]),
		"",
		section("Brand", [
			link(
				"Brand",
				`${site}/brand`,
				"Logos, colors, and type for the products and this site.",
			),
			link(
				"Brand rules",
				`${REPO}/${BRAND_RULES_FILE}`,
				"Identity, voice, colors, type, logos, and statuses for this site and its products. The MCP tool get_brand_rules returns the same file.",
			),
			link(
				"Voice rules",
				`${REPO}/${VOICE_RULES_FILE}`,
				"The plain-voice skill: banned copy shapes and the rewrite procedure. The MCP tool get_voice_rules returns the same file.",
			),
			link(
				"MCP server",
				`${site}/mcp`,
				"Read-only MCP server over Streamable HTTP with tools for products, stack, skills, finds, search, and these rules.",
			),
			link(
				"MCP client config",
				`${site}/mcp.json`,
				"JSON to paste into an MCP client config.",
			),
		]),
		"",
	].join("\n");

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
}
