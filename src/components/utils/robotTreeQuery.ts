import type * as THREE from "three"

export type RobotSceneJoint = THREE.Object3D

export const defaultJointNamePattern = "(^joint_[0-9]+$)|(_J[0-9]+$)"

export function getAllObjects(root: THREE.Object3D): THREE.Object3D[] {
  if (root.children.length === 0) {
    return [root]
  }
  return [root, ...root.children.flatMap((child) => getAllObjects(child))]
}

function isObjectAJointByName(name: string, jointNamePattern?: string) {
  // e.g. abc_J05 => joint 5
  // or joint_5 => joint 5
  return new RegExp(jointNamePattern ?? defaultJointNamePattern).test(name)
}

export function getAllJointsByName(
  rootObject: THREE.Object3D,
  jointNamePattern?: string,
): RobotSceneJoint[] {
  return getAllObjects(rootObject).filter((object) =>
    isObjectAJointByName(object.name, jointNamePattern),
  )
}
