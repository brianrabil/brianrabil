// WGSL for Brain's layered view, ported from agent-memory
// packages/brain-ui/src/graph/graph-shaders.ts (plateShader, layerEdgeShader,
// layerNodeShader). Changes for the product card: sources draw as small
// squares, hub nodes draw a little larger, and points carry no halo.

const camera = /* wgsl */ `
struct Camera {
  viewProjection: mat4x4f,
  viewport: vec2f,
  dpr: f32,
  time: f32,
  distance: f32,
  motion: f32,
  ink: vec4f,
}

@group(0) @binding(0) var<uniform> camera: Camera;

// Brightness per stratum, bottom to top: sources recede, knowledge reads first.
const strataLight = array<f32, 4>(0.5, 0.62, 0.78, 1.0);

fn toDevice(clip: vec4f) -> vec2f {
  return clip.xy / clip.w * camera.viewport * 0.5;
}

fn fromDevice(device: vec2f, depth: f32) -> vec4f {
  return vec4f(device / (camera.viewport * 0.5), depth, 1.0);
}

// Farther from the camera reads dimmer, so the stack has depth without fog.
fn recede(w: f32) -> f32 {
  return clamp(1.0 - (w - camera.distance) * 0.3, 0.3, 1.0);
}
`;

/**
 * The plates of the layered view: one faint elliptical disc per stratum with
 * a hairline rim. `plates` holds the half-widths along x and z and the height.
 */
export const plateShader = /* wgsl */ `
${camera}
@group(0) @binding(1) var<storage, read> plates: array<vec4f>;

struct PlateOut {
  @builtin(position) position: vec4f,
  @location(0) local: vec2f,
  @location(1) @interpolate(flat) stratum: f32,
}

@vertex
fn vs_main(@builtin(vertex_index) vertex: u32, @builtin(instance_index) instance: u32) -> PlateOut {
  let plate = plates[instance];
  var corners = array<vec2f, 6>(
    vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0),
  );
  let local = corners[vertex] * 1.08;
  var out: PlateOut;
  out.position = camera.viewProjection * vec4f(local.x * plate.x, plate.z, local.y * plate.y, 1.0);
  out.local = local;
  out.stratum = f32(instance);
  return out;
}

@fragment
fn fs_main(in: PlateOut) -> @location(0) vec4f {
  let d = length(in.local);
  let width = fwidth(d);
  let fill = (1.0 - smoothstep(0.55, 1.0, d)) * 0.025;
  let rim = (1.0 - smoothstep(0.0, width * 1.25, abs(d - 1.0))) * 0.12;
  let alpha = (fill + rim) * strataLight[u32(in.stratum)] * camera.ink.a;
  return vec4f(camera.ink.rgb * alpha, alpha);
}
`;

/**
 * Cross-layer links. Each edge runs from its lower node to its upper one, so
 * a pulse climbs it: `pulses` holds when the pulse starts and how long it
 * takes to reach the top. A lit edge stays bright briefly, then settles.
 */
export const layerEdgeShader = /* wgsl */ `
${camera}
@group(0) @binding(1) var<storage, read> points: array<vec4f>;
@group(0) @binding(2) var<storage, read> marks: array<vec4f>;
@group(0) @binding(3) var<storage, read> edges: array<vec2u>;
@group(0) @binding(4) var<storage, read> pulses: array<vec2f>;

// A record's visibility from its arrival mark. Below 1e5 it is the time the
// record arrived (fade in); 1e5 + t means it was superseded at t (fade out);
// 1e8 and above means it doesn't exist yet.
fn visibility(arrived: f32, time: f32) -> f32 {
  if (arrived >= 1e8) {
    return 0.0;
  }
  if (arrived >= 1e5) {
    return 1.0 - clamp((time - (arrived - 1e5)) / 0.9, 0.0, 1.0);
  }
  return clamp((time - arrived) / 0.5, 0.0, 1.0);
}

const settle = 0.9;

struct EdgeOut {
  @builtin(position) position: vec4f,
  @location(0) across: f32,
  @location(1) along: f32,
  @location(2) @interpolate(flat) halfWidth: f32,
  @location(3) @interpolate(flat) rest: f32,
  @location(4) @interpolate(flat) pulse: vec2f,
}

@vertex
fn vs_main(@builtin(vertex_index) vertex: u32, @builtin(instance_index) instance: u32) -> EdgeOut {
  let edge = edges[instance];
  let clipA = camera.viewProjection * vec4f(points[edge.x].xyz, 1.0);
  let clipB = camera.viewProjection * vec4f(points[edge.y].xyz, 1.0);
  let a = toDevice(clipA);
  let b = toDevice(clipB);
  var corners = array<vec2f, 6>(
    vec2f(0.0, -1.0), vec2f(1.0, -1.0), vec2f(0.0, 1.0),
    vec2f(0.0, 1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0),
  );
  let corner = corners[vertex];
  let along = b - a;
  let direction = along / max(length(along), 0.0001);
  let normal = vec2f(-direction.y, direction.x);

  let pulse = pulses[instance];
  let age = camera.time - pulse.x;
  let lit = age >= 0.0 && age < pulse.y + settle;
  let halfWidth = select(0.4, 0.7, lit) * camera.dpr;
  let reach = halfWidth + 1.0;

  // An edge shows only while both of its records do.
  let shown = min(visibility(marks[edge.x].z, camera.time), visibility(marks[edge.y].z, camera.time));

  var out: EdgeOut;
  out.position = fromDevice(mix(a, b, corner.x) + normal * corner.y * reach, 0.5);
  out.across = corner.y * reach;
  out.along = corner.x;
  out.halfWidth = halfWidth;
  out.rest = 0.045 * recede(mix(clipA.w, clipB.w, 0.5)) * shown;
  out.pulse = pulse;
  return out;
}

@fragment
fn fs_main(in: EdgeOut) -> @location(0) vec4f {
  let coverage = clamp(in.halfWidth + 0.5 - abs(in.across), 0.0, 1.0);
  let age = camera.time - in.pulse.x;
  var glow = 0.0;
  if (age >= 0.0 && age < in.pulse.y + settle) {
    // Without motion the whole edge lights at once and fades.
    var front = 1.0;
    var head = 0.0;
    if (camera.motion > 0.5) {
      front = clamp(age / in.pulse.y, 0.0, 1.0);
      head = exp(-abs(front - in.along) * 14.0) * step(age, in.pulse.y);
    }
    let fade = 1.0 - clamp((age - in.pulse.y * camera.motion) / settle, 0.0, 1.0);
    glow = step(in.along, front) * (0.35 + head * 0.9) * fade;
  }
  let alpha = clamp(in.rest + glow * 0.6, 0.0, 1.0) * coverage * camera.ink.a;
  return vec4f(camera.ink.rgb * alpha, alpha);
}
`;

