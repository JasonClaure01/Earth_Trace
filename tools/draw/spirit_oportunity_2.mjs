// Spirit y Opportunity — lámina 2: Opportunity y las rocas con agua, dos lugares, remolino de polvo, ¡años!
// Uso: node spirit_oportunity_2.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, SPIRIT, OPPY, balloon, caption, panel, layer, rover, pebbles, page, reseed, slot } from "./lib.mjs";

reseed(21);

// estratos: bandas horizontales recortadas por una forma
const strata = (id, shape, x, y, w, h, n) => {
  const cols = ["#E8BC92", "#C98458", "#DDA77A", "#B8714A", "#EFCB9F"];
  let bands = "";
  const bh = h / n;
  for (let i = 0; i < n; i++) {
    const yy = y + i * bh;
    bands += `<path d="M${x} ${yy + 4} C${x + w * .3} ${yy - 4} ${x + w * .6} ${yy + 8} ${x + w} ${yy} V${yy + bh + 6} H${x} Z" fill="${cols[i % cols.length]}"/>`;
  }
  return `<clipPath id="${id}"><path d="${shape}"/></clipPath>
    <g clip-path="url(#${id})">${bands}</g>
    <path d="${shape}" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
};

// ---------- viñeta 1: Spirit encuentra rocas formadas con agua ----------
const rockShape = "M58 525 C66 470 104 418 165 398 C228 384 272 430 292 498 C298 516 284 527 262 527 H72 Q56 527 58 525 Z";
const v1 = panel("p2-v1", 42, 120, 398, 447,
  layer("fondo", 0.1, `
    <rect x="42" y="120" width="398" height="447" fill="#EBA894"/>
    <path d="M42 230 C110 215 190 228 260 218 C330 210 390 222 440 216 V567 H42 Z" fill="#D98670"/>
    <path d="M42 270 C120 248 200 262 300 244 C360 236 400 250 440 244 V567 H42 Z" fill="#C2603F"/>
    <path d="M60 300 C120 290 170 320 200 360 M300 280 C340 300 380 300 430 290" fill="none" stroke="#A64B2E" stroke-width="4" stroke-linecap="round"/>`) +
  layer("suelo", 0.3, `
    <path d="M42 430 C150 418 300 438 440 425 V567 H42 Z" fill="#B4502E"/>
    ${pebbles(50, 470, 380, 90, 16)}`) +
  layer("roca", 0.5, strata("roca-p2v1", rockShape, 50, 390, 250, 140, 9)) +
  layer("brazo", 0.7, `
    <circle cx="420" cy="560" r="34" fill="#2E2826" stroke="${INK}" stroke-width="3"/><circle cx="420" cy="560" r="12" fill="#A9A9A9"/>
    <rect x="370" y="430" width="110" height="80" rx="10" fill="#F3EFE6" stroke="${INK}" stroke-width="3"/>
    <rect x="370" y="482" width="110" height="28" rx="6" fill="${OPPY}" stroke="${INK}" stroke-width="3"/>
    <path d="M385 445 L322 340 L248 376" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M385 445 L322 340 L248 376" fill="none" stroke="#D8D8D8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="385" cy="445" r="9" fill="${OPPY}" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="322" cy="340" r="9" fill="${OPPY}" stroke="${INK}" stroke-width="2.5"/>
    <g transform="translate(236,384) rotate(-30)">
      <rect x="-22" y="-16" width="44" height="32" rx="6" fill="#4A4F5C" stroke="${INK}" stroke-width="3"/>
      <circle cx="-8" cy="0" r="8" fill="#9FD6E8" stroke="${INK}" stroke-width="2"/>
      <rect x="6" y="-8" width="12" height="16" rx="2" fill="#8C8C8C" stroke="${INK}" stroke-width="2"/>
    </g>`) +
  layer("lupa", 0.9, `
    <path d="M412 300 L438 336" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
    <path d="M412 300 L438 336" stroke="#5A5A5A" stroke-width="8" stroke-linecap="round"/>
    ${strata("lupa-p2v1", "M382 218 A46 46 0 1 1 381.9 218 Z", 332, 212, 104, 104, 7)}
    <circle cx="382" cy="264" r="46" fill="none" stroke="#5A5A5A" stroke-width="7"/>
    <path d="M356 242 Q364 228 380 224" fill="none" stroke="#FFF" stroke-opacity=".6" stroke-width="5" stroke-linecap="round"/>`, "zoom-in") +
  layer("texto", 1, caption(60, 135, 364, 70)));

// ---------- viñeta 2: cada uno en su lado del planeta ----------
const v2 = panel("p2-v2", 455, 120, 398, 447,
  layer("cielo", 0.05, `
    <rect x="455" y="120" width="398" height="447" fill="#F0A061"/>
    <path d="M455 290 C540 280 620 296 700 286 C770 278 820 290 853 284 V567 H455 Z" fill="#DD8456"/>`) +
  layer("suelo", 0.3, `
    <path d="M455 320 C560 312 700 326 853 316 V567 H455 Z" fill="#C9663F"/>
    <path d="M705 352 L853 352 L853 567 L538 567 Z" fill="#AE4C2C" stroke="#F3C9A6" stroke-width="3" stroke-linejoin="round"/>
    ${pebbles(470, 360, 210, 120, 9)}${pebbles(640, 400, 200, 150, 9, "#7E2F18")}
    <path d="M785 330 l10 -6 l10 6 z" fill="#5A3A30"/>`) +
  layer("spirit", 0.5, rover(548, 410, 0.62, SPIRIT), "rise") +
  layer("opportunity", 0.7, rover(752, 548, 0.92, OPPY), "rise") +
  layer("texto", 1, balloon(468, 133, 162, 100, 552, -1) + balloon(666, 160, 174, 108, 760, -1)));

// ---------- viñeta 3: remolino de polvo, paneles sucios ----------
const devil = (() => {
  let s = "";
  for (let i = 0; i < 9; i++) {
    const y = 600 + i * 20, w = 70 - i * 7;
    s += `<ellipse cx="${400 + Math.sin(i) * 8}" cy="${y}" rx="${w}" ry="${10 - i * 0.6}" fill="#A9876A" opacity="${0.4 + i * 0.04}"/>`;
  }
  return s + `<path d="M350 610 C380 620 430 615 450 605 M362 650 C390 658 420 655 438 646 M376 690 C392 696 410 694 420 688" fill="none" stroke="#9C7E64" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
})();
const v3 = panel("p2-v3", 42, 582, 812, 230,
  layer("cielo", 0.05, `
    <rect x="42" y="582" width="812" height="230" fill="#E6D4BA"/>
    <rect x="42" y="680" width="812" height="40" fill="#D9BC9C" opacity=".6"/>`) +
  layer("suelo", 0.3, `
    <path d="M42 715 C200 700 400 720 600 705 C700 700 800 712 854 706 V812 H42 Z" fill="#C27A55"/>
    <path d="M42 760 C220 748 420 770 854 752 V812 H42 Z" fill="#AA6440"/>
    ${pebbles(60, 760, 760, 40, 10, "#7C4128")}`) +
  layer("remolino", 0.5, devil, "drift") +
  layer("spirit", 0.8, rover(650, 840, 1.05, SPIRIT, { dusty: true, tired: true })) +
  layer("polvo", 0.9, `<g fill="#C9A684" opacity=".35">${Array.from({ length: 30 }, (_, i) =>
    `<circle cx="${60 + ((i * 97) % 780)}" cy="${600 + ((i * 53) % 200)}" r="${1.5 + (i % 3)}"/>`).join("")}</g>`, "drift") +
  layer("texto", 1, balloon(62, 598, 272, 84, 196, -1)));

