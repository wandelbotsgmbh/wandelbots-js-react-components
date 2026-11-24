import type {
  DHParameter,
  MotionGroupState,
  Pose,
} from "@wandelbots/nova-js/v2"
import type { Quaternion } from "three"
import type { NovaConnection } from "../../lib/novaConnection"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { parseRotationToQuaternion } from "../../lib/rotation"

/**
 * What {@link Robot} and {@link LinearAxis} draw of a robot, as plain data:
 * from a `RobotSession` with {@link robotModelOf}, a `ConnectedMotionGroup`
 * as it is, or an app's own state.
 */
export type RobotModelSource = {
  /** The model's name as the controller reports it, e.g. "UniversalRobots_UR5e" */
  modelFromController?: string
  /** The joints' DH parameters; without them nothing is drawn */
  dhParameters?: DHParameter[]
  /**
   * The model's inverse solver; null for a linear axis or a turntable.
   * `RobotSceneView` draws the motion group by it, as `MotionGroupVisualizer`
   * does; `Robot` and `LinearAxis` leave the choice to the app.
   */
  inverseSolver?: string | null
  /** The robot's serial number, for a copy of its model registered for it */
  serialNumber?: string
  /**
   * The transform between the base frame and the start of the DH chain (the
   * kinematic model's `kinematic_chain_offset`)
   */
  kinematicChainOffset?: Pose | null
  /**
   * The joint positions to show. The robot follows a new object as well as
   * changes made in place, as a MobX store makes them.
   */
  rapidlyChangingMotionState: MotionGroupState
  /** Where the robot is mounted, in metres; the origin if left out */
  mountingPosition?: [number, number, number]
  /** How the robot is mounted; no rotation if left out */
  mountingQuaternion?: Quaternion
  /**
   * The NOVA instance the model is downloaded from, unless the component is
   * given `getModel`
   */
  nova?: NovaConnection
}

/**
 * The robot of a session as {@link Robot} and {@link LinearAxis} draw it,
 * with its mounting in 3D units. Cheap to call at every render:
 *
 * ```tsx
 * <Robot motionGroup={robotModelOf(session)} />
 * ```
 */
export function robotModelOf(session: RobotSession): RobotModelSource {
  const { description, state } = session
  const mounting = description.mounting
  return {
    nova: session.nova,
    modelFromController: description.motionGroupModel,
    dhParameters: description.dhParameters,
    inverseSolver: description.inverseSolver,
    serialNumber: description.serialNumber,
    kinematicChainOffset: description.kinematicChainOffset,
    rapidlyChangingMotionState: state.rapidlyChangingMotionState,
    mountingPosition: [
      (mounting?.position?.[0] ?? 0) / 1000,
      (mounting?.position?.[1] ?? 0) / 1000,
      (mounting?.position?.[2] ?? 0) / 1000,
    ],
    mountingQuaternion: parseRotationToQuaternion(
      [
        mounting?.orientation?.[0] ?? 0,
        mounting?.orientation?.[1] ?? 0,
        mounting?.orientation?.[2] ?? 0,
      ],
      "ROTATION_VECTOR",
    ),
  } satisfies RobotModelSource
}
