import { createNova, removeTestData, testData } from "./testData"

/**
 * Removes the test data of the global setup, also after a failed setup. Not
 * in CI: there the robot stays for the state of the instance in the
 * artifact (`snapshot` of scripts/nova-instance.ts), and the workflow
 * deletes the whole instance.
 */
export default async function globalTeardown() {
  if (process.env.CI || !process.env.E2E_CONTROLLER) return
  const data = testData()
  await removeTestData(createNova(), data)
  console.log(
    `Removed the virtual robot ${data.controller} and the collision setup ${data.collisionSetup}`,
  )
}
