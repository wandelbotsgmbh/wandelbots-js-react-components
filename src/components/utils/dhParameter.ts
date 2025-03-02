import type { DHParameter } from "@wandelbots/wandelbots-js"
import * as THREE from "three"

export function getDHTransform(
  dhParameter: DHParameter,
  jointRotation: number,
): THREE.Matrix4 {
  const matrix = new THREE.Matrix4()
    .makeRotationY(
      dhParameter.theta! +
        jointRotation * (dhParameter.reverse_rotation_direction ? -1 : 1),
    ) // Rotate around Z
    .multiply(new THREE.Matrix4().makeTranslation(0, dhParameter.d! / 1000, 0)) // Translate along Z
    .multiply(new THREE.Matrix4().makeTranslation(dhParameter.a! / 1000, 0, 0)) // Translate along X
    .multiply(new THREE.Matrix4().makeRotationX(dhParameter.alpha!)) // Rotate around X
  return matrix
}

export function getDHLine(
  baseMatrix: THREE.Matrix4,
  dhParameter: DHParameter,
  jointRotation: number,
): THREE.Line3 {
  const position = new THREE.Vector3()
  const quaternion = new THREE.Quaternion()
  const scale = new THREE.Vector3()

  baseMatrix.decompose(position, quaternion, scale)
  const a = position.clone()
  baseMatrix
    .multiply(getDHTransform(dhParameter, jointRotation))
    .decompose(position, quaternion, scale)
  return new THREE.Line3(a, position)
}

export function getDHLines(
  baseMatrix: THREE.Matrix4,
  dhParameters: DHParameter[],
  jointRotations: number[],
): THREE.Line3[] {
  baseMatrix = baseMatrix.clone()
  return dhParameters.map((dhParam, jointIndex) =>
    getDHLine(baseMatrix, dhParam, jointRotations[jointIndex]),
  )
}

export function applyAllJointTransform(
  baseMatrix: THREE.Matrix4,
  jointIndex: number,
  jointRotations: number[],
  dhParameters: DHParameter[],
) {
  ;[...dhParameters]
    .splice(0, jointIndex + 1)
    .forEach((dhParam, jointIndex) =>
      baseMatrix.multiply(getDHTransform(dhParam, jointRotations[jointIndex])),
    )
}
