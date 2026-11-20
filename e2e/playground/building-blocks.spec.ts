import { expect, type Locator, type Page, test } from "@playwright/test"
import {
  controllerState,
  expectModelDrawn,
  jogPress,
  jointPositions,
  millimeters,
  openPage,
  screenshot,
  screenshotOnFailure,
} from "./helpers"
import { testData } from "./testData"

// The page Building blocks: the small parts alone

test.afterEach(screenshotOnFailure("building-blocks"))

/** A section of the page, by its heading */
function section(page: Page, title: string) {
  return page
    .locator("section")
    .filter({ has: page.getByRole("heading", { name: title, exact: true }) })
}

/** The height of the test robot's TCP, in mm, from the NOVA API */
async function tcpZ(): Promise<number> {
  const { motionGroup } = testData()
  const group = (await controllerState()).motion_groups.find(
    (group) => group.motion_group === motionGroup,
  )
  const z = group?.tcp_pose?.position?.[2]
  if (z === undefined) throw new Error("The controller state has no TCP pose")
  return z
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
    "RobotControlPanel",
    "JoggingCartesianAxisControl",
    "JoggingJointValueControl",
    "VelocitySlider and VelocitySliderLabel",
    "JoggingGizmo and JoggingGizmoOrientation",
    "JoggingButtons",
    "JoggingJointSlider",
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
  // The gizmo section's 3D view: the RobotControlPanel section has one too
  await expectModelDrawn(
    section(page, "JoggingGizmo and JoggingGizmoOrientation"),
  )
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

test("jogs a joint toward the pressed point with JoggingJointSlider, turns it around when the goal passes it, and stops it on release", async ({
  page,
}) => {
  await openPage(page, "building-blocks")
  const j1 = section(page, "JoggingJointSlider").getByRole("slider", {
    name: "J1 Base",
  })
  await expect(j1).not.toHaveAttribute("aria-disabled", "true")
  const before = (await jointPositions())[0]

  // A goal 20° above the joint, along a track from aria-valuemin to
  // aria-valuemax (in degrees) that spans the slider's width
  const min = Number(await j1.getAttribute("aria-valuemin"))
  const max = Number(await j1.getAttribute("aria-valuemax"))
  const beforeDegrees = (before * 180) / Math.PI
  // The mouse goes by the viewport: the slider must be in it
  await j1.scrollIntoViewIfNeeded()
  const box = await j1.boundingBox()
  if (!box) throw new Error("No slider J1")
  const pointAt = (degrees: number) =>
    page.mouse.move(
      box.x + (box.width * (degrees - min)) / (max - min),
      box.y + box.height / 2,
    )
  await pointAt(beforeDegrees + 20)
  await page.mouse.down()
  try {
    await expect
      .poll(async () => (await jointPositions())[0], {
        message: "Joint 1 turns toward the goal while the track is pressed",
        // On a CI runner, the jogging connection can need more than 10 s
        timeout: 30_000,
      })
      .toBeGreaterThan(before + 0.01)

    // Still pressed, the goal moves below the joint: it turns around, with
    // the stop and the start of the other way in one event
    const turnedAt = (await jointPositions())[0]
    await pointAt(beforeDegrees - 20)
    await expect
      .poll(async () => (await jointPositions())[0], {
        message: "Joint 1 turns around when the goal passes it",
        timeout: 30_000,
      })
      .toBeLessThan(turnedAt - 0.01)
  } finally {
    await page.mouse.up()
  }

  // Released: joint 1 stands still, two readings in a row the same
  let last = Number.NaN
  await expect
    .poll(
      async () => {
        const now = (await jointPositions())[0]
        const still = Math.abs(now - last) < 1e-5
        last = now
        return still
      },
      {
        message: "Joint 1 stops on release",
        intervals: [500],
        timeout: 15_000,
      },
    )
    .toBe(true)
  await screenshot(page, "building-blocks-joint-sliders")
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

test("jogs the TCP with RobotControlPanel: up while Z+ is held, and one step of 10 mm down in Increment mode", async ({
  page,
}) => {
  await openPage(page, "building-blocks")
  const panel = section(page, "RobotControlPanel")
  // The gizmo is enabled once the 3D view next to it gave it the camera's
  // orientation
  await expect(panel.getByTestId("jogging-gizmo")).toBeVisible()
  await expect(panel.getByRole("button", { name: "Jog Z+" })).toBeEnabled({
    timeout: 30_000,
  })
  await screenshot(page, "building-blocks-robot-control-panel")

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
  await screenshot(page, "building-blocks-robot-control-panel-increment")
})

test("jogs a joint with RobotControlPanel's Joint tab, one joint at a time, and stops it on release", async ({
  page,
}) => {
  await openPage(page, "building-blocks")
  const panel = section(page, "RobotControlPanel")
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
  await screenshot(page, "building-blocks-robot-control-panel-joint")
})

test("moves the TCP to a typed pose with RobotControlPanel's Move to tab as RobotPad: Moving… while held, paused on release, back to the live pose and Move to off at the target", async ({
  page,
}) => {
  await openPage(page, "building-blocks")
  const panel = section(page, "RobotControlPanel")
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
  await screenshot(page, "building-blocks-robot-control-panel-move-to")
})

/** The numbers of a text, e.g. of the TCP orientation in degrees */
function numbersOf(text: string) {
  return (text.match(/-?\d+(\.\d+)?/g) ?? []).map(Number)
}

test("turns the TCP about Z with JoggingGizmo in rotate mode", async ({
  page,
}) => {
  await openPage(page, "building-blocks")
  // The gizmo section's 3D view: the RobotControlPanel section has one too
  await expectModelDrawn(
    section(page, "JoggingGizmo and JoggingGizmoOrientation"),
  )
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
  // The gizmo section's 3D view: the RobotControlPanel section has one too
  await expectModelDrawn(
    section(page, "JoggingGizmo and JoggingGizmoOrientation"),
  )
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
  // The gizmo section's 3D view: the RobotControlPanel section has one too
  await expectModelDrawn(
    section(page, "JoggingGizmo and JoggingGizmoOrientation"),
  )
  const xPlus = section(page, "JoggingGizmo and JoggingGizmoOrientation")
    .getByRole("button", { name: "Jog X+" })
    .first()
  const viewport = section(
    page,
    "JoggingGizmo and JoggingGizmoOrientation",
  ).getByTestId("viewport")
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
