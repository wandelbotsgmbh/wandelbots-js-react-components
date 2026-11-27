import {
  type DHParameter,
  JointTypeEnum,
  type Pose,
} from "@wandelbots/nova-js/v2"
import { type Object3D, Quaternion, Vector3 } from "three"
import type { GLTF } from "three-stdlib"
import { getMotionGroupModelResource } from "../../lib/motionGroupModelResources"
import { createNovaClient, type NovaConnection } from "../../lib/novaConnection"
import { parseRotationToQuaternion } from "../../lib/rotation"
import { MODEL_ROTATION } from "./modelRotation"

// The model download is the library's; the joint frames are ported from
// RobotPad (src/3d/robots/robotModelLogic.ts)

const Y_AXIS = new Vector3(0, 1, 0)

/**
 * Joint groups in the rendered robot models are named `<prefix>_J<index>`, the
 * flange `<prefix>_FLG`, and the static group a joint's rest rotation is
 * hoisted into `<prefix>_J<index>_REST` (see `revoluteJointRestFrame`
 * and `GenericRobot`). This naming is the contract between the renderer and
 * everything that walks the rendered chain (the animators, an app's joint
 * debug tools), so it is defined here only, in the module that produces the
 * names.
 *
 * `_REST` deliberately does not match {@link JOINT_NODE_NAME}, so the joint
 * collectors keep finding exactly one node per joint.
 */
export const JOINT_NODE_NAME = /_J([0-9]+)$/
export const FLANGE_NODE_SUFFIX = "_FLG"
export const JOINT_REST_SUFFIX = "_REST"

/** The downloads of the models, by instance URL, model and serial number */
const modelCache = new Map<string, Promise<string>>()

/**
 * Downloads the GLB model of a motion group model from a NOVA instance and
 * returns an object URL for it. Each model downloads once per instance and
 * serial number; after a failed download, the next call downloads it again.
 *
 * @param modelFromController - The motion group model, e.g. `UniversalRobots_UR5e`
 * @param connection - The NOVA instance: its base URL, or a NOVA client of the
 *   app (see `NovaConnection`), which also gives the access token of a cloud
 *   instance
 * @param serialNumber - The robot's serial number: a copy of the model
 *   registered for it is downloaded instead, if there is one
 */
export async function defaultGetModel(
  modelFromController: string,
  connection?: NovaConnection,
  serialNumber?: string,
): Promise<string> {
  // WANDELAPI_BASE_URL is empty in the published package
  const instance: NovaConnection | undefined =
    connection || import.meta.env.WANDELAPI_BASE_URL
  if (!instance) {
    throw new Error(
      `Cannot download the model "${modelFromController}": no NOVA instance. Give defaultGetModel the URL of the instance or a NOVA client, or give the component its instanceUrl or getModel.`,
    )
  }

  // Another instance (another NOVA version) can have another file for the
  // same model, and a robot can have its own copy
  const cacheKey = `${instanceUrlOf(instance)} ${modelFromController} ${serialNumber ?? ""}`
  const cached = modelCache.get(cacheKey)
  if (cached) return cached

  // Create the promise and cache it immediately to prevent duplicate calls
  const modelPromise = (async () => {
    const nova = createNovaClient(instance)

    try {
      // The GLB file is binary: download it as a Blob
      const file = serialNumber
        ? await getMotionGroupModelResource<Blob>(
            nova,
            modelFromController,
            serialNumber,
            "glb",
          )
        : await nova.api.motionGroupModels.getMotionGroupGlbModel(
            modelFromController,
            { responseType: "blob" },
          )

      // Create object URL from the file and return it
      const url = URL.createObjectURL(file)
      return url
    } catch (error) {
      console.error("Failed to fetch model:", error)
      throw error
    }
  })()

  modelCache.set(cacheKey, modelPromise)
  // A failed download leaves the cache, so that a later call (for example
  // after a page change) downloads the model again
  modelPromise.catch(() => {
    if (modelCache.get(cacheKey) === modelPromise) {
      modelCache.delete(cacheKey)
    }
  })
  return modelPromise
}

/**
 * Revokes the object URLs of all downloaded models and forgets them, e.g.
 * when an app closes its 3D view for good
 */
export async function revokeAllModelUrls(): Promise<void> {
  const downloads = Array.from(modelCache.values())
  modelCache.clear()
  await Promise.allSettled(
    downloads.map(async (download) => URL.revokeObjectURL(await download)),
  )
}

