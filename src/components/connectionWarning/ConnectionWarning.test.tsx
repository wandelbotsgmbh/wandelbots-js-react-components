import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { ConnectionWarning } from "./ConnectionWarning"

const NOW = Date.parse("2026-11-23T12:00:00Z")
const secondsAgo = (seconds: number) => NOW - seconds * 1000

beforeEach(() => {
  // Only the clock: the tooltip's own timers run as they are
  vi.useFakeTimers({ toFake: ["Date"] })
  vi.setSystemTime(NOW)
})
afterEach(() => {
  vi.useRealTimers()
})

describe("ConnectionWarning", () => {
  it("shows nothing while the robot's live state arrives", () => {
    const { container } = render(
      <ConnectionWarning quality="good" lastMessageAt={secondsAgo(1)} />,
    )
    expect(container).toBeEmptyDOMElement()

    // Late messages, but no warning yet
    render(
      <ConnectionWarning quality="struggling" lastMessageAt={secondsAgo(3)} />,
    )
    expect(screen.queryByLabelText("Connection interrupted")).toBeNull()
  })

  it("warns when the live state stopped, and says when it last came", async () => {
    render(
      <ConnectionWarning quality="critical" lastMessageAt={secondsAgo(12)} />,
    )

    fireEvent.mouseOver(screen.getByLabelText("Connection interrupted"))

    expect(
      await screen.findByText(
        /The last motion update was received 12 seconds ago/,
      ),
    ).toBeVisible()
  })

  it("shows the last message that could not be used when it came after the last good one", async () => {
    render(
      <ConnectionWarning
        quality="critical"
        lastMessageAt={secondsAgo(12)}
        lastInvalidMessage={{ receivedAt: secondsAgo(4), data: "not json" }}
      />,
    )

    fireEvent.mouseOver(screen.getByLabelText("Connection interrupted"))

    expect(await screen.findByText("not json")).toBeVisible()
    expect(screen.getByText(/Error message from 4 seconds ago/)).toBeVisible()
  })

  it("leaves out an unusable message that is older than the last good one", async () => {
    render(
      <ConnectionWarning
        quality="critical"
        lastMessageAt={secondsAgo(12)}
        lastInvalidMessage={{ receivedAt: secondsAgo(30), data: "not json" }}
      />,
    )

    fireEvent.mouseOver(screen.getByLabelText("Connection interrupted"))

    await screen.findByText(/The last motion update/)
    expect(screen.queryByText("not json")).toBeNull()
  })
})
