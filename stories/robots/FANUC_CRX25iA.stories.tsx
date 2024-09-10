import type { StoryObj } from "@storybook/react"
import { Euler, Vector3, WebGLRenderer } from "three"
import { SupportedRobot } from "../../src"
import type { MotionGroupStateResponse } from "@wandelbots/wandelbots-js"
import { rapidlyChangingMotionState } from "./motionState"
import { sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  title: "3D View/Robots/FANUC_CRX25iA",
}

function SupportedRobotScene(
  props: React.ComponentProps<typeof SupportedRobot>,
) {
  return (
    <SupportedRobot
      {...props}
      rapidlyChangingMotionState={rapidlyChangingMotionState}
      dhParameters={[
        {
          a: 0,
          d: 89.159000000000006,
          alpha: 1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: -425,
          d: 0,
          alpha: 0,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: -392.25,
          d: 0,
          alpha: 0,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: 109.15000000000001,
          alpha: 1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: 94.650000000000006,
          alpha: -1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: 82.299999999999997,
          alpha: 0,
          theta: 0,
          reverse_rotation_direction: false,
        },
      ]}
    />
  )
}

export const RobotStory: StoryObj<typeof SupportedRobotScene> = {
  args: {
    modelFromController: "FANUC_CRX25iA",
    getModel: (model: string) => `/models/${model}.glb`,
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "Default",
}
