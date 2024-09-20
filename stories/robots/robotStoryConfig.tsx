// sharedStoryConfig.tsx
import type { Meta } from "@storybook/react"
import { Vector3 } from "three"
import { defaultGetModel, SupportedRobot } from "../../src"
import { Setup } from "../../src/Setup"

export const sharedStoryConfig = {
  tags: ["!dev"],
  component: SupportedRobot,
  args: {
    getModel: (modelFromController: string) => {
      // Fetch from local models in development storybook rather than CDN
      if (process.env.NODE_ENV === "development") {
        return `/models/${modelFromController}.glb`
      } else {
        return defaultGetModel(modelFromController)
      }
    },
  },
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
