"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const WebGLScene = dynamic(() => import("./webgl-scene").then((m) => m.WebGLScene), {
  ssr: false,
  loading: () => null,
});

export function AnimatedBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        // Isolate the stacking context so blend-modes / overlays above the
        // canvas don't force compositor reads of unrelated page content.
        // NOTE: do NOT apply `transform` here — applying any transform to a
        // `position: fixed` element causes iOS Safari to re-project it on
        // every scroll frame during URL-bar transitions (visible as flicker).
        isolation: "isolate",
      }}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      {mounted && !reduced && <WebGLScene theme={resolvedTheme === "dark" ? "dark" : "light"} />}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
    </div>
  );
}
