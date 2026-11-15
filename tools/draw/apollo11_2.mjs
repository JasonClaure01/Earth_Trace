// Apollo 11 — lámina 2: el descenso entre rocas, el alunizaje, el primer paso y el trabajo en la superficie.
// Uso: node apollo11_2.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, balloon, caption, panel, layer, eagle, earth, stars, page, reseed } from "./lib.mjs";
import { astronaut, moonGround, moonHills, columbia, flame } from "./kit-luna.mjs";
import { sparkle } from "./kit.mjs";

reseed(223);

const rocas = (x, y, n, s = 1) => Array.from({ length: n }, (_, i) => {
  const cx = x + i * 46 * s + (i % 2) * 12, cy = y + (i % 3) * 10, r = (14 + (i * 7) % 16) * s;
  return `<path d="M${cx - r} ${cy} Q${cx - r * .8} ${cy - r} ${cx} ${cy - r * 1.1} Q${cx + r * .9} ${cy - r * .8} ${cx + r} ${cy} Z" fill="#7E8494" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
}).join("");

// ---------- viñeta 1: hacia una zona de rocas; Armstrong busca otro sitio ----------
const v1 = panel("p2-v1", 42, 120, 398, 447,
  layer("espacio", 0.05, `<rect x="42" y="120" width="398" height="447" fill="#1B2140"/>${stars(42, 120, 398, 300, 40)}`) +
  layer("horizonte", 0.2, moonHills(42, 398, 420, 50)) +
  layer("suelo", 0.3, moonGround(42, 466, 398, 101, 4) + rocas(60, 520, 5, 1.1)) +
  layer("ruta", 0.4, `<path d="M300 440 Q350 470 400 480" fill="none" stroke="#FFE066" stroke-width="4" stroke-dasharray="8 8" stroke-linecap="round"/>
    <path d="M384 470 L402 481 L386 492" fill="none" stroke="#FFE066" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`, "fade-in") +
  layer("eagle", 0.6, `${flame(250, 414, 32, 46)}${eagle(250, 430, 1.0)}`, "drift") +
  layer("texto", 1, caption(56, 134, 370, 100) + balloon(56, 244, 190, 52, 180, 1)));

// ---------- viñeta 2: ¡alunizaje! ----------
const v2 = panel("p2-v2", 455, 120, 398, 447,
  layer("espacio", 0.05, `<rect x="455" y="120" width="398" height="447" fill="#1B2140"/>${stars(455, 120, 398, 300, 40)}${earth(806, 252, 22)}`) +
  layer("horizonte", 0.2, moonHills(455, 398, 440, 50)) +
  layer("suelo", 0.3, moonGround(455, 486, 398, 81, 4)) +
  layer("polvo", 0.4, `<g fill="#C9CCD6" opacity=".6"><ellipse cx="654" cy="524" rx="150" ry="16"/></g>`, "fade-in") +
  layer("eagle", 0.6, eagle(654, 524, 1.25), "shake-small") +
  layer("texto", 1, caption(470, 134, 368, 70) + balloon(470, 214, 240, 60, 610, 1)));

// ---------- viñeta 3: el primer paso ----------
const bota = (x, y) => `<g transform="translate(${x} ${y}) rotate(-14) scale(1 .5)">
  <path d="M-46 -20 Q-56 0 -46 20 Q-20 30 6 18 Q14 0 6 -18 Q-20 -30 -46 -20 Z M16 -16 Q40 -22 50 0 Q40 22 16 16 Q10 0 16 -16 Z" fill="#6F7380" stroke="#4A4E5A" stroke-width="3"/>
  ${[-40, -28, -16, -4, 24, 36].map(dx => `<path d="M${dx} -14 V14" stroke="#4A4E5A" stroke-width="4"/>`).join("")}</g>`;
const v3 = panel("p2-v3", 42, 582, 812, 230,
  layer("espacio", 0.05, `<rect x="42" y="582" width="812" height="230" fill="#1B2140"/>${stars(42, 582, 812, 120, 40)}`) +
  layer("suelo", 0.2, moonGround(42, 740, 812, 72, 5)) +
  layer("modulo", 0.4, `
    <path d="M42 660 H220 L232 676 V712 L220 724 H42 Z" fill="#E5B53B" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M60 670 L80 714 M110 668 L118 720 M160 670 L150 718" stroke="#B88A1E" stroke-width="2"/>
    <path d="M200 724 L246 792" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M200 724 L246 792" stroke="#C9CCD6" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="250" cy="796" rx="26" ry="7" fill="#C9CCD6" stroke="${INK}" stroke-width="2.5"/>
    <path d="M168 724 L214 792 M190 724 L236 792" stroke="${INK}" stroke-width="3"/>
    ${[0, 1, 2, 3].map(i => `<path d="M${174 + i * 11} ${734 + i * 16} H${196 + i * 11}" stroke="${INK}" stroke-width="3"/>`).join("")}`) +
  layer("astronauta", 0.6, astronaut(320, 806, 1.0), "rise") +
  layer("huella", 0.7, bota(720, 778) + sparkle(782, 744, 11, "#FFE066"), "pulse-glow") +
  layer("texto", 1, caption(430, 596, 408, 82) + balloon(58, 594, 336, 66, 296, 1)));

// ---------- viñeta 4: fotos, muestras e instrumentos ----------
const sismografo = (x, y) => `
  <path d="M${x - 46} ${y - 30} L${x - 14} ${y - 20} V${y - 6} L${x - 46} ${y - 16} Z M${x + 46} ${y - 30} L${x + 14} ${y - 20} V${y - 6} L${x + 46} ${y - 16} Z" fill="#2E4A8C" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <rect x="${x - 16}" y="${y - 30}" width="32" height="30" rx="3" fill="#E6E0D4" stroke="${INK}" stroke-width="2.5"/>
  <path d="M${x} ${y - 30} V${y - 56}" stroke="${INK}" stroke-width="2.5"/>`;
const reflector = (x, y) => `
  <path d="M${x - 30} ${y} L${x - 22} ${y - 34} H${x + 30} L${x + 22} ${y} Z" fill="#C9CCD6" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  ${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<circle cx="${x - 16 + c * 11 - r * 2}" cy="${y - 26 + r * 10}" r="3.5" fill="#5A6478"/>`).join("")).join("")}
  <path d="M${x - 26} ${y} L${x - 32} ${y + 8} M${x + 26} ${y} L${x + 32} ${y + 8}" stroke="${INK}" stroke-width="2.5"/>`;
const v4 = panel("p2-v4", 42, 828, 812, 318,
  layer("espacio", 0.05, `<rect x="42" y="828" width="812" height="318" fill="#1B2140"/>${stars(42, 828, 812, 200, 50)}`) +
  layer("horizonte", 0.15, moonHills(42, 812, 990, 50)) +
  layer("suelo", 0.25, moonGround(42, 1030, 812, 116, 6)) +
  layer("eagle", 0.3, eagle(470, 1060, 0.5)) +
  layer("instrumentos", 0.5, sismografo(620, 1110) + reflector(740, 1112), "fade-in") +
  layer("astronautas", 0.6, astronaut(140, 1130, 1.0, { hold: true }) + astronaut(320, 1132, 1.0, { kneel: true, flip: true }) +
    `<path d="M262 1120 Q270 1104 286 1110 L282 1132 H264 Z" fill="#E6E0D4" stroke="${INK}" stroke-width="2.5"/>`, "rise") +
  layer("columbia", 0.4, `<circle cx="760" cy="980" r="40" fill="#0B0E22" stroke="#FFE066" stroke-width="3"/>${columbia(760, 980, 0.3)}`, "pulse-glow") +
  layer("texto", 1, caption(58, 842, 470, 104) + caption(548, 842, 290, 86)));

export const svg = page("Apollo 11, página 2 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
