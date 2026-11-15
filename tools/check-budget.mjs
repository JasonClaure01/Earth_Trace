// Comprueba el presupuesto de peso tras compilar (SPEC RNF-01, RNF-02, RNF-05).
// Mide bytes transferidos (gzip) del HTML más el CSS/JS que enlaza. Falla si se supera.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const dist = path.resolve("dist");
const gz = buf => zlib.gzipSync(buf, { level: 9 }).length;
const kb = n => `${(n / 1024).toFixed(1)} KB`;

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? htmlFiles(p) : e.name.endsWith(".html") ? [p] : [];
  });
}

let fallos = 0;
for (const file of htmlFiles(dist)) {
  const rel = "/" + path.relative(dist, file).replace(/\\/g, "/");
  const html = fs.readFileSync(file);
  const refs = [...html.toString().matchAll(/(?:href|src)="(\/_astro\/[^"]+)"/g)].map(m => m[1]);
  let total = gz(html);
  // JS incrustado en el HTML (Astro incrusta los scripts pequeños)
  const inline = [...html.toString().matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).join("\n");
  let js = inline.trim() ? gz(Buffer.from(inline)) : 0;
  for (const r of new Set(refs)) {
    const f = path.join(dist, r);
    if (!fs.existsSync(f)) continue;
    const size = gz(fs.readFileSync(f));
    total += size;
    if (r.endsWith(".js")) js += size;
  }
  const esPortada = /^\/(es|en)\/index\.html$/.test(rel);
  const esHistoria = /^\/(es|en)\/[^/]+\/[^/]+\/index\.html$/.test(rel);
  const limite = esPortada ? 250 * 1024 : esHistoria ? 1024 * 1024 : null;
  const limiteJs = esPortada ? 25 * 1024 : null;
  const ok = (limite === null || total <= limite) && (limiteJs === null || js <= limiteJs);
  if (!ok) fallos++;
  console.log(`${ok ? "✔" : "✘"} ${rel.padEnd(42)} total ${kb(total).padStart(9)}${limite ? ` / ${kb(limite)}` : ""}   JS ${kb(js)}${limiteJs ? ` / ${kb(limiteJs)}` : ""}`);
}
if (fallos) {
  console.error(`\nPresupuesto superado en ${fallos} página(s).`);
  process.exit(1);
}
