// Catálogo de destinos e historias (SPEC §4, alcance acordado: 6 historias).
// Orden dentro de cada destino: cronológico por misión.
import type { Lang } from "../i18n/ui";

export type DestinoId = "luna" | "marte" | "espacio-profundo";

export interface Destino {
  id: DestinoId;
  slug: Record<Lang, string>;
  nombre: Record<Lang, string>;
  color: string;
}

export interface Entrada {
  id: string;
  destino: DestinoId;
  anio: string;
  titulo: Record<Lang, string>;
  subtitulo: Record<Lang, string>;
  /** true cuando la historia tiene arte y textos completos. */
  disponible: boolean;
  relacionadas: string[];
}

export const DESTINOS: Destino[] = [
  { id: "luna", slug: { es: "luna", en: "moon" }, nombre: { es: "la Luna", en: "the Moon" }, color: "#C9CCD6" },
  { id: "marte", slug: { es: "marte", en: "mars" }, nombre: { es: "Marte", en: "Mars" }, color: "#F2A65A" },
  { id: "espacio-profundo", slug: { es: "espacio-profundo", en: "deep-space" }, nombre: { es: "el espacio profundo", en: "deep space" }, color: "#B8A9FF" },
];

export const HISTORIAS: Entrada[] = [
  {
    id: "surveyor-3", destino: "luna", anio: "1967", disponible: true, relacionadas: ["apollo-11"],
    titulo: { es: "Un legado en la Luna", en: "A Legacy on the Moon" },
    subtitulo: { es: "Surveyor 3", en: "Surveyor 3" },
  },
  {
    id: "apollo-11", destino: "luna", anio: "1969", disponible: true, relacionadas: ["surveyor-3"],
    titulo: { es: "Rumbo a la historia", en: "Heading into History" },
    subtitulo: { es: "Apollo 11", en: "Apollo 11" },
  },
  {
    id: "spirit-opportunity", destino: "marte", anio: "2004", disponible: true, relacionadas: ["phoenix-insight", "ingenuity"],
    titulo: { es: "Los exploradores gemelos de Marte", en: "The Twin Explorers of Mars" },
    subtitulo: { es: "Spirit y Opportunity", en: "Spirit and Opportunity" },
  },
  {
    id: "phoenix-insight", destino: "marte", anio: "2008", disponible: true, relacionadas: ["spirit-opportunity", "ingenuity"],
    titulo: { es: "Los secretos bajo el suelo marciano", en: "Secrets Beneath the Martian Ground" },
    subtitulo: { es: "Phoenix e InSight", en: "Phoenix and InSight" },
  },
  {
    id: "ingenuity", destino: "marte", anio: "2021", disponible: true, relacionadas: ["spirit-opportunity", "phoenix-insight"],
    titulo: { es: "El pequeño helicóptero que conquistó Marte", en: "The Little Helicopter That Conquered Mars" },
    subtitulo: { es: "Ingenuity", en: "Ingenuity" },
  },
  {
    id: "pioneer", destino: "espacio-profundo", anio: "1972", disponible: true, relacionadas: [],
    titulo: { es: "Abriendo camino", en: "Blazing the Trail" },
    subtitulo: { es: "Pioneer 10 y 11", en: "Pioneer 10 and 11" },
  },
];

export const destino = (id: DestinoId) => DESTINOS.find(d => d.id === id)!;
export const historia = (id: string) => HISTORIAS.find(h => h.id === id);
export const historiasDe = (id: DestinoId) => HISTORIAS.filter(h => h.destino === id);
export const urlHistoria = (lang: Lang, h: Entrada) => `/${lang}/${destino(h.destino).slug[lang]}/${h.id}/`;
export const urlPortada = (lang: Lang) => `/${lang}/`;
