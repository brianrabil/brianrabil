import { FIND_FILENAME, findFrontmatterSchema } from "#lib/find-schema.js";
import {
	BRANCH,
	FINDS_PATH,
	REPO,
	gh,
	listFinds,
	normalizeTitle,
	normalizeUrl,
	todayUtc,
} from "#lib/github.js";
import { copyViolations, renderFind } from "#lib/render.js";
import { defineTool } from "eve/tools";
import { z } from "zod";

const AUTHOR = "finds-agent";
const DAILY_CAP = 3;

const isDryRun = () => process.env.FINDS_DRY_RUN === "1";

export default defineTool({
	description:
		"Validate one find and commit it to the website repository as content/finds/<today>-<slug>.md on main. Create-only. Rejects drafts that break the schema or the house copy rules and says what to fix. Skips duplicates and stops after 3 finds per day.",
	inputSchema: z.object({
		slug: z
			.string()
			.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
			.describe("Lowercase kebab-case, usually the project name."),
		frontmatter: findFrontmatterSchema.omit({ date: true, author: true }),
		body: z.string().min(200).max(4000).describe("Markdown body, without frontmatter."),
	}),
	// Scheduled runs (the app principal) publish unattended. A person calling
	// this tool through a channel must approve each commit. Dry runs never write.
	approval: ({ session }) => {
		if (isDryRun()) return "not-applicable";
		const auth = session.auth.current;
		return auth?.authenticator === "app" &&
			auth.principalId === "eve:app" &&
			auth.principalType === "runtime"
			? "not-applicable"
			: "user-approval";
	},
	async execute({ slug, frontmatter, body }, ctx) {
		const today = todayUtc();
		const parsed = findFrontmatterSchema.safeParse({ ...frontmatter, date: today, author: AUTHOR });
		if (!parsed.success) {
			return {
				status: "rejected",
				reasons: parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`),
			};
		}
		const violations = copyViolations(parsed.data, body);
		if (violations.length > 0) return { status: "rejected", reasons: violations };

		const file = `${today}-${slug}.md`;
		if (!FIND_FILENAME.test(file)) return { status: "rejected", reasons: [`Invalid file name ${file}`] };

		const existing = await listFinds(ctx.abortSignal);
		const duplicate = existing.find(
			(find) =>
				find.slug === slug ||
				normalizeUrl(find.url) === normalizeUrl(parsed.data.url) ||
				normalizeTitle(find.title) === normalizeTitle(parsed.data.title),
		);
		if (duplicate) {
			return { status: "skipped", reason: `Already published as ${duplicate.date}-${duplicate.slug}.md` };
		}
		if (existing.filter((find) => find.date === today).length >= DAILY_CAP) {
			return { status: "skipped", reason: `Daily cap of ${DAILY_CAP} finds reached` };
		}

		const content = renderFind(parsed.data, body);
		const path = `${FINDS_PATH}/${file}`;

		if (isDryRun()) return { status: "dry-run", path, content };

		if (!process.env.GITHUB_TOKEN) {
			throw new Error("GITHUB_TOKEN is not set; cannot commit the find.");
		}
		// No `sha` in the body makes this create-only: an existing path returns 422,
		// which also makes a replayed step a no-op.
		const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
			method: "PUT",
			headers: gh(),
			signal: ctx.abortSignal,
			body: JSON.stringify({
				message: `finds: add ${parsed.data.title}`,
				branch: BRANCH,
				content: Buffer.from(content, "utf8").toString("base64"),
			}),
		});
		if (response.status === 422) return { status: "skipped", reason: `${path} already exists` };
		if (!response.ok) throw new Error(`GitHub ${response.status}: ${await response.text()}`);
		const result = (await response.json()) as { commit: { sha: string; html_url: string } };
		return { status: "published", path, commit: result.commit.sha, url: result.commit.html_url };
	},
});
