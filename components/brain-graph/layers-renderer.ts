import type { Draw, Frame, Gpu, StorageBuffer, Surface } from "vgpu";
import { draw, storage, surface } from "vgpu";
import { type PerspectiveCamera, perspectiveCamera } from "vgpu/scene";
import type { LayerBuffers, LayerLayout } from "./layers-model";
import {
	layerEdgeShader,
	layerNodeShader,
	plateShader,
} from "./layers-shaders";

// The layered half of Brain's GraphRenderer (agent-memory
// packages/brain-ui/src/graph/graph-renderer.ts), ported to the site's shared
// vgpu device. Changes: no device or frame loop of its own (the caller paints
// it inside the shared loop), no orbit controls (the camera drifts on its own
// and leans toward the pointer), the view is framed for a wide card, and the
// graph evolves: new memories are written as pulses climb the stack, the
// oldest are superseded and fade, and entities move within their clusters.

// @link https://vgpu.sh/docs/reference/vgpu/draw
// @link https://vgpu.sh/docs/concepts/frames
// @link https://vgpu.sh/docs/reference/vgpu-scene/camera

type Rgba = readonly [number, number, number, number];

// The camera circles the middle of the stack.
const pivot = [0, 0.94, 0] as const;
// Half the stack's height and width with a margin, in world units.
const reach = { height: 1.66, width: 4.1 } as const;
const fov = 34;
// Seconds per stratum a pulse takes to climb.
const climbRate = 0.7;
// Seconds between arriving memories.
const arrivalEvery = 2.4;
// One memory in this many starts unwritten, so new ones keep appearing.
const unwrittenEvery = 8;
// Every this many arrivals, an entity moves to a new place in its cluster.
const restructureEvery = 3;
// Seconds a moving entity takes to settle.
const moveFor = 2.6;
// Arrival marks the shaders read: superseded at t is 1e5 + t; unwritten is 1e8+.
const superseded = 1e5;
const unwritten = 1e9;

type Destroyable = StorageBuffer & { destroy?: () => void };

export class LayersRenderer {
	private target: Surface;
	private camera: PerspectiveCamera;
	private plateDraw: Draw;
	private edgeDraw: Draw;
	private nodeDraw: Draw;
	private buffers: Destroyable[] = [];
	private plateBuffer: Destroyable | undefined;
	private pulseBuffer: Destroyable | undefined;
	private markBuffer: Destroyable | undefined;
	private pointBuffer: Destroyable | undefined;
	/** Memories not written yet, oldest first; and written ones, oldest first. */
	private unwrittenMemories: number[] = [];
	private writtenMemories: number[] = [];
	private entities: number[] = [];
	private moves: {
		node: number;
		from: number[];
		to: number[];
		start: number;
	}[] = [];
	private layout: LayerLayout | undefined;
	private memories: number[] = [];
	private nextArrival = 1.2;
	private arrivals = 0;
	private viewProjection = new Float32Array(16);
	private distance = 4;
	private lean = { x: 0, y: 0 };

	time = 0;
	/** Off for a still frame: no drift, no pulses. */
	motion = true;
	ink: Rgba = [0.93, 0.93, 0.93, 1];
	/** Pointer position over the card, -1 to 1 on each axis, or null. */
	pointer: { x: number; y: number } | null = null;

	constructor(
		private gpu: Gpu,
		canvas: HTMLCanvasElement,
	) {
		this.target = surface(gpu, canvas, {
			dpr: [1, 2],
			alphaMode: "premultiplied",
			clearColor: [0, 0, 0, 0],
			label: "brain-layers",
		});
		this.camera = perspectiveCamera({
			fov,
			near: 0.1,
			far: 40,
			position: [0, pivot[1], 4],
			target: [...pivot],
		});
		this.plateDraw = draw(gpu, {
			shader: plateShader,
			label: "brain-layers-plates",
			vertices: 6,
			blend: "premultiplied",
		});
		this.edgeDraw = draw(gpu, {
			shader: layerEdgeShader,
			label: "brain-layers-edges",
			vertices: 6,
			blend: "premultiplied",
		});
		this.nodeDraw = draw(gpu, {
			shader: layerNodeShader,
			label: "brain-layers-nodes",
			vertices: 6,
			blend: "premultiplied",
		});
	}

	get disposed() {
		return this.target.disposed;
	}

	/** Compiles every pipeline for the canvas format before the first frame. */
	async compile() {
		// Surfaces exist only inside a frame, so compile against their signature.
		const signature = { colors: [this.target.format], sampleCount: 1 as const };
		await Promise.all([
			this.plateDraw.compile(signature),
			this.edgeDraw.compile(signature),
			this.nodeDraw.compile(signature),
		]);
	}

	private buffer(bytes: number) {
		const created: Destroyable = storage(this.gpu, Math.max(bytes, 16), "read");
		this.buffers.push(created);
		return created;
	}

