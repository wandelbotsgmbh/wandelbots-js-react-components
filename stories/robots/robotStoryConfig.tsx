// sharedStoryConfig.tsx
import type { Meta, StoryObj } from "@storybook/react-vite"
import { NovaClient, type DHParameter } from "@wandelbots/nova-js/v2"
import { expect, fn, waitFor } from "storybook/test"
import { SupportedRobot } from "../../src"
import { SupportedRobotScene } from "./SupportedRobotScene"

type RobotJsonConfig = {
  dhParameters?: {
    a: string
    d: string
    alpha: string
    theta: string
    reverseRotationDirection: string
  }[]
  dh_parameters?: {
    a: number | string
    d: number | string
    alpha: number | string
    theta: number | string
    reverse_rotation_direction: boolean | string
  }[]
}

// Provided by robot config loader at runtime; declared here for TS correctness in stories.
declare const jsonConfig: RobotJsonConfig

export async function getDHParams(
  modelFromController: string,
): Promise<DHParameter[]> {
  const [manufacturer, ...rest] = modelFromController.split("_")
  const modelWithoutManufacturer = rest.join("_")

  const nova = new NovaClient({
    instanceUrl: import.meta.env.WANDELAPI_BASE_URL || "https://mock.example.com",
  })

  // The new format for the robotConfigs (dh_parameters with number/boolean types) is the target format.
  // The old format (dhParameters with string types) is supported for backward compatibility only.
  // Once all robot config files are migrated to the new format, the old format support and
  // the RobotJsonConfig.dhParameters field can be removed.
  
  const dhParams = jsonConfig.dhParameters || jsonConfig.dh_parameters

  if (!dhParams) {
    throw new Error(`No DH parameters found in ${modelFromController}.json`)
  }

  return dhParams.map((json: any) => {
    // Handle both string and number formats
    const a = typeof json.a === "string" ? parseFloat(json.a) : json.a
    const d = typeof json.d === "string" ? parseFloat(json.d) : json.d
    const alpha = typeof json.alpha === "string" ? parseFloat(json.alpha) : json.alpha
    const theta = typeof json.theta === "string" ? parseFloat(json.theta) : json.theta
    
    // Handle both old string format ("0"/"1") and new boolean format
    let reverse_rotation_direction: boolean
    if ("reverseRotationDirection" in json) {
      reverse_rotation_direction = (json as any).reverseRotationDirection === "1"
    } else {
      const value = (json as any).reverse_rotation_direction
      reverse_rotation_direction = typeof value === "boolean" ? value : value === "1"
    }

    return {
      a,
      d,
      alpha,
      theta,
      reverse_rotation_direction,
    }
  })
}

export function nextAnimationFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

// Cache for model object URLs to avoid repeated API calls and File->URL conversions
const modelCache = new Map<string, Promise<string>>()

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

export const sharedStoryConfig = {
  tags: ["!dev"],
  component: SupportedRobot,
  args: {
    getModel: async (modelFromController: string) => {
      // Check cache first
      if (modelCache.has(modelFromController)) {
        return modelCache.get(modelFromController)!
      }
      
      // Create the promise and cache it immediately to prevent duplicate calls
      const modelPromise = (async () => {
        const instanceUrl = import.meta.env.WANDELAPI_BASE_URL || import.meta.env.VITE_NOVA_INSTANCE_URL
        
        // Always use mock for Storybook since .env.local isn't available
        if (!instanceUrl || instanceUrl === "undefined" || typeof instanceUrl !== "string") {
          return createMockGlbFile(modelFromController)
          // console.warn(`Falling back to mock GLB for ${modelFromController}`)
        }
        
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
          // Fall back to a mock GLB to ensure we always return a string URL
          return createMockGlbFile(modelFromController)
          // console.warn(`Falling back to mock GLB for ${modelFromController}`)
        }
      })()
      
      // Cache the promise
      modelCache.set(modelFromController, modelPromise)
      return modelPromise
    },
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
    render: (args, { loaded: { dhParameters } }) => (
      <SupportedRobotScene {...args} dhParameters={dhParameters} />
    ),
    name: modelFromController,
    loaders: [
      async () => ({
        dhParameters: await getDHParams(modelFromController),
      }),
    ],
  }
}
