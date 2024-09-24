import type { StoryObj } from "@storybook/react"
import { SupportedRobot } from "../../src"
import { rapidlyChangingMotionState } from "./motionState"
import { sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!autodocs"],
  title: "3D View/Robot/Supported Models/KUKA_KR6_R700_2",
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
          a: 25,
          d: 400,
          alpha: -1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: true,
        },
        {
          a: 335,
          d: 0,
          alpha: 0,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 25,
          d: 0,
          alpha: 1.5707963267948966,
          theta: -1.5707963267948966,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: -365,
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
          d: -90,
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
    modelFromController: "KUKA_KR6_R700_2",
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "KUKA_KR6_R700_2",
}
