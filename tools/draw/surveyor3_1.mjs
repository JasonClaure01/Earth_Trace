// Surveyor 3 — lámina 1: el laboratorio, el despegue, el viaje y el descenso al Océano de las Tormentas.
// Uso: node surveyor3_1.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, balloon, caption, panel, layer, surveyor, earth, stars, page, reseed } from "./lib.mjs";
import { moonGround, moonHills, moonBody, rocket, flame, smoke } from "./kit-luna.mjs";

reseed(103);

// ---------- viñeta 1: en el laboratorio ----------
const consola = (x, y) => `
  <rect x="${x}" y="${y}" width="120" height="96" rx="6" fill="#7F93AE" stroke="${INK}" stroke-width="3"/>
  <rect x="${x + 10}" y="${y + 10}" width="60" height="36" rx="4" fill="#1E2C3E" stroke="${INK}" stroke-width="2.5"/>
  <path d="M${x + 16} ${y + 34} l10 -10 l10 8 l10 -14 l10 10" fill="none" stroke="#6EE7A0" stroke-width="2.5" stroke-linecap="round"/>
  ${[0, 1, 2].map(i => `<circle cx="${x + 20 + i * 26}" cy="${y + 66}" r="8" fill="#E6E0D4" stroke="${INK}" stroke-width="2.5"/>`).join("")}
  <circle cx="${x + 94}" cy="${y + 22}" r="6" fill="#D24D57" stroke="${INK}" stroke-width="2"/>
  <circle cx="${x + 94}" cy="${y + 42}" r="6" fill="#FFE066" stroke="${INK}" stroke-width="2"/>`;
const v1 = panel("p1-v1", 42, 120, 398, 447,
  layer("pared", 0.05, `
    <rect x="42" y="120" width="398" height="447" fill="#BFD3E6"/>
    <rect x="42" y="120" width="398" height="34" fill="#E9F1F8"/>
    <g stroke="#A7BED6" stroke-width="3">${[0, 1, 2, 3].map(i => `<path d="M${90 + i * 100} 154 V470"/>`).join("")}</g>
    <rect x="300" y="250" width="110" height="80" rx="6" fill="#DDEAF5" stroke="#A7BED6" stroke-width="3"/>`) +
  layer("suelo", 0.2, `
    <rect x="42" y="470" width="398" height="97" fill="#8FA3BF"/>
    <g stroke="#7A8EAA" stroke-width="2">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${42 + i * 80} 470 L${12 + i * 100} 567"/>`).join("")}<path d="M42 510 H440"/></g>`) +
  layer("equipo", 0.4, consola(58, 384)) +
  layer("surveyor", 0.6, `
    <rect x="200" y="470" width="150" height="16" rx="4" fill="#5A6478" stroke="${INK}" stroke-width="3"/>
    <path d="M214 486 V530 M336 486 V530" stroke="${INK}" stroke-width="5"/>
    ${surveyor(270, 474, 1.15)}`, "rise") +
  layer("texto", 1, caption(56, 134, 370, 92) + balloon(56, 236, 220, 62, 220, 1)));

// ---------- viñeta 2: despegue desde Florida ----------
const torre = (x, y, h) => {
  let s = `<path d="M${x} ${y} V${y + h} M${x + 36} ${y} V${y + h}" stroke="${INK}" stroke-width="5"/>`;
  for (let i = 0; i < h / 30; i++) s += `<path d="M${x} ${y + i * 30} L${x + 36} ${y + i * 30 + 30} M${x + 36} ${y + i * 30} L${x} ${y + i * 30 + 30}" stroke="#D97B2C" stroke-width="3"/>`;
  return s + `<path d="M${x + 36} ${y + 40} H${x + 70} M${x + 36} ${y + 120} H${x + 70}" stroke="${INK}" stroke-width="5"/>`;
};
const v2 = panel("p1-v2", 455, 120, 398, 447,
  layer("cielo", 0.05, `
    <rect x="455" y="120" width="398" height="447" fill="#6FA8DC"/>
    <rect x="455" y="380" width="398" height="187" fill="#9CC4E8"/>`) +
  layer("torre", 0.3, torre(520, 250, 270)) +
  layer("cohete", 0.6, `
    ${flame(690, 470, 46, 80)}
    ${rocket(690, 470, 1.1)}
    <path d="M640 300 v40 M740 290 v50 M630 380 v30 M752 380 v34" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".8"/>`, "rise") +
  layer("humo", 0.8, `${smoke(470, 540, 370, 9)}<rect x="455" y="540" width="398" height="27" fill="#EDE7DD"/>`, "fade-in") +
  layer("texto", 1, caption(470, 134, 368, 70)));

// ---------- viñeta 3: viaje de la Tierra a la Luna ----------
const v3 = panel("p1-v3", 42, 582, 812, 230,
  layer("espacio", 0.05, `<rect x="42" y="582" width="812" height="230" fill="#141A3A"/>${stars(42, 582, 812, 230, 60)}`) +
  layer("astros", 0.2, earth(120, 772, 52) + moonBody(800, 730, 112)) +
  layer("ruta", 0.3, `<path d="M172 762 C320 820 520 820 690 742" fill="none" stroke="#FFE066" stroke-width="3" stroke-dasharray="3 12" stroke-linecap="round"/>`, "fade-in") +
  layer("surveyor", 0.6, `<g transform="rotate(8 430 760)">${surveyor(430, 806, 0.58)}</g>`, "drift") +
  layer("texto", 1, caption(58, 596, 330, 72) + balloon(400, 598, 230, 52, 420, 1)));

// ---------- viñeta 4: descenso con los motores de frenado ----------
const v4 = panel("p1-v4", 42, 828, 812, 318,
  layer("espacio", 0.05, `<rect x="42" y="828" width="812" height="318" fill="#1B2140"/>${stars(42, 828, 812, 200, 50)}`) +
  layer("montanas", 0.2, moonHills(42, 812, 1010, 70)) +
  layer("suelo", 0.3, moonGround(42, 1070, 812, 76, 7)) +
  layer("polvo", 0.5, `<g fill="#C9CCD6" opacity=".7"><ellipse cx="600" cy="1080" rx="120" ry="14"/><ellipse cx="520" cy="1072" rx="50" ry="10"/><ellipse cx="690" cy="1074" rx="56" ry="10"/></g>`, "fade-in") +
  layer("surveyor", 0.7, flame(600, 1006, 34, 50) + surveyor(600, 1040, 0.85), "rise") +
  layer("texto", 1, caption(58, 842, 380, 64) + balloon(450, 836, 290, 42, 590, 1)));

export const svg = page("Surveyor 3, página 1 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
