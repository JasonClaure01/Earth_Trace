// Piezas compartidas para dibujar las láminas en SVG por código.
// Estilo: plano, contorno grueso redondeado, sin texto (el texto va en HTML).

export const INK = "#2A1A14";
export const SPIRIT = "#E07B39";
export const OPPY = "#3FA7A0";
export const PAGE_BG = "#F9DCBD";
export const PHOENIX = "#E8A33B";
export const INSIGHT = "#6C7FD8";
export const INGE = "#4FB3E8";
export const PERSE = "#D24D57";
export const SURVEYOR = "#E5B53B";

let seed = 7;
export const reseed = s => { seed = s; };

// --- registro de huecos de texto y viñetas (para la web) ---
let pendingSlots = [];
let panelsOut = [];
/** Registra un hueco de texto (globo, narración, etiqueta) de la viñeta en curso. */
export const slot = (tipo, x, y, w, h, extra = {}) => { pendingSlots.push({ tipo, x, y, w, h, ...extra }); };
export const takePanels = () => { const p = panelsOut; panelsOut = []; return p; };
export const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

/** Globo de diálogo: rectángulo muy redondeado con cola hacia (tx, y+h+30). dir = lado hacia el que se inclina la cola. */
export const balloon = (x, y, w, h, tx, dir = 1) => {
  const r = Math.min(h / 2, 34);
  const t1 = tx + 20 * dir;
  const [a, b] = dir > 0 ? [tx, t1] : [t1, tx];
  slot("globo", x, y, w, h);
  return `<path class="globo" d="M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${b} L${tx - 6 * dir},${y + h + 30} L${a},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z" fill="#FBFAF7" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
};

/** Globo de pensamiento circular con burbujas hacia (tx, ty). */
export const thought = (cx, cy, r, tx, ty, inner = "") => {
  const dx = tx - cx, dy = ty - cy, d = Math.hypot(dx, dy);
  const p = k => [cx + (dx / d) * (r + k), cy + (dy / d) * (r + k)];
  const [b1x, b1y] = p(12), [b2x, b2y] = p(26);
  return `<g class="pensamiento">
    <circle cx="${b2x}" cy="${b2y}" r="4" fill="#FBFAF7" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="${b1x}" cy="${b1y}" r="7" fill="#FBFAF7" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#FBFAF7" stroke="${INK}" stroke-width="3"/>${inner}</g>`;
};

export const caption = (x, y, w, h, fill = "#F6D7B4") => (slot("narracion", x, y, w, h),
  `<rect class="narracion" x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${fill}" stroke="${INK}" stroke-width="2.5"/>`);

export const panel = (id, x, y, w, h, layers) => {
  const markup = `
  <clipPath id="clip-${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath>
  <g class="vineta-arte" data-panel="${id}">
    <g clip-path="url(#clip-${id})">${layers}</g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="${INK}" stroke-width="4"/>
  </g>`;
  panelsOut.push({ id, x, y, w, h, markup, slots: pendingSlots });
  pendingSlots = [];
  return markup;
};

export const layer = (name, depth, body, anim = "") =>
  `<g data-layer="${name}" data-depth="${depth}"${anim ? ` data-anim="${anim}"` : ""}>${body}</g>`;

export const DEFS = () => roverDef + landerDef + heliDef + surveyorDef + lmDef + pioneerDef;

