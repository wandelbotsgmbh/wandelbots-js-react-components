import { expect, type Page, test } from "@playwright/test"
import {
  jogPress,
  millimeters,
  openPage,
  screenshot,
  screenshotOnFailure,
} from "./helpers"

// The page Building blocks: the small parts alone

test.afterEach(screenshotOnFailure("building-blocks"))

/** A section of the page, by its heading */
function section(page: Page, title: string) {
  return page
    .locator("section")
    .filter({ has: page.getByRole("heading", { name: title, exact: true }) })
}

test("shows the sections and the states of LoadingCover", async ({ page }) => {
  await openPage(page, "building-blocks")
  for (const title of [
    "JoggingCartesianAxisControl",
    "JoggingJointValueControl",
    "VelocitySlider and VelocitySliderLabel",
    "LoadingCover and LoadingErrorMessage",
    "NoMotionGroupModal",
  ]) {
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible()
  }

  const covers = section(page, "LoadingCover and LoadingErrorMessage")
  // Loading, and loading for a long time: the text for a slow load shows
  // only after softTimeout
  await expect(
    covers.getByText("Loading the robot", { exact: true }),
  ).toHaveCount(2)
  await expect(
    covers
      .getByText("This is taking longer than expected...")
      .filter({ visible: true }),
  ).toHaveCount(1)
  // An error, and LoadingErrorMessage alone
  await expect(
    covers.getByText(
      "Error while loading the robot - Example error: the controller did not answer within 5 seconds",
    ),
  ).toBeVisible()
  await expect(
    covers.getByText(
      "Error while loading the robot - Example error: the model is missing",
    ),
  ).toBeVisible()
  await screenshot(page, "building-blocks-sections")
})

test("jogs the TCP with JoggingCartesianAxisControl", async ({ page }) => {
  await openPage(page, "building-blocks")
  // The buttons of the controls of X, Y and Z come first: X-, X+, Y-, ...
  const xPlus = section(page, "JoggingCartesianAxisControl")
    .getByRole("button")
    .nth(1)
  await expect(xPlus).toBeEnabled()
  // The control of X: the 2 buttons and the TCP position between them
  const x = xPlus.locator("..")
  await expect(x).toContainText(/\d mm/)
  const before = millimeters(await x.innerText())

  await jogPress(
    page,
    xPlus,
    async () => millimeters(await x.innerText()) > before + 3,
  )
  await screenshot(page, "building-blocks-tcp-x")
})

test("opens and closes NoMotionGroupModal", async ({ page }) => {
  await openPage(page, "building-blocks")
  await page.getByRole("button", { name: "Show NoMotionGroupModal" }).click()
  const modal = page.getByRole("dialog", { name: "No motion group found" })
  await expect(modal).toBeVisible()
  await screenshot(page, "building-blocks-modal")

  await page.getByRole("button", { name: "Close the modal" }).click()
  await expect(modal).toBeHidden()
})
