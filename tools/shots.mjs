// Pruebas visuales y de interacción con el Chrome instalado (playwright-core, sin descargar navegadores).
// Uso: node tools/shots.mjs <carpeta-salida> [baseURL]
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const out = process.argv[2] || "shots";
const base = process.argv[3] || "http://localhost:4321";
fs.mkdirSync(out, { recursive: true });
const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await chromium.launch({ executablePath: CHROME });
const errores = [];
const nueva = async (opts) => {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  page.on("console", m => m.type() === "error" && errores.push(`${page.url()}: ${m.text()}`));
  page.on("pageerror", e => errores.push(`${page.url()}: ${e.message}`));
  return page;
};
const shot = (page, name, opts = {}) => page.screenshot({ path: path.join(out, `${name}.png`), ...opts });
const log = (...a) => console.log(...a);

// --- Portada escritorio ---
{
  const page = await nueva({ viewport: { width: 1280, height: 800 } });
  await page.goto(`${base}/es/`);
  await shot(page, "01-portada");
  await page.hover(".cuerpo--luna");
  await page.waitForTimeout(400);
  log("menú Luna visible tras hover:", await page.isVisible("#menu-luna"));
  await shot(page, "02-portada-menu-luna");
  await page.mouse.move(1270, 790);
  await page.waitForTimeout(500);
  log("menú Luna cerrado al salir:", await page.isHidden("#menu-luna"));
  await page.hover(".cuerpo--marte");
  await page.waitForTimeout(400);
  await shot(page, "03-portada-menu-marte");
  await page.hover(".pioneer");
  await page.waitForTimeout(500);
  await shot(page, "04-portada-pioneer", { clip: { x: 900, y: 0, width: 380, height: 260 } });
  // teclado
  await page.mouse.move(5, 790);
  await page.waitForTimeout(400);
  await page.focus(".cuerpo--marte");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(150);
  const foco = await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 40));
  log("teclado: Enter abre menú Marte y enfoca:", foco);
  await page.keyboard.press("Escape");
  log("teclado: Esc cierra:", await page.isHidden("#menu-marte"), "foco vuelve a Marte:", await page.evaluate(() => document.activeElement?.classList.contains("cuerpo--marte")));
  await page.evaluate(() => scrollTo(0, innerHeight));
  await page.waitForTimeout(300);
  await shot(page, "05-portada-catalogo");
}

// --- Portada móvil ---
{
  const page = await nueva({ viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true });
  await page.goto(`${base}/en/`);
  await shot(page, "06-movil-portada-en");
  await page.tap(".cuerpo--marte");
  await page.waitForTimeout(300);
  log("móvil: toque abre menú Marte:", await page.isVisible("#menu-marte"));
  await shot(page, "07-movil-menu-marte");
  await page.tap(".hero__titulo");
  await page.waitForTimeout(200);
  log("móvil: tocar fuera cierra:", await page.isHidden("#menu-marte"));
}

// --- Lector escritorio ---
{
  const page = await nueva({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${base}/es/marte/spirit-opportunity/`);
  await page.waitForTimeout(300);
  await shot(page, "10-lector-inicio");
  for (const id of ["p1-v1", "p1-v2", "p1-v4", "p2-v4", "p3-v1"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.evaluate(i => document.getElementById(i).scrollIntoView({ block: "center", behavior: "instant" }), id);
    await page.waitForTimeout(4200);
    await page.locator(`#${id}`).screenshot({ path: path.join(out, `11-lector-${id}.png`) });
  }
  // teclado: ↓ avanza
  await page.evaluate(() => document.getElementById("p1-v1").scrollIntoView({ block: "center", behavior: "instant" }));
  await page.waitForTimeout(300);
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(900);
  log("lector: ↓ → viñeta actual:", await page.evaluate(() => document.querySelector("[aria-current=step]")?.getAttribute("data-punto")), "hash:", await page.evaluate(() => location.hash));
  await page.click("[data-siguiente]");
  await page.waitForTimeout(900);
  log("lector: botón Siguiente → viñeta actual:", await page.evaluate(() => document.querySelector("[aria-current=step]")?.getAttribute("data-punto")));
  await page.evaluate(() => document.getElementById("cierre").scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForTimeout(400);
  await shot(page, "12-lector-cierre");
  // pausa
  await page.evaluate(() => scrollTo(0, 0));
  await page.click("[data-pref=sinAnim]");
  log("pausa: html.sin-anim =", await page.evaluate(() => document.documentElement.classList.contains("sin-anim")));
  await page.click("[data-pref=sinAnim]");
}

// --- Lector inglés, cambio de idioma conservando viñeta ---
{
  const page = await nueva({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${base}/es/marte/spirit-opportunity/#p2-v2`);
  await page.waitForTimeout(800);
  await page.click("[data-lang-switch]");
  await page.waitForLoadState("load");
  await page.waitForTimeout(4000);
  log("idioma: URL tras cambiar:", page.url());
  await page.locator("#p2-v2").screenshot({ path: path.join(out, "13-lector-en-p2-v2.png") });
}

// --- Lector móvil y lectura sencilla ---
{
  const page = await nueva({ viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true });
  await page.goto(`${base}/es/marte/spirit-opportunity/`);
  for (const id of ["p1-v2", "p1-v4"]) {
    await page.evaluate(i => document.getElementById(i).scrollIntoView({ block: "center", behavior: "instant" }), id);
    await page.waitForTimeout(4000);
    await page.locator(`#${id}`).screenshot({ path: path.join(out, `14-movil-${id}.png`) });
  }
  await shot(page, "15-movil-lector-pantalla");
  await page.tap("[data-pref=sencilla]");
  await page.waitForTimeout(300);
  await page.evaluate(() => document.getElementById("p1-v2").scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForTimeout(300);
  await page.locator("#p1-v2").screenshot({ path: path.join(out, "16-movil-sencilla-p1-v2.png") });
}

// --- Sin JavaScript: todo el texto visible ---
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${base}/es/marte/spirit-opportunity/`);
  const n = await page.locator(".hueco").count();
  const visibles = await page.locator(".hueco:visible").count();
  log(`sin JS: ${visibles}/${n} textos visibles; viñetas: ${await page.locator("[data-vineta]").count()}`);
  await page.locator("#p1-v4").screenshot({ path: path.join(out, "17-sinjs-p1-v4.png") });
}

log(errores.length ? `\nErrores de consola:\n${errores.join("\n")}` : "\nSin errores de consola.");
await browser.close();
