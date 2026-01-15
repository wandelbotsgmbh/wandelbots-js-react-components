// sharedStoryConfig.tsx
import type { Meta, StoryObj } from "@storybook/react-vite"
import { NovaClient, type DHParameter } from "@wandelbots/nova-js/v2"
import { expect, fn, waitFor } from "storybook/test"
import { SupportedRobot } from "../../src"
import { SupportedRobotScene } from "./SupportedRobotScene"

type RobotJsonConfig = {
  dh_parameters: {
    a: number
    d: number
    alpha: number
    theta: number
    reverse_rotation_direction: boolean
  }[]
}

export async function getDHParams(
  modelFromController: string,
): Promise<DHParameter[]> {
  const [manufacturer, ...rest] = modelFromController.split("_")
  const modelWithoutManufacturer = rest.join("_")

  const nova = new NovaClient({
    instanceUrl: import.meta.env.WANDELAPI_BASE_URL || "https://mock.example.com",
  })

  const jsonConfig = (await nova.api.motionGroupModels.getMotionGroupKinematicModel(modelFromController)
  ) as RobotJsonConfig
  
  return jsonConfig.dh_parameters.map((json) => ({
    a: json.a,
    d: json.d,
    alpha: json.alpha,
    theta: json.theta,
    reverse_rotation_direction: json.reverse_rotation_direction,
  }))
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
