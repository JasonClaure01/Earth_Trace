// @ts-check
import { defineConfig } from "astro/config";

// Sitio 100 % estático (SPEC D-01). Las rutas por idioma se generan en src/pages/[lang]/.
export default defineConfig({
  output: "static",
  trailingSlash: "always",
  build: { inlineStylesheets: "auto" },
  devToolbar: { enabled: false },
});
