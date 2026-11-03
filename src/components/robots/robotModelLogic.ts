import type { Object3D } from "three"
import type { GLTF } from "three-stdlib"
import { createNovaClient, type NovaConnection } from "../../lib/novaConnection"

/** The downloads of the models, by instance URL and model */
const modelCache = new Map<string, Promise<string>>()

/**
 * Downloads the GLB model of a motion group model from a NOVA instance and
 * returns an object URL for it. Each model downloads once per instance; after
 * a failed download, the next call downloads it again.
 *
 * @param modelFromController - The motion group model, e.g. `UniversalRobots_UR5e`
 * @param connection - The NOVA instance: its base URL, or a NOVA client of the
 *   app (see `NovaConnection`), which also gives the access token of a cloud
 *   instance. `Robot` and `LinearAxis` pass the connection of their
 *   `ConnectedMotionGroup`.
 */
export async function defaultGetModel(
  modelFromController: string,
  connection?: NovaConnection,
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
  // same model
  const cacheKey = `${instanceUrlOf(instance)} ${modelFromController}`
  const cached = modelCache.get(cacheKey)
  if (cached) return cached

  // Create the promise and cache it immediately to prevent duplicate calls
  const modelPromise = (async () => {
    const nova = createNovaClient(instance)

    try {
      // The GLB file is binary: download it as a Blob
      const file = await nova.api.motionGroupModels.getMotionGroupGlbModel(
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
 * Checks if a specified threejs object represents the flange of a
 * robot, based on the _FLG name ending convention.
 */
export function isFlange(node: Object3D) {
  return node.name.endsWith("_FLG")
}

/**
 * Checks if a specified threejs object represents a joint of a
 * robot, based on the _Jxx name ending convention.
 */
export function isJoint(node: Object3D) {
  return /_J[0-9]+$/.test(node.name)
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
