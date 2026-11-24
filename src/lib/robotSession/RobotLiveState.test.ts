import type { CoordinateSystem } from "@wandelbots/nova-js/v2"
import { describe, expect, test } from "vitest"
import type { JoggingStore } from "../../components/jogging/JoggingStore"
import type { ControllerStateStream } from "../ControllerStateStream"
import type { RobotDescription } from "./RobotDescription"
import { RobotLiveState } from "./RobotLiveState"

// Ported from RobotPad (unit/activeRobotCoordinateSystems.test.ts,
// unit/poseReadouts.test.ts), where this was ActiveRobotStore's

const shownReadout = {
  tcp: "Flange",
  coordinate_system: "world",
  joint_position: [0, -1.57, -1.57, -1.57, 1.57, -1.57],
  tcp_pose: { position: [185, 0, 330], orientation: [0, 0, 0] },
}

// What the stream delivered since: inside the noise filter, so not shown yet
const storedState = {
  ...shownReadout,
  joint_position: [0.00015, -1.57, -1.57, -1.57, 1.57, -1.57],
  tcp_pose: { position: [185.1, 0.05, 330.02], orientation: [0, 0, 0.0001] },
}

function coordinateSystem(
  id: string,
  name: string,
  position: [number, number, number],
): CoordinateSystem {
  return {
    coordinate_system: id,
    name,
    reference_coordinate_system: "",
    position,
    orientation: [0, 0, 0],
    orientation_type: "ROTATION_VECTOR",
  }
}

/** The live state with only the parts its poses read */
function liveState(
  jogging: {
    coordSystems?: CoordinateSystem[]
    selectedCoordSystemId?: string
  } = {},
  motionState: {
    readoutState: object
    rapidlyChangingMotionState: object
  } = { readoutState: shownReadout, rapidlyChangingMotionState: storedState },
) {
  return new RobotLiveState(
    {
      motionGroupId: "0@robot1",
      ...motionState,
    } as unknown as ControllerStateStream,
    {
      tcpOffsetsById: {
        Flange: {
          name: "Flange",
          pose: { position: [0, 0, 0], orientation: [0, 0, 0] },
        },
      },
    } as unknown as RobotDescription,
    {
      coordSystems: jogging.coordSystems ?? [],
      selectedTcpId: "Flange",
      selectedCoordSystemId: jogging.selectedCoordSystemId ?? "world",
    } as unknown as JoggingStore,
  )
}

describe("the poses that readouts show", () => {
  test("the TCP pose is the readout", () => {
    expect(liveState().displayedTcpPose).toEqual(shownReadout.tcp_pose)
  })

  test("the joints are the readout", () => {
    expect(liveState().jointPose).toEqual(shownReadout.joint_position)
  })

  /**
   * Only the pose readouts get the noise filter. Everything that saves or
   * plans keeps reading the stored state, which follows the stream.
   */
  test("saving a pose still reads the stored state", () => {
    const state = liveState()

    expect(state.measuredTcpPoseReference.pose).toEqual(storedState.tcp_pose)
    expect(state.displayedTcpPoseReference.pose.position).toEqual(
      storedState.tcp_pose.position,
    )
  })
})

// A positioner or a turntable reports joints only
describe("a motion group that reports no TCP pose", () => {
  const { tcp_pose: _shown, ...shownJoints } = shownReadout
  const { tcp_pose: _stored, ...storedJoints } = storedState
  const withoutTcpPose = () =>
    liveState(
      {},
      { readoutState: shownJoints, rapidlyChangingMotionState: storedJoints },
    )

  test("has no TCP pose to show, and still shows its joints", () => {
    const state = withoutTcpPose()

    // A readout reads this while it renders: it must not throw
    expect(state.displayedTcpPose).toBeNull()
    expect(state.jointPose).toEqual(shownReadout.joint_position)
  })

  test("still refuses to store or plan a TCP pose it does not have", () => {
    expect(() => withoutTcpPose().displayedTcpPoseReference).toThrow(
      "Invalid current TCP pose",
    )
  })
})

test("the TCP pose is in the robot's own coordinate system, not another robot's with the same id", () => {
  // The jogging store has the coordinate systems of the robot's controller:
  // its "test" sits at 100 mm. Another controller's "test" at 10 mm must not
  // be taken, as a cell-wide list merged across controllers once did.
  const state = liveState({
    coordSystems: [
      coordinateSystem("world", "world", [0, 0, 0]),
      coordinateSystem("test", "test(100)", [100, 100, 100]),
    ],
    selectedCoordSystemId: "test",
  })

  expect(state.displayedTcpPose.position.map(Math.round)).toEqual([
    85, -100, 230,
  ])
})

// Ported from RobotPad (isRobotAtPose of src/pointsPanel/PoseStore.tsx)
describe("isAt", () => {
  const cartesian = (position: number[], orientation: number[]) => ({
    type: "cartesian" as const,
    motionGroupId: "0@robot1",
    tcpPose: {
      pose: { position, orientation },
      coordSystemId: "world",
      tcpId: "Flange",
    },
  })

  test("is at a TCP pose within 0.5 mm and 0.01 rad", () => {
    const { position, orientation } = storedState.tcp_pose

    expect(liveState().isAt(cartesian(position, orientation))).toBe(true)
    expect(
      liveState().isAt(
        cartesian([position[0] + 0.4, position[1], position[2]], orientation),
      ),
    ).toBe(true)
    expect(
      liveState().isAt(
        cartesian([position[0] + 1, position[1], position[2]], orientation),
      ),
    ).toBe(false)
    expect(liveState().isAt(cartesian(position, [0, 0, 0.02]))).toBe(false)
  })

  test("is at joint values within 0.001", () => {
    const joints = storedState.joint_position
    const joint = (values: number[]) => ({
      type: "joint" as const,
      motionGroupId: "0@robot1",
      joints: values,
    })

    expect(liveState().isAt(joint(joints))).toBe(true)
    expect(
      liveState().isAt(joint([(joints[0] ?? 0) + 0.01, ...joints.slice(1)])),
    ).toBe(false)
  })

  test("is not at a pose of a TCP the robot does not have", () => {
    const pose = cartesian(storedState.tcp_pose.position, [0, 0, 0])
    pose.tcpPose.tcpId = "missing"

    expect(liveState().isAt(pose)).toBe(false)
  })
})
