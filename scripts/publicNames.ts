/**
 * Every public name of the library has a reason to be public. This reads the
 * API reports (etc/api-extractor/*.api.md), finds the reason of each name
 * where it can (a part, the props of a part, a type that a public member
 * needs, an error that a public member throws, a deprecated name), and takes
 * the others from REASONS below. The result is etc/public-names.md.
 *
 *   pnpm run api:names   writes etc/public-names.md
 *
 * src/test/publicNames.test.ts fails when a name has no reason, when a reason
 * is left for a name that is gone, or when etc/public-names.md is out of date.
 * A name without a good reason is deprecated (removing it breaks apps), and
 * goes in the next major version.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"

/** Why a public name that is none of the kinds found by itself is public */
export const REASONS: Record<string, string> = {
  loadRobotSession: "Loads a robot session: the way into `/session`",
  natsControllerStateSource:
    "The live controller state over NATS, as the `stateSource` of `loadRobotSession`",
  natsUrlOf: "The NATS address of an instance, for `natsControllerStateSource`",
  i18n: "The library's translations: an app sets their language with it",
  isRobotLoadStepError:
    "Tells a failed step of a robot load from other errors, e.g. to offer `load.retry()`",
  Pose3: "Pose math on three.js objects, for an app with a 3D view",
  parseRotationToQuaternion:
    "Turns a NOVA rotation into a three.js quaternion, for an app with a 3D view",
  deriveSelectedTcpPose:
    "The pose of the selected TCP in a coordinate system, as the pose bar shows it",
  transformPoseToCoordinateSystem:
    "A pose in another coordinate system, on plain numbers",
  resolveCoordinateSystemInWorld:
    "A coordinate system in world, through the systems it is defined in",
  poseToText: "A pose as the text that Move to reads and the pose bar copies",
  jointsToText: "Joints as the text that Move to reads",
  planErrorTranslationKey:
    "The translation key of a planning error, for an app that shows it",
  defaultGetModel:
    "The model download that `Robot` uses by default, for an app that wraps it",
  useInterpolation:
    "Smooths a stream of joint values for a 3D view of the app's own",
  useSmoothedMotionState:
    "Smooths a motion state for the `*Exact` parts, which draw it as given",
  ROBOT_LOAD_STEP_IDS:
    "The steps of a robot load, for an app that shows the progress its own way",
}

export type PublicName = {
  name: string
  /** The entry points that export it */
  entries: string[]
  /** Why it is public, or null when no reason is known */
  reason: string | null
}

type Declaration = {
  name: string
  text: string
  head: string
  comments: string
}

const DECLARATION =
  /^(?:export )?(?:declare )?(?:abstract )?(function|const|class|interface|type|enum) ([A-Za-z0-9_]+)/

/** The top-level declarations of an API report, with the comments above them */
function declarationsOf(report: string): {
  declarations: Declaration[]
  exported: Set<string>
} {
  const code = report.slice(
    report.indexOf("```ts") + 5,
    report.lastIndexOf("```"),
  )
  const declarations: Declaration[] = []
  const exported = new Set<string>()
  let comments: string[] = []
  let current: Declaration | null = null
  for (const line of code.split("\n")) {
    const reexport = line.match(
      /^export (?:\{ ([A-Za-z0-9_]+) \}|default ([A-Za-z0-9_]+));/,
    )
    if (reexport) {
      exported.add((reexport[1] ?? reexport[2]) as string)
      continue
    }
    if (line.startsWith("//")) {
      comments.push(line)
      continue
    }
    const match = line.match(DECLARATION)
    if (match) {
      current = {
        name: match[2] as string,
        head: match[1] as string,
        text: line,
        comments: comments.join("\n"),
      }
      declarations.push(current)
      comments = []
      if (line.startsWith("export ")) exported.add(current.name)
      continue
    }
    if (current && line.trim() !== "") current.text += `\n${line}`
    if (line.trim() === "") comments = []
  }
  return { declarations, exported }
}

