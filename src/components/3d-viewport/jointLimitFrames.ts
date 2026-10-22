import type { DHParameter, LimitRange, Pose } from "@wandelbots/nova-js/v2"
import { Matrix4, Quaternion, Vector3 } from "three"

// Aliased to NOVA API's own `DHParameter`/`Pose`/`LimitRange` types (so a
// consumer can pass `dh_parameters`/`kinematic_chain_offset`/joint position
// limits straight from a `MotionGroupDescription` with no conversion) but
// exported under `Gizmo`-prefixed names: NOVA also exports its own
// `JointLimits` type, which would otherwise collide with this gizmo's name.
export type GizmoDhParameter = DHParameter
export type GizmoChainOffset = Pose
/** Radians for revolute joints; millimetres for prismatic joints. */
export type GizmoJointLimit = LimitRange

function chainOffsetMatrix(offset: GizmoChainOffset | null): Matrix4 {
  const position = offset?.position ?? []
  const orientation = offset?.orientation ?? []
  const rotationVector = new Vector3(
    orientation[0] ?? 0,
    orientation[1] ?? 0,
    orientation[2] ?? 0,
  )
  const angle = rotationVector.length()
  const quaternion =
    angle > 0
      ? new Quaternion().setFromAxisAngle(rotationVector.normalize(), angle)
      : new Quaternion()
  return new Matrix4().compose(
    new Vector3(
      position[0] ?? 0,
      position[1] ?? 0,
      position[2] ?? 0,
    ).divideScalar(1000),
    quaternion,
    new Vector3(1, 1, 1),
  )
}

/** Pre-step joint frames in NOVA's Z-up coordinates, with lengths in metres. */
export function jointFrames(
  dhParameters: GizmoDhParameter[],
  chainOffset: GizmoChainOffset | null = null,
  jointPositions: number[] = [],
): Matrix4[] {
  const frame = chainOffsetMatrix(chainOffset)
  return dhParameters.map((row, index) => {
    const jointFrame = frame.clone()
    const position =
      (row.reverse_rotation_direction ? -1 : 1) * (jointPositions[index] ?? 0)
    const prismatic = row.type === "PRISMATIC_JOINT"
    const theta = (row.theta ?? 0) + (prismatic ? 0 : position)
    const distance = (row.d ?? 0) + (prismatic ? position : 0)
    frame
      .multiply(new Matrix4().makeRotationZ(theta))
      .multiply(
        new Matrix4().makeTranslation((row.a ?? 0) / 1000, 0, distance / 1000),
      )
      .multiply(new Matrix4().makeRotationX(row.alpha ?? 0))
    return jointFrame
  })
}
