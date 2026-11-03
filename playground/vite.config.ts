import react from "@vitejs/plugin-react"
import { resolve } from "node:path"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"
import { novaInstance } from "../e2e/novaInstance"

// The playground: a small app that shows the parts of the library with a
// real NOVA instance. It is never part of the npm package.
//
//   pnpm playground           dev server on http://localhost:5180
//   pnpm playground:build     builds into playground/dist
//   pnpm playground:preview   serves the build on http://localhost:4180
//
// The NOVA instance comes from the same values as the e2e tests (see
// e2e/novaInstance.ts): NOVA_INSTANCE_URL and NOVA_ACCESS_TOKEN, else
// WANDELAPI_BASE_URL from .env.local. CELL_ID selects the cell (default
// "cell"). Vite reads them when it starts.
//
// The access token is written into the code that the browser loads, also in
// the built files. Never publish or upload the built playground.

const repoRoot = resolve(import.meta.dirname, "..")
const instance = novaInstance()

export default defineConfig({
  root: import.meta.dirname,
  define: {
    "import.meta.env.NOVA_INSTANCE_URL": JSON.stringify(instance.url ?? ""),
    "import.meta.env.NOVA_ACCESS_TOKEN": JSON.stringify(
      instance.accessToken ?? "",
    ),
    "import.meta.env.NOVA_CELL_ID": JSON.stringify(
      process.env.CELL_ID || "cell",
    ),
  },
  resolve: {
    // The playground uses the library like an app, but from src/, so that a
    // change in src/ shows at once
    alias: [
      {
        find: /^@wandelbots\/wandelbots-js-react-components$/,
        replacement: resolve(repoRoot, "src/index.ts"),
      },
    ],
  },
  plugins: [
    react(),
    // The same SVG imports as the library build (vite.config.ts)
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
  server: { port: 5180 },
  preview: { port: 4180, strictPort: true },
  build: {
    outDir: "dist",
    // A developer tool on localhost: one large bundle is no problem
    chunkSizeWarningLimit: 4000,
  },
})
