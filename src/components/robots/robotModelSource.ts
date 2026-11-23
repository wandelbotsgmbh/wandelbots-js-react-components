import type { DHParameter, MotionGroupState } from "@wandelbots/nova-js/v2"
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
