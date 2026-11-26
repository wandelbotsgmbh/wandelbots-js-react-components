import { render } from "@testing-library/react"
import { describe, expect, it, onTestFinished, vi } from "vitest"
import {
  makeHarness,
  motionGroupState,
} from "../../lib/robotSession/__fixtures__/robotSessionHarness"
import { RobotScene } from "./RobotScene"
import type { RobotSceneViewProps } from "./RobotSceneView"

// What RobotScene hands its view; the view's drawing has its own tests
const sceneView = vi.hoisted(() => vi.fn((_props: unknown) => null))
vi.mock("./RobotSceneView", () => ({
  RobotSceneView: (props: unknown) => sceneView(props),
}))

const drawnRobot = () =>
  (sceneView.mock.lastCall?.[0] as RobotSceneViewProps).robot

describe("RobotScene", () => {
  // E.g. RobotPad's debug joint override: the app gives the joints to show,
  // and the model, its DH parameters and its mounting stay the session's
  it("replaces only the parts of the robot that the app gives", async () => {
    const session = await makeHarness().load().ready
    onTestFinished(() => session.dispose())
    const joints = { ...motionGroupState(), joint_position: [1, 2, 3] }

    render(
      <RobotScene
        session={session}
        robot={{ rapidlyChangingMotionState: joints }}
      />,
    )

    expect(drawnRobot()).toMatchObject({
      rapidlyChangingMotionState: joints,
      modelFromController: "UniversalRobots_UR5e",
      dhParameters: session.description.dhParameters,
      mountingPosition: [0, 0, 0],
    })
    expect(drawnRobot().nova).toBe(session.nova)
  })
})
