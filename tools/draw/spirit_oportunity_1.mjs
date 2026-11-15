// Spirit y Opportunity — lámina 1: lanzamiento, gemelos, aterrizaje, llegada.
// Uso: node spirit_oportunity_1.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, SPIRIT, OPPY, balloon, caption, panel, layer, rover, stars, page } from "./lib.mjs";


// cohete apuntando hacia arriba en coordenadas locales (80 × 330), ancla en la base del motor
const rocket = (x, y, angle, s, color) => `
<g transform="translate(${x},${y}) rotate(${angle}) scale(${s}) translate(-40,-330)">
  <path d="M26 300 Q40 420 54 300 Z" fill="#FFB347"/><path d="M32 300 Q40 380 48 300 Z" fill="#FFE8A3"/>
  <path d="M14 250 L2 300 L22 290 Z M66 250 L78 300 L58 290 Z" fill="#C9CCD6" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="14" y="230" width="52" height="68" rx="4" fill="#DF7432" stroke="${INK}" stroke-width="3"/>
  <rect x="14" y="252" width="52" height="8" fill="#F3EFE6"/>
  <path d="M40 0 C70 30 78 80 78 120 V230 H2 V120 C2 80 10 30 40 0 Z" fill="#F3EFE6" stroke="${INK}" stroke-width="3"/>
  <path d="M40 22 C60 45 64 80 64 115 V200 H16 V115 C16 80 20 45 40 22 Z" fill="#5E7B8E" stroke="${INK}" stroke-width="2.5"/>
  ${rover(40, 190, 0.24, color)}
  <path d="M24 70 C28 50 34 40 40 34" fill="none" stroke="#FFFFFF" stroke-opacity=".55" stroke-width="5" stroke-linecap="round"/>
  <path d="M16 185 H64 V200 H16 Z" fill="#9FC3D3" stroke="${INK}" stroke-width="2"/>
</g>`;

const airbags = (cx, cy) => `
<g transform="translate(${cx},${cy})">
  <ellipse cx="0" cy="34" rx="62" ry="8" fill="#9E3A12" opacity=".45"/>
  ${[[-34, 4, 26], [32, -2, 28], [0, -16, 26], [-12, 14, 24], [18, 16, 24]].map(([x, y, r]) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="#F1E8D8" stroke="${INK}" stroke-width="2.5"/>
     <path d="M${x - r * 0.6} ${y - r * 0.3} Q${x} ${y + r * 0.3} ${x + r * 0.6} ${y - r * 0.3}" fill="none" stroke="#C9BBA3" stroke-width="2"/>`).join("")}
  <rect x="-18" y="2" width="36" height="20" rx="4" fill="#E07B39" stroke="${INK}" stroke-width="2.5"/>
