import type { StoryObj } from "@storybook/react"
import { SupportedRobot } from "../../src"
import { rapidlyChangingMotionState } from "./motionState"
import jsonConfig from "./robotConfig/jsonV2/ABB/1200_07_7.json"
import { getDHParams, sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!autodocs"],
  title: "3D View/Robot/Supported Models/ABB_1200_07_7",
}

function SupportedRobotScene(
  props: React.ComponentProps<typeof SupportedRobot>,
) {
  return (
    <SupportedRobot
      {...props}
      rapidlyChangingMotionState={rapidlyChangingMotionState}
      dhParameters={getDHParams(jsonConfig)}
    />
  )
}

export const RobotStory: StoryObj<typeof SupportedRobotScene> = {
  args: {
    modelFromController: "ABB_1200_07_7",
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "ABB_1200_07_7",
}
