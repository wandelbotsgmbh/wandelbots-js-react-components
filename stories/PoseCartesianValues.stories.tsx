import type { Meta, StoryObj } from "@storybook/react-vite"
import type { Pose } from "@wandelbots/nova-js/v2"
import { PoseCartesianValues } from "../src"

type StoryArgs = {
  tcpPose: Pose
  showCopyButton: boolean
}

const meta: Meta<StoryArgs> = {
  title: "Jogging/PoseCartesianValues",
  tags: ["!dev"],
  component: PoseCartesianValues,
  argTypes: {
    tcpPose: {
      control: "object",
      description: "TCP pose object containing position and orientation",
    },
    showCopyButton: {
      control: "boolean",
      description: "Whether to show the copy button",
    },
  },
  args: {
    tcpPose: {
      position: [-221.9, -607.5, -139.2],
      orientation: [0.0, 0.0, 1.0],
    },
    showCopyButton: false,
  },

  render: function Component(args) {
    return (
      <PoseCartesianValues
        tcpPose={args.tcpPose}
        showCopyButton={args.showCopyButton}
      />
    )
  },
}

export default meta
type Story = StoryObj<StoryArgs>

/**
 * Displays TCP pose values in Wandelscript format.
 * Takes a simple TcpPose object containing position (x, y, z) and orientation (x, y, z, w) values.
 * Use the controls to modify the pose values and see the formatted output.
 * Toggle the copy button to enable manual copying of the pose string.
 */
export const Interactive: Story = {}
