import { Canvas } from "@react-three/fiber"
import type { StoryObj } from "@storybook/react-vite"
import { type DHParameter, NovaClient } from "@wandelbots/nova-js/v2"
import { useCallback, useEffect, useState } from "react"
import { expect, fn, waitFor } from "storybook/test"
import { Mesh, MeshBasicMaterial, SphereGeometry, type Group } from "three"
import { PresetEnvironment } from "../../src"
import { revokeAllModelUrls } from "../../src/components/robots/robotModelLogic"
import { ConnectedMotionGroup } from "../../src/lib/ConnectedMotionGroup"
import { OrbitControlsAround } from "./OrbitControlsAround"
import { getDHParams, sharedStoryConfig } from "./robotStoryConfig"
import { MotionGroupVisualizer } from "../../src/components/robots/MotionGroupVisualizer"

export default {
  ...sharedStoryConfig,
  tags: ["!dev"],
  title: "3D View/Robot/LinearAxis",
}

function LinearAxisScene(
  props: Omit<React.ComponentProps<typeof MotionGroupVisualizer> & {
    dhParameters: DHParameter[],
    modelFromController: string
  }, "connectedMotionGroup">,
) {
  const [connectedMotionGroup, setConnectedMotionGroup] =
    useState<ConnectedMotionGroup>()

  const nova = new NovaClient({
    instanceUrl: import.meta.env.WANDELAPI_BASE_URL || "https://mock.example.com",
  })

  const flangeRef: React.RefCallback<Group> = useCallback((node) => {
    if (!node) return

    // Add yellow sphere to illustrate flange position
    const geometry = new SphereGeometry(0.01, 32, 16)
    const material = new MeshBasicMaterial({ color: 0xffff00 })
    const sphere = new Mesh(geometry, material)
    node.add(sphere)
  }, [])

  useEffect(() => {
    async function fetchConnectedMotionGroup() {
      const motionGroup = await ConnectedMotionGroup.connect(nova, "1@rob-linear-axis")
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
          <MotionGroupVisualizer
            {...props}
            modelFromController={connectedMotionGroup.modelFromController ?? "ABB_IRT710"}
            rapidlyChangingMotionState={connectedMotionGroup.rapidlyChangingMotionState}
          />
        </OrbitControlsAround>
      </Canvas>
    </div>
  )
}

export const LinearAxisStory: StoryObj<typeof LinearAxisScene> = {
  args: {
    postModelRender: fn(),
    inverseSolver: null
  },
  play: async ({ args }) => {
    await waitFor(
      () =>
        expect(
          args.postModelRender,
          `Failed to load model for rob-linear-axis`,
        ).toHaveBeenCalled(),
      {
        timeout: 8000,
      },
    )
  },
  render: (args, { loaded: { dhParameters } }) => {
    return <LinearAxisScene {...args} dhParameters={dhParameters} />
  },
  name: "ABB IRT710 Linear Axis",
  loaders: [
    async () => ({
      dhParameters: await getDHParams("ABB_IRT710"),
    }),
  ],
}
