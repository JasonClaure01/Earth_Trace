// Utilería del espacio profundo: planetas gigantes, asteroides, la placa de las Pioneer, Voyager, Vía Láctea.
import { INK, rnd } from "./lib.mjs";
import { eyes } from "./kit-luna.mjs";

export const P10 = "#E5B53B";
export const P11 = "#B8A9FF";

/** Júpiter con bandas y la Gran Mancha Roja. */
export const jupiter = (id, cx, cy, r) => {
  const bands = [["#E9D3B0", -1, -.62], ["#C9946A", -.62, -.42], ["#F1E2C6", -.42, -.18], ["#B97A55", -.18, .02], ["#F1E2C6", .02, .26], ["#C9946A", .26, .46], ["#E9D3B0", .46, 1]];
  return `<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
  <g clip-path="url(#${id})">${bands.map(([c, a, b]) => `<rect x="${cx - r}" y="${cy + a * r}" width="${2 * r}" height="${(b - a) * r}" fill="${c}"/>`).join("")}
    <ellipse cx="${cx + r * .3}" cy="${cy + r * .34}" rx="${r * .2}" ry="${r * .1}" fill="#C8553D" stroke="${INK}" stroke-width="2"/></g>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="4"/>`;
};

/** Saturno con anillos (la mitad trasera del anillo va detrás del planeta). */
export const saturn = (id, cx, cy, r, tilt = -14) => `<g transform="rotate(${tilt} ${cx} ${cy})">
  <path d="M${cx - r * 1.9} ${cy} A${r * 1.9} ${r * .42} 0 0 1 ${cx + r * 1.9} ${cy}" fill="none" stroke="#C9A06A" stroke-width="${r * .22}"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#EBC98E" stroke="${INK}" stroke-width="4"/>
  <clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
  <g clip-path="url(#${id})"><rect x="${cx - r}" y="${cy - r * .5}" width="${2 * r}" height="${r * .16}" fill="#D9A970"/><rect x="${cx - r}" y="${cy + r * .25}" width="${2 * r}" height="${r * .14}" fill="#D9A970"/></g>
  <path d="M${cx - r * 1.9} ${cy} A${r * 1.9} ${r * .42} 0 0 0 ${cx + r * 1.9} ${cy}" fill="none" stroke="#C9A06A" stroke-width="${r * .22}"/>
  <path d="M${cx - r * 1.9} ${cy} A${r * 1.9} ${r * .42} 0 0 0 ${cx + r * 1.9} ${cy}" fill="none" stroke="#F1DDB0" stroke-width="${r * .06}"/>
</g>`;

/** Asteroide irregular. */
export const asteroid = (cx, cy, r, fill = "#8A7A70") => {
  const n = 8, pts = [];
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, k = .75 + rnd() * .35; pts.push(`${(cx + Math.cos(a) * r * k).toFixed(1)},${(cy + Math.sin(a) * r * k * .85).toFixed(1)}`); }
  return `<polygon points="${pts.join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="${Math.max(2, r / 10)}" stroke-linejoin="round"/>
    <circle cx="${cx - r * .25}" cy="${cy - r * .1}" r="${r * .16}" fill="#6E5F57"/><circle cx="${cx + r * .3}" cy="${cy + r * .2}" r="${r * .1}" fill="#6E5F57"/>`;
};

