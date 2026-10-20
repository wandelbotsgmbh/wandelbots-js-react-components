import type { Meta, StoryObj } from "@storybook/react-vite"
import { JointLimits } from "../src/3d"
import { Setup } from "../src/Setup"

const meta = {
  title: "3D View/JointLimits",
  component: JointLimits,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          "Joint axes and position limits for a DH chain in NOVA's Z-up frame. Revolute positions are radians; prismatic positions and DH lengths are millimetres. Rendered lengths and marker size are metres.",
      },
    },
  },
  argTypes: {
    size: { control: { type: "range", min: 0.05, max: 0.3, step: 0.01 } },
    highlightedJoint: {
      control: "select",
      options: [null, 0, 1, 2],
    },
    jointPositions: { control: "object" },
    dhParameters: { control: "object" },
    chainOffset: { control: "object" },
    limits: { control: "object" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: 480 }}>
        <Setup
          lights={false}
          camera={{ position: [1.8, 1.8, 1.5], up: [0, 0, 1], fov: 40 }}
        >
          <gridHelper
            args={[2, 20, "#6b7280", "#343840"]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <Story />
        </Setup>
      </div>
    ),
  ],
} satisfies Meta<typeof JointLimits>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive = {
  args: {
    dhParameters: [
      { a: 400, d: 200, alpha: Math.PI / 2 },
      { a: 300, reverse_rotation_direction: true },
      { d: 100, type: "PRISMATIC_JOINT" },
    ],
    limits: [
      { negative: -Math.PI, positive: Math.PI },
      { negative: -2 * Math.PI, positive: 2 * Math.PI },
      { negative: -100, positive: 300 },
    ],
    chainOffset: null,
    jointPositions: [Math.PI / 6, Math.PI / 4, 100],
    size: 0.15,
    highlightedJoint: null,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Edit live joint positions, DH parameters, offsets and limits; select a highlighted joint or adjust marker size. The chain includes a reversed revolute joint, a multi-turn range and a prismatic joint.",
      },
    },
  },
} satisfies Story
