import { expect, test } from "@playwright/test"
import type { OperationMode } from "@wandelbots/nova-js/v2"
import {
  controllerState,
  expectModelDrawn,
  expectSafetyBar,
  nova,
  openPage,
  screenshot,
  screenshotOnFailure,
} from "./helpers"
import { CELL, COLLISION_SETUP, SAFETY_ZONES, testData } from "./testData"

// The page Safety and collisions: SafetyZonesRenderer,
// CollisionSceneRenderer and JoggingPanel; and SafetyBar of the top bar

test.afterEach(screenshotOnFailure("safety"))

test("shows the safety zones and a stored collision setup", async ({
  page,
}) => {
  const { motionGroup, collisionSetup } = testData()
  await openPage(page, "safety")
  await expectModelDrawn(page)
  await expect(
    page.getByText(
      `${SAFETY_ZONES.length} safety zones in the description of ${motionGroup}`,
    ),
  ).toBeVisible()

  const select = page.getByRole("combobox", { name: "Collision setup" })
  await select.click()
  await page.getByRole("option", { name: collisionSetup, exact: true }).click()
  await expect(select).toHaveText(collisionSetup)
  await expect(
    page.getByText(
      `${Object.keys(COLLISION_SETUP.colliders).length} colliders`,
      { exact: true },
    ),
  ).toBeVisible()
  await screenshot(page, "safety-zones-and-colliders")
})

test("shows Safe and the E-Stop in the SafetyBar", async ({ page }) => {
  const { controller } = testData()
  await openPage(page, "safety")
  await expectModelDrawn(page)
  await expectSafetyBar(page, "Safety state", "Safe")

  await nova().api.virtualController.setEmergencyStop(CELL, controller, true)
  try {
    await expectSafetyBar(page, "Safety state", "E-Stop")
    await screenshot(page, "safety-e-stop")
  } finally {
    // Also when the test fails: the other tests move the robot
    await nova().api.virtualController.setEmergencyStop(CELL, controller, false)
  }
  await expectSafetyBar(page, "Safety state", "Safe")
})

/** The text of the SafetyBar for an operation mode */
function operationModeText(mode: OperationMode) {
  return mode.startsWith("OPERATION_MODE_MANUAL") ? "Manual" : "Automatic"
}

test("shows the operation mode in the SafetyBar", async ({ page }) => {
  const { controller } = testData()
  await openPage(page, "safety")
  await expectModelDrawn(page)

  // A new virtual robot is in automatic mode
  const start = (await controllerState()).operation_mode
  const other: OperationMode =
    start === "OPERATION_MODE_AUTO"
      ? "OPERATION_MODE_MANUAL"
      : "OPERATION_MODE_AUTO"
  await expectSafetyBar(page, "Operation mode", operationModeText(start))

  await nova().api.virtualController.setOperationMode(CELL, controller, other)
  try {
    await expectSafetyBar(page, "Operation mode", operationModeText(other))
    await screenshot(page, "safety-operation-mode")
  } finally {
    await nova().api.virtualController.setOperationMode(CELL, controller, start)
  }
  await expectSafetyBar(page, "Operation mode", operationModeText(start))
})
