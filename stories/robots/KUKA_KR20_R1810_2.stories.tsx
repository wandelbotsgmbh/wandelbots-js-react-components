import type { StoryObj } from "@storybook/react"
import { SupportedRobot } from "../../src"
import { rapidlyChangingMotionState } from "./motionState"
import { sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!autodocs"],
  title: "3D View/Robot/Supported Models/KUKA_KR20_R1810_2",
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
          a: 160,
          d: 520,
          alpha: -1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 780,
          d: 0,
          alpha: 0,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 150,
          d: 0,
          alpha: 1.5707963267948966,
          theta: -1.5707963267948966,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: -860,
          alpha: -1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: 0,
          alpha: 1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: -153,
          alpha: 3.1415926535897931,
          theta: 3.1415926535897931,
          reverse_rotation_direction: false,
        },
      ]}
    />
  )
}

export const RobotStory: StoryObj<typeof SupportedRobotScene> = {
  args: {
    modelFromController: "KUKA_KR20_R1810_2",
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "KUKA_KR20_R1810_2",
}
