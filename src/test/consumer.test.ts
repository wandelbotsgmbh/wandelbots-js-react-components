/**
 * Consumer import tests.
 *
 * These tests run against the built dist/ output, exercising the package's
 * `exports` map the same way a real downstream consumer would. They check:
 *
 *   1. Every public subpath resolves via Node's `exports` resolver to a file
 *      that actually exists on disk (ESM, CJS, and .d.ts).
 *   2. The wildcard subpath export lets consumers deep-import any module
 *      under src/ (including folder-based ones like SafetyBar that have an
 *      index barrel).
 *   3. Named exports remain importable AND the MUI-style default export is
 *      also available and identical to the named one for primary components.
 *   4. An entry point loads only the packages an app has for it: /session no
 *      React and no three.js, /nats and the components that draw nothing in
 *      3D no three.js, and only /nats nats.ws.
 *
 * Run via `pnpm test:consumer` (which builds first) or as part of
 * `pnpm test:unit:run` once dist/ exists.
 */
import { execFileSync } from "node:child_process"
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { createRequire } from "node:module"
import { dirname, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..")
const distDir = resolve(repoRoot, "dist")
const pkgName = "@wandelbots/wandelbots-js-react-components"
const tscPath = createRequire(import.meta.url).resolve("typescript/bin/tsc")

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
    { spec: `${pkgName}/nats`, esm: "dist/nats.js", cjs: "dist/nats.cjs" },
    {
      spec: `${pkgName}/session`,
      esm: "dist/session.js",
      cjs: "dist/session.cjs",
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

/** Every file an ESM file of dist loads, following its relative imports */
function loadedFiles(esmFile: string, seen = new Set<string>()): Set<string> {
  if (seen.has(esmFile)) return seen
  seen.add(esmFile)
  const source = readFileSync(esmFile, "utf8")
  for (const [, specifier] of source.matchAll(/from\s*"(\.[^"]+)"/g)) {
    if (specifier) loadedFiles(resolve(dirname(esmFile), specifier), seen)
  }
  return seen
}

describe("the optional peer nats.ws", () => {
  // An app without nats.ws must be able to use every other entry point
  it.each([
    "index.js",
    "core.js",
    "3d.js",
    "session.js",
  ])("is not loaded by dist/%s", (entryFile) => {
    const loadingNats = [...loadedFiles(resolve(distDir, entryFile))].filter(
      (file) => readFileSync(file, "utf8").includes('"nats.ws"'),
    )
    expect(loadingNats).toEqual([])
  })

  it("is loaded by dist/nats.js", () => {
    const loadingNats = [...loadedFiles(resolve(distDir, "nats.js"))].filter(
      (file) => readFileSync(file, "utf8").includes('"nats.ws"'),
    )
    expect(loadingNats).not.toEqual([])
  })
})

describe("theme augmentation declarations", () => {
  it.each([
    pkgName,
    `${pkgName}/core`,
  ])("%s exposes the upstream MUI extensions", (spec) => {
    const fixture = resolve(sandbox, "theme-consumer.ts")
    writeFileSync(
      fixture,
      'import type { Theme } from "@mui/material/styles"\n' +
        `import { JoggingPanel } from ${JSON.stringify(spec)}\n` +
        "const panel: unknown = JoggingPanel\n" +
        "declare const theme: Theme\n" +
        "const elevation: string | undefined = theme.palette.backgroundPaperElevation?.[2]\n" +
        "const tonal: string | undefined = theme.paletteExt?.secondary?.tonal\n" +
        "const tertiary: string = theme.palette.tertiary.main\n",
    )
    execFileSync(
      process.execPath,
      [
        tscPath,
        fixture,
        "--target",
        "es2020",
        "--module",
        "preserve",
        "--moduleResolution",
        "bundler",
        "--jsx",
        "react-jsx",
        "--strict",
        "--skipLibCheck",
        "--noEmit",
      ],
      { cwd: sandbox, encoding: "utf8", stdio: "pipe" },
    )
  }, 120_000)
})

describe("package exports — deep component imports", () => {
  // Explicit MUI-style entries. Each public component lives in its own
  // directory under `src/` with an `index.ts` barrel and is exposed at
  // `@wandelbots/.../<Name>` (matching `@mui/material/Button`). The set
  // is deliberately small — see scripts/entry-points.ts.
  const specs = [
    "SafetyBar",
    "JoggingGizmo",
    "JoggingButtons",
    "JoggingJointSlider",
    "RobotControlPanel",
    "RobotControl",
    "CurrentPose",
    "RobotScene",
    "RobotView",
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
  // export (the MUI-style convention).
  const cases = [
    { sub: "SafetyBar", name: "SafetyBar" },
    { sub: "JoggingGizmo", name: "JoggingGizmo" },
    { sub: "JoggingButtons", name: "JoggingButtons" },
    { sub: "JoggingJointSlider", name: "JoggingJointSlider" },
    { sub: "RobotControlPanel", name: "RobotControlPanel" },
    { sub: "RobotControl", name: "RobotControl" },
    { sub: "CurrentPose", name: "CurrentPose" },
    { sub: "RobotScene", name: "RobotScene" },
    { sub: "RobotView", name: "RobotView" },
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
  it("3d entry exports JointLimitGizmo", async () => {
    const threeD = await import(`${pkgName}/3d`)
    expect(typeof threeD.JointLimitGizmo).toBe("function")
  }, 120_000)

  // Vite transforms the full `core` aggregate on first import, which can
  // take several seconds when the test worker is busy. Use a generous
  // timeout so this doesn't flake on slower CI machines.
  it("@wandelbots/.../core re-exports the same symbols as the deep imports", async () => {
    const core = await import(`${pkgName}/core`)
    const deep = await import(`${pkgName}/SafetyBar`)
    expect(core.SafetyBar).toBe(deep.SafetyBar)
  }, 30_000)
})

/**
 * The packages that a file of dist/ (ESM or CJS) imports, with every relative
 * import followed, each with the files of dist/ that import it: what an app
 * needs installed to import the file
 */
function importsOf(distFile: string): Map<string, string[]> {
  const seen = new Set<string>()
  const importers = new Map<string, string[]>()
  const visit = (file: string) => {
    if (seen.has(file)) return
    seen.add(file)
    const code = readFileSync(file, "utf8")
    for (const [, spec] of code.matchAll(
      /(?:from|import|require)\s*\(?\s*"([^"]+)"/g,
    )) {
      if (spec.startsWith(".")) visit(resolve(dirname(file), spec))
      else {
        const parts = spec.split("/")
        const name = spec.startsWith("@")
          ? parts.slice(0, 2).join("/")
          : parts[0]
        importers.set(name, [
          ...(importers.get(name) ?? []),
          relative(distDir, file),
        ])
      }
    }
  }
  visit(distFile)
  return importers
}

function packagesImportedBy(esmPath: string): Set<string> {
  return new Set(importsOf(esmPath).keys())
}

/** React and what the library's UI is built with */
const UI_PACKAGES = [
  "react",
  "react-dom",
  "react-error-boundary",
  "@mui/*",
  "@emotion/*",
  "@wandelbots/mui",
  "@wandelbots/icons",
  "@wandelbots/design-tokens",
  "react-i18next",
  "i18next",
  "i18next-browser-languagedetector",
  "mobx-react-lite",
]

/** three.js and what draws with it: an app without a 3D view installs none */
const THREE_PACKAGES = ["three", "three-stdlib", "@react-three/*"]

/**
 * The packages of `unwanted` ("@mui/*" is every package of the scope) that a
 * file of dist/ loads, each with the files that import it
 */
function unwantedImports(distFile: string, unwanted: string[]): string[] {
  const isUnwanted = (name: string) =>
    unwanted.some((pattern) =>
      pattern.endsWith("/*")
        ? name.startsWith(pattern.slice(0, -1))
        : name === pattern,
    )
  return [...importsOf(distFile)]
    .filter(([name]) => isUnwanted(name))
    .map(([name, files]) => `${name} (${[...new Set(files)].join(", ")})`)
    .sort()
}

describe("the library without React: /session", () => {
  // A robot session is for every app, also one without React, without the
  // library's UI and without a 3D view
  it.each([
    "session.js",
    "session.cjs",
  ])("dist/%s loads no React, no MUI and no three.js", (entryFile) => {
    expect(
      unwantedImports(resolve(distDir, entryFile), [
        ...UI_PACKAGES,
        ...THREE_PACKAGES,
      ]),
    ).toEqual([])
  })

  // Plain Node has no `window` and no `document`: a use of one while the
  // entry loads throws here
  it.each([
    { format: "CJS", load: "require(process.argv[1])", flags: [] },
    {
      format: "ESM",
      load: "await import(process.argv[1])",
      flags: ["--input-type=module"],
    },
  ])("its $format build loads in Node, without a DOM", ({ load, flags }) => {
    const output = execFileSync(
      process.execPath,
      [
        ...flags,
        "-e",
        `const session = ${load}; ` +
          "console.log(JSON.stringify({ " +
          "loadRobotSession: typeof session.loadRobotSession, " +
          "JoggingStore: typeof session.JoggingStore, " +
          "window: typeof window, document: typeof document }))",
        `${pkgName}/session`,
      ],
      { cwd: sandbox, encoding: "utf8" },
    ).trim()
    expect(JSON.parse(output)).toEqual({
      loadRobotSession: "function",
      JoggingStore: "function",
      window: "undefined",
      document: "undefined",
    })
  })

  // Run, not only loaded: a helper of another package that a build takes
  // the wrong way (a default import of lodash-es in the CJS build) is there
  // by name and throws when it is called
  it.each([
    { format: "CJS", load: "require(process.argv[1])", flags: [] },
    {
      format: "ESM",
      load: "await import(process.argv[1])",
      flags: ["--input-type=module"],
    },
  ])("its $format build computes a pose in Node", ({ load, flags }) => {
    const output = execFileSync(
      process.execPath,
      [
        ...flags,
        "-e",
        `const session = ${load}; ` +
          "const world = { coordinate_system: 'world', name: 'World', " +
          "reference_coordinate_system: '', position: [0, 0, 0], " +
          "orientation: [0, 0, 0], orientation_type: 'ROTATION_VECTOR' }; " +
          "const found = session.resolveCoordinateSystemInWorld('world', [world]); " +
          "console.log(JSON.stringify(found.coordinate_system))",
        `${pkgName}/session`,
      ],
      { cwd: sandbox, encoding: "utf8" },
    ).trim()
    expect(JSON.parse(output)).toBe("world")
  })

  // /core exports all of /session, and one copy of it: a session of /session
  // is a session for the parts of /core
  it("/core exports everything of /session, the same objects", async () => {
    const session = (await import(`${pkgName}/session`)) as Record<
      string,
      unknown
    >
    const core = (await import(`${pkgName}/core`)) as Record<string, unknown>
    expect(Object.keys(session)).toContain("loadRobotSession")
    for (const [name, value] of Object.entries(session)) {
      expect(core[name], `/core does not export ${name} of /session`).toBe(
        value,
      )
    }
  }, 30_000)
})

describe("the public API leaves out the library's plumbing", () => {
  const aggregates = ["index", "core", "3d", "session"]
  let program: ts.Program

  beforeAll(() => {
    program = ts.createProgram(
      aggregates.map((name) => resolve(distDir, `${name}.d.ts`)),
      {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.Preserve,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        jsx: ts.JsxEmit.ReactJSX,
        skipLibCheck: true,
        noEmit: true,
      },
    )
  }, 120_000)

  /** What an app can import from an entry point: its types and its values */
  function exportsOf(name: string): Map<string, ts.Symbol> {
    const checker = program.getTypeChecker()
    const file = program.getSourceFile(resolve(distDir, `${name}.d.ts`))
    const entry = file && checker.getSymbolAtLocation(file)
    if (!entry) throw new Error(`dist/${name}.d.ts has no exports`)
    return new Map(
      checker.getExportsOfModule(entry).map((symbol) => [symbol.name, symbol]),
    )
  }

  // What the library's own code needs and no app does. An `export *` of a
  // module that holds such helpers brings them back.
  const plumbing = [
    "ControllerStateStreamError",
    "ControllerStateStreamOptions",
    "controllerStateWebsocket",
    "JOINT_NODE_NAME",
    "jointValuesUnchanged",
    "MODEL_ROTATION",
    "MOTION_DELTA_THRESHOLD",
    "parseJointsText",
    "parsePoseText",
    "quaternionToRotationVector",
    "readoutOf",
    "readoutsEqual",
    "revokeAllModelUrls",
    "TrajectoryExecutionStoreOptions",
  ]

  it.each(aggregates)("dist/%s.d.ts exports none of it", (name) => {
    const names = exportsOf(name)
    expect(plumbing.filter((plumber) => names.has(plumber))).toEqual([])
  })

  // An app receives these from a session: it names their types, but only
  // the session makes them
  it.each([
    "ControllerStateStream",
    "RobotActivation",
    "RobotDescription",
    "RobotLiveState",
    "RobotSafety",
    "RobotSession",
    "RobotSessionLoad",
    "RobotTargetPose",
    "TrajectoryExecutionStore",
  ])("/session exports %s without a constructor for apps", (name) => {
    const checker = program.getTypeChecker()
    const symbol = exportsOf("session").get(name)
    if (!symbol) throw new Error(`/session does not export ${name}`)
    const declared = checker.getAliasedSymbol(symbol)
    const constructors = checker
      .getTypeOfSymbol(declared)
      .getConstructSignatures()
    // Without a declared constructor, a class has the empty one
    expect(constructors.map((c) => c.parameters.length)).toEqual([0])
  })

  // The test above compares the values only; this one the types too
  it("/core exports every name of /session, types too", () => {
    const core = exportsOf("core")
    const missing = [...exportsOf("session").keys()].filter(
      (name) => !core.has(name),
    )
    expect(missing).toEqual([])
  })
})

describe("the peer dependencies match the entry points", () => {
  // An app that takes only /session gets no warning for a peer it does not
  // need, and has every peer that /session loads
  it("a peer is required only when /session loads it", () => {
    const pkg = JSON.parse(
      readFileSync(resolve(repoRoot, "package.json"), "utf8"),
    ) as {
      peerDependencies: Record<string, string>
      peerDependenciesMeta?: Record<string, { optional?: boolean }>
    }
    const peers = Object.keys(pkg.peerDependencies)
    const required = peers.filter(
      (peer) => !pkg.peerDependenciesMeta?.[peer]?.optional,
    )
    const loaded = new Set(
      ["session.js", "session.cjs"].flatMap((file) => [
        ...importsOf(resolve(distDir, file)).keys(),
      ]),
    )
    expect(required.sort()).toEqual(
      peers.filter((peer) => loaded.has(peer)).sort(),
    )
  })
})

describe("entry points for an app without a 3D view", () => {
  // three.js is an optional peer: an app that does not install it must still
  // build with the session (see above), the NATS source and these components
  it.each([
    "nats",
    "RobotHeader/index",
    "CurrentPose/index",
    "CurrentPoseBar/index",
    "SafetyBar/index",
    "JoggingButtons/index",
    "JoggingJointSlider/index",
  ])("dist/%s loads no three.js", (entry) => {
    for (const extension of ["js", "cjs"]) {
      expect(
        unwantedImports(
          resolve(distDir, `${entry}.${extension}`),
          THREE_PACKAGES,
        ),
      ).toEqual([])
    }
  })

  // The NATS source is for every app, also one without the library's UI
  it("dist/nats loads no React and no MUI", () => {
    for (const extension of ["js", "cjs"]) {
      expect(
        unwantedImports(resolve(distDir, `nats.${extension}`), UI_PACKAGES),
      ).toEqual([])
    }
  })
})

describe("component imports bring only what the component needs", () => {
  // An app that shows only jog buttons or joint sliders needs no 3D: their
  // imports must not reach three.js, React Three Fiber, or the NOVA
  // connection code that /core carries
  it.each([
    "JoggingButtons",
    "JoggingJointSlider",
  ])("%s pulls in no three.js, no React Three Fiber, no NOVA client", (sub) => {
    const packages = packagesImportedBy(resolveEsm(`${pkgName}/${sub}`))
    for (const heavy of [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "@wandelbots/nova-js",
      "axios",
    ]) {
      expect(packages, `${sub} imports ${heavy}`).not.toContain(heavy)
    }
  })

  // One copy: the component and its aggregate entry share the same module,
  // so an app that imports both gets one component and one i18n instance
  it.each([
    { sub: "JoggingGizmo", aggregate: "3d", name: "JoggingGizmo" },
    { sub: "JoggingGizmo", aggregate: "3d", name: "JoggingGizmoOrientation" },
    { sub: "JoggingButtons", aggregate: "core", name: "JoggingButtons" },
    {
      sub: "JoggingJointSlider",
      aggregate: "core",
      name: "JoggingJointSlider",
    },
    { sub: "RobotControlPanel", aggregate: "3d", name: "RobotControlPanel" },
    { sub: "RobotControl", aggregate: "3d", name: "RobotControl" },
    { sub: "CurrentPose", aggregate: "core", name: "CurrentPose" },
    { sub: "RobotScene", aggregate: "3d", name: "RobotScene" },
    { sub: "RobotView", aggregate: "3d", name: "RobotView" },
  ])("$sub and /$aggregate share one $name", async ({
    sub,
    aggregate,
    name,
  }) => {
    const deep = (await import(`${pkgName}/${sub}`)) as Record<string, unknown>
    const all = (await import(`${pkgName}/${aggregate}`)) as Record<
      string,
      unknown
    >
    expect(deep[name], `missing ${name}`).toBeDefined()
    expect(deep[name]).toBe(all[name])
  }, 30_000)
})

describe("CJS interop", () => {
  it("require() returns the same symbols as import", async () => {
    const esm = (await import(`${pkgName}/SafetyBar`)) as Record<
      string,
      unknown
    >
    const cjs = sandboxReq(`${pkgName}/SafetyBar`) as Record<string, unknown>
    expect(cjs.default).toBe(cjs.SafetyBar)
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
    "SafetyBar",
    "JoggingGizmo",
    "JoggingButtons",
    "JoggingJointSlider",
    "RobotControlPanel",
    "RobotControl",
    "CurrentPose",
    "RobotScene",
    "RobotView",
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
          "console.log(typeof m.SafetyBar);",
        resolve(repoRoot, "dist/SafetyBar/index.cjs"),
      ],
      { encoding: "utf8" },
    ).trim()
    expect(output).toBe("function")
  })
})