/** Placa de las Pioneer: rectangular, de aluminio dorado, con grabados simplificados. (x, y) arriba-izquierda. */
export const plaque = (x, y, w, h) => {
  const L = `stroke="#6B4E1E" stroke-width="2.5" fill="none" stroke-linecap="round"`;
  const fx = x + w * .68, fy = y + h * .22;
  let pulsar = "";
  for (let i = 0; i < 9; i++) { const a = -2.6 + i * .52, len = h * (.14 + (i % 3) * .07); pulsar += `<path d="M${x + w * .28} ${y + h * .5} l${(Math.cos(a) * len).toFixed(1)} ${(Math.sin(a) * len).toFixed(1)}" ${L}/>`; }
  let planets = "";
  for (let i = 0; i < 10; i++) planets += `<circle cx="${x + w * .1 + i * w * .085}" cy="${y + h * .86}" r="${i === 0 ? 7 : 3 + (i > 4 && i < 7 ? 3 : 0)}" fill="#6B4E1E"/>`;
  return `<g>
    <rect x="${x + 6}" y="${y + 8}" width="${w}" height="${h}" rx="12" fill="#000" opacity=".25"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#E9C77A" stroke="${INK}" stroke-width="4"/>
    <rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" rx="8" fill="none" stroke="#F6DFA4" stroke-width="2"/>
    ${[[14, 14], [w - 14, 14], [14, h - 14], [w - 14, h - 14]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="5" fill="#B9B2A4" stroke="${INK}" stroke-width="2"/>`).join("")}
    <circle cx="${x + w * .1}" cy="${y + h * .18}" r="9" ${L}/><circle cx="${x + w * .18}" cy="${y + h * .18}" r="9" ${L}/><path d="M${x + w * .1} ${y + h * .18} H${x + w * .18}" ${L}/>
    ${pulsar}
    <path d="M${fx - 40} ${fy + 40} Q${fx - 10} ${fy - 30} ${fx + 50} ${fy + 30}" ${L} stroke-dasharray="4 6"/>
    <circle cx="${fx}" cy="${fy}" r="9" ${L}/><path d="M${fx} ${fy + 9} V${fy + 48} M${fx - 16} ${fy + 22} H${fx + 16} M${fx} ${fy + 48} L${fx - 10} ${fy + 74} M${fx} ${fy + 48} L${fx + 10} ${fy + 74}" ${L}/>
    <circle cx="${fx + 36}" cy="${fy + 6}" r="8" ${L}/><path d="M${fx + 36} ${fy + 14} V${fy + 50} M${fx + 22} ${fy + 26} H${fx + 50} M${fx + 36} ${fy + 50} L${fx + 28} ${fy + 72} M${fx + 36} ${fy + 50} L${fx + 44} ${fy + 72}" ${L}/>
    ${planets}
    <path d="M${x + w * .27} ${y + h * .86} q${w * .1} ${-h * .14} ${w * .3} ${-h * .1}" ${L}/>
    <path d="M${x + w * .57 - 8} ${y + h * .74} l8 2 l-6 6" ${L}/>
  </g>`;
};

/** Voyager 1 (simplificada): antena grande, cuerpo decagonal oscuro, brazo largo. Ancla abajo-centro (~220 × 150). */
export const voyager = (cx, by, s = 1, color = "#4FB3E8") => `<g transform="translate(${cx} ${by}) scale(${s}) translate(-110 -150)">
  <path d="M110 110 L10 140 M110 104 L216 30" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  <path d="M110 110 L10 140 M110 104 L216 30" stroke="#C9CCD6" stroke-width="1.5" stroke-linecap="round"/>
  <rect x="2" y="132" width="20" height="16" rx="4" fill="#8C8C8C" stroke="${INK}" stroke-width="2.5"/>
  <path d="M82 92 H138 L148 108 L138 124 H82 L72 108 Z" fill="#3A4150" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="84" y="118" width="52" height="8" fill="${color}" stroke="${INK}" stroke-width="2"/>
  <path d="M110 92 V80" stroke="${INK}" stroke-width="4"/>
  <ellipse cx="110" cy="54" rx="66" ry="28" fill="#F4F4F0" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="110" cy="54" rx="44" ry="18" fill="none" stroke="#D9D3C6" stroke-width="2"/>
  <path d="M110 54 V26" stroke="${INK}" stroke-width="2"/>
  ${eyes(110, 106, 6, 2.6)}
</g>`;

/** Banda difusa de la Vía Láctea en diagonal. */
export const milkyWay = (x, y, w, h) => {
  let s = "";
  for (let i = 0; i < 26; i++) {
    const t = i / 25, cx = x + t * w, cy = y + h - t * h + (rnd() - .5) * 60;
    s += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(50 + rnd() * 60).toFixed(1)}" ry="${(20 + rnd() * 26).toFixed(1)}" fill="${i % 3 ? "#5B4A9E" : "#8E7CC8"}" opacity="${(.18 + rnd() * .18).toFixed(2)}"/>`;
  }
  return s;
};

/** Estrella brillante con halo. */
export const brightStar = (cx, cy, r, color = "#FFB089") =>
  `<circle cx="${cx}" cy="${cy}" r="${r * 3}" fill="${color}" opacity=".18"/><circle cx="${cx}" cy="${cy}" r="${r * 1.8}" fill="${color}" opacity=".35"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFF6E6" stroke="${color}" stroke-width="2"/>`;
