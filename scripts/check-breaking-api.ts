/**
 * The release guard. It diffs the committed API reports
 * (etc/api-extractor/*.api.md) and fails when a line is removed or changed,
 * unless the release would be a major version, or a message says that a
 * person reviewed the change (`API-CHANGE-REVIEWED: <why>`).
 *
 * Two uses:
 *
 *   pnpm run api:check-breaking   In a pull request (check.yml): the PR base
 *                                 against the PR head. The message that the
 *                                 squash merge will have is the title and the
 *                                 description of the PR (and the commits).
 *   pnpm run api:release-guard    On main, before semantic-release
 *                                 (release.yml): the last release tag
 *                                 against HEAD, with the messages in between.
 *                                 This is the check that cannot be skipped:
 *                                 it reads what semantic-release reads, so it
 *                                 stops a release that would hide a break.
 *
 * The decision is in releaseGuard.ts (tested in releaseGuard.test.ts).
 *
 * Environment (pull request):
 *   BASE_REF         – base ref to diff against (defaults to origin/main)
 *   HEAD_REF         – head ref (defaults to HEAD)
 *   PR_TITLE, PR_BODY – title and description of the pull request
 *   GITHUB_OUTPUT    – if set, appends `breaking=true|false`
 *   COMMENT_BODY_OUT – if set, writes the markdown comment body to this path
 */
import { execFileSync } from "node:child_process"
import { appendFileSync, writeFileSync } from "node:fs"
import {
  apiDiffBreaks,
  hasReviewedMarker,
  judge,
  releaseTypeOf,
} from "./releaseGuard"

const releaseMode = process.argv.includes("--release")
const outputFile = process.env.GITHUB_OUTPUT
const commentOut = process.env.COMMENT_BODY_OUT

function git(...args: string[]): string {
  return execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: 50 * 1024 * 1024,
  })
}

function setOutput(name: string, value: boolean) {
  if (outputFile) {
    appendFileSync(outputFile, `${name}=${value}\n`)
  }
}

/** The messages of the commits after `from`, up to `to` */
function commitMessages(from: string, to: string): string[] {
  return git("log", "--format=%B%x1e", `${from}..${to}`)
    .split("\x1e")
    .map((message) => message.trim())
    .filter(Boolean)
}

function fail(message: string): never {
  console.error(message)
  setOutput("breaking", false)
  process.exit(1)
}

let baseCommit: string
let headRef: string
let messages: string[]

if (releaseMode) {
  headRef = "HEAD"
  let tag = ""
  try {
    tag = git(
      "describe",
      "--tags",
      "--abbrev=0",
      "--match",
      "v[0-9]*",
      "HEAD",
    ).trim()
  } catch {
    // No release before this one
  }
  if (!tag) {
    console.log("No earlier release tag: nothing to guard.")
    process.exit(0)
  }
  console.log(`Last release: ${tag}`)
  baseCommit = tag
  messages = commitMessages(tag, headRef)
} else {
  const baseRef = process.env.BASE_REF ?? "origin/main"
  headRef = process.env.HEAD_REF ?? "HEAD"
  try {
    git("rev-parse", "--verify", baseRef)
  } catch {
    // The guard must not pass because it could not look
    fail(`Could not resolve the base ref "${baseRef}"; set BASE_REF.`)
  }
  baseCommit = git("merge-base", baseRef, headRef).trim()
  const squash = `${process.env.PR_TITLE ?? ""}\n\n${process.env.PR_BODY ?? ""}`
  messages = [squash, ...commitMessages(baseCommit, headRef)]
}

const diff = git(
  "diff",
  "--unified=0",
  "--no-color",
  baseCommit,
  headRef,
  "--",
  "etc/api-extractor/*.api.md",
)

const apiBreaks = apiDiffBreaks(diff)
const releaseType = await releaseTypeOf(messages)
const reviewed = hasReviewedMarker(messages)
const verdict = judge({ apiBreaks, releaseType, reviewed })

console.log(
  `API reports: ${apiBreaks ? "lines removed or changed" : "no break"}; ` +
    `release would be: ${releaseType ?? "none"}; reviewed marker: ${reviewed}`,
)
console.log(verdict.reason)
setOutput("breaking", apiBreaks)

if (commentOut && apiBreaks) {
  const heading = verdict.ok
    ? ":white_check_mark: The API changes, and the release says so"
    : ":x: The API changes, but the release would not say so"
  const body =
    `### ${heading}\n\n` +
    "This PR removes or changes lines in the public API reports under " +
    "`etc/api-extractor/*.api.md`. The test is rough: a renamed internal or " +
    "a reordered export also counts.\n\n" +
    `${verdict.reason.replace(/^/gm, "> ")}\n\n` +
    "The release job checks this again on `main` before it publishes, " +
    "with the message of the squash merge. Keep the line in the PR " +
    "description so that the squash merge keeps it.\n\n" +
    "<details><summary>Diff of API reports</summary>\n\n" +
    "```diff\n" +
    diff.trim() +
    "\n```\n\n</details>\n"
  writeFileSync(commentOut, body)
}

if (!verdict.ok) {
  if (releaseMode) {
    console.error(
      "\nThe release is stopped: nothing is published. Add a commit to main " +
        "(through a pull request) whose message has the line that is asked for, " +
        "for example an empty commit. The guard then reads it and the release " +
        "goes on.",
    )
  }
  process.exit(1)
}
