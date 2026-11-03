import { Nova } from "@wandelbots/nova-js/v2"
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
