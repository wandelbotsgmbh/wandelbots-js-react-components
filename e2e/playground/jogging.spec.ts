import { expect, test } from "@playwright/test"
import {
  expectModelDrawn,
  jogPress,
  jointPositions,
  millimeters,
  openPage,
  raiseVelocity,
  screenshot,
  screenshotOnFailure,
  sliderValue,
} from "./helpers"

// The page Jogging: MotionGroupVisualizer, TrajectoryRenderer and
// JoggingPanel; and AppHeader of the top bar

test.afterEach(screenshotOnFailure("jogging"))

/** The N of "TCP path (TrajectoryRenderer): N of at most 1000 points" */
function pointCount(text: string) {
  return Number(/(\d+) of at most/.exec(text)?.[1])
}

test("draws the robot and jogs joint 1 with the JoggingPanel", async ({
  page,
}) => {
  await openPage(page, "jogging")
  await expectModelDrawn(page)

  await page.getByTestId("jogging-tab-joint").click()
  await raiseVelocity(
    page.getByTestId("jogging-joint-tab").getByTestId("velocity-slider"),
  )
  const joint1 = page.getByTestId("jogging-joint-value-control-0")
  const shown = joint1.getByRole("slider", { name: "Joint position" })
  const shownBefore = await sliderValue(shown)
  const before = await jointPositions()

  // The buttons: "-", then "+". The panel shows degrees.
  await jogPress(
    page,
    joint1.getByRole("button").last(),
    async () => (await sliderValue(shown)) > shownBefore + 2,
  )

  // The NOVA API gives radians
  await expect
    .poll(async () => (await jointPositions())[0])
    .toBeGreaterThan(before[0] + 0.03)
  await screenshot(page, "jogging-joint-1")
})

test("jogs the TCP along X and records its path", async ({ page }) => {
  await openPage(page, "jogging")
  await expectModelDrawn(page)

  await raiseVelocity(
    page.getByTestId("jogging-cartesian-tab").getByTestId("velocity-slider"),
  )
  const x = page.getByTestId("jogging-cartesian-axis-control-x")
  const xBefore = millimeters(await x.innerText())
  const tcpPath = page.getByText(
    /^TCP path \(TrajectoryRenderer\): \d+ of at most 1000 points$/,
  )
  const pointsBefore = pointCount(await tcpPath.innerText())

  await jogPress(
    page,
    x.getByRole("button").last(),
    async () => millimeters(await x.innerText()) > xBefore + 3,
  )

  // More points than before the jog (so more than 0)
  await expect
    .poll(async () => pointCount(await tcpPath.innerText()))
    .toBeGreaterThan(pointsBefore)
  await screenshot(page, "jogging-tcp-x")
})

test("switches the pages with the app menu of AppHeader", async ({ page }) => {
  // 6 page loads: on a CI runner about 1.6 min
  test.setTimeout(240_000)
  await openPage(page, "jogging")
  await expect(page).toHaveTitle("Jogging · Playground")

  // A part of each page that shows without a NOVA connection. The parts
  // with a connection (such as the JoggingPanel) have their own tests, and
  // on a CI runner each of them needs about 20 s to load.
  const pages = [
    {
      id: "joint-limits",
      name: "Joint limits",
      content: page.getByTestId("viewport"),
    },
    {
      id: "safety",
      name: "Safety and collisions",
      content: page.getByRole("heading", { name: "Safety zones" }),
    },
    {
      id: "models",
      name: "Robot models",
      content: page.getByRole("textbox", { name: "Filter" }),
    },
    {
      id: "building-blocks",
      name: "Building blocks",
      content: page.getByRole("heading", {
        name: "JoggingCartesianAxisControl",
      }),
    },
    {
      id: "jogging",
      name: "Jogging",
      content: page.getByText(
        "Exact (MotionGroupVisualizerExact, no smoothing)",
      ),
    },
  ]
  for (const { id, name, content } of pages) {
    await page.getByRole("button", { name: "switch app" }).click()
    await page.getByRole("menuitem", { name, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`[?&]page=${id}(&|$)`))
    await expect(page).toHaveTitle(`${name} · Playground`)
    await expect(content).toBeVisible()
  }

  // The open menu for the screenshot
  await page.getByRole("button", { name: "switch app" }).click()
  await expect(page.getByRole("menuitem")).toHaveCount(pages.length)
  await screenshot(page, "jogging-app-menu")
})
