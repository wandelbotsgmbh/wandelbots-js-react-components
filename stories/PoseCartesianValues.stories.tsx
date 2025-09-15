import type { Meta, StoryObj } from "@storybook/react-vite"
import type { TcpPose } from "@wandelbots/nova-js/v1"
import { PoseCartesianValues } from "../src"

type StoryArgs = {
  pose: TcpPose
}

const meta: Meta<StoryArgs> = {
  title: "Jogging/PoseCartesianValues",
  tags: ["!dev"],
  component: PoseCartesianValues,
  argTypes: {
    pose: {
      control: "object",
      description: "TCP pose object containing position and orientation",
    },
  },
  args: {
    pose: {
      position: {
        x: -221.9,
        y: -607.5,
        z: -139.2,
      },
      orientation: {
        x: 0.0,
        y: 0.0,
        z: 1.0,
      },
      coordinate_system: "world",
      tcp: "flange",
    },
  },

  render: function Component(args) {
    return <PoseCartesianValues pose={args.pose} />
  },
}

export default meta
type Story = StoryObj<StoryArgs>

/**
 * Displays TCP pose values in Wandelscript format.
 * Takes a simple TcpPose object containing position (x, y, z) and orientation (x, y, z, w) values.
 * Use the controls to modify the pose values and see the formatted output.
 */
export const Interactive: Story = {}
