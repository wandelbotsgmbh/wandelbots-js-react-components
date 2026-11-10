import { defineConfig, devices } from "@playwright/test"

/**
 * The Playwright tests of the playground (e2e/playground/*.spec.ts). A
 * headless Chromium opens the built playground, which connects to a real
 * NOVA instance: the same instance values as for the vitest e2e tests (see
 * e2e/novaInstance.ts).
 *
 *   pnpm run test:playground   builds the playground, then runs the tests
 *
 * The build contains the URL and the access token of the instance
 * (playground/vite.config.ts), so build again for another instance. The
 * global setup adds a virtual robot with 2 safety zones and a stored
 * collision setup for the tests (e2e/playground/testData.ts).
 *
 * The results go into e2e-results/, which the workflow e2e uploads as an
 * artifact that everybody can download. So there are no traces and no
 * videos (they record the network requests with the access token), and no
 * HTML report (it packs its data, so `report` of scripts/nova-instance.ts
 * cannot check it for the token). The tests take their own screenshots
 * (e2e/playground/helpers.ts).
 */
export default defineConfig({
  testDir: "e2e/playground",
  globalSetup: "./e2e/playground/globalSetup.ts",
  globalTeardown: "./e2e/playground/globalTeardown.ts",
  // All tests use the same virtual robot: one test at a time
  workers: 1,
  fullyParallel: false,
  // In CI, a failed test runs once more: one slow moment of the runner
  // (software WebGL, a cloud instance) does not fail the job. Playwright
  // reports such a test as flaky, and the job summary shows it.
  retries: process.env.CI ? 1 : 0,
  forbidOnly: !!process.env.CI,
  timeout: 120_000,
  // A load from the instance can need more than 15 s on a CI runner (software
  // WebGL, a cloud instance)
  expect: { timeout: process.env.CI ? 30_000 : 15_000 },
  outputDir: "e2e-results/playwright",
  reporter: [
    ["list"],
    ["junit", { outputFile: "e2e-results/playwright-junit.xml" }],
    ["json", { outputFile: "e2e-results/playwright-results.json" }],
  ],
  use: {
    baseURL: "http://localhost:4180",
    // The texts of the library in English
    locale: "en-US",
    trace: "off",
    video: "off",
    screenshot: "off",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1600, height: 900 },
        launchOptions: {
          // Software WebGL (SwiftShader): the GitHub runner has no GPU
          args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
        },
      },
    },
  ],
  webServer: {
    // Serves playground/dist: `pnpm run test:playground` builds it first
    command: "pnpm run playground:preview",
    url: "http://localhost:4180",
    reuseExistingServer: !process.env.CI,
  },
})
