"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { LazyImage } from "@/components/lazy-image";
import { cn } from "@/lib/utils";
import type { ShoeImage } from "@/lib/collections";

const ImageLightbox = dynamic(
  () => import("./image-lightbox").then((m) => m.ImageLightbox),
  { ssr: false }
);

type Props = {
  images: ShoeImage[];
  title?: string;
};

export function ImageGallery({ images, title }: Props) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
        {images.map((img, i) => {
          const span = layoutSpan(i, images.length);
          return (
            <button
              key={img.src + i}
              onClick={() => openAt(i)}
              className={cn(
                "group relative block overflow-hidden rounded-lg border border-border/60 bg-card transition-all hover:border-foreground/30 cursor-zoom-in",
                span
              )}
              aria-label={`Open ${img.alt}`}
            >
              <div className="relative aspect-[4/5]">
                <LazyImage
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  containerClassName="h-full w-full"
                  className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-3 left-3 rounded-full bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <ImageLightbox
        images={images}
        open={open}
        index={index}
        onOpenChange={setOpen}
        onIndexChange={setIndex}
        title={title}
      />
    </>
  );
}

function layoutSpan(i: number, total: number) {
  // an alternating editorial layout
  const mod = i % 5;
  if (total <= 3) return "md:col-span-3";
  switch (mod) {
    case 0:
      return "md:col-span-4";
    case 1:
      return "md:col-span-2";
    case 2:
      return "md:col-span-3";
    case 3:
      return "md:col-span-3";
    case 4:
      return "md:col-span-6";
    default:
      return "md:col-span-3";
  }
}
