import react from "@vitejs/plugin-react"
import { writeFileSync } from "node:fs"
import { isAbsolute, resolve } from "node:path"
import type { Plugin } from "vite"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

// Treat anything that isn't a relative import or a file inside this package
// as an external dependency. This correctly externalizes subpath imports like
// "@wandelbots/nova-js/v2" or "@mui/material/Button" (which a plain string
// list of package names cannot match) and, combined with preserveModules,
// prevents third-party code from leaking into dist/node_modules.
const isExternal = (id: string, importer: string | undefined) => {
  if (!importer) return false
  if (id.startsWith(".")) return false
  if (isAbsolute(id)) {
    return /[\\/]node_modules[\\/]/.test(id)
  }
  return true
}

// With preserveModules, each imported `.svg` produces an adjacent
// `foo.svg.js` chunk in dist/. TypeScript (and api-extractor) resolve the
// `./foo.svg` specifier in the emitted `.d.ts` files to that adjacent path
// and then can't find a matching `.d.ts`, which makes api-extractor throw
// an internal error. Emit a tiny `foo.svg.d.ts` shim next to each SVG
// output so both the declaration resolver and api-extractor are happy.
// The shim matches src/declarations.d.ts for consistency.
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
      // Multiple entry points for modular exports. With preserveModules
      // enabled below, Rollup also emits one output file per source module,
      // mirroring the src/ tree. This lets consumers deep-import any
      // individual component (e.g. "<pkg>/components/DataGrid") for better
      // bundle size and dev-server performance, while the aggregate entries
      // below continue to work as a non-breaking convenience.
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        core: resolve(__dirname, "src/core.ts"),
        "3d": resolve(__dirname, "src/3d.ts"),
        "wb-icons": resolve(__dirname, "src/wb-icons.ts"),
      },
      // Formats are specified per-output below to get distinct file
      // extensions per format (`.js` for ESM, `.cjs` for CJS). This is
      // required because this package is `"type": "module"` — Node would
      // otherwise refuse to load CJS content from a `.js` file.
      formats: [],
    },
    rollupOptions: {
      external: isExternal,
      input: {
        index: resolve(__dirname, "src/index.ts"),
        core: resolve(__dirname, "src/core.ts"),
        "3d": resolve(__dirname, "src/3d.ts"),
        "wb-icons": resolve(__dirname, "src/wb-icons.ts"),
      },
      output: [
        {
          format: "es",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
          assetFileNames: "[name][extname]",
        },
        {
          format: "cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].cjs",
          assetFileNames: "[name][extname]",
          exports: "named",
        },
      ],
    },
    sourcemap: true,
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
