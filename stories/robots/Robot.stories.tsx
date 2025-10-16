import { Canvas } from "@react-three/fiber"
import type { StoryObj } from "@storybook/react-vite"
import type { ConnectedMotionGroup } from "@wandelbots/nova-js/v1"
import { NovaClient } from "@wandelbots/nova-js/v1"
import { useEffect, useState } from "react"
import { expect, fn, waitFor } from "storybook/test"
import type { SupportedRobot } from "../../src"
import { PresetEnvironment, Robot } from "../../src"
import { OrbitControlsAround } from "./OrbitControlsAround"
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

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        minHeight: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas shadows>
        <PresetEnvironment />

        <OrbitControlsAround>
          <Robot connectedMotionGroup={connectedMotionGroup} {...props} />
        </OrbitControlsAround>
      </Canvas>
    </div>
  )
}

export const RobotStory: StoryObj<typeof SupportedRobotScene> = {
  args: {
    postModelRender: fn(),
  },
  play: async ({ args }) => {
    await waitFor(
      () =>
        expect(
          args.postModelRender,
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
