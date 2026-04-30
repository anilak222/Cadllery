"use client";

import * as React from "react";
import { ShoeCard } from "@/components/shoe-card";
import type { Collection } from "@/lib/collections";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Concept", "Production", "Capsule", "Collaboration"] as const;
type Filter = (typeof FILTERS)[number];

export function CollectionsGrid({ collections }: { collections: Collection[] }) {
  const [filter, setFilter] = React.useState<Filter>("All");

  const filtered = React.useMemo(
    () =>
      filter === "All"
        ? collections
        : collections.filter((c) => c.category === filter),
    [filter, collections]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-all cursor-pointer",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background/40 text-muted-foreground backdrop-blur-md hover:text-foreground"
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-sm text-muted-foreground">
          No pieces in this category yet.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <ShoeCard key={c.slug} collection={c} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
