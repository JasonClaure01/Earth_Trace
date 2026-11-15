// Utilería para las historias de la Luna: astronauta de dibujo, suelo lunar, la Luna lejana, ondas de radio, cohete.
import { INK, rnd } from "./lib.mjs";

const W = "#F4F4F0", G = "#C9CCD6";
const arm = (d) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${W}" stroke-width="8" stroke-linecap="round"/>`;
const glove = (x, y) => `<circle cx="${x}" cy="${y}" r="6" fill="${G}" stroke="${INK}" stroke-width="2.5"/>`;

/** Astronauta de dibujo (sin cara ni insignias reales). Ancla abajo-centro, ~60 × 124 a escala 1.
 *  opts: { wave: saluda con el brazo derecho, hold: sostiene una cámara delante, kneel: rodilla en el suelo, flip } */
export const astronaut = (cx, by, s = 1, opts = {}) => {
  const legs = opts.kneel
    ? `<path d="M-16 -40 L-18 -22 L-40 -16 L-40 -2 L-8 -6 L-4 -40 Z" fill="${W}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
       <path d="M4 -40 H18 L20 -4 H2 Z" fill="${W}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
       <rect x="-46" y="-14" width="12" height="14" rx="3" fill="${G}" stroke="${INK}" stroke-width="2.5"/>
       <rect x="0" y="-8" width="22" height="9" rx="3" fill="${G}" stroke="${INK}" stroke-width="2.5"/>`
    : `<path d="M-18 -40 H-4 L-5 -4 H-19 Z M4 -40 H18 L19 -4 H5 Z" fill="${W}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
       <rect x="-22" y="-8" width="19" height="9" rx="3" fill="${G}" stroke="${INK}" stroke-width="2.5"/>
       <rect x="3" y="-8" width="19" height="9" rx="3" fill="${G}" stroke="${INK}" stroke-width="2.5"/>`;
  const armL = opts.hold ? arm("M-22 -78 Q-34 -62 -16 -54") : arm("M-22 -78 Q-34 -64 -32 -46") + glove(-32, -44);
  const armR = opts.wave ? arm("M22 -78 Q38 -92 36 -110") + glove(36, -113)
    : opts.hold ? arm("M22 -78 Q34 -62 16 -54") : arm("M22 -78 Q34 -64 32 -46") + glove(32, -44);
  const cam = opts.hold ? `
    <rect x="-22" y="-68" width="44" height="24" rx="3" fill="#EFE3C8" stroke="${INK}" stroke-width="2.5"/>
    <rect x="-22" y="-68" width="44" height="7" rx="2" fill="#E5B53B" stroke="${INK}" stroke-width="2"/>
    <circle cx="13" cy="-53" r="5" fill="#2E3440" stroke="${INK}" stroke-width="2"/>
    ${glove(-18, -52)}${glove(18, -50)}` : "";
  return `<g transform="translate(${cx} ${by}) scale(${opts.flip ? -s : s} ${s})">
    <rect x="-28" y="-112" width="56" height="54" rx="8" fill="#E2E2DC" stroke="${INK}" stroke-width="3"/>
    ${legs}
    <rect x="-24" y="-86" width="48" height="50" rx="12" fill="${W}" stroke="${INK}" stroke-width="3"/>
    <rect x="-12" y="-72" width="24" height="14" rx="3" fill="${G}" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="-5" cy="-65" r="2.5" fill="#D24D57"/><circle cx="4" cy="-65" r="2.5" fill="#4FB3E8"/>
    ${armL}${armR}${cam}
    <circle cx="0" cy="-100" r="21" fill="${W}" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="0" cy="-98" rx="15" ry="12" fill="#E8B23B" stroke="${INK}" stroke-width="2.5"/>
    <path d="M-9 -104 Q-4 -109 3 -108" fill="none" stroke="#FFF6D8" stroke-width="3" stroke-linecap="round"/>
  </g>`;
};

