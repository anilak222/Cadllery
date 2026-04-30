import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start gap-6 px-6 pb-32 pt-32 md:px-10 md:pt-48">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Error · 404
      </p>
      <h1 className="font-display text-6xl leading-[1] tracking-tight md:text-8xl">
        That page is <em className="italic text-accent">off-last</em>.
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        The page you were looking for has either been retired or never existed.
        Try the archive instead.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background"
        >
          Back to studio
        </Link>
        <Link
          href="/collections"
          className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background/40 px-6 text-sm font-medium backdrop-blur-md transition-colors hover:bg-secondary"
        >
          Browse collections
        </Link>
      </div>
    </div>
  );
}
