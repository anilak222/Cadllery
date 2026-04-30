import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, "..", "public", "placeholders");
mkdirSync(out, { recursive: true });

const palettes = [
  ["#1a1a1c", "#3a3a3f", "#0a0a0b"],
  ["#1a1a2a", "#2c2c50", "#08080f"],
  ["#221a14", "#4a3522", "#0c0807"],
  ["#0f1a1f", "#1f3640", "#06090a"],
  ["#1a141c", "#3a2a48", "#08060a"],
  ["#1c1814", "#3e3328", "#0a0807"],
  ["#0d1a14", "#1c3826", "#04080a"],
  ["#1c1612", "#43331c", "#0a0705"],
  ["#181a1c", "#34383f", "#06080a"],
  ["#1c1a1a", "#403838", "#080706"],
  ["#10141c", "#243047", "#06080a"],
  ["#161416", "#36303a", "#080608"],
  ["#1a1812", "#3e3520", "#0a0805"],
  ["#1a1a16", "#3a3a2c", "#0a0a08"],
  ["#0e161a", "#1f3340", "#040608"],
  ["#1c161a", "#3c2c34", "#08060a"],
  ["#161a1a", "#2c3a3c", "#060808"],
  ["#1a1a1a", "#383838", "#080808"],
  ["#181a1c", "#2e3242", "#06080a"],
  ["#1c1a16", "#403626", "#0a0806"],
  ["#161a18", "#2e3a34", "#060808"],
  ["#181618", "#34303a", "#070608"],
  ["#1a1814", "#3a3422", "#0a0805"],
];

const lightPalettes = [
  ["#e8e7e2", "#cfccc4", "#f3f2ed"],
  ["#dee0e8", "#bbc1d2", "#eef0f6"],
  ["#e6dccd", "#cab69a", "#f1ebde"],
  ["#d6dde0", "#9faeb4", "#e8edf0"],
  ["#e1d5e3", "#b8a4be", "#efe6f0"],
  ["#e3ddd0", "#bdb29a", "#eee9dd"],
  ["#d4dcd2", "#a3b09f", "#e6ebe5"],
  ["#dcd2c4", "#b6a387", "#ebe2d4"],
  ["#dee0e2", "#b9bcc1", "#eaecee"],
  ["#dedbd9", "#bdb6b3", "#eae7e5"],
  ["#d3d8e2", "#9aa6c2", "#e4e8ee"],
  ["#dcd6dc", "#b9aebd", "#e6e1e6"],
  ["#dcd5c4", "#b8aa84", "#e8e1d2"],
  ["#dadcd2", "#b3b69b", "#e8e9e1"],
  ["#cdd6dc", "#9aaab8", "#e0e6ec"],
  ["#dccdd4", "#b994a3", "#e8d9e0"],
  ["#cfd6d2", "#9eaaa1", "#e2e8e5"],
  ["#d8d8d8", "#b0b0b0", "#e6e6e6"],
  ["#d6dae3", "#a8b0c4", "#e7eaf0"],
  ["#dcd1c2", "#b69d80", "#e8ddca"],
  ["#cfd6d0", "#9caa9b", "#e0e6e0"],
  ["#d2cdd4", "#aaa3b3", "#e0dbe1"],
  ["#dcd6c8", "#b9aa8a", "#e8e2d2"],
];

function svg(i, palette, lightPalette) {
  const [a, b, c] = palette;
  const [la, lb, lc] = lightPalette;
  const seed = i * 13.37;
  const angle = (seed % 90) - 45;
  // A stylized "shoe" silhouette gradient block — abstract, never literal.
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g${i}" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${angle.toFixed(2)} 0.5 0.5)">
      <stop offset="0%" stop-color="${b}"/>
      <stop offset="55%" stop-color="${a}"/>
      <stop offset="100%" stop-color="${c}"/>
    </linearGradient>
    <linearGradient id="gl${i}" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${angle.toFixed(2)} 0.5 0.5)">
      <stop offset="0%" stop-color="${lb}"/>
      <stop offset="55%" stop-color="${la}"/>
      <stop offset="100%" stop-color="${lc}"/>
    </linearGradient>
    <radialGradient id="r${i}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.18)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
    <radialGradient id="rl${i}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.5)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
    <filter id="b${i}"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>
  <style>
    .l { display: none; }
    @media (prefers-color-scheme: light) {
      .d { display: none; }
      .l { display: inline; }
    }
  </style>
  <g class="d">
    <rect width="800" height="1000" fill="url(#g${i})"/>
    <ellipse cx="400" cy="600" rx="320" ry="170" fill="${a}" opacity="0.55" filter="url(#b${i})"/>
    <ellipse cx="380" cy="560" rx="270" ry="120" fill="${b}" opacity="0.75" filter="url(#b${i})"/>
    <rect width="800" height="1000" fill="url(#r${i})"/>
    <text x="40" y="960" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="rgba(255,255,255,0.5)" letter-spacing="4">CADLLERY · SAMPLE 0${i}</text>
  </g>
  <g class="l">
    <rect width="800" height="1000" fill="url(#gl${i})"/>
    <ellipse cx="400" cy="600" rx="320" ry="170" fill="${la}" opacity="0.55" filter="url(#b${i})"/>
    <ellipse cx="380" cy="560" rx="270" ry="120" fill="${lb}" opacity="0.75" filter="url(#b${i})"/>
    <rect width="800" height="1000" fill="url(#rl${i})"/>
    <text x="40" y="960" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="rgba(0,0,0,0.45)" letter-spacing="4">CADLLERY · SAMPLE 0${i}</text>
  </g>
</svg>`;
}

for (let i = 1; i <= 23; i++) {
  const p = palettes[(i - 1) % palettes.length];
  const lp = lightPalettes[(i - 1) % lightPalettes.length];
  writeFileSync(resolve(out, `shoe-${i}.svg`), svg(i, p, lp));
}

console.log(`Wrote 23 placeholders to ${out}`);
