import { join } from "node:path"
import { setTimeout as sleep } from "node:timers/promises"
import { fileURLToPath } from "node:url"
import {
  expect,
  type Locator,
  type Page,
  type TestInfo,
} from "@playwright/test"
import type { Nova, RobotControllerState } from "@wandelbots/nova-js/v2"
import type { PageId } from "../../playground/src/pages"
import { CELL, createNova, httpStatus, testData } from "./testData"

/** The screenshots of the tests, part of the artifact e2e-results */
export const SCREENSHOT_DIR = fileURLToPath(
  new URL("../../e2e-results/screenshots", import.meta.url),
)

/** With software WebGL (no GPU), a robot model needs 6 to 8 s */
const MODEL_TIMEOUT = 60_000

/** Opens a page of the playground with the motion group of the test robot */
export async function openPage(page: Page, pageId: PageId) {
  // A jogging session of the test before can still be ending: when nothing
  // controls the robot, it is in MODE_MONITOR
  await expect
    .poll(async () => (await controllerState()).mode, {
      message: "The robot is in MODE_MONITOR before the page opens",
      timeout: 30_000,
    })
    .toBe("MODE_MONITOR")
  await moveToStartPose()
  await page.goto(`/?page=${pageId}&motionGroup=${testData().motionGroup}`)
}

/**
 * Moves the test robot back to its pose after the global setup, so that
 * each test starts in the same way: the tests before it have jogged the
 * robot. NOVA allows this only in MODE_MONITOR.
 */
async function moveToStartPose() {
  const joints: number[] = JSON.parse(process.env.E2E_START_JOINTS ?? "[]")
  if (joints.length === 0) return
  const { controller, motionGroup } = testData()
  await nova().api.virtualController.setMotionGroupState(
    CELL,
    controller,
    motionGroup,
    { positions: joints },
  )
  await expect
    .poll(
      async () => {
        const current = await jointPositions()
        return Math.max(
          ...joints.map((joint, i) => Math.abs(joint - current[i])),
        )
      },
      { message: "The robot is in its start pose", timeout: 15_000 },
    )
    .toBeLessThan(0.001)
}

/**
 * Waits until the 3D view has drawn the robot model: the marker
 * data-model-drawn of Viewport (playground/src/scene.tsx)
 */
export async function expectModelDrawn(page: Page) {
  await expect(page.getByTestId("viewport")).toHaveAttribute(
    "data-model-drawn",
    "true",
    { timeout: MODEL_TIMEOUT },
  )
}

/**
 * Saves a screenshot as e2e-results/screenshots/<name>.png. Everybody can
 * download the artifact of the workflow e2e, and `report` of
 * scripts/nova-instance.ts cannot check a picture for the access token. So
 * this first checks the text of the page: when it shows the token, the test
 * fails, and there is no screenshot.
 */
export async function screenshot(page: Page, name: string) {
  const token = process.env.NOVA_ACCESS_TOKEN
  if (token) {
    const text = await page.evaluate(() => document.body.innerText)
    if (text.includes(token)) {
      throw new Error(
        `The page shows the access token, so there is no screenshot ${name}.png`,
      )
    }
  }
  // A menu or a popover that opens or closes: its end state
  await page.screenshot({
    path: join(SCREENSHOT_DIR, `${name}.png`),
    animations: "disabled",
  })
}

/**
 * For test.afterEach: a screenshot when the test failed, named
 * <page id>-<test title>-failure-try<n>.png (CI tries a test 2 times)
 */
export function screenshotOnFailure(pageId: PageId) {
  return async ({ page }: { page: Page }, testInfo: TestInfo) => {
    if (testInfo.status === testInfo.expectedStatus) return
    const title = testInfo.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
    await screenshot(
      page,
      `${pageId}-${title}-failure-try${testInfo.retry + 1}`,
    )
  }
}

