// This file has been automatically generated using 'npm run build:models'
// DO NOT MODIFY

import type { StoryObj } from "@storybook/react"
import { sharedStoryConfig } from "../components/robotStoryConfig"
import SupportedRobotScene from "../components/SupportedRobotScene"

export default {
  ...sharedStoryConfig,
  tags: ["!autodocs"],
  title: "3D View/Robot/Supported Models/UniversalRobots_UR5CB",
}

export const RobotStory: StoryObj<typeof SupportedRobotScene> = {
  args: {
    modelFromController: "UniversalRobots_UR5CB",
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "UniversalRobots_UR5CB",
}
