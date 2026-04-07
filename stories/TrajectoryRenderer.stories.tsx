import type { Meta, StoryObj } from "@storybook/react-vite"
import type { GetTrajectoryResponse } from "@wandelbots/nova-js/v1"
import { Vector3 } from "three"
import { TrajectoryRenderer } from "../src/components/3d-viewport/TrajectoryRenderer"
import { Setup } from "../src/Setup"
import { trajectory } from "./robots/trajectoryPaths"

const meta: Meta<typeof TrajectoryRenderer> = {
  tags: ["!dev"],
  title: "3D View/TrajectoryRenderer",
  component: TrajectoryRenderer,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Setup cameraPosition={new Vector3(0, 0, 10)}>
          <group position={[0, 0, 0]}>
            <Story />
          </group>
        </Setup>
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof TrajectoryRenderer>

function TrajectoryRendererScene(
  props: React.ComponentProps<typeof TrajectoryRenderer>,
) {
  return <TrajectoryRenderer trajectory={trajectory} />
}

export const TrajectoryRendererSt = {
  args: {},
  render: (args) => <TrajectoryRendererScene {...args} />,
  name: "Default",
} satisfies Story
