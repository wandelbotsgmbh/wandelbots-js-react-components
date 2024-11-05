// sharedStoryConfig.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, waitFor } from "@storybook/test"
import type { DHParameter } from "@wandelbots/wandelbots-js"
import { Vector3 } from "three"
import { defaultGetModel, SupportedRobot } from "../../src"
import { Setup } from "../../src/Setup"
import { SupportedRobotScene } from "./SupportedRobotScene"

type RobotJsonConfig = {
  dhParameters: {
    a: string
    d: string
    alpha: string
    theta: string
    reverseRotationDirection: string
  }[]
}

export async function getDHParams(
  modelFromController: string,
): Promise<DHParameter[]> {
  const [manufacturer, ...rest] = modelFromController.split("_")
  const modelWithoutManufacturer = rest.join("_")

  const jsonConfig = (await import(
    `./robotConfig/jsonV2/${manufacturer}/${modelWithoutManufacturer}.json`
  )) as RobotJsonConfig

  return jsonConfig.dhParameters.map((json) => ({
    a: parseFloat(json.a),
    d: parseFloat(json.d),
    alpha: parseFloat(json.alpha),
    theta: parseFloat(json.theta),
    reverseRotationDirection: json.reverseRotationDirection === "1",
  }))
}

export function nextAnimationFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

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

export function robotStory(
  modelFromController: string,
): StoryObj<typeof SupportedRobotScene> {
  return {
    args: {
      modelFromController,
      postModelRender: fn(),
    },
    play: async ({ args }) => {
      await waitFor(
        () =>
          expect(
            args.postModelRender,
            `Failed to load model for ${args.modelFromController}`,
          ).toHaveBeenCalled(),
        {
          timeout: 5000,
        },
      )
    },
    render: (args, { loaded: { dhParameters } }) => (
      <SupportedRobotScene {...args} dhParameters={dhParameters} />
    ),
    name: modelFromController,
    loaders: [
      async () => ({
        dhParameters: await getDHParams(modelFromController),
      }),
    ],
  }
}
