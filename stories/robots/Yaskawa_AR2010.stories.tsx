import type { StoryObj } from "@storybook/react"
import { SupportedRobot } from "../../src"
import { rapidlyChangingMotionState } from "./motionState"
import { sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!autodocs"],
  title: "3D View/Robot/Supported Models/Yaskawa_AR2010",
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
          d: 0,
          alpha: -1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 760,
          d: 0,
          alpha: 3.1415926535897931,
          theta: 1.5707963267948966,
          reverse_rotation_direction: false,
        },
        {
          a: 200,
          d: 0,
          alpha: -1.5707963267948966,
          theta: 3.1415926535897931,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: -1082,
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
          d: -100,
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
    modelFromController: "Yaskawa_AR2010",
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "Yaskawa_AR2010",
}
