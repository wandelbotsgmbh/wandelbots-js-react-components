/**
 * Runs @microsoft/api-extractor against each public entry point of the
 * library. Produces API report files (etc/api-extractor/*.api.md) that are
 * committed to the repo.
 *
 * The entry points are read from `scripts/entry-points.ts` (the same
 * source of truth used by `vite.config.ts`), so adding or removing a
 * component automatically updates the set of API reports.
 *
 * Usage:
 *   pnpm tsx scripts/api-extractor.ts          # fails if reports are out of date
 *   pnpm tsx scripts/api-extractor.ts --local  # updates reports locally
 */
import {
  CompilerState,
  Extractor,
  ExtractorConfig,
  ExtractorLogLevel,
  type ExtractorMessage,
  type ExtractorResult,
  type IConfigFile,
} from "@microsoft/api-extractor"
import { existsSync, readdirSync } from "node:fs"
import { resolve } from "node:path"
import { dtsRelPathFor, publicEntryNames } from "./entry-points"

const local = process.argv.includes("--local")

const repoRoot = resolve(import.meta.dirname, "..")
const distDir = resolve(repoRoot, "dist")
const apiDir = resolve(repoRoot, "etc/api-extractor")
const packageJsonPath = resolve(repoRoot, "package.json")

if (!existsSync(distDir)) {
  console.error(
    "dist/ not found. Build the library first (pnpm build) before running api-extractor.",
  )
  process.exit(1)
}

// Shared settings applied to every entry point. `mainEntryPointFilePath`
// and `apiReport.reportFileName` are filled in per entry below. Kept in TS
// (rather than a JSON file) so the `entry` map is the single source of
// truth — there's no per-entry config that can drift out of sync.
const baseConfig = {
  projectFolder: repoRoot,
  compiler: { tsconfigFilePath: resolve(repoRoot, "tsconfig.json") },
  apiReport: {
    enabled: true,
    reportFolder: apiDir,
    reportTempFolder: resolve(apiDir, "temp"),
    includeForgottenExports: false,
  },
  docModel: { enabled: false },
  dtsRollup: { enabled: false },
  tsdocMetadata: { enabled: false },
  messages: {
    compilerMessageReporting: {
      default: { logLevel: ExtractorLogLevel.Warning },
    },
    extractorMessageReporting: {
      default: { logLevel: ExtractorLogLevel.Warning },
      "ae-missing-release-tag": { logLevel: ExtractorLogLevel.None },
      "ae-forgotten-export": { logLevel: ExtractorLogLevel.None },
      "ae-internal-missing-underscore": { logLevel: ExtractorLogLevel.None },
      // We don't enforce JSDoc on every exported symbol. Extracting the
      // deep per-component entries surfaces a lot of these that never
      // fired against the aggregate bundles.
      "ae-undocumented": { logLevel: ExtractorLogLevel.None },
    },
    tsdocMessageReporting: {
      default: { logLevel: ExtractorLogLevel.None },
    },
  },
} satisfies Omit<IConfigFile, "mainEntryPointFilePath">

function reportNameFor(entryName: string): string {
  return `${entryName}.api.md`
}

const entries = [...publicEntryNames].sort()

// Build a single TypeScript compiler state covering every entry point's
// .d.ts, then reuse it across all Extractor.invoke() calls. Without this,
// api-extractor re-parses the whole declaration graph for every entry,
// which dominates runtime when there are 80+ entries. See
// https://github.com/microsoft/rushstack/issues/3557 for the upstream
// feature request; `CompilerState`'s `additionalEntryPoints` is the
// supported way to share analysis across invocations.
const entryDtsPaths = entries
  .map((name) => resolve(distDir, dtsRelPathFor(name)))
  .filter((p) => existsSync(p))