/** Suelo lunar gris con cráteres y piedrecitas. */
export const moonGround = (x, y, w, h, n = 6, base = "#A9ADB8", dark = "#8E929E") => {
  let craters = "";
  for (let i = 0; i < n; i++) {
    const cx = x + 30 + rnd() * (w - 60), cy = y + 16 + rnd() * Math.max(4, h - 30), rx = 12 + rnd() * 26;
    craters += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${(rx * .28).toFixed(1)}" fill="${dark}"/>
      <path d="M${(cx - rx).toFixed(1)} ${cy.toFixed(1)} A${rx.toFixed(1)} ${(rx * .28).toFixed(1)} 0 0 0 ${(cx + rx).toFixed(1)} ${cy.toFixed(1)}" fill="none" stroke="#C9CCD6" stroke-width="2.5"/>`;
  }
  let dots = "";
  for (let i = 0; i < w / 14; i++)
    dots += `<circle cx="${(x + rnd() * w).toFixed(1)}" cy="${(y + 4 + rnd() * (h - 6)).toFixed(1)}" r="${(1 + rnd() * 2).toFixed(1)}" fill="#6F7380" opacity=".6"/>`;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${base}"/>${craters}${dots}`;
};

/** Montañas lunares grises en el horizonte. */
export const moonHills = (x, w, y, h, fill = "#7E8494") => {
  let d = `M${x} ${y + h}`;
  const n = Math.max(3, Math.round(w / 110));
  for (let i = 0; i <= n; i++) d += ` L${x + (i / n) * w} ${y + (i % 2 ? h * .2 : h * .7) + rnd() * h * .2}`;
  return `<path d="${d} L${x + w} ${y + h} Z" fill="${fill}"/>`;
};

/** La Luna vista de lejos. */
export const moonBody = (cx, cy, r) => `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#C9CCD6" stroke="${INK}" stroke-width="${Math.max(2.5, r / 40)}"/>
  <circle cx="${cx - r * .3}" cy="${cy - r * .25}" r="${r * .16}" fill="#AEB2BD"/>
  <circle cx="${cx + r * .25}" cy="${cy + r * .1}" r="${r * .22}" fill="#AEB2BD"/>
  <circle cx="${cx - r * .1}" cy="${cy + r * .45}" r="${r * .1}" fill="#AEB2BD"/>
  <circle cx="${cx + r * .45}" cy="${cy - r * .4}" r="${r * .08}" fill="#AEB2BD"/>`;

/** Ondas de radio desde (x, y); dir 1 = derecha, -1 = izquierda. */
export const radioWaves = (x, y, n = 3, color = "#FFE066", dir = 1) => {
  let s = "";
  for (let i = 1; i <= n; i++)
    s += `<path d="M${x + dir * i * 12} ${y - i * 9} Q${x + dir * (i * 12 + 7)} ${y} ${x + dir * i * 12} ${y + i * 9}" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>`;
  return s;
};

/** Cohete de dos etapas (genérico, sin marcas). Ancla en la base de la tobera. */
export const rocket = (cx, by, s = 1) => `<g transform="translate(${cx} ${by}) scale(${s})">
  <path d="M-18 -20 L-34 0 H-16 Z M18 -20 L34 0 H16 Z" fill="#D24D57" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="-18" y="-150" width="36" height="140" fill="#F4F4F0" stroke="${INK}" stroke-width="3"/>
  <rect x="-18" y="-96" width="36" height="12" fill="#C9CCD6" stroke="${INK}" stroke-width="2.5"/>
  <path d="M-15 -150 V-196 Q0 -226 15 -196 V-150 Z" fill="#E6E0D4" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="-12" y="-10" width="24" height="10" fill="#5A5A5A" stroke="${INK}" stroke-width="2.5"/>
</g>`;

/** Llama de cohete o motor de frenado (apunta hacia abajo desde x, y). */
export const flame = (x, y, w, h) => `
  <path d="M${x - w / 2} ${y} Q${x - w * .3} ${y + h * .6} ${x} ${y + h} Q${x + w * .3} ${y + h * .6} ${x + w / 2} ${y} Z" fill="#F6B24A"/>
  <path d="M${x - w / 4} ${y} Q${x - w * .12} ${y + h * .4} ${x} ${y + h * .65} Q${x + w * .12} ${y + h * .4} ${x + w / 4} ${y} Z" fill="#FFF3D6"/>`;

/** Nubes de humo redondeadas a lo largo de una línea. */
export const smoke = (x, y, w, n = 7, fill = "#EDE7DD") => {
  let s = "";
  for (let i = 0; i < n; i++) {
    const r = 20 + rnd() * 26;
    s += `<circle cx="${(x + (i / (n - 1)) * w).toFixed(1)}" cy="${(y - rnd() * 18).toFixed(1)}" r="${r.toFixed(1)}" fill="${fill}" stroke="${INK}" stroke-width="2.5"/>`;
  }
  return s;
};

// ---------------- Apollo ----------------

/** Ojos sueltos (para naves dibujadas a mano). */
export const eyes = (x, y, r = 7, gap = 2.4, tired = false) => [-1, 1].map(d => {
  const cx = x + d * r * gap / 2 + d * r * .2;
  return `<circle cx="${cx}" cy="${y}" r="${r}" fill="#FFF" stroke="${INK}" stroke-width="2"/>
    <circle cx="${cx + r * .1}" cy="${y + (tired ? r * .3 : r * .1)}" r="${r * .58}" fill="#1E1E1E"/>
    ${tired ? `<path d="M${cx - r - 1} ${y - r * .2} Q${cx} ${y - r * 1.2} ${cx + r + 1} ${y - r * .2} Z" fill="#D9D3C6" stroke="${INK}" stroke-width="2"/>`
            : `<circle cx="${cx + r * .3}" cy="${y - r * .2}" r="${r * .2}" fill="#FFF"/>`}`;
}).join("");

/** Cohete Saturno V (genérico). Ancla en la base de los motores; mide ~330 de alto a escala 1. */
export const saturnV = (cx, by, s = 1) => {
  const band = (y, h) => `<rect x="-22" y="${y}" width="44" height="${h}" fill="#2E3440"/>`;
  return `<g transform="translate(${cx} ${by}) scale(${s})">
  <path d="M-22 -40 L-38 0 H-22 Z M22 -40 L38 0 H22 Z" fill="#2E3440" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="-22" y="-140" width="44" height="140" fill="#F4F4F0" stroke="${INK}" stroke-width="3"/>
  ${band(-140, 10)}<rect x="-22" y="-100" width="22" height="30" fill="#2E3440"/><rect x="0" y="-60" width="22" height="30" fill="#2E3440"/>
  <rect x="-20" y="-228" width="40" height="88" fill="#F4F4F0" stroke="${INK}" stroke-width="3"/>
  <rect x="-20" y="-150" width="40" height="8" fill="#2E3440"/>
  <path d="M-20 -228 L-15 -246 H15 L20 -228 Z" fill="#E6E0D4" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="-15" y="-290" width="30" height="44" fill="#F4F4F0" stroke="${INK}" stroke-width="3"/>
  <path d="M-15 -290 L0 -312 L15 -290 Z" fill="#E6E0D4" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M0 -312 V-334 M-5 -322 H5" stroke="${INK}" stroke-width="3"/>
  <g fill="#5A5A5A" stroke="${INK}" stroke-width="2.5"><rect x="-20" y="-2" width="12" height="10"/><rect x="8" y="-2" width="12" height="10"/></g>
</g>`;
};

/** Columbia: módulo de mando (cono con ojos) + módulo de servicio, en horizontal mirando a la izquierda.
 *  Centro en (cx, cy); mide ~200 × 64 a escala 1. opts: { flip, tired } */
export const columbia = (cx, cy, s = 1, opts = {}) => `<g transform="translate(${cx} ${cy}) scale(${opts.flip ? -s : s} ${s})">
  <path d="M60 -14 L86 -26 V26 L60 14 Z" fill="#5A5A5A" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="-40" y="-30" width="100" height="60" rx="4" fill="#E6E0D4" stroke="${INK}" stroke-width="3"/>
  <path d="M-10 -30 V30 M30 -30 V30" stroke="#B9B2A4" stroke-width="2"/>
  <rect x="10" y="-30" width="12" height="60" fill="#C9CCD6" stroke="${INK}" stroke-width="2"/>
  <path d="M-40 -30 L-92 -6 Q-98 0 -92 6 L-40 30 Z" fill="#F4F4F0" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <g transform="scale(${opts.flip ? -1 : 1} 1)">${eyes(opts.flip ? 62 : -62, -4, 6.5, 2.4, opts.tired)}</g>
  <path d="M-70 12 Q-62 18 -54 12" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
</g>`;

/** Cápsula de mando sola, de pie (escudo térmico abajo). Centro en (cx, cy); ~84 × 76. */
export const capsule = (cx, cy, s = 1, opts = {}) => `<g transform="translate(${cx} ${cy}) scale(${s})">
  <path d="M-12 -44 H12 L42 26 Q0 40 -42 26 Z" fill="#E6E0D4" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M-42 26 Q0 40 42 26 Q40 38 0 44 Q-40 38 -42 26 Z" fill="${opts.hot ? "#E8743B" : "#8E5A3A"}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="-8" y="-52" width="16" height="9" rx="2" fill="#C9CCD6" stroke="${INK}" stroke-width="2.5"/>
  ${eyes(0, 2, 7, 2.4, opts.tired)}
  <path d="M-8 18 Q0 24 8 18" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
</g>`;

/** Mar con olas. */
export const ocean = (x, y, w, h) => {
  let waves = "";
  for (let r = 0; r < h / 22; r++)
    waves += `<path d="M${x} ${y + 12 + r * 22} ${Array.from({ length: Math.ceil(w / 40) }, (_, i) => `q10 -7 20 0 t20 0`).join(" ")}" fill="none" stroke="#7FC4EA" stroke-width="2.5" opacity=".7"/>`;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2F7FB8"/>${waves}`;
};

/** Barco de rescate (genérico, sin nombre). Ancla en la línea de flotación. */
export const ship = (cx, wy, s = 1) => `<g transform="translate(${cx} ${wy}) scale(${s})">
  <path d="M-150 -20 H150 L130 10 H-136 Z" fill="#7F8794" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="-150" y="-26" width="300" height="8" fill="#9AA0AE" stroke="${INK}" stroke-width="2.5"/>
  <path d="M40 -26 V-60 H80 V-26 M56 -60 V-84 M48 -76 H64" fill="#9AA0AE" stroke="${INK}" stroke-width="3"/>
</g>`;

/** Helicóptero de rescate (genérico). Centro del cuerpo en (cx, cy). */
export const rescueHeli = (cx, cy, s = 1) => `<g transform="translate(${cx} ${cy}) scale(${s})">
  <path d="M-70 -30 H70" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  <path d="M0 -30 V-18" stroke="${INK}" stroke-width="4"/>
  <path d="M-34 -18 H20 Q40 -18 40 0 Q40 18 20 18 H-30 Q-40 18 -40 6 L-90 -2 V-10 L-40 -12 Z" fill="#D9DDE6" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M14 -14 Q32 -12 34 0 H14 Z" fill="#8FD0F0" stroke="${INK}" stroke-width="2"/>
  <path d="M-20 18 V26 M10 18 V26 M-30 26 H20" stroke="${INK}" stroke-width="3"/>
</g>`;
