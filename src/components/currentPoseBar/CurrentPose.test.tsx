import { render, screen } from "@testing-library/react"
import { describe, expect, it, onTestFinished } from "vitest"
import { makeHarness } from "../../lib/robotSession/__fixtures__/robotSessionHarness"
import { CurrentPose } from "./CurrentPose"

async function loadSession() {
  const session = await makeHarness().load().ready
  onTestFinished(() => session.dispose())
  return session
}

describe("CurrentPose", () => {
  it("shows the current pose of its session, and a bar prop overrides the session's", async () => {
    const session = await loadSession()

    render(<CurrentPose session={session} error="Shown by the app" />)

    expect(screen.getByText("Shown by the app")).toBeVisible()
    expect(screen.getByRole("combobox", { name: "TCP" })).toHaveTextContent(
      "Flange",
    )
  })
})
