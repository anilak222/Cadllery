import Link from "next/link";

const YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border/60 bg-background/40 backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-display text-3xl font-medium tracking-tight">
                Cadllery
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </Link>
            <p className="mt-4 text-pretty text-sm text-muted-foreground">
              An independent footwear studio designing concept work,
              collaboration capsules, and production silhouettes from sketch to
              sample.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <FooterColumn label="Studio">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/collections">Collections</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterColumn>
            <FooterColumn label="Connect">
              <FooterLink href="https://instagram.com/" external>
                Instagram
              </FooterLink>
              <FooterLink href="https://www.behance.net/" external>
                Behance
              </FooterLink>
              <FooterLink href="https://www.linkedin.com/" external>
                LinkedIn
              </FooterLink>
            </FooterColumn>
            <FooterColumn label="Office">
              <p className="text-sm text-foreground/80">
                Studio by appointment
                <br />
                Worldwide remote
              </p>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center">
          <span>© {YEAR} Cadllery. All rights reserved.</span>
          <span className="font-mono normal-case tracking-normal">
            Designed in studio · Built with Next.js
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground/80">
        {label}
      </p>
      <div className="flex flex-col gap-2 text-sm">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-foreground/80 transition-colors hover:text-foreground"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="text-foreground/80 transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}
