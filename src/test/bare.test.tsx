// @vitest-environment jsdom
/**
 * The simple parts, used bare: imported from the built package (dist/) by
 * its own entry point, and rendered without a theme, without a provider and
 * without an i18n setup of the app. A part must render, must not log an
 * error, and must load only the packages that its row of "Peer
 * dependencies" in the README names.
 *
 * A new simple part gets a row in PARTS.
 *
 * Run via `pnpm test:consumer` (which builds first).
 */
import { render } from "@testing-library/react"
import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { createRef, type ReactElement } from "react"
import { describe, expect, it, vi } from "vitest"

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..")
const distDir = resolve(repoRoot, "dist")
const pkgName = "@wandelbots/wandelbots-js-react-components"

type Part = {
  /** The entry point, `@wandelbots/wandelbots-js-react-components/<entry>` */
  entry: string
  /** The part with only its required props, from the module of the entry */
  element: (module: Record<string, never>) => ReactElement
  /** Every package that the entry may load */
  packages: string[]
  /** Render it as a browser without WebGL does (a canvas gives no context) */
  withoutWebGL?: boolean
}

const PARTS: Part[] = [
  {
    entry: "SafetyBar",
    element: ({ SafetyBar }) => (
      <SafetyBar
        isVirtual
        motionGroupId="0@ur5e"
        operationMode="OPERATION_MODE_AUTO"
        safetyState="SAFETY_STATE_NORMAL"
      />
    ),
    packages: [
      "react",
      "@mui/material",
      "mobx-react-lite",
      "axios",
      "i18next",
      "i18next-browser-languagedetector",
      "react-i18next",
    ],
  },
  {
    entry: "JoggingGizmo",
    element: ({ JoggingGizmo }) => (
      <JoggingGizmo
        orientation={createRef()}
        onJogStart={() => {}}
        onJogStop={() => {}}
      />
    ),
    // jsdom draws no WebGL, as a browser without it: the gizmo must still
    // render, and say so through onWebGLUnavailable instead of an error
    withoutWebGL: true,
    packages: [
      "react",
      "@mui/material",
      "@react-three/fiber",
      "three",
      "@wandelbots/design-tokens",
      "i18next",
      "i18next-browser-languagedetector",
      "react-i18next",
    ],
  },
  {
    entry: "JoggingButtons",
    element: ({ JoggingButtons }) => (
      <JoggingButtons onJogStart={() => {}} onJogStop={() => {}} />
    ),
    packages: [
      "react",
      "@mui/material",
      "@wandelbots/mui",
      "@wandelbots/icons",
      "@wandelbots/design-tokens",
      "i18next",
      "i18next-browser-languagedetector",
      "react-i18next",
    ],
  },
  {
    entry: "JoggingJointSlider",
    element: ({ JoggingJointSlider }) => (
      <JoggingJointSlider
        label="J1"
        value={0.3}
        onJogStart={() => {}}
        onJogStop={() => {}}
      />
    ),
    packages: [
      "react",
      "@mui/material",
      "i18next",
      "i18next-browser-languagedetector",
      "react-i18next",
    ],
  },
  {
    entry: "CurrentPoseBar",
    element: ({ CurrentPoseBar }) => (
      <CurrentPoseBar
        getCurrentPose={() => ({
          position: [100, 200, 300],
          orientation: [0, 0, 0.5],
        })}
      />
    ),
    packages: [
      "react",
      "@mui/material",
      "@wandelbots/mui",
      "@wandelbots/icons",
      "i18next",
      "i18next-browser-languagedetector",
      "react-i18next",
    ],
  },
]

/** The packages that a file of dist/ loads, with every relative import followed */
function packagesLoadedBy(file: string, seen = new Set<string>()): Set<string> {
  const packages = new Set<string>()
  const visit = (current: string) => {
    if (seen.has(current)) return
    seen.add(current)
    const code = readFileSync(current, "utf8")
    for (const [, spec] of code.matchAll(
      /(?:from|import)\s*\(?\s*"([^"]+)"/g,
    )) {
      if (!spec) continue
      if (spec.startsWith(".")) visit(resolve(dirname(current), spec))
      else {
        const parts = spec.split("/")
        packages.add(
          spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0],
        )
      }
    }
  }
  visit(file)
  return packages
}

describe("a part used bare", () => {
  // First: the import itself must leave the app's storage alone. The
  // language detector of the library's i18n instance kept its choice in
  // localStorage, under the key that an app's own detector also uses.
  it("keeps the language out of localStorage", async () => {
    localStorage.clear()
    for (const { entry } of PARTS) {
      await import(`${pkgName}/${entry}`)
    }
    expect(localStorage.getItem("i18nextLng")).toBeNull()
  })

  it.each(PARTS)("$entry renders without a theme and without an error", async ({
    entry,
    element,
    withoutWebGL,
  }) => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {})
    const getContext = withoutWebGL
      ? vi
          .spyOn(HTMLCanvasElement.prototype, "getContext")
          .mockReturnValue(null)
      : undefined
    try {
      const module = await import(`${pkgName}/${entry}`)
      const { container } = render(element(module))
      expect(container.innerHTML).not.toBe("")
      expect(errors.mock.calls).toEqual([])
    } finally {
      errors.mockRestore()
      getContext?.mockRestore()
    }
  })

  it.each(PARTS)("$entry loads only the packages it names", ({
    entry,
    packages,
  }) => {
    const file = resolve(distDir, entry, "index.js")
    expect(existsSync(file), `dist/${entry}/index.js`).toBe(true)
    const unexpected = [...packagesLoadedBy(file)].filter(
      (name) => !packages.includes(name),
    )
    expect(unexpected).toEqual([])
  })
})
