import { Nova } from "@wandelbots/nova-js/v2"
import { AxiosError, type AxiosInstance, type AxiosResponse } from "axios"
import { afterEach, beforeEach, expect, test, vi } from "vitest"
import { defaultGetModel } from "./robotModelLogic"

const createObjectURL = URL.createObjectURL

beforeEach(() => {
  // Not in jsdom
  URL.createObjectURL = vi.fn(() => "blob:model")
})

afterEach(() => {
  URL.createObjectURL = createObjectURL
  vi.unstubAllEnvs()
})

test("defaultGetModel downloads the model with a NOVA client of the app", async () => {
  // A client with the access token of a cloud instance
  const nova = new Nova({
    instanceUrl: "https://mock.example.com",
    accessToken: "token-of-the-app",
  })
  const downloadModel = vi
    .spyOn(nova.api.motionGroupModels, "getMotionGroupGlbModel")
    .mockResolvedValue(new File([], "model.glb"))

  await expect(defaultGetModel("Model_Of_A_Client", nova)).resolves.toBe(
    "blob:model",
  )
  // As binary data
  expect(downloadModel).toHaveBeenCalledWith("Model_Of_A_Client", {
    responseType: "blob",
  })
})

test("defaultGetModel still takes the URL of an instance", async () => {
  // The mock instance of nova-js has no model files: the error shows the
  // request to the instance of the URL
  await expect(
    defaultGetModel("Model_Of_A_Url", "https://mock.example.com"),
  ).rejects.toThrow("GET /motion-group-models/Model_Of_A_Url/glb")
})

test("defaultGetModel downloads a model again after a failed download", async () => {
  const nova = new Nova({ instanceUrl: "https://mock.example.com" })
  const downloadModel = vi
    .spyOn(nova.api.motionGroupModels, "getMotionGroupGlbModel")
    .mockRejectedValueOnce(new Error("Network Error"))
    .mockResolvedValueOnce(new File([], "model.glb"))

  await expect(defaultGetModel("Model_After_A_Failure", nova)).rejects.toThrow(
    "Network Error",
  )
  // A later call, for example on the next page of an app
  await expect(defaultGetModel("Model_After_A_Failure", nova)).resolves.toBe(
    "blob:model",
  )
  expect(downloadModel).toHaveBeenCalledTimes(2)
})

test("defaultGetModel downloads a model once per instance", async () => {
  const instanceA = new Nova({ instanceUrl: "https://a.example.com" })
  const instanceB = new Nova({ instanceUrl: "https://b.example.com" })
  const downloadA = vi
    .spyOn(instanceA.api.motionGroupModels, "getMotionGroupGlbModel")
    .mockResolvedValue(new File([], "a.glb"))
  const downloadB = vi
    .spyOn(instanceB.api.motionGroupModels, "getMotionGroupGlbModel")
    .mockResolvedValue(new File([], "b.glb"))
  URL.createObjectURL = vi.fn((file: Blob) => `blob:${(file as File).name}`)

  await expect(
    defaultGetModel("Model_On_Two_Instances", instanceA),
  ).resolves.toBe("blob:a.glb")
  await expect(
    defaultGetModel("Model_On_Two_Instances", instanceA),
  ).resolves.toBe("blob:a.glb")
  // Another instance (another NOVA version) can have another file for the
  // same model
  await expect(
    defaultGetModel("Model_On_Two_Instances", instanceB),
  ).resolves.toBe("blob:b.glb")
  expect(downloadA).toHaveBeenCalledOnce()
  expect(downloadB).toHaveBeenCalledOnce()
})

test("defaultGetModel without an instance fails with a clear error", async () => {
  // As in the published package: its build has no WANDELAPI_BASE_URL
  vi.stubEnv("WANDELAPI_BASE_URL", "")

  await expect(defaultGetModel("Model_Without_An_Instance")).rejects.toThrow(
    'Cannot download the model "Model_Without_An_Instance": no NOVA instance',
  )
})

// A robot can have its own copy of its model, registered for its serial
// number (ported from RobotPad, unit/robotModelLoading.test.ts)

const SERIAL = "VR-a468aa887e8268d49f70b86e"

test("defaultGetModel downloads a robot's own copy of its model by its serial number", async () => {
  const nova = new Nova({ instanceUrl: "https://mock.example.com" })
  const file = new File([], "copy.glb")
  const get = vi
    .spyOn(nova.api.opts.axiosInstance as AxiosInstance, "get")
    .mockResolvedValue({ data: file })
  const downloadModel = vi.spyOn(
    nova.api.motionGroupModels,
    "getMotionGroupGlbModel",
  )

  await expect(
    defaultGetModel("Model_With_A_Copy", nova, SERIAL),
  ).resolves.toBe("blob:model")

  expect(get).toHaveBeenCalledExactlyOnceWith(
    "/experimental/motion-group-models/Model_With_A_Copy/glb",
    expect.objectContaining({
      params: { serial_number: SERIAL },
      responseType: "blob",
    }),
  )
  expect(downloadModel).not.toHaveBeenCalled()
})

test("defaultGetModel downloads the reported model when the serial number has no copy", async () => {
  const nova = new Nova({ instanceUrl: "https://mock.example.com" })
  const notFound = new AxiosError(
    "Not Found",
    "ERR_BAD_REQUEST",
    undefined,
    undefined,
    {
      status: 404,
    } as AxiosResponse,
  )
  const get = vi
    .spyOn(nova.api.opts.axiosInstance as AxiosInstance, "get")
    .mockRejectedValueOnce(notFound)
    .mockResolvedValueOnce({ data: new File([], "model.glb") })

  await expect(
    defaultGetModel("Model_Without_A_Copy", nova, SERIAL),
  ).resolves.toBe("blob:model")

  expect(get).toHaveBeenLastCalledWith(
    "/motion-group-models/Model_Without_A_Copy/glb",
    expect.objectContaining({ responseType: "blob" }),
  )
})

test("defaultGetModel downloads a model once per serial number", async () => {
  const nova = new Nova({ instanceUrl: "https://mock.example.com" })
  const get = vi
    .spyOn(nova.api.opts.axiosInstance as AxiosInstance, "get")
    .mockResolvedValue({ data: new File([], "copy.glb") })

  await defaultGetModel("Model_Of_Two_Robots", nova, "serial-1")
  await defaultGetModel("Model_Of_Two_Robots", nova, "serial-1")
  await defaultGetModel("Model_Of_Two_Robots", nova, "serial-2")

  expect(get).toHaveBeenCalledTimes(2)
})