// `CompilerState.create` needs an ExtractorConfig to seed from, but only
// uses it for the tsconfig and the initial entry point. Use the first
// entry as the seed; the rest are passed via `additionalEntryPoints`.
const [seedName, ...additionalDtsPaths] = entryDtsPaths
if (seedName === undefined) {
  console.error("No entry points found.")
  process.exit(1)
}

const seedConfig = ExtractorConfig.prepare({
  configObject: {
    ...baseConfig,
    mainEntryPointFilePath: seedName,
    apiReport: {
      ...baseConfig.apiReport,
      reportFileName: reportNameFor(entries[0] as string),
    },
  },
  configObjectFullPath: undefined,
  packageJsonFullPath: packageJsonPath,
})
const compilerState = CompilerState.create(seedConfig, {
  additionalEntryPoints: additionalDtsPaths,
})

const outOfDate: string[] = []
const otherFailures: string[] = []

for (const name of entries) {
  const dtsPath = resolve(distDir, dtsRelPathFor(name))
  if (!existsSync(dtsPath)) {
    otherFailures.push(`${name}: missing declaration file ${dtsPath}`)
    continue
  }

  console.log(`\n=== api-extractor: ${name} ===`)

  const config = ExtractorConfig.prepare({
    configObject: {
      ...baseConfig,
      mainEntryPointFilePath: dtsPath,
      apiReport: {
        ...baseConfig.apiReport,
        reportFileName: reportNameFor(name),
      },
    },
    configObjectFullPath: undefined,
    packageJsonFullPath: packageJsonPath,
  })

  const result: ExtractorResult = Extractor.invoke(config, {
    compilerState,
    localBuild: local,
    showVerboseMessages: false,
    // Swallow the default "please copy etc/api-extractor/temp/..." warning;
    // we print a single clearer summary at the end instead.
    messageCallback: (message: ExtractorMessage) => {
      if (message.messageId === "console-api-report-not-copied") {
        message.logLevel = ExtractorLogLevel.None
        message.handled = true
      }
    },
  })

  if (result.apiReportChanged && !local) {
    outOfDate.push(name)
  } else if (!result.succeeded) {
    otherFailures.push(
      `${name}: ${result.errorCount} error(s), ${result.warningCount} warning(s)`,
    )
  }
}

// Any `.api.md` in etc/api-extractor/ that doesn't correspond to a current
// entry point is reported as out of date so deletions are caught in CI.
const expectedReports = new Set(entries.map(reportNameFor))
const staleReports = readdirSync(apiDir)
  .filter((f) => f.endsWith(".api.md"))
  .filter((f) => !expectedReports.has(f))

if (staleReports.length > 0 && !local) {
  console.error(
    `\nStale API report file(s) detected (no matching entry point):\n  ${staleReports.join("\n  ")}\n` +
      `Remove them from etc/api-extractor/ and commit the deletion.`,
  )
}

if (outOfDate.length > 0) {
  console.error(
    `\n${"─".repeat(72)}\n` +
      `API report${outOfDate.length > 1 ? "s are" : " is"} out of date for: ${outOfDate.join(", ")}\n\n` +
      `The public API surface of this library has changed. To fix:\n\n` +
      `  1. Run pnpm api:update\n` +
      `  2. Review the diff in etc/api-extractor/*.api.md\n` +
      `  3. Commit the updated file(s)\n\n` +
      `If the change removes or alters existing API (not purely additive),\n` +
      `make sure at least one commit in this PR carries a conventional-commit\n` +
      `breaking-change marker (e.g. "feat!: ..." or a "BREAKING CHANGE:" footer)\n` +
      `so that semantic-release produces a major version bump.\n` +
      `${"─".repeat(72)}`,
  )
}

if (otherFailures.length > 0) {
  console.error(
    `\napi-extractor reported errors:\n  ${otherFailures.join("\n  ")}`,
  )
}

process.exit(
  outOfDate.length > 0 ||
    otherFailures.length > 0 ||
    (!local && staleReports.length > 0)
    ? 1
    : 0,
)
