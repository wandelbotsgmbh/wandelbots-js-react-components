import { Canvas } from "@react-three/fiber"
import type { StoryObj } from "@storybook/react-vite"
import { useCallback, useEffect } from "react"
import { expect, fn, waitFor } from "storybook/test"
import { Mesh, MeshBasicMaterial, SphereGeometry, type Group } from "three"
import { PresetEnvironment, SupportedLinearAxis } from "../../src"
import { rapidlyChangingMotionState } from "./motionState"
import { OrbitControlsAround } from "./OrbitControlsAround"
import { getDHParams, getModel } from "./robotStoryConfig"

export default {
  tags: ["!dev"],
  title: "3D View/Robot/LinearAxis",
}

function LinearAxisScene(
  props: React.ComponentProps<typeof SupportedLinearAxis>,
) {
  const flangeRef: React.RefCallback<Group> = useCallback((node) => {
    if (!node) return

    // Add yellow sphere to illustrate flange position
    const geometry = new SphereGeometry(0.01, 32, 16)
    const material = new MeshBasicMaterial({ color: 0xffff00 })
    const sphere = new Mesh(geometry, material)
    node.add(sphere)
  }, [])

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
          <SupportedLinearAxis
            {...props}
            flangeRef={flangeRef}
            rapidlyChangingMotionState={rapidlyChangingMotionState}
          />
        </OrbitControlsAround>
      </Canvas>
    </div>
  )
}

export const LinearAxisStory: StoryObj<typeof LinearAxisScene> = {
  args: {
    modelFromController: "ABB_IRT710",
    getModel,
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
  render: (args, { loaded: { dhParameters } }) => {
    // Cleanup function that runs when the story unmounts
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      return () => {
        // Optional cleanup if needed
      }
    }, [])
    
    return <LinearAxisScene {...args} dhParameters={dhParameters} />
  },
  name: "ABB IRT710 Linear Axis",
  loaders: [
    async () => ({
      dhParameters: await getDHParams("ABB_IRT710"),
    }),
  ],
}
