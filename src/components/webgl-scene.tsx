"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2, Vec3 } from "ogl";

const VERT = /* glsl */ `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec3 uColorBg;
  uniform float uIntensity;

  // Simplex-ish noise (Ashima)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * snoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5);
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.06;
    vec2 mouse = (uMouse - 0.5);
    mouse.x *= uResolution.x / uResolution.y;

    // Domain warp
    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t * 0.7)));
    vec2 r = vec2(
      fbm(p + 2.5 * q + vec2(1.7, 9.2) + t),
      fbm(p + 2.5 * q + vec2(8.3, 2.8) - t * 0.8)
    );
    float n = fbm(p + 3.0 * r);

    // Mouse influence
    float md = length(p - mouse * 0.6);
    float halo = smoothstep(0.9, 0.0, md) * 0.35;

    // Three flowing color bands
    float bandA = smoothstep(0.0, 0.6, n + 0.25 + halo);
    float bandB = smoothstep(0.2, 0.9, length(r));
    float bandC = smoothstep(0.4, 1.0, abs(n) + halo * 0.5);

    vec3 col = uColorBg;
    col = mix(col, uColorA, bandA * 0.55);
    col = mix(col, uColorB, bandB * 0.5);
    col = mix(col, uColorC, bandC * 0.4);

    // Vignette
    float vig = smoothstep(1.4, 0.2, length(p));
    col *= mix(0.8, 1.0, vig);

    // Subtle film grain
    float grain = fract(sin(dot(uv * uResolution, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.02;

    col *= uIntensity;

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface Props {
  theme: "light" | "dark";
}

const PALETTES = {
  dark: {
    bg: [0.024, 0.024, 0.027],
    a: [0.95, 0.55, 0.25],
    b: [0.45, 0.2, 0.55],
    c: [0.15, 0.4, 0.85],
    intensity: 1.0,
  },
  light: {
    bg: [0.97, 0.97, 0.96],
    a: [0.95, 0.7, 0.45],
    b: [0.78, 0.85, 1.0],
    c: [1.0, 0.8, 0.78],
    intensity: 1.05,
  },
} as const;

export function WebGLScene({ theme }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouseTargetRef = useRef({ x: 0.5, y: 0.5 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const programRef = useRef<Program | null>(null);
  const startRef = useRef(performance.now());
  const visibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isCoarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    const renderer = new Renderer({
      alpha: false,
      antialias: false,
      // Lower DPR on touch devices keeps mobile Safari from re-allocating
      // large drawing buffers during URL-bar resize events.
      dpr: Math.min(window.devicePixelRatio || 1, isCoarsePointer ? 1.25 : 1.75),
      powerPreference: "high-performance",
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    // Pin the canvas to the visual viewport so URL-bar resize on iOS Safari
    // doesn't force a buffer reallocation mid-scroll (the source of flicker).
    // Sized via JS below; promoted to its own GPU layer.
    gl.canvas.style.position = "absolute";
    gl.canvas.style.inset = "0";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    gl.canvas.style.transform = "translateZ(0)";
    gl.canvas.style.backfaceVisibility = "hidden";
    gl.canvas.style.willChange = "transform";

    const palette = PALETTES[theme];

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(1, 1) },
        uMouse: { value: new Vec2(0.5, 0.5) },
        uColorBg: { value: new Vec3(...palette.bg) },
        uColorA: { value: new Vec3(...palette.a) },
        uColorB: { value: new Vec3(...palette.b) },
        uColorC: { value: new Vec3(...palette.c) },
        uIntensity: { value: palette.intensity },
      },
    });
    programRef.current = program;
    const mesh = new Mesh(gl, { geometry, program });

    let lastW = 0;
    let lastH = 0;
    const resize = () => {
      // Use innerWidth/Height so iOS Safari's URL-bar collapse (which only
      // changes layout viewport, not visual viewport) doesn't trigger resizes.
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value.set(w, h);
    };
    resize();

    let resizeRaf: number | null = null;
    const onResize = () => {
      if (resizeRaf !== null) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null;
        resize();
      });
    };

    const onMove = (e: PointerEvent) => {
      mouseTargetRef.current.x = e.clientX / window.innerWidth;
      mouseTargetRef.current.y = 1 - e.clientY / window.innerHeight;
    };
    const onLeave = () => {
      mouseTargetRef.current.x = 0.5;
      mouseTargetRef.current.y = 0.5;
    };
    const onVisibility = () => {
      visibleRef.current = !document.hidden;
      if (visibleRef.current) {
        startRef.current = performance.now() - lastT * 1000;
        loop();
      } else if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    let lastT = 0;
    const loop = () => {
      const t = (performance.now() - startRef.current) / 1000;
      lastT = t;
      // smooth mouse
      mouseRef.current.x += (mouseTargetRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseTargetRef.current.y - mouseRef.current.y) * 0.05;
      program.uniforms.uTime.value = t;
      program.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      renderer.render({ scene: mesh });
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });
    if (!isCoarsePointer) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);

    loop();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
    };
  }, [theme]);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />;
}
