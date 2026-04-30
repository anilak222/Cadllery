import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ImageGallery } from "@/components/image-gallery";
import { LazyImage } from "@/components/lazy-image";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ShoeCard } from "@/components/shoe-card";
import { collections, getCollection } from "@/lib/collections";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return { title: "Not found" };
  return {
    title: c.title,
    description: c.summary,
    openGraph: {
      title: `${c.title} · Cadllery`,
      description: c.summary,
      images: [c.cover.src],
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();

  const others = collections.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <article className="pb-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-12 md:px-10 md:pt-20">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to collections
        </Link>

        <header className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8 md:gap-x-10">
          <div className="col-span-12 lg:col-span-8">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="rounded-full border border-border bg-background/40 px-2.5 py-1 backdrop-blur-md">
                {c.category}
              </span>
              <span>
                {c.season} {c.year}
              </span>
            </p>
            <h1 className="mt-6 font-display text-6xl leading-[1] tracking-tight md:text-8xl">
              {c.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
              {c.summary}
            </p>
          </div>
          <aside className="col-span-12 lg:col-span-4">
            <dl className="grid grid-cols-2 gap-y-6 rounded-xl border border-border/60 bg-card p-6">
              <Spec label="Year" value={String(c.year)} />
              <Spec label="Season" value={c.season} />
              <Spec label="Category" value={c.category} />
              <Spec label="Status" value="Archive" />
              <div className="col-span-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground/80">
                  Materials
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {c.materials.map((m) => (
                    <li
                      key={m}
                      className="rounded-full border border-border px-3 py-1 text-xs text-foreground/80"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </dl>
          </aside>
        </header>

        <div className="mt-16 overflow-hidden rounded-2xl border border-border/60 bg-card">
          <LazyImage
            src={c.cover.src}
            alt={c.cover.alt}
            width={c.cover.width}
            height={c.cover.height}
            priority
            sizes="100vw"
            containerClassName="aspect-[16/10] w-full"
          />
        </div>

        <ScrollReveal childrenSelector="[data-stagger]" stagger={0.12}>
          <div
            data-stagger
            className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                The brief
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="space-y-6 text-pretty text-lg leading-relaxed text-foreground/90 md:text-xl">
                {c.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          <section data-stagger className="mt-24">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Process · Selected stages
            </p>
            <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 md:grid-cols-3">
              {c.process.map((step, i) => (
                <div key={step.label} className="flex flex-col gap-3 bg-card p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl tracking-tight">
                    {step.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{step.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section data-stagger className="mt-24">
            <div className="flex items-end justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Gallery · {c.gallery.length} frames
              </p>
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 md:block">
                Click to enlarge
              </p>
            </div>
            <div className="mt-6">
              <ImageGallery images={c.gallery} title={c.title} />
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-32 border-t border-border/60 pt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl tracking-tight md:text-5xl">
              More from the studio
            </h2>
            <Link
              href="/collections"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
            >
              All collections
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <ShoeCard key={o.slug} collection={o} />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground/80">
        {label}
      </dt>
      <dd className="mt-1 font-display text-lg tracking-tight">{value}</dd>
    </div>
  );
}
