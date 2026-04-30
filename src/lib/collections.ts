export type ShoeImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Collection = {
  slug: string;
  title: string;
  subtitle: string;
  category: "Concept" | "Production" | "Capsule" | "Collaboration";
  year: number;
  season: string;
  summary: string;
  description: string[];
  materials: string[];
  process: { label: string; detail: string }[];
  cover: ShoeImage;
  gallery: ShoeImage[];
};

const placeholder = (
  width: number,
  height: number,
  hue: number,
  label: string
): ShoeImage => ({
  src: `/placeholders/shoe-${hue}.svg`,
  alt: label,
  width,
  height,
});

export const collections: Collection[] = [
  {
    slug: "obsidian-runner",
    title: "Obsidian Runner",
    subtitle: "Volcanic black, knit upper, sculpted midsole",
    category: "Concept",
    year: 2026,
    season: "FW",
    summary:
      "A monolithic runner cast in obsidian black, blending a sock-knit upper with a sculpted, weight-shifted midsole.",
    description: [
      "Obsidian Runner explores a single-tone silhouette: a one-piece engineered knit collapsed into a sculpted dual-density foam.",
      "The midsole's negative space cantilevers under the heel, channeling rebound forward through a carbon-loaded plate.",
      "Designed as a study in restraint — every line is structural; nothing is purely decorative.",
    ],
    materials: ["Engineered knit", "Sugarcane EVA", "Carbon-loaded TPU plate", "Recycled rubber outsole"],
    process: [
      { label: "Sketch", detail: "Marker on tracing paper, 14 silhouette iterations" },
      { label: "CAD", detail: "Rhino + Grasshopper for midsole sculpting" },
      { label: "Sample", detail: "Two prototype rounds in Putian, China" },
    ],
    cover: placeholder(1600, 2000, 1, "Obsidian Runner cover"),
    gallery: [
      placeholder(1600, 2000, 1, "Obsidian Runner — quarter view"),
      placeholder(1600, 1200, 2, "Obsidian Runner — sole detail"),
      placeholder(1200, 1600, 3, "Obsidian Runner — knit detail"),
      placeholder(1600, 1200, 4, "Obsidian Runner — heel sculpt"),
      placeholder(1600, 2000, 5, "Obsidian Runner — full profile"),
    ],
  },
  {
    slug: "halcyon-low",
    title: "Halcyon Low",
    subtitle: "Soft suede, hand-stitched welt, vegetable-tanned trim",
    category: "Production",
    year: 2025,
    season: "SS",
    summary:
      "A pared-back leisure low. Hand-stitched welt, brushed suede upper, and vegetable-tanned heel patch.",
    description: [
      "Halcyon Low began as a conversation about how few materials a shoe really needs.",
      "The answer: a single-piece suede vamp, a leather lining, and a hand-stitched welt onto a stacked rubber-cork sole.",
      "The result is light, broken-in from the first wear, and built to be resoled.",
    ],
    materials: ["Italian suede", "Vegetable-tanned trim", "Cork-rubber sole", "Waxed cotton laces"],
    process: [
      { label: "Lasted", detail: "Custom last, 9-step grading" },
      { label: "Construction", detail: "Hand-stitched 360° welt" },
      { label: "Finishing", detail: "Edge-burnished and hot-waxed in studio" },
    ],
    cover: placeholder(1600, 2000, 6, "Halcyon Low cover"),
    gallery: [
      placeholder(1600, 2000, 6, "Halcyon Low — three-quarter"),
      placeholder(1600, 1200, 7, "Halcyon Low — welt detail"),
      placeholder(1200, 1600, 8, "Halcyon Low — back panel"),
      placeholder(1600, 1200, 9, "Halcyon Low — laydown"),
    ],
  },
  {
    slug: "vapor-mule",
    title: "Vapor Mule",
    subtitle: "Translucent TPU, foam riser, slip-on geometry",
    category: "Concept",
    year: 2026,
    season: "SS",
    summary:
      "A translucent slip-on study: pressure-formed TPU shell over a sculpted foam riser. No laces, no hardware.",
    description: [
      "Vapor Mule reduces a shoe to two materials. A pressure-formed TPU shell is bonded to a high-rebound foam riser.",
      "The shell ghosts over the riser, revealing internal contour lines as a graphic.",
      "A study in the architecture of a slip-on.",
    ],
    materials: ["Pressure-formed TPU", "Supercritical EVA", "Recycled mesh sock"],
    process: [
      { label: "Form", detail: "Vacuum-formed test shells" },
      { label: "Color", detail: "Tinted resin, 6 colorways" },
      { label: "Refine", detail: "Pressure adjustments for fit" },
    ],
    cover: placeholder(1600, 2000, 10, "Vapor Mule cover"),
    gallery: [
      placeholder(1600, 2000, 10, "Vapor Mule — front view"),
      placeholder(1600, 1200, 11, "Vapor Mule — sole geometry"),
      placeholder(1200, 1600, 12, "Vapor Mule — translucent detail"),
    ],
  },
  {
    slug: "atelier-trainer",
    title: "Atelier Trainer",
    subtitle: "Patchwork leather, exposed foam, vintage proportions",
    category: "Capsule",
    year: 2025,
    season: "FW",
    summary:
      "A patchwork low-trainer cut from leather offcuts, dropped onto an exposed-foam midsole with vintage proportions.",
    description: [
      "Atelier Trainer is built from the studio's leather offcut bin — no two pairs match.",
      "The midsole uses an exposed-foam construction, sanded by hand, and finished with a deadstock rubber outsole.",
      "It's a small-run capsule: 30 pairs, numbered, sold direct.",
    ],
    materials: ["Leather offcuts", "Exposed EVA midsole", "Deadstock rubber outsole"],
    process: [
      { label: "Cut", detail: "Hand-cut from leather offcut inventory" },
      { label: "Assemble", detail: "Patchwork upper, lasted in-studio" },
      { label: "Number", detail: "Each pair stamped with edition number" },
    ],
    cover: placeholder(1600, 2000, 13, "Atelier Trainer cover"),
    gallery: [
      placeholder(1600, 2000, 13, "Atelier Trainer — pair"),
      placeholder(1600, 1200, 14, "Atelier Trainer — patchwork detail"),
      placeholder(1200, 1600, 15, "Atelier Trainer — sole"),
      placeholder(1600, 1200, 16, "Atelier Trainer — heel stamp"),
    ],
  },
  {
    slug: "north-boot",
    title: "North Boot",
    subtitle: "Waxed cordura, gum sole, Vibram lug",
    category: "Production",
    year: 2026,
    season: "FW",
    summary:
      "A short cold-weather boot. Waxed cordura upper, fully-bonded gum midsole, Vibram lug outsole.",
    description: [
      "North Boot is a winter silhouette designed for the city.",
      "Waxed cordura upper resists slush; a thin merino lining keeps the foot warm without bulk.",
      "Vibram lug outsole bonded to a gum midsole — built for sidewalks, not summits.",
    ],
    materials: ["Waxed cordura", "Merino lining", "Gum midsole", "Vibram lug outsole"],
    process: [
      { label: "Pattern", detail: "Three-piece upper, minimal seams" },
      { label: "Bond", detail: "Cold-press cementing" },
      { label: "Treat", detail: "Hand-waxed before final cure" },
    ],
    cover: placeholder(1600, 2000, 17, "North Boot cover"),
    gallery: [
      placeholder(1600, 2000, 17, "North Boot — profile"),
      placeholder(1600, 1200, 18, "North Boot — lug detail"),
      placeholder(1200, 1600, 19, "North Boot — laces"),
    ],
  },
  {
    slug: "echo-court",
    title: "Echo Court",
    subtitle: "Tonal pebbled leather, gum cup-sole, court archetype",
    category: "Collaboration",
    year: 2025,
    season: "SS",
    summary:
      "A reduced court silhouette in tonal pebbled leather, dropped onto a gum cup-sole.",
    description: [
      "Echo Court is the studio's take on the most-copied shoe of all time: the tennis court low.",
      "We reduced the panel count, removed the branding, and built it on a vulcanized gum cup-sole.",
      "Released as a numbered collaboration with a small Lisbon retailer.",
    ],
    materials: ["Pebbled Italian leather", "Vulcanized gum cup-sole", "Cotton drill lining"],
    process: [
      { label: "Reduce", detail: "Removed three panels from reference" },
      { label: "Color", detail: "Tonal whites, four temperatures" },
      { label: "Number", detail: "Edition of 120 pairs" },
    ],
    cover: placeholder(1600, 2000, 20, "Echo Court cover"),
    gallery: [
      placeholder(1600, 2000, 20, "Echo Court — pair"),
      placeholder(1600, 1200, 21, "Echo Court — heel"),
      placeholder(1200, 1600, 22, "Echo Court — toe"),
      placeholder(1600, 1200, 23, "Echo Court — sole"),
    ],
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}
