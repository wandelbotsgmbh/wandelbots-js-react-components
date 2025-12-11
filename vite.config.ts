import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"
import pkg from "./package.json"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      // Multiple entry points for modular exports
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        core: resolve(__dirname, "src/core.ts"),
        "3d": resolve(__dirname, "src/3d.ts"),
        wandelscript: resolve(__dirname, "src/wandelscript.ts"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: Object.keys(pkg.dependencies).concat(
        Object.keys(pkg.peerDependencies).concat(
          Object.keys(pkg.devDependencies),
        ),
      ),
      output: {
        // Preserve the original file structure
        preserveModules: false,
        // Use [name] to generate separate files for each entry
        entryFileNames: (chunkInfo) => {
          return `${chunkInfo.name}.[format].js`
        },
      },
    },
    sourcemap: true,
  },
  optimizeDeps: {
    exclude: ["node_modules/.cache/storybook"],
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
  ],
})
