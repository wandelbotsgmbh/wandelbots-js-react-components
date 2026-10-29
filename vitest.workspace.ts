/// <reference types="vitest" />
import { defineWorkspace } from "vitest/config"

export default defineWorkspace([
  {
    test: {
      name: "unit",
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
      globals: true,
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
      exclude: ["src/test/consumer.test.ts"],
    },
    extends: "./vitest.config.ts",
  },
  {
    // Consumer tests exercise the built dist/ output through the package's
    // `exports` map. They must run in a plain Node environment (no jsdom,
    // no setup files, no Vite-driven source resolution) so that imports of
    // the package name resolve via Node the same way a downstream consumer
    // would.
    test: {
      name: "consumer",
      environment: "node",
      globals: true,
      include: ["src/test/consumer.test.ts"],
    },
  },
  {
    // e2e tests run against a real NOVA instance and fail without one
    // (see e2e/globalSetup.ts). They use the WebSocket of Node.
    test: {
      name: "e2e",
      environment: "node",
      include: ["e2e/**/*.test.ts"],
      globalSetup: ["e2e/globalSetup.ts"],
      testTimeout: 60_000,
      hookTimeout: 180_000,
    },
  },
])
