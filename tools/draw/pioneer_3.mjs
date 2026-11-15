// Pioneer 10 y 11 — lámina 3: la última señal, sin energía, rumbo a las estrellas y el mensaje que sigue viajando.
// Uso: node pioneer_3.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, balloon, caption, panel, layer, pioneer, earth, stars, page, reseed, slot } from "./lib.mjs";
import { tag } from "./kit.mjs";
import { P10, P11, plaque, milkyWay, brightStar } from "./kit-espacio.mjs";

reseed(353);
const ESPACIO = "#0E0A26";

// ---------- viñeta 1: la última señal ----------
let ondas = "";
for (let i = 1; i <= 9; i++)
  ondas += `<path d="M${130 + i * 24} ${300 - i * 12} Q${144 + i * 24} ${330 - i * 6} ${130 + i * 24} ${360 - i * 0}" fill="none" stroke="#FFE066" stroke-width="3" stroke-linecap="round" opacity="${(1 - i * .09).toFixed(2)}" transform="rotate(-24 ${130 + i * 24} ${330})"/>`;
const v1 = panel("p3-v1", 42, 120, 398, 447,
  layer("espacio", 0.05, `<rect x="42" y="120" width="398" height="447" fill="${ESPACIO}"/>${stars(42, 120, 398, 447, 50)}`) +
  layer("tierra", 0.15, earth(390, 186, 24)) +
  layer("ondas", 0.4, ondas, "fade-in") +
  layer("pioneer", 0.6, pioneer(110, 372, 0.42, P10)) +
  layer("texto", 1, caption(56, 420, 370, 132)));

// ---------- viñeta 2: sin energía ----------
const medidor = (cx, cy, r) => `
  <path d="M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx - r * .5} ${cy - r * .87} L${cx} ${cy} Z" fill="#D24D57"/>
  <path d="M${cx - r * .5} ${cy - r * .87} A${r} ${r} 0 0 1 ${cx + r * .5} ${cy - r * .87} L${cx} ${cy} Z" fill="#FFE066"/>
  <path d="M${cx + r * .5} ${cy - r * .87} A${r} ${r} 0 0 1 ${cx + r} ${cy} L${cx} ${cy} Z" fill="#6EE7A0"/>
  <path d="M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy} Z" fill="none" stroke="${INK}" stroke-width="3"/>
  <path d="M${cx} ${cy} L${cx - r * .8} ${cy - r * .3}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="${cx}" cy="${cy}" r="5" fill="${INK}"/>`;
const v2 = panel("p3-v2", 455, 120, 398, 447,
  layer("espacio", 0.05, `<rect x="455" y="120" width="398" height="447" fill="${ESPACIO}"/>${stars(455, 120, 398, 447, 40)}`) +
  layer("pioneer", 0.5, pioneer(640, 530, 1.15, P10, { tired: true })) +
  layer("medidor", 0.7, `<rect x="740" y="420" width="96" height="62" rx="8" fill="#2A2350" stroke="${INK}" stroke-width="3"/>${medidor(788, 470, 34)}`, "pulse-glow") +
  layer("texto", 1, caption(470, 134, 368, 92) + balloon(470, 238, 230, 66, 590, 1)));

// ---------- viñeta 3: rumbo a las estrellas ----------
const aguila = [[740, 770], [770, 752], [800, 766], [786, 790], [756, 796]];
const v3 = panel("p3-v3", 42, 582, 812, 230,
  layer("espacio", 0.05, `<rect x="42" y="582" width="812" height="230" fill="${ESPACIO}"/>${stars(42, 582, 812, 230, 60)}`) +
  layer("estrellas", 0.2, brightStar(806, 640, 9) +
    `<path d="${aguila.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ")}" fill="none" stroke="#B8A9FF" stroke-width="1.5" stroke-dasharray="3 4"/>
    ${aguila.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#FFF6E6"/>`).join("")}`) +
  layer("rutas", 0.4, `
    <circle cx="470" cy="716" r="7" fill="#FFE066" stroke="${INK}" stroke-width="2"/>
    <path d="M478 712 L790 646" stroke="${P10}" stroke-width="3" stroke-dasharray="6 8" stroke-linecap="round"/>
    <path d="M478 722 L730 772" stroke="${P11}" stroke-width="3" stroke-dasharray="6 8" stroke-linecap="round"/>
    ${pioneer(600, 700, 0.22, P10)}${pioneer(590, 758, 0.22, P11)}`, "fade-in") +
  layer("etiquetas", 0.7, (slot("etiqueta", 662, 600, 130, 26), tag(662, 600, 130, 26, "#FFD9C2")) + (slot("etiqueta", 700, 704, 110, 26), tag(700, 704, 110, 26, "#DCD3FF")), "fade-in") +
  layer("texto", 1, caption(58, 596, 380, 202)));

// ---------- viñeta 4: un mensaje que sigue viajando ----------
const v4 = panel("p3-v4", 42, 828, 812, 318,
  layer("espacio", 0.05, `<rect x="42" y="828" width="812" height="318" fill="${ESPACIO}"/>${milkyWay(42, 828, 812, 318)}${stars(42, 828, 812, 318, 90)}`) +
  layer("pioneer", 0.5, pioneer(230, 1110, 0.95, P10)) +
  layer("placa", 0.7, `<g transform="rotate(-6 640 990)">${plaque(560, 930, 170, 106)}</g>
    <path d="M330 1040 Q440 1000 552 990" fill="none" stroke="#FFE066" stroke-width="3" stroke-dasharray="3 9" stroke-linecap="round"/>`, "zoom-in") +
  layer("final", 0.8, (slot("etiqueta", 360, 1080, 470, 44), tag(360, 1080, 470, 44, "#FFE066")), "fade-in") +
  layer("texto", 1, caption(58, 842, 450, 64)));

export const svg = page("Pioneer 10 y 11, página 3 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
