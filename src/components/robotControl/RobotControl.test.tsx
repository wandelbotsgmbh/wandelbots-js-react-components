import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, onTestFinished, vi } from "vitest"
import { makeHarness } from "../../lib/robotSession/__fixtures__/robotSessionHarness"
import { RobotSessionProvider } from "../robotSession/RobotSessionProvider"
import { RobotControl } from "./RobotControl"

async function loadSession() {
  const session = await makeHarness().load().ready
  onTestFinished(() => session.dispose())
  return session
}

describe("RobotControl", () => {
  it("shows the Robot control of the provider's session", async () => {
    const session = await loadSession()

    render(
      <RobotSessionProvider session={session}>
        <RobotControl />
      </RobotSessionProvider>,
    )

    expect(screen.getByRole("heading", { name: "Robot control" })).toBeVisible()
    expect(screen.getByRole("tab", { name: "Translate" })).toHaveAttribute(
      "aria-selected",
      "true",
    )
  })

  it("takes a session as a prop too, and a panel prop overrides the session's", async () => {
    const session = await loadSession()
    const onClose = vi.fn()

    render(
      <RobotControl session={session} onClose={onClose} cartesian={false} />,
    )
    fireEvent.click(screen.getByRole("button", { name: "Close" }))

    expect(onClose).toHaveBeenCalledOnce()
    // The session's robot can jog along the TCP's axes; the app said no
    expect(screen.queryByRole("tab", { name: "Translate" })).toBeNull()
  })

  it("says what is missing without a session", () => {
    vi.spyOn(console, "error").mockImplementation(() => {})

    expect(() => render(<RobotControl />)).toThrow(/RobotSessionProvider/)
  })
})
