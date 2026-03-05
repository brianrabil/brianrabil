"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const vertexSource = `#version 300 es
precision mediump float;
layout(location = 0) in vec4 a_position;
void main() { gl_Position = a_position; }
`

const fragmentSource = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pxSize;

out vec4 fragColor;

#define TWO_PI 6.28318530718

void main() {
  float t = u_time;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // Center the vortex behind the hero copy (left-aligned, upper half)
  vec2 center = vec2(0.35, 0.45);

  float pxSize = u_pxSize;
  vec2 pxUv = (gl_FragCoord.xy - center * u_resolution) / pxSize;
  vec2 pixUv = floor(pxUv) * pxSize / u_resolution.xy;

  // Swirl (scaled down for zoom-in effect)
  vec2 swirlUv = pixUv * 0.7;
  float l = length(swirlUv);
  float angle = 6.0 * atan(swirlUv.y, swirlUv.x) + 4.0 * t;
  float twist = 1.2;
  float offset = pow(l, -twist) + angle / TWO_PI;
  float mid = smoothstep(0.0, 1.0, pow(l, twist));
  float shape = mix(0.0, fract(offset), mid);

  // 4x4 Bayer dithering
  const int bayer[16] = int[16](
    0, 8, 2, 10, 12, 4, 14, 6,
    3, 11, 1, 9, 15, 7, 13, 5
  );
  ivec2 pos = ivec2(mod(pxUv, 4.0));
  float dither = float(bayer[pos.y * 4 + pos.x]) / 16.0 - 0.5;
  float res = step(0.5, shape + dither);

  // Hue-cycling color (matches gradient-dots palette: red→yellow→green→blue)
  float hue = fract(t * 0.15 + l * 0.5);
  float r = abs(hue * 6.0 - 3.0) - 1.0;
  float g = 2.0 - abs(hue * 6.0 - 2.0);
  float b = 2.0 - abs(hue * 6.0 - 4.0);
  vec3 col = clamp(vec3(r, g, b), 0.0, 1.0);

  fragColor = vec4(col, res);
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

    // Compile shaders
    function compile(type: number, src: string) {
      const s = gl!.createShader(type)
      if (!s) return null
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
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
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    gl.useProgram(program)

    // Geometry (full-screen quad)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    // Uniforms
    const uTime = gl.getUniformLocation(program, "u_time")
    const uRes = gl.getUniformLocation(program, "u_resolution")
    const uPx = gl.getUniformLocation(program, "u_pxSize")

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    // Resize handler — only updates canvas dimensions, no re-init
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

    const start = performance.now()

    function render() {
      if (!gl || !visibleRef.current) {
        rafRef.current = requestAnimationFrame(render)
        return
      }
      resize()
      const t = (performance.now() - start) * 0.0002 // slow
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, t)
      gl.uniform2f(uRes, gl.drawingBufferWidth, gl.drawingBufferHeight)
      gl.uniform1f(uPx, 4.0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }

    // Pause when off-screen
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
        "absolute inset-0 h-full w-full opacity-60 dark:opacity-40",
        className,
      )}
    />
  )
}
