// Preferencias locales (RF-09): lectura sencilla, pausa de animaciones e idioma.
// Se guardan en localStorage, sin datos personales ni cookies.
type Prefs = { sencilla?: boolean; sinAnim?: boolean; lang?: string };
const KEY = "vep-prefs";
const root = document.documentElement;

function leer(): Prefs {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
function guardar(p: Prefs) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* modo privado: no pasa nada */ }
}

const reducido = () => root.classList.contains("movimiento-reducido");

function aplicar(p: Prefs) {
  root.classList.toggle("lectura-sencilla", !!p.sencilla);
  root.classList.toggle("sin-anim", !!p.sencilla || !!p.sinAnim || reducido());
  document.querySelectorAll<HTMLButtonElement>("[data-pref]").forEach(btn => {
    const k = btn.dataset.pref as "sencilla" | "sinAnim";
    const on = k === "sinAnim" ? root.classList.contains("sin-anim") : !!p[k];
    btn.setAttribute("aria-pressed", String(on));
    const label = on ? btn.dataset.labelOn : btn.dataset.labelOff;
    const span = btn.querySelector("[data-label]");
    if (label && span) span.textContent = label;
  });
  document.dispatchEvent(new CustomEvent("vep:prefs"));
}

document.querySelectorAll<HTMLButtonElement>("[data-pref]").forEach(btn => {
  btn.addEventListener("click", () => {
    const p = leer();
    const k = btn.dataset.pref as "sencilla" | "sinAnim";
    if (k === "sinAnim") p.sinAnim = !root.classList.contains("sin-anim");
    else p.sencilla = !p.sencilla;
    guardar(p);
    aplicar(p);
  });
});

// Cambio de idioma: recordar la elección y conservar la viñeta actual (#p2-v3).
document.querySelectorAll<HTMLAnchorElement>("[data-lang-switch]").forEach(a => {
  a.addEventListener("click", () => {
    const p = leer();
    p.lang = a.hreflang;
    guardar(p);
    if (location.hash && !a.href.includes("#")) a.href += location.hash;
  });
});

aplicar(leer());
