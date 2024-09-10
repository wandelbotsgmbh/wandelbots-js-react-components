import type { StoryObj } from "@storybook/react"
import { Euler, Vector3, WebGLRenderer } from "three"
import { Robot, SupportedRobot } from "../../src"
import {
  ConnectedMotionGroup,
  NovaClient,
  type MotionGroupStateResponse,
} from "@wandelbots/wandelbots-js"
import { sharedStoryConfig } from "./robotStoryConfig"
import { useEffect, useState } from "react"

export default {
  ...sharedStoryConfig,
  title: "3D View/Robot",
}

function SupportedRobotScene(
  props: React.ComponentProps<typeof SupportedRobot>,
) {
  const [connectedMotionGroup, setConnectedMotionGroup] =
    useState<ConnectedMotionGroup>()

  const nova = new NovaClient({ instanceUrl: "https://mock.example.com" })

  useEffect(() => {
    async function fetchConnectedMotionGroup() {
      const motionGroup = await nova.connectMotionGroup("0@mock-ur5e")
      setConnectedMotionGroup(motionGroup)
    }

    fetchConnectedMotionGroup()
  }, [])

  if (!connectedMotionGroup) {
    return null
  }

  return <Robot connectedMotionGroup={connectedMotionGroup} {...props} />
}

export const RobotStory: StoryObj<typeof SupportedRobotScene> = {
  args: {
    getModel: (model: string) => `/models/${model}.glb`,
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "Default",
}
