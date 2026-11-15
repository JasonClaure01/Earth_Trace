// Phoenix e InSight — lámina 1: Phoenix llega al Ártico de Marte y encuentra hielo de agua.
// Uso: node phoenix_insight_1.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, PHOENIX, balloon, caption, panel, layer, lander, earth, stars, pebbles, page, reseed, slot, hills } from "./lib.mjs";
import { parachute, icyGround, sparkle, polaroid, tag, roboArm, armRight } from "./kit.mjs";

reseed(31);

// ---------- viñeta 1: descenso en paracaídas sobre el Ártico ----------
const v1 = panel("p1-v1", 42, 120, 398, 447,
  layer("cielo", 0.05, `
    <rect x="42" y="120" width="398" height="447" fill="#EDBF93"/>
    <rect x="42" y="330" width="398" height="140" fill="#F3D2B0"/>`) +
  layer("horizonte", 0.2, hills(42, 398, 452, 567, "#D9A27C", 8, 5)) +
  layer("suelo", 0.3, icyGround(42, 480, 398, 90)) +
  layer("phoenix", 0.6, `
    ${parachute(340, 214, 64, 300, 30)}
    ${lander(340, 380, 0.5, PHOENIX)}
    <path d="M328 392 L324 412 M340 394 L340 420 M352 392 L356 412" stroke="#F6B24A" stroke-width="4" stroke-linecap="round" opacity=".8"/>`, "drift") +
  layer("texto", 1, caption(56, 134, 214, 108) + balloon(58, 262, 178, 76, 250, 1)));

// ---------- viñeta 2: abre sus paneles solares ----------
const v2 = panel("p1-v2", 455, 120, 398, 447,
  layer("cielo", 0.05, `
    <rect x="455" y="120" width="398" height="447" fill="#F2C9A2"/>
    <circle cx="790" cy="200" r="22" fill="#FFF3D6" opacity=".9"/>`) +
  layer("horizonte", 0.2, hills(455, 398, 400, 567, "#D69C78", 6, 4)) +
  layer("suelo", 0.3, icyGround(455, 420, 398, 150)) +
  layer("phoenix", 0.6, `
    ${roboArm([[712, 380], [778, 330], [818, 396]], PHOENIX, 20)}
    ${lander(654, 462, 1.2, PHOENIX)}`, "rise") +
  layer("texto", 1, balloon(512, 134, 230, 70, 650, 1) + caption(470, 486, 368, 70)));

// ---------- viñeta 3: el brazo cava y aparece algo blanco ----------
const v3 = panel("p1-v3", 42, 582, 812, 230,
  layer("cielo", 0.05, `<rect x="42" y="582" width="812" height="230" fill="#EFC7A0"/>`) +
  layer("horizonte", 0.2, hills(42, 812, 690, 812, "#D9A27C", 6, 6)) +
  layer("suelo", 0.3, icyGround(42, 712, 812, 100)) +
  layer("zanja", 0.5, `
    <path d="M440 768 Q520 752 610 766 Q616 790 600 796 Q520 806 452 796 Q436 788 440 768 Z" fill="#7A4A32" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M460 780 Q480 772 500 782 Q490 790 470 790 Z M520 776 Q548 768 570 778 Q556 788 530 788 Z" fill="#FBFAF7" stroke="#B8D4E0" stroke-width="2"/>
    ${pebbles(436, 796, 190, 12, 6, "#9C6A4E")}`) +
  layer("brillos", 0.6, sparkle(492, 764, 10) + sparkle(560, 760, 13) + sparkle(600, 782, 8), "pulse-glow") +
  layer("phoenix", 0.7, `
    ${roboArm([[240, 742], [380, 676], [520, 748]], PHOENIX, 10)}
    ${lander(200, 792, 0.8, PHOENIX)}`) +
  layer("texto", 1, balloon(232, 592, 196, 54, 240, -1) + caption(470, 596, 368, 76)));

// ---------- viñeta 4: días después el hielo desapareció; la Tierra confirma ----------
const trench = (x, y, chunks) => `
  <rect x="${x}" y="${y}" width="200" height="120" fill="#C98A5E"/>
  <path d="M${x} ${y + 30} H${x + 200} V${y + 120} H${x} Z" fill="#B97A50"/>
  <path d="M${x + 20} ${y + 50} Q${x + 100} ${y + 36} ${x + 180} ${y + 52} Q${x + 186} ${y + 92} ${x + 170} ${y + 100} Q${x + 100} ${y + 112} ${x + 26} ${y + 100} Q${x + 14} ${y + 80} ${x + 20} ${y + 50} Z" fill="#7A4A32"/>
  ${chunks.map(([cx, cy, r]) => `<path d="M${x + cx - r} ${y + cy} L${x + cx - r * .3} ${y + cy - r * .8} L${x + cx + r} ${y + cy - r * .3} L${x + cx + r * .6} ${y + cy + r * .6} Z" fill="#FBFAF7" stroke="#B8D4E0" stroke-width="2"/>`).join("")}`;
const v4 = panel("p1-v4", 42, 828, 812, 318,
  layer("espacio", 0.05, `
    <rect x="42" y="828" width="812" height="318" fill="#141A3A"/>
    ${stars(42, 828, 812, 318, 70)}`) +
  layer("fotos", 0.4, `
    ${polaroid("p1v4-foto1", 66, 940, 196, 180, -4, trench(76, 950, [[60, 70, 12], [100, 64, 9], [140, 76, 11], [84, 88, 7]]))}
    ${polaroid("p1v4-foto2", 296, 936, 196, 180, 3, trench(306, 946, [[140, 76, 6]]))}
    <path d="M266 1010 Q280 990 296 1004" fill="none" stroke="#FFE066" stroke-width="4" stroke-linecap="round"/>
    <path d="M286 996 L297 1005 L284 1012" fill="none" stroke="#FFE066" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    ${(slot("etiqueta", 100, 1092, 128, 22), tag(100, 1092, 128, 22))}
    ${(slot("etiqueta", 330, 1088, 128, 22), tag(330, 1088, 128, 22))}`, "fade-in") +
  layer("tierra", 0.7, earth(700, 1062, 70, true) + armRight(766, 1044, 1.2), "rise") +
  layer("texto", 1, caption(58, 842, 452, 82) + balloon(540, 848, 296, 74, 690, -1)));

export const svg = page("Phoenix e InSight, página 1 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
