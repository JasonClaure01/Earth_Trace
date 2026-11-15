// Utilería común para las historias de Phoenix-InSight e Ingenuity.
import { INK, rnd } from "./lib.mjs";

/** Paracaídas con franjas; las cuerdas bajan hasta (cx ± spread, ly). */
export const parachute = (cx, cy, r, ly, spread = 22, c1 = "#E8743B", c2 = "#FBFAF7") => {
  const n = 6;
  let stripes = "";
  for (let i = 0; i < n; i++) {
    const a0 = Math.PI + (i / n) * Math.PI, a1 = Math.PI + ((i + 1) / n) * Math.PI;
    stripes += `<path d="M${cx} ${cy} L${cx + r * Math.cos(a0)} ${cy + r * 0.55 * Math.sin(a0)} A${r} ${r * 0.55} 0 0 1 ${cx + r * Math.cos(a1)} ${cy + r * 0.55 * Math.sin(a1)} Z" fill="${i % 2 ? c2 : c1}"/>`;
  }
  return `<g>
    <path d="M${cx - r} ${cy} L${cx - spread} ${ly} M${cx - r * .4} ${cy + 4} L${cx - spread * .4} ${ly} M${cx + r * .4} ${cy + 4} L${cx + spread * .4} ${ly} M${cx + r} ${cy} L${cx + spread} ${ly}" stroke="${INK}" stroke-width="1.5" opacity=".8"/>
    ${stripes}
    <path d="M${cx - r} ${cy} A${r} ${r * 0.55} 0 0 1 ${cx + r} ${cy} Q${cx} ${cy + r * .14} ${cx - r} ${cy} Z" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  </g>`;
};

/** Suelo helado del Ártico marciano: losas poligonales. */
export const icyGround = (x, y, w, h, base = "#E4ECEF", line = "#AFC0C9") => {
  let cracks = "";
  const cols = Math.ceil(w / 70), rows = Math.ceil(h / 26);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const px = x + c * 70 + (r % 2) * 35 + rnd() * 10, py = y + 10 + r * 26 + rnd() * 6;
    const sx = 26 + r * 6;
    cracks += `<path d="M${px - sx} ${py} L${px - sx * .4} ${py - 6} L${px + sx * .5} ${py - 5} L${px + sx} ${py + 2} L${px + sx * .3} ${py + 8} L${px - sx * .6} ${py + 7} Z" fill="none" stroke="${line}" stroke-width="2" stroke-linejoin="round"/>`;
  }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${base}"/>${cracks}`;
};

/** Destello de cuatro puntas. */
export const sparkle = (cx, cy, r, fill = "#FFFFFF") =>
  `<path d="M${cx} ${cy - r} Q${cx + r * .18} ${cy - r * .18} ${cx + r} ${cy} Q${cx + r * .18} ${cy + r * .18} ${cx} ${cy + r} Q${cx - r * .18} ${cy + r * .18} ${cx - r} ${cy} Q${cx - r * .18} ${cy - r * .18} ${cx} ${cy - r} Z" fill="${fill}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`;

/** Foto instantánea inclinada; inner se dibuja en un recorte de (x+10, y+10, w-20, h-46). */
export const polaroid = (id, x, y, w, h, rot, inner) => `
  <g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">
    <rect x="${x + 5}" y="${y + 6}" width="${w}" height="${h}" rx="4" fill="#000" opacity=".2"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#FBFAF7" stroke="${INK}" stroke-width="3"/>
    <clipPath id="${id}"><rect x="${x + 10}" y="${y + 10}" width="${w - 20}" height="${h - 46}"/></clipPath>
    <g clip-path="url(#${id})">${inner}</g>
    <rect x="${x + 10}" y="${y + 10}" width="${w - 20}" height="${h - 46}" fill="none" stroke="${INK}" stroke-width="2"/>
  </g>`;

/** Rectángulo de etiqueta (el texto va en HTML). */
export const tag = (x, y, w, h, fill = "#FFE066") =>
  `<rect class="etiqueta" x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${INK}" stroke-width="2.5"/>`;

/** Flecha curva (arco) con punta, para indicar giro o movimiento. */
export const arcArrow = (cx, cy, rx, ry, a0, a1, color = INK, sw = 3) => {
  const P = a => [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  const [x0, y0] = P(a0), [x1, y1] = P(a1);
  const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0, sweep = a1 > a0 ? 1 : 0;
  const t = a1 + (sweep ? -0.25 : 0.25), [tx, ty] = P(t);
  const ang = Math.atan2(y1 - ty, x1 - tx), k = 10;
  const h1 = [x1 - k * Math.cos(ang - .5), y1 - k * Math.sin(ang - .5)], h2 = [x1 - k * Math.cos(ang + .5), y1 - k * Math.sin(ang + .5)];
  return `<path d="M${x0} ${y0} A${rx} ${ry} 0 ${large} ${sweep} ${x1} ${y1}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/>
    <path d="M${h1[0]} ${h1[1]} L${x1} ${y1} L${h2[0]} ${h2[1]}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
};

/** Brazo robótico de tres tramos terminado en pala. */
export const roboArm = (pts, color, scoopAngle = 30) => {
  const d = "M" + pts.map(p => p.join(" ")).join(" L");
  const [ex, ey] = pts[pts.length - 1];
  return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="#D8D8D8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    ${pts.slice(0, -1).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${color}" stroke="${INK}" stroke-width="2.5"/>`).join("")}
    <g transform="translate(${ex} ${ey}) rotate(${scoopAngle})">
      <path d="M-14 -6 H14 L10 12 Q0 18 -10 12 Z" fill="#8C8C8C" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    </g>`;
};

/** Copos de nieve / escarcha. */
export const flakes = (x, y, w, h, n, color = "#FFFFFF") => {
  let s = "";
  for (let i = 0; i < n; i++) {
    const cx = x + rnd() * w, cy = y + rnd() * h, r = 2 + rnd() * 3;
    s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="${(0.5 + rnd() * 0.5).toFixed(2)}"/>`;
  }
  return s;
};

/** Partículas de polvo. */
export const dust = (x, y, w, h, n, color = "#C9A684") => flakes(x, y, w, h, n, color);

/** Brazo saludando hacia la derecha (para la Tierra con carita). */
export const armRight = (x, y, s = 1, color = "#4E93C2") =>
  `<path d="M${x} ${y} Q${x + 24 * s} ${y - 10 * s} ${x + 26 * s} ${y - 38 * s}" fill="none" stroke="${INK}" stroke-width="${4 * s}" stroke-linecap="round"/>
   <circle cx="${x + 26 * s}" cy="${y - 43 * s}" r="${6 * s}" fill="${color}" stroke="${INK}" stroke-width="2.5"/>`;
