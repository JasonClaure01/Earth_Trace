// Pioneer 10 y 11 — lámina 2: Saturno, la placa con el mensaje, la órbita de Neptuno y el relevo de la Voyager 1.
// Uso: node pioneer_2.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, balloon, caption, panel, layer, pioneer, stars, page, reseed, slot } from "./lib.mjs";
import { tag } from "./kit.mjs";
import { P10, P11, saturn, plaque, voyager } from "./kit-espacio.mjs";

reseed(331);
const ESPACIO = "#161036";

// ---------- viñeta 1: Saturno de cerca ----------
const v1 = panel("p2-v1", 42, 120, 398, 447,
  layer("espacio", 0.05, `<rect x="42" y="120" width="398" height="447" fill="${ESPACIO}"/>${stars(42, 120, 398, 447, 50)}`) +
  layer("saturno", 0.2, saturn("p2v1-sat", 320, 440, 96)) +
  layer("pioneer", 0.6, pioneer(160, 500, 0.6, P11), "drift") +
  layer("texto", 1, caption(56, 134, 370, 92) + balloon(56, 238, 240, 60, 170, 1)));

// ---------- viñeta 2: la placa ----------
const v2 = panel("p2-v2", 455, 120, 398, 447,
  layer("espacio", 0.05, `<rect x="455" y="120" width="398" height="447" fill="${ESPACIO}"/>${stars(455, 120, 398, 447, 40)}`) +
  layer("sonda", 0.2, `<path d="M520 567 L560 500 H760 L800 567 Z" fill="${P10}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`) +
  layer("placa", 0.6, `<g transform="rotate(-3 654 360)">${plaque(494, 262, 320, 200)}</g>`, "zoom-in") +
  layer("texto", 1, caption(470, 134, 368, 108)));

// ---------- viñeta 3: cruza la órbita de Neptuno ----------
const orbit = (r, op) => `<circle cx="-260" cy="900" r="${r}" fill="none" stroke="#7FA7E0" stroke-width="2.5" opacity="${op}" stroke-dasharray="${r > 900 ? "0" : "6 8"}"/>`;
const v3 = panel("p2-v3", 42, 582, 812, 230,
  layer("espacio", 0.05, `<rect x="42" y="582" width="812" height="230" fill="${ESPACIO}"/>${stars(42, 582, 812, 230, 50)}`) +
  layer("orbitas", 0.2, orbit(640, .4) + orbit(780, .5) + orbit(960, .9) +
    `<circle cx="664" cy="660" r="30" fill="#5B8BE0" stroke="${INK}" stroke-width="3"/><path d="M640 652 Q664 644 690 654" fill="none" stroke="#8FB3F0" stroke-width="4"/>`) +
  layer("estela", 0.4, `<path d="M520 808 C600 790 650 780 720 760" fill="none" stroke="#FFE066" stroke-width="3" stroke-dasharray="3 10" stroke-linecap="round"/>`, "fade-in") +
  layer("pioneer", 0.6, pioneer(770, 790, 0.5, P10), "drift") +
  layer("etiqueta", 0.7, (slot("etiqueta", 604, 702, 120, 26), tag(604, 702, 120, 26, "#BFD3F5")), "fade-in") +
  layer("texto", 1, caption(58, 596, 420, 104)));

// ---------- viñeta 4: la Voyager 1 la adelanta ----------
const v4 = panel("p2-v4", 42, 828, 812, 318,
  layer("espacio", 0.05, `<rect x="42" y="828" width="812" height="318" fill="${ESPACIO}"/>${stars(42, 828, 812, 318, 70)}`) +
  layer("velocidad", 0.3, `<g stroke="#9FD8FF" stroke-width="4" stroke-linecap="round" opacity=".7"><path d="M440 1020 H560 M470 1050 H580 M430 1080 H560"/></g>`, "drift") +
  layer("voyager", 0.6, voyager(690, 1086, 0.62), "drift") +
  layer("pioneer", 0.5, pioneer(280, 1116, 0.7, P10)) +
  layer("texto", 1, caption(58, 842, 420, 84) + balloon(60, 934, 290, 52, 250, 1) + balloon(520, 842, 300, 50, 680, 1)));

export const svg = page("Pioneer 10 y 11, página 2 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
