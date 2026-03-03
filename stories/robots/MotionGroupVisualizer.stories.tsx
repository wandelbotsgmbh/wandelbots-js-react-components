import { Canvas } from "@react-three/fiber"
import type { StoryObj } from "@storybook/react-vite"
import { NovaClient, type KinematicModel } from "@wandelbots/nova-js/v2"
import { useEffect, useState } from "react"
import { expect, fn, waitFor } from "storybook/test"
import { PresetEnvironment, ConnectedMotionGroup, MotionGroupVisualizer } from "../../src"
import { revokeAllModelUrls } from "../../src/components/robots/robotModelLogic"
import { OrbitControlsAround } from "./OrbitControlsAround"
import { sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!dev"],
  title: "3D View/Model Visualization/MotionGroupVisualizer",
}

function MotionGroupVisualizerScene(
  props: React.ComponentProps<typeof MotionGroupVisualizer>,
) {
  const [connectedMotionGroup, setConnectedMotionGroup] =
    useState<ConnectedMotionGroup>()
  const [inverseSolver, setInverseSolver] = useState<string | undefined | null>(undefined)


  const instanceUrl = import.meta.env.WANDELAPI_BASE_URL || "https://mock.example.com"
  const nova = new NovaClient({ instanceUrl })

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

  /**
   * Gets the kinematic model needed for MotionGroupVisualizer
   */
  const fetchKinematicModel = async () => {
    if(connectedMotionGroup) {
      try {
        const { inverse_solver, dh_parameters }: KinematicModel =
          await nova.api.motionGroupModels.getMotionGroupKinematicModel(connectedMotionGroup?.modelFromController)

        setInverseSolver(inverse_solver)
      } catch (err) {
        console.warn(
          `Failed to fetch kinematic model from API for ${connectedMotionGroup?.modelFromController}, falling back to local config`,
        )
      }
    }
  }

  /**
   * If connection is set - fetch the kinematic model information needed for MotionGroupVisualizer
   */
  useEffect(() => {
    fetchKinematicModel()
  }, [connectedMotionGroup])

  if (!connectedMotionGroup || inverseSolver === undefined) {
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
            instanceUrl={instanceUrl}
            modelFromController={connectedMotionGroup.modelFromController}
            rapidlyChangingMotionState={connectedMotionGroup.rapidlyChangingMotionState}
            dhParameters={connectedMotionGroup.dhParameters ?? []}
            inverseSolver={inverseSolver}
          />
        </OrbitControlsAround>
      </Canvas>
    </div>
  )
}

export const MotionGroupVisualizerStory: StoryObj<typeof MotionGroupVisualizerScene> = {
  args: {
    postModelRender: fn()
  },
  play: async ({ args }) => {
    /**
     * First render for undefined inverseSolver would be a null, which does not
     * fire the postModelRender callback
     */
    await waitFor(
      () =>
        expect(
          args.postModelRender,
          `Failed to load model for example ur5e`,
        ).not.toHaveBeenCalled(),
      {
        timeout: 8000,
      },
    )
  },

  render: (args) => <MotionGroupVisualizerScene {...args} />,
  name: "MotionGroupVisualizer",
}
