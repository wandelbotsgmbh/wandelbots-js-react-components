import type { StoryObj } from "@storybook/react"
import { SupportedRobot } from "../../src"
import { rapidlyChangingMotionState } from "./motionState"
import { sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!autodocs"],
  title: "3D View/Robot/Supported Models/ABB_1300_115_10",
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
          a: 150,
          d: 544,
          alpha: -1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 575,
          d: 0,
          alpha: 0,
          theta: -1.5707963267948966,
          reverse_rotation_direction: false,
        },
        {
          a: 40,
          d: 0,
          alpha: -1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: 425,
          alpha: 1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: 0,
          alpha: -1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: 92,
          alpha: 0,
          theta: -3.1415926535897931,
          reverse_rotation_direction: false,
        },
      ]}
    />
  )
}

export const RobotStory: StoryObj<typeof SupportedRobotScene> = {
  args: {
    modelFromController: "ABB_1300_115_10",
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "ABB_1300_115_10",
}
