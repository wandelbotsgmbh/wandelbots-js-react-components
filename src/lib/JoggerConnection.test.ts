import { NovaClient } from "@wandelbots/nova-js/v2"
import { expect, test, vi } from "vitest"
import { delay } from "../components/utils/errorHandling"
import { JoggerConnection } from "./JoggerConnection"
import { jointValuesEqual } from "./motionStateUpdate"

// Notes:
// - In mock mode, no joint comparison takes place (always successful)
// - To test with real (virtual or physical) instance, set an INSTANCE_URL

const INSTANCE_URL = undefined // This could be read from ENV in future
const MOCK = !INSTANCE_URL

test("jog a robot somewhat", async () => {
  const nova = new NovaClient({
    instanceUrl: MOCK ? "https://mock.example.com" : INSTANCE_URL,
  })

  // Find a virtual robot we can jog
  const controllerNames = await nova.api.controller.listRobotControllers()
  const firstControllerName = controllerNames[0]

  if (!firstControllerName) {
    throw new Error("No robot controllers found on instance")
  }

  const controllerConfig =
    await nova.api.controller.getRobotController(firstControllerName)
  const controllerState =
    await nova.api.controller.getCurrentRobotControllerState(
      firstControllerName,
    )
  console.log("verify, got controller config and state", {
    controllerConfig,
    controllerState,
  })

  if (!controllerConfig || !controllerState) {
    throw new Error(
      `Could not get controller config and state for ${firstControllerName}`,
    )
  }

  if (controllerConfig.configuration.kind !== "VirtualController") {
    throw new Error(
      `Controller ${firstControllerName} is not a VirtualController, it's a ${controllerConfig.configuration.kind}`,
    )
  }

  if (controllerState.last_error?.[0]) {
    throw new Error(
      `Controller ${firstControllerName} has error: ${controllerState.last_error[0]}`,
    )
  }

  const virtualMotionGroup = controllerState.motion_groups[0]

  if (!virtualMotionGroup) {
    throw new Error(
      `Could not find a joggable motion group. Saw controller: ${firstControllerName}`,
    )
  }

  const jogger = await JoggerConnection.open(
    nova,
    virtualMotionGroup.motion_group,
  )

  function getJoints() {
    return jogger.motionStream.rapidlyChangingMotionState.joint_position
  }

  let joints = getJoints()

  await jogger.setJoggingMode("jogging")

  await jogger.rotateJoints({
    joint: 0,
    direction: "+",
    velocityRadsPerSec: 0.1,
  })

  await delay(500)
  await jogger.stop()

  if (!MOCK) {
    // Only verify joint movement in non-mock mode
    await expect.poll(() => getJoints()[0]).toBeGreaterThan(joints[0] + 0.01)
    expect(getJoints()[1]).toBeCloseTo(joints[1])
  }

  joints = getJoints()

  await jogger.rotateJoints({
    joint: 0,
    direction: "-",
    velocityRadsPerSec: 0.1,
  })
  await delay(500)
  await jogger.stop()

  await expect.poll(() => getJoints()[0]).toBeLessThan(joints[0] + 0.01)
  expect(getJoints()[1]).toBeCloseTo(joints[1])

  if (MOCK) {
    return
  }

  // Wait for motion to stop
  await vi.waitUntil(
    async () => {
      const joints = getJoints()
      await jogger.motionStream.motionStateSocket.nextMessage()
      return jointValuesEqual(joints, getJoints(), 0.0001)
    },
    {
      timeout: 3000,
    },
  )
})
