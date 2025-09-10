import type { Meta, StoryObj } from "@storybook/react-vite"
import type {
  ConnectedMotionGroup,
  MotionStreamConnection,
} from "@wandelbots/nova-js/v1"
import { PoseCartesianValues } from "../src"

type StoryArgs = {
  showCopyButton: boolean
  usageType: "motionStream" | "connectedMotionGroup"
}

const meta: Meta<StoryArgs> = {
  title: "Jogging/PoseCartesianValues",
  tags: ["!dev"],
  component: PoseCartesianValues,
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

    // Create a mock ConnectedMotionGroup with the same motion state
    const mockConnectedMotionGroup = {
      rapidlyChangingMotionState: mockMotionStream.rapidlyChangingMotionState,
      motionGroupId: "0@mock-ur5e",
      controllerId: "mock-ur5e",
    } as unknown as ConnectedMotionGroup

    if (args.usageType === "connectedMotionGroup") {
      return (
        <PoseCartesianValues
          connectedMotionGroup={mockConnectedMotionGroup}
          showCopyButton={args.showCopyButton}
        />
      )
    }

    return (
      <PoseCartesianValues
        motionStream={mockMotionStream}
        showCopyButton={args.showCopyButton}
      />
    )
  },
}

export default meta
type Story = StoryObj<StoryArgs>

/**
 * Displays TCP pose values in Wandelscript format.
 * Can accept either a MotionStreamConnection or ConnectedMotionGroup.
 * Use the controls to switch between usage patterns.
 */
export const Interactive: Story = {}
