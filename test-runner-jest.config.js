import { getJestConfig } from "@storybook/test-runner"

// The default Jest configuration comes from @storybook/test-runner
const testRunnerConfig = getJestConfig()

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  ...testRunnerConfig,
  reporters: [
    "default",

    // Shows a short list of failed tests at the end, so you don't have
    // to scroll through pages of errors to find the filenames
    "jest-summary-reporter",
  ],

  /** Add your own overrides below, and make sure
   *  to merge testRunnerConfig properties with your own
   * @see https://jestjs.io/docs/configuration
   */
}
