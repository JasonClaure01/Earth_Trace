// Phoenix e InSight — lámina 2: InSight llega, coloca su sismómetro, escucha martemotos y revela las capas de Marte.
// Uso: node phoenix_insight_2.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, INSIGHT, balloon, caption, panel, layer, lander, stars, pebbles, page, reseed, slot, hills } from "./lib.mjs";
import { parachute, tag, roboArm, dust } from "./kit.mjs";

reseed(47);

// Llanura de Elysium: suelo rojizo, liso, con piedrecitas.
const plain = (x, y, w, h) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#C4673E"/>
  <path d="M${x} ${y + h * .45} C${x + w * .3} ${y + h * .38} ${x + w * .6} ${y + h * .5} ${x + w} ${y + h * .42} V${y + h} H${x} Z" fill="#B45A34"/>
  ${pebbles(x + 6, y + 10, w - 12, h - 16, Math.round(w / 30), "#7E2F18")}`;

// Cúpula protectora del sismómetro.
const dome = (cx, by, r) => `
  <ellipse cx="${cx}" cy="${by}" rx="${r * 1.15}" ry="${r * .22}" fill="#7E2F18" opacity=".45"/>
  <path d="M${cx - r} ${by} A${r} ${r * .9} 0 0 1 ${cx + r} ${by} Z" fill="#E9E4DA" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M${cx - r * .7} ${by - r * .35} Q${cx} ${by - r * .55} ${cx + r * .7} ${by - r * .35}" fill="none" stroke="#B9B2A4" stroke-width="2"/>
  <path d="M${cx - r * .5} ${by - r * .6} Q${cx - r * .3} ${by - r * .78} ${cx - r * .05} ${by - r * .82}" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" opacity=".8"/>`;

// ---------- viñeta 1: InSight llega en paracaídas ----------
const v1 = panel("p2-v1", 42, 120, 398, 447,
  layer("cielo", 0.05, `
    <rect x="42" y="120" width="398" height="447" fill="#E89A62"/>
    <rect x="42" y="300" width="398" height="200" fill="#EFB385" opacity=".7"/>`) +
  layer("horizonte", 0.2, hills(42, 398, 462, 567, "#CF7A4E", 5, 4)) +
  layer("suelo", 0.3, plain(42, 486, 398, 81)) +
  layer("insight", 0.6, `
    ${parachute(150, 264, 64, 352, 30, "#D9534F")}
    ${lander(150, 432, 0.5, INSIGHT, { dish: true })}
    <path d="M138 444 L134 464 M150 446 L150 472 M162 444 L166 464" stroke="#F6B24A" stroke-width="4" stroke-linecap="round" opacity=".8"/>`, "drift") +
  layer("texto", 1, caption(56, 134, 370, 92) + balloon(236, 262, 190, 92, 248, -1)));

// ---------- viñeta 2: coloca el sismómetro con el brazo ----------
const v2 = panel("p2-v2", 455, 120, 398, 447,
  layer("cielo", 0.05, `<rect x="455" y="120" width="398" height="447" fill="#F0B183"/>`) +
  layer("horizonte", 0.2, hills(455, 398, 386, 567, "#D58055", 6, 4)) +
  layer("suelo", 0.3, plain(455, 410, 398, 160)) +
  layer("cable", 0.4, `<path d="M640 446 C700 476 740 470 790 452" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="1 0"/>`) +
  layer("cupula", 0.5, dome(792, 452, 36), "zoom-in") +
  layer("insight", 0.6, `
    ${roboArm([[652, 386], [722, 296], [790, 386]], INSIGHT, 0)}
    ${lander(590, 466, 1.1, INSIGHT, { dish: true })}`) +
  layer("texto", 1, balloon(470, 134, 220, 72, 590, 1) + caption(470, 484, 368, 70)));

// ---------- viñeta 3: ondas de un martemoto llegan desde el subsuelo ----------
let arcs = "";
for (let i = 1; i <= 5; i++)
  arcs += `<path d="M${640 - i * 50} 812 A${i * 50} ${i * 16} 0 0 1 ${640 + i * 50} 812" fill="none" stroke="#FFD7A8" stroke-width="${5 - i * .6}" stroke-dasharray="${i % 2 ? "0" : "10 8"}" opacity="${1 - i * .12}"/>`;
const v3 = panel("p2-v3", 42, 582, 812, 230,
  layer("cielo", 0.05, `<rect x="42" y="582" width="812" height="140" fill="#F0B183"/>`) +
  layer("subsuelo", 0.2, `
    <rect x="42" y="720" width="812" height="92" fill="#9E4A2A"/>
    <path d="M42 720 C200 714 400 726 854 716 V744 C500 752 300 740 42 748 Z" fill="#C4673E"/>
    <path d="M42 780 C220 772 420 790 854 776" fill="none" stroke="#7E3A20" stroke-width="3"/>`) +
  layer("ondas", 0.4, `${arcs}<circle cx="640" cy="812" r="10" fill="#FFE066" stroke="${INK}" stroke-width="2.5"/>`, "pulse-glow") +
  layer("insight", 0.6, `${dome(382, 722, 22)}${lander(300, 724, 0.62, INSIGHT, { dish: true })}
    <path d="M214 684 l-12 -8 M212 698 l-16 0 M386 684 l12 -8 M388 698 l16 0" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`, "shake-small") +
  layer("texto", 1, balloon(60, 594, 214, 48, 244, 1) + caption(430, 596, 408, 82)));

// ---------- viñeta 4: corte de Marte: corteza, manto y núcleo ----------
const CX = 330, CY = 1160;
const v4 = panel("p2-v4", 42, 828, 812, 318,
  layer("espacio", 0.05, `<rect x="42" y="828" width="812" height="318" fill="#141A3A"/>${stars(42, 828, 812, 318, 60)}`) +
  layer("planeta", 0.4, `
    <circle cx="${CX}" cy="${CY}" r="290" fill="#C4673E" stroke="${INK}" stroke-width="4"/>
    <circle cx="${CX}" cy="${CY}" r="270" fill="#E0874E"/>
    <circle cx="${CX}" cy="${CY}" r="240" fill="#EE9A57" opacity=".7"/>
    <circle cx="${CX}" cy="${CY}" r="160" fill="#F6C251" stroke="${INK}" stroke-width="3"/>
    <circle cx="${CX}" cy="${CY}" r="110" fill="#FBD978" opacity=".8"/>
    <circle cx="${CX}" cy="${CY}" r="270" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6" opacity=".6"/>
    ${lander(CX, CY - 288, 0.22, INSIGHT, { dish: true })}`, "zoom-in") +
  layer("etiquetas", 0.7, `
    <path d="M566 1012 L606 1000" stroke="#FFE066" stroke-width="3" stroke-linecap="round"/>
    ${(slot("etiqueta", 606, 984, 132, 30), tag(606, 984, 132, 30))}
    ${(slot("etiqueta", CX - 66, 930, 132, 30), tag(CX - 66, 930, 132, 30, "#FFF3D6"))}
    ${(slot("etiqueta", CX - 66, 1070, 132, 30), tag(CX - 66, 1070, 132, 30, "#FFF3D6"))}`, "fade-in") +
  layer("texto", 1, caption(556, 842, 282, 124)));

export const svg = page("Phoenix e InSight, página 2 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
