// Surveyor 3 — lámina 3: miles de fotos, la noche lunar, la visita del Apollo 12 y su legado.
// Uso: node surveyor3_3.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, balloon, caption, panel, layer, surveyor, earth, stars, page, reseed } from "./lib.mjs";
import { moonGround, moonHills, radioWaves, astronaut } from "./kit-luna.mjs";
import { armRight } from "./kit.mjs";

reseed(149);

// Fotito volando hacia la Tierra.
const fotito = (x, y, rot) => `<g transform="rotate(${rot} ${x} ${y})">
  <rect x="${x - 16}" y="${y - 13}" width="32" height="26" rx="2" fill="#FBFAF7" stroke="${INK}" stroke-width="2"/>
  <rect x="${x - 12}" y="${y - 9}" width="24" height="14" fill="#8E929E"/><path d="M${x - 12} ${y + 1} l8 -6 l6 4 l10 -6 V${y + 5} H${x - 12} Z" fill="#C9CCD6"/></g>`;

// Módulo lunar del Apollo 12, a lo lejos (genérico).
const modulo = (cx, by, s) => `<g transform="translate(${cx} ${by}) scale(${s})">
  <path d="M-40 0 L-26 -30 M40 0 L26 -30" stroke="${INK}" stroke-width="5"/>
  <ellipse cx="-42" cy="1" rx="9" ry="3" fill="#C9CCD6" stroke="${INK}" stroke-width="2"/><ellipse cx="42" cy="1" rx="9" ry="3" fill="#C9CCD6" stroke="${INK}" stroke-width="2"/>
  <path d="M-30 -30 H30 L34 -58 H-34 Z" fill="#E5B53B" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M-24 -58 L-28 -86 L-10 -100 H14 L28 -84 L24 -58 Z" fill="#C9CCD6" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M-12 -80 L-2 -90 H8 L4 -78 Z" fill="#2E3440"/>
  <path d="M10 -100 V-114 M4 -114 H16" stroke="${INK}" stroke-width="3"/>
</g>`;

// Huellas de botas.
const huellas = (pts) => pts.map(([x, y], i) => `<ellipse cx="${x}" cy="${y + (i % 2) * 8}" rx="7" ry="3" fill="#6F7380" opacity=".8"/>`).join("");

// ---------- viñeta 1: miles de fotos a la Tierra ----------
const v1 = panel("p3-v1", 42, 120, 398, 447,
  layer("espacio", 0.05, `<rect x="42" y="120" width="398" height="447" fill="#1B2140"/>${stars(42, 120, 398, 360, 50)}`) +
  layer("tierra", 0.15, earth(372, 286, 38, true)) +
  layer("montanas", 0.2, moonHills(42, 398, 440, 50)) +
  layer("suelo", 0.3, moonGround(42, 486, 398, 81, 4)) +
  layer("fotos", 0.5, `${radioWaves(232, 386, 3, "#FFE066", 1)}${fotito(300, 360, -12)}${fotito(336, 326, 8)}${fotito(270, 300, -4)}`, "drift") +
  layer("surveyor", 0.6, surveyor(170, 540, 1.05)) +
  layer("texto", 1, caption(56, 134, 370, 92)));

// ---------- viñeta 2: llega la noche lunar ----------
const v2 = panel("p3-v2", 455, 120, 398, 447,
  layer("espacio", 0.05, `<rect x="455" y="120" width="398" height="447" fill="#0B0E22"/>${stars(455, 250, 398, 220, 60)}
    <path d="M800 270 A26 26 0 1 1 800 322 A18 26 0 1 0 800 270 Z" fill="#4E93C2" stroke="${INK}" stroke-width="2.5"/>`) +
  layer("montanas", 0.2, moonHills(455, 398, 440, 50, "#3E4352")) +
  layer("suelo", 0.3, moonGround(455, 486, 398, 81, 4, "#5E6270", "#4A4E5A")) +
  layer("surveyor", 0.6, surveyor(654, 528, 1.1, { tired: true }), "fade-in") +
  layer("zzz", 0.8, `<path d="M716 330 h14 l-14 14 h14 M740 306 h10 l-10 10 h10" fill="none" stroke="#C9CCD6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`, "drift") +
  layer("texto", 1, caption(470, 134, 368, 108) + balloon(470, 258, 200, 52, 600, 1)));

// ---------- viñeta 3: la visita de los astronautas del Apollo 12 ----------
const v3 = panel("p3-v3", 42, 582, 812, 230,
  layer("espacio", 0.05, `<rect x="42" y="582" width="812" height="230" fill="#1B2140"/>${stars(42, 582, 812, 110, 40)}${earth(812, 620, 18)}`) +
  layer("montanas", 0.2, moonHills(42, 812, 680, 46)) +
  layer("suelo", 0.3, moonGround(42, 720, 812, 92, 6) + huellas([[600, 790], [624, 784], [650, 792], [676, 786], [702, 794]])) +
  layer("modulo", 0.35, modulo(770, 760, 0.62)) +
  layer("surveyor", 0.5, surveyor(420, 800, 0.8, { tired: true })) +
  layer("astronautas", 0.7, astronaut(300, 806, 0.9, { kneel: true }) + astronaut(560, 804, 0.9, { wave: true }), "rise") +
  layer("texto", 1, caption(58, 596, 330, 76) + balloon(470, 596, 320, 52, 556, 1)));

// ---------- viñeta 4: la cámara vuelve a casa ----------
const v4 = panel("p3-v4", 42, 828, 812, 318,
  layer("espacio", 0.05, `<rect x="42" y="828" width="812" height="318" fill="#1B2140"/>${stars(42, 828, 812, 200, 50)}`) +
  layer("tierra", 0.15, earth(782, 1000, 34, true) + armRight(814, 990, 0.9)) +
  layer("montanas", 0.2, moonHills(42, 812, 1000, 60)) +
  layer("suelo", 0.3, moonGround(42, 1050, 812, 96, 6) + huellas([[380, 1120], [420, 1114], [460, 1122], [500, 1116], [540, 1124], [580, 1118]])) +
  layer("surveyor", 0.5, surveyor(260, 1110, 0.9, { tired: true })) +
  layer("astronauta", 0.7, astronaut(650, 1126, 1.32, { hold: true }), "rise") +
  layer("texto", 1, caption(58, 842, 440, 100) + balloon(520, 846, 220, 56, 640, 1)));

export const svg = page("Surveyor 3, página 3 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
