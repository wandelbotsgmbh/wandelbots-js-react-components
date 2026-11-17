import { expect, type Locator, type Page, test } from "@playwright/test"
import {
  expectModelDrawn,
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

/** The center of an element on the page, in px */
async function centerOf(locator: Locator) {
  const box = await locator.boundingBox()
  if (!box) throw new Error("The element is not on the page")
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
}

test("shows the sections and the states of LoadingCover", async ({ page }) => {
  await openPage(page, "building-blocks")
  for (const title of [
    "JoggingCartesianAxisControl",
    "JoggingJointValueControl",
    "VelocitySlider and VelocitySliderLabel",
    "JoggingGizmo and JoggingGizmoOrientation",
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

test("jogs the TCP up along Z with JoggingGizmo", async ({ page }) => {
  await openPage(page, "building-blocks")
  await expectModelDrawn(page)
  // The first gizmo jogs; the two small ones show the disabled and the
  // active state
  const zPlus = section(page, "JoggingGizmo and JoggingGizmoOrientation")
    .getByRole("button", { name: "Jog Z+" })
    .first()
  await expect(zPlus).toBeEnabled()
  // The TCP position in the control of Z (buttons X-, X+, Y-, Y+, Z-, Z+),
  // which uses the same JoggingStore
  const z = section(page, "JoggingCartesianAxisControl")
    .getByRole("button")
    .nth(4)
    .locator("..")
  await expect(z).toContainText(/\d mm/)
  const before = millimeters(await z.innerText())

  await jogPress(
    page,
    zPlus,
    async () => millimeters(await z.innerText()) > before + 3,
  )
  await screenshot(page, "building-blocks-gizmo-z")
})

test("turns JoggingGizmo with the camera of the 3D view", async ({ page }) => {
  await openPage(page, "building-blocks")
  await expectModelDrawn(page)
  const xPlus = section(page, "JoggingGizmo and JoggingGizmoOrientation")
    .getByRole("button", { name: "Jog X+" })
    .first()
  const viewport = page.getByTestId("viewport")
  await viewport.scrollIntoViewIfNeeded()
  const before = await centerOf(xPlus)

  // Orbit: drag across the 3D view
  const view = await viewport.boundingBox()
  if (!view) throw new Error("No 3D view")
  const y = view.y + view.height / 2
  await page.mouse.move(view.x + view.width * 0.8, y)
  await page.mouse.down()
  await page.mouse.move(view.x + view.width * 0.2, y, { steps: 12 })
  await page.mouse.up()

  await expect
    .poll(
      async () => {
        const after = await centerOf(xPlus)
        return Math.hypot(after.x - before.x, after.y - before.y)
      },
      { message: "The X+ handle turned with the camera", timeout: 15_000 },
    )
    .toBeGreaterThan(20)
  await screenshot(page, "building-blocks-gizmo-orbited")
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
