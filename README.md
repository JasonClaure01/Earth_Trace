# Viaje al espacio profundo · Journey to Deep Space

Cómics cortos y animados sobre misiones espaciales, en español e inglés. Sitio estático hecho con Astro.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Genera el arte y abre el servidor de desarrollo en http://localhost:4321 |
| `npm run build` | Genera el arte, compila en `dist/` y comprueba el presupuesto de peso |
| `npm run preview` | Sirve la compilación de `dist/` |
| `npm run check:fit` | Comprueba en el navegador que cada texto cabe en su globo o recuadro, en ambos idiomas (requiere `npm run preview`) |
| `node tools/shots.mjs <carpeta>` | Pruebas visuales y de interacción con el Chrome instalado (requiere `npm run preview`) |

## Estructura

```
src/
  pages/[lang]/                     portada por idioma (/es/, /en/)
  pages/[lang]/[destino]/[historia]/  lector (/es/marte/spirit-opportunity/)
  components/                       Portada, Lector, Tarjeta, Miniatura
  data/catalog.ts                   destinos e historias (título, año, disponible)
  data/stories/<id>.<lang>.json     textos de cada historia por idioma
  art/<id>.json                     arte generado (no editar a mano)
  lib/stories.ts                    carga y validación (rompe la compilación si falta algo)
  i18n/ui.ts                        textos de la interfaz
  styles/, scripts/
tools/
  draw/                             dibujo de las láminas en SVG por código (lib.mjs: personajes; kit.mjs, kit-luna.mjs, kit-espacio.mjs: utilería; una por lámina)
  cover-boxes.mjs                   prueba de "editar": tapa las cajas de texto de las láminas originales (no se usa en la web)
  draw/build-art.mjs                parte las láminas en viñetas y registra los huecos de texto
  check-budget.mjs                  presupuesto de peso (RNF-01, RNF-02, RNF-05)
```

## Añadir una historia

1. Dibujar sus 3 láminas en `tools/draw/<historia>_N.mjs` usando `lib.mjs`. Cada `balloon()`, `caption()` o `slot()` crea un hueco de texto.
2. Registrarla en `STORIES` dentro de `tools/draw/build-art.mjs`.
3. Escribir `src/data/stories/<id>.es.json` y `<id>.en.json`: un texto por hueco, en orden de lectura: primero la narración, luego los globos y al final las etiquetas (`npm run art` lista el orden de cada viñeta).
4. Marcarla como `disponible: true` en `src/data/catalog.ts`.
5. `npm run build`: si falta una traducción, un `alt` o una fuente, la compilación falla e indica qué.
6. `npm run preview` y `npm run check:fit`: avisa si algún texto no cabe en su hueco.

## Principios

- El texto nunca va dentro del dibujo: se superpone en HTML en el idioma activo.
- Sin JavaScript se leen todas las viñetas con su texto.
- Sin cookies ni rastreadores; las preferencias se guardan solo en `localStorage`.
