import type { Meta, StoryObj } from "@storybook/react-vite"
import { PoseJointValues } from "../src"

type StoryArgs = {
  joints: Array<number>
  showCopyButton: boolean
}

const meta: Meta<StoryArgs> = {
  title: "Jogging/PoseJointValues",
  tags: ["!dev"],
  component: PoseJointValues,
  argTypes: {
    joints: {
      control: "object",
      description: "Joint configuration object with joints array in radians",
    },
    showCopyButton: {
      control: "boolean",
      description: "Whether to show the copy button",
    },
  },
  args: {
    joints: [0.1234, -1.5678, 2.3456, -0.789, 1.2345, -2.6789],
    showCopyButton: false,
  },

  render: function Component(args) {
    return (
      <PoseJointValues
        joints={args.joints}
        showCopyButton={args.showCopyButton}
      />
    )
  },
}

export default meta

type Story = StoryObj<StoryArgs>

/**
 * Displays joint values in array format with 4 decimal precision.
 * Takes a Joints object containing an array of joint positions in radians.
 * Use the controls to modify the joint values and see the formatted output.
 * Toggle the copy button to enable manual copying of the joint values string.
 */
export const Interactive: Story = {
  name: "Pose Joint Values",
}
