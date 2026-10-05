/**
 * Instrument field. A lattice of fine + crosshairs (28 px) with heavier ones
 * every fourth node, lit by a slow diagonal sweep and a pointer lens. The same
 * mark as the corners of the product grid. Output is premultiplied alpha over
 * a transparent surface.
 */
export const STEALTH_FIELD_WGSL = /* wgsl */ `
struct Params {
  ink: vec4f,
  resolution: vec2f,
  pointer: vec2f,
  time: f32,
  lens: f32,
  intensity: f32,
  seed: f32,
  mode: f32,
  dpr: f32,
}
@group(0) @binding(0) var<uniform> params: Params;

// Coverage of a + centred at the origin: arms of half-length 'arm', one CSS px wide.
fn crosshair(local: vec2f, arm: f32, dpr: f32) -> f32 {
  let half = 0.5 * dpr;
  let aa = 0.75;
  let horizontal = (1.0 - smoothstep(half - aa, half + aa, abs(local.y)))
    * (1.0 - smoothstep(arm - aa, arm + aa, abs(local.x)));
  let vertical = (1.0 - smoothstep(half - aa, half + aa, abs(local.x)))
    * (1.0 - smoothstep(arm - aa, arm + aa, abs(local.y)));
  return max(horizontal, vertical);
}

fn regionMask(uv: vec2f) -> f32 {
  let narrow = params.resolution.x / params.dpr < 640.0;
  // 0: hero. Keep the headline (left) quiet; settle into the page at the bottom.
  if (params.mode < 0.5) {
    if (narrow) {
      return mix(0.12, 1.0, smoothstep(0.45, 0.95, uv.y)) * smoothstep(1.0, 0.9, uv.y);
    }
    return mix(0.14, 1.0, smoothstep(0.08, 0.72, uv.x)) * smoothstep(0.0, 0.12, uv.y) * smoothstep(1.0, 0.78, uv.y);
  }
  // 1: band. A header strip; the field lives on the right and fades out at the edges.
  if (params.mode < 1.5) {
    if (narrow) {
      return 0.22 * smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.75, uv.y);
    }
    return mix(0.08, 1.0, smoothstep(0.25, 0.9, uv.x)) * smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.7, uv.y);
  }
  // 3: fill. Clipped by the caller (e.g. a CSS mask over diagram slabs); no fade.
  if (params.mode > 2.5) {
    return 1.0;
  }
  // 2: full. A vignette; the centre stays readable.
  let d = length((uv - 0.5) * vec2f(1.0, 1.4));
  return mix(0.35, 1.0, smoothstep(0.15, 0.7, d)) * smoothstep(1.0, 0.85, uv.y);
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let res = params.resolution;
  let dpr = params.dpr;
  let px = uv * res;
  let t = params.time;

  // Nearest lattice node. The seed shifts the lattice so pages don't line up exactly.
  let spacing = 28.0 * dpr;
  let offset = vec2f(params.seed, fract(params.seed * 7.13)) * spacing;
  let cell = floor((px - offset) / spacing + 0.5);
  let node = cell * spacing + offset;
  let local = px - node;

  // Every fourth node is a major one.
  let major = select(0.0, 1.0, all(fract(cell / 4.0) < vec2f(0.01)));
  let arm = mix(2.5, 6.5, major) * dpr;
  let mark = crosshair(local, arm, dpr);

  // A slow diagonal sweep of light across the field.
  let diag = (node.x + node.y * 0.6) / (res.x + res.y * 0.6);
  let sweep = fract(t / 14.0) * 1.6 - 0.3;
  let band = exp(-pow((diag - sweep) / 0.09, 2.0));

  // Pointer lens.
  let lensRadius = 180.0 * dpr;
  let lens = (1.0 - smoothstep(0.0, lensRadius, length(node - params.pointer))) * params.lens;

  let base = mix(0.16, 0.34, major);
  let lit = base + 0.45 * band + 0.55 * lens;
  let alpha = mark * clamp(lit, 0.0, 1.0) * regionMask(uv) * params.intensity;
  return vec4f(params.ink.rgb * alpha, alpha);
}
`;