// Rover: 200 × 160, ancla abajo-centro (100,160). Acento = currentColor.
const roverDef = `
<g id="rover">
  <path d="M8 92 L72 84 L76 101 L2 112 Z" fill="#3A4150" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M128 84 L192 92 L198 112 L124 101 Z" fill="#3A4150" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M26 95 L32 106 M46 91 L52 104 M154 91 L148 104 M174 95 L168 106" stroke="#6F7A8C" stroke-width="2"/>
  <path d="M48 138 L76 120 L124 120 L152 138" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
  <path d="M48 138 L76 120 L124 120 L152 138" fill="none" stroke="#8C8C8C" stroke-width="2.5" stroke-linecap="round"/>
  <g stroke="${INK}" stroke-width="3">
    <circle cx="48" cy="142" r="16" fill="#2E2826"/><circle cx="100" cy="143" r="16" fill="#2E2826"/><circle cx="152" cy="142" r="16" fill="#2E2826"/>
  </g>
  <circle cx="48" cy="142" r="6" fill="#A9A9A9"/><circle cx="100" cy="143" r="6" fill="#A9A9A9"/><circle cx="152" cy="142" r="6" fill="#A9A9A9"/>
  <rect x="56" y="76" width="88" height="52" rx="8" fill="#F3EFE6"/>
  <path d="M56 108 H144 V120 Q144 128 136 128 H64 Q56 128 56 120 Z" fill="currentColor"/>
  <rect x="56" y="76" width="88" height="52" rx="8" fill="none" stroke="${INK}" stroke-width="3"/>
  <path class="boca" d="M84 92 Q100 104 116 92" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
  <line x1="138" y1="78" x2="142" y2="50" stroke="${INK}" stroke-width="3"/><circle cx="142" cy="48" r="4" fill="#E6E0D4" stroke="${INK}" stroke-width="2"/>
  <rect x="94" y="34" width="12" height="44" fill="#E6E0D4" stroke="${INK}" stroke-width="3"/>
  <rect x="66" y="8" width="68" height="32" rx="10" fill="#F3EFE6"/>
  <path d="M66 18 Q66 8 76 8 H124 Q134 8 134 18 Z" fill="currentColor"/>
  <rect x="66" y="8" width="68" height="32" rx="10" fill="none" stroke="${INK}" stroke-width="3"/>
</g>
<g id="ojos">
  <circle cx="86" cy="25" r="10" fill="#FFF" stroke="${INK}" stroke-width="2.5"/><circle cx="87" cy="26" r="6" fill="#1E1E1E"/><circle cx="89" cy="23.5" r="2" fill="#FFF"/>
  <circle cx="114" cy="25" r="10" fill="#FFF" stroke="${INK}" stroke-width="2.5"/><circle cx="115" cy="26" r="6" fill="#1E1E1E"/><circle cx="117" cy="23.5" r="2" fill="#FFF"/>
</g>
<g id="ojos-cansados">
  <circle cx="86" cy="25" r="10" fill="#FFF" stroke="${INK}" stroke-width="2.5"/><circle cx="87" cy="28" r="5" fill="#1E1E1E"/>
  <circle cx="114" cy="25" r="10" fill="#FFF" stroke="${INK}" stroke-width="2.5"/><circle cx="115" cy="28" r="5" fill="#1E1E1E"/>
  <path d="M75 22 Q86 14 97 22 Z M103 22 Q114 14 125 22 Z" fill="#D9D3C6" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
</g>
<g id="polvo-rover" fill="#C98A5E">
  <ellipse cx="38" cy="97" rx="26" ry="6" opacity=".55"/><ellipse cx="162" cy="97" rx="26" ry="6" opacity=".55"/>
  <ellipse cx="80" cy="84" rx="18" ry="5" opacity=".45"/><ellipse cx="122" cy="100" rx="16" ry="6" opacity=".4"/>
  <ellipse cx="100" cy="14" rx="20" ry="4" opacity=".4"/>
</g>`;

/** Dibuja un rover. opts: { flip, dusty, tired, opacity } */
export const rover = (cx, by, s, color, opts = {}) => {
  const t = `translate(${cx},${by}) scale(${opts.flip ? -s : s},${s}) translate(-100,-160)`;
  return `<g transform="${t}" color="${color}"${opts.opacity ? ` opacity="${opts.opacity}"` : ""}>
    <use href="#rover"/><use href="#${opts.tired ? "ojos-cansados" : "ojos"}"/>${opts.dusty ? `<use href="#polvo-rover"/>` : ""}</g>`;
};

