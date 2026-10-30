/**
 * Posting timeline quads. Every mark on the timeline (grid and ruler
 * hairlines, bars, backoff lines, the now line, muzzle flashes) is one
 * instance of a screen-space quad read from a storage buffer: a rect in CSS
 * pixels, a straight-alpha color, and a shape (0 a solid rect, 1 a soft dot).
 * One instanced draw per frame. Output is premultiplied alpha over a
 * transparent surface.
 */
export const POSTING_TIMELINE_WGSL = /* wgsl */ `
struct View {
  size: vec2f,
  pad: vec2f,
}

struct Quad {
  rect: vec4f,
  color: vec4f,
  shape: vec4f,
}

@group(0) @binding(0) var<uniform> view: View;
@group(0) @binding(1) var<storage, read> quads: array<Quad>;

struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) local: vec2f,
  @location(1) @interpolate(flat) color: vec4f,
  @location(2) @interpolate(flat) shape: f32,
}

@vertex
fn vs_main(@builtin(vertex_index) vertex: u32, @builtin(instance_index) instance: u32) -> VertexOut {
  var corners = array<vec2f, 6>(
    vec2f(0.0, 0.0), vec2f(1.0, 0.0), vec2f(0.0, 1.0),
    vec2f(0.0, 1.0), vec2f(1.0, 0.0), vec2f(1.0, 1.0),
  );
  let corner = corners[vertex];
  let quad = quads[instance];
  let pixel = quad.rect.xy + corner * quad.rect.zw;
  var out: VertexOut;
  out.position = vec4f(pixel.x / view.size.x * 2.0 - 1.0, 1.0 - pixel.y / view.size.y * 2.0, 0.0, 1.0);
  out.local = corner * 2.0 - 1.0;
  out.color = quad.color;
  out.shape = quad.shape.x;
  return out;
}

@fragment
fn fs_main(in: VertexOut) -> @location(0) vec4f {
  var alpha = in.color.a;
  if (in.shape > 0.5) {
    // A soft dot: full at the centre, gone at the rim.
    let falloff = 1.0 - smoothstep(0.0, 1.0, length(in.local));
    alpha = alpha * falloff * falloff;
  }
  return vec4f(in.color.rgb * alpha, alpha);
}
`;
