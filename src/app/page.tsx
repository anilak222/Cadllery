import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { ShoeCard } from "@/components/shoe-card";
import { collections } from "@/lib/collections";

export default function HomePage() {
  const feature = collections[0];
  const selected = collections.slice(0, 4);

  return (
    <div className="pb-24">
      <Hero feature={feature} />

      <section className="mt-24 border-y border-border/40 bg-background/30 backdrop-blur-sm">
        <Marquee
          items={[
            "Concept",
            "Sample",
            "Last",
            "Welt",
            "Pattern",
            "Material",
            "Sole",
            "Sketch",
            "Form",
            "Footstep",
          ]}
        />
      </section>

      <section className="mx-auto mt-32 w-full max-w-[1400px] px-6 md:px-10">
        <ScrollReveal childrenSelector="[data-stagger]" stagger={0.12}>
          <div data-stagger>
            <SectionHeading
              eyebrow="Selected Work"
              title={
                <>
                  A small archive of <em className="italic text-accent">silhouettes</em>,
                  studies, and capsules.
                </>
              }
              description="Each piece below begins as a marker sketch and ends on the foot — concept work and production silhouettes from the studio's last two years."
            />
          </div>
          <div
            data-stagger
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {selected.map((c, i) => (
              <ShoeCard
                key={c.slug}
                collection={c}
                priority={i < 2}
                feature={i === 0}
                className={i === 0 ? "sm:col-span-2 lg:col-span-2" : undefined}
              />
            ))}
          </div>
          <div data-stagger className="mt-12 flex justify-end">
            <Link
              href="/collections"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
            >
              All collections
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto mt-40 w-full max-w-[1400px] px-6 md:px-10">
        <ScrollReveal childrenSelector="[data-stagger]" stagger={0.1}>
          <div data-stagger>
            <SectionHeading
              eyebrow="Process"
              title={
                <>
                  From a single line on tracing paper to a hand-stitched
                  <em className="italic text-accent"> sample</em>.
                </>
              }
              description="A small studio means short feedback loops. Most pieces ship from sketch to first sample inside 12 weeks."
            />
          </div>
          <div
            data-stagger
            className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 md:grid-cols-2 lg:grid-cols-4"
          >
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col gap-4 bg-card p-8 transition-colors hover:bg-secondary/40"
              >
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto mt-40 w-full max-w-[1400px] px-6 md:px-10">
        <ScrollReveal childrenSelector="[data-stagger]" stagger={0.12}>
          <div
            data-stagger
            className="grid grid-cols-1 gap-10 rounded-2xl border border-border/60 bg-card p-10 md:grid-cols-2 md:p-16"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Open for projects · {new Date().getFullYear()}
              </p>
              <h3 className="mt-6 font-display text-4xl tracking-tight md:text-6xl">
                Have a silhouette in mind?
              </h3>
            </div>
            <div className="flex flex-col justify-end gap-6">
              <p className="text-pretty text-lg text-muted-foreground">
                We take on a small number of brand collaborations, capsules, and
                concept commissions each season. If you have a brief — or just a
                hunch — we&apos;d like to hear it.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
                >
                  Start a brief
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background/40 px-6 text-sm font-medium backdrop-blur-md transition-colors hover:bg-secondary"
                >
                  About the studio
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

const STEPS = [
  {
    title: "Research & Sketch",
    body:
      "Reference walks, marker sketches, paper patterning. The first 100 ideas are on the wall before anyone touches a CAD file.",
  },
  {
    title: "Form & Material",
    body:
      "Last selection, upper draping, swatch sourcing. We build the shoe twice in foam before locking the pattern.",
  },
  {
    title: "Sample & Iterate",
    body:
      "Pull-up samples from a small partner factory. Two iteration rounds is the studio standard before sign-off.",
  },
  {
    title: "Make & Ship",
    body:
      "Small-run production with a partner shoemaker. Each pair is QC'd in studio before it leaves.",
  },
];
