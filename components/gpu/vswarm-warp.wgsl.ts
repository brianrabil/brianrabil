/**
 * vswarm warp-in. Fine horizontal streaks race in from the left edge and
 * decelerate onto the mark, shortening and thinning as they slow. Lanes sit
 * on the mark's cut grid, so streaks that reach the delta show through its
 * cuts; lanes outside it stop along the delta's leading edges, extended.
 * Output is premultiplied alpha over a transparent surface.
 */
export const VSWARM_WARP_WGSL = /* wgsl */ `
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

// Mark geometry, in the mark's own 36-unit space. The lockup draws the mark at
// translate(0 4) scale(1.78) inside a 72-unit-tall viewBox.
const MARK_Y: f32 = 4.0;
const MARK_SCALE: f32 = 1.78;
const CUT_FIRST: f32 = 5.2;
const CUT_PITCH: f32 = 1.3;
const CUT_FIRST_LANE: f32 = 0.0;
const CUT_LAST_LANE: f32 = 19.0;
const CENTER_Y: f32 = 18.0;
const HALF_HEIGHT: f32 = 13.5;
const NOSE_X: f32 = 33.0;
const EDGE_SLOPE: f32 = 26.0 / 13.5;

// Sin-free hashes (Hoskins), stable on GPUs that lose precision in large sin() arguments.
fn hash11(n: f32) -> f32 {
  var p = fract(n * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

fn hash21(q: vec2f) -> f32 {
  var p3 = fract(q.xyx * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let res = params.resolution;
  let dpr = params.dpr;
  let px = uv * res;
  let lk = params.lockup;
  // Physical pixels per lockup unit, and per mark unit.
  let unit = (lk.w - lk.y) / 72.0;
  let markUnit = unit * MARK_SCALE;

  // Nearest lane on the cut grid. Even lanes are the long cuts, odd lanes the short ones.
  let markY = (px.y - lk.y - MARK_Y * unit) / markUnit;
  let lane = round((markY - CUT_FIRST) / CUT_PITCH);
  let laneY = lk.y + MARK_Y * unit + (CUT_FIRST + lane * CUT_PITCH) * markUnit;
  let odd = abs(lane - 2.0 * floor(lane * 0.5)) > 0.5;
  let fromCenter = abs(CUT_FIRST + lane * CUT_PITCH - CENTER_Y);
  let outside = max(fromCenter - HALF_HEIGHT, 0.0) / HALF_HEIGHT;
  let inCuts = lane >= CUT_FIRST_LANE && lane <= CUT_LAST_LANE;

  // Where this lane's streak comes to rest, in mark units: the cut's tip inside
  // the delta, otherwise the delta's leading edge extended outward.
  let edgeX = NOSE_X - fromCenter * EDGE_SLOPE;
  let cutTip = select(24.0, 17.0, odd);
  let restMark = select(edgeX, min(cutTip, edgeX), inCuts);
  let restX = lk.x + restMark * markUnit;

  // Outside the mark, lanes thin out with distance; short-cut lanes run half as often.
  let density = select(1.0, 0.85 * exp(-outside * 0.5), outside > 0.0) * select(1.0, 0.5, odd && !inCuts);

  // Each lane fires on its own period; each firing rolls whether it appears.
  let period = 2.0 + 1.6 * hash11(lane);
  let shifted = params.time + hash11(lane + 7.13) * period;
  let firing = floor(shifted / period);
  let age = shifted - firing * period;
  let present = step(hash21(vec2f(lane, firing)), density);

  // Ease-out approach over most of each firing: the streak enters with its tail
  // past the left edge, then shortens and slows onto its rest point.
  let duration = 1.7;
  let progress = clamp(age / duration, 0.0, 1.0);
  let ease = 1.0 - pow(1.0 - progress, 3.0);
  let startX = -20.0 * dpr;
  let headX = mix(startX, restX, ease);
  let len = mix(max(restX - startX, 0.0) + 60.0 * dpr, 4.0 * dpr, ease);
  let along = (px.x - (headX - len)) / len;
  let onStreak = step(0.0, along) * step(along, 1.0);

  // Taper: thin and faint at the tail, 1.5px and full at the head.
  let a = clamp(along, 0.0, 1.0);
  let halfWidth = dpr * (0.3 + 0.45 * a) * mix(1.0, 0.7, ease);
  let line = 1.0 - smoothstep(halfWidth - 0.5, halfWidth + 0.5, abs(px.y - laneY));
  let life = (1.0 - smoothstep(0.7, 1.0, progress)) * step(age, duration);
  let shade = mix(0.2, 1.0, pow(a, 1.2)) * mix(1.0, 0.45, clamp(outside / 3.0, 0.0, 1.0)) * select(1.0, 0.7, odd);

  // Clear of the wordmark, which starts at x 70 of the lockup.
  let clearWordmark = 1.0 - smoothstep(lk.x + 46.0 * unit, lk.x + 62.0 * unit, px.x);
  let boost = 1.35 + 0.3 * params.hover;

  let signal = present * onStreak * line * life * shade * clearWordmark * boost;
  let alpha = clamp(signal, 0.0, 1.0) * params.intensity;
  return vec4f(params.ink.rgb * alpha, alpha);
}
`;
