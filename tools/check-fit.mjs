// Comprueba en el navegador que cada texto cabe en su hueco (globo, narración, etiqueta), en todos los idiomas.
// Mide con la fuente real en el modo superpuesto (texto sobre el dibujo). Requiere `npm run preview`.
// Uso: node tools/check-fit.mjs [baseURL]
import { chromium } from "playwright-core";

const base = process.argv[2] || "http://localhost:4321";
const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ANCHOS = [1280, 760]; // escritorio y tableta (por encima de 640 px el texto va superpuesto)

const browser = await chromium.launch({ executablePath: CHROME });
let fallos = 0;
for (const ancho of ANCHOS) {
  const ctx = await browser.newContext({ viewport: { width: ancho, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  const urls = new Set();
  for (const lang of ["es", "en"]) {
    await page.goto(`${base}/${lang}/`);
    for (const href of await page.$$eval(".catalogo a[href]", as => as.map(a => a.getAttribute("href"))))
      if (/^\/(es|en)\/[^/]+\/[^/]+\/$/.test(href)) urls.add(href);
  }
  for (const url of urls) {
    await page.goto(base + url);
    const malos = await page.$$eval(".vineta .hueco", hs => hs.flatMap(h => {
      const fig = h.closest(".vineta");
      // en modo apilado el texto no tiene altura fija: no aplica
      if (getComputedStyle(h).position !== "absolute") return [];
      const sobra = Math.max(h.scrollHeight - h.clientHeight, h.scrollWidth - h.clientWidth);
      return sobra > 1 ? [`${fig.id} ${[...h.classList].find(c => c.startsWith("hueco--"))}: sobra ${sobra}px · "${h.textContent.trim().slice(0, 50)}…"`] : [];
    }));
    if (malos.length) { fallos += malos.length; console.log(`✘ ${ancho}px ${url}\n   ${malos.join("\n   ")}`); }
    else console.log(`✔ ${ancho}px ${url}`);
  }
  await ctx.close();
}
await browser.close();
if (fallos) { console.error(`\n${fallos} texto(s) no caben en su hueco.`); process.exit(1); }
