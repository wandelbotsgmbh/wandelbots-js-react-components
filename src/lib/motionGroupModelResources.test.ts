import type { Nova } from "@wandelbots/nova-js/v2"
// Ported from RobotPad (unit/motionGroupModelResources.test.ts)
import { AxiosError } from "axios"
import { describe, expect, it, vi } from "vitest"
import {
  getMotionGroupModelResource,
  resolveMotionGroupModelName,
} from "./motionGroupModelResources"

describe("resolveMotionGroupModelName", () => {
  function novaWith(get: ReturnType<typeof vi.fn>) {
    return { api: { opts: { axiosInstance: { get } } } } as unknown as Nova
  }

  it("returns the custom copy registered for the serial number", async () => {
    const get = vi
      .fn()
      .mockResolvedValue({ data: { name: "custom-UniversalRobots_UR5e-1" } })

    await expect(
      resolveMotionGroupModelName(
        novaWith(get),
        "UniversalRobots UR5e",
        "VR-serial",
      ),
    ).resolves.toBe("custom-UniversalRobots_UR5e-1")
    expect(get).toHaveBeenCalledExactlyOnceWith(
      "/experimental/motion-group-models/UniversalRobots%20UR5e/description",
      { params: { serial_number: "VR-serial" } },
    )
  })

  it.each([
    undefined,
    "",
  ])("keeps the reported model without asking when the serial is %j", async (serial) => {
    const get = vi.fn()

    await expect(
      resolveMotionGroupModelName(
        novaWith(get),
        "UniversalRobots_UR5e",
        serial,
      ),
    ).resolves.toBe("UniversalRobots_UR5e")
    expect(get).not.toHaveBeenCalled()
  })

  it("keeps the reported model when the instance has no experimental description", async () => {
    const get = vi.fn().mockRejectedValue(
      Object.assign(new AxiosError("Not found"), {
        response: { status: 404 },
      }),
    )

    await expect(
      resolveMotionGroupModelName(
        novaWith(get),
        "UniversalRobots_UR5e",
        "serial",
      ),
    ).resolves.toBe("UniversalRobots_UR5e")
  })

  it("does not hide other failures behind the reported model", async () => {
    const error = Object.assign(new AxiosError("Server error"), {
      response: { status: 500 },
    })
    const get = vi.fn().mockRejectedValue(error)

    await expect(
      resolveMotionGroupModelName(
        novaWith(get),
        "UniversalRobots_UR5e",
        "serial",
      ),
    ).rejects.toBe(error)
  })
})

