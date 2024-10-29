// This file has been automatically generated using 'npm run build:models'
// DO NOT MODIFY

import { expect, test } from "@playwright/test"

test.describe("SupportedRobot", () => {
  test.describe.configure({ mode: "serial" })

  test("KUKA_KR270_R2700_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-kuka-kr270-r2700--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("KUKA_KR210_R2700_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-kuka-kr210-r2700--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("KUKA_KR20_R1810_2_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-kuka-kr20-r1810-2--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("KUKA_KR6_R700_2_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-kuka-kr6-r700-2--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("KUKA_KR16_R2010_2_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-kuka-kr16-r2010-2--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("UniversalRobots_UR10e_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-universalrobots-ur10e--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("UniversalRobots_UR16e_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-universalrobots-ur16e--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("UniversalRobots_UR3CB_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-universalrobots-ur3cb--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("UniversalRobots_UR3e_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-universalrobots-ur3e--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("UniversalRobots_UR5e_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-universalrobots-ur5e--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("UniversalRobots_UR10CB_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-universalrobots-ur10cb--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("UniversalRobots_UR5CB_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-universalrobots-ur5cb--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("ABB_1200_07_7_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-abb-1200-07-7--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("ABB_1300_115_10_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-abb-1300-115-10--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("FANUC_CRX25iAL_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-fanuc-crx25ial--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("FANUC_ARC_Mate_100iD_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-fanuc-arc-mate-100id--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("FANUC_CRX10iA_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-fanuc-crx10ia--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("FANUC_ARC_Mate_120iD_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-fanuc-arc-mate-120id--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("FANUC_LR_Mate_200iD7L_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-fanuc-lr-mate-200id7l--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("FANUC_CRX20iAL_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-fanuc-crx20ial--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("FANUC_CRX10iAL_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-fanuc-crx10ial--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("FANUC_LR_Mate_200iD4S_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-fanuc-lr-mate-200id4s--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("FANUC_LR_Mate_200iD_LoadModel_ModelLoadsSuccessfully", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-fanuc-lr-mate-200id--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("FANUC_CRX25iA_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-fanuc-crx25ia--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("Yaskawa_AR1440_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-yaskawa-ar1440--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("Yaskawa_AR900_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-yaskawa-ar900--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("Yaskawa_AR3120_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-yaskawa-ar3120--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("Yaskawa_AR1730_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-yaskawa-ar1730--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("Yaskawa_GP88_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-yaskawa-gp88--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("Yaskawa_GP50_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-yaskawa-gp50--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })

  test("Yaskawa_AR2010_LoadModel_ModelLoadsSuccessfully", async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=3d-view-robot-supported-models-yaskawa-ar2010--robot-story&viewMode=story",
    )

    await page.waitForLoadState("networkidle")
    await page.waitForSelector("canvas")
    await expect(page).toHaveScreenshot({ timeout: 30 * 1000 })
  })
})