	/** Uploads the layered view's records and links. */
	setLayers(layout: LayerLayout, plates: readonly (readonly number[])[]) {
		const buffers: LayerBuffers = layout.buffers;
		this.layout = layout;
		this.memories = layout.nodes.flatMap((node, i) =>
			node.kind === "Memory" ? [i] : [],
		);
		// Some memories start unwritten; arrivals write them, and once none are
		// left the oldest written one is superseded to make room.
		this.unwrittenMemories = this.memories.filter(
			(node, i) =>
				i % unwrittenEvery === 3 && buffers.marks[node * 4 + 1] === 0,
		);
		for (const node of this.unwrittenMemories)
			buffers.marks[node * 4 + 2] = unwritten;
		this.writtenMemories = [];
		// Entities that can move: not hubs, since hubs carry labels.
		this.entities = layout.nodes.flatMap((node, i) =>
			node.kind === "Entity" && buffers.marks[i * 4 + 1] === 0 ? [i] : [],
		);
		this.plateBuffer = this.buffer(16 * plates.length);
		this.plateBuffer.write(Float32Array.from(plates.flatMap((p) => [...p, 0])));
		const pointBuffer = this.buffer(buffers.points.byteLength);
		pointBuffer.write(buffers.points);
		this.pointBuffer = pointBuffer;
		this.markBuffer = this.buffer(buffers.marks.byteLength);
		this.markBuffer.write(buffers.marks);
		const edgeBuffer = this.buffer(buffers.edges.byteLength);
		edgeBuffer.write(buffers.edges);
		this.pulseBuffer = this.buffer(buffers.pulses.byteLength);
		this.pulseBuffer.write(buffers.pulses);
		this.plateDraw.set({ plates: this.plateBuffer });
		this.edgeDraw.set({
			points: pointBuffer,
			marks: this.markBuffer,
			edges: edgeBuffer,
			pulses: this.pulseBuffer,
		});
		this.nodeDraw.set({ points: pointBuffer, marks: this.markBuffer });
	}

	/** Where a point of the layered view lands on screen, in CSS pixels. */
	project(x: number, y: number, z: number): [number, number] {
		const m = this.viewProjection;
		const [width, height] = this.target.size;
		const dpr = this.target.dpr;
		const cx =
			(m[0] ?? 0) * x + (m[4] ?? 0) * y + (m[8] ?? 0) * z + (m[12] ?? 0);
		const cy =
			(m[1] ?? 0) * x + (m[5] ?? 0) * y + (m[9] ?? 0) * z + (m[13] ?? 0);
		const cw =
			(m[3] ?? 0) * x + (m[7] ?? 0) * y + (m[11] ?? 0) * z + (m[15] ?? 1);
		return [
			((cx / cw) * 0.5 + 0.5) * (width / dpr),
			(0.5 - (cy / cw) * 0.5) * (height / dpr),
		];
	}

	/**
	 * One frame. The camera drifts slowly around the front of the stack and
	 * leans toward the pointer; `dt` is 0 for a still frame.
	 */
	paint(frame: Frame, dt: number) {
		if (this.target.disposed || !this.layout) return;
		this.time += dt;
		const [width, height] = this.target.size;
		const aspect = width / Math.max(height, 1);
		const tanHalf = Math.tan((fov * Math.PI) / 360);
		this.distance = Math.max(
			reach.height / tanHalf,
			reach.width / (tanHalf * aspect),
		);

		const ease = Math.min(dt * 3, 1);
		const goal = this.pointer ?? { x: 0, y: 0 };
		this.lean.x += (goal.x - this.lean.x) * ease;
		this.lean.y += (goal.y - this.lean.y) * ease;
		const drift = this.motion ? this.time : 0;
		const yaw =
			-0.2 + 0.26 * Math.sin((drift * Math.PI * 2) / 70) + this.lean.x * 0.08;
		const pitch =
			0.3 + 0.04 * Math.sin((drift * Math.PI * 2) / 53) - this.lean.y * 0.04;
		this.camera.set({
			aspect,
			position: [
				pivot[0] + this.distance * Math.sin(yaw) * Math.cos(pitch),
				pivot[1] + this.distance * Math.sin(pitch),
				pivot[2] + this.distance * Math.cos(yaw) * Math.cos(pitch),
			],
		});
		this.camera.lookAt([...pivot]);

		// Wide cards push the stack right, clear of the product name; narrow
		// cards push it down, below the name.
		const shiftX = Math.min(Math.max((aspect - 1.8) * 0.06, 0), 0.2);
		const shiftY = aspect < 1.8 ? -0.32 : 0;
		const source = this.camera.viewProjection;
		for (let column = 0; column < 4; column++) {
			const w = source[column * 4 + 3] ?? 0;
			this.viewProjection[column * 4] = (source[column * 4] ?? 0) + shiftX * w;
			this.viewProjection[column * 4 + 1] =
				(source[column * 4 + 1] ?? 0) + shiftY * w;
			this.viewProjection[column * 4 + 2] = source[column * 4 + 2] ?? 0;
			this.viewProjection[column * 4 + 3] = w;
		}

		if (this.motion) {
			this.arrive();
			this.restructure();
		}

		const values = {
			viewProjection: this.viewProjection,
			viewport: [width, height],
			dpr: this.target.dpr,
			time: this.time,
			distance: this.distance,
			motion: this.motion ? 1 : 0,
			ink: this.ink,
		};
		this.plateDraw.set({ camera: values });
		this.edgeDraw.set({ camera: values });
		this.nodeDraw.set({ camera: values });
		const layout = this.layout;
		const edgeCount = layout.buffers.edges.length / 2;
		frame.pass(this.target, (pass) => {
			if (layout.buffers.count === 0) return;
			pass.draw(this.plateDraw, { instances: 4 });
			if (edgeCount > 0) pass.draw(this.edgeDraw, { instances: edgeCount });
			pass.draw(this.nodeDraw, { instances: layout.buffers.count });
		});
	}

