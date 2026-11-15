// Surveyor 3 — lámina 2: rebota al posarse, contacto con la Tierra, primeras fotos y la pala mecánica.
// Maquetación propia: viñeta ancha arriba (el rebote), dos altas y una ancha abajo.
// Uso: node surveyor3_2.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, balloon, caption, panel, layer, surveyor, earth, stars, page, reseed } from "./lib.mjs";
import { moonGround, moonHills, radioWaves } from "./kit-luna.mjs";
import { polaroid, roboArm } from "./kit.mjs";

reseed(127);

// ---------- viñeta 1: ¡rebota dos veces! ----------
const salto = (x0, x1, y, h) => `<path d="M${x0} ${y} Q${(x0 + x1) / 2} ${y - h} ${x1} ${y}" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="10 9" stroke-linecap="round"/>
  <path d="M${x1 - 14} ${y - 14} L${x1} ${y} L${x1 - 18} ${y + 2}" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
const v1 = panel("p2-v1", 42, 120, 812, 280,
  layer("espacio", 0.05, `<rect x="42" y="120" width="812" height="280" fill="#1B2140"/>${stars(42, 120, 812, 170, 50)}`) +
  layer("montanas", 0.2, moonHills(42, 812, 286, 60)) +
  layer("suelo", 0.3, moonGround(42, 340, 812, 60, 6)) +
  layer("polvo", 0.4, `<g fill="#C9CCD6" opacity=".6"><ellipse cx="170" cy="368" rx="70" ry="10"/><ellipse cx="440" cy="368" rx="60" ry="9"/></g>`) +
  layer("saltos", 0.5, salto(220, 400, 300, 120) + salto(480, 640, 300, 70), "fade-in") +
  layer("fantasmas", 0.6, surveyor(170, 372, 0.5, { opacity: ".35" }) + surveyor(440, 372, 0.5, { opacity: ".55" })) +
  layer("surveyor", 0.7, surveyor(720, 376, 0.62), "shake-small") +
  layer("texto", 1, caption(58, 134, 420, 84) + balloon(610, 140, 220, 48, 700, 1)));

// ---------- viñeta 2: en reposo; habla con la Tierra ----------
const v2 = panel("p2-v2", 42, 415, 398, 380,
  layer("espacio", 0.05, `<rect x="42" y="415" width="398" height="380" fill="#1B2140"/>${stars(42, 415, 398, 290, 40)}`) +
  layer("tierra", 0.15, earth(380, 562, 30, true)) +
  layer("montanas", 0.2, moonHills(42, 398, 662, 50)) +
  layer("suelo", 0.3, moonGround(42, 708, 398, 87, 4)) +
  layer("ondas", 0.5, radioWaves(288, 610, 3, "#FFE066", 1), "pulse-glow") +
  layer("surveyor", 0.6, surveyor(230, 770, 1.1), "rise") +
  layer("texto", 1, caption(56, 429, 370, 84) + balloon(56, 520, 196, 60, 200, 1)));

// ---------- viñeta 3: la cámara envía fotos ----------
const paisaje = `<rect x="660" y="500" width="190" height="140" fill="#1B2140"/>
  ${moonHills(660, 190, 560, 30, "#8E929E")}${moonGround(660, 588, 190, 60, 3)}`;
const v3 = panel("p2-v3", 455, 415, 398, 380,
  layer("espacio", 0.05, `<rect x="455" y="415" width="398" height="380" fill="#232A4F"/>${stars(455, 415, 398, 380, 40)}`) +
  layer("surveyor", 0.4, surveyor(560, 846, 1.6)) +
  layer("flash", 0.5, `<path d="M640 600 L672 586 M642 614 L680 614 M640 628 L672 642" stroke="#FFE066" stroke-width="4" stroke-linecap="round"/>`, "pulse-glow") +
  layer("foto", 0.7, polaroid("p2v3-foto", 650, 490, 190, 180, 5, paisaje), "zoom-in") +
  layer("texto", 1, caption(470, 429, 368, 52) + balloon(470, 494, 160, 44, 540, 1)));

// ---------- viñeta 4: la pala mecánica cava ----------
const v4 = panel("p2-v4", 42, 810, 812, 336,
  layer("espacio", 0.05, `<rect x="42" y="810" width="812" height="336" fill="#1B2140"/>${stars(42, 810, 812, 150, 40)}`) +
  layer("montanas", 0.2, moonHills(42, 812, 930, 60)) +
  layer("suelo", 0.3, moonGround(42, 980, 812, 166, 6)) +
  layer("zanja", 0.5, `
    <path d="M500 1066 Q560 1050 640 1062 Q648 1084 632 1092 Q560 1102 512 1092 Q496 1084 500 1066 Z" fill="#5E6270" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <g fill="#9A9EAA">${[0, 1, 2, 3, 4].map(i => `<circle cx="${650 + i * 10}" cy="${1060 - (i % 2) * 8}" r="${4 - i * .5}"/>`).join("")}</g>`) +
  layer("surveyor", 0.6, `${roboArm([[298, 1036], [420, 948], [540, 1052]], "#E5B53B", 15)}${surveyor(250, 1112, 1.3)}`, "rise") +
  layer("texto", 1, caption(440, 824, 398, 104) + balloon(56, 824, 236, 48, 220, 1)));

export const svg = page("Surveyor 3, página 2 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