</g>`;

// ---------- viñeta 1: lanzamiento (2003) ----------
const v1 = panel("p1-v1", 42, 120, 398, 447,
  layer("fondo", 0.1, `<rect x="42" y="120" width="398" height="447" fill="#33170F"/>${stars(42, 240, 398, 230, 40)}`) +
  layer("tierra", 0.3, `
    <circle cx="250" cy="700" r="250" fill="#8FD0F0" opacity=".35"/>
    <circle cx="250" cy="700" r="236" fill="#4E93C2" stroke="${INK}" stroke-width="3"/>
    <path d="M70 560 C110 520 170 520 190 545 C215 575 170 600 130 600 C100 600 70 590 70 560 Z" fill="#79B565"/>
    <path d="M300 490 C350 480 410 510 420 550 C380 560 340 540 300 530 C285 520 285 495 300 490 Z" fill="#79B565"/>
    <path d="M240 600 C270 590 300 610 290 640 C270 650 240 640 240 600 Z" fill="#79B565"/>
    <path d="M150 478 C200 462 300 462 350 478" fill="none" stroke="#FFFFFF" stroke-opacity=".5" stroke-width="6" stroke-linecap="round"/>`) +
  layer("cohetes", 0.7, rocket(130, 500, 28, 0.78, SPIRIT) + rocket(275, 480, 28, 0.78, OPPY), "rise") +
  layer("texto", 1, caption(60, 138, 364, 90)));

// ---------- viñeta 2: los gemelos en la cápsula ----------
const v2 = panel("p1-v2", 455, 120, 398, 447,
  layer("fondo", 0.1, `
    <rect x="455" y="120" width="398" height="447" fill="#4A5868"/>
    <path d="M470 560 V250 C470 150 560 120 655 120 C750 120 840 150 840 250 V560 Z" fill="#9AAEBF"/>
    <path d="M500 330 C500 210 560 150 640 140" fill="none" stroke="#FFFFFF" stroke-opacity=".45" stroke-width="14" stroke-linecap="round"/>
    <path d="M520 360 C520 300 535 260 560 230" fill="none" stroke="#FFFFFF" stroke-opacity=".3" stroke-width="7" stroke-linecap="round"/>`) +
  layer("plataforma", 0.3, `
    <rect x="455" y="440" width="398" height="127" fill="#D9DBE0"/>
    <path d="M560 470 V567 M745 470 V567" stroke="#B5B8C0" stroke-width="3"/>
    <circle cx="575" cy="520" r="2.5" fill="#8D9099"/><circle cx="725" cy="530" r="2.5" fill="#8D9099"/><circle cx="600" cy="545" r="2.5" fill="#8D9099"/>
    <rect x="765" y="505" width="66" height="36" rx="4" fill="#9C6B55" stroke="${INK}" stroke-width="2.5"/>
    <ellipse cx="655" cy="440" rx="215" ry="44" fill="#C3C7CF" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="655" cy="432" rx="190" ry="30" fill="#A7ACB6"/>`) +
  layer("gemelos", 0.7, rover(575, 458, 0.86, SPIRIT) + rover(737, 458, 0.86, OPPY), "zoom-in") +
  layer("texto", 1, balloon(468, 133, 178, 108, 548, -1) + balloon(658, 133, 188, 132, 768, -1)));

// ---------- viñeta 3: aterrizaje con bolsas de aire ----------
const v3 = panel("p1-v3", 42, 582, 812, 230,
  layer("fondo", 0.1, `
    <rect x="42" y="582" width="812" height="230" fill="#F0954F"/>
    <rect x="42" y="582" width="812" height="80" fill="#F5A865" opacity=".6"/>
    <circle cx="790" cy="618" r="16" fill="#FFE2B0" opacity=".8"/>`) +
  layer("suelo", 0.3, `
    <path d="M42 780 C180 760 300 772 430 765 C560 758 700 770 854 752 V812 H42 Z" fill="#C1440E"/>
    <path d="M520 790 C600 780 700 786 854 776 V812 H520 Z" fill="#A23810"/>
    <ellipse cx="300" cy="790" rx="26" ry="6" fill="#8E300C"/><ellipse cx="780" cy="770" rx="20" ry="5" fill="#8E300C"/>`) +
  layer("descenso", 0.6, `
    <path d="M424 600 L436 630" stroke="#FFD08A" stroke-width="10" stroke-linecap="round" opacity=".6"/>
    <g transform="translate(432,630) rotate(-15)">
      <path d="M-30 6 Q0 -22 30 6 Z" fill="#3C3A3E" stroke="${INK}" stroke-width="3"/>
      <rect x="-14" y="6" width="28" height="12" rx="3" fill="#6E6A70" stroke="${INK}" stroke-width="2.5"/>
      <path d="M-10 18 L-18 32 M10 18 L18 32" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    </g>
    <g transform="translate(578,640)">
      <path d="M-46 4 C-40 -40 40 -40 46 4 Z" fill="#E86A2C" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M-16 4 C-14 -30 14 -30 16 4 Z" fill="#FBF3E6"/>
      <path d="M-46 4 C-40 -40 40 -40 46 4" fill="none" stroke="${INK}" stroke-width="3"/>
      <path d="M-44 4 L62 64 M-16 4 L62 64 M16 4 L62 64 M44 4 L62 64" stroke="${INK}" stroke-width="1.6"/>
      <g transform="translate(62,64) rotate(25)">
        <path d="M-14 0 Q0 -14 14 0 Z" fill="#3C3A3E" stroke="${INK}" stroke-width="2.5"/>
        <rect x="-9" y="0" width="18" height="9" rx="2" fill="#6E6A70" stroke="${INK}" stroke-width="2"/>
      </g>
    </g>`, "drift") +
  layer("bolsas", 0.8, airbags(700, 742), "shake-small") +
  layer("texto", 1, caption(60, 598, 278, 105)));

// ---------- viñeta 4: ¡en Marte! ----------
const v4 = panel("p1-v4", 42, 828, 812, 318,
  layer("cielo", 0.05, `
    <rect x="42" y="828" width="812" height="318" fill="#F2B7A4"/>
    <path d="M42 870 C150 860 230 876 300 868 C250 884 120 890 42 884 Z" fill="#F8D2C4"/>
    <path d="M560 905 C650 895 760 902 854 896 V912 C760 916 650 914 560 905 Z" fill="#F8D2C4"/>`) +
  layer("montanas", 0.2, `
    <path d="M42 960 L140 930 L230 952 L330 920 L450 950 L560 925 L680 948 L780 930 L854 945 V1146 H42 Z" fill="#DC9682"/>
    <path d="M42 990 C160 960 260 985 380 972 C520 958 650 990 854 968 V1146 H42 Z" fill="#C86A4E"/>`) +
  layer("suelo", 0.4, `
    <path d="M42 1010 C200 995 420 1012 600 1000 C700 994 790 1004 854 998 V1146 H42 Z" fill="#B94F2D"/>
    <path d="M42 1080 C180 1068 300 1090 460 1078 C620 1066 740 1092 854 1080 V1146 H42 Z" fill="#9E3E22"/>
    <ellipse cx="170" cy="1068" rx="62" ry="22" fill="#EBC3A6" stroke="${INK}" stroke-width="3"/>
    <path d="M128 1066 C150 1056 190 1058 214 1068" fill="none" stroke="#C99474" stroke-width="3"/>
    <ellipse cx="275" cy="1050" rx="40" ry="14" fill="#E2B08E" stroke="${INK}" stroke-width="2.5"/>
    <ellipse cx="520" cy="1120" rx="16" ry="5" fill="#7E2F18"/><ellipse cx="800" cy="1060" rx="22" ry="6" fill="#7E2F18"/>
    <ellipse cx="90" cy="1120" rx="12" ry="4" fill="#7E2F18"/>
    ${rover(145, 970, 0.36, OPPY)}`) +
  layer("gemelos", 0.7, rover(390, 1120, 0.98, SPIRIT) + rover(690, 1126, 0.98, OPPY), "rise") +
  layer("texto", 1, balloon(355, 840, 146, 82, 400, -1) + balloon(633, 838, 204, 84, 712, -1)));

export const svg = page("Spirit y Opportunity, página 1 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
