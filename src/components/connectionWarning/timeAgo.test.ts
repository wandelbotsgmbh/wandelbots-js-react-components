import { describe, expect, it } from "vitest"
import { timeAgo } from "./timeAgo"

const NOW = Date.parse("2026-11-23T12:00:00Z")
const secondsAgo = (seconds: number) => NOW - seconds * 1000

describe("timeAgo", () => {
  it("names the time in the largest whole unit", () => {
    expect(timeAgo(secondsAgo(5), NOW, "en")).toBe("5 seconds ago")
    expect(timeAgo(secondsAgo(90), NOW, "en")).toBe("1 minute ago")
    expect(timeAgo(secondsAgo(2 * 3600 + 59), NOW, "en")).toBe("2 hours ago")
    expect(timeAgo(secondsAgo(3 * 86400), NOW, "en")).toBe("3 days ago")
  })

  it("speaks the app's language", () => {
    expect(timeAgo(secondsAgo(5), NOW, "de")).toBe("vor 5 Sekunden")
  })

  it("says now for a time that has not passed, e.g. on a clock that is ahead", () => {
    expect(timeAgo(NOW + 3000, NOW, "en")).toBe("now")
  })
})
