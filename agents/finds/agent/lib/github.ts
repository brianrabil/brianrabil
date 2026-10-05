import { parse } from "yaml";

export const REPO = "brianrabil/brianrabil";
export const BRANCH = "main";
export const FINDS_PATH = "content/finds";

/** GitHub REST headers. The token is optional for reads and required for writes. */
export function gh(): Record<string, string> {
	const headers: Record<string, string> = {
		Accept: "application/vnd.github+json",
		"X-GitHub-Api-Version": "2022-11-28",
		"User-Agent": "brianrabil-finds-agent",
	};
	const token = process.env.GITHUB_TOKEN;
	if (token) headers.Authorization = `Bearer ${token}`;
	return headers;
}

export type PublishedFind = {
	slug: string;
	date: string;
	title: string;
	url: string;
};

/** Lowercase, drop protocol, `www.`, `.git`, and trailing slashes. */
export function normalizeUrl(url: string) {
	return url
		.trim()
		.toLowerCase()
		.replace(/^https?:\/\//, "")
		.replace(/^www\./, "")
		.replace(/\.git$/, "")
		.replace(/\/+$/, "");
}

/** Lowercase letters and digits only, so "Vercel AI-SDK" matches "vercel ai sdk". */
export function normalizeTitle(title: string) {
	return title.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const FILE = /^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/;

/** Every find already on `main`, read from the repository so it includes today's commits. */
export async function listFinds(signal?: AbortSignal): Promise<PublishedFind[]> {
	const response = await fetch(
		`https://api.github.com/repos/${REPO}/contents/${FINDS_PATH}?ref=${BRANCH}`,
		{ headers: gh(), signal },
	);
	if (response.status === 404) return [];
	if (!response.ok) {
		throw new Error(`GitHub ${response.status} listing ${FINDS_PATH}: ${await response.text()}`);
	}
	const entries = (await response.json()) as { name: string; download_url: string | null }[];

	const finds = await Promise.all(
		entries.map(async (entry) => {
			const name = FILE.exec(entry.name);
			if (!name || !entry.download_url) return null;
			const raw = await fetch(entry.download_url, { headers: gh(), signal }).then((r) => r.text());
			const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
			const data = (frontmatter ? parse(frontmatter[1]) : {}) as { title?: string; url?: string };
			return { slug: name[2], date: name[1], title: data.title ?? name[2], url: data.url ?? "" };
		}),
	);

	return finds
		.filter((find): find is PublishedFind => find !== null)
		.sort((a, z) => z.date.localeCompare(a.date));
}

export function todayUtc() {
	return new Date().toISOString().slice(0, 10);
}

export function isoDaysAgo(days: number) {
	return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
