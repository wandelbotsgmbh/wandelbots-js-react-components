import { NovaClient } from "@wandelbots/nova-js/v2"
import type { Object3D } from "three"
import type { GLTF } from "three-stdlib"

const modelCache = new Map<string, Promise<string>>()

/**
 * Revoke a cached model's object URL to prevent memory leaks.
 * Call this when a component unmounts or no longer needs the model.
 */
export async function revokeModelUrl(modelFromController: string): Promise<void> {
  const urlPromise = modelCache.get(modelFromController)
  if (!urlPromise) return

  try {
    const url = await urlPromise
    URL.revokeObjectURL(url)
  } catch (e) {
    // Ignore errors - URL may already be revoked
  }
  modelCache.delete(modelFromController)
}

/**
 * Revoke all cached model object URLs and clear the cache.
 * Useful for cleanup on app teardown.
 */
export async function revokeAllModelUrls(): Promise<void> {
  const entries = Array.from(modelCache.entries())
  await Promise.allSettled(
    entries.map(async ([key, urlPromise]) => {
      try {
        const url = await urlPromise
        URL.revokeObjectURL(url)
      } catch (e) {
        // Ignore errors
      }
    })
  )
  modelCache.clear()
}

export async function defaultGetModel(modelFromController: string): Promise<string> {
  // Check cache first
  if (modelCache.has(modelFromController)) {
    return modelCache.get(modelFromController)!
  }
  
  // Create the promise and cache it immediately to prevent duplicate calls
  const modelPromise = (async () => {
    const instanceUrl = import.meta.env.WANDELAPI_BASE_URL    
    const nova = new NovaClient({ instanceUrl })
    
    // Configure axios to handle binary responses for GLB files
    const apiInstance = nova.api.motionGroupModels as any
    if (apiInstance.axios?.interceptors) {
      apiInstance.axios.interceptors.request.use((config: any) => {
        if (config.url?.includes('/glb')) {
          config.responseType = 'blob'
        }
        return config
      })
    }
    
    try {
      const file = await nova.api.motionGroupModels.getMotionGroupGlbModel(modelFromController)
      
      // Create object URL from the file and return it
      const url = URL.createObjectURL(file)
      return url
    } catch (error) {
      console.error("Failed to fetch model:", error)
      throw error
    }
  })()
  
  // Cache the promise
  modelCache.set(modelFromController, modelPromise)
  return modelPromise
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
