// sharedStoryConfig.tsx
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, waitFor } from "storybook/test"
import type { DHParameter } from "@wandelbots/nova-js/v1"
import { SupportedRobot } from "../../src"
import { SupportedRobotScene } from "./SupportedRobotScene"

type RobotJsonConfig = {
  dhParameters?: {
    a: string
    d: string
    alpha: string
    theta: string
    reverseRotationDirection: string
  }[]
  dh_parameters?: {
    a: number | string
    d: number | string
    alpha: number | string
    theta: number | string
    reverse_rotation_direction: boolean | string
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

  // Support both old format (dhParameters with strings) and new format (dh_parameters with numbers/booleans)
  const dhParams = jsonConfig.dhParameters || jsonConfig.dh_parameters

  if (!dhParams) {
    throw new Error(`No DH parameters found in ${modelFromController}.json`)
  }

  return dhParams.map((json) => {
    // Handle both string and number formats
    const a = typeof json.a === "string" ? parseFloat(json.a) : json.a
    const d = typeof json.d === "string" ? parseFloat(json.d) : json.d
    const alpha = typeof json.alpha === "string" ? parseFloat(json.alpha) : json.alpha
    const theta = typeof json.theta === "string" ? parseFloat(json.theta) : json.theta
    
    // Handle both old string format ("0"/"1") and new boolean format
    let reverse_rotation_direction: boolean
    if ("reverseRotationDirection" in json) {
      reverse_rotation_direction = (json as any).reverseRotationDirection === "1"
    } else {
      const value = (json as any).reverse_rotation_direction
      reverse_rotation_direction = typeof value === "boolean" ? value : value === "1"
    }

    return {
      a,
      d,
      alpha,
      theta,
      reverse_rotation_direction,
    }
  })
}

export function nextAnimationFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

export const sharedStoryConfig = {
  tags: ["!dev"],
  component: SupportedRobot,
  args: {
    getModel: (modelFromController: string) => {
      // Fetch from storybook rather than CDN to ensure version alignment
      // FIXME - storybook should know what version of the package it is
      // so it can test the CDN as well
      return `./models/${modelFromController}.glb`
    },
  },
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
