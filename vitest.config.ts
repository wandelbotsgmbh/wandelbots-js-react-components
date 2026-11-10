/// <reference types="vitest" />
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    server: {
      deps: {
        // React Three Fiber and drei have no `exports` in their package.json,
        // so Node would load their CommonJS build with a second copy of
        // three.js. Vite loads their ES modules instead (`module` field).
        inline: [/@react-three\//],
      },
    },
  },
  resolve: {
    mainFields: ["module", "jsnext:main", "jsnext", "main"],
  },
})
