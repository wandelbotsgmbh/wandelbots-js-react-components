import type { StoryObj } from "@storybook/react"
import { SupportedRobot } from "../../src"
import { rapidlyChangingMotionState } from "./motionState"
import { sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!autodocs"],
  title: "3D View/Robot/Supported Models/Yaskawa_GP7",
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
    modelFromController: "Yaskawa_AR900",
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "Yaskawa_GP7",
}