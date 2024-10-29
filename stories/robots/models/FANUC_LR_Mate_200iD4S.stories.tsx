// This file has been automatically generated using 'npm run build:models'
// DO NOT MODIFY

import type { StoryObj } from "@storybook/react"
import { sharedStoryConfig } from "../components/robotStoryConfig"
import SupportedRobotScene from "../components/SupportedRobotScene"

export default {
  ...sharedStoryConfig,
  tags: ["!autodocs"],
  title: "3D View/Robot/Supported Models/FANUC_LR_Mate_200iD4S",
}

export const RobotStory: StoryObj<typeof SupportedRobotScene> = {
  args: {
    modelFromController: "FANUC_LR_Mate_200iD4S",
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "FANUC_LR_Mate_200iD4S",
}
