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
    },
    extends: "./vitest.config.ts",
  },
])
