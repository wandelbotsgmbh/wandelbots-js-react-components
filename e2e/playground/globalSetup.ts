import { randomUUID } from "node:crypto"
import { rmSync } from "node:fs"
import { novaInstance } from "../novaInstance"
import { SCREENSHOT_DIR } from "./helpers"
import {
  addTestData,
  CELL,
  COLLISION_SETUP,
  createNova,
  NO_INSTANCE_MESSAGE,
  SAFETY_ZONES,
  type TestData,
} from "./testData"

/**
 * Adds the test data on the NOVA instance (see testData.ts) and passes its
 * names to the tests in the environment variables E2E_CONTROLLER and
 * E2E_COLLISION_SETUP. Without an instance, the tests stop at once: skipped
 * tests would look like a success, also in CI.
 */
export default async function globalSetup() {
  const instance = novaInstance()
  if (!instance.url) {
    throw new Error(NO_INSTANCE_MESSAGE)
  }
  console.log(
    `Playwright tests of the playground against ${instance.url} (${instance.source})`,
  )

  // Only the screenshots of this run
  rmSync(SCREENSHOT_DIR, { recursive: true, force: true })

  const controller = `e2e-${randomUUID().slice(0, 8)}`
  const data: TestData = {
    controller,
    motionGroup: `0@${controller}`,
    collisionSetup: `e2e-${randomUUID().slice(0, 8)}`,
  }
  // Set before the data is added: also after a failed setup, Playwright
  // runs the global teardown, which removes the data with these names
  process.env.E2E_CONTROLLER = data.controller
  process.env.E2E_COLLISION_SETUP = data.collisionSetup

  const start = Date.now()
  const nova = createNova()
  await addTestData(nova, data)
  // Each test starts from this pose (openPage in helpers.ts)
  const { positions } = await nova.api.virtualController.getMotionGroupState(
    CELL,
    data.controller,
    data.motionGroup,
  )
  process.env.E2E_START_JOINTS = JSON.stringify(positions)
  console.log(
    `Added the virtual robot ${data.controller} with ${SAFETY_ZONES.length} safety zones, and the collision setup ${data.collisionSetup} with ${Object.keys(COLLISION_SETUP.colliders).length} colliders (${Math.round((Date.now() - start) / 1000)} s)`,
  )
}
