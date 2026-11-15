// Carga y valida las historias (texto por idioma + arte generado).
// Cualquier error rompe la compilación con un mensaje claro (SPEC T-02, CA-11.2).
import { z } from "astro/zod";
import { LANGS, type Lang } from "../i18n/ui";
import { HISTORIAS, type Entrada } from "../data/catalog";

const Texto = z.object({ quien: z.string().min(1).optional(), texto: z.string().min(1) });
const Vineta = z.object({ alt: z.string().min(10, "alt demasiado corto"), textos: z.array(Texto) });
const Idioma = z.object({
  paginas: z.array(z.string().min(1)).length(3, "cada historia tiene 3 páginas"),
  vinetas: z.record(z.string(), Vineta),
  cierre: z.object({
    datoReal: z.string().min(1),
    preguntaAula: z.string().min(1),
    fuentes: z.array(z.object({ titulo: z.string().min(1), url: z.string().url() })).min(1, "falta cierre.fuentes"),
  }),
});
const Hueco = z.object({ tipo: z.enum(["globo", "narracion", "etiqueta"]), x: z.number(), y: z.number(), w: z.number(), h: z.number() });
const Arte = z.object({
  defs: z.string(),
  vinetas: z.array(z.object({ id: z.string(), ratio: z.number(), svg: z.string(), huecos: z.array(Hueco) })).length(12, "cada historia tiene 12 viñetas"),
});

export type TextoHistoria = z.infer<typeof Idioma>;
export type ArteHistoria = z.infer<typeof Arte>;

const textFiles = import.meta.glob<{ default: unknown }>("../data/stories/*.json", { eager: true });
const artFiles = import.meta.glob<{ default: unknown }>("../art/*.json", { eager: true });

function fail(id: string, msg: string): never {
  throw new Error(`[historia ${id}] ${msg}`);
}

function parse<T>(schema: z.ZodType<T>, data: unknown, id: string, what: string): T {
  const r = schema.safeParse(data);
  if (!r.success) fail(id, `${what} inválido:\n${r.error.issues.map(i => `  - ${i.path.join(".")}: ${i.message}`).join("\n")}`);
  return r.data;
}

export interface Historia {
  entrada: Entrada;
  arte: ArteHistoria;
  textos: Record<Lang, TextoHistoria>;
}

const cache = new Map<string, Historia>();

export function cargarHistoria(id: string): Historia {
  if (cache.has(id)) return cache.get(id)!;
  const entrada = HISTORIAS.find(h => h.id === id) ?? fail(id, "no está en el catálogo");
  const artMod = artFiles[`../art/${id}.json`] ?? fail(id, `falta src/art/${id}.json (ejecuta npm run art)`);
  const arte = parse(Arte, artMod.default, id, "arte");

  const textos = {} as Record<Lang, TextoHistoria>;
  for (const lang of LANGS) {
    const mod = textFiles[`../data/stories/${id}.${lang}.json`] ?? fail(id, `falta la traducción ${id}.${lang}.json`);
    const tx = parse(Idioma, mod.default, id, `texto (${lang})`);
    for (const v of arte.vinetas) {
      const vt = tx.vinetas[v.id] ?? fail(id, `(${lang}) falta la viñeta ${v.id}`);
      if (vt.textos.length !== v.huecos.length)
        fail(id, `(${lang}) ${v.id} tiene ${vt.textos.length} textos pero el dibujo tiene ${v.huecos.length} huecos (${v.huecos.map(h => h.tipo).join(", ")})`);
    }
    const sobrantes = Object.keys(tx.vinetas).filter(k => !arte.vinetas.some(v => v.id === k));
    if (sobrantes.length) fail(id, `(${lang}) viñetas sin dibujo: ${sobrantes.join(", ")}`);
    textos[lang] = tx;
  }
  const h = { entrada, arte, textos };
  cache.set(id, h);
  return h;
}

/** Valida todas las historias disponibles (se llama al generar cualquier página). */
export function validarCatalogo() {
  for (const h of HISTORIAS.filter(h => h.disponible)) cargarHistoria(h.id);
}
