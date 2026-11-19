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
    "JoggingButtons",
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

test("jogs the TCP up along Z with JoggingButtons", async ({ page }) => {
  await openPage(page, "building-blocks")
  // The first buttons jog; the two sets below show the disabled and the
  // active state
  const zPlus = section(page, "JoggingButtons")
    .getByRole("button", { name: "Jog Z+" })
    .first()
  await expect(zPlus).toBeEnabled()
  // The TCP position in the control of Z, which uses the same JoggingStore
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
  await expect(zPlus).toHaveAttribute("aria-pressed", "false")
  await screenshot(page, "building-blocks-buttons-z")
})

/** The numbers of a text, e.g. of the TCP orientation in degrees */
function numbersOf(text: string) {
  return (text.match(/-?\d+(\.\d+)?/g) ?? []).map(Number)
}

test("turns the TCP about Z with JoggingGizmo in rotate mode", async ({
  page,
}) => {
  await openPage(page, "building-blocks")
  await expectModelDrawn(page)
  const gizmos = section(page, "JoggingGizmo and JoggingGizmoOrientation")
  await gizmos.getByRole("button", { name: "Rotate" }).click()
  // The first gizmo jogs, as in translate mode. Its handle is the round
  // button on the arrowhead.
  const rzPlus = gizmos.getByRole("button", { name: "Jog Rz+" }).first()
  await expect(rzPlus).toBeEnabled()
  const orientation = gizmos.getByTestId("tcp-orientation")
  await expect(orientation).toContainText(/\d°/)
  const before = numbersOf(await orientation.innerText())

  await jogPress(page, rzPlus, async () => {
    // A turn about Z changes the rotation vector in more than one number
    const now = numbersOf(await orientation.innerText())
    const change = now.reduce(
      (sum, value, i) => sum + Math.abs(value - before[i]),
      0,
    )
    return change > 1
  })
  await screenshot(page, "building-blocks-gizmo-rz")
})

test("turns JoggingGizmo like the tool when it jogs along the tool's axes", async ({
  page,
}) => {
  await openPage(page, "building-blocks")
  await expectModelDrawn(page)
  const gizmos = section(page, "JoggingGizmo and JoggingGizmoOrientation")
  const handles = ["Jog X+", "Jog Y+", "Jog Z+"].map((name) =>
    gizmos.getByRole("button", { name }).first(),
  )
  await expect(handles[0]).toBeEnabled()
  const alongWorld = await Promise.all(handles.map(centerOf))

  // The tool of the start pose is turned against the world frame, so its
  // axes show elsewhere on screen
  await gizmos.getByRole("button", { name: "Tool" }).click()
  await expect
    .poll(
      async () => {
        const alongTool = await Promise.all(handles.map(centerOf))
        return Math.max(
          ...alongTool.map((p, i) =>
            Math.hypot(p.x - alongWorld[i].x, p.y - alongWorld[i].y),
          ),
        )
      },
      { message: "The handles turned like the tool", timeout: 15_000 },
    )
    .toBeGreaterThan(20)

  // Holding Z+ moves the TCP along the tool's Z. By keyboard: in a turned
  // frame, Z can point at the viewer, and then a press reaches no handle.
  const axisControls = section(page, "JoggingCartesianAxisControl")
  const position = async () =>
    Promise.all(
      [0, 2, 4].map(async (i) =>
        millimeters(
          await axisControls
            .getByRole("button")
            .nth(i)
            .locator("..")
            .innerText(),
        ),
      ),
    )
  const before = await position()
  await handles[2].focus()
  await page.keyboard.down(" ")
  try {
    await expect
      .poll(
        async () => {
          const now = await position()
          return now.reduce((sum, v, i) => sum + Math.abs(v - before[i]), 0)
        },
        {
          message: "The TCP moves while Z+ is held",
          // On a CI runner, the jogging connection can need more than 10 s
          timeout: 30_000,
        },
      )
      .toBeGreaterThan(3)
  } finally {
    await page.keyboard.up(" ")
  }
  await screenshot(page, "building-blocks-gizmo-tool")
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
