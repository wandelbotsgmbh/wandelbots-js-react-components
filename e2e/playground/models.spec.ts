import { expect, type Page, test } from "@playwright/test"
import {
  expectModelDrawn,
  openPage,
  screenshot,
  screenshotOnFailure,
} from "./helpers"

// The page Robot models: the models of the instance with SupportedRobot and
// SupportedLinearAxis

test.afterEach(screenshotOnFailure("models"))

/** The numbers of the text "N of M models" */
async function modelCounts(page: Page) {
  const text = await page.getByText(/^\d+ of \d+ models$/).innerText()
  const [shown, all] = (text.match(/\d+/g) ?? []).map(Number)
  return { shown, all }
}

test("lists the models, filters them and draws another robot", async ({
  page,
}) => {
  await openPage(page, "models")
  // At the start, the model of the test robot
  await expect(
    page.getByRole("heading", { name: "UniversalRobots_UR5e", exact: true }),
  ).toBeVisible()
  await expectModelDrawn(page)
  const { shown, all } = await modelCounts(page)
  expect(shown).toBe(all)

  await page.getByRole("textbox", { name: "Filter" }).fill("UR10e")
  await expect
    .poll(async () => (await modelCounts(page)).shown)
    .toBeLessThan(all)
  await page
    .getByRole("button", { name: "UniversalRobots_UR10e", exact: true })
    .click()

  // The heading shows when the new model is loaded, with a new 3D view
  await expect(
    page.getByRole("heading", { name: "UniversalRobots_UR10e", exact: true }),
  ).toBeVisible()
  await expect(
    page.getByText(/^Robot: SupportedRobot, 6 joints, /),
  ).toBeVisible()
  await expectModelDrawn(page)
  await screenshot(page, "models-ur10e")
})
