import { Canvas } from "@react-three/fiber"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { DHParameter } from "@wandelbots/nova-js/v2"
import { useEffect } from "react"
import { expect, fn, waitFor } from "storybook/test"
import { JointLimitGizmo, PresetEnvironment, SupportedRobot } from "../src"
import { revokeAllModelUrls } from "../src/components/robots/robotModelLogic"
import { Setup } from "../src/Setup"
import { OrbitControlsAround } from "./robots/OrbitControlsAround"
import { getDHParams, getModel } from "./robots/robotStoryConfig"

const meta = {
  title: "3D View/JointLimitGizmo",
  component: JointLimitGizmo,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          "Joint axes and position limits for a DH chain in NOVA's Z-up frame (joint axis = local Z). Revolute positions are radians; prismatic positions and DH lengths are millimetres. Rendered lengths and marker size are metres. This library's robot visualizers place robots in three.js's Y-up world and rotate each joint about local Y instead, so overlaying the gizmo on a rendered robot needs an outer `rotation={[-Math.PI / 2, 0, 0]}` group to rotate Z onto Y — see the 'On a robot' story.",
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
} satisfies Meta<typeof JointLimitGizmo>

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
  parameters: {
    docs: {
      description: {
        story:
          "Edit live joint positions, DH parameters, offsets and limits; select a highlighted joint or adjust marker size. The chain includes a reversed revolute joint, a multi-turn range and a prismatic joint.",
      },
    },
  },
} satisfies Story

export const UnboundedLimits = {
  args: {
    ...Interactive.args,
    // Real controllers never report an unbounded limit, but the gizmo
    // guards against one anyway instead of crashing with a `RangeError`.
    limits: [
      { negative: Number.NEGATIVE_INFINITY, positive: Number.POSITIVE_INFINITY },
      Interactive.args.limits[1],
      Interactive.args.limits[2],
    ],
  },
  decorators: Interactive.decorators,
  parameters: {
    docs: {
      description: {
        story:
          "Non-finite limits are skipped instead of crashing (joint 0 here has no bounded limit drawn).",
      },
    },
  },
} satisfies Story

const UR5E_MODEL = "UniversalRobots_UR5e"
// Non-zero so the gizmo's rest/axis markers are visibly offset from the
// robot's zero pose, making any misalignment between the two obvious.
const UR5E_JOINT_POSITIONS = [0.4, -0.9, 1.1, -0.6, 0.8, 0.3]
// UR5e joints are all continuous revolute; this is an illustrative limit, not
// the real controller limit.
const UR5E_LIMIT = { negative: -2 * Math.PI, positive: 2 * Math.PI }

function JointLimitGizmoOnRobotScene({
  dhParameters,
  postModelRender,
}: {
  dhParameters: DHParameter[]
  postModelRender?: () => void
}) {
  useEffect(() => {
    return () => {
      revokeAllModelUrls()
    }
  }, [])

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        minHeight: 400,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas shadows>
        <PresetEnvironment />
        <OrbitControlsAround>
          <SupportedRobot
            modelFromController={UR5E_MODEL}
            getModel={getModel}
            dhParameters={dhParameters}
            postModelRender={postModelRender}
            rapidlyChangingMotionState={{
              motion_group: "",
              controller: "",
              joint_position: UR5E_JOINT_POSITIONS,
              tcp_pose: { position: [0, 0, 0], orientation: [0, 0, 0] },
              joint_limit_reached: {
                limit_reached: UR5E_JOINT_POSITIONS.map(() => false),
              },
              sequence_number: 0,
              standstill: true,
              timestamp: new Date().toISOString(),
              description_revision: 0,
            }}
          />
          {/* Rotates the gizmo's Z-up DH chain onto the Y-up convention the
              robot visualizers use, so the two line up joint-for-joint. */}
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <JointLimitGizmo
              dhParameters={dhParameters}
              limits={dhParameters.map(() => UR5E_LIMIT)}
              jointPositions={UR5E_JOINT_POSITIONS}
              size={0.12}
            />
          </group>
        </OrbitControlsAround>
      </Canvas>
    </div>
  )
}

export const OnRobot: StoryObj<typeof JointLimitGizmoOnRobotScene> = {
  args: {
    postModelRender: fn(),
  },
  loaders: [
    async () => ({
      dhParameters: await getDHParams(UR5E_MODEL),
    }),
  ],
  play: async ({ args }) => {
    await waitFor(() => expect(args.postModelRender).toHaveBeenCalled(), {
      timeout: 8000,
    })
  },
  render: (args, { loaded }) => (
    <JointLimitGizmoOnRobotScene
      {...args}
      dhParameters={loaded.dhParameters as DHParameter[]}
    />
  ),
  name: "On a robot",
  parameters: {
    docs: {
      description: {
        story:
          "The gizmo overlaid on a rendered UR5e, driven by the same DH parameters and joint positions as the robot itself. The gizmo is wrapped in `rotation={[-Math.PI / 2, 0, 0]}` to convert its Z-up frame to the robot visualizer's Y-up convention.",
      },
    },
  },
}
