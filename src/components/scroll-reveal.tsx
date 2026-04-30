"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  y?: number;
  stagger?: number;
  childrenSelector?: string;
};

export function ScrollReveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 32,
  stagger,
  childrenSelector,
}: Props) {
  const ref = React.useRef<HTMLElement | null>(null);
  const Tag = as as React.ElementType;

  useGSAP(
    () => {
      const target = ref.current;
      if (!target) return;
      const items = childrenSelector
        ? target.querySelectorAll<HTMLElement>(childrenSelector)
        : [target];

      gsap.fromTo(
        items,
        { autoAlpha: 0, y, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          delay,
          ease: "power3.out",
          stagger: stagger ?? 0.08,
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: ref as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <Tag
      ref={ref as never}
      className={cn(className)}
      style={childrenSelector ? undefined : { opacity: 0 }}
    >
      {children}
    </Tag>
  );
}
