// sharedStoryConfig.tsx
import React from "react"
import type { Meta } from "@storybook/react"
import { Setup } from "../../src/Setup"
import { SupportedRobot } from "../../src"
import { Vector3 } from "three"

export const sharedStoryConfig = {
  tags: ["!dev"],
  component: SupportedRobot,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "100vh",
          minHeight: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Setup cameraPosition={new Vector3(0, 0, 3)}>
          <group position={[0, -0.25, 0]}>
            <Story />
          </group>
        </Setup>
      </div>
    ),
  ],
} satisfies Meta<typeof SupportedRobot>
