// Ingenuity — lámina 2: la noche helada, el despegue, el primer vuelo y la foto de su sombra.
// Uso: node ingenuity_2.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, PERSE, balloon, caption, panel, layer, bot, heli, earth, stars, pebbles, page, reseed, slot, hills } from "./lib.mjs";
import { tag, polaroid, flakes, dust, armRight } from "./kit.mjs";

reseed(89);

const ground = (x, y, w, h, c1 = "#C4673E", c2 = "#B45A34") => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c1}"/>
  <path d="M${x} ${y + h * .4} C${x + w * .3} ${y + h * .32} ${x + w * .6} ${y + h * .46} ${x + w} ${y + h * .36} V${y + h} H${x} Z" fill="${c2}"/>
  ${pebbles(x + 8, y + 8, w - 16, h - 14, Math.round(w / 34))}`;

// Termómetro con poco líquido (frío).
const thermo = (x, y) => `
  <rect x="${x - 9}" y="${y}" width="18" height="110" rx="9" fill="#FBFAF7" stroke="${INK}" stroke-width="3"/>
  <circle cx="${x}" cy="${y + 118}" r="16" fill="#4E93C2" stroke="${INK}" stroke-width="3"/>
  <rect x="${x - 4}" y="${y + 84}" width="8" height="30" fill="#4E93C2"/>
  <path d="M${x + 9} ${y + 20} h8 M${x + 9} ${y + 40} h8 M${x + 9} ${y + 60} h8 M${x + 9} ${y + 80} h8" stroke="${INK}" stroke-width="2"/>`;

// ---------- viñeta 1: noche helada ----------
const v1 = panel("p2-v1", 42, 120, 398, 447,
  layer("cielo", 0.05, `
    <rect x="42" y="120" width="398" height="447" fill="#1E2550"/>
    ${stars(42, 240, 398, 230, 50)}
    <circle cx="380" cy="290" r="10" fill="#C9B9A6" stroke="${INK}" stroke-width="2"/>`) +
  layer("horizonte", 0.2, hills(42, 398, 470, 567, "#5B3A44", 6, 4)) +
  layer("suelo", 0.3, ground(42, 494, 398, 73, "#6E4048", "#5E3640")) +
  layer("escarcha", 0.5, flakes(60, 260, 360, 240, 26, "#CFE6F5"), "drift") +
  layer("ingenuity", 0.6, heli(210, 532, 0.92, { tired: false }) + `<path d="M118 470 l-12 -4 M118 484 l-14 2 M302 470 l12 -4 M302 484 l14 2" stroke="#CFE6F5" stroke-width="3" stroke-linecap="round"/>`, "shake-small") +
  layer("termometro", 0.7, thermo(380, 340)) +
  layer("texto", 1, caption(56, 134, 370, 100) + balloon(60, 268, 160, 58, 196, 1)));

// ---------- viñeta 2: despegue ----------
const v2 = panel("p2-v2", 455, 120, 398, 447,
  layer("cielo", 0.05, `<rect x="455" y="120" width="398" height="447" fill="#F0B183"/>`) +
  layer("horizonte", 0.2, hills(455, 398, 440, 567, "#D58055", 6, 4)) +
  layer("suelo", 0.3, ground(455, 462, 398, 105)) +
  layer("polvo", 0.5, `
    <g fill="#D9A27C" opacity=".75"><ellipse cx="560" cy="500" rx="60" ry="16"/><ellipse cx="750" cy="502" rx="64" ry="16"/><ellipse cx="654" cy="512" rx="120" ry="14"/></g>
    ${dust(500, 450, 300, 70, 30, "#C98A5E")}`, "drift") +
  layer("ingenuity", 0.6, heli(654, 488, 1.05, { spin: true }), "rise") +
  layer("texto", 1, caption(470, 134, 368, 70) + balloon(484, 220, 170, 54, 620, 1)));

// ---------- viñeta 3: primer vuelo, 3 metros ----------
const v3 = panel("p2-v3", 42, 582, 812, 230,
  layer("cielo", 0.05, `<rect x="42" y="582" width="812" height="230" fill="#F2BE92"/>`) +
  layer("horizonte", 0.2, hills(42, 812, 748, 812, "#D58055", 6, 6)) +
  layer("suelo", 0.3, ground(42, 768, 812, 44)) +
  layer("sombra", 0.4, `<ellipse cx="520" cy="790" rx="56" ry="8" fill="#5A2A18" opacity=".45"/>`) +
  layer("medida", 0.5, `
    <path d="M602 700 V786" stroke="${INK}" stroke-width="3" stroke-dasharray="6 5"/>
    <path d="M594 700 H610 M594 786 H610" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    ${(slot("etiqueta", 614, 730, 62, 26), tag(614, 730, 62, 26))}`, "fade-in") +
  layer("ingenuity", 0.6, heli(520, 708, 0.62, { spin: true }), "rise") +
  layer("perseverance", 0.5, bot("rover", 770, 800, 0.48, PERSE)) +
  layer("texto", 1, caption(58, 596, 380, 104) + balloon(690, 596, 150, 50, 770, 1)));

// ---------- viñeta 4: la Tierra celebra; foto de la sombra ----------
const shadowPhoto = `
  <rect x="80" y="860" width="260" height="200" fill="#C98A5E"/>
  ${pebbles(86, 870, 240, 160, 10, "#9C5A36")}
  <g fill="#3A2016" opacity=".7">
    <rect x="196" y="934" width="40" height="26" rx="4"/>
    <path d="M216 934 V914 M200 960 L182 990 M232 960 L250 990 M210 960 L204 990 M222 960 L228 990" stroke="#3A2016" stroke-width="5" stroke-linecap="round"/>
    <path d="M216 922 L140 916 Q136 920 140 924 Z M216 922 L292 916 Q296 920 292 924 Z"/>
  </g>`;
const v4 = panel("p2-v4", 42, 828, 812, 318,
  layer("espacio", 0.05, `<rect x="42" y="828" width="812" height="318" fill="#141A3A"/>${stars(42, 828, 812, 318, 70)}`) +
  layer("foto", 0.4, polaroid("p2v4-foto", 70, 850, 280, 260, -3, shadowPhoto), "zoom-in") +
  layer("tierra", 0.7, `
    ${earth(700, 990, 72, true)}${armRight(768, 968, 1.2)}
    <path d="M610 932 l-14 -10 M600 960 l-18 -2 M786 900 l10 -14" stroke="#FFE066" stroke-width="4" stroke-linecap="round"/>`, "rise") +
  layer("texto", 1, balloon(470, 842, 236, 54, 650, 1) + caption(386, 1068, 452, 64)));

export const svg = page("Ingenuity, página 2 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
