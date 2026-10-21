import { Matrix4, Quaternion, Vector3 } from "three"

// Named distinctly from NOVA API's own `DHParameter`/`Pose`/`LimitRange` types
// (which this gizmo intentionally doesn't depend on) to avoid same-looking,
// differently-shaped types colliding in a consumer's autocomplete.
export type GizmoDhParameter = {
  alpha?: number | null
  theta?: number | null
  a?: number | null
  d?: number | null
  reverse_rotation_direction?: boolean | null
  type?: string | null
}

export type GizmoChainOffset = {
  position?: number[] | null
  orientation?: number[] | null
}

/** Radians for revolute joints; millimetres for prismatic joints. */
export type GizmoJointLimit = { negative: number; positive: number }

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