/** Tierra; con face=true lleva carita y brazo saludando. */
export const earth = (cx, cy, r, face = false) => `
<g transform="translate(${cx},${cy})">
  <circle r="${r * 1.08}" fill="#8FD0F0" opacity=".3"/>
  <circle r="${r}" fill="#4E93C2" stroke="${INK}" stroke-width="${Math.max(2, r / 14)}"/>
  <path d="M${-r * .7} ${-r * .35} C${-r * .5} ${-r * .7} ${-r * .05} ${-r * .6} ${-r * .1} ${-r * .3} C${-r * .15} ${-r * .05} ${-r * .55} ${r * .05} ${-r * .7} ${-r * .35} Z" fill="#79B565"/>
  <path d="M${r * .2} ${-r * .75} C${r * .55} ${-r * .7} ${r * .8} ${-r * .3} ${r * .7} ${-r * .05} C${r * .45} ${-r * .1} ${r * .25} ${-r * .35} ${r * .2} ${-r * .75} Z" fill="#79B565"/>
  <path d="M${-r * .1} ${r * .3} C${r * .2} ${r * .2} ${r * .45} ${r * .45} ${r * .25} ${r * .75} C${0} ${r * .8} ${-r * .2} ${r * .55} ${-r * .1} ${r * .3} Z" fill="#79B565"/>
  ${face ? `
  <circle cx="${-r * .3}" cy="${-r * .05}" r="${r * .16}" fill="#FFF" stroke="${INK}" stroke-width="2"/><circle cx="${-r * .28}" cy="${-r * .03}" r="${r * .09}" fill="#1E1E1E"/>
  <circle cx="${r * .3}" cy="${-r * .05}" r="${r * .16}" fill="#FFF" stroke="${INK}" stroke-width="2"/><circle cx="${r * .32}" cy="${-r * .03}" r="${r * .09}" fill="#1E1E1E"/>
  <path d="M${-r * .25} ${r * .3} Q0 ${r * .55} ${r * .25} ${r * .3}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` : ""}
</g>`;

/** Brazo saludando de la Tierra con carita. */
export const wavingArm = (x, y, s = 1) =>
  `<path d="M${x} ${y} Q${x - 20 * s} ${y - 14 * s} ${x - 22 * s} ${y - 40 * s}" fill="none" stroke="${INK}" stroke-width="${4 * s}" stroke-linecap="round"/>
   <circle cx="${x - 22 * s}" cy="${y - 44 * s}" r="${6 * s}" fill="#4E93C2" stroke="${INK}" stroke-width="2.5"/>`;

export const stars = (x, y, w, h, n, color = "#FFF3D6") => {
  let s = "";
  for (let i = 0; i < n; i++)
    s += `<circle cx="${(x + rnd() * w).toFixed(1)}" cy="${(y + rnd() * h).toFixed(1)}" r="${(0.8 + rnd() * 1.6).toFixed(1)}" fill="${color}" opacity="${(0.4 + rnd() * 0.6).toFixed(2)}"/>`;
  return s;
};

/** Piedras pequeñas dispersas. */
export const pebbles = (x, y, w, h, n, color = "#7E2F18") => {
  let s = "";
  for (let i = 0; i < n; i++) {
    const rx = 4 + rnd() * 14;
    s += `<ellipse cx="${(x + rnd() * w).toFixed(1)}" cy="${(y + rnd() * h).toFixed(1)}" rx="${rx.toFixed(1)}" ry="${(rx * 0.35).toFixed(1)}" fill="${color}" opacity=".8"/>`;
  }
  return s;
};

/** Envuelve las viñetas en la página completa con zona de título vacía (título en HTML). */
export const page = (title, panels) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 896 1200" width="896" height="1200">
<title>${title}</title>
<defs>${DEFS()}</defs>
<rect width="896" height="1200" fill="${PAGE_BG}"/>
${panels.join("\n")}
</svg>`;

// ---------- Módulo de aterrizaje (Phoenix / InSight): 200 × 160, ancla abajo-centro ----------
const panelSolar = (cx) => `<g>
    <ellipse cx="${cx}" cy="96" rx="44" ry="15" fill="#3A4150" stroke="${INK}" stroke-width="3"/>
    <path d="M${cx - 30} 86 L${cx - 30} 106 M${cx - 15} 82 L${cx - 15} 110 M${cx} 81 L${cx} 111 M${cx + 15} 82 L${cx + 15} 110 M${cx + 30} 86 L${cx + 30} 106" stroke="#6F7A8C" stroke-width="2"/>
    <circle cx="${cx}" cy="96" r="5" fill="#C9CCD6" stroke="${INK}" stroke-width="2"/></g>`;
