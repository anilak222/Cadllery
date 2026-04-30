# Cadllery

Independent footwear design studio website — a portfolio for shoe concept work,
capsules, and production silhouettes.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- ShadCN-style UI primitives (Radix + CVA)
- GSAP 3 + `@gsap/react` (`useGSAP`, ScrollTrigger)
- WebGL animated background via [`ogl`](https://github.com/oframe/ogl)
- `next-themes` (dark / light)
- `next/image` lazy loading

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    layout.tsx                 # ThemeProvider, animated bg, header/footer
    page.tsx                   # Home (hero + selected work + process + CTA)
    collections/
      page.tsx                 # Filterable archive
      [slug]/page.tsx          # Case-study page (gallery + lightbox)
    about/page.tsx
    contact/page.tsx
    api/contact/route.ts       # Studio's own contact endpoint
  components/
    animated-background.tsx    # Theme-aware WebGL backdrop
    webgl-scene.tsx            # OGL shader (lazy-loaded, ssr:false)
    hero.tsx                   # GSAP timeline intro
    scroll-reveal.tsx          # GSAP ScrollTrigger reveal wrapper
    image-gallery.tsx          # Editorial grid + lightbox
    image-lightbox.tsx         # Radix Dialog + keyboard nav
    shoe-card.tsx, marquee.tsx, section-heading.tsx
    site-header.tsx, site-footer.tsx, theme-toggle.tsx
    ui/                        # Button, Card, Dialog, Input, Label, Textarea, Badge
  lib/
    collections.ts             # Sample collection data (swap for real content)
    utils.ts                   # cn() helper
public/
  placeholders/                # Generated abstract SVGs (regen via npm run gen:placeholders)
scripts/
  gen-placeholders.mjs
```

## Adding real images

1. Drop image files in `public/work/<slug>/...`.
2. Update `src/lib/collections.ts` to point each `ShoeImage.src` at the new
   path with the correct `width` / `height`.
3. `next/image` will lazy-load and serve AVIF / WebP automatically.

## Contact form

`POST /api/contact` validates the payload server-side and forwards it to
whichever delivery you set in the `CADLLERY_CONTACT_WEBHOOK` env var (your own
SMTP relay, n8n, a Discord webhook, a database insert — anything that accepts
a JSON POST). Without it, briefs are logged to stdout for development.

## Performance notes

- WebGL background is `dynamic({ ssr: false })` and bypassed entirely under
  `prefers-reduced-motion`.
- All gallery images use `next/image` lazy loading + an in-component blur reveal.
- The lightbox is code-split on first interaction.
- `collections/[slug]` pages are statically generated at build time via
  `generateStaticParams`.
