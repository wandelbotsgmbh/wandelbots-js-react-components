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

export async function getDHParams(
  modelFromController: string,
): Promise<DHParameter[]> {
  const [manufacturer, ...rest] = modelFromController.split("_")
  const modelWithoutManufacturer = rest.join("_")

  const jsonConfig = (await import(
    `./robotConfig/jsonV2/${manufacturer}/${modelWithoutManufacturer}.json`
  )) as RobotJsonConfig

  // The new format for the robotConfigs (dh_parameters with number/boolean types) is the target format.
  // The old format (dhParameters with string types) is supported for backward compatibility only.
  // Once all robot config files are migrated to the new format, the old format support and
  // the RobotJsonConfig.dhParameters field can be removed.
  
  const dhParams = jsonConfig.dhParameters || jsonConfig.dh_parameters

  if (!dhParams) {
    throw new Error(`No DH parameters found in ${modelFromController}.json`)
  }

  return dhParams.map((json) => {
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
  const glbHeader = new Uint8Array([
    0x67, 0x6C, 0x54, 0x46, // magic: "glTF"
    0x02, 0x00, 0x00, 0x00, // version: 2
    0x6C, 0x00, 0x00, 0x00, // length: 108 bytes
  ])
  
  const jsonChunk = JSON.stringify({
    asset: { version: "2.0" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0 }],
    meshes: [{
      primitives: [{
        attributes: { POSITION: 0 },
        mode: 4
      }]
    }],
    accessors: [{
      bufferView: 0,
      componentType: 5126,
      count: 1,
      type: "VEC3",
      min: [0, 0, 0],
      max: [0, 0, 0]
    }],
    bufferViews: [{ buffer: 0, byteOffset: 0, byteLength: 12 }],
    buffers: [{ byteLength: 12 }]
  })
  
  const jsonPadding = 4 - (jsonChunk.length % 4)
  const paddedJsonChunk = jsonChunk + ' '.repeat(jsonPadding)
  const jsonChunkHeader = new Uint8Array([
    paddedJsonChunk.length, 0x00, 0x00, 0x00, // chunk length
    0x4A, 0x53, 0x4F, 0x4E // chunk type: "JSON"
  ])
  
  const binaryData = new Float32Array([0, 0, 0]) // single vertex at origin
  const binaryChunkHeader = new Uint8Array([
    12, 0x00, 0x00, 0x00, // chunk length: 12 bytes
    0x42, 0x49, 0x4E, 0x00 // chunk type: "BIN\0"
  ])
  
  const totalLength = 12 + 8 + paddedJsonChunk.length + 8 + 12
  glbHeader.set(new Uint32Array([totalLength]), 8)
  
  const glbBuffer = new ArrayBuffer(totalLength)
  const view = new Uint8Array(glbBuffer)
  let offset = 0
  
  view.set(glbHeader, offset); offset += 12
  view.set(jsonChunkHeader, offset); offset += 8
  view.set(new TextEncoder().encode(paddedJsonChunk), offset); offset += paddedJsonChunk.length
  view.set(binaryChunkHeader, offset); offset += 8
  view.set(new Uint8Array(binaryData.buffer), offset)
  
  const mockBlob = new Blob([glbBuffer], { type: 'model/gltf-binary' })
  const mockFile = new File([mockBlob], `${modelFromController}.glb`, { type: 'model/gltf-binary' })
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
        }
        
        const nova = new NovaClient({ instanceUrl })
        
        try {
          // Make direct fetch call to the Nova API
          const apiPath = `/api/v2/motion-group-models/${modelFromController}/glb`
          const fullUrl = instanceUrl + apiPath
          
          const response = await fetch(fullUrl)
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
          
          const blob = await response.blob()
          const file = new File([blob], `${modelFromController}.glb`, { type: 'model/gltf-binary' })
          return URL.createObjectURL(file)
        } catch (error) {
          console.error("Failed to fetch model:", error)
          return createMockGlbFile(modelFromController)
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