const landerDef = `
<g id="lander">
  <g stroke="${INK}" stroke-width="5" stroke-linecap="round"><path d="M66 112 L42 152 M134 112 L158 152 M100 116 L100 154"/></g>
  <g stroke="#B9B2A4" stroke-width="2" stroke-linecap="round"><path d="M66 112 L42 152 M134 112 L158 152 M100 116 L100 154"/></g>
  <g fill="#8C8C8C" stroke="${INK}" stroke-width="2.5"><ellipse cx="42" cy="155" rx="12" ry="4"/><ellipse cx="158" cy="155" rx="12" ry="4"/><ellipse cx="100" cy="156" rx="12" ry="4"/></g>
  ${panelSolar(22)}${panelSolar(178)}
  <path d="M48 86 H152 L144 116 H56 Z" fill="#F3EFE6" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M52 102 H148 L144 116 H56 Z" fill="currentColor" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M88 92 Q100 100 112 92" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
  <rect x="62" y="74" width="30" height="14" rx="3" fill="#E6E0D4" stroke="${INK}" stroke-width="2.5"/>
  <rect x="94" y="34" width="12" height="54" fill="#E6E0D4" stroke="${INK}" stroke-width="3"/>
  <rect x="66" y="8" width="68" height="32" rx="10" fill="#F3EFE6"/>
  <path d="M66 18 Q66 8 76 8 H124 Q134 8 134 18 Z" fill="currentColor"/>
  <rect x="66" y="8" width="68" height="32" rx="10" fill="none" stroke="${INK}" stroke-width="3"/>
</g>
<g id="antena-plato">
  <path d="M120 74 L128 58" stroke="${INK}" stroke-width="3"/>
  <path d="M112 62 Q128 40 148 52 Q132 70 112 62 Z" fill="#E6E0D4" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
</g>`;

// ---------- Helicóptero Ingenuity: 200 × 160, ancla abajo-centro. Acento = currentColor ----------
const heliDef = `
<g id="heli-base">
  <g stroke="${INK}" stroke-width="5" stroke-linecap="round"><path d="M78 114 L40 156 M122 114 L160 156 M90 116 L74 154 M110 116 L126 154"/></g>
  <g stroke="#B9B2A4" stroke-width="2" stroke-linecap="round"><path d="M78 114 L40 156 M122 114 L160 156 M90 116 L74 154 M110 116 L126 154"/></g>
  <rect x="96" y="20" width="8" height="70" fill="#8C8C8C" stroke="${INK}" stroke-width="2.5"/>
  <rect x="76" y="10" width="48" height="12" rx="3" fill="#3A4150" stroke="${INK}" stroke-width="2.5"/>
  <path d="M84 12 V20 M92 12 V20 M100 12 V20 M108 12 V20 M116 12 V20" stroke="#6F7A8C" stroke-width="1.5"/>
</g>
<g id="heli-palas">
    <path d="M100 40 L10 34 Q6 37 10 40 Z M100 40 L190 34 Q194 37 190 40 Z" fill="#E9D9B8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M100 58 L14 64 Q10 61 14 58 Z M100 58 L186 64 Q190 61 186 58 Z" fill="#E9D9B8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
</g>
<g id="heli-cuerpo">
  <ellipse cx="100" cy="40" rx="10" ry="5" fill="#8C8C8C" stroke="${INK}" stroke-width="2.5"/>
  <ellipse cx="100" cy="58" rx="10" ry="5" fill="#8C8C8C" stroke="${INK}" stroke-width="2.5"/>
  <rect x="68" y="80" width="64" height="40" rx="7" fill="#F3EFE6"/>
  <path d="M68 108 H132 V113 Q132 120 125 120 H75 Q68 120 68 113 Z" fill="currentColor"/>
  <rect x="68" y="80" width="64" height="40" rx="7" fill="none" stroke="${INK}" stroke-width="3"/>
</g>
<g id="heli"><use href="#heli-base"/><use href="#heli-palas"/><use href="#heli-cuerpo"/></g>
<g id="rotor-giro" fill="#E9D9B8" fill-opacity=".55" stroke="#2A1A14" stroke-opacity=".35" stroke-width="2" stroke-dasharray="14 10">
  <ellipse cx="100" cy="38" rx="94" ry="7"/><ellipse cx="100" cy="60" rx="90" ry="7"/>
</g>`;

