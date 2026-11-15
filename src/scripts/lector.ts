// Lector: activa cada viñeta al entrar en pantalla (RF-06), progreso (CA-05.3),
// botones anterior/siguiente (CA-05.1) y teclado (↓/Espacio, ↑, Esc).
const root = document.documentElement;
const lector = document.querySelector<HTMLElement>("[data-lector]");

if (lector) {
  const vinetas = [...document.querySelectorAll<HTMLElement>("[data-vineta]")];
  const puntos = new Map([...document.querySelectorAll<HTMLAnchorElement>("[data-punto]")].map(a => [a.dataset.punto!, a]));
  const sinAnim = () => root.classList.contains("sin-anim");
  let actual = -1;

  // Activación una sola vez al entrar (la animación queda en su estado final).
  const revelar = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) {
      e.target.classList.add("visible");
      revelar.unobserve(e.target);
    }
  }, { threshold: 0.4 });
  vinetas.forEach(v => revelar.observe(v));
  root.classList.add("lector-listo");

  // Viñeta "actual" = la más cercana al centro de la pantalla.
  function calcularActual() {
    const centro = innerHeight / 2;
    let mejor = 0, dist = Infinity;
    vinetas.forEach((v, i) => {
      const r = v.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - centro);
      if (d < dist) { dist = d; mejor = i; }
    });
    if (mejor === actual) return;
    actual = mejor;
    vinetas.forEach((v, i) => {
      const p = puntos.get(v.id);
      if (!p) return;
      if (i === actual) p.setAttribute("aria-current", "step"); else p.removeAttribute("aria-current");
      p.classList.toggle("leido", i < actual);
    });
    // Conserva la posición en la URL (para compartir o cambiar de idioma) sin saltos.
    history.replaceState(null, "", `#${vinetas[actual].id}`);
  }
  let pendiente = false;
  addEventListener("scroll", () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => { pendiente = false; calcularActual(); });
  }, { passive: true });

  function ir(i: number) {
    const v = vinetas[Math.max(0, Math.min(vinetas.length - 1, i))];
    if (!v) return;
    v.scrollIntoView({ block: "center", behavior: sinAnim() ? "auto" : "smooth" });
    v.focus({ preventScroll: true });
  }
  function siguiente() {
    calcularActual();
    if (actual >= vinetas.length - 1) {
      document.getElementById("cierre")?.scrollIntoView({ block: "start", behavior: sinAnim() ? "auto" : "smooth" });
    } else ir(actual + 1);
  }
  function anterior() { calcularActual(); ir(actual - 1); }

  document.querySelector("[data-siguiente]")?.addEventListener("click", siguiente);
  document.querySelector("[data-anterior]")?.addEventListener("click", anterior);
  puntos.forEach((a, id) => a.addEventListener("click", e => {
    e.preventDefault();
    ir(vinetas.findIndex(v => v.id === id));
  }));

  document.addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target as HTMLElement;
    const interactivo = t.closest("a, button, input, select, textarea, [contenteditable]");
    if (e.key === "ArrowDown" || (e.key === " " && !interactivo)) { e.preventDefault(); siguiente(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); anterior(); }
    else if (e.key === "Escape") { location.href = lector.dataset.portada || "/"; }
  });

  // Si se llega con #p2-v3 (por ejemplo, al cambiar de idioma), ir a esa viñeta.
  const destino = location.hash && vinetas.findIndex(v => `#${v.id}` === location.hash);
  if (typeof destino === "number" && destino >= 0) {
    requestAnimationFrame(() => { vinetas[destino].scrollIntoView({ block: "center" }); calcularActual(); });
  } else calcularActual();
}
