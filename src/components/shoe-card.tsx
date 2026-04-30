"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LazyImage } from "@/components/lazy-image";
import type { Collection } from "@/lib/collections";

type Props = {
  collection: Collection;
  className?: string;
  priority?: boolean;
  feature?: boolean;
};

export function ShoeCard({ collection, className, priority, feature }: Props) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-lg border border-border/60 bg-card transition-colors hover:border-foreground/30",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          feature ? "aspect-[4/5]" : "aspect-[4/5]"
        )}
      >
        <LazyImage
          src={collection.cover.src}
          alt={collection.cover.alt}
          width={collection.cover.width}
          height={collection.cover.height}
          priority={priority}
          sizes={feature ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          containerClassName="h-full w-full"
          className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-90" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
            {collection.category}
          </span>
          <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
            {collection.season} {collection.year}
          </span>
        </div>
        <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-transform duration-500 group-hover:rotate-45 group-hover:bg-white/20">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 p-5">
        <div>
          <h3 className="font-display text-xl tracking-tight text-foreground md:text-2xl">
            {collection.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{collection.subtitle}</p>
        </div>
        <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:inline">
          0{Math.min(99, parseIntSlug(collection.slug))}
        </span>
      </div>
    </Link>
  );
}

function parseIntSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return (h % 60) + 10;
}
