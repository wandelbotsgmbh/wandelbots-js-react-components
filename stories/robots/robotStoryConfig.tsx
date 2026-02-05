// sharedStoryConfig.tsx
import type { Meta, StoryObj } from "@storybook/react-vite"
import { NovaClient, type DHParameter } from "@wandelbots/nova-js/v2"
import { useEffect } from "react"
import { expect, fn, waitFor } from "storybook/test"
import { SupportedRobot } from "../../src"
import { SupportedRobotScene } from "./SupportedRobotScene"

export async function getDHParams(
  modelFromController: string,
): Promise<DHParameter[]> {
  const instanceUrl = import.meta.env.WANDELAPI_BASE_URL
  
  // If we have an instance URL, try to fetch from API
  if (instanceUrl && instanceUrl !== "undefined" && typeof instanceUrl === "string") {
    const nova = new NovaClient({ instanceUrl })
    
    try {
      const apiResult: any = await nova.api.motionGroupModels.getMotionGroupKinematicModel(modelFromController)
      const dhParamsJson = apiResult.dh_parameters
      if (dhParamsJson && Array.isArray(dhParamsJson)) {
        return dhParamsJson.map((json: any) => {
          return {
            a: json.a,
            d: json.d,
            alpha: json.alpha,
            theta: json.theta,
            reverse_rotation_direction: json.reverse_rotation_direction,
          } as DHParameter
        })
      }
    } catch (err) {
      console.warn(`Failed to fetch DH params from API for ${modelFromController}, falling back to local config`)
    }
  }
  
  // Fall back to loading from local robotConfig folder
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}stories/robots/robotConfig/kinematics/${modelFromController}.json`)
    if (response.ok) {
      const data = await response.json()
      if (data.dh_parameters && Array.isArray(data.dh_parameters)) {
        return data.dh_parameters.map((json: any) => ({
          a: json.a,
          d: json.d,
          alpha: json.alpha,
          theta: json.theta,
          reverse_rotation_direction: json.reverse_rotation_direction,
        } as DHParameter))
      }
    }
  } catch (err) {
    console.warn(`No local config found for ${modelFromController}`)
  }
  
  return []
}

export function nextAnimationFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

// Cache for model object URLs to avoid repeated API calls and File->URL conversions
const modelCache = new Map<string, Promise<string>>()

/**
 * Revoke all cached model URLs to prevent memory leaks.
 * Called when navigating between stories.
 */
function revokeAllCachedModels() {
  modelCache.forEach(async (urlPromise) => {
    try {
      const url = await urlPromise
      URL.revokeObjectURL(url)
    } catch (e) {
      // Ignore errors
    }
  })
  modelCache.clear()
}

// Helper function to create a minimal valid GLB file for mocking
function createMockGlbFile(modelFromController: string): string {
  // Create a minimal valid GLB file (GLTF binary format)
  const jsonObj = {
    asset: { version: "2.0" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    // Ensure a flange-named node exists so parsing logic can find the flange
    nodes: [{ mesh: 0, name: `${modelFromController}_FLG` }],
    meshes: [
      {
        primitives: [
          {
            attributes: { POSITION: 0 },
            mode: 4,
          },
        ],
      },
    ],
    accessors: [
      {
        bufferView: 0,
        componentType: 5126,
        count: 1,
        type: "VEC3",
        min: [0, 0, 0],
        max: [0, 0, 0],
      },
    ],
    bufferViews: [{ buffer: 0, byteOffset: 0, byteLength: 12 }],
    buffers: [{ byteLength: 12 }],
  }

  const jsonText = JSON.stringify(jsonObj)
  const jsonBytes = new TextEncoder().encode(jsonText)
  const jsonPadding = (4 - (jsonBytes.length % 4)) % 4
  const paddedJsonLength = jsonBytes.length + jsonPadding

  const binaryData = new Float32Array([0, 0, 0]) // single vertex at origin
  const binaryBytes = new Uint8Array(binaryData.buffer)
  const binaryLength = binaryBytes.length

  const headerLength = 12
  const jsonChunkHeaderLength = 8
  const binChunkHeaderLength = 8
  const totalLength = headerLength + jsonChunkHeaderLength + paddedJsonLength + binChunkHeaderLength + binaryLength

  const buffer = new ArrayBuffer(totalLength)
  const dv = new DataView(buffer)
  const u8 = new Uint8Array(buffer)
  let offset = 0

  // magic 'glTF'
  u8.set([0x67, 0x6C, 0x54, 0x46], offset)
  offset += 4

  // version 2 little-endian
  dv.setUint32(offset, 2, true)
  offset += 4

  // total length little-endian
  dv.setUint32(offset, totalLength, true)
  offset += 4

  // JSON chunk header: length and type
  dv.setUint32(offset, paddedJsonLength, true)
  offset += 4
  u8.set([0x4A, 0x53, 0x4F, 0x4E], offset) // 'JSON'
  offset += 4

  // JSON payload + padding
  u8.set(jsonBytes, offset)
  offset += jsonBytes.length
  if (jsonPadding > 0) {
    u8.set(new Uint8Array(jsonPadding).fill(0x20), offset) // spaces
    offset += jsonPadding
  }

  // BIN chunk header
  dv.setUint32(offset, binaryLength, true)
  offset += 4
  u8.set([0x42, 0x49, 0x4E, 0x00], offset) // 'BIN\0'
  offset += 4

  // binary payload
  u8.set(binaryBytes, offset)

  const mockBlob = new Blob([buffer], { type: "model/gltf-binary" })
  const mockFile = new File([mockBlob], `${modelFromController}.glb`, { type: "model/gltf-binary" })
  return URL.createObjectURL(mockFile)
}

/**
 * Get model with fallback to local files and mock.
 * Reusable across all stories.
 */
export async function getModel(modelFromController: string): Promise<string> {
  // Check cache first
  if (modelCache.has(modelFromController)) {
    return modelCache.get(modelFromController)!
  }
  
  // Create the promise and cache it immediately to prevent duplicate calls
  const modelPromise = (async () => {
    const instanceUrl = import.meta.env.WANDELAPI_BASE_URL
    
    // If we have an instance URL, try to fetch from API
    if (instanceUrl && instanceUrl !== "undefined" && typeof instanceUrl === "string") {
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
        const url = URL.createObjectURL(file)
        return url
      } catch (error) {
        console.warn(`Failed to fetch model from API for ${modelFromController}, falling back to local file`)
      }
    }
    
    // Try to load from local robotConfig folder
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}stories/robots/robotConfig/model/${modelFromController}.glb`)
      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        return url
      }
    } catch (error) {
      console.warn(`No local GLB file found for ${modelFromController}, falling back to mock`)
    }
    
    // Final fallback: create mock GLB
    return createMockGlbFile(modelFromController)
  })()
  
  // Cache the promise
  modelCache.set(modelFromController, modelPromise)
  return modelPromise
}

export const sharedStoryConfig = {
  tags: ["!dev"],
  component: SupportedRobot,
  args: {
    getModel,
  },
} satisfies Meta<typeof SupportedRobot>

export function robotStory(
  modelFromController: string,
): StoryObj<typeof SupportedRobotScene> {
  return {
    args: {
      modelFromController,
      postModelRender: fn(),
    },
    play: async ({ args }) => {
      await waitFor(
        () =>
          expect(
            args.postModelRender,
            `Failed to load model for ${args.modelFromController}`,
          ).toHaveBeenCalled(),
        {
          timeout: 8000,
        },
      )
    },
    render: (args, { loaded: { dhParameters } }) => {
      // Cleanup function that runs when the story unmounts
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        return () => {
          // Revoke all cached models when leaving this story
          revokeAllCachedModels()
        }
      }, [])
      
      return <SupportedRobotScene {...args} dhParameters={dhParameters} />
    },
    name: modelFromController,
    loaders: [
      async () => ({
        dhParameters: await getDHParams(modelFromController),
      }),
    ],
  }
}