/** Cualquier personaje (rover, lander, heli). opts: { flip, tired, opacity, dish, spin, still } */
export const bot = (sym, cx, by, s, color, opts = {}) => {
  const t = `translate(${cx},${by}) scale(${opts.flip ? -s : s},${s}) translate(-100,-160)`;
  const eyes = opts.tired ? "ojos-cansados" : "ojos";
  const ft = FACE[sym];
  const face = sym === "lm-bajo" ? "" : ft ? `<g transform="${ft}"><use href="#${eyes}"/></g>` : `<use href="#${eyes}"/>`;
  const body = sym === "heli" && opts.spin ? `<use href="#heli-base"/><use href="#rotor-giro"/><use href="#heli-cuerpo"/>` : `<use href="#${sym}"/>`;
  return `<g transform="${t}" color="${color}"${opts.opacity ? ` opacity="${opts.opacity}"` : ""}>
    ${body}${opts.dish ? `<use href="#antena-plato"/>` : ""}${face}</g>`;
};
export const lander = (cx, by, s, color, opts) => bot("lander", cx, by, s, color, opts);
export const heli = (cx, by, s, opts) => bot("heli", cx, by, s, INGE, opts);
export const surveyor = (cx, by, s, opts) => bot("surveyor", cx, by, s, SURVEYOR, opts);
/** Módulo lunar Eagle. opts.part: "alto" (etapa de ascenso), "bajo" (etapa de descenso) o completo. */
export const eagle = (cx, by, s, opts = {}) => bot(opts.part ? `lm-${opts.part}` : "eagle", cx, by, s, "#E5B53B", opts);
/** Sonda Pioneer (antena parabólica, cuerpo hexagonal, brazos de RTG y magnetómetro). */
export const pioneer = (cx, by, s, color, opts) => bot("pioneer", cx, by, s, color, opts);

// Dónde van los ojos de cada personaje (por defecto, la cabeza de 66–134 × 8–40).
const FACE = {
  heli: "translate(100 96) scale(.72) translate(-100 -25)",
  eagle: "translate(0 34)",
  "lm-alto": "translate(0 34)",
  pioneer: "translate(100 106) scale(.62) translate(-100 -25)",
};

// ---------- Módulo lunar: etapa de descenso (dorada, patas) y de ascenso (facetada, con ventanas). 200 × 160 ----------
const lmDef = `
<g id="lm-bajo">
  <g stroke="${INK}" stroke-width="5" stroke-linecap="round"><path d="M50 116 L16 150 M150 116 L184 150 M78 128 L72 152 M122 128 L128 152"/></g>
  <g stroke="#C9CCD6" stroke-width="2" stroke-linecap="round"><path d="M50 116 L16 150 M150 116 L184 150 M78 128 L72 152 M122 128 L128 152"/></g>
  <path d="M44 124 L24 140 M156 124 L176 140" stroke="${INK}" stroke-width="2.5"/>
  <g fill="#C9CCD6" stroke="${INK}" stroke-width="2.5"><ellipse cx="16" cy="153" rx="14" ry="5"/><ellipse cx="184" cy="153" rx="14" ry="5"/><ellipse cx="72" cy="154" rx="10" ry="4"/><ellipse cx="128" cy="154" rx="10" ry="4"/></g>
  <path d="M44 96 H156 L164 106 V126 L156 134 H44 L36 126 V106 Z" fill="currentColor" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M56 104 L70 124 M84 102 L92 128 M112 104 L104 126 M140 102 L128 128 M44 112 H156" stroke="#B88A1E" stroke-width="2"/>
</g>
<g id="lm-alto">
  <path d="M92 96 L88 108 H112 L108 96 Z" fill="#5A5A5A" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M58 96 L52 62 L70 34 H130 L148 54 L146 96 Z" fill="#C9CCD6" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M52 62 L100 74 L148 54 M100 74 V96 M70 34 L100 74 L130 34" fill="none" stroke="#9AA0AE" stroke-width="2"/>
  <path d="M70 46 L86 70 H64 Z M130 46 L114 70 H136 Z" fill="#2E3440" opacity=".55"/>
  <rect x="88" y="24" width="24" height="12" rx="2" fill="#E6E0D4" stroke="${INK}" stroke-width="2.5"/>
  <path d="M132 36 L142 16" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="144" cy="14" rx="10" ry="6" fill="#E6E0D4" stroke="${INK}" stroke-width="2.5"/>
  <path d="M100 82 Q108 88 116 82" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
</g>
<g id="eagle"><use href="#lm-bajo"/><use href="#lm-alto"/></g>`;

