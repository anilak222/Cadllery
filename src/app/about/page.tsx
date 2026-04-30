import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LazyImage } from "@/components/lazy-image";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { collections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Cadllery is an independent footwear studio working at the seam of concept and craft.",
};

export default function AboutPage() {
  const portrait = collections[1].cover;

  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 pb-32 pt-16 md:px-10 md:pt-28">
      <ScrollReveal childrenSelector="[data-stagger]" stagger={0.12}>
        <div data-stagger>
          <SectionHeading
            eyebrow="The studio"
            title={
              <>
                A small studio for the
                <em className="italic text-accent"> long version </em>
                of footwear.
              </>
            }
            description="Cadllery is led by a single designer and a rotating cast of pattern-makers, sample-makers, and craftspeople. We move slowly, on purpose."
          />
        </div>

        <div
          data-stagger
          className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-border/60">
              <LazyImage
                src={portrait.src}
                alt="Studio portrait"
                width={portrait.width}
                height={portrait.height}
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                containerClassName="aspect-[4/5] w-full"
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="space-y-6 text-pretty text-lg leading-relaxed text-foreground/90 md:text-xl">
              <p>
                Cadllery began in 2024 as a place to publish the work that
                wouldn&apos;t fit inside a brand brief — concept silhouettes,
                material studies, the kind of footwear that takes twelve weeks
                to draw and twelve more to sample.
              </p>
              <p>
                Today the studio takes a small number of commissions each
                season: brand collaborations, capsules, and concept
                commissions for clients who care more about the line than the
                logo.
              </p>
              <p>
                Everything ships from the studio in small, numbered runs. No
                drops, no waitlists, no marketing department. Just shoes.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3">
              <Stat label="Year founded" value="2024" />
              <Stat label="Pieces made" value={`${collections.length}+`} />
              <Stat label="Clients" value="By referral" />
            </div>
          </div>
        </div>

        <section data-stagger className="mt-32">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Working with us
          </p>
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 md:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="flex flex-col gap-3 bg-card p-8">
                <h3 className="font-display text-2xl tracking-tight">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          data-stagger
          className="mt-24 grid grid-cols-1 gap-10 rounded-2xl border border-border/60 bg-card p-10 md:grid-cols-2 md:p-16"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Studio
            </p>
            <h3 className="mt-6 font-display text-4xl tracking-tight md:text-5xl">
              Want to start something?
            </h3>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <p className="text-pretty text-lg text-muted-foreground">
              Briefs are read by the founder and answered within a week. The
              clearer your brief, the faster the answer.
            </p>
            <Link
              href="/contact"
              className="group inline-flex h-12 w-fit items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
            >
              Send a brief
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground/80">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl tracking-tight">{value}</p>
    </div>
  );
}

const SERVICES = [
  {
    title: "Concept commissions",
    body:
      "Speculative work for brand decks, exhibitions, and editorial. Sketch, render, and a single hand-built sample.",
  },
  {
    title: "Capsules",
    body:
      "Small numbered runs (30–200 pairs) released directly through the studio or a partner retailer.",
  },
  {
    title: "Brand collaborations",
    body:
      "Co-design and consulting with footwear and apparel brands across SS / FW seasons.",
  },
];