	/**
	 * Every few seconds a memory arrives: a pulse climbs from its source to it,
	 * then on to the entities and tags it links, and each node flares as the
	 * pulse reaches it.
	 */
	private arrive() {
		const layout = this.layout;
		if (!layout || this.time < this.nextArrival || !this.memories.length)
			return;
		this.nextArrival = this.time + arrivalEvery;
		this.arrivals += 1;
		const { pulses, marks, edges } = layout.buffers;
		// Write a new memory. Keep one memory unwritten in reserve: when the pool is
		// down to it, supersede the oldest written one first (it fades out and
		// waits at the back of the queue), then write the next in line.
		if (this.unwrittenMemories.length < 2) {
			const oldest = this.writtenMemories.shift();
			if (oldest !== undefined) {
				marks[oldest * 4 + 2] = superseded + this.time;
				this.unwrittenMemories.push(oldest);
			}
		}
		const fresh =
			this.unwrittenMemories.length >= 2
				? this.unwrittenMemories.shift()
				: undefined;
		if (fresh !== undefined) this.writtenMemories.push(fresh);
		// A fixed stride through the memories when nothing new is left to write.
		const memory =
			fresh ?? this.memories[(this.arrivals * 97) % this.memories.length] ?? 0;
		if (this.arrivals % restructureEvery === 0) this.startMove();
		const stratum = (node: number) => marks[node * 4] ?? 0;
		const climb = (edge: number) => {
			const lower = edges[edge * 2] ?? 0;
			const upper = edges[edge * 2 + 1] ?? 0;
			return climbRate * Math.max(stratum(upper) - stratum(lower), 0.75);
		};
		const start = this.time + 0.1;
		let reached = start;
		for (const edge of layout.incoming[memory] ?? []) {
			pulses[edge * 2] = start;
			pulses[edge * 2 + 1] = climb(edge);
			reached = Math.max(reached, start + climb(edge));
		}
		marks[memory * 4 + 3] = reached;
		if (fresh !== undefined) marks[memory * 4 + 2] = reached - 0.2;
		for (const edge of layout.outgoing[memory] ?? []) {
			const upper = edges[edge * 2 + 1] ?? 0;
			pulses[edge * 2] = reached;
			pulses[edge * 2 + 1] = climb(edge);
			marks[upper * 4 + 3] = reached + climb(edge);
		}
		this.pulseBuffer?.write(pulses);
		this.markBuffer?.write(marks);
	}

	/** Starts moving one entity to another place in its cluster. */
	private startMove() {
		const layout = this.layout;
		if (!layout || this.entities.length < 2) return;
		const points = layout.buffers.points;
		const pick = (salt: number) =>
			this.entities[(this.arrivals * salt) % this.entities.length] ?? 0;
		const node = pick(31);
		const near = pick(57);
		if (node === near || this.moves.some((move) => move.node === node)) return;
		const from = [
			points[node * 4] ?? 0,
			points[node * 4 + 1] ?? 0,
			points[node * 4 + 2] ?? 0,
		];
		// Land beside another entity, so the cluster keeps its shape.
		const to = [
			(points[near * 4] ?? 0) + 0.06,
			points[node * 4 + 1] ?? 0,
			(points[near * 4 + 2] ?? 0) - 0.04,
		];
		this.moves.push({ node, from, to, start: this.time });
	}

	/** Eases moving entities toward their new places; their links follow. */
	private restructure() {
		const layout = this.layout;
		if (!layout || !this.moves.length || !this.pointBuffer) return;
		const points = layout.buffers.points;
		this.moves = this.moves.filter((move) => {
			const t = Math.min((this.time - move.start) / moveFor, 1);
			const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
			for (let axis = 0; axis < 3; axis++) {
				const a = move.from[axis] ?? 0;
				const b = move.to[axis] ?? 0;
				points[move.node * 4 + axis] = a + (b - a) * eased;
			}
			return t < 1;
		});
		this.pointBuffer.write(points);
	}

	dispose() {
		for (const buffer of this.buffers) buffer.destroy?.();
		this.buffers = [];
		if (!this.target.disposed) this.target.dispose();
	}
}
