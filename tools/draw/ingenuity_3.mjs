// Ingenuity — lámina 3: explorador aéreo, 72 vuelos, la pala rota y la despedida.
// Uso: node ingenuity_3.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, PERSE, INGE, balloon, caption, panel, layer, bot, heli, pebbles, page, reseed, slot, hills } from "./lib.mjs";
import { tag, dust, sparkle } from "./kit.mjs";

reseed(97);

const ground = (x, y, w, h, c1 = "#C4673E", c2 = "#B45A34") => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c1}"/>
  <path d="M${x} ${y + h * .4} C${x + w * .3} ${y + h * .32} ${x + w * .6} ${y + h * .46} ${x + w} ${y + h * .36} V${y + h} H${x} Z" fill="${c2}"/>
  ${pebbles(x + 8, y + 8, w - 16, h - 14, Math.round(w / 34))}`;

// Ingenuity con una pala rota (sin usar el símbolo de palas completo).
const brokenHeli = (cx, by, s) => {
  const t = `translate(${cx},${by}) scale(${s}) translate(-100,-160)`;
  return `<g transform="${t}" color="${INGE}">
    <use href="#heli-base"/>
    <path d="M100 40 L10 34 Q6 37 10 40 Z M100 40 L190 34 Q194 37 190 40 Z" fill="#E9D9B8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M100 58 L60 61 L56 66 L50 60 L14 64 Q10 61 14 58 Z" fill="#E9D9B8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" transform="rotate(8 100 58)"/>
    <path d="M100 58 L150 61 L144 64 L100 63 Z" fill="#E9D9B8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <use href="#heli-cuerpo"/>
    <g transform="translate(100 96) scale(.72) translate(-100 -25)"><use href="#ojos-cansados"/></g>
  </g>`;
};

// ---------- viñeta 1: explorador desde el aire ----------
const v1 = panel("p3-v1", 42, 120, 398, 447,
  layer("cielo", 0.05, `<rect x="42" y="120" width="398" height="447" fill="#F2C49B"/>`) +
  layer("montanas", 0.15, `<path d="M42 420 L110 380 L170 404 L250 360 L330 398 L400 370 L440 384 V567 H42 Z" fill="#D9A07A"/>`) +
  layer("suelo", 0.3, `
    ${ground(42, 440, 398, 127)}
    <path d="M90 560 C140 520 200 510 240 488 C280 468 330 462 380 452" fill="none" stroke="#FFE9C4" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>
    <path d="M120 470 l30 -30 l26 22 z M300 500 l24 -26 l30 28 z" fill="#8E3F22" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`) +
  layer("perseverance", 0.4, bot("rover", 120, 548, 0.36, PERSE)) +
  layer("ingenuity", 0.7, heli(310, 370, 0.62, { spin: true }), "drift") +
  layer("texto", 1, caption(56, 134, 370, 100) + balloon(60, 256, 180, 62, 250, 1)));

// ---------- viñeta 2: 5 vuelos previstos, 72 logrados ----------
const v2 = panel("p3-v2", 455, 120, 398, 447,
  layer("fondo", 0.05, `
    <rect x="455" y="120" width="398" height="447" fill="#F3D9B8"/>
    <g stroke="#E2C29E" stroke-width="2">${[0, 1, 2, 3, 4].map(i => `<path d="M480 ${468 - i * 56} H830"/>`).join("")}</g>`) +
  layer("barras", 0.4, `
    <path d="M480 468 H830" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <rect x="525" y="450" width="70" height="18" rx="4" fill="#B9B2A4" stroke="${INK}" stroke-width="3"/>
    <rect x="705" y="262" width="70" height="206" rx="6" fill="${INGE}" stroke="${INK}" stroke-width="3"/>
    ${(slot("etiqueta", 494, 480, 132, 28), tag(494, 480, 132, 28, "#FBFAF7"))}
    ${(slot("etiqueta", 674, 480, 132, 28), tag(674, 480, 132, 28))}`, "rise") +
  layer("ingenuity", 0.7, `${heli(740, 260, 0.32, { spin: true })}${sparkle(806, 236, 10, "#FFE066")}${sparkle(682, 244, 7, "#FFE066")}`, "pulse-glow") +
  layer("texto", 1, caption(470, 134, 368, 64)));

// ---------- viñeta 3: enero de 2024, una pala rota ----------
const v3 = panel("p3-v3", 42, 582, 812, 230,
  layer("cielo", 0.05, `<rect x="42" y="582" width="812" height="230" fill="#E7B48E"/>`) +
  layer("horizonte", 0.2, hills(42, 812, 740, 812, "#CF8458", 6, 6)) +
  layer("suelo", 0.3, `${ground(42, 760, 812, 52)}
    <path d="M110 760 C160 740 220 742 260 760 Z M330 762 C360 748 400 750 420 762 Z" fill="#D9A27C"/>`) +
  layer("pala", 0.5, `<path d="M380 786 L420 782 L424 790 L384 792 Z" fill="#E9D9B8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" transform="rotate(-8 400 788)"/>
    ${dust(330, 760, 140, 30, 14, "#C98A5E")}`, "fade-in") +
  layer("ingenuity", 0.6, brokenHeli(250, 790, 0.9)) +
  layer("texto", 1, balloon(60, 588, 280, 52, 290, 1) + caption(450, 596, 388, 104)));

// ---------- viñeta 4: atardecer azul de Marte, despedida ----------
const v4 = panel("p3-v4", 42, 828, 812, 318,
  layer("cielo", 0.05, `
    <rect x="42" y="828" width="812" height="318" fill="#C98E6E"/>
    <rect x="42" y="960" width="812" height="120" fill="#D9A383" opacity=".8"/>
    <circle cx="760" cy="1050" r="70" fill="#A9D3F2" opacity=".35"/>
    <circle cx="760" cy="1050" r="34" fill="#E9F5FF" stroke="#BFE3F5" stroke-width="3"/>`) +
  layer("futuro", 0.2, `
    <g opacity=".45" stroke-dasharray="6 6">${heli(330, 1040, 0.3)}${heli(430, 990, 0.24)}</g>`, "fade-in") +
  layer("horizonte", 0.3, `<path d="M42 1068 C160 1050 300 1074 460 1060 C600 1048 720 1072 854 1062 V1146 H42 Z" fill="#8E4A33"/>
    <path d="M42 1100 C220 1090 420 1110 854 1094 V1146 H42 Z" fill="#743A28"/>`) +
  layer("ingenuity", 0.6, heli(600, 1118, 0.72), "rise") +
  layer("texto", 1, caption(58, 842, 420, 112) + balloon(500, 900, 250, 56, 600, 1)));

export const svg = page("Ingenuity, página 3 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
