/**
 * Fails CI if the PR introduces a potentially breaking change to the public
 * API surface without a corresponding major-version-triggering commit.
 *
 * A "potentially breaking change" is detected by diffing the committed
 * api-extractor report files (etc/api-extractor/*.api.md) between the PR base
 * and HEAD. If any line is removed or modified (i.e. the diff is not purely
 * additive), the change is treated as potentially breaking.
 *
 * A change is considered appropriately versioned if at least one commit in
 * the PR contains a conventional-commit breaking-change marker:
 *   - `!` before the `:` in the subject (e.g. `feat!: ...`)
 *   - a `BREAKING CHANGE:` footer
 *
 * Environment:
 *   BASE_REF – the base branch to diff against (defaults to origin/main)
 */
import { execFileSync } from "node:child_process"

const baseRef = process.env.BASE_REF ?? "origin/main"
const headRef = process.env.HEAD_REF ?? "HEAD"

function git(...args: string[]): string {
  return execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: 50 * 1024 * 1024,
  })
}

// Ensure base ref is available.
try {
  git("rev-parse", "--verify", baseRef)
} catch {
  console.error(
    `Could not resolve base ref "${baseRef}". Make sure it has been fetched.`,
  )
  process.exit(2)
}

const mergeBase = git("merge-base", baseRef, headRef).trim()

// Diff the api report files only.
const diff = git(
  "diff",
  "--unified=0",
  "--no-color",
  mergeBase,
  headRef,
  "--",
  "etc/api-extractor/*.api.md",
)

if (!diff.trim()) {
  console.log("No changes to public API reports. Nothing to check.")
  process.exit(0)
}

// A purely additive diff only contains hunk headers and lines that start
// with a single "+". A removal or modification is signalled by a line that
// starts with a single "-" (but not "---", which is a file header).
const hasRemovalsOrEdits = diff
  .split("\n")
  .some((line) => line.startsWith("-") && !line.startsWith("---"))

if (!hasRemovalsOrEdits) {
  console.log(
    "Public API reports changed, but diff is purely additive. Treating as non-breaking.",
  )
  process.exit(0)
}

console.log(
  "Detected potentially breaking changes to the public API surface in etc/api-extractor/*.api.md.",
)

// Look for a breaking-change marker in any commit on the PR.
const commits = git(
  "log",
  "--format=%H%n%B%n--END--",
  `${mergeBase}..${headRef}`,
)
  .split("--END--\n")
  .map((c) => c.trim())
  .filter(Boolean)

const breakingMarker =
  // conventional commit `!` before the colon in the subject
  /^[a-z]+(?:\([^)]+\))?!:/im
const breakingFooter = /^BREAKING[ -]CHANGE:/im

const breakingCommit = commits.find(
  (c) => breakingMarker.test(c) || breakingFooter.test(c),
)

if (breakingCommit) {
  const sha = breakingCommit.split("\n", 1)[0]
  console.log(
    `Found breaking-change marker in commit ${sha}. semantic-release will bump the major version.`,
  )
  process.exit(0)
}

console.error(
  "\nERROR: The PR appears to contain a breaking change to the public API " +
    "but no commit uses a breaking-change marker (e.g. `feat!: ...` or a " +
    "`BREAKING CHANGE:` footer).\n\n" +
    "If this really is a breaking change, amend a commit to include the " +
    "marker so that semantic-release produces a major version bump.\n\n" +
    "If this is NOT a breaking change (for example, an internal-only type " +
    "was renamed), update etc/api-extractor/ more narrowly or adjust the " +
    "api-extractor config.",
)
process.exit(1)
