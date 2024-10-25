import type { StoryObj } from "@storybook/react"
import { SupportedRobot } from "../../src/"
import { rapidlyChangingMotionState } from "./motionState"
import { sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!autodocs"],
  title: "{{PAGE_TITLE}}",
}

function SupportedRobotScene(
  props: React.ComponentProps<typeof SupportedRobot>,
) {
  return (
    <SupportedRobot
      {...props}
      rapidlyChangingMotionState={rapidlyChangingMotionState}
      dhParameters={JSON.parse("{{DH_PARAMETERS}}")}
    />
  )
}

export const RobotStory: StoryObj<typeof SupportedRobotScene> = {
  args: {
    modelFromController: "{{ROBOT_MODEL_NAME}}",
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "{{ROBOT_MODEL_NAME}}",
}