/** Every public name of the reports in `dir`, each with its reason */
export function collectPublicNames(dir: string): PublicName[] {
  const byName = new Map<
    string,
    { entries: Set<string>; declaration: Declaration }
  >()
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".api.md"))) {
    const entry = file.replace(/\.api\.md$/, "")
    const { declarations, exported } = declarationsOf(
      readFileSync(resolve(dir, file), "utf8"),
    )
    for (const declaration of declarations) {
      if (!exported.has(declaration.name)) continue
      const known = byName.get(declaration.name)
      if (known) known.entries.add(entry)
      else
        byName.set(declaration.name, { entries: new Set([entry]), declaration })
    }
  }

  const all = [...byName.values()].map((v) => v.declaration)
  const neededBy = (name: string) =>
    all.some(
      (other) =>
        other.name !== name && new RegExp(`\\b${name}\\b`).test(other.text),
    )

  const reasonOf = (d: Declaration): string | null => {
    // The comment above the name: a deprecated member leaves its class public
    if (/@deprecated/.test(d.comments))
      return "Deprecated: kept for apps that use it, removed in the next major version"
    // PascalCase, not a CONSTANT_NAME
    if (
      (d.head === "const" || d.head === "function") &&
      /^[A-Z][A-Za-z0-9]*[a-z]/.test(d.name)
    )
      return "A part"
    if (/Props$/.test(d.name)) return "The props of a part"
    if (d.head === "class" && /Error$/.test(d.name))
      return "An error that a public member throws or rejects with"
    if (REASONS[d.name]) return REASONS[d.name] as string
    if (neededBy(d.name)) return "A type that a public member needs"
    return null
  }

  return [...byName.entries()]
    .map(([name, { entries, declaration }]) => ({
      name,
      entries: [...entries].sort(entryOrder),
      reason: reasonOf(declaration),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

/** The aggregate entries first, then the entries of the parts */
function entryOrder(a: string, b: string): number {
  const rank = (e: string) =>
    ["index", "core", "3d", "session", "nats"].indexOf(e)
  const ra = rank(a)
  const rb = rank(b)
  if (ra !== -1 || rb !== -1)
    return (ra === -1 ? 99 : ra) - (rb === -1 ? 99 : rb)
  return a.localeCompare(b)
}

export function missingReasons(names: PublicName[]): string[] {
  return names.filter((n) => n.reason === null).map((n) => n.name)
}

/** Reasons in REASONS for names that are not public any more */
export function staleReasons(names: PublicName[]): string[] {
  const publicNames = new Set(names.map((n) => n.name))
  return Object.keys(REASONS).filter((name) => !publicNames.has(name))
}

export function renderTable(names: PublicName[]): string {
  const entryName = (e: string) => (e === "index" ? "`.`" : `\`/${e}\``)
  const rows = names.map(
    (n) =>
      `| \`${n.name}\` | ${n.entries.map(entryName).join(", ")} | ${n.reason ?? "**no reason**"} |`,
  )
  return [
    "# Public names",
    "",
    "Every name that the library exports, the entry points that export it, and why it is public. Generated from `etc/api-extractor/*.api.md` by `pnpm run api:names`; reasons that the script cannot find itself are in `scripts/publicNames.ts`.",
    "",
    "| Name | Entry points | Why it is public |",
    "| --- | --- | --- |",
    ...rows,
    "",
  ].join("\n")
}

const repoRoot = resolve(import.meta.dirname, "..")
export const reportsDir = resolve(repoRoot, "etc/api-extractor")
export const tablePath = resolve(repoRoot, "etc/public-names.md")

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const names = collectPublicNames(reportsDir)
  writeFileSync(tablePath, renderTable(names))
  const missing = missingReasons(names)
  console.log(`${names.length} public names written to etc/public-names.md`)
  if (missing.length > 0) {
    console.error(`No reason for: ${missing.join(", ")}`)
    process.exit(1)
  }
}
