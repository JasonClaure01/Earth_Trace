// Genera el arte de cada historia para la web:
//   src/art/<historia>.json  → { defs, vinetas: [{ id, viewBox, svg, huecos: [{tipo, x, y, w, h} en %] }] }
//   art_codigo/<destino>/<lámina>.svg → láminas completas (referencia/impresión)
// Uso: node tools/draw/build-art.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFS, takePanels } from "./lib.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");

// Historias con arte dibujado por código. Las demás se añadirán aquí.
const STORIES = [
  { id: "spirit-opportunity", destino: "mars", pages: ["spirit_oportunity_1", "spirit_oportunity_2", "spirit_oportunity_3"] },
  { id: "phoenix-insight", destino: "mars", pages: ["phoenix_insight_1", "phoenix_insight_2", "phoenix_insight_3"] },
  { id: "ingenuity", destino: "mars", pages: ["ingenuity_1", "ingenuity_2", "ingenuity_3"] },
  { id: "surveyor-3", destino: "moon", pages: ["surveyor3_1", "surveyor3_2", "surveyor3_3"] },
  { id: "apollo-11", destino: "moon", pages: ["apollo11_1", "apollo11_2", "apollo11_3"] },
  { id: "pioneer", destino: "deep-space", pages: ["pioneer_1", "pioneer_2", "pioneer_3"] },
];

// Orden de lectura dentro de cada viñeta: narración, luego diálogos, luego etiquetas (orden estable).
const ORDEN = { narracion: 0, globo: 1, etiqueta: 2 };
const PAD = 3; // margen para que el borde de la viñeta no quede recortado
const pct = v => Math.round(v * 10000) / 100;

fs.mkdirSync(path.join(root, "src/art"), { recursive: true });

for (const story of STORIES) {
  takePanels(); // vaciar registro
  const vinetas = [];
  for (const pg of story.pages) {
    const mod = await import(`./${pg}.mjs`);
    const outDir = path.join(root, "art_codigo", story.destino);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, `${pg}.svg`), mod.svg);
    for (const p of takePanels()) {
      const vx = p.x - PAD, vy = p.y - PAD, vw = p.w + PAD * 2, vh = p.h + PAD * 2;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vx} ${vy} ${vw} ${vh}" class="arte" aria-hidden="true" focusable="false">${p.markup.replace(/\s+\n\s*/g, "\n")}</svg>`;
      vinetas.push({
        id: p.id,
        ratio: vw / vh,
        svg,
        huecos: [...p.slots].sort((a, b) => ORDEN[a.tipo] - ORDEN[b.tipo]).map(s => ({
          tipo: s.tipo,
          x: pct((s.x - vx) / vw), y: pct((s.y - vy) / vh),
          w: pct(s.w / vw), h: pct(s.h / vh),
        })),
      });
    }
  }
  const defs = `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${DEFS()}</defs></svg>`;
  const file = path.join(root, "src/art", `${story.id}.json`);
  fs.writeFileSync(file, JSON.stringify({ defs, vinetas }, null, 1));
  const kb = (fs.statSync(file).size / 1024).toFixed(1);
  console.log(`arte ${story.id}: ${vinetas.length} viñetas, ${kb} KB → ${path.relative(root, file)}`);
  for (const v of vinetas) console.log(`  ${v.id}: ${v.huecos.map(h => h.tipo).join(", ")}`);
}
