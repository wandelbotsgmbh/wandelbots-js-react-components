import react from "@vitejs/plugin-react"
import { writeFileSync } from "node:fs"
import { isAbsolute, resolve } from "node:path"
import type { Plugin } from "vite"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"
import { entry } from "./scripts/entry-points"

// Treat anything that isn't a relative import or a file inside this package
// as an external dependency. This correctly externalizes subpath imports like
// "@wandelbots/nova-js/v2" or "@mui/material/Button" (which a plain string
// list of package names cannot match), and prevents third-party code from
// leaking into dist/node_modules.
const isExternal = (id: string, importer: string | undefined) => {
  if (!importer) return false
  if (id.startsWith(".")) return false
  if (isAbsolute(id)) {
    return /[\\/]node_modules[\\/]/.test(id)
  }
  return true
}

// If any `.svg` ends up emitted as its own `foo.svg.js` chunk (e.g. when
// it is shared across multiple entries), TypeScript and api-extractor
// resolve the `./foo.svg` specifier in the emitted `.d.ts` files to that
// adjacent path and then can't find a matching `.d.ts`. Emit a tiny
// `foo.svg.d.ts` shim next to each such output. Equivalent to the
// ambient `declare module "*.svg"` in src/declarations.d.ts.
const emitSvgDts = (): Plugin => ({
  name: "emit-svg-dts",
  apply: "build",
  writeBundle(options, bundle) {
    if (options.format !== "es") return
    for (const fileName of Object.keys(bundle)) {
      if (!fileName.endsWith(".svg.js")) continue
      const dtsPath = resolve(
        options.dir ?? "dist",
        fileName.replace(/\.js$/, ".d.ts"),
      )
      writeFileSync(
        dtsPath,
        'import type { FunctionComponent, SVGAttributes } from "react"\n' +
          "declare const content: FunctionComponent<SVGAttributes<SVGElement>>\n" +
          "export default content\n",
      )
    }
  },
})

// Public entry points that get their own aggregate bundle. Additionally,
// every source file under `src/components/` is emitted as an individual
// entry so consumers can deep-import any component via the
// `./components/*` wildcard subpath export in package.json. Other source
// modules (helpers under `src/lib/`, `src/themes/`, etc.) are bundled
// into the aggregates and intentionally not exposed as a public API.
// The entry map itself lives in `scripts/entry-points.ts` so that
// `scripts/api-extractor.ts` can iterate the same list.

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "import.meta.env.WANDELAPI_BASE_URL": JSON.stringify(
      process.env.WANDELAPI_BASE_URL || "",
    ),
  },
  build: {
    copyPublicDir: false,
    lib: {
      // Multiple entry points for modular exports. The aggregate entries
      // (index/core/3d/wb-icons) are a non-breaking convenience; each
      // component file is also emitted as its own entry so consumers can
      // deep-import it via the `./components/*` subpath export in
      // package.json. Shared code is hoisted into `dist/chunks/` by
      // Rollup — nothing else in `src/` is part of the public API.
      entry,
      // Formats are specified per-output below to get distinct file
      // extensions per format (`.js` for ESM, `.cjs` for CJS). This is
      // required because this package is `"type": "module"` — Node would
      // otherwise refuse to load CJS content from a `.js` file.
      formats: [],
    },
    rollupOptions: {
      external: isExternal,
      // Rollup ignores `build.lib.entry` when `build.lib.formats` is empty,
      // so we pass the same entry map through `input` directly.
      input: entry,
      output: [
        {
          format: "es",
          entryFileNames: "[name].js",
          chunkFileNames: "chunks/[name]-[hash].js",
          assetFileNames: "[name][extname]",
        },
        {
          format: "cjs",
          entryFileNames: "[name].cjs",
          chunkFileNames: "chunks/[name]-[hash].cjs",
          assetFileNames: "[name][extname]",
          exports: "named",
        },
      ],
    },
  },
  optimizeDeps: {
    exclude: ["node_modules/.cache/storybook", "node_modules/.cache"],
  },
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
    emitSvgDts(),
  ],
})
