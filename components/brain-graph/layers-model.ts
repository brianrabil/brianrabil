// Brain's layered view model, ported from agent-memory
// packages/brain-ui/src/graph/graph-model.ts (strata, plates, buildLayers).
// Changes for the product card: the snapshot type is declared here instead of
// coming from BrainClient, projects and users sit on the source floor, each
// source kind keeps a wedge of the floor, the busiest record of each kind is
// a hub that carries the kind's label, and the live-update ripple diff is gone
// (the card shows one fixed snapshot; the renderer schedules its own pulses).

/** One record of a TypeGraph snapshot (`brain.graph.snapshot`). */
export type GraphNode = {
	kind: string;
	id: string;
	properties: Record<string, unknown>;
};

/** One link of a TypeGraph snapshot. */
export type GraphEdge = {
	kind: string;
	id: string;
	from: { kind: string; id: string };
	to: { kind: string; id: string };
	properties: Record<string, unknown>;
};

export type GraphData = { nodes: GraphNode[]; edges: GraphEdge[] };

/** Everything the GPU needs for the layered view. Indexes refer to `points`. */
export type LayerBuffers = {
	count: number;
	/** x, y, z, size in pixels per node. */
	points: Float32Array<ArrayBuffer>;
	/** stratum, hub flag, arrival time, time a pulse reaches it. */
	marks: Float32Array<ArrayBuffer>;
	/** Pairs of node indexes, lower stratum first. */
	edges: Uint32Array<ArrayBuffer>;
	/** Pulse start time and climb duration per edge. */
	pulses: Float32Array<ArrayBuffer>;
};

/**
 * Brain's strata, bottom to top: where knowledge comes from, the memories,
 * the entities they mention, and the rules and tags above them. Kinds missing
 * here are bookkeeping and stay out of the layered view.
 */
export const strata: Readonly<Record<string, number>> = {
	Document: 0,
	Chunk: 0,
	File: 0,
	Image: 0,
	Session: 0,
	Turn: 0,
	Message: 0,
	Project: 0,
	User: 0,
	Memory: 1,
	Entity: 2,
	Tag: 3,
	Rule: 3,
};

/**
 * One elliptical plate per stratum: half-widths along x and z, and height.
 * Wider than Brain's own plates, so the stack fills a wide, short card.
 */
export const plates = [
	[3.7, 1.05, 0],
	[3.25, 0.92, 0.72],
	[2.75, 0.8, 1.46],
	[2.1, 0.64, 2.12],
] as const;

/** Labels per kind, in the order they win when two collide. */
export const kindLabels: Readonly<Record<string, string>> = {
	Memory: "MEMORIES",
	Entity: "ENTITIES",
	Rule: "RULES",
	Session: "SESSIONS",
	Document: "DOCUMENTS",
	Project: "PROJECTS",
	User: "USERS",
	Image: "IMAGES",
};

// Source kinds share the floor in wedges, in this order around the plate.
const floorKinds = ["Session", "Document", "Image", "User", "Project"];

// Hubs on the upper plates sit where their labels stay apart: angle (in
// turns) and radius as a fraction of the plate.
const hubPlaces: Readonly<Record<string, readonly [number, number]>> = {
	Memory: [0.47, 0.72],
	Entity: [0.06, 0.55],
	Rule: [0.3, 0.25],
};

// Parts sit beside the source they belong to.
const parents: Readonly<Record<string, string>> = {
	Chunk: "Document",
	Turn: "Session",
	Message: "Session",
};

const entityTypes = [
	"person",
	"organization",
	"location",
	"concept",
	"product",
	"event",
];

function text(value: unknown) {
	return typeof value === "string" ? value : "";
}

// FNV-1a, so a record keeps its place on its plate across every update.
function hash(value: string, seed: number) {
	let h = seed;
	for (let i = 0; i < value.length; i++) {
		h = Math.imul(h ^ value.charCodeAt(i), 16777619);
	}
	return (h >>> 0) / 4294967296;
}

export type LayerLabel = { index: number; text: string };

export type LayerLayout = {
	nodes: GraphNode[];
	/** Upper node index to the indexes of edges that end at it. */
	incoming: number[][];
	/** Lower node index to the indexes of edges that start at it. */
	outgoing: number[][];
	labels: LayerLabel[];
	buffers: LayerBuffers;
};

/**
 * Places every record on its stratum's plate and orders each link from its
 * lower node to its upper one. A record's place depends only on its id (and
 * its source, for parts), so the layout is the same on every load.
 */
