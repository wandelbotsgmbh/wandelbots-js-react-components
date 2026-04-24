/**
 * Advisory check: diffs the committed api-extractor reports
 * (etc/api-extractor/*.api.md) between the PR base and HEAD and, if any line
 * is removed or modified (i.e. the diff is not purely additive), writes a
 * markdown report for CI to post as a PR comment asking a human to confirm
 * whether the change is actually breaking.
 *
 * This script never fails the build; the decision is left to PR review.
 *
 * Environment:
 *   BASE_REF         – base ref to diff against (defaults to origin/main)
 *   HEAD_REF         – head ref (defaults to HEAD)
 *   GITHUB_OUTPUT    – if set, appends `breaking=true|false`
 *   COMMENT_BODY_OUT – if set, writes the markdown comment body to this path
 */
import { execFileSync } from "node:child_process"
import { appendFileSync, writeFileSync } from "node:fs"

const baseRef = process.env.BASE_REF ?? "origin/main"
const headRef = process.env.HEAD_REF ?? "HEAD"
const outputFile = process.env.GITHUB_OUTPUT
const commentOut = process.env.COMMENT_BODY_OUT

function git(...args: string[]): string {
  return execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: 50 * 1024 * 1024,
  })
}

function setOutput(breaking: boolean) {
  if (outputFile) {
    appendFileSync(outputFile, `breaking=${breaking}\n`)
  }
}

try {
  git("rev-parse", "--verify", baseRef)
} catch {
  console.warn(
    `Could not resolve base ref "${baseRef}"; skipping advisory check.`,
  )
  setOutput(false)
  process.exit(0)
}

const mergeBase = git("merge-base", baseRef, headRef).trim()

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
  console.log("No changes to public API reports.")
  setOutput(false)
  process.exit(0)
}

// A purely additive diff only contains hunk headers and lines starting with
// a single "+". A removal or modification is signalled by a single "-" line
// that is not the "---" file header.
const hasRemovalsOrEdits = diff
  .split("\n")
  .some((line) => line.startsWith("-") && !line.startsWith("---"))

if (!hasRemovalsOrEdits) {
  console.log("Public API reports changed, but diff is purely additive.")
  setOutput(false)
  process.exit(0)
}

console.log("Potentially breaking API changes detected.")
setOutput(true)

if (commentOut) {
  const body =
    "### :warning: Potentially breaking API change\n\n" +
    "This PR modifies or removes lines in the public API reports under " +
    "`etc/api-extractor/*.api.md`. The heuristic is noisy (renamed " +
    "internals, reordered exports, and formatting changes can all trigger " +
    "it), so please have a reviewer confirm whether this is an actual " +
    "breaking change.\n\n" +
    "If it is breaking, use a conventional-commit breaking-change marker " +
    "(`feat!: ...` subject or a `BREAKING CHANGE:` footer) so " +
    "semantic-release bumps the major version.\n\n" +
    "<details><summary>Diff of API reports</summary>\n\n" +
    "```diff\n" +
    diff.trim() +
    "\n```\n\n</details>\n"
  writeFileSync(commentOut, body)
}
