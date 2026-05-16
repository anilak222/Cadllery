"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/", label: "Index" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        // Limit the transition to color properties — transitioning
        // `backdrop-filter` (under `transition-all`) makes iOS Safari
        // re-read the WebGL canvas behind the header on every scroll
        // tick across the 12px threshold, which shows as flicker.
        "sticky top-0 z-40 w-full transition-[background-color,border-color,color] duration-300",
        scrolled
          ? // On mobile use a near-opaque solid bg (no backdrop-filter) so
            // Safari isn't forced to read the WebGL canvas behind the header
            // every scroll frame. Desktop keeps the translucent blur.
            "border-b border-border/60 bg-background/95 md:bg-background/70 md:backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-6 md:h-20 md:px-10">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="font-display text-xl font-medium tracking-tight md:text-2xl">
            Cadllery
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-125" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <span className="absolute inset-0 rounded-full bg-secondary" />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          // Solid bg on mobile (no backdrop-filter) for the same reason as
          // the scrolled header: avoid forcing canvas reads during scroll.
          "md:hidden grid overflow-hidden bg-background transition-[grid-template-rows] duration-500 ease-out",
          open
            ? "grid-rows-[1fr] border-b border-border/60"
            : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 p-6">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-4 py-3 font-display text-2xl tracking-tight transition-colors",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
