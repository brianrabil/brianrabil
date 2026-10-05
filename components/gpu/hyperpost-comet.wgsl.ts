/**
 * Hyperpost comet. A tapered streak crosses the stage along the lockup's comet
 * blade every few seconds, leaving an ordered-dither dot trail that spreads
 * and dissolves, over a faint static dot field that lights as the head
 * passes. Output is premultiplied alpha over a transparent surface.
 */
export const HYPERPOST_COMET_WGSL = /* wgsl */ `
struct Params {
  ink: vec4f,
  resolution: vec2f,
  pointer: vec2f,
  lockup: vec4f,
  time: f32,
  intensity: f32,
  hover: f32,
  dpr: f32,
}
@group(0) @binding(0) var<uniform> params: Params;

const PERIOD: f32 = 6.0;
const SWEEP: f32 = 2.4;
const TRAIL_LIFE: f32 = 0.9;
// The comet blade's centre line in the lockup art: y 57.5 of 72.
const BLADE_Y: f32 = 0.7986;

fn bayer4(cell: vec2f) -> f32 {
  let x = u32(cell.x) % 4u;
  let y = u32(cell.y) % 4u;
  var m = array<f32, 16>(0.0, 8.0, 2.0, 10.0, 12.0, 4.0, 14.0, 6.0, 3.0, 11.0, 1.0, 9.0, 15.0, 7.0, 13.0, 5.0);
  return (m[y * 4u + x] + 0.5) / 16.0;
}

fn hash12(p: vec2f) -> f32 {
  var q = fract(p * vec2f(123.34, 456.21));
  q += dot(q, q + 45.32);
  return fract(q.x * q.y);
}

// Inverse of smoothstep(0, 1, x) on [0, 1].
fn unsmooth(y: f32) -> f32 {
  return 0.5 - sin(asin(clamp(1.0 - 2.0 * y, -1.0, 1.0)) / 3.0);
}

fn disc(px: vec2f, center: vec2f, radius: f32) -> f32 {
  return 1.0 - smoothstep(radius - 0.6, radius + 0.6, length(px - center));
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let res = params.resolution;
  let dpr = params.dpr;
  let px = uv * res;
  let lk = params.lockup;
  let baseY = lk.y + (lk.w - lk.y) * BLADE_Y;

  // The head eases across from off the left edge to off the right edge.
  let x0 = -0.25 * res.x;
  let x1 = 1.15 * res.x;
  let local = fract(params.time / PERIOD) * PERIOD;
  let headX = mix(x0, x1, smoothstep(0.0, 1.0, local / SWEEP));
  let head = vec2f(headX, baseY);

  // Seconds since the head passed this column in the current sweep (< 0: not yet).
  let s = clamp((px.x - x0) / (x1 - x0), 0.0, 1.0);
  let age = local - unsmooth(s) * SWEEP;
  let passed = select(0.0, 1.0, age >= 0.0);

  // Pointer proximity brightens the head a little.
  let proximity = params.hover * exp(-length(params.pointer - head) / (160.0 * dpr));
  let boost = 1.0 + 0.6 * proximity + 0.25 * params.hover;

  // Core: a solid line that tapers as it ages, so its length follows the speed.
  let core = passed * exp(-age / 0.14);
  let halfWidth = dpr * (0.35 + 0.9 * core);
  let coreLine = core * (1.0 - smoothstep(halfWidth - 0.5, halfWidth + 0.5, abs(px.y - baseY)));

  // Head glow, stretched along the path.
  let glowDistance = length((px - head) * vec2f(0.28, 1.0));
  let glow = exp(-glowDistance / (5.0 * dpr)) * 0.55 * boost;

  // Trail: dots on a 3px grid, dithered against a value that fades and spreads with age.
  let pitch = 3.0 * dpr;
  let cell = floor(px / pitch);
  let center = (cell + 0.5) * pitch;
  let cellS = clamp((center.x - x0) / (x1 - x0), 0.0, 1.0);
  let cellAge = local - unsmooth(cellS) * SWEEP;
  let spread = dpr * (1.5 + 6.0 * max(cellAge, 0.0));
  let dy = center.y - baseY;
  let vertical = exp(-(dy * dy) / (2.0 * spread * spread));
  let trailValue = select(0.0, exp(-cellAge / TRAIL_LIFE), cellAge >= 0.0) * vertical;
  let threshold = bayer4(cell) * 0.75 + hash12(cell) * 0.25;
  let trailDot = step(threshold, trailValue * 0.9) * disc(px, center, 0.75 * dpr);

  // Static field: 6px grid, faint, brighter near the path and as the head passes.
  let fieldPitch = 6.0 * dpr;
  let fieldCell = floor(px / fieldPitch);
  let fieldCenter = (fieldCell + 0.5) * fieldPitch;
  let lit = exp(-length(fieldCenter - head) / (90.0 * dpr));
  let band = exp(-abs(fieldCenter.y - baseY) / (60.0 * dpr));
  let fieldDot = disc(px, fieldCenter, 0.6 * dpr) * (0.05 + 0.05 * band + 0.3 * lit * boost);

  let signal = max(max(coreLine * boost, glow), max(trailDot * 0.5, fieldDot));
  let alpha = clamp(signal, 0.0, 1.0) * params.intensity;
  return vec4f(params.ink.rgb * alpha, alpha);
}
`;
