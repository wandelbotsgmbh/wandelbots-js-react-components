// Ported from RobotPad (src/util/motionGroupModelResources.ts). Internal: robot
// loading uses it with the library's own NOVA client.

import type { Nova } from "@wandelbots/nova-js/v2"
import { isAxiosError, type AxiosRequestConfig } from "axios"

/** @internal */
export type MotionGroupModelResource = "collision" | "glb" | "kinematic"

// TODO: `kinematic`, `glb`, `collision`, and `description` are missing from
// api/v2/public.openapi.yaml (only `archive`, `homejoints`, `dynamic`, and
// `limit` are public there), even though they're already defined with
// `serial_number` in api/v2/robot-data-provider/. Because of that, nova-js
// has no generated functions for them and these helpers build the URLs and
// options by hand. Once they're added — with `kinematic`, `collision`, and
// `description` GET responses typed as `application/json` rather than
// `application/octet-stream` — these helpers can be replaced by generated
// nova-js calls.
function httpClient(nova: Nova) {
  const axiosInstance = nova.api.opts.axiosInstance
  if (!axiosInstance) {
    throw new Error("Nova API client has no configured HTTP transport")
  }
  return axiosInstance
}

function requestOptions(nova: Nova, overrides: AxiosRequestConfig) {
  const baseOptions = nova.api.opts.baseOptions ?? {}
  const merged = { ...baseOptions, ...overrides }
  if (baseOptions.headers || overrides.headers) {
    merged.headers = {
      ...baseOptions.headers,
      ...overrides.headers,
    }
  }
  if (baseOptions.params || overrides.params) {
    merged.params = {
      ...baseOptions.params,
      ...overrides.params,
    }
  }
  return merged
}

/**
 * The name of the motion group model that holds this robot's data: the custom
 * copy registered for its serial number, or the reported model otherwise.
 * Requests that carry only a model name, such as trajectory planning, must
 * send this name or they get the reported model's data instead of the copy's.
 */
/** @internal */
export async function resolveMotionGroupModelName(
  nova: Nova,
  motionGroupModel: string,
  serialNumber: string | undefined,
  onRequest?: (url: string) => void,
): Promise<string> {
  if (!serialNumber) return motionGroupModel

  const path = `/experimental/motion-group-models/${encodeURIComponent(motionGroupModel)}/description`
  onRequest?.(`${path}?serial_number=${encodeURIComponent(serialNumber)}`)
  try {
    const response = await httpClient(nova).get<{ name: string }>(
      path,
      requestOptions(nova, { params: { serial_number: serialNumber } }),
    )
    return response.data.name
  } catch (error) {
    if (!isAxiosError(error) || error.response?.status !== 404) {
      throw error
    }
    return motionGroupModel
  }
}

/**
 * A resource of a motion group model, from the copy registered for the
 * serial number when there is one, else from the reported model
 *
 * @internal
 */
export async function getMotionGroupModelResource<T>(
  nova: Nova,
  motionGroupModel: string,
  serialNumber: string | undefined,
  resource: MotionGroupModelResource,
  onRequest?: (url: string) => void,
): Promise<T> {
  const axiosInstance = httpClient(nova)
  const path = `/motion-group-models/${encodeURIComponent(motionGroupModel)}/${resource}`
  const options = resource === "glb" ? { responseType: "blob" as const } : {}

  if (serialNumber) {
    const experimentalPath = `/experimental${path}`
    onRequest?.(
      `${experimentalPath}?serial_number=${encodeURIComponent(serialNumber)}`,
    )
    try {
      const response = await axiosInstance.get<T>(
        experimentalPath,
        requestOptions(nova, {
          ...options,
          params: { serial_number: serialNumber },
        }),
      )
      return response.data
    } catch (error) {
      if (!isAxiosError(error) || error.response?.status !== 404) {
        throw error
      }
    }
  }

  onRequest?.(path)
  const response = await axiosInstance.get<T>(
    path,
    requestOptions(nova, options),
  )

  return response.data
}
