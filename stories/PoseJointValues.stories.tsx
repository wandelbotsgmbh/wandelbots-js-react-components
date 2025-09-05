import type { Meta, StoryObj } from "@storybook/react-vite"
import type { MotionStreamConnection } from "@wandelbots/nova-js/v1"
import { PoseJointValues } from "../src"

const meta: Meta<typeof PoseJointValues> = {
  title: "Jogging/PoseJointValues",
  tags: ["!dev"],
  component: PoseJointValues,
  argTypes: {
    showCopyButton: {
      control: "boolean",
      description: "Whether to show the copy functionality when clicking the component",
    },
  },
  args: {
    showCopyButton: false,
  },

  render: function Component(args) {
    // Create a mock MotionStreamConnection with static joint data
    const mockMotionStream = {
      rapidlyChangingMotionState: {
        state: {
          joint_position: {
            joints: [0.1234, -1.5678, 2.3456, -0.7890, 1.2345, -2.6789],
          },
        },
      },
    } as unknown as MotionStreamConnection

    return <PoseJointValues motionStream={mockMotionStream} showCopyButton={args.showCopyButton} />
  },
}

export default meta

type Story = StoryObj<typeof PoseJointValues>

export const Interactive: Story = {
  name: "Pose Joint Values",
}