// ---------- Pioneer 10 / 11: 200 × 160, ancla abajo-centro. Acento = currentColor (cuerpo) ----------
const pioneerDef = `
<g id="pioneer">
  <path d="M84 120 L22 150 M116 118 L196 156" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  <path d="M84 120 L22 150 M116 118 L196 156" stroke="#C9CCD6" stroke-width="1.5" stroke-linecap="round"/>
  <g fill="#8C8C8C" stroke="${INK}" stroke-width="2.5"><rect x="26" y="134" width="22" height="14" rx="4" transform="rotate(-25 37 141)"/><rect x="48" y="124" width="22" height="14" rx="4" transform="rotate(-25 59 131)"/></g>
  <circle cx="196" cy="156" r="4" fill="#E6E0D4" stroke="${INK}" stroke-width="2"/>
  <path d="M68 92 H132 L140 108 L132 124 H68 L60 108 Z" fill="currentColor" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M100 92 V86" stroke="${INK}" stroke-width="4"/>
  <ellipse cx="100" cy="56" rx="78" ry="32" fill="#F3EFE6" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="100" cy="56" rx="58" ry="22" fill="none" stroke="#D9D3C6" stroke-width="2"/>
  <ellipse cx="100" cy="56" rx="34" ry="12" fill="none" stroke="#D9D3C6" stroke-width="2"/>
  <path d="M60 50 L100 28 L140 50" fill="none" stroke="${INK}" stroke-width="2"/>
  <circle cx="100" cy="28" r="5" fill="#E6E0D4" stroke="${INK}" stroke-width="2"/>
</g>`;

// ---------- Surveyor: trípode con cámara (cabeza), panel solar y antena plana. 200 × 160 ----------
const surveyorDef = `
<g id="surveyor">
  <g stroke="${INK}" stroke-width="5" stroke-linecap="round"><path d="M100 112 L100 146 M74 108 L36 150 M126 108 L164 150"/></g>
  <g stroke="#C9CCD6" stroke-width="2" stroke-linecap="round"><path d="M100 112 L100 146 M74 108 L36 150 M126 108 L164 150"/></g>
  <path d="M82 116 L44 144 M118 116 L156 144" stroke="${INK}" stroke-width="2.5"/>
  <g fill="#E5B53B" stroke="${INK}" stroke-width="2.5"><ellipse cx="36" cy="153" rx="14" ry="5"/><ellipse cx="164" cy="153" rx="14" ry="5"/><ellipse cx="100" cy="149" rx="12" ry="4"/></g>
  <path d="M68 66 L56 56" stroke="${INK}" stroke-width="3"/>
  <path d="M22 40 L58 34 L62 62 L26 68 Z" fill="#D9DDE6" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M34 38 L38 66 M46 36 L50 64 M24 54 L60 48" stroke="#9AA3B5" stroke-width="1.5"/>
  <path d="M130 64 L144 58" stroke="${INK}" stroke-width="3"/>
  <path d="M138 40 L184 30 L192 66 L146 76 Z" fill="#2E4A8C" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M153 37 L161 73 M168 34 L176 69 M142 58 L188 48" stroke="#6F8BC9" stroke-width="1.5"/>
  <rect x="50" y="86" width="14" height="22" rx="2" fill="currentColor" stroke="${INK}" stroke-width="2.5"/>
  <rect x="136" y="86" width="14" height="22" rx="2" fill="currentColor" stroke="${INK}" stroke-width="2.5"/>
  <path d="M62 80 H138 L130 118 H70 Z" fill="#E6E0D4" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M66 102 H134 L130 118 H70 Z" fill="currentColor" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M88 90 Q100 98 112 90" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
  <rect x="94" y="36" width="12" height="46" fill="#C9CCD6" stroke="${INK}" stroke-width="3"/>
  <rect x="66" y="8" width="68" height="32" rx="6" fill="#EFE3C8"/>
  <path d="M66 16 Q66 8 74 8 H126 Q134 8 134 16 Z" fill="currentColor"/>
  <rect x="66" y="8" width="68" height="32" rx="6" fill="none" stroke="${INK}" stroke-width="3"/>
  <rect x="134" y="14" width="10" height="20" rx="2" fill="#5A5A5A" stroke="${INK}" stroke-width="2.5"/>
</g>`;

/** Colinas suaves: banda con borde superior ondulado entre yTop±amp, rellena hasta yBottom. */
export const hills = (x, w, yTop, yBottom, fill, amp = 12, n = 4) => {
  let d = `M${x} ${yTop}`;
  const step = w / n;
  for (let i = 0; i < n; i++) {
    const x1 = x + i * step;
    d += ` C${x1 + step * .3} ${yTop - amp * (i % 2 ? -1 : 1)} ${x1 + step * .7} ${yTop + amp * (i % 2 ? -1 : 1) * .5} ${x1 + step} ${yTop}`;
  }
  return `<path d="${d} V${yBottom} H${x} Z" fill="${fill}"/>`;
};
