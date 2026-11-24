import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import type { RobotControllerState } from "@wandelbots/nova-js/v2"
import { describe, expect, it, onTestFinished, vi } from "vitest"
import {
  controllerState,
  makeHarness,
  motionGroupState,
} from "../../lib/robotSession/__fixtures__/robotSessionHarness"
import { RobotSessionProvider } from "../robotSession/RobotSessionProvider"
import { RobotControl } from "./RobotControl"

async function loadSession() {
  const session = await makeHarness().load().ready
  onTestFinished(() => session.dispose())
  return session
}

/** Lets queued promise callbacks run */
async function flush() {
  for (let i = 0; i < 20; i++) await Promise.resolve()
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

  // A positioner or a turntable reports its joints only
  it("shows Move to without a pose for a motion group that reports no TCP pose", async () => {
    const harness = makeHarness()
    const session = await harness.load().ready
    onTestFinished(() => session.dispose())
    const { tcp_pose: _, ...joints } = motionGroupState()
    act(() =>
      harness.source.send({
        ...controllerState(),
        // Moved, so the message is not taken for a standstill one
        motion_groups: [{ ...joints, joint_position: [0.5, 0, 0, 0, 0, 0] }],
      } as unknown as RobotControllerState),
    )
    expect(session.state.rapidlyChangingMotionState.tcp_pose).toBeUndefined()

    render(<RobotControl session={session} />)
    fireEvent.click(screen.getByRole("tab", { name: "Move to" }))

    expect(
      screen.getByRole("textbox", {
        name: "Coordinates XYZ (mm) · Rotation vector (rad)",
      }),
    ).toHaveValue("")
  })

  // An app with several robots gives the panel the selected one. What the
  // panel holds for a robot (a held control, a typed pose, the Move to tab)
  // must not go on with the next: a new session gets a new panel.
  describe("for another session", () => {
    /** A session, activated or not, with its jogger's calls to look at */
    async function loadRobot(activated: boolean) {
      const harness = makeHarness()
      const session = await harness.load().ready
      onTestFinished(() => session.dispose())
      const activate = () =>
        act(() =>
          harness.source.send(controllerState({ mode: "MODE_CONTROL" })),
        )
      if (activated) activate()
      const { jogger } = session.jogging
      vi.spyOn(jogger, "setOptions").mockResolvedValue(undefined as never)
      vi.spyOn(jogger, "setJoggingMode").mockImplementation(async (mode) => {
        jogger.mode = mode
      })
      return {
        session,
        activate,
        translateTCP: vi
          .spyOn(jogger, "translateTCP")
          .mockResolvedValue(undefined as never),
        stop: vi.spyOn(jogger, "stop").mockResolvedValue(undefined as never),
      }
    }

    it("stops a held jog on the robot it moves, and its release stops no other robot", async () => {
      const first = await loadRobot(true)
      const second = await loadRobot(true)
      const { rerender } = render(<RobotControl session={first.session} />)

      fireEvent.pointerDown(screen.getByRole("button", { name: "Jog X+" }), {
        button: 0,
        pointerId: 1,
      })
      await act(flush)
      expect(first.translateTCP).toHaveBeenCalledOnce()

      rerender(<RobotControl session={second.session} />)
      await act(flush)
      expect(first.stop).toHaveBeenCalledOnce()
      expect(first.session.jogging.jogger.mode).toBe("off")

      // The finger comes up on the panel of the second robot
      fireEvent.pointerUp(screen.getByRole("button", { name: "Jog X+" }), {
        pointerId: 1,
      })
      await act(flush)
      expect(second.stop).not.toHaveBeenCalled()
      expect(second.translateTCP).not.toHaveBeenCalled()
    })

    it("plans a pose that was typed for one robot for no other, and opens on the other's own tab", async () => {
      const first = await loadRobot(true)
      const second = await loadRobot(false)
      const { rerender } = render(<RobotControl session={first.session} />)
      fireEvent.click(screen.getByRole("tab", { name: "Move to" }))
      fireEvent.click(screen.getByRole("button", { name: "Edit pose" }))
      const field = screen.getByRole("textbox", {
        name: "Coordinates XYZ (mm) · Rotation vector (rad)",
      })
      fireEvent.change(field, { target: { value: "(1, 2, 3, 0, 0, 0)" } })
      fireEvent.keyDown(field, { key: "Enter" })
      // Planned (this fake NOVA has no planner, so with an error)
      await waitFor(() =>
        expect(first.session.targetPose.staged?.displayString).toContain("1"),
      )

      rerender(<RobotControl session={second.session} />)
      // The second robot may move now: a typed pose waits for that, and its
      // planning starts at once
      second.activate()

      expect(second.session.targetPose.draft).toBe("")
      expect(second.session.targetPose.confirming).toBe(false)
      await act(flush)
      expect(second.session.targetPose.staged).toBeNull()
      // The first robot's plan went with its panel
      expect(first.session.targetPose.staged).toBeNull()
      expect(screen.getByRole("tab", { name: "Translate" })).toHaveAttribute(
        "aria-selected",
        "true",
      )
    })
  })

  it("says what is missing without a session", () => {
    vi.spyOn(console, "error").mockImplementation(() => {})

    expect(() => render(<RobotControl />)).toThrow(/RobotSessionProvider/)
  })
})
