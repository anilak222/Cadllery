"use client";

import * as React from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lenis smooth-scroll provider, wired to GSAP ScrollTrigger.
 *
 * Mobile policy: native momentum scrolling is left intact (`syncTouch: false`)
 * because iOS Safari's native scroller is the smoothest experience on touch
 * devices. Lenis still owns wheel/keyboard smoothing on desktop and keeps
 * ScrollTrigger in sync everywhere.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = React.useRef<Lenis | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reducedMotion,
      // Keep native momentum on touch — Lenis docs and Apple WebKit both
      // recommend this; intercepting touch creates more jank than it removes.
      syncTouch: false,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      // We drive Lenis from gsap.ticker so it stays in lockstep with the
      // animation frame ScrollTrigger uses.
      autoRaf: false,
      prevent: (node) => {
        // Allow opt-out for any scrollable subtree (e.g. the lightbox)
        return node.hasAttribute("data-lenis-prevent");
      },
    });
    lenisRef.current = lenis;

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onLenisScroll);

    const update = (time: number) => {
      // gsap.ticker emits seconds; Lenis expects ms.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll position on route change.
  React.useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    // Defer a refresh so any ScrollTriggers attached to the new page
    // recompute their start/end positions.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);

  return <>{children}</>;
}
