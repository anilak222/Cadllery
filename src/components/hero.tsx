"use client";

import * as React from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { LazyImage } from "@/components/lazy-image";
import type { Collection } from "@/lib/collections";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export function Hero({ feature }: { feature: Collection }) {
  const root = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-eyebrow]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
      })
        .from(
          "[data-hero-line]",
          {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.08,
          },
          "-=0.55"
        )
        .from(
          "[data-hero-sub]",
          { autoAlpha: 0, y: 16, duration: 0.8 },
          "-=0.7"
        )
        .from(
          "[data-hero-cta]",
          { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.08 },
          "-=0.6"
        )
        .from(
          "[data-hero-meta]",
          { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.08 },
          "-=0.6"
        )
        .from(
          imageRef.current,
          {
            autoAlpha: 0,
            scale: 1.08,
            yPercent: 6,
            duration: 1.6,
            ease: "power4.out",
          },
          "-=1.0"
        )
        .from(
          "[data-hero-scroll]",
          { autoAlpha: 0, y: 10, duration: 0.6 },
          "-=0.4"
        );

      // floating image
      gsap.to(imageRef.current, {
        y: -16,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // parallax on pointer move (desktop)
      const onMove = (e: PointerEvent) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / window.innerWidth;
        const dy = (e.clientY - cy) / window.innerHeight;
        gsap.to(imageRef.current, {
          rotateY: dx * 6,
          rotateX: -dy * 5,
          duration: 1.2,
          ease: "power3.out",
        });
      };
      const mq = window.matchMedia("(pointer: fine)");
      if (mq.matches) window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root as React.RefObject<HTMLDivElement> }
  );

  return (
    <section
      ref={root}
      className="relative isolate mx-auto w-full max-w-[1400px] px-6 pt-12 md:px-10 md:pt-20"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10 md:gap-x-10">
        <div className="col-span-12 lg:col-span-7 lg:pt-10">
          <p
            data-hero-eyebrow
            className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            <span className="h-px w-8 bg-foreground/40" />
            Footwear Studio · Est. 2024
          </p>
          <h1 className="font-display text-[14vw] leading-[0.95] tracking-tight md:text-[10rem] lg:text-[11.5rem]">
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                Form
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                meets
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block italic text-accent">
                footstep.
              </span>
            </span>
          </h1>
          <p
            data-hero-sub
            className="mt-10 max-w-xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Cadllery is an independent footwear studio working at the seam of
            concept and craft — from the first marker stroke to the last stitch.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              data-hero-cta
              href="/collections"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
            >
              View collections
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link
              data-hero-cta
              href="/about"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background/40 px-6 text-sm font-medium backdrop-blur-md transition-colors hover:bg-secondary"
            >
              The studio
            </Link>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div
            ref={imageRef}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] [perspective:1200px] [transform-style:preserve-3d]"
          >
            <LazyImage
              src={feature.cover.src}
              alt={feature.cover.alt}
              width={feature.cover.width}
              height={feature.cover.height}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              containerClassName="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div
              data-hero-meta
              className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">
                  Featured · {feature.season} {feature.year}
                </p>
                <p className="mt-1 font-display text-2xl tracking-tight">
                  {feature.title}
                </p>
              </div>
              <Link
                href={`/collections/${feature.slug}`}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
                aria-label={`Open ${feature.title}`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        data-hero-scroll
        className="mt-16 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground md:mt-24"
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
        Scroll · Selected work below
      </div>
    </section>
  );
}
