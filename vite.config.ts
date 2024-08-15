import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: "index",
    },
    rollupOptions: {
      external: Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies).concat(Object.keys(pkg.devDependencies))),
    },
    sourcemap: true
  },
  plugins: [react(), svgr({
    // svgr options: https://react-svgr.com/docs/options/
    svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
    include: "**/*.svg",
  })],
})
