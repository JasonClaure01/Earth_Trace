// Pioneer 10 y 11 — lámina 1: despegue, cinturón de asteroides, Júpiter y la gemela Pioneer 11.
// Uso: node pioneer_1.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, balloon, caption, panel, layer, pioneer, earth, stars, page, reseed } from "./lib.mjs";
import { rocket, flame, smoke } from "./kit-luna.mjs";
import { P10, P11, jupiter, asteroid } from "./kit-espacio.mjs";

reseed(307);
const ESPACIO = "#161036";

// ---------- viñeta 1: despega Pioneer 10 ----------
const v1 = panel("p1-v1", 42, 120, 398, 447,
  layer("cielo", 0.05, `<rect x="42" y="120" width="398" height="447" fill="#2A3F8A"/>
    <rect x="42" y="330" width="398" height="237" fill="#4E74C2"/>${stars(42, 120, 398, 200, 30)}`) +
  layer("cohete", 0.6, `${flame(240, 486, 40, 70)}${rocket(240, 480, 1.0)}
    <path d="M190 300 v40 M296 280 v50 M184 400 v34 M300 400 v30" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".7"/>`, "rise") +
  layer("humo", 0.8, `${smoke(56, 540, 370, 9, "#E6E0F2")}<rect x="42" y="540" width="398" height="27" fill="#E6E0F2"/>`, "fade-in") +
  layer("texto", 1, caption(56, 134, 370, 100)));

// ---------- viñeta 2: el cinturón de asteroides ----------
const rocks = [[500, 300, 26], [800, 270, 34], [560, 520, 40], [820, 470, 22], [760, 380, 14], [500, 420, 16], [640, 260, 12], [840, 560, 30], [470, 560, 18], [700, 540, 12]];
const v2 = panel("p1-v2", 455, 120, 398, 447,
  layer("espacio", 0.05, `<rect x="455" y="120" width="398" height="447" fill="${ESPACIO}"/>${stars(455, 120, 398, 447, 50)}`) +
  layer("asteroides-lejos", 0.2, rocks.slice(4).map(([x, y, r]) => asteroid(x, y, r, "#6E625C")).join("")) +
  layer("pioneer", 0.5, pioneer(676, 470, 0.85, P10), "drift") +
  layer("asteroides", 0.8, rocks.slice(0, 4).map(([x, y, r]) => asteroid(x, y, r)).join("")) +
  layer("texto", 1, caption(470, 134, 368, 86) + balloon(470, 236, 200, 52, 600, 1)));

// ---------- viñeta 3: Júpiter y la Gran Mancha Roja ----------
const v3 = panel("p1-v3", 42, 582, 812, 230,
  layer("espacio", 0.05, `<rect x="42" y="582" width="812" height="230" fill="${ESPACIO}"/>${stars(42, 582, 812, 230, 50)}`) +
  layer("jupiter", 0.2, jupiter("p1v3-jup", 700, 700, 230)) +
  layer("pioneer", 0.6, pioneer(470, 794, 0.55, P10), "drift") +
  layer("texto", 1, caption(58, 596, 350, 84) + balloon(420, 598, 230, 52, 470, -1)));

// ---------- viñeta 4: despega la gemela, Pioneer 11 ----------
const v4 = panel("p1-v4", 42, 828, 812, 318,
  layer("espacio", 0.05, `<rect x="42" y="828" width="812" height="318" fill="${ESPACIO}"/>${stars(42, 828, 812, 318, 70)}`) +
  layer("tierra", 0.2, earth(150, 1250, 210)) +
  layer("estela", 0.3, `<path d="M250 1060 C320 1000 400 1010 470 1040" fill="none" stroke="#B8A9FF" stroke-width="4" stroke-dasharray="4 10" stroke-linecap="round"/>`, "fade-in") +
  layer("pioneer11", 0.6, pioneer(510, 1070, 0.62, P11), "rise") +
  layer("pioneer10", 0.4, pioneer(770, 1010, 0.45, P10)) +
  layer("texto", 1, caption(58, 842, 360, 104) + balloon(430, 846, 240, 70, 490, 1) + balloon(684, 846, 156, 52, 756, 1)));

export const svg = page("Pioneer 10 y 11, página 1 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