/**
 * Presses a jog button with the mouse (the jog buttons react to pointer
 * events): at least 1 s, and until `moved` returns true. The robot moves
 * only after NOVA has confirmed the jogging websocket, and a press that
 * ends before moves nothing. With software WebGL, this takes about 0.4 s on
 * a laptop, and more on a busy machine.
 */
export async function jogPress(
  page: Page,
  button: Locator,
  moved: () => Promise<boolean>,
) {
  await button.hover()
  await page.mouse.down()
  try {
    await page.waitForTimeout(1000)
    await expect
      .poll(moved, {
        message: "The robot moves while the button is pressed",
        // On a CI runner (software WebGL), the jogging connection can need
        // more than 10 s to start
        timeout: 30_000,
      })
      .toBe(true)
  } finally {
    await page.mouse.up()
  }
}

/**
 * Raises the velocity of a VelocitySlider by 10 with the key Page Up, so
 * that a jog press moves the robot clearly (the JoggingStore starts with
 * 1 °/s and 10 mm/s). Returns the new velocity.
 */
export async function raiseVelocity(velocitySlider: Locator) {
  const slider = velocitySlider.getByRole("slider")
  const before = await sliderValue(slider)
  await slider.press("PageUp")
  await expect.poll(() => sliderValue(slider)).toBeGreaterThan(before)
  return sliderValue(slider)
}

/** The value of a slider, for example a joint position in degrees */
export async function sliderValue(slider: Locator) {
  return Number(await slider.getAttribute("aria-valuenow"))
}

/** The value of a text with a length, for example "X 491.9 mm" */
export function millimeters(text: string) {
  const match = /(-?\d+(?:\.\d+)?) mm/.exec(text)
  if (!match) throw new Error(`No value in mm in "${text}"`)
  return Number(match[1])
}

/**
 * Waits until an indicator of the SafetyBar in the top bar shows a text.
 * The compact SafetyBar shows only icons. The text of an icon shows in a
 * popover while the mouse is over the icon; it stays open for a screenshot
 * until the mouse moves.
 */
export async function expectSafetyBar(
  page: Page,
  indicator: "Safety state" | "Operation mode",
  text: string,
) {
  // The icons of the SafetyBar in their order: safety state, operation
  // mode, controller type (the only div elements with this attribute)
  const icon = page
    .locator('div[aria-haspopup="true"]')
    .nth(indicator === "Safety state" ? 0 : 1)
  // The title and the text in the popover, for example "Safety state: Safe"
  const popover = page.getByText(`${indicator}:`).locator("..")
  await expect(async () => {
    // Away from the icon and back: the popover opens, also when a change of
    // the library draws a new icon for a new state
    await page.mouse.move(0, 0)
    await icon.hover()
    await expect(popover).toHaveText(`${indicator}: ${text}`, {
      timeout: 1000,
    })
  }).toPass({ timeout: 30_000 })
}

let client: Nova | undefined

/** The NOVA client of the tests */
export function nova(): Nova {
  client ??= createNova()
  return client
}

/**
 * The state of the controller of the test robot, from the NOVA API. While
 * the controller changes its mode (at the start and at the end of a jog),
 * NOVA answers 503 "did not resolve to a valid mode within timeout" for a
 * moment: then this asks again.
 */
export async function controllerState(): Promise<RobotControllerState> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await nova().api.controller.getCurrentRobotControllerState(
        CELL,
        testData().controller,
      )
    } catch (error) {
      if (httpStatus(error) !== 503 || attempt === 10) throw error
    }
    await sleep(500)
  }
}

/** The joint positions of the test robot from the NOVA API, in radians */
export async function jointPositions(): Promise<number[]> {
  const { motionGroup } = testData()
  const state = await controllerState()
  const group = state.motion_groups.find(
    (group) => group.motion_group === motionGroup,
  )
  if (!group) {
    throw new Error(`The controller state has no motion group ${motionGroup}`)
  }
  return group.joint_position
}
