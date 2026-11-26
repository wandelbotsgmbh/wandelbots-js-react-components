/**
 * The release guard: a change of the public API that removes or changes
 * something must make a major version, or a person must have said that it
 * does not break anything.
 *
 * The pure parts are here so that they can be tested; the commands that read
 * git are in check-breaking-api.ts.
 */
import { createRequire } from "node:module"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"

export type ReleaseType = "major" | "minor" | "patch" | null

export type Verdict = { ok: boolean; reason: string }

/**
 * Whether a diff of the API reports (`git diff --unified=0`) removes or
 * changes a line. A diff that only adds lines cannot break an app. The test
 * is rough: a renamed internal or a reordered export also counts, so a
 * person can say that it is fine (see {@link hasReviewedMarker}).
 */
export function apiDiffBreaks(diff: string): boolean {
  return diff
    .split("\n")
    .some((line) => line.startsWith("-") && !line.startsWith("---"))
}

/**
 * Whether a message has a line that starts with `API-CHANGE-REVIEWED:` and
 * gives a reason: a person looked at the changed API and says that it breaks
 * nothing. Only the guard reads it; the release tool ignores it.
 */
export function hasReviewedMarker(messages: string[]): boolean {
  return messages.some((message) =>
    /^API-CHANGE-REVIEWED:[ \t]*\S/m.test(message),
  )
}

type Analyzer = (
  pluginConfig: Record<string, unknown>,
  context: {
    cwd: string
    commits: { hash: string; message: string }[]
    logger: { log: (...args: unknown[]) => void }
  },
) => Promise<ReleaseType>

const repoRoot = resolve(import.meta.dirname, "..")

/**
 * The commit analyzer that semantic-release itself loads, found the way
 * semantic-release finds it, so that the guard and the release read a
 * message the same way and in the same version.
 */
async function loadAnalyzer(): Promise<Analyzer> {
  const release = createRequire(import.meta.url).resolve(
    "semantic-release/package.json",
  )
  const analyzerPath = createRequire(release).resolve(
    "@semantic-release/commit-analyzer",
  )
  const module = await import(pathToFileURL(analyzerPath).href)
  return module.analyzeCommits
}

/** The options that release.config.js gives the commit analyzer */
async function analyzerOptions(): Promise<Record<string, unknown>> {
  const { default: config } = await import(
    pathToFileURL(resolve(repoRoot, "release.config.js")).href
  )
  const entry = (config.plugins as unknown[]).find(
    (plugin) =>
      (Array.isArray(plugin) ? plugin[0] : plugin) ===
      "@semantic-release/commit-analyzer",
  )
  return (Array.isArray(entry) ? entry[1] : undefined) ?? {}
}

/**
 * The version that semantic-release makes of these messages: the biggest of
 * them, or null for no release. A `!` after the type does not count, only a
 * line that starts with `BREAKING CHANGE:` does.
 */
export async function releaseTypeOf(messages: string[]): Promise<ReleaseType> {
  const analyze = await loadAnalyzer()
  return analyze(await analyzerOptions(), {
    cwd: repoRoot,
    commits: messages.map((message, index) => ({
      hash: String(index),
      message,
    })),
    logger: { log: () => {} },
  })
}

export function judge(input: {
  apiBreaks: boolean
  releaseType: ReleaseType
  reviewed: boolean
}): Verdict {
  if (!input.apiBreaks) {
    return { ok: true, reason: "The public API only grows." }
  }
  if (input.releaseType === "major") {
    return {
      ok: true,
      reason: "The public API changes and the release is a major version.",
    }
  }
  if (input.reviewed) {
    return {
      ok: true,
      reason:
        "The public API changes, and a message says that a person reviewed it (API-CHANGE-REVIEWED:).",
    }
  }
  return {
    ok: false,
    reason:
      `The public API reports lose or change lines, but the release would be ${input.releaseType ?? "none"}, not a major version.\n\n` +
      "Do one of these, in the pull request description and in the message of the squash merge:\n\n" +
      '  1. If apps break: add a line that starts with "BREAKING CHANGE:" and says what breaks. ' +
      'A "!" after the type (feat!:) does not make a major version.\n' +
      '  2. If nothing breaks (for example an optional prop was added): add a line that starts with "API-CHANGE-REVIEWED:" and says why.',
  }
}
