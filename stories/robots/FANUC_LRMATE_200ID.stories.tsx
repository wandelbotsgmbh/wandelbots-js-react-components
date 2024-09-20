import type { StoryObj } from "@storybook/react"
import { SupportedRobot } from "../../src"
import { rapidlyChangingMotionState } from "./motionState"
import { sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!autodocs"],
  title: "3D View/Robot/Supported Models/FANUC_LRMATE_200ID",
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
          a: 50,
          d: 0,
          alpha: 1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 330,
          d: 0,
          alpha: 0,
          theta: 1.5707963267948966,
          reverse_rotation_direction: false,
        },
        {
          a: 35,
          d: 0,
          alpha: -1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: -335,
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
          d: -80,
          alpha: 3.1415926535897931,
          theta: 0,
          reverse_rotation_direction: false,
        },
      ]}
    />
  )
}

export const RobotStory: StoryObj<typeof SupportedRobotScene> = {
  args: {
    modelFromController: "FANUC_LRMATE_200ID",
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "FANUC_LRMATE_200ID",
}
