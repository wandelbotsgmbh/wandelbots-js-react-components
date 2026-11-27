import { act, renderHook } from "@testing-library/react"
import { runInAction } from "mobx"
import { describe, expect, it, onTestFinished } from "vitest"
import { makeHarness } from "../../lib/robotSession/__fixtures__/robotSessionHarness"
import { useCurrentPoseProps } from "./useCurrentPoseProps"

// RobotPad's wiring of CurrentPoseBar to its stores, as the library's
// connected component has it: a real session on a fake NOVA

/** A session whose controller has a second coordinate system, "Table" */
async function loadSession() {
  const harness = makeHarness()
  harness.api.controller.listCoordinateSystems.mockResolvedValue([
    { coordinate_system: "" },
    {
      coordinate_system: "CS-1",
      name: "Table",
      reference_coordinate_system: "world",
      position: [100, 0, 0],
      orientation: [0, 0, 0],
      orientation_type: "ROTATION_VECTOR",
    },
  ])
  const session = await harness.load().ready
  onTestFinished(() => session.dispose())
  return session
}

describe("useCurrentPoseProps", () => {
  it("shows the TCP's pose in a TCP and a frame that start as the panel's", async () => {
    const session = await loadSession()
    const store = session.jogging

    const { result } = renderHook(() => useCurrentPoseProps(session))

    expect(result.current.tcp?.value).toBe(store.selectedTcpId)
    expect(result.current.frame?.value).toBe(store.selectedCoordSystemId)
    const pose = result.current.getCurrentPose()
    expect(pose?.position[0]).toBeCloseTo(400)
    expect(pose?.position[2]).toBeCloseTo(300)
  })

  it("changes its frame apart from the panel's, and shows the pose in it", async () => {
    const session = await loadSession()
    const store = session.jogging
    const panelFrame = store.selectedCoordSystemId
    const { result, rerender } = renderHook(() => useCurrentPoseProps(session))

    act(() => result.current.frame?.onChange("CS-1"))
    rerender()

    expect(result.current.frame?.value).toBe("CS-1")
    expect(store.selectedCoordSystemId).toBe(panelFrame)
    // The table's frame is 100 mm along the world's X
    expect(result.current.getCurrentPose()?.position[0]).toBeCloseTo(300)
  })

  it("falls back to the panel's frame when the robot has no such one", async () => {
    const session = await loadSession()
    const { result, rerender } = renderHook(() => useCurrentPoseProps(session))

    act(() => result.current.frame?.onChange("not-on-this-controller"))
    rerender()

    expect(result.current.frame?.value).toBe(
      session.jogging.selectedCoordSystemId,
    )
  })

  it("shows a jog error in the library's words, or as it is without a text for it", async () => {
    const session = await loadSession()
    const store = session.jogging
    const { result, rerender } = renderHook(() => useCurrentPoseProps(session))

    runInAction(() => {
      store.lastJogError = "FeedbackCollision"
    })
    rerender()
    expect(result.current.error).toBe(
      "Cannot plan this motion: it would cause a collision",
    )

    runInAction(() => {
      store.lastJogError = "The controller went away"
    })
    rerender()
    expect(result.current.error).toBe("The controller went away")
  })
})
