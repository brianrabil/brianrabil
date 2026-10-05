import type { GraphData, GraphEdge, GraphNode } from "./layers-model";

// An illustrative snapshot shaped like Brain's TypeGraph export: core kinds
// from packages/core/src/graph.ts plus documents from the documents plugin.
// Generated from a fixed seed, so the server and every reload draw the same
// graph. Not real usage. Links from sources to memories and from rules to
// projects stand in for provenance the core graph does not store yet.

// Mulberry32: small, fast, and deterministic.
function prng(seed: number) {
	let state = seed >>> 0;
	return () => {
		state = (state + 0x6d2b79f5) >>> 0;
		let t = state;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const entityTypes = [
	"person",
	"organization",
	"location",
	"concept",
	"product",
	"event",
] as const;

function build(): GraphData {
	const random = prng(0x5eed);
	const nodes: GraphNode[] = [];
	const edges: GraphEdge[] = [];
	const ids: Record<string, string[]> = {};
	const kindOf = new Map<string, string>();

	const node = (kind: string, properties: Record<string, unknown> = {}) => {
		const list = ids[kind] ?? [];
		ids[kind] = list;
		// Random-looking ids, like TypeGraph's, so the layout hash spreads them.
		const id = `${kind.toLowerCase()}_${Math.floor(random() * 2 ** 32)
			.toString(16)
			.padStart(8, "0")}${list.length.toString(16)}`;
		list.push(id);
		kindOf.set(id, kind);
		nodes.push({ kind, id, properties });
		return id;
	};
	const link = (kind: string, from: string, to: string) => {
		edges.push({
			kind,
			id: `${from}-${kind}-${to}`,
			from: { kind: kindOf.get(from) ?? "", id: from },
			to: { kind: kindOf.get(to) ?? "", id: to },
			properties: {},
		});
	};
	// Skewed toward the first records, so a few become busy hubs.
	const pick = (kind: string, skew = 2) => {
		const list = ids[kind] ?? [];
		return list[Math.floor(list.length * random() ** skew)] ?? "";
	};

	for (let i = 0; i < 6; i++) node("User", { role: "member" });
	for (let i = 0; i < 9; i++) node("Project", { status: "active" });
	for (let i = 0; i < 58; i++) {
		const session = node("Session");
		link("inProject", session, pick("Project", 1.6));
	}
	for (let i = 0; i < 38; i++) node("Document");
	for (let i = 0; i < 16; i++) node("Image");

	for (let i = 0; i < 84; i++) {
		const type = entityTypes[Math.floor(random() * entityTypes.length)];
		node("Entity", { type });
	}
	for (let i = 0; i < 22; i++) {
		const from = pick("Entity", 1.4);
		const to = pick("Entity", 1.4);
		if (from !== to) link("relatesTo", from, to);
	}
	for (let i = 0; i < 18; i++) node("Tag");
	for (let i = 0; i < 16; i++) {
		const rule = node("Rule", { activation: "path" });
		link("appliesTo", rule, pick("Project", 1.3));
		if (random() < 0.4) link("appliesTo", rule, pick("Project", 1.3));
	}

	for (let i = 0; i < 230; i++) {
		const memory = node("Memory");
		const source = random();
		if (source < 0.62) link("capturedFrom", memory, pick("Session", 1.5));
		else if (source < 0.9) link("capturedFrom", memory, pick("Document", 1.5));
		else link("capturedFrom", memory, pick("Image", 1.2));
		if (random() < 0.22) link("statedBy", memory, pick("User", 1.8));
		const mentions = 1 + Math.floor(random() * 3);
		for (let m = 0; m < mentions; m++)
			link("mentions", memory, pick("Entity", 2.4));
		if (random() < 0.3) link("taggedWith", memory, pick("Tag", 1.8));
	}

	return { nodes, edges };
}

export const demoSnapshot: GraphData = build();