// ---------- viñeta 4: 90 días que se volvieron años ----------
const calendar = (x, y) => {
  let marks = "";
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
    const cx = x + 18 + c * 22, cy = y + 48 + r * 16;
    marks += `<path d="M${cx - 5} ${cy - 5} L${cx + 5} ${cy + 5} M${cx + 5} ${cy - 5} L${cx - 5} ${cy + 5}" stroke="#C0392B" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  slot("etiqueta", x + 12, y + 108, 110, 24);
  return `<g transform="rotate(-4 ${x + 66} ${y + 70})">
    <rect x="${x + 10}" y="${y + 10}" width="134" height="138" rx="8" fill="#E9E1D3" stroke="${INK}" stroke-width="2.5"/>
    <rect x="${x + 5}" y="${y + 5}" width="134" height="138" rx="8" fill="#F1EBDF" stroke="${INK}" stroke-width="2.5"/>
    <rect x="${x}" y="${y}" width="134" height="138" rx="8" fill="#FBFAF7" stroke="${INK}" stroke-width="3"/>
    <path d="M${x} ${y + 30} V${y + 8} Q${x} ${y} ${x + 8} ${y} H${x + 126} Q${x + 134} ${y} ${x + 134} ${y + 8} V${y + 30} Z" fill="#D8553A" stroke="${INK}" stroke-width="3"/>
    <rect x="${x + 30}" y="${y - 10}" width="8" height="22" rx="4" fill="#5A5A5A" stroke="${INK}" stroke-width="2"/>
    <rect x="${x + 96}" y="${y - 10}" width="8" height="22" rx="4" fill="#5A5A5A" stroke="${INK}" stroke-width="2"/>
    ${marks}
    <rect class="etiqueta" x="${x + 12}" y="${y + 110}" width="110" height="20" rx="4" fill="#FFE066" stroke="${INK}" stroke-width="2"/>
  </g>`;
};
const v4 = panel("p2-v4", 42, 828, 812, 318,
  layer("cielo", 0.05, `
    <rect x="42" y="828" width="812" height="318" fill="#F2B7A4"/>
    <path d="M560 900 C650 888 760 896 854 890 V906 C760 912 650 910 560 900 Z" fill="#F8D2C4"/>`) +
  layer("montanas", 0.2, `
    <path d="M42 975 L150 950 L260 970 L380 945 L500 968 L620 940 L740 962 L854 950 V1146 H42 Z" fill="#DC9682"/>
    <path d="M42 1000 C180 980 300 1004 440 992 C580 980 700 1006 854 990 V1146 H42 Z" fill="#C86A4E"/>`) +
  layer("suelo", 0.4, `
    <path d="M42 1030 C220 1016 420 1036 620 1022 C720 1016 800 1026 854 1020 V1146 H42 Z" fill="#B94F2D"/>
    <path d="M42 1095 C200 1085 360 1104 520 1092 C660 1082 760 1100 854 1094 V1146 H42 Z" fill="#9E3E22"/>
    ${pebbles(50, 1040, 790, 100, 14)}
    ${rover(130, 1050, 0.3, SPIRIT)}${rover(790, 1022, 0.24, OPPY)}`) +
  layer("calendario", 0.6, calendar(405, 852), "pulse-glow") +
  layer("gemelos", 0.8, rover(285, 1118, 0.78, SPIRIT) + rover(675, 1128, 0.86, OPPY), "rise") +
  layer("texto", 1, caption(58, 842, 322, 110)));

export const svg = page("Spirit y Opportunity, página 2 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
