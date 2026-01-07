import type { Configuration } from "@wandelbots/nova-api/v2"
import { MotionGroupModelsApi } from "@wandelbots/nova-api/v2"

/**
 * Creates a nova-api based model getter that fetches GLB models
 * from the Motion Group Models API
 */
export function createNovaApiModelGetter(baseURL: string) {
  const configuration: Configuration = {
    basePath: baseURL.replace(/\/$/, ''), // Remove trailing slash
    isJsonMime: (mime: string) => mime === "application/json"
  }

  const api = new MotionGroupModelsApi(configuration)

  return async (modelFromController: string): Promise<string> => {
    try {
      console.log(`Attempting to load GLB model for ${modelFromController} from Nova API v2...`)

      // First, get the list of available models
      console.log('Fetching list of available motion group models...')
      const modelsResponse = await api.getMotionGroupModels()
      const availableModels = modelsResponse.data
      console.log('Available models:', availableModels)

      // Find the matching model or use the provided model name directly
      let modelToUse = modelFromController
      if (availableModels && availableModels.length > 0) {
        // Try to find exact match first
        const exactMatch = availableModels.find(model => model === modelFromController)
        if (exactMatch) {
          modelToUse = exactMatch
        } else {
          // Try to find partial match (case insensitive)
          const partialMatch = availableModels.find(model => 
            model.toLowerCase().includes(modelFromController.toLowerCase()) ||
            modelFromController.toLowerCase().includes(model.toLowerCase())
          )
          if (partialMatch) {
            modelToUse = partialMatch
            console.log(`Using partial match: ${partialMatch} for requested ${modelFromController}`)
          } else {
            // Use first available model as fallback
            modelToUse = availableModels[0]
            console.log(`No match found, using first available model: ${modelToUse}`)
          }
        }
      }

      console.log(`Loading GLB model: ${modelToUse}`)

      // Now get the GLB model for the selected model
      const response = await api.getMotionGroupGlbModel(modelToUse, {
        responseType: 'blob'
      })
      console.log('Nova API response:', response)

      // Handle the response from v2 API
      let blob: Blob

      if (response.data instanceof Blob) {
        blob = response.data
        console.log(`Received Blob from response.data, size: ${blob.size} bytes, type: ${blob.type}`)
      } else if (response instanceof Blob) {
        blob = response
        console.log(`Received Blob directly, size: ${blob.size} bytes, type: ${blob.type}`)
      } else if (typeof File !== 'undefined' && response.data && (response.data as any) instanceof File) {
        // Convert File to Blob with correct MIME type
        blob = new Blob([response.data], { type: 'model/gltf-binary' })
        console.log(`Converted File to Blob, size: ${blob.size} bytes`)
      } else if (typeof File !== 'undefined' && response instanceof File) {
        // Convert File to Blob with correct MIME type
        blob = new Blob([response], { type: 'model/gltf-binary' })
        console.log(`Converted File to Blob, size: ${blob.size} bytes`)
      } else if ((response.data as any) instanceof ArrayBuffer) {
        blob = new Blob([response.data], { type: 'model/gltf-binary' })
        console.log(`Converted ArrayBuffer to Blob, size: ${blob.size} bytes`)
      } else if (response.data) {
        // Handle other response formats by creating a blob
        console.log('Received other data format, converting to blob:', typeof response.data)
        blob = new Blob([response.data], { type: 'model/gltf-binary' })
      } else {
        throw new Error('No valid data received from Nova API v2')
      }

      // Validate blob size
      if (blob.size === 0) {
        throw new Error('Received empty GLB file from Nova API')
      }

      // Ensure correct MIME type for GLB files
      if (!blob.type || blob.type === 'application/octet-stream') {
        blob = new Blob([blob], { type: 'model/gltf-binary' })
      }

      // Create object URL from the Blob
      const objectUrl = URL.createObjectURL(blob)
      console.log(`Successfully created object URL for ${modelFromController}: ${objectUrl}`)

      // Validate the URL by testing if it's accessible
      try {
        const testResponse = await fetch(objectUrl, { method: 'HEAD' })
        console.log(`Object URL validation - Status: ${testResponse.status}, Content-Type: ${testResponse.headers.get('content-type')}`)
      } catch (error) {
        console.warn('Could not validate object URL:', error)
      }

      return objectUrl

    } catch (error) {
      console.error(`Failed to load GLB model for ${modelFromController} from Nova API:`, error)
      throw error
    }
  }
}

/**
 * Original model getter that uses CDN
 */
export function defaultGetModel(modelFromController: string): string {
  const version = process.env.STORYBOOK ? "" : require("../../../package.json").version
  let useVersion = version
  if (version && version.startsWith("0.")) {
    useVersion = ""
  }
  return `https://cdn.jsdelivr.net/gh/wandelbotsgmbh/wandelbots-js-react-components${useVersion ? `@${useVersion}` : ""}/public/models/${modelFromController}.glb`
}

/**
 * Enhanced model getter that tries nova-api first, falls back to CDN
 */
export function createHybridModelGetter(baseURL: string) {
  const novaApiGetter = createNovaApiModelGetter(baseURL)

  return async (modelFromController: string): Promise<string> => {
    try {
      return await novaApiGetter(modelFromController)
    } catch (error) {
      console.warn(`Nova API model loading failed for ${modelFromController}, falling back to CDN:`, error)
      return defaultGetModel(modelFromController)
    }
  }
}