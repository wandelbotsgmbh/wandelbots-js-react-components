import { getJestConfig } from "@storybook/test-runner"

// The default Jest configuration comes from @storybook/test-runner
const testRunnerConfig = getJestConfig()

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  ...testRunnerConfig,
  reporters: ["default", "jest-summary-reporter"],

  /** Add your own overrides below, and make sure
   *  to merge testRunnerConfig properties with your own
   * @see https://jestjs.io/docs/configuration
   */
}