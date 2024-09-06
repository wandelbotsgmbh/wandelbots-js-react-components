import type { Meta, StoryObj } from "@storybook/react"
import { Euler, Vector3, WebGLRenderer } from "three"
import { SupportedRobot } from "../../src"
import type { MotionGroupStateResponse } from "@wandelbots/wandelbots-js"
import { Setup } from "../../src/Setup"

export default {
  tags: ["!dev"],
  title: "WIP/UniversalRobots_UR10",
  component: SupportedRobot,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Setup cameraPosition={new Vector3(0, 0, 3)}>
          <group position={[0, -0.25, 0]}>
            <Story />
          </group>
        </Setup>
      </div>
    ),
  ],
} satisfies Meta<typeof SupportedRobot>

function SupportedRobotScene(
  props: React.ComponentProps<typeof SupportedRobot>,
) {
  const rapidlyChangingMotionState: MotionGroupStateResponse = {
    state: {
      motion_group: "",
      controller: "",
      joint_position: {
        joints: [0, 0, 0, 0, 0, 0],
      },
      joint_velocity: {
        joints: [0, 0, 0, 0, 0, 0],
      },
      tcp_pose: {
        position: { x: 0, y: 0, z: 0 },
        orientation: { x: 0, y: 0, z: 0 },
        coordinate_system: "world",
        tcp: "flange",
      },
      velocity: {
        linear: { x: 0, y: 0, z: 0 },
        angular: { x: 0, y: 0, z: 0 },
        coordinate_system: "world",
      },
      joint_limit_reached: {
        limit_reached: [false, false, false, false, false, false],
      },
    },
  }

  return (
    <SupportedRobot
      {...props}
      rapidlyChangingMotionState={rapidlyChangingMotionState}
      dhParameters={[
        {
          a: 0,
          d: 127.3,
          alpha: 1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: -612,
          d: 0,
          alpha: 0,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: -572.29999999999995,
          d: 0,
          alpha: 0,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: 163.941,
          alpha: 1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: 115.7,
          alpha: -1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: 92.200000000000003,
          alpha: 0,
          theta: 0,
          reverse_rotation_direction: false,
        },
      ]}
    />
  )
}

export const UR5Story: StoryObj<typeof SupportedRobotScene> = {
  args: {
    modelFromController: "UniversalRobots_UR10",
    getModel: (model: string) => `/models/${model}.glb`,
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "Default",
}
