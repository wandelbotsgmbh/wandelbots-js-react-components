import { computed } from "mobx"
import { useMemo } from "react"
import { resolveCoordinateSystemInWorld } from "../../lib/PoseTransformer"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { robotModelOf } from "../robots/robotModelSource"
import type { RobotSceneViewProps } from "./RobotSceneView"

/**
 * The props of {@link RobotSceneView} for a robot session, as RobotPad wires
 * its 3D view:
 *
 * - the robot, drawn at its mounting with its live joints
 * - the safety zones of its controller
 * - the ghost of a planned motion's end, until the robot is there
 * - the axes jogging moves along: the coordinate system's ("Move relative
 *   to"), or in tool orientation the TCP's, with the coordinate system the
 *   values are shown in ("Values relative to") in grey
 *
 * Used in an observer, it draws again when one of these changes, but not
 * while the robot moves: the parts that follow the robot read its motion
 * state themselves.
 *
 * @internal `<RobotScene session={session} />` is the scene with these
 * props; an app replaces one by giving it to RobotScene.
 */
export function useRobotSceneProps(session: RobotSession): RobotSceneViewProps {
  const { description, jogging } = session

  // A computed value, so that the observer is told when the ghost comes or
  // goes, not at every joint value of a moving robot
  const plannedJoints = useMemo(
    () =>
      computed(() => {
        const planned = session.trajectory.plannedTrajectory
        if (!planned) return null
        const arrived = session.state.isAt({
          type: "joint",
          motionGroupId: session.motionGroupId,
          joints: planned.endJoints,
        })
        return arrived ? null : planned.endJoints
      }),
    [session],
  ).get()

  const isTool = jogging.selectedOrientation === "tool"
  const tcpId = jogging.selectedTcpId

  return {
    robot: robotModelOf(session),
    safetyZones: description.safetyZones,
    plannedJoints,
    jogAxes: {
      base: isTool
        ? resolveCoordinateSystemInWorld(
            jogging.selectedCoordSystemId,
            jogging.coordSystems,
          )
        : jogging.jogCoordSystem,
      tcpOffset: tcpId ? description.tcpOffsetsById[tcpId]?.pose : undefined,
      rapidlyChangingMotionState: session.state.rapidlyChangingMotionState,
      orientation: jogging.selectedOrientation,
      rotate: jogging.selectedCartesianMotionType === "rotate",
    },
  }
}
