import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a brief, a question, or an introduction to the Cadllery studio.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 pb-32 pt-16 md:px-10 md:pt-28">
      <ScrollReveal childrenSelector="[data-stagger]" stagger={0.1}>
        <div data-stagger>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Send a <em className="italic text-accent">brief</em>, a question,
                or an introduction.
              </>
            }
            description="Briefs are read by the founder and answered within a week. The studio takes on a small number of commissions each season."
          />
        </div>

        <div
          data-stagger
          className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-border/60 bg-card p-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Direct
              </p>
              <a
                href="mailto:studio@cadllery.com"
                className="mt-3 block font-display text-3xl tracking-tight transition-colors hover:text-accent"
              >
                studio@cadllery.com
              </a>
              <hr className="my-8 border-border/60" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Response window
              </p>
              <p className="mt-3 text-foreground/90">
                Within seven days, Mon — Fri.
                <br />
                Faster, usually.
              </p>
              <hr className="my-8 border-border/60" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Working with us
              </p>
              <ul className="mt-3 space-y-2 text-foreground/80">
                <li>Concept commissions</li>
                <li>Capsules &amp; small-run production</li>
                <li>Brand collaborations</li>
                <li>Press &amp; editorial</li>
              </ul>
            </div>
          </div>
          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
