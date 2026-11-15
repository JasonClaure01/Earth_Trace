// Phoenix e InSight — lámina 3: el invierno apaga a Phoenix, el polvo apaga a InSight, y su legado.
// Uso: node phoenix_insight_3.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, PHOENIX, INSIGHT, balloon, caption, panel, layer, lander, earth, stars, pebbles, page, reseed, hills } from "./lib.mjs";
import { icyGround, flakes, dust, armRight, sparkle } from "./kit.mjs";

reseed(59);

// Escarcha sobre los paneles y la cubierta de un lander dibujado con lander(cx, by, s).
const frost = (cx, by, s) => {
  const P = (x, y) => `${cx + (x - 100) * s} ${by + (y - 160) * s}`;
  return `<g fill="#FBFAF7" stroke="#B8D4E0" stroke-width="2" opacity=".92">
    <path d="M${P(-20, 92)} Q${P(22, 74)} ${P(64, 92)} L${P(56, 98)} Q${P(22, 88)} ${P(-14, 98)} Z"/>
    <path d="M${P(136, 92)} Q${P(178, 74)} ${P(220, 92)} L${P(214, 98)} Q${P(178, 88)} ${P(142, 98)} Z"/>
    <path d="M${P(48, 87)} Q${P(100, 78)} ${P(152, 87)} L${P(150, 92)} H${P(50, 92).split(" ")[0]} Z"/>
    <path d="M${P(66, 12)} Q${P(100, 0)} ${P(134, 12)} L${P(132, 16)} Q${P(100, 8)} ${P(68, 16)} Z"/>
  </g>`;
};
// Capa de polvo sobre los paneles.
const dustCover = (cx, by, s) => {
  const P = (x, y) => `${cx + (x - 100) * s} ${by + (y - 160) * s}`;
  return `<g fill="#B98A62" opacity=".8">
    <ellipse cx="${cx + (22 - 100) * s}" cy="${by + (94 - 160) * s}" rx="${40 * s}" ry="${12 * s}"/>
    <ellipse cx="${cx + (178 - 100) * s}" cy="${by + (94 - 160) * s}" rx="${40 * s}" ry="${12 * s}"/>
  </g>
  <path d="M${P(0, 90)} q6 -4 12 0 M${P(160, 88)} q8 -4 16 0" stroke="#8E6444" stroke-width="2" fill="none"/>`;
};

// ---------- viñeta 1: invierno en el Ártico, Phoenix cubierto de escarcha ----------
const v1 = panel("p3-v1", 42, 120, 398, 447,
  layer("cielo", 0.05, `
    <rect x="42" y="120" width="398" height="447" fill="#5A6C8E"/>
    <rect x="42" y="330" width="398" height="140" fill="#7E8CA8"/>
    <circle cx="90" cy="440" r="16" fill="#FFE9C4" opacity=".55"/>`) +
  layer("horizonte", 0.2, hills(42, 398, 440, 567, "#9AA6BC", 6, 4)) +
  layer("suelo", 0.3, icyGround(42, 462, 398, 105, "#EEF4F6", "#C3D2DA")) +
  layer("phoenix", 0.6, lander(240, 520, 1.05, PHOENIX, { tired: true }) + frost(240, 520, 1.05)) +
  layer("nieve", 0.9, flakes(42, 240, 398, 320, 50), "drift") +
  layer("texto", 1, caption(56, 134, 370, 108)));

// ---------- viñeta 2: polvo sobre los paneles de InSight ----------
const v2 = panel("p3-v2", 455, 120, 398, 447,
  layer("cielo", 0.05, `
    <rect x="455" y="120" width="398" height="447" fill="#D9A27C"/>
    <rect x="455" y="250" width="398" height="200" fill="#E2B48F" opacity=".7"/>`) +
  layer("horizonte", 0.2, hills(455, 398, 392, 567, "#C68057", 6, 4)) +
  layer("suelo", 0.3, `<rect x="455" y="414" width="398" height="153" fill="#B9653E"/>${pebbles(465, 430, 380, 60, 10)}`) +
  layer("insight", 0.6, lander(654, 470, 1.15, INSIGHT, { dish: true, tired: true }) + dustCover(654, 470, 1.15)) +
  layer("polvo", 0.9, dust(455, 220, 398, 260, 60, "#C9A684"), "drift") +
  layer("texto", 1, balloon(470, 134, 220, 70, 640, 1) + caption(470, 484, 368, 72)));

// ---------- viñeta 3: los dos exploradores, cada uno con su descubrimiento ----------
const v3 = panel("p3-v3", 42, 582, 812, 230,
  layer("cielo", 0.05, `
    <rect x="42" y="582" width="406" height="230" fill="#DDE6EE"/>
    <rect x="448" y="582" width="406" height="230" fill="#F0B183"/>`) +
  layer("suelo", 0.3, `
    ${icyGround(42, 752, 406, 60)}
    <rect x="448" y="752" width="406" height="60" fill="#C4673E"/>${pebbles(456, 760, 390, 44, 10)}
    <path d="M448 582 V812" stroke="${INK}" stroke-width="4"/>`) +
  layer("hielo", 0.45, `
    <path d="M330 770 L344 752 L366 760 L362 778 Z M376 778 L386 764 L402 772 Z" fill="#FBFAF7" stroke="#8FB8CC" stroke-width="2"/>
    ${sparkle(352, 748, 9)}`, "pulse-glow") +
  layer("ondas", 0.45, `
    <path d="M740 790 q10 -10 20 0 t20 0 t20 0" fill="none" stroke="#FFE066" stroke-width="4" stroke-linecap="round"/>
    <path d="M736 806 q12 -12 24 0 t24 0 t24 0" fill="none" stroke="#FFE066" stroke-width="3" stroke-linecap="round" opacity=".7"/>`, "pulse-glow") +
  layer("exploradores", 0.6, lander(230, 788, 0.8, PHOENIX) + lander(636, 788, 0.8, INSIGHT, { dish: true }), "rise") +
  layer("texto", 1, balloon(58, 594, 256, 52, 230, 1) + balloon(470, 594, 300, 52, 640, 1)));

// ---------- viñeta 4: la Tierra da las gracias ----------
const v4 = panel("p3-v4", 42, 828, 812, 318,
  layer("espacio", 0.05, `<rect x="42" y="828" width="812" height="318" fill="#141A3A"/>${stars(42, 828, 812, 318, 80)}`) +
  layer("marte", 0.3, `
    <circle cx="200" cy="1280" r="220" fill="#C4673E" stroke="${INK}" stroke-width="4"/>
    <ellipse cx="200" cy="1066" rx="60" ry="10" fill="#FBFAF7" opacity=".85"/>
    ${lander(150, 1074, 0.22, PHOENIX)}${lander(278, 1078, 0.22, INSIGHT, { dish: true })}`) +
  layer("tierra", 0.7, earth(680, 1030, 80, true) + armRight(752, 1010, 1.3), "rise") +
  layer("texto", 1, caption(58, 842, 440, 100) + balloon(506, 846, 250, 56, 660, 1)));

export const svg = page("Phoenix e InSight, página 3 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
