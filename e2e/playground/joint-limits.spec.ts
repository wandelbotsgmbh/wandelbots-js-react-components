import { expect, test } from "@playwright/test"
import {
  expectModelDrawn,
  jogPress,
  jointPositions,
  openPage,
  raiseVelocity,
  screenshot,
  screenshotOnFailure,
  sliderValue,
} from "./helpers"

// The page Joint limits: JointLimitGizmo, a JoggingJointValueControl per
// joint, and VelocitySlider

test.afterEach(screenshotOnFailure("joint-limits"))

test("shows 6 joints, changes the velocity and jogs joint 2", async ({
  page,
}) => {
  await openPage(page, "joint-limits")
  await expectModelDrawn(page)

  // A row per joint: J1 to J6
  await expect(page.getByText(/^J\d$/)).toHaveCount(6)

  const velocitySlider = page.getByTestId("velocity-slider")
  const velocity = await raiseVelocity(velocitySlider)
  await expect(velocitySlider).toContainText(`${velocity} °/s`)

  const joint2 = page.getByText("J2", { exact: true }).locator("..")
  const shown = joint2.getByRole("slider", { name: "Joint position" })
  const shownBefore = await sliderValue(shown)
  const before = await jointPositions()

  // The buttons: "-", then "+". The row shows degrees.
  await jogPress(
    page,
    joint2.getByRole("button").last(),
    async () => (await sliderValue(shown)) > shownBefore + 2,
  )

  // The NOVA API gives radians
  await expect
    .poll(async () => (await jointPositions())[1])
    .toBeGreaterThan(before[1] + 0.03)
  await screenshot(page, "joint-limits-joint-2")
})
