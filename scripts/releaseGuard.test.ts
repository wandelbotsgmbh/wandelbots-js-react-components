import { describe, expect, it } from "vitest"
import {
  apiDiffBreaks,
  hasReviewedMarker,
  judge,
  releaseTypeOf,
} from "./releaseGuard"

// The message of the squash merge that published 6.4.0 instead of 7.0.0
// (#644, shortened). It mentions the footer twice, but has no line that
// starts with it, so the release tool made a minor version of it.
const MESSAGE_OF_644 = `feat(RB-4575): release 7.0.0: only the robotics parts (#644)

Release 7.0.0 gives the library a clear definition.

## Commits, one per step

1. Remove the Program Operator parts, the own theme and the low-level
parts (\`BREAKING CHANGE\`).

## Merge

A squash merge must keep the \`BREAKING CHANGE:\` footer in the commit
message: only this footer makes semantic-release publish 7.0.0.
`

describe("apiDiffBreaks", () => {
  it("is false for no diff", () => {
    expect(apiDiffBreaks("")).toBe(false)
  })

  it("is false for a diff that only adds lines", () => {
    const diff = [
      "diff --git a/etc/api-extractor/core.api.md b/etc/api-extractor/core.api.md",
      "--- a/etc/api-extractor/core.api.md",
      "+++ b/etc/api-extractor/core.api.md",
      "@@ -10,0 +11,2 @@",
      "+export const NewPart: () => void;",
      "+",
    ].join("\n")
    expect(apiDiffBreaks(diff)).toBe(false)
  })

  it("is true when a line is removed", () => {
    const diff = [
      "--- a/etc/api-extractor/core.api.md",
      "+++ b/etc/api-extractor/core.api.md",
      "@@ -10 +9,0 @@",
      "-export const OldPart: () => void;",
    ].join("\n")
    expect(apiDiffBreaks(diff)).toBe(true)
  })

  it("is true when a line is changed", () => {
    const diff = [
      "--- a/etc/api-extractor/core.api.md",
      "+++ b/etc/api-extractor/core.api.md",
      "@@ -10 +10 @@",
      "-export type Props = { a: string };",
      "+export type Props = { a: number };",
    ].join("\n")
    expect(apiDiffBreaks(diff)).toBe(true)
  })
})

describe("releaseTypeOf: what the release tool makes of a message", () => {
  it("makes a major version of a BREAKING CHANGE footer", async () => {
    const message =
      "feat: remove the theme\n\nBREAKING CHANGE: the theme is gone"
    expect(await releaseTypeOf([message])).toBe("major")
  })

  it("makes a minor version of a plain feat", async () => {
    expect(await releaseTypeOf(["feat: add a part"])).toBe("minor")
  })

  it("makes a patch of a fix", async () => {
    expect(await releaseTypeOf(["fix: a bug"])).toBe("patch")
  })

  // The reason that 6.4.0 happened
  it("makes only a minor version of the message of #644", async () => {
    expect(await releaseTypeOf([MESSAGE_OF_644])).toBe("minor")
  })

  // A `!` after the type does not mark a break: the release tool ignores
  // the commit. A PR title like this must not count as a marker.
  it("does not read a `!` after the type as a break", async () => {
    expect(await releaseTypeOf(["feat!: remove the theme"])).not.toBe("major")
  })

  it("takes the biggest type of several messages", async () => {
    expect(
      await releaseTypeOf([
        "fix: a bug",
        "feat: a part\n\nBREAKING CHANGE: x",
        "feat: another part",
      ]),
    ).toBe("major")
  })
})

describe("hasReviewedMarker", () => {
  it("accepts a line that starts with the marker and gives a reason", () => {
    expect(
      hasReviewedMarker([
        "feat: a part\n\nAPI-CHANGE-REVIEWED: only an optional prop was added",
      ]),
    ).toBe(true)
  })

  it("needs a reason", () => {
    expect(hasReviewedMarker(["feat: a\n\nAPI-CHANGE-REVIEWED:"])).toBe(false)
    expect(hasReviewedMarker(["feat: a\n\nAPI-CHANGE-REVIEWED:   "])).toBe(
      false,
    )
  })

  it("ignores the marker inside a sentence", () => {
    expect(
      hasReviewedMarker([
        "feat: a\n\nUse API-CHANGE-REVIEWED: reason to pass the guard.",
      ]),
    ).toBe(false)
  })

  it("is false without a marker", () => {
    expect(hasReviewedMarker(["feat: a part"])).toBe(false)
  })
})

describe("judge", () => {
  it("fails a break that would make only a minor version", () => {
    const verdict = judge({
      apiBreaks: true,
      releaseType: "minor",
      reviewed: false,
    })
    expect(verdict.ok).toBe(false)
    expect(verdict.reason).toContain("BREAKING CHANGE:")
    expect(verdict.reason).toContain("API-CHANGE-REVIEWED:")
  })

  it("fails a break that would make no release", () => {
    expect(
      judge({ apiBreaks: true, releaseType: null, reviewed: false }).ok,
    ).toBe(false)
  })

  it("passes a break that makes a major version", () => {
    expect(
      judge({ apiBreaks: true, releaseType: "major", reviewed: false }).ok,
    ).toBe(true)
  })

  it("passes a break that a person has reviewed as not breaking", () => {
    expect(
      judge({ apiBreaks: true, releaseType: "minor", reviewed: true }).ok,
    ).toBe(true)
  })

  it("passes a change that only adds", () => {
    expect(
      judge({ apiBreaks: false, releaseType: "minor", reviewed: false }).ok,
    ).toBe(true)
  })
})
