// Ingenuity — lámina 1: un pasajero especial, el aire de Marte, cómo es Ingenuity, llegada a Jezero.
// Uso: node ingenuity_1.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, PERSE, balloon, caption, panel, layer, bot, heli, stars, pebbles, page, reseed, slot, hills } from "./lib.mjs";
import { tag, arcArrow } from "./kit.mjs";

reseed(73);

// Frasco de aire con moléculas.
const jar = (x, y, w, h, n, dotColor) => {
  let dots = "";
  for (let i = 0; i < n; i++) {
    const cx = x + 26 + ((i * 37) % (w - 44)), cy = y + 34 + ((i * 53) % (h - 50));
    dots += `<circle cx="${cx}" cy="${cy}" r="5" fill="${dotColor}" stroke="${INK}" stroke-width="1.5"/>`;
  }
  return `
    <rect x="${x + 10}" y="${y - 12}" width="${w - 20}" height="18" rx="4" fill="#B9B2A4" stroke="${INK}" stroke-width="3"/>
    <path d="M${x} ${y + 14} Q${x} ${y + 4} ${x + 10} ${y + 4} H${x + w - 10} Q${x + w} ${y + 4} ${x + w} ${y + 14} V${y + h - 12} Q${x + w} ${y + h} ${x + w - 12} ${y + h} H${x + 12} Q${x} ${y + h} ${x} ${y + h - 12} Z" fill="#EAF6FB" fill-opacity=".85" stroke="${INK}" stroke-width="3"/>
    ${dots}
    <path d="M${x + 12} ${y + 22} V${y + h - 22}" stroke="#FFF" stroke-width="5" stroke-linecap="round" opacity=".8"/>`;
};

// ---------- viñeta 1: viaje a Marte con Perseverance ----------
const v1 = panel("p1-v1", 42, 120, 398, 447,
  layer("espacio", 0.05, `<rect x="42" y="120" width="398" height="447" fill="#141A3A"/>${stars(42, 120, 398, 447, 60)}`) +
  layer("marte", 0.2, `
    <circle cx="440" cy="760" r="300" fill="#C4673E" stroke="${INK}" stroke-width="4"/>
    <path d="M200 600 C260 570 340 580 400 560 M260 680 C320 650 400 660 440 640" fill="none" stroke="#A3502C" stroke-width="12" stroke-linecap="round" opacity=".6"/>`) +
  layer("viajeros", 0.6, `
    <path d="M60 380 H110 M70 400 H120 M60 420 H104" stroke="#8FA3BF" stroke-width="4" stroke-linecap="round" opacity=".7"/>
    ${bot("rover", 160, 400, 0.9, PERSE)}
    <path d="M250 450 H286 M244 468 H280" stroke="#8FA3BF" stroke-width="4" stroke-linecap="round" opacity=".7"/>
    ${heli(340, 442, 0.55)}`, "drift") +
  layer("texto", 1, caption(56, 134, 370, 100) + balloon(254, 250, 172, 70, 342, -1)));

// ---------- viñeta 2: el aire de Marte es muy fino ----------
const v2 = panel("p1-v2", 455, 120, 398, 447,
  layer("fondo", 0.05, `<rect x="455" y="120" width="398" height="447" fill="#F3D9B8"/>`) +
  layer("frascos", 0.4, `
    ${jar(500, 236, 130, 120, 22, "#4E93C2")}
    ${jar(690, 236, 130, 120, 3, "#E0874E")}
    ${(slot("etiqueta", 505, 368, 120, 26), tag(505, 368, 120, 26, "#BFE3F5"))}
    ${(slot("etiqueta", 695, 368, 120, 26), tag(695, 368, 120, 26, "#F6C9A6"))}`, "zoom-in") +
  layer("suelo", 0.3, `<path d="M455 520 C560 510 700 524 853 514 V567 H455 Z" fill="#C4673E"/>`) +
  layer("ingenuity", 0.6, heli(690, 556, 0.44)) +
  layer("texto", 1, caption(470, 134, 368, 86) + balloon(470, 412, 196, 56, 640, 1)));

// ---------- viñeta 3: ligero y con dos hélices que giran al revés ----------
const v3 = panel("p1-v3", 42, 582, 812, 230,
  layer("fondo", 0.05, `
    <rect x="42" y="582" width="812" height="230" fill="#E7EEF4"/>
    <g stroke="#CBD8E3" stroke-width="1.5">${Array.from({ length: 20 }, (_, i) => `<path d="M${42 + i * 42} 582 V812"/>`).join("")}${Array.from({ length: 6 }, (_, i) => `<path d="M42 ${582 + i * 42} H854"/>`).join("")}</g>`) +
  layer("ingenuity", 0.5, heli(230, 800, 1.25), "zoom-in") +
  layer("flechas", 0.7, `
    ${arcArrow(230, 628, 118, 14, Math.PI * 1.15, Math.PI * 1.85, "#D24D57", 4)}
    ${arcArrow(230, 678, 118, 14, Math.PI * .85, Math.PI * .15, "#2F7FB8", 4)}`, "fade-in") +
  layer("bascula", 0.6, `
    <rect x="356" y="764" width="106" height="36" rx="8" fill="#5A5A5A" stroke="${INK}" stroke-width="3"/>
    ${(slot("etiqueta", 364, 770, 90, 24), tag(364, 770, 90, 24, "#BFE3F5"))}`) +
  layer("texto", 1, caption(480, 596, 358, 136)));

// ---------- viñeta 4: aterrizaje en Jezero; Perseverance deja a Ingenuity en el suelo ----------
const v4 = panel("p1-v4", 42, 828, 812, 318,
  layer("cielo", 0.05, `<rect x="42" y="828" width="812" height="318" fill="#EFB98E"/>`) +
  layer("crater", 0.2, `
    <path d="M42 990 L120 962 L210 980 L300 950 L380 972 L470 946 L560 970 L650 952 L740 974 L854 958 V1146 H42 Z" fill="#D58A60"/>
    ${hills(42, 812, 1030, 1146, "#C4673E", 8, 6)}`) +
  layer("suelo", 0.3, `
    <path d="M42 1080 C220 1068 420 1090 620 1076 C720 1070 800 1080 854 1074 V1146 H42 Z" fill="#B45A34"/>
    ${pebbles(50, 1086, 790, 56, 14)}`) +
  layer("perseverance", 0.5, bot("rover", 650, 1112, 1.1, PERSE)) +
  layer("ingenuity", 0.7, heli(430, 1112, 0.55), "rise") +
  layer("texto", 1, caption(58, 842, 410, 92) + balloon(530, 846, 290, 56, 640, 1) + balloon(306, 944, 220, 52, 430, -1)));

export const svg = page("Ingenuity, página 1 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
