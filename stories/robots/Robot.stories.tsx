import { Canvas } from "@react-three/fiber"
import type { StoryObj } from "@storybook/react-vite"
import { NovaClient } from "@wandelbots/nova-js/v2"
import { useEffect, useState } from "react"
import { expect, fn, waitFor } from "storybook/test"
import { PresetEnvironment, Robot } from "../../src"
import { ConnectedMotionGroup } from "../../src/lib/ConnectedMotionGroup"
import { OrbitControlsAround } from "./OrbitControlsAround"
import { sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!dev"],
  title: "3D View/Robot/Robot",
}

function RobotScene(
  props: React.ComponentProps<typeof Robot>,
) {
  const [connectedMotionGroup, setConnectedMotionGroup] =
    useState<ConnectedMotionGroup>()

  const nova = new NovaClient({ instanceUrl: "http://172.31.12.142/" })

  useEffect(() => {
    async function fetchConnectedMotionGroup() {
      const motionGroup = await ConnectedMotionGroup.connect(
        nova,
        "0@mock-ur5e",
      )
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

export const RobotStory: StoryObj<typeof RobotScene> = {
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
        timeout: 8000,
      },
    )
  },

  render: (args) => <RobotScene {...args} />,
  name: "Robot",
}
