import type { StoryObj } from "@storybook/react"
import { Euler, Vector3, WebGLRenderer } from "three"
import { Robot, SupportedRobot } from "../../src"
import { type MotionGroupStateResponse } from "@wandelbots/wandelbots-js"
import { rapidlyChangingMotionState } from "./motionState"
import { sharedStoryConfig } from "./robotStoryConfig"
import { MockConnectedMotionGroup } from "./MockConnectedMotionGroup"

export default {
  ...sharedStoryConfig,
  title: "3D View/Robot",
}

const dhParameters = [
  {
    a: 0,
    d: 89.159000000000006,
    alpha: 1.5707963267948966,
    theta: 0,
    reverse_rotation_direction: false,
  },
  {
    a: -425,
    d: 0,
    alpha: 0,
    theta: 0,
    reverse_rotation_direction: false,
  },
  {
    a: -392.25,
    d: 0,
    alpha: 0,
    theta: 0,
    reverse_rotation_direction: false,
  },
  {
    a: 0,
    d: 109.15000000000001,
    alpha: 1.5707963267948966,
    theta: 0,
    reverse_rotation_direction: false,
  },
  {
    a: 0,
    d: 94.650000000000006,
    alpha: -1.5707963267948966,
    theta: 0,
    reverse_rotation_direction: false,
  },
  {
    a: 0,
    d: 82.299999999999997,
    alpha: 0,
    theta: 0,
    reverse_rotation_direction: false,
  },
]

const mockConnectedMotionGroup = new MockConnectedMotionGroup(
  dhParameters,
  rapidlyChangingMotionState,
)

function SupportedRobotScene(
  props: React.ComponentProps<typeof SupportedRobot>,
) {
  return <Robot connectedMotionGroup={mockConnectedMotionGroup} {...props} />
}

export const RobotStory: StoryObj<typeof SupportedRobotScene> = {
  args: {
    modelFromController: "ABB_1200_07_7",
    getModel: (model: string) => `/models/${model}.glb`,
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "Default",
}
