import { expect, type Page, test } from "@playwright/test"
import { expectModelDrawn, openPage, screenshotOnFailure } from "./helpers"

// Each page switch unmounts the 3D views of a page. A renderer that stays
// in memory keeps its canvas, and with it the whole page it was on: each
// switch would add hundreds of DOM nodes that never go (2026-11-23: a
// texture of three.js and the cached robot models held every renderer).

test.afterEach(screenshotOnFailure("layouts"))

/** The DOM nodes in memory after a garbage collection, also detached ones */
async function domNodes(page: Page) {
  const cdp = await page.context().newCDPSession(page)
  await cdp.send("HeapProfiler.collectGarbage")
  await cdp.send("Performance.enable")
  const { metrics } = await cdp.send("Performance.getMetrics")
  await cdp.detach()
  return metrics.find((metric) => metric.name === "Nodes")?.value ?? NaN
}

/** Layouts → Building blocks → Layouts, with the app menus */
async function roundTrip(page: Page) {
  await page.getByRole("button", { name: "Apps" }).click()
  await page.getByRole("menuitem", { name: "Building blocks" }).click()
  await expect(
    page.getByRole("heading", { name: "JoggingCartesianAxisControl" }),
  ).toBeVisible()
  await page.getByRole("button", { name: "switch app" }).click()
  await page.getByRole("menuitem", { name: "Layouts", exact: true }).click()
  await expectModelDrawn(page)
}

test("keeps no 3D view of a page it left: the DOM nodes stay as many after page switches", async ({
  page,
}) => {
  // 7 page loads with a robot model: on a CI runner about 20 s each
  test.setTimeout(300_000)
  await openPage(page, "layouts")
  await expectModelDrawn(page)
  // The first switch fills the caches (models, fonts, styles)
  await roundTrip(page)
  const before = await domNodes(page)

  await roundTrip(page)
  await roundTrip(page)

  // A kept page was about 770 nodes per round trip
  await expect
    .poll(async () => (await domNodes(page)) - before, {
      message: "The DOM nodes of the pages left are freed",
      timeout: 15_000,
    })
    .toBeLessThan(300)
})
