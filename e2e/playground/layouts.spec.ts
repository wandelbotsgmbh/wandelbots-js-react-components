import { expect, test } from "@playwright/test"
import {
  controllerState,
  expectModelDrawn,
  jogPress,
  jointPositions,
  nova,
  openPage,
  screenshot,
  screenshotOnFailure,
  tcpZ,
} from "./helpers"
import { CELL, testData } from "./testData"

// The page Layouts: RobotHeader on top, RobotControlPanel and CurrentPoseBar
// over the robot's 3D view, as in the Figma design

test.afterEach(screenshotOnFailure("layouts"))

test("shows the robot's 3D view with RobotControlPanel at its top right and CurrentPoseBar along its bottom", async ({
  page,
}) => {
  await openPage(page, "layouts")
  await expectModelDrawn(page)
  const view = await page.getByTestId("viewport").boundingBox()
  const panel = await page.getByTestId("robot-control-panel").boundingBox()
  const bar = await page.getByTestId("current-pose-bar").boundingBox()
  if (!view || !panel || !bar)
    throw new Error("A part of the layout is missing")

  // The panel floats at the view's top right, the bar along its bottom
  expect(view.x + view.width - (panel.x + panel.width)).toBeLessThan(24)
  expect(panel.y - view.y).toBeLessThan(24)
  expect(bar.width).toBeGreaterThan(view.width * 0.9)
  expect(view.y + view.height - (bar.y + bar.height)).toBeLessThan(24)
  // The panel ends above the bar, on any height of the window
  expect(panel.y + panel.height).toBeLessThan(bar.y)
  await screenshot(page, "layouts")
})

test("shows RobotHeader above the 3D view with the robot's motion group, and its app menu opens the playground's pages", async ({
  page,
}) => {
  await openPage(page, "layouts")
  const header = page.getByTestId("robot-header")
  await expect(header.getByRole("heading", { name: "Robot Pad" })).toBeVisible()
  await expect(
    header.getByRole("combobox", { name: "Motion group" }),
  ).toHaveText(testData().motionGroup)
  const headerBox = await header.boundingBox()
  const viewBox = await page.getByTestId("viewport").boundingBox()
  if (!headerBox || !viewBox)
    throw new Error("The header or the view is missing")
  expect(headerBox.y + headerBox.height).toBeLessThanOrEqual(viewBox.y + 0.5)
  await screenshot(page, "layouts-robot-header")

  await header.getByRole("button", { name: "Apps" }).click()
  await page.getByRole("menuitem", { name: "Building blocks" }).click()
  await expect(page).toHaveURL(/page=building-blocks/)
})

test("activates and deactivates the robot with RobotHeader's switch, as RobotPad does: the controller's mode", async ({
  page,
}) => {
  await openPage(page, "layouts")
  const activation = page
    .getByTestId("robot-header")
    .getByRole("switch", { name: /Activat|Deactivat/ })
  // openPage waits for MODE_MONITOR: nothing controls the robot
  await expect(activation).not.toBeChecked()
  await expect(activation).toHaveAccessibleName("Activate")

  try {
    await activation.click()
    await expect(activation).toBeChecked({ timeout: 30_000 })
    await expect(activation).toHaveAccessibleName("Activated")
    expect((await controllerState()).mode).toBe("MODE_CONTROL")

    await activation.click()
    await expect(activation).not.toBeChecked({ timeout: 30_000 })
    await expect(activation).toHaveAccessibleName("Activate")
  } finally {
    // The next test needs the robot in MODE_MONITOR
    await nova().api.controller.setDefaultMode(
      CELL,
      testData().controller,
      "ROBOT_SYSTEM_MODE_MONITOR",
    )
  }
  await expect
    .poll(async () => (await controllerState()).mode, { timeout: 30_000 })
    .toBe("MODE_MONITOR")
})

