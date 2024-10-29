// This file has been automatically generated using 'npm run build:models'
// DO NOT MODIFY

import type { StoryObj } from "@storybook/react"
import { sharedStoryConfig } from "../components/robotStoryConfig"
import SupportedRobotScene from "../components/SupportedRobotScene"

export default {
  ...sharedStoryConfig,
  tags: ["!autodocs"],
  title: "3D View/Robot/Supported Models/KUKA_KR6_R700_2",
}

export const RobotStory: StoryObj<typeof SupportedRobotScene> = {
  args: {
    modelFromController: "KUKA_KR6_R700_2",
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "KUKA_KR6_R700_2",
}