function instanceUrlOf(connection: NovaConnection): string {
  return typeof connection === "string"
    ? connection
    : connection.config.instanceUrl
}

/**
 * Finds all the joint groups in a GLTF tree, as identified
 * by the _Jxx name ending convention.
 */
export function collectJoints(rootObject: Object3D): Object3D[] {
  function getAllObjects(root: Object3D): Object3D[] {
    if (root.children.length === 0) {
      return [root]
    }
    return [root, ...root.children.flatMap((child) => getAllObjects(child))]
  }

  return getAllObjects(rootObject).filter((o) => isJoint(o))
}

/**
 * Splits a joint node's authored rest rotation into the static part that the
 * animators must not touch, given the joint's DH `theta`.
 *
 * A joint is driven by writing `rotation.y = theta +/- q` onto its node (see
 * `RobotAnimator` and `PlannedMotionVisualization`). That *replaces* the
 * node's Euler-Y rather than composing onto the authored rotation, so it only
 * means "turn about the joint axis" when the rest rotation has no Euler-Z part
 * and already carries `theta` in its Euler-Y. Every model exported for the
 * robot catalog satisfies that; a model mounted at an oblique angle does not.
 * MANUS_RIGHT_ARM_J00 has Euler XYZ (-0.02, -75.00, 103.52) degrees, and there
 * the write turns the joint about the *parent's* Y axis and discards the -75
 * degree rest rotation.
 *
 * Returning `rest * Ry(-theta)` lets {@link GenericRobot} hoist that frame
 * into a static parent group and leave the joint node itself with a pure
 * `Ry(theta)` rotation. Writing `rotation.y = theta +/- q` onto that node then
 * yields `rest * Ry(+/-q)`: the joint turning about its own axis, starting
 * from its authored rest pose. `rotation.y` keeps meaning "the full DH angle",
 * so everything that reads the chain (`computeLinkFrames`, the debug panels)
 * is unaffected.
 */
export function jointRestFrame(rest: Quaternion, theta: number): Quaternion {
  return rest
    .clone()
    .multiply(new Quaternion().setFromAxisAngle(Y_AXIS, -theta))
}

/**
 * The static frame hoisted out of a revolute joint node, or `null` when the
 * node must be rendered untouched. Joint 0 uses `rootFrame` when provided so
 * the kinematic model owns the chain offset; later joints use their authored
 * transforms.
 *
 * Returns `null` for anything that is not a revolute joint of this robot: a
 * non-joint node, an index the DH chain does not cover, and a prismatic joint
 * — those are hoisted by {@link chainOffsetRestFrame} (the root joint of a
 * linear axis) or {@link prismaticJointRestFrame} (any other prismatic row)
 * instead.
 *
 * `DHParameter.type` is optional and an absent one means a revolute joint, as
 * the API schema's default and the rest of the app both have it (see
 * the library's `RobotDescription.jointType`, `MotionGroupVisualizer`,
 * `computeLinkFrames`). Only an
 * explicitly prismatic row is excluded, so a controller that drops the
 * default-valued field still gets the hoist.
 */
export function revoluteJointRestFrame(
  node: Object3D,
  dhParameters: DHParameter[],
  rootFrame?: { position: Vector3; quaternion: Quaternion },
): { position: Vector3; frame: Quaternion; theta: number } | null {
  const index = jointIndexOf(node)
  if (index === null) return null

  const dh = dhParameters[index]
  if (!dh || dh.type === JointTypeEnum.PrismaticJoint) return null

  const theta = dh.theta ?? 0
  const restPosition =
    index === 0 && rootFrame ? rootFrame.position : node.position
  const restQuaternion =
    index === 0 && rootFrame ? rootFrame.quaternion : node.quaternion
  return {
    position: restPosition,
    frame: jointRestFrame(restQuaternion, theta),
    theta,
  }
}

/**
 * Whether `node` is the root prismatic joint of this robot's DH chain.
 *
 * That node carries the motion group's `kinematic_chain_offset`: the model
 * itself is authored in the base frame (its static `link_0` sits at the
 * origin) and the DH chain starts at the offset. Newer exports bake the offset
 * into the node, older ones leave it at identity — `GenericRobot` hoists
 * {@link chainOffsetRestFrame} into a static parent for both, so the offset
 * comes from the kinematic model either way and the value
 * `LinearAxisAnimator` writes into `position.y` stays a pure travel distance.
 */
