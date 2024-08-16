import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Euler, Vector3, WebGLRenderer } from "three"
import { OrbitControls, Grid } from "@react-three/drei"
import { SupportedRobot } from "./SupportedRobot"
import type {
  Joints,
  MotionGroupStateJointLimitReached,
  MotionGroupStateResponse,
  MotionVector,
  TcpPose,
} from "@wandelbots/wandelbots-js"
import { Setup } from "../../Setup"

export default {
  title: "Components/SupportedRobot",
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

type Story = StoryObj<typeof SupportedRobot>

function SupportedRobotScene(
  props: React.ComponentProps<typeof SupportedRobot>,
) {
  const rapidlyChangingMotionState: MotionGroupStateResponse = {
    state: {
      motion_group: "",
      controller: "",
      joint_position: {
        joints: [0, 0, 0, 0, 0, 0],
      } as Joints,
      joint_velocity: {
        joints: [0, 0, 0, 0, 0, 0],
      } as Joints,
      tcp_pose: {
        position: { x: 0, y: 0, z: 0 },
        orientation: { x: 0, y: 0, z: 0 },
        coordinate_system: "world",
        tcp: "flange",
      } as TcpPose,
      velocity: {
        linear: { x: 0, y: 0, z: 0 },
        angular: { x: 0, y: 0, z: 0 },
        coordinate_system: "world",
      } as MotionVector,
      joint_limit_reached: {
        limit_reached: [false, false, false, false, false, false],
      } as MotionGroupStateJointLimitReached,
    },
  }

  return (
    <SupportedRobot
      {...props}
      rapidlyChangingMotionState={rapidlyChangingMotionState}
      dhParameters={[
        {
          a: 0,
          d: 0,
          alpha: 1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 710,
          d: 0,
          alpha: 0,
          theta: 1.5707963267948966,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: 0,
          alpha: -1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: -540,
          alpha: 1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: 150,
          alpha: -1.5707963267948966,
          theta: 0,
          reverse_rotation_direction: false,
        },
        {
          a: 0,
          d: -160,
          alpha: 3.141592653589793,
          theta: 0,
          reverse_rotation_direction: false,
        },
      ]}
    />
  )
}

export const SupportedRobotSceneSt = {
  args: {
    modelFromController: "FANUC_CRX25iAL",
  },
  render: (args) => <SupportedRobotScene {...args} />,
  name: "Default",
} satisfies Story
