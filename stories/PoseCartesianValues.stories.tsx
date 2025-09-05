import type { Meta, StoryObj } from "@storybook/react-vite"
import type { MotionStreamConnection } from "@wandelbots/nova-js/v1"
import { PoseCartesianValues } from "../src"

const meta: Meta<typeof PoseCartesianValues> = {
  title: "Jogging/PoseCartesianValues",
  tags: ["!dev"],
  component: PoseCartesianValues,
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
    // Create a mock MotionStreamConnection with static TCP pose data
    const mockMotionStream = {
      rapidlyChangingMotionState: {
        tcp_pose: {
          position: {
            x: -221.9,
            y: -607.5,
            z: -139.2,
          },
          orientation: {
            x: 0.0,
            y: 0.0,
            z: 1.0,
            w: 0.0,
          },
        },
      },
    } as unknown as MotionStreamConnection

    return <PoseCartesianValues motionStream={mockMotionStream} showCopyButton={args.showCopyButton} />
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Displays TCP pose values in Wandelscript format.
 */
export const Interactive: Story = {}
