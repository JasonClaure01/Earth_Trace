// Apollo 11 — lámina 3: despegue de la Luna, reencuentro con el Columbia, reentrada y amerizaje.
// Uso: node apollo11_3.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, balloon, caption, panel, layer, eagle, earth, stars, page, reseed, slot } from "./lib.mjs";
import { moonGround, moonHills, moonBody, columbia, capsule, flame, ocean, ship, rescueHeli } from "./kit-luna.mjs";
import { parachute, tag } from "./kit.mjs";

reseed(239);

// ---------- viñeta 1: la etapa de ascenso despega ----------
const v1 = panel("p3-v1", 42, 120, 398, 447,
  layer("espacio", 0.05, `<rect x="42" y="120" width="398" height="447" fill="#1B2140"/>${stars(42, 120, 398, 330, 50)}`) +
  layer("horizonte", 0.2, moonHills(42, 398, 452, 50)) +
  layer("suelo", 0.3, moonGround(42, 498, 398, 69, 4)) +
  layer("bajo", 0.4, eagle(300, 552, 1.0, { part: "bajo" }) +
    `<g fill="#C9CCD6" opacity=".7"><ellipse cx="250" cy="470" rx="40" ry="12"/><ellipse cx="350" cy="466" rx="44" ry="12"/></g>`) +
  layer("alto", 0.7, `${flame(300, 356, 30, 80)}${eagle(300, 400, 0.85, { part: "alto" })}`, "rise") +
  layer("texto", 1, caption(56, 134, 370, 100) + balloon(56, 246, 190, 52, 200, 1)));

// ---------- viñeta 2: se acoplan al Columbia y pasan las muestras ----------
const v2 = panel("p3-v2", 455, 120, 398, 447,
  layer("espacio", 0.05, `<rect x="455" y="120" width="398" height="447" fill="#141A3A"/>${stars(455, 120, 398, 447, 50)}`) +
  layer("luna", 0.15, moonBody(560, 680, 230)) +
  layer("naves", 0.6, `${columbia(590, 372, 0.85, { flip: true })}
    <g transform="translate(${590 + 92 * 0.85 + 136 * 0.62} 372) rotate(-90)">${eagle(0, 0, 0.62, { part: "alto" })}</g>`, "drift") +
  layer("texto", 1, balloon(470, 236, 190, 50, 560, 1) + caption(470, 474, 368, 80)));

// ---------- viñeta 3: reentrada como una bola de fuego ----------
const v3 = panel("p3-v3", 42, 582, 812, 230,
  layer("espacio", 0.05, `<rect x="42" y="582" width="812" height="230" fill="#141A3A"/>${stars(42, 582, 812, 230, 40)}`) +
  layer("tierra", 0.2, earth(860, 1060, 330)) +
  layer("fuego", 0.5, `
    <path d="M590 720 L420 610 L470 690 L380 660 L520 760 Z" fill="#F6B24A" opacity=".9"/>
    <path d="M590 730 L470 660 L520 720 L450 708 L560 770 Z" fill="#FFE066"/>
    <path d="M440 640 l-30 -18 M420 690 l-40 -14 M480 600 l-24 -22" stroke="#F6B24A" stroke-width="4" stroke-linecap="round"/>`, "pulse-glow") +
  layer("capsula", 0.7, `<g transform="rotate(-50 600 742)">${capsule(600, 742, 0.95, { hot: true })}</g>`, "drift") +
  layer("texto", 1, caption(58, 596, 330, 104) + balloon(640, 596, 190, 50, 680, 1)));

// ---------- viñeta 4: amerizaje en el Pacífico ----------
const v4 = panel("p3-v4", 42, 828, 812, 318,
  layer("cielo", 0.05, `<rect x="42" y="828" width="812" height="318" fill="#8FD0F0"/>
    <g fill="#FFFFFF" opacity=".85"><ellipse cx="560" cy="980" rx="60" ry="16"/><ellipse cx="620" cy="972" rx="40" ry="14"/><ellipse cx="160" cy="900" rx="50" ry="14"/></g>`) +
  layer("barco", 0.3, ship(720, 1072, 0.85) + rescueHeli(610, 1000, 0.7)) +
  layer("mar", 0.4, ocean(42, 1070, 812, 76)) +
  layer("paracaidas", 0.6, `
    ${parachute(310, 900, 46, 1030, 10, "#E8743B")}${parachute(380, 878, 50, 1030, 10, "#E8743B")}${parachute(450, 900, 46, 1030, 10, "#E8743B")}
    ${capsule(380, 1074, 1.05)}
    <path d="M320 1100 q14 -14 28 0 M410 1100 q14 -14 28 0" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>`, "rise") +
  layer("efecto", 0.8, (slot("etiqueta", 168, 1040, 120, 32), tag(168, 1040, 120, 32)), "zoom-in") +
  layer("texto", 1, caption(500, 842, 338, 104)));

export const svg = page("Apollo 11, página 3 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
