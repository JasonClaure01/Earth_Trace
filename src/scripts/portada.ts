// Portada: parallax por puntero (CA-01.2/01.4) y menús de destino (CA-02.1 a 02.4).
const root = document.documentElement;
const sinAnim = () => root.classList.contains("sin-anim");

// ---------- Parallax ----------
const escena = document.querySelector<HTMLElement>("[data-escena]");
if (escena && matchMedia("(pointer: fine)").matches) {
  let raf = 0, px = 0, py = 0;
  escena.addEventListener("pointermove", e => {
    if (sinAnim() || e.pointerType !== "mouse") return;
    const r = escena.getBoundingClientRect();
    px = ((e.clientX - r.left) / r.width) * 2 - 1;
    py = ((e.clientY - r.top) / r.height) * 2 - 1;
    if (!raf) raf = requestAnimationFrame(() => {
      raf = 0;
      escena.style.setProperty("--px", px.toFixed(3));
      escena.style.setProperty("--py", py.toFixed(3));
    });
  });
  escena.addEventListener("pointerleave", () => {
    escena.style.setProperty("--px", "0");
    escena.style.setProperty("--py", "0");
  });
}

// ---------- Menús ----------
const OPEN_DELAY = 120;  // CA-02.1: ≤ 150 ms
const CLOSE_GRACE = 250; // CA-02.2

interface Destino { el: HTMLElement; cuerpo: HTMLAnchorElement; menu: HTMLElement; openT?: number; closeT?: number }
const destinos: Destino[] = [...document.querySelectorAll<HTMLElement>("[data-destino]")].map(el => ({
  el,
  cuerpo: el.querySelector<HTMLAnchorElement>("[data-cuerpo]")!,
  menu: el.querySelector<HTMLElement>("[data-menu]")!,
}));

const items = (d: Destino) => [...d.menu.querySelectorAll<HTMLElement>("[data-menu-item]")];

function abrir(d: Destino) {
  destinos.forEach(o => o !== d && cerrar(o));
  clearTimeout(d.closeT);
  d.menu.hidden = false;
  d.el.classList.add("abierto");
  d.cuerpo.setAttribute("aria-expanded", "true");
}
function cerrar(d: Destino, devolverFoco = false) {
  clearTimeout(d.openT);
  if (d.menu.hidden) return;
  d.menu.hidden = true;
  d.el.classList.remove("abierto");
  d.cuerpo.setAttribute("aria-expanded", "false");
  if (devolverFoco) d.cuerpo.focus();
}
const abierto = (d: Destino) => !d.menu.hidden;

for (const d of destinos) {
  // Con JS, el cuerpo deja de ser un enlace al catálogo y pasa a abrir el menú.
  d.cuerpo.setAttribute("role", "button");
  d.cuerpo.setAttribute("aria-expanded", "false");
  let ultimoPuntero = "mouse";

  d.el.addEventListener("pointerenter", e => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(d.closeT);
    d.openT = window.setTimeout(() => abrir(d), OPEN_DELAY);
  });
  d.el.addEventListener("pointerleave", e => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(d.openT);
    d.closeT = window.setTimeout(() => cerrar(d), CLOSE_GRACE);
  });
  d.cuerpo.addEventListener("pointerdown", e => { ultimoPuntero = e.pointerType; });

  d.cuerpo.addEventListener("click", e => {
    e.preventDefault();
    // Con ratón el menú ya se abrió al pasar: el clic lo mantiene abierto.
    if (ultimoPuntero === "mouse" && abierto(d)) return;
    abierto(d) ? cerrar(d) : abrir(d);
    ultimoPuntero = "mouse";
  });

  d.cuerpo.addEventListener("keydown", e => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (abierto(d)) cerrar(d);
      else { abrir(d); items(d)[0]?.focus(); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      abrir(d);
      items(d)[0]?.focus();
    } else if (e.key === "Escape") cerrar(d);
  });

  d.menu.addEventListener("keydown", e => {
    const lista = items(d);
    const i = lista.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") { e.preventDefault(); lista[(i + 1) % lista.length]?.focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); lista[(i - 1 + lista.length) % lista.length]?.focus(); }
    else if (e.key === "Home") { e.preventDefault(); lista[0]?.focus(); }
    else if (e.key === "End") { e.preventDefault(); lista[lista.length - 1]?.focus(); }
    else if (e.key === "Escape") { e.preventDefault(); cerrar(d, true); }
  });

  // Las historias "próximamente" se pueden enfocar con flechas, pero no se activan.
  items(d).forEach(it => { if (it.getAttribute("aria-disabled") === "true") it.addEventListener("click", e => e.preventDefault()); });

  d.el.addEventListener("focusout", e => {
    if (!d.el.contains(e.relatedTarget as Node)) cerrar(d);
  });
}

// Tocar o hacer clic fuera cierra los menús.
document.addEventListener("pointerdown", e => {
  for (const d of destinos) if (abierto(d) && !d.el.contains(e.target as Node)) cerrar(d);
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") destinos.forEach(d => cerrar(d));
});
