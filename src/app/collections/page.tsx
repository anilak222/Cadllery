import type { Metadata } from "next";
import { CollectionsGrid } from "@/components/collections-grid";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { collections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore Cadllery's archive of concept work, capsules, and production silhouettes.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 pb-32 pt-16 md:px-10 md:pt-28">
      <ScrollReveal childrenSelector="[data-stagger]" stagger={0.1}>
        <div data-stagger>
          <SectionHeading
            eyebrow={`Archive · ${collections.length} pieces`}
            title={
              <>
                The studio <em className="italic text-accent">archive</em>.
              </>
            }
            description="Two years of concept work, collaborations, and production silhouettes — listed in chronological order."
          />
        </div>
        <div data-stagger className="mt-14">
          <CollectionsGrid collections={collections} />
        </div>
      </ScrollReveal>
    </div>
  );
}
