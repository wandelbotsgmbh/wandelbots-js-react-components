import { Canvas } from "@react-three/fiber"
import type { StoryObj } from "@storybook/react-vite"
import { type DHParameter, NovaClient } from "@wandelbots/nova-js/v2"
import { useCallback, useEffect, useState } from "react"
import { expect, fn, waitFor } from "storybook/test"
import { Mesh, MeshBasicMaterial, SphereGeometry, type Group } from "three"
import { PresetEnvironment } from "../../src"
import { LinearAxis } from "../../src/components/robots/LinearAxis"
import { revokeAllModelUrls } from "../../src/components/robots/robotModelLogic"
import { ConnectedMotionGroup } from "../../src/lib/ConnectedMotionGroup"
import { OrbitControlsAround } from "./OrbitControlsAround"
import { getDHParams, getModel, sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!dev"],
  title: "3D View/Robot/LinearAxis",
}

function LinearAxisScene(
  props: Omit<React.ComponentProps<typeof LinearAxis> & { dhParameters: DHParameter[], modelFromController: string}, "connectedMotionGroup">,
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
          <LinearAxis
            {...props}
            flangeRef={flangeRef}
            connectedMotionGroup={connectedMotionGroup}
          />
        </OrbitControlsAround>
      </Canvas>
    </div>
  )
}

export const LinearAxisStory: StoryObj<typeof LinearAxisScene> = {
  args: {
    postModelRender: fn(),
  },
  play: async ({ args }) => {
    await waitFor(
      () =>
        expect(
          args.postModelRender,
          `Failed to load model for ${args.modelFromController}`,
        ).toHaveBeenCalled(),
      {
        timeout: 8000,
      },
    )
  },
  render: (args, { loaded: { dhParameters, getModel } }) => {
    // Cleanup function that runs when the story unmounts
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      return () => {
        // Optional cleanup if needed
      }
    }, [])
    
    return <LinearAxisScene {...args} dhParameters={dhParameters} getModel={() => getModel} />
  },
  name: "ABB IRT710 Linear Axis",
  loaders: [
    async () => ({
      dhParameters: await getDHParams("ABB_IRT710"),
      getModel: getModel("ABB_IRT710")
    }),
  ],
}
