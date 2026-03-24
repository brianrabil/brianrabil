"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const vertexSource = `#version 300 es
precision mediump float;
layout(location = 0) in vec4 a_position;
void main() { gl_Position = a_position; }
`

const fragmentSource = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_dotSize;
uniform float u_spacing;

out vec4 fragColor;

// Simplex-like 3D noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
  float t = u_time;
  float spacing = u_spacing;
  float dotRadius = u_dotSize * 0.5;

  // Snap to grid cell
  vec2 cell = floor(gl_FragCoord.xy / spacing);
  vec2 cellCenter = (cell + 0.5) * spacing;

  // Distance from pixel to nearest dot center
  float dist = length(gl_FragCoord.xy - cellCenter);

  // Normalized grid coordinates for noise sampling
  vec2 nuv = cell * 0.025;

  // Ridged noise — abs creates sharp creases like terrain contours
  float n = 0.0;
  n += (1.0 - abs(snoise(vec3(nuv * 1.5, t * 0.1)))) * 0.5;
  n += (1.0 - abs(snoise(vec3(nuv * 3.0 + 50.0, t * 0.07)))) * 0.25;
  n += (1.0 - abs(snoise(vec3(nuv * 6.0 + 150.0, t * 0.13)))) * 0.15;
  n += snoise(vec3(nuv * 10.0 + 300.0, t * 0.05)) * 0.1;

  // Threshold — higher = sparser, more defined ridges
  float threshold = 0.55;
  float visible = step(threshold, n);

  // Round dot shape
  float dot = 1.0 - smoothstep(dotRadius - 0.5, dotRadius + 0.5, dist);

  float alpha = dot * visible;

  fragColor = vec4(u_color, alpha);
}
`

export function HeroSwirl({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      preserveDrawingBuffer: false,
      powerPreference: "low-power",
    })
    if (!gl) return

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)
      if (!s) return null
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.error(gl!.getShaderInfoLog(s))
        gl!.deleteShader(s)
        return null
      }
      return s
    }

    const vs = compile(gl.VERTEX_SHADER, vertexSource)
    const fs = compile(gl.FRAGMENT_SHADER, fragmentSource)
    if (!vs || !fs) return

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, "u_time")
    const uRes = gl.getUniformLocation(program, "u_resolution")
    const uColor = gl.getUniformLocation(program, "u_color")
    const uDotSize = gl.getUniformLocation(program, "u_dotSize")
    const uSpacing = gl.getUniformLocation(program, "u_spacing")

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    function resize() {
      if (!canvas || !gl) return
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      const rect = canvas.getBoundingClientRect()
      const w = Math.floor(rect.width * dpr)
      const h = Math.floor(rect.height * dpr)
      if (w === 0 || h === 0) return
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    function getDotColor(): [number, number, number] {
      const isDark = document.documentElement.classList.contains("dark")
      return isDark ? [1.0, 1.0, 1.0] : [0.0, 0.0, 0.0]
    }

    const start = performance.now()

    function render() {
      if (!gl || !visibleRef.current) {
        rafRef.current = requestAnimationFrame(render)
        return
      }
      resize()
      const t = (performance.now() - start) * 0.001
      const [r, g, b] = getDotColor()
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, t)
      gl.uniform2f(uRes, gl.drawingBufferWidth, gl.drawingBufferHeight)
      gl.uniform3f(uColor, r, g, b)
      gl.uniform1f(uDotSize, 3.0)
      gl.uniform1f(uSpacing, 8.0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }

    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting },
      { threshold: 0 },
    )
    io.observe(canvas)

    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      io.disconnect()
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 h-full w-full opacity-30 dark:opacity-25",
        className,
      )}
    />
  )
}
