import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import {
	FIND_FILENAME,
	type FindFrontmatter,
	findFrontmatterSchema,
} from "@/lib/finds-schema";
import { parse } from "yaml";

const FINDS_DIR = path.join(process.cwd(), "content", "finds");

export type Find = FindFrontmatter & { slug: string; body: string };

function splitFrontmatter(source: string, file: string) {
	const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!match) throw new Error(`${file}: missing YAML frontmatter`);
	return { data: parse(match[1]) as unknown, body: match[2].trim() };
}

/**
 * Every find, newest first. Throws on any invalid file so a bad entry fails
 * the build instead of shipping; Vercel keeps the last good deployment.
 */
export async function getAllFinds(): Promise<Find[]> {
	let files: string[];
	try {
		files = await readdir(FINDS_DIR);
	} catch {
		return [];
	}

	const finds = await Promise.all(
		files
			.filter((file) => file.endsWith(".md"))
			.map(async (file) => {
				const name = FIND_FILENAME.exec(file);
				if (!name) throw new Error(`${file}: name must be YYYY-MM-DD-slug.md`);
				const { data, body } = splitFrontmatter(
					await readFile(path.join(FINDS_DIR, file), "utf8"),
					file,
				);
				const parsed = findFrontmatterSchema.safeParse(data);
				if (!parsed.success) {
					throw new Error(
						`${file}: ${parsed.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`,
					);
				}
				if (parsed.data.date !== name[1]) {
					throw new Error(
						`${file}: frontmatter date ${parsed.data.date} does not match the file name`,
					);
				}
				if (body.length === 0) throw new Error(`${file}: body is empty`);
				return { ...parsed.data, slug: name[2], body };
			}),
	);

	const seen = new Map<string, string>();
	for (const find of finds) {
		const previous = seen.get(find.slug);
		if (previous)
			throw new Error(`Duplicate find slug "${find.slug}" (${previous})`);
		seen.set(find.slug, find.date);
	}

	return finds.sort(
		(a, z) => z.date.localeCompare(a.date) || a.title.localeCompare(z.title),
	);
}

export async function getFind(slug: string) {
	return (await getAllFinds()).find((find) => find.slug === slug);
}
