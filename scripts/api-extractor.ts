/**
 * Runs @microsoft/api-extractor against each public entry point of the
 * library. Produces API report files (etc/api-extractor/*.api.md) that are
 * committed to the repo.
 *
 * Usage:
 *   pnpm tsx scripts/api-extractor.ts          # fails if reports are out of date
 *   pnpm tsx scripts/api-extractor.ts --local  # updates reports locally
 */
import {
  Extractor,
  ExtractorConfig,
  ExtractorLogLevel,
  type ExtractorMessage,
  type ExtractorResult,
} from "@microsoft/api-extractor"
import { existsSync } from "node:fs"
import { resolve } from "node:path"

const ENTRY_POINTS = ["index", "core", "3d", "wb-icons"] as const

const local = process.argv.includes("--local")

const repoRoot = resolve(import.meta.dirname, "..")
const distDir = resolve(repoRoot, "dist")

if (!existsSync(distDir)) {
  console.error(
    "dist/ not found. Build the library first (pnpm build) before running api-extractor.",
  )
  process.exit(1)
}

const outOfDate: string[] = []
const otherFailures: string[] = []

for (const name of ENTRY_POINTS) {
  const configPath = resolve(
    repoRoot,
    "etc/api-extractor",
    `api-extractor-${name}.json`,
  )

  console.log(`\n=== api-extractor: ${name} ===`)

  const config = ExtractorConfig.loadFileAndPrepare(configPath)
  const result: ExtractorResult = Extractor.invoke(config, {
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

if (outOfDate.length > 0) {
  console.error(
    `\n${"─".repeat(72)}\n` +
      `API report${outOfDate.length > 1 ? "s are" : " is"} out of date for: ${outOfDate.join(", ")}\n\n` +
      `The public API surface of this library has changed. To fix:\n\n` +
      `  1. Run  pnpm api:update\n` +
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

process.exit(outOfDate.length > 0 || otherFailures.length > 0 ? 1 : 0)
