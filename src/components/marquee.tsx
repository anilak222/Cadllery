"use client";

import * as React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  items: string[];
  speed?: number;
};

export function Marquee({ items, speed = 60 }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const track = el.querySelector<HTMLDivElement>("[data-track]");
      if (!track) return;
      const total = track.scrollWidth / 2;
      const duration = total / speed;
      gsap.to(track, {
        x: -total,
        duration,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: ref as React.RefObject<HTMLDivElement> }
  );

  const doubled = [...items, ...items];

  return (
    <div ref={ref} className="relative w-full overflow-hidden py-6">
      <div
        data-track
        className="flex w-max items-center gap-12 whitespace-nowrap will-change-transform"
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-4xl tracking-tight text-foreground/30 md:text-7xl"
          >
            {item}
            <span className="ml-12 inline-block h-2 w-2 -translate-y-2 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
