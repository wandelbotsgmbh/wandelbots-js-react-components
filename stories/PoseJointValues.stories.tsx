import type { Meta, StoryObj } from "@storybook/react-vite"
import type {
  ConnectedMotionGroup,
  MotionStreamConnection,
} from "@wandelbots/nova-js/v1"
import { PoseJointValues } from "../src"

type StoryArgs = {
  showCopyButton: boolean
  usageType: "motionStream" | "connectedMotionGroup"
}

const meta: Meta<StoryArgs> = {
  title: "Jogging/PoseJointValues",
  tags: ["!dev"],
  component: PoseJointValues,
  argTypes: {
    showCopyButton: {
      control: "boolean",
      description:
        "Whether to show the copy functionality when clicking the component",
    },
    usageType: {
      control: "select",
      options: ["motionStream", "connectedMotionGroup"],
      description:
        "Choose whether to use motionStream or connectedMotionGroup prop",
    },
  },
  args: {
    showCopyButton: false,
    usageType: "motionStream",
  },

  render: function Component(args) {
    // Create a mock MotionStreamConnection with static joint data
    const mockMotionStream = {
      rapidlyChangingMotionState: {
        state: {
          joint_position: {
            joints: [0.1234, -1.5678, 2.3456, -0.789, 1.2345, -2.6789],
          },
        },
      },
    } as unknown as MotionStreamConnection

    // Create a mock ConnectedMotionGroup with the same motion state
    const mockConnectedMotionGroup = {
      rapidlyChangingMotionState: mockMotionStream.rapidlyChangingMotionState,
      motionGroupId: "0@mock-ur5e",
      controllerId: "mock-ur5e",
    } as unknown as ConnectedMotionGroup

    if (args.usageType === "connectedMotionGroup") {
      return (
        <PoseJointValues
          connectedMotionGroup={mockConnectedMotionGroup}
          showCopyButton={args.showCopyButton}
        />
      )
    }

    return (
      <PoseJointValues
        motionStream={mockMotionStream}
        showCopyButton={args.showCopyButton}
      />
    )
  },
}

export default meta

type Story = StoryObj<StoryArgs>

/**
 * Displays joint values in array format.
 * Can accept either a MotionStreamConnection or ConnectedMotionGroup.
 * Use the controls to switch between usage patterns.
 */
export const Interactive: Story = {
  name: "Pose Joint Values",
}