test("shows the TCP's pose in CurrentPoseBar as NOVA reports it, Running while a jog runs, and the orientation as a quaternion", async ({
  page,
}) => {
  await openPage(page, "layouts")
  const bar = page.getByTestId("current-pose-bar")
  const values = bar.getByTestId("current-pose-values")
  /** The bar's Z, in mm */
  const barZ = async () =>
    Number(/Z\s*(-?\d+(\.\d+)?)/.exec(await values.innerText())?.[1])

  // The bar shows the pose in world, where NOVA reports it
  await expect
    .poll(async () => Math.abs((await barZ()) - (await tcpZ())), {
      message: "The bar shows the TCP's height",
      timeout: 30_000,
    })
    .toBeLessThan(0.2)
  await expect(bar.getByTestId("KIND_UNKNOWN")).toHaveText("Ready")

  // Jogging Z up with the panel's buttons: the bar follows, and says
  // Running while the jog runs
  const panel = page.getByTestId("robot-control-panel")
  await expect(panel.getByRole("button", { name: "Jog Z+" })).toBeEnabled({
    timeout: 30_000,
  })
  await panel.getByRole("button", { name: "Button controls" }).click()
  const zPlus = panel.getByRole("button", { name: "Jog Z+" })
  await expect(zPlus).toBeEnabled()
  const before = await barZ()
  let running = false
  await jogPress(page, zPlus, async () => {
    running ||= await bar.getByTestId("RUNNING").isVisible()
    return running && (await barZ()) > before + 3
  })
  await expect(bar.getByTestId("KIND_UNKNOWN")).toHaveText("Ready", {
    timeout: 30_000,
  })

  // The orientation as a quaternion: four values, no angle unit
  await bar.getByRole("button", { name: "Orientation format" }).click()
  const dialog = page.getByRole("dialog", { name: "Orientation format" })
  await dialog.getByRole("combobox", { name: "Format" }).click()
  await page.getByRole("option", { name: "Quaternion" }).click()
  await expect(
    dialog.getByRole("combobox", { name: "Angle unit" }),
  ).toHaveCount(0)
  await page.keyboard.press("Escape")
  await expect(values).toContainText(/Qx.*Qy.*Qz.*Qw/)
  await expect(values).not.toContainText("rad")
  await screenshot(page, "layouts-current-pose-bar")
})

test("jogs the TCP with RobotControlPanel: up while Z+ is held, and one step of 10 mm down in Increment mode", async ({
  page,
}) => {
  await openPage(page, "layouts")
  const panel = page.getByTestId("robot-control-panel")
  // The gizmo is enabled once the page's 3D view gave it the camera's
  // orientation
  await expect(panel.getByTestId("jogging-gizmo")).toBeVisible()
  await expect(panel.getByRole("button", { name: "Jog Z+" })).toBeEnabled({
    timeout: 30_000,
  })
  await screenshot(page, "layouts-robot-control-panel")

  await panel.getByRole("button", { name: "Button controls" }).click()
  const zPlus = panel.getByRole("button", { name: "Jog Z+" })
  await expect(zPlus).toBeEnabled()
  const before = await tcpZ()
  await jogPress(page, zPlus, async () => (await tcpZ()) > before + 3)
  await expect(zPlus).toHaveAttribute("aria-pressed", "false")
  // The jog has stopped: the TCP stands still
  let last = await tcpZ()
  await expect
    .poll(
      async () => {
        const now = await tcpZ()
        const still = Math.abs(now - last) < 0.01
        last = now
        return still
      },
      { message: "The TCP stands still after the release", timeout: 30_000 },
    )
    .toBe(true)

  await panel.getByRole("button", { name: "Increment" }).click()
  await panel.getByRole("combobox", { name: "Step size" }).click()
  await page.getByRole("option", { name: "10 mm" }).click()
  const top = await tcpZ()
  await panel.getByRole("button", { name: "Jog Z-" }).click()
  await expect
    .poll(tcpZ, {
      message: "The TCP went down by one step of 10 mm",
      timeout: 30_000,
    })
    .toBeCloseTo(top - 10, 0)
  await screenshot(page, "layouts-robot-control-panel-increment")
})

