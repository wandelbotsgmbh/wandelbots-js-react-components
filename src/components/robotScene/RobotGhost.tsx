import type { MotionGroupState } from "@wandelbots/nova-js/v2"
import { observer } from "mobx-react-lite"
import { type Ref, useCallback, useMemo } from "react"
import type { Group } from "three"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { MODEL_ROTATION } from "../robots/modelRotation"
import { MotionGroupVisualizerExact } from "../robots/MotionGroupVisualizer"
import { defaultGetModel } from "../robots/robotModelLogic"
import { type RobotModelSource, robotModelOf } from "../robots/robotModelSource"
import type { SupportedRobotProps } from "../robots/SupportedRobot"

/** The robot of a {@link RobotGhost}: a session's, or the app's own data */
export type RobotGhostRobot =
  | {
      /** The robot of this session */
      session: RobotSession
      robot?: never
    }
  | {
      /**
       * The robot as plain data, see `RobotModelSource`. Its motion state is
       * not read: the ghost stands at `joints`.
       */
      robot: RobotModelSource
      session?: never
    }

/** Props of {@link RobotGhost} */
export type RobotGhostProps = RobotGhostRobot & {
  /**
   * The joints the ghost stands at: one value per joint, in rad, or mm for
   * a linear axis
   */
  joints: number[]
  /** The ghost's colour, e.g. a CSS colour or a colour of the theme */
  color: string
  /** From 0 (unseen) to 1 (solid). Default: 0.3 */
  opacity?: number
  /**
   * The flange of the ghost: the app draws a part of its own there, e.g. a
   * marker of the TCP, with `createPortal` of React Three Fiber
   */
  flangeRef?: Ref<Group>
  /**
   * Gives the URL of the model file. Defaults to `defaultGetModel`,
   * downloading from the robot's `nova` connection.
   */
  getModel?: SupportedRobotProps["getModel"]
}

/** What the ghost needs of a motion state: its joints */
const GHOST_STATE: Omit<MotionGroupState, "joint_position"> = {
  timestamp: "",
  sequence_number: 0,
  motion_group: "",
  controller: "",
  joint_limit_reached: { limit_reached: [] },
  standstill: true,
  description_revision: 0,
}

/**
 * A robot at given joints, drawn as a see-through ghost: e.g. a stored pose,
 * a planned target or a posture that collides. It stands at the robot's
 * mounting and draws in NOVA's coordinates (Z up, m), as `RobotScene` does,
 * so it goes into a `RobotView` or a `RobotScene` as one of the app's parts.
 * A scene may hold any number of ghosts of one robot: each has materials of
 * its own, so each keeps its colour and opacity.
 *
 * ```tsx
 * <RobotView session={session}>
 *   <RobotGhost session={session} joints={storedJoints} color="grey" />
 *   <RobotGhost session={session} joints={targetJoints} color="blue" opacity={0.5} />
 * </RobotView>
 * ```
 */
export const RobotGhost = observer(function RobotGhost({
  session,
  robot: robotOfApp,
  joints,
  color,
  opacity,
  flangeRef,
  getModel,
}: RobotGhostProps) {
  const robot = session ? robotModelOf(session) : robotOfApp

  // The model from the robot's instance; made again only for another
  // connection, as Robot does
  const nova = robot?.nova
  const getModelOfConnection = useCallback(
    (model: string, _instanceUrl?: string, serialNumber?: string) =>
      defaultGetModel(model, nova, serialNumber),
    [nova],
  )

  const state = useMemo(
    () => ({ ...GHOST_STATE, joint_position: joints }),
    [joints],
  )

  if (!robot?.dhParameters) return null

  return (
    <group
      position={robot.mountingPosition}
      quaternion={robot.mountingQuaternion}
    >
      <group rotation={MODEL_ROTATION}>
        <MotionGroupVisualizerExact
          // The model comes from getModel
          instanceUrl=""
          getModel={getModel ?? getModelOfConnection}
          inverseSolver={robot.inverseSolver}
          modelFromController={robot.modelFromController ?? ""}
          serialNumber={robot.serialNumber}
          dhParameters={robot.dhParameters}
          kinematicChainOffset={robot.kinematicChainOffset}
          rapidlyChangingMotionState={state}
          transparentColor={color}
          transparentOpacity={opacity}
          flangeRef={flangeRef}
        />
      </group>
    </group>
  )
})
