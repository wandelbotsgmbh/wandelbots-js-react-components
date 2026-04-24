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

let hadErrors = false

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
  })

  if (!result.succeeded) {
    hadErrors = true
    console.error(
      `api-extractor failed for "${name}" with ${result.errorCount} error(s) and ${result.warningCount} warning(s).`,
    )
  } else if (result.apiReportChanged && !local) {
    hadErrors = true
    console.error(
      `\nAPI report for "${name}" is out of date.\n` +
        `Run \`pnpm api:update\` and commit the updated file(s) in etc/api-extractor/.`,
    )
  }
}

process.exit(hadErrors ? 1 : 0)