test("jogs a joint with RobotControlPanel's Joint tab, one joint at a time, and stops it on release", async ({
  page,
}) => {
  await openPage(page, "layouts")
  const panel = page.getByTestId("robot-control-panel")
  await panel.getByRole("tab", { name: "Joint" }).click()
  const j2 = panel.getByRole("slider", { name: "J2 Shoulder" })
  const j3 = panel.getByRole("slider", { name: "J3 Elbow" })
  await expect(j2).not.toHaveAttribute("aria-disabled", "true")
  const before = (await jointPositions())[1]

  // A goal 20° above joint 2, along a track from aria-valuemin to
  // aria-valuemax (in degrees) that spans the slider's width
  const min = Number(await j2.getAttribute("aria-valuemin"))
  const max = Number(await j2.getAttribute("aria-valuemax"))
  await j2.scrollIntoViewIfNeeded()
  const box = await j2.boundingBox()
  if (!box) throw new Error("No slider J2")
  const goal = (before * 180) / Math.PI + 20
  await page.mouse.move(
    box.x + (box.width * (goal - min)) / (max - min),
    box.y + box.height / 2,
  )
  await page.mouse.down()
  try {
    await expect
      .poll(async () => (await jointPositions())[1], {
        message: "Joint 2 turns toward the goal while its track is pressed",
        // On a CI runner, the jogging connection can need more than 10 s
        timeout: 30_000,
      })
      .toBeGreaterThan(before + 0.01)
    // The other joints wait
    await expect(j3).toHaveAttribute("aria-disabled", "true")
  } finally {
    await page.mouse.up()
  }

  // Released: joint 2 stands still, two readings in a row the same
  let last = Number.NaN
  await expect
    .poll(
      async () => {
        const now = (await jointPositions())[1]
        const still = Math.abs(now - last) < 1e-5
        last = now
        return still
      },
      { message: "Joint 2 stops on release", timeout: 30_000 },
    )
    .toBe(true)
  await expect(j3).not.toHaveAttribute("aria-disabled", "true")
  await screenshot(page, "layouts-robot-control-panel-joint")
})

test("moves the TCP to a typed pose with RobotControlPanel's Move to tab as RobotPad: Moving… while held, paused on release, back to the live pose and Move to off at the target", async ({
  page,
}) => {
  await openPage(page, "layouts")
  const panel = page.getByTestId("robot-control-panel")
  await panel.getByRole("tab", { name: "Move to" }).click()

  // Edit the current pose: 60 mm higher, saved with Enter. Far enough that
  // the hold of at least 1 s ends on the way at 25 mm/s, the store's default
  const coordinates = panel.getByRole("textbox", {
    name: "Coordinates XYZ (mm) · Rotation vector (rad)",
  })
  await expect(coordinates).toHaveValue(/^\(.+\)$/)
  await panel.getByRole("button", { name: "Edit pose" }).click()
  const values = (await coordinates.inputValue())
    .slice(1, -1)
    .split(",")
    .map(Number)
  const start = await tcpZ()
  const target = Math.round((start + 60) * 10) / 10
  values[2] = target
  await coordinates.fill(`(${values.join(", ")})`)
  await coordinates.press("Enter")

  // Planned and loaded: the button can be held
  const move = panel.getByRole("button", {
    name: /^(Move to|Moving…|Stopping…)$/,
  })
  await expect(move).toHaveText("Move to")
  await expect(move).toBeEnabled({ timeout: 30_000 })
  await jogPress(
    page,
    move,
    async () =>
      (await move.textContent()) === "Moving…" && (await tcpZ()) > start + 3,
  )

  // Let go on the way: the TCP stands still short of the target, which
  // stays, to go on
  let last = await tcpZ()
  await expect
    .poll(
      async () => {
        const now = await tcpZ()
        const still = Math.abs(now - last) < 0.01
        last = now
        return still
      },
      { message: "The TCP stands still after the release", timeout: 30_000 },
    )
    .toBe(true)
  expect(last).toBeLessThan(target - 0.5)
  await expect(move).toHaveText("Move to", { timeout: 10_000 })
  await expect(move).toBeEnabled()

  // Held again to the target: the field shows the current pose again
  await jogPress(
    page,
    move,
    async () => Math.abs((await tcpZ()) - target) < 0.5,
  )
  await expect(move).toHaveText("Move to", { timeout: 10_000 })
  await expect(move).toBeDisabled()
  await expect(
    panel.getByRole("button", { name: "Reset pose to previous one" }),
  ).toHaveCount(0)
  await expect
    .poll(
      async () =>
        Math.abs(
          Number((await coordinates.inputValue()).slice(1, -1).split(",")[2]) -
            target,
        ),
      { message: "The field shows the current pose, at the target" },
    )
    .toBeLessThan(0.5)
  await screenshot(page, "layouts-robot-control-panel-move-to")
})
