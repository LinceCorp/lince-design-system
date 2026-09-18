/**
 * Build da biblioteca e arnês de teste.
 *
 * `external` é a linha que mais importa: React, o roteador e os ícones saem do
 * bundle. Empacotá-los aqui colocaria uma SEGUNDA cópia do React dentro de cada
 * produto — e duas cópias do React no mesmo documento quebram todo hook.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react(), dts({ include: ["src"], exclude: ["src/**/*.test.*"] })],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "react-router-dom", "lucide-react"],
    },
    // O dist é versionado: sourcemap dobraria o peso do repositório a cada tag,
    // e quem depura a casca tem o fonte ao lado.
    sourcemap: false,
    emptyOutDir: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
});