export function buildLayers(data: GraphData): LayerLayout {
	const nodes = data.nodes.filter((node) => strata[node.kind] !== undefined);
	const index = new Map(nodes.map((node, i) => [node.id, i]));
	const pairs: number[] = [];
	const seen = new Set<string>();
	const degree = new Array<number>(nodes.length).fill(0);
	const parentOf = new Array<number>(nodes.length).fill(-1);
	for (const edge of data.edges) {
		const a = index.get(edge.from.id);
		const b = index.get(edge.to.id);
		if (a === undefined || b === undefined || a === b) continue;
		const nodeA = nodes[a];
		const nodeB = nodes[b];
		if (!nodeA || !nodeB) continue;
		if (parents[nodeA.kind] === nodeB.kind) parentOf[a] = b;
		if (parents[nodeB.kind] === nodeA.kind) parentOf[b] = a;
		const lowA = (strata[nodeA.kind] ?? 0) <= (strata[nodeB.kind] ?? 0);
		const lower = lowA ? a : b;
		const upper = lowA ? b : a;
		const key = `${nodes[lower]?.id}>${nodes[upper]?.id}`;
		if (seen.has(key)) continue;
		seen.add(key);
		pairs.push(lower, upper);
		degree[a] = (degree[a] ?? 0) + 1;
		degree[b] = (degree[b] ?? 0) + 1;
	}

	// The busiest record of each labelled kind is its hub.
	const hubs = new Map<string, number>();
	nodes.forEach((node, i) => {
		if (!kindLabels[node.kind]) return;
		const best = hubs.get(node.kind);
		if (best === undefined || (degree[i] ?? 0) > (degree[best] ?? 0))
			hubs.set(node.kind, i);
	});
	const isHub = new Set(hubs.values());

	const count = nodes.length;
	const points = new Float32Array(count * 4);
	const marks = new Float32Array(count * 4);
	const place = (i: number) => {
		const node = nodes[i];
		if (!node) return;
		const stratum = strata[node.kind] ?? 0;
		const [rx, rz, y] = plates[stratum] ?? plates[0];
		const u = hash(node.id, 2166136261);
		const v = hash(node.id, 374761393);
		let angle = u * Math.PI * 2;
		let radius = Math.sqrt(v);
		const wedge = floorKinds.indexOf(node.kind);
		if (wedge >= 0) {
			// Each source kind keeps a wedge of the floor.
			angle = ((wedge + 0.1 + u * 0.8) / floorKinds.length) * Math.PI * 2;
			radius = 0.25 + 0.7 * Math.sqrt(v);
			if (isHub.has(i)) {
				angle = ((wedge + 0.5) / floorKinds.length) * Math.PI * 2;
				radius = 0.62;
			}
		}
		if (node.kind === "Entity") {
			// Each entity type keeps a wedge of the plate.
			const type = entityTypes.indexOf(text(node.properties.type));
			angle = ((Math.max(type, 0) + 0.08 + u * 0.84) / 6) * Math.PI * 2;
			radius = 0.2 + 0.8 * Math.sqrt(v);
		}
		if (node.kind === "Rule") radius = 0.42 * Math.sqrt(v);
		if (node.kind === "Tag") radius = 0.5 + 0.5 * Math.sqrt(v);
		const fixed = isHub.has(i) ? hubPlaces[node.kind] : undefined;
		if (fixed) {
			angle = fixed[0] * Math.PI * 2;
			radius = fixed[1];
		}
		points[i * 4] = Math.cos(angle) * radius * rx;
		points[i * 4 + 1] = y;
		points[i * 4 + 2] = Math.sin(angle) * radius * rz;
		const parent = parentOf[i] ?? -1;
		if (parent >= 0) {
			const spread = 0.025 + 0.06 * v;
			points[i * 4] = (points[parent * 4] ?? 0) + Math.cos(angle) * spread;
			points[i * 4 + 2] =
				(points[parent * 4 + 2] ?? 0) + Math.sin(angle) * spread;
		}
		const base = [1.15, 0.95, 1.1, 1.15][stratum] ?? 1;
		points[i * 4 + 3] = Math.min(base + 0.3 * Math.sqrt(degree[i] ?? 0), 3);
		marks[i * 4] = stratum;
		marks[i * 4 + 1] = isHub.has(i) ? 1 : 0;
		marks[i * 4 + 2] = -100;
		marks[i * 4 + 3] = -100;
	};
	// Sources first, so parts can sit beside them.
	nodes.forEach((_node, i) => {
		if ((parentOf[i] ?? -1) < 0) place(i);
	});
	nodes.forEach((_node, i) => {
		if ((parentOf[i] ?? -1) >= 0) place(i);
	});

	const incoming = nodes.map((): number[] => []);
	const outgoing = nodes.map((): number[] => []);
	for (let e = 0; e < pairs.length / 2; e++) {
		outgoing[pairs[e * 2] ?? 0]?.push(e);
		incoming[pairs[e * 2 + 1] ?? 0]?.push(e);
	}

	const labels = Object.keys(kindLabels).flatMap((kind) => {
		const hub = hubs.get(kind);
		const label = kindLabels[kind];
		return hub === undefined || !label ? [] : [{ index: hub, text: label }];
	});

	return {
		nodes,
		incoming,
		outgoing,
		labels,
		buffers: {
			count,
			points,
			marks,
			edges: Uint32Array.from(pairs),
			pulses: new Float32Array(pairs.length).fill(-100),
		},
	};
}
