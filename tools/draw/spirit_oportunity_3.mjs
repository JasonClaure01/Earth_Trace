// Spirit y Opportunity — lámina 3: Spirit atrapado, Opportunity sigue, la tormenta, el legado.
// Uso: node spirit_oportunity_3.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, SPIRIT, OPPY, balloon, thought, caption, panel, layer, rover, earth, wavingArm, stars, pebbles, page, reseed, slot } from "./lib.mjs";

reseed(33);

// ---------- viñeta 1: Spirit atrapado en arena suave (2009–2010) ----------
const v1 = panel("p3-v1", 42, 120, 398, 320,
  layer("cielo", 0.05, `
    <rect x="42" y="120" width="398" height="320" fill="#F2A065"/>
    <path d="M42 300 C120 290 200 304 300 294 C360 288 400 296 440 292 V440 H42 Z" fill="#D97B4F"/>`) +
  layer("suelo", 0.3, `
    <path d="M42 330 C150 322 300 338 440 326 V440 H42 Z" fill="#C25A34"/>
    ${pebbles(50, 360, 380, 70, 10)}`) +
  layer("spirit", 0.6, rover(215, 430, 0.9, SPIRIT, { dusty: true, tired: true }) + `
    <path d="M86 422 C110 396 170 400 215 404 C270 400 320 396 346 422 L350 440 H82 Z" fill="#D98B5E" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M120 418 C150 410 180 414 200 412 M240 412 C270 410 300 414 320 420" fill="none" stroke="#B9683F" stroke-width="3" stroke-linecap="round"/>`, "shake-small") +
  layer("texto", 1, caption(58, 135, 366, 72) +
    thought(372, 262, 38, 270, 300, earth(372, 262, 24, true))));

// ---------- viñeta 2: Opportunity sigue explorando ----------
const ripples = (() => {
  let s = "";
  for (let i = 0; i < 9; i++) {
    const y = 315 + i * 14;
    s += `<path d="M455 ${y} C520 ${y - 6} 580 ${y + 6} 650 ${y} C720 ${y - 6} 790 ${y + 6} 853 ${y}" fill="none" stroke="#C5875B" stroke-width="2.5" opacity=".7"/>`;
  }
  return s;
})();
const v2 = panel("p3-v2", 455, 120, 398, 320,
  layer("cielo", 0.05, `
    <rect x="455" y="120" width="398" height="320" fill="#EBCDAE"/>
    <path d="M455 280 C540 270 640 284 740 276 C800 272 830 278 853 276 V440 H455 Z" fill="#DDB08A"/>`) +
  layer("suelo", 0.3, `<path d="M455 300 C560 294 700 306 853 298 V440 H455 Z" fill="#D59A6E"/>${ripples}`) +
  layer("opportunity", 0.7, rover(705, 425, 0.74, OPPY), "rise") +
  layer("texto", 1, balloon(468, 135, 372, 72, 650, -1)));

// ---------- viñeta 3: la tormenta de polvo (2018) ----------
const v3 = panel("p3-v3", 42, 452, 812, 340,
  layer("cielo", 0.05, `
    <rect x="42" y="452" width="812" height="340" fill="#4A2A1C"/>
    <circle cx="700" cy="530" r="34" fill="#E8B07A" opacity=".18"/>
    <rect x="42" y="452" width="812" height="340" fill="#6B3E28" opacity=".35"/>`) +
  layer("suelo", 0.3, `
    <path d="M42 735 C220 724 420 742 620 730 C720 724 800 734 854 730 V792 H42 Z" fill="#5E3422"/>
    <path d="M60 742 C120 736 180 738 220 742" fill="none" stroke="#7A4630" stroke-width="3" stroke-linecap="round"/>`) +
  layer("opportunity", 0.6, rover(590, 762, 0.82, OPPY, { dusty: true, tired: true, opacity: 0.55 }) + `
    <path d="M490 752 C540 735 640 735 690 752 L692 770 H488 Z" fill="#5E3422"/>`) +
  layer("polvo", 0.9, `<g fill="#B98A62">${Array.from({ length: 70 }, (_, i) =>
    `<circle cx="${50 + ((i * 113) % 795)}" cy="${460 + ((i * 71) % 325)}" r="${1 + (i % 4)}" opacity="${0.15 + (i % 5) * 0.07}"/>`).join("")}</g>
    <g stroke="#A27452" stroke-width="3" stroke-linecap="round" opacity=".35">
      <path d="M80 600 H220 M300 650 H470 M520 590 H700 M650 690 H820 M120 700 H260"/>
    </g>`, "drift") +
  layer("texto", 1, caption(58, 465, 372, 92, "#F6F1E6")));

// ---------- viñeta 4: el legado ----------
const v4 = panel("p3-v4", 42, 805, 812, 340,
  layer("cielo", 0.05, `<rect x="42" y="805" width="812" height="340" fill="#2B3352"/>${stars(42, 805, 812, 170, 45)}`) +
  layer("tierra", 0.15, earth(850, 880, 112) + earth(655, 880, 38, true) + wavingArm(622, 870, 1.1), "drift") +
  layer("montanas", 0.25, `
    <path d="M42 985 L160 960 L280 978 L420 952 L560 975 L700 955 L854 972 V1145 H42 Z" fill="#7A3324"/>
    <path d="M42 1010 C200 995 380 1016 560 1004 C700 996 790 1008 854 1004 V1145 H42 Z" fill="#9C4128"/>`) +
  layer("suelo", 0.4, `
    <path d="M42 1060 C220 1050 420 1068 620 1056 C720 1050 800 1060 854 1056 V1145 H42 Z" fill="#B0502F"/>
    ${pebbles(50, 1040, 790, 100, 14, "#6E2A16")}
    ${(slot("etiqueta", 166, 1099, 208, 28), "")}<g class="placa">
      <rect x="160" y="1094" width="220" height="38" rx="5" fill="#B79A7A" stroke="${INK}" stroke-width="3"/>
      <rect x="168" y="1101" width="204" height="24" rx="3" fill="none" stroke="#8F7558" stroke-width="2"/>
    </g>`) +
  layer("gemelos", 0.7, rover(270, 1080, 0.78, SPIRIT) + rover(600, 1092, 0.8, OPPY), "rise") +
  layer("texto", 1, caption(58, 820, 520, 92)));

export const svg = page("Spirit y Opportunity, página 3 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