describe("getMotionGroupModelResource", () => {
  it("preserves Nova base options for experimental and stable requests", async () => {
    const notFound = Object.assign(new AxiosError("Not found"), {
      response: { status: 404 },
    })
    const get = vi
      .fn()
      .mockRejectedValueOnce(notFound)
      .mockResolvedValueOnce({ data: { inverse_solver: "UR" } })
    const baseOptions = {
      headers: {
        Authorization: "Bearer token",
        "X-Wandelbots-Client": "robot-pad",
      },
      params: { locale: "en" },
      timeout: 1500,
    }
    const nova = {
      api: { opts: { axiosInstance: { get }, baseOptions } },
    } as unknown as Nova

    await getMotionGroupModelResource(
      nova,
      "UniversalRobots_UR5e",
      "serial-42",
      "kinematic",
    )

    expect(get).toHaveBeenNthCalledWith(
      1,
      "/experimental/motion-group-models/UniversalRobots_UR5e/kinematic",
      {
        ...baseOptions,
        params: { locale: "en", serial_number: "serial-42" },
      },
    )
    expect(get).toHaveBeenNthCalledWith(
      2,
      "/motion-group-models/UniversalRobots_UR5e/kinematic",
      baseOptions,
    )
  })

  it("requests the serial-aware endpoint through Nova's authenticated client", async () => {
    const get = vi.fn().mockResolvedValue({ data: { inverse_solver: "UR" } })
    const nova = {
      api: { opts: { axiosInstance: { get } } },
    } as unknown as Nova

    const result = await getMotionGroupModelResource(
      nova,
      "UniversalRobots UR5e",
      "serial number/42",
      "kinematic",
    )

    expect(get).toHaveBeenCalledWith(
      "/experimental/motion-group-models/UniversalRobots%20UR5e/kinematic",
      {
        params: { serial_number: "serial number/42" },
      },
    )
    expect(result).toEqual({ inverse_solver: "UR" })
  })

  it.each([
    undefined,
    "",
  ])("uses the stable endpoint when serial is %s", async (serial) => {
    const data = { inverse_solver: "UR" }
    const get = vi.fn().mockResolvedValue({ data })
    const nova = {
      api: { opts: { axiosInstance: { get } } },
    } as unknown as Nova

    await expect(
      getMotionGroupModelResource(
        nova,
        "UniversalRobots UR5e",
        serial,
        "kinematic",
      ),
    ).resolves.toEqual(data)

    expect(get).toHaveBeenCalledExactlyOnceWith(
      "/motion-group-models/UniversalRobots%20UR5e/kinematic",
      {},
    )
  })

  it.each([
    "kinematic",
    "collision",
    "glb",
  ] as const)("falls back to the stable %s resource on a serial-aware 404", async (resource) => {
    const error = Object.assign(new AxiosError("Not found"), {
      response: { status: 404 },
    })
    const data = resource === "glb" ? new Blob() : { model: "UR5e" }
    const get = vi
      .fn()
      .mockRejectedValueOnce(error)
      .mockResolvedValueOnce({ data })
    const nova = {
      api: { opts: { axiosInstance: { get } } },
    } as unknown as Nova
    const options = resource === "glb" ? { responseType: "blob" } : {}

    await expect(
      getMotionGroupModelResource(
        nova,
        "UniversalRobots UR5e",
        "serial",
        resource,
      ),
    ).resolves.toEqual(data)

    expect(get).toHaveBeenCalledTimes(2)
    expect(get).toHaveBeenNthCalledWith(
      1,
      `/experimental/motion-group-models/UniversalRobots%20UR5e/${resource}`,
      { ...options, params: { serial_number: "serial" } },
    )
    expect(get).toHaveBeenNthCalledWith(
      2,
      `/motion-group-models/UniversalRobots%20UR5e/${resource}`,
      options,
    )
  })

  it.each([
    401,
    403,
    500,
    undefined,
  ])("does not fall back for status %s", async (status) => {
    const error = Object.assign(new AxiosError("Request failed"), {
      response: status ? { status } : undefined,
    })
    const get = vi.fn().mockRejectedValue(error)
    const nova = {
      api: { opts: { axiosInstance: { get } } },
    } as unknown as Nova

    await expect(
      getMotionGroupModelResource(nova, "model", "serial", "kinematic"),
    ).rejects.toBe(error)
    expect(get).toHaveBeenCalledTimes(1)
  })

  it("propagates a failed stable fallback without retrying", async () => {
    const notFound = Object.assign(new AxiosError("Not found"), {
      response: { status: 404 },
    })
    const get = vi.fn().mockRejectedValue(notFound)
    const nova = {
      api: { opts: { axiosInstance: { get } } },
    } as unknown as Nova

    await expect(
      getMotionGroupModelResource(nova, "model", "serial", "kinematic"),
    ).rejects.toBe(notFound)
    expect(get).toHaveBeenCalledTimes(2)
  })

  it("requests a stable GLB resource as a blob without a serial", async () => {
    const get = vi.fn().mockResolvedValue({ data: new Blob() })
    const nova = {
      api: { opts: { axiosInstance: { get } } },
    } as unknown as Nova

    await getMotionGroupModelResource(nova, "model", undefined, "glb")

    expect(get).toHaveBeenCalledExactlyOnceWith(
      "/motion-group-models/model/glb",
      { responseType: "blob" },
    )
  })

  it("requests GLB resources as blobs", async () => {
    const get = vi.fn().mockResolvedValue({ data: new Blob() })
    const nova = {
      api: { opts: { axiosInstance: { get } } },
    } as unknown as Nova

    await getMotionGroupModelResource(nova, "model", "serial", "glb")

    expect(get).toHaveBeenCalledWith(
      "/experimental/motion-group-models/model/glb",
      {
        params: { serial_number: "serial" },
        responseType: "blob",
      },
    )
  })
})