/**
 * Nodes of the layered view, drawn as points that always face the camera.
 * `points` holds position and size in pixels; `marks` holds the stratum, a hub
 * flag, when the node arrived, and when a pulse last reached it. Sources on
 * the floor are small squares; knowledge above is round. A node a pulse
 * reaches swells briefly and settles.
 */
export const layerNodeShader = /* wgsl */ `
${camera}
@group(0) @binding(1) var<storage, read> points: array<vec4f>;
@group(0) @binding(2) var<storage, read> marks: array<vec4f>;

// A record's visibility from its arrival mark. Below 1e5 it is the time the
// record arrived (fade in); 1e5 + t means it was superseded at t (fade out);
// 1e8 and above means it doesn't exist yet.
fn visibility(arrived: f32, time: f32) -> f32 {
  if (arrived >= 1e8) {
    return 0.0;
  }
  if (arrived >= 1e5) {
    return 1.0 - clamp((time - (arrived - 1e5)) / 0.9, 0.0, 1.0);
  }
  return clamp((time - arrived) / 0.5, 0.0, 1.0);
}

struct NodeOut {
  @builtin(position) position: vec4f,
  @location(0) local: vec2f,
  @location(1) @interpolate(flat) radius: f32,
  @location(2) @interpolate(flat) alpha: f32,
  @location(3) @interpolate(flat) square: f32,
}

@vertex
fn vs_main(@builtin(vertex_index) vertex: u32, @builtin(instance_index) instance: u32) -> NodeOut {
  let point = points[instance];
  let mark = marks[instance];
  let clip = camera.viewProjection * vec4f(point.xyz, 1.0);

  let shown = visibility(mark.z, camera.time);
  var flare = 0.0;
  if (camera.time >= mark.w) {
    flare = exp(-(camera.time - mark.w) * 2.5);
  }
  let stratum = u32(mark.x);
  let hub = mark.y;
  let radius = point.w * camera.dpr * (1.0 + hub * 0.6) * (1.0 + flare * 0.6 * camera.motion);
  let extent = radius + 1.5 * camera.dpr;
  var corners = array<vec2f, 6>(
    vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0),
  );
  let local = corners[vertex] * extent;

  var out: NodeOut;
  out.position = fromDevice(toDevice(clip) + local, 0.5);
  out.local = local;
  out.radius = radius;
  out.alpha = clamp(max(strataLight[stratum] * recede(clip.w), hub) + flare * 0.5, 0.0, 1.0) * shown;
  out.square = select(0.0, 1.0, stratum == 0u);
  return out;
}

@fragment
fn fs_main(in: NodeOut) -> @location(0) vec4f {
  var d = length(in.local);
  if (in.square > 0.5) {
    // Squares read a little smaller than discs of the same radius.
    d = max(abs(in.local.x), abs(in.local.y)) * 1.12;
  }
  let alpha = clamp(in.radius + 0.5 - d, 0.0, 1.0) * in.alpha * camera.ink.a;
  return vec4f(camera.ink.rgb * alpha, alpha);
}
`;
