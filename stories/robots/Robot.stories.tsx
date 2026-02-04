import { Canvas } from "@react-three/fiber"
import type { StoryObj } from "@storybook/react-vite"
import { NovaClient } from "@wandelbots/nova-js/v2"
import { useEffect, useState } from "react"
import { expect, fn, waitFor } from "storybook/test"
import { PresetEnvironment, Robot } from "../../src"
import { revokeAllModelUrls } from "../../src/components/robots/robotModelLogic"
import { ConnectedMotionGroup } from "../../src/lib/ConnectedMotionGroup"
import { OrbitControlsAround } from "./OrbitControlsAround"
import { sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!dev"],
  title: "3D View/Robot/Robot",
}

function RobotScene(
  props: Omit<React.ComponentProps<typeof Robot>, "connectedMotionGroup">,
) {
  const [connectedMotionGroup, setConnectedMotionGroup] =
    useState<ConnectedMotionGroup>()

  const nova = new NovaClient({ instanceUrl: import.meta.env.WANDELAPI_BASE_URL || "https://mock.example.com" })

  useEffect(() => {
    async function fetchConnectedMotionGroup() {
      const motionGroup = await ConnectedMotionGroup.connect(
        nova,
        "0@mock-ur5e",
      )
      setConnectedMotionGroup(motionGroup)
    }

    fetchConnectedMotionGroup()
    
    // Cleanup: revoke model URLs when component unmounts
    return () => {
      revokeAllModelUrls()
    }
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
          <Robot {...props} connectedMotionGroup={connectedMotionGroup} />
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
