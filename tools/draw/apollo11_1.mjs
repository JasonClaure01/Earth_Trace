// Apollo 11 — lámina 1: la tripulación, el despegue del Saturno V, la órbita lunar y la separación del Eagle.
// Uso: node apollo11_1.mjs <salida.svg>
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { INK, balloon, caption, panel, layer, eagle, earth, stars, page, reseed } from "./lib.mjs";
import { astronaut, moonGround, moonHills, moonBody, saturnV, columbia, flame, smoke } from "./kit-luna.mjs";

reseed(211);

const lattice = (x, y, h) => {
  let s = `<path d="M${x} ${y} V${y + h} M${x + 34} ${y} V${y + h}" stroke="${INK}" stroke-width="5"/>`;
  for (let i = 0; i < h / 30; i++) s += `<path d="M${x} ${y + i * 30} L${x + 34} ${y + i * 30 + 30} M${x + 34} ${y + i * 30} L${x} ${y + i * 30 + 30}" stroke="#D97B2C" stroke-width="3"/>`;
  return s + `<path d="M${x} ${y + 60} H${x - 30} M${x} ${y + 150} H${x - 30}" stroke="${INK}" stroke-width="5"/>`;
};

// Eagle acoplado al morro del Columbia (girado 90°). (nx, ny) = morro del Columbia mirando a la derecha.
export const docked = (nx, ny, s) => `<g transform="translate(${nx + 136 * s} ${ny}) rotate(-90)">${eagle(0, 0, s)}</g>`;

// ---------- viñeta 1: la tripulación ----------
const v1 = panel("p1-v1", 42, 120, 398, 447,
  layer("pared", 0.05, `
    <rect x="42" y="120" width="398" height="447" fill="#3E6FA8"/>
    <g stroke="#5A88BE" stroke-width="3">${[0, 1, 2, 3].map(i => `<path d="M${80 + i * 100} 120 V480"/>`).join("")}</g>
    <rect x="270" y="252" width="150" height="120" rx="8" fill="#9CC4E8" stroke="${INK}" stroke-width="4"/>
    ${saturnV(345, 366, 0.33)}
    <path d="M270 312 H420 M345 252 V372" stroke="${INK}" stroke-width="3"/>`) +
  layer("suelo", 0.2, `<rect x="42" y="480" width="398" height="87" fill="#2E5486"/><path d="M42 480 H440" stroke="${INK}" stroke-width="3"/>`) +
  layer("tripulacion", 0.6, astronaut(120, 548, 1.18) + astronaut(330, 548, 1.18) + astronaut(225, 556, 1.3, { wave: true }), "rise") +
  layer("texto", 1, caption(56, 134, 370, 100)));

// ---------- viñeta 2: despega el Saturno V ----------
const v2 = panel("p1-v2", 455, 120, 398, 447,
  layer("cielo", 0.05, `<rect x="455" y="120" width="398" height="447" fill="#5E9BD6"/><rect x="455" y="400" width="398" height="167" fill="#8CBBE6"/>`) +
  layer("torre", 0.3, lattice(806, 230, 300)) +
  layer("cohete", 0.6, `${flame(744, 506, 60, 70)}${saturnV(744, 500, 1.0)}
    <path d="M684 300 v44 M800 270 v40 M690 410 v34" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".8"/>`, "rise") +
  layer("humo", 0.8, `${smoke(470, 548, 370, 9, "#F3D9B8")}<rect x="455" y="548" width="398" height="19" fill="#F3D9B8"/>`, "fade-in") +
  layer("texto", 1, caption(470, 134, 196, 180)));

// ---------- viñeta 3: rumbo a la Luna y órbita lunar ----------
const v3 = panel("p1-v3", 42, 582, 812, 230,
  layer("espacio", 0.05, `<rect x="42" y="582" width="812" height="230" fill="#141A3A"/>${stars(42, 582, 812, 230, 60)}`) +
  layer("luna", 0.2, `${moonBody(740, 900, 250)}
    <ellipse cx="740" cy="900" rx="330" ry="210" fill="none" stroke="#FFE066" stroke-width="3" stroke-dasharray="3 12" stroke-linecap="round"/>`) +
  layer("tierra", 0.15, earth(96, 790, 40)) +
  layer("naves", 0.6, columbia(260, 742, 0.75, { flip: true }) + docked(260 + 92 * 0.75, 742, 0.55), "drift") +
  layer("texto", 1, caption(58, 596, 430, 76)));

// ---------- viñeta 4: el Eagle se separa y baja; el Columbia se queda ----------
const v4 = panel("p1-v4", 42, 828, 812, 318,
  layer("espacio", 0.05, `<rect x="42" y="828" width="812" height="318" fill="#1B2140"/>${stars(42, 828, 812, 240, 60)}`) +
  layer("horizonte", 0.2, moonHills(42, 812, 1080, 40) + moonGround(42, 1116, 812, 30, 3)) +
  layer("columbia", 0.4, columbia(230, 1004, 0.7, { flip: true })) +
  layer("eagle", 0.7, `${flame(600, 1082, 30, 40)}${eagle(600, 1096, 0.62)}`, "rise") +
  layer("texto", 1, caption(440, 842, 398, 84) + balloon(60, 846, 300, 56, 230, 1) + balloon(470, 926, 240, 46, 584, 1)));

export const svg = page("Apollo 11, página 1 (arte sin texto)", [v1, v2, v3, v4]);
if (import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2]) fs.writeFileSync(process.argv[2], svg);
