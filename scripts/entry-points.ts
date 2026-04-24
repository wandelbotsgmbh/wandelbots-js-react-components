import { resolve } from "node:path"

const repoRoot = resolve(import.meta.dirname, "..")

// Aggregate entry points that each get their own bundle AND a dedicated
// API report. These are the "public" surfaces of the library.
const aggregateEntries: Record<string, string> = {
  index: resolve(repoRoot, "src/index.ts"),
  core: resolve(repoRoot, "src/core.ts"),
  "3d": resolve(repoRoot, "src/3d.ts"),
  "wb-icons": resolve(repoRoot, "src/wb-icons.ts"),
}

// Explicit allowlist of MUI-style per-component entries. Each entry lives
// in its own directory under `src/` with an `index.ts` barrel, and is
// exposed to consumers at the bare subpath `@wandelbots/.../<Name>`
// (matching e.g. `@mui/material/Button`). New components should migrate
// into this list one at a time rather than being auto-globbed, so the
// public API surface stays deliberate.
export const componentNames = ["SafetyBar"] as const

// Public API entry names (used by api-extractor, consumer tests, and the
// generated package.json exports wildcard).
export const publicEntryNames: readonly string[] = [
  ...Object.keys(aggregateEntries),
  ...componentNames,
]

// Vite entry map. Aggregate entries emit as `dist/<name>.js`; component
// entries emit as `dist/<name>/index.js` so that both the bundled JS and
// tsc's generated `dist/<name>/index.d.ts` live under the same folder
// (matching MUI's on-disk layout).
export const entry: Record<string, string> = {
  ...aggregateEntries,
  ...Object.fromEntries(
    componentNames.map((name) => [
      `${name}/index`,
      resolve(repoRoot, `src/${name}/index.ts`),
    ]),
  ),
}

// Relative path from dist/ to the emitted declaration file for a public
// entry name.
export function dtsRelPathFor(entryName: string): string {
  return entryName in aggregateEntries
    ? `${entryName}.d.ts`
    : `${entryName}/index.d.ts`
}
