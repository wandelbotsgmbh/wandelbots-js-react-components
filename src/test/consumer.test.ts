/**
 * Consumer import tests.
 *
 * These tests run against the built dist/ output, exercising the package's
 * `exports` map the same way a real downstream consumer would. They check:
 *
 *   1. Every public subpath resolves via Node's `exports` resolver to a file
 *      that actually exists on disk (ESM, CJS, and .d.ts).
 *   2. The wildcard subpath export lets consumers deep-import any module
 *      under src/ (including folder-based ones like Timer/CycleTimer that
 *      have a sibling barrel).
 *   3. Named exports remain importable AND the MUI-style default export is
 *      also available and identical to the named one for primary components.
 *
 * Run via `pnpm test:consumer` (which builds first) or as part of
 * `pnpm test:unit:run` once dist/ exists.
 */
import { execFileSync } from "node:child_process"
import {
  existsSync,
  mkdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { createRequire } from "node:module"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..")
const distDir = resolve(repoRoot, "dist")
const pkgName = "@wandelbots/wandelbots-js-react-components"

// Create a scratch directory outside the repo with a node_modules symlink
// pointing at the repo, so the Node resolver treats us as if we were
// installed as a dependency.
const sandbox = resolve(repoRoot, ".tmp-consumer-test")
const sandboxReq = createRequire(resolve(sandbox, "consumer.cjs"))
// A tiny .mjs helper that prints the ESM resolution of `process.argv[2]`.
// We invoke it as a child Node process because Vite's SSR runtime (used by
// vitest) strips `import.meta.resolve`, and we specifically want to verify
// Node's own resolver honours our `exports` map.
const esmResolverScript = resolve(sandbox, "resolve-esm.mjs")

beforeAll(() => {
  if (!existsSync(distDir)) {
    throw new Error(
      "dist/ not found. Run `pnpm build` before running the consumer tests.",
    )
  }
  rmSync(sandbox, { recursive: true, force: true })
  mkdirSync(resolve(sandbox, "node_modules/@wandelbots"), { recursive: true })
  symlinkSync(repoRoot, resolve(sandbox, "node_modules", pkgName), "dir")
  writeFileSync(
    esmResolverScript,
    'import { fileURLToPath } from "node:url"\n' +
      "process.stdout.write(fileURLToPath(import.meta.resolve(process.argv[2])))\n",
  )
})

afterAll(() => {
  rmSync(sandbox, { recursive: true, force: true })
})

function resolveEsm(spec: string): string {
  return execFileSync(process.execPath, [esmResolverScript, spec], {
    encoding: "utf8",
    cwd: sandbox,
  })
}

function resolveCjs(spec: string): string {
  return sandboxReq.resolve(spec)
}

// The exports map doesn't advertise a `types` condition, but TypeScript's
// resolver uses the same path with a `.d.ts` extension. Probe the ESM path
// and swap the extension.
function typesFor(esmPath: string): string {
  return esmPath.replace(/\.js$/, ".d.ts")
}

describe("package exports — aggregate entries", () => {
  const entries = [
    { spec: pkgName, esm: "dist/index.js", cjs: "dist/index.cjs" },
    { spec: `${pkgName}/core`, esm: "dist/core.js", cjs: "dist/core.cjs" },
    { spec: `${pkgName}/3d`, esm: "dist/3d.js", cjs: "dist/3d.cjs" },
    {
      spec: `${pkgName}/wb-icons`,
      esm: "dist/wb-icons.js",
      cjs: "dist/wb-icons.cjs",
    },
  ]

  it.each(entries)("$spec resolves ESM, CJS, and types", ({
    spec,
    esm,
    cjs,
  }) => {
    const esmPath = resolveEsm(spec)
    const cjsPath = resolveCjs(spec)
    expect(esmPath).toBe(resolve(repoRoot, esm))
    expect(cjsPath).toBe(resolve(repoRoot, cjs))
    expect(existsSync(esmPath)).toBe(true)
    expect(existsSync(cjsPath)).toBe(true)
    expect(existsSync(typesFor(esmPath))).toBe(true)
  })
})

describe("package exports — deep component imports", () => {
  const specs = [
    // File-backed modules resolved via the "./*" wildcard.
    "components/DataGrid",
    "components/AppHeader",
    "components/LogPanel",
    "components/ProgramControl",
    "components/RobotCard",
    "components/TabBar",
    "components/VelocitySlider",
    "components/jogging/JoggingPanel",
    "components/jogging/JoggingStore",
    "components/jogging/JoggingCartesianAxisControl",
    "components/safetyBar/SafetyBar",
    "components/3d-viewport/SafetyZonesRenderer",
    "components/3d-viewport/TrajectoryRenderer",
    "components/robots/Robot",
    "components/robots/MotionGroupVisualizer",
    "components/modal/NoMotionGroupModal",
    "lib/ConnectedMotionGroup",
    "lib/JoggerConnection",
    "lib/MotionStreamConnection",
    "themes/createDarkTheme",
    // Directory-backed modules that have a sibling barrel so the wildcard
    // subpath still resolves. Regression test for copilot review comment.
    "components/Timer",
    "components/CycleTimer",
  ]

  it.each(specs)("%s resolves ESM, CJS, and types", (sub) => {
    const spec = `${pkgName}/${sub}`
    const esmPath = resolveEsm(spec)
    const cjsPath = resolveCjs(spec)
    expect(esmPath).toMatch(/\.js$/)
    expect(cjsPath).toMatch(/\.cjs$/)
    expect(existsSync(esmPath)).toBe(true)
    expect(existsSync(cjsPath)).toBe(true)
    expect(existsSync(typesFor(esmPath))).toBe(true)
  })
})

describe("MUI-style default + named exports", () => {
  // These modules are the primary public "one-component-per-file" entries
  // that downstream apps will import directly. Each must expose both a
  // named export (preserving the existing API) and a matching `default`
  // export (the MUI-style convention introduced by this PR).
  const cases = [
    { sub: "components/DataGrid", name: "WandelbotsDataGrid" },
    { sub: "components/AppHeader", name: "AppHeader" },
    { sub: "components/TabBar", name: "TabBar" },
    { sub: "components/ProgramControl", name: "ProgramControl" },
    { sub: "components/RobotCard", name: "RobotCard" },
    { sub: "components/VelocitySlider", name: "VelocitySlider" },
    { sub: "components/jogging/JoggingPanel", name: "JoggingPanel" },
    { sub: "components/jogging/JoggingStore", name: "JoggingStore" },
    { sub: "components/safetyBar/SafetyBar", name: "SafetyBar" },
    { sub: "components/Timer", name: "Timer" },
    { sub: "components/CycleTimer", name: "CycleTimer" },
    { sub: "lib/ConnectedMotionGroup", name: "ConnectedMotionGroup" },
    { sub: "lib/JoggerConnection", name: "JoggerConnection" },
    { sub: "lib/MotionStreamConnection", name: "MotionStreamConnection" },
  ]

  it.each(cases)("$sub exposes $name as both named and default", async ({
    sub,
    name,
  }) => {
    const mod = (await import(`${pkgName}/${sub}`)) as Record<string, unknown>
    expect(mod[name], `missing named export ${name}`).toBeDefined()
    expect(mod.default, "missing default export").toBeDefined()
    expect(mod.default).toBe(mod[name])
  })
})

describe("aggregate barrel preserves named exports", () => {
  it("@wandelbots/.../core re-exports the same symbols as deep imports", async () => {
    const core = await import(`${pkgName}/core`)
    const deep = await import(`${pkgName}/components/DataGrid`)
    expect(core.WandelbotsDataGrid).toBe(deep.WandelbotsDataGrid)
  })

  it("@wandelbots/.../3d re-exports the same symbols as deep imports", async () => {
    const agg = await import(`${pkgName}/3d`)
    const deep = await import(`${pkgName}/components/robots/Robot`)
    expect(agg.Robot).toBe(deep.Robot)
  })
})

describe("CJS interop", () => {
  it("require() returns the same symbols as import", async () => {
    const esm = (await import(`${pkgName}/components/DataGrid`)) as Record<
      string,
      unknown
    >
    const cjs = sandboxReq(`${pkgName}/components/DataGrid`) as Record<
      string,
      unknown
    >
    expect(cjs.default).toBe(cjs.WandelbotsDataGrid)
    // Both resolvers must reach a real, loadable module (the identities
    // naturally differ between ESM/CJS, so we compare by exported keys).
    expect(Object.keys(cjs).sort()).toEqual(Object.keys(esm).sort())
  })

  // Regression test: Vitest's `await import()` goes through Vite's lenient
  // resolver, which happily accepts extensionless ESM specifiers like
  // `lodash-es/throttle`. Real downstream consumers hit Node's strict ESM
  // resolver, which requires `.js`. Spawn a real Node process so the whole
  // dependency graph (including transitive imports from dist/) is exercised
  // under strict resolution.
  it.each([
    "components/DataGrid",
    "components/VelocitySlider",
    "components/jogging/JoggingPanel",
    "components/jogging/JoggingJointValueControl",
    "components/jogging/JoggingJointLimitDetector",
    "components/jogging/JoggingStore",
  ])("Node strict ESM can import %s and its transitive deps", (sub) => {
    // Redirect stderr to stdout so the assertion message surfaces any
    // "Cannot find module" errors from the child process.
    execFileSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `await import(${JSON.stringify(`${pkgName}/${sub}`)})`,
      ],
      { cwd: sandbox, stdio: "pipe", encoding: "utf8" },
    )
  })

  it('Node can load the CJS output under `"type": "module"`', () => {
    // Sanity check that `.cjs` extension was emitted (not `.cjs.js`) so
    // that Node's CJS loader accepts it despite the package being ESM.
    const output = execFileSync(
      process.execPath,
      [
        "-e",
        "const m = require(process.argv[1]); " +
          "console.log(typeof m.WandelbotsDataGrid);",
        resolve(repoRoot, "dist/components/DataGrid.cjs"),
      ],
      { encoding: "utf8" },
    ).trim()
    expect(output).toBe("function")
  })
})
