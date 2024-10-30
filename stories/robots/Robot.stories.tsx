import type { StoryObj } from "@storybook/react"
import { expect, fn, waitFor } from "@storybook/test"
import type { ConnectedMotionGroup } from "@wandelbots/wandelbots-js"
import { NovaClient } from "@wandelbots/wandelbots-js"
import { useEffect, useState } from "react"
import type { SupportedRobot } from "../../src"
import { Robot } from "../../src"
import { sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!dev"],
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
    onModelLoaded: fn(),
  },
  play: async ({ args }) => {
    await waitFor(
      () =>
        expect(
          args.onModelLoaded,
          `Failed to load model for example ur5e`,
        ).toHaveBeenCalled(),
      {
        timeout: 5000,
      },
    )
  },

  render: (args) => <SupportedRobotScene {...args} />,
  name: "Robot",
}
