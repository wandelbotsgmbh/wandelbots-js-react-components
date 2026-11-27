import { act, render, renderHook } from "@testing-library/react"
import { observer } from "mobx-react-lite"
import { runInAction } from "mobx"
import { describe, expect, it, onTestFinished } from "vitest"
import {
  controllerState,
  makeHarness,
  motionGroupState,
} from "../../lib/robotSession/__fixtures__/robotSessionHarness"
import { useRobotSceneProps } from "./useRobotSceneProps"

// RobotPad's wiring of its 3D view to its stores, as the library's connected
// scene has it: a real session on a fake NOVA

/**
 * A session whose controller has a second coordinate system, "Table", and
 * whose robot has a second TCP, "Gripper"
 */
async function loadSession({ tcp = "Flange" } = {}) {
  const harness = makeHarness()
  harness.socket.firstMessage.mockResolvedValue({
    data: JSON.stringify({ result: { ...motionGroupState(), tcp } }),
  })
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
  harness.api.motionGroup.getMotionGroupDescription.mockResolvedValue({
    motion_group_model: "UniversalRobots_UR5e",
    dh_parameters: [{ type: "REVOLUTE_JOINT" }],
    operation_limits: { auto_limits: { joints: [] } },
    tcps: {
      Flange: { name: "Flange", pose: {} },
      Gripper: {
        name: "Gripper",
        pose: { position: [0, 0, 150], orientation: [0, 0, 0] },
      },
    },
  })
  const session = await harness.load().ready
  onTestFinished(() => session.dispose())
  return { session, source: harness.source }
}

/** The controller's state with the robot at `joints` */
function stateAt(joints: number[]) {
  const state = controllerState()
  const motionGroup = state.motion_groups[0]
  if (!motionGroup) throw new Error("No motion group")
  motionGroup.joint_position = joints
  return state
}

const START = [0, 0, 0, 0, 0, 0]
const END = [0.5, -0.2, 0.3, 0, 0.1, 0]

describe("useRobotSceneProps", () => {
  it("shows the end of a planned motion as a ghost until the robot is there", async () => {
    const { session, source } = await loadSession()
    const { result, rerender } = renderHook(() => useRobotSceneProps(session))
    expect(result.current.plannedJoints ?? null).toBeNull()

    act(() =>
      runInAction(() => {
        session.trajectory.plannedTrajectory = {
          startJoints: START,
          endJoints: END,
        }
      }),
    )
    rerender()
    expect(result.current.plannedJoints).toEqual(END)

    // On its way the ghost stays; once there, it would only cover the robot
    act(() => source.send(stateAt([0.25, -0.1, 0.15, 0, 0.05, 0])))
    rerender()
    expect(result.current.plannedJoints).toEqual(END)
    act(() => source.send(stateAt(END)))
    rerender()
    expect(result.current.plannedJoints ?? null).toBeNull()
  })

  it("puts the axes on the frame jogging moves in, in tool orientation on the frame of the values", async () => {
    const { session } = await loadSession()
    runInAction(() => {
      session.jogging.jogCoordSystemId = "world"
      session.jogging.selectedCoordSystemId = "CS-1"
    })
    const { result, rerender } = renderHook(() => useRobotSceneProps(session))

    expect(result.current.jogAxes?.orientation).toBe("coordsys")
    expect(result.current.jogAxes?.base?.position?.[0] ?? 0).toBeCloseTo(0)

    act(() =>
      runInAction(() => {
        session.jogging.selectedOrientation = "tool"
      }),
    )
    rerender()

    expect(result.current.jogAxes?.orientation).toBe("tool")
    // The table's frame is 100 mm along the world's X
    expect(result.current.jogAxes?.base?.position?.[0]).toBeCloseTo(100)
  })

  it("puts the TCP's axes at the selected TCP, with rings when jogging rotates", async () => {
    // Jogging takes the TCP the robot's motion stream reports
    const { session } = await loadSession({ tcp: "Gripper" })
    runInAction(() => {
      session.jogging.selectedCartesianMotionType = "rotate"
    })

    const { result } = renderHook(() => useRobotSceneProps(session))

    expect(result.current.jogAxes?.tcpOffset?.position).toEqual([0, 0, 150])
    expect(result.current.jogAxes?.rotate).toBe(true)
  })

  it("does not draw the scene again while the robot moves, also with a ghost", async () => {
    const { session, source } = await loadSession()
    runInAction(() => {
      session.trajectory.plannedTrajectory = {
        startJoints: START,
        endJoints: END,
      }
    })
    let renders = 0
    const Scene = observer(() => {
      useRobotSceneProps(session)
      renders++
      return null
    })
    render(<Scene />)
    const rendersBefore = renders

    act(() => {
      for (const step of [0.1, 0.2, 0.3]) {
        const state = stateAt(END.map((joint) => joint * step))
        const flange = state.motion_groups[0]?.flange_pose?.position
        if (flange) flange[0] += step * 100
        source.send(state)
      }
    })

    expect(session.state.rapidlyChangingMotionState.joint_position[0]).toBe(
      END[0] * 0.3,
    )
    expect(renders).toBe(rendersBefore)
  })
})
