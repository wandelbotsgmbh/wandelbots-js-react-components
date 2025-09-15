import type { Meta, StoryObj } from "@storybook/react-vite"
import { PoseJointValues } from "../src"

type StoryArgs = {
  pose: number[]
}

const meta: Meta<StoryArgs> = {
  title: "Jogging/PoseJointValues",
  tags: ["!dev"],
  component: PoseJointValues,
  argTypes: {
    pose: {
      control: "object",
      description: "Array of joint values in radians",
    },
  },
  args: {
    pose: [0.1234, -1.5678, 2.3456, -0.789, 1.2345, -2.6789],
  },

  render: function Component(args) {
    return <PoseJointValues pose={args.pose} />
  },
}

export default meta

type Story = StoryObj<StoryArgs>

/**
 * Displays joint values in array format with 4 decimal precision.
 * Takes a simple number array representing joint positions in radians.
 * Use the controls to modify the joint values and see the formatted output.
 */
export const Interactive: Story = {
  name: "Pose Joint Values",
}
