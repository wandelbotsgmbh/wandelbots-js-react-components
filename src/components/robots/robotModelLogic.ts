import type { Group, Object3D } from "three"
import type { GLTF } from "three-stdlib"
import { version } from "../../../package.json"

export function isGroup(node: Object3D): node is Group {
  return node.type === "Group"
}

export function defaultGetModel(modelFromController: string): string {
  let useVersion = version
  if (version.startsWith("0.")) {
    useVersion = ""
  }
  return `https://cdn.jsdelivr.net/gh/wandelbotsgmbh/wandelbots-js-react-components${useVersion ? `@${useVersion}` : ""}/public/models/${modelFromController}.glb`
}

/**
 * Finds all the joint groups in a GLTF tree, as identified
 * by the _Jxx name ending convention.
 */
export function collectJoints(rootObject: Object3D): Group[] {
  function getAllObjects(root: Object3D): Object3D[] {
    if (root.children.length === 0) {
      return [root]
    }
    return [root, ...root.children.flatMap((child) => getAllObjects(child))]
  }

  return getAllObjects(rootObject).filter(
    (o) => isGroup(o) && isJoint(o),
  ) as Group[]
}

/**
 * Checks if a specified threejs group represents the flange of a
 * robot, based on the _FLG name ending convention.
 */
export function isFlange(node: Object3D) {
  return node.name.endsWith("_FLG")
}

/**
 * Checks if a specified threejs group represents a joint of a
 * robot, based on the _Jxx name ending convention.
 */
export function isJoint(node: Object3D): node is Group {
  return isGroup(node) && !!node.name.match(/_J[0-9]+$/)
}

/**
 * Validates that the loaded GLTF file has six joints and a flange group.
 */
export function parseRobotModel(gltf: GLTF, filename: string): { gltf: GLTF } {
  let flange: Object3D | undefined
  const joints: Group[] = []

  function isSixJoints(
    joints: Group[],
  ): joints is [Group, Group, Group, Group, Group, Group] {
    return joints.length !== 6
  }

  function parseNode(node: Object3D) {
    if (isFlange(node)) {
      if (flange) {
        throw Error(
          `Found multiple flange groups in robot model ${filename}; first ${flange.name} then ${node.name}. Only one _FLG group is allowed.`,
        )
      }

      flange = node
    }

    if (isJoint(node)) {
      joints.push(node)
    }

    node.children.map(parseNode)
  }

  parseNode(gltf.scene)

  if (!isSixJoints(joints)) {
    throw Error(
      `Expected to find 6 joint groups in robot model ${filename} with names _J01, _J02 etc, found ${joints.length}. Only 6-joint robot models are currently supported.`,
    )
  }

  if (!flange) {
    throw Error(
      `No flange group found in robot model ${filename}. Flange must be identified with a name ending in _FLG.`,
    )
  }

  return { gltf }
}