export function isRootPrismaticJoint(
  node: Object3D,
  dhParameters: DHParameter[],
): boolean {
  return (
    jointIndexOf(node) === 0 &&
    dhParameters[0]?.type === JointTypeEnum.PrismaticJoint
  )
}

/**
 * The motion group's `kinematic_chain_offset` expressed in the GLTF's own
 * frame, ready to be applied to a joint node.
 *
 * The offset is given in Nova's Z-up frame as a rotation vector. Models are
 * authored Y-up, so both its position and orientation are converted into the
 * model frame. Positions are also converted from millimeters to meters.
 *
 * For a catalog linear axis this reproduces exactly what the export bakes into
 * its `_J00` node — `ABB_IRT710_J00` carries a translation of
 * [1.02219, 0.53, 0] and a Rz(-90 degrees) rotation that turns the node's own
 * +Y, the travel axis, onto model +X where the rail lies — so replacing the
 * authored transform is a no-op for those and a fix for exports that leave the
 * node at identity.
 */
export function chainOffsetRestFrame(offset: Pose | null | undefined): {
  position: Vector3
  quaternion: Quaternion
} {
  const alignment = new Quaternion().setFromEuler(MODEL_ROTATION)
  const inverseAlignment = alignment.clone().invert()

  const [x = 0, y = 0, z = 0] = offset?.position ?? []
  const position = new Vector3(x, y, z)
    .divideScalar(1000)
    .applyQuaternion(inverseAlignment)

  const [rx = 0, ry = 0, rz = 0] = offset?.orientation ?? []
  const quaternion = inverseAlignment
    .clone()
    .multiply(parseRotationToQuaternion([rx, ry, rz], "ROTATION_VECTOR"))
    .multiply(alignment)

  return { position, quaternion }
}

/**
 * The static frame hoisted out of a prismatic joint node that is *not* the
 * root of the chain, or `null` when the node is not such a joint. The root one
 * is placed from the kinematic model instead — see
 * {@link isRootPrismaticJoint}.
 *
 * `LinearAxisAnimator` drives a prismatic joint by writing
 * `position.y = +/- q` onto its node. That is a translation in the *parent's*
 * frame, and it replaces the node's authored translation rather than adding to
 * it — so it only means "slide along the joint axis" while the node sits at the
 * origin with its axis along the parent's Y, which an authored joint node does
 * not do.
 *
 * Returning the node's authored transform lets {@link GenericRobot} hoist it
 * into a static parent and leave the joint node itself at the identity.
 * Writing `position.y = +/- q` onto that node then slides the carriage along
 * its own axis from the authored rest pose, and `position.y` keeps meaning
 * "the DH joint translation", so everything that reads the chain
 * (`computeLinkFrames`, the debug panels) is unaffected.
 */
export function prismaticJointRestFrame(
  node: Object3D,
  dhParameters: DHParameter[],
): { position: Vector3; quaternion: Quaternion } | null {
  const index = jointIndexOf(node)
  if (index === null) return null

  const dh = dhParameters[index]
  if (!dh || dh.type !== JointTypeEnum.PrismaticJoint) return null

  return {
    position: node.position.clone(),
    quaternion: node.quaternion.clone(),
  }
}

/**
 * Checks if a specified threejs object represents the flange of a
 * robot, based on the _FLG name ending convention.
 */
export function isFlange(node: Object3D) {
  return node.name.endsWith(FLANGE_NODE_SUFFIX)
}

/**
 * Checks if a specified threejs object represents a joint of a
 * robot, based on the _Jxx name ending convention.
 */
export function isJoint(node: Object3D) {
  return JOINT_NODE_NAME.test(node.name)
}

/**
 * The index a joint node declares through the _Jxx name ending convention,
 * or `null` if the node is not a joint.
 */
export function jointIndexOf(node: Object3D): number | null {
  const index = node.name.match(JOINT_NODE_NAME)?.[1]
  return index === undefined ? null : Number.parseInt(index, 10)
}

/**
 * Validates that the loaded GLTF file has six joints and a flange group.
 */
export function parseRobotModel(gltf: GLTF, filename: string): { gltf: GLTF } {
  let flange: Object3D | undefined
  const joints: Object3D[] = []

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

  if (!flange) {
    throw Error(
      `No flange group found in robot model ${filename}. Flange must be identified with a name ending in _FLG.`,
    )
  }

  return { gltf }
}
