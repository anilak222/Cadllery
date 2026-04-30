"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ShoeImage } from "@/lib/collections";

type Props = {
  images: ShoeImage[];
  open: boolean;
  index: number;
  onOpenChange: (v: boolean) => void;
  onIndexChange: (i: number) => void;
  title?: string;
};

export function ImageLightbox({
  images,
  open,
  index,
  onOpenChange,
  onIndexChange,
  title,
}: Props) {
  const next = React.useCallback(
    () => onIndexChange((index + 1) % images.length),
    [index, images.length, onIndexChange]
  );
  const prev = React.useCallback(
    () => onIndexChange((index - 1 + images.length) % images.length),
    [index, images.length, onIndexChange]
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  const current = images[index];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="sr-only">{title ?? "Image preview"}</DialogTitle>
        <div className="relative mx-auto flex h-[100svh] w-screen max-w-[100vw] items-center justify-center px-4 py-12 sm:px-12">
          {current && (
            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                priority
                className="max-h-full w-auto max-w-full select-none rounded-lg object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-500"
              />
            </div>
          )}

          <button
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-background/70 text-foreground backdrop-blur-md transition-colors hover:bg-background sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next image"
            onClick={next}
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-background/70 text-foreground backdrop-blur-md transition-colors hover:bg-background sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-background/70 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground backdrop-blur-md">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
