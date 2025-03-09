import { useTheme } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react"
import type {
  CollisionScene,
  MotionGroupStateResponse,
} from "@wandelbots/wandelbots-js"
import * as THREE from "three"
import { Setup } from "../src/Setup"
import CollisionSceneElement from "../src/components/3d-viewport/collider/CollisionScene"
import {
  DEMO_CONVEX_HULL,
  UR5E_DH_PARAMETERS,
  UR5E_LINK_CHAIN,
} from "./convexHull"

export default {
  tags: ["!dev"],
  title: "3D View/CollisionSceneElement",
  component: CollisionSceneElement,
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
        <Setup cameraPosition={new THREE.Vector3(0, 2, 5)}>
          <group position={[0, 0, 0]}>
            <Story />
          </group>
        </Setup>
      </div>
    ),
  ],
} satisfies Meta<typeof CollisionSceneElement>

type Story = StoryObj<typeof CollisionSceneElement>

function CollisionSceneElementScene(
  props: React.ComponentProps<typeof CollisionSceneElement>,
) {
  const scene: CollisionScene = {
    colliders: {
      "test/sphere": {
        shape: {
          shape_type: "sphere",
          radius: 100,
        },
      },
      "test/box": {
        shape: {
          shape_type: "box",
          size_x: 100,
          size_y: 200,
          size_z: 300,
          box_type: "FULL",
        },
        pose: {
          position: [200, 0, 0],
        },
      },
      "test/box/rotated": {
        shape: {
          shape_type: "box",
          size_x: 100,
          size_y: 200,
          size_z: 300,
          box_type: "FULL",
        },
        pose: {
          position: [200, 0, -400],
          orientation: [Math.PI * 0.75, Math.PI * 0.5, 0],
        },
      },
      "test/cylinder": {
        shape: {
          shape_type: "cylinder",
          height: 200,
          radius: 50,
        },
        pose: {
          position: [-200, 0, 0],
        },
      },
      "test/capsule": {
        shape: {
          shape_type: "capsule",
          cylinder_height: 50,
          radius: 50,
        },
        pose: {
          position: [350, 0, 0],
        },
      },
      "test/rectangle": {
        shape: {
          shape_type: "rectangle",
          size_x: 150,
          size_y: 200,
        },
        pose: {
          position: [-350, 0, 0],
        },
      },
      "test/convex-hull": {
        shape: {
          shape_type: "convex_hull",
          vertices: DEMO_CONVEX_HULL.map((vertex) => [
            vertex[0] * 1000,
            vertex[1] * 1000,
            vertex[2] * 1000,
          ]),
        },
        pose: {
          position: [0, 500, -700],
        },
      },
    },
    motion_groups: {
      "0@ur5e": {
        link_chain: UR5E_LINK_CHAIN,
        tool: {
          cylinder: {
            shape: { shape_type: "cylinder", height: 20, radius: 40 },
            pose: {
              position: [0, 10, 0],
            },
          },
          sphere: {
            shape: {
              shape_type: "box",
              size_x: 20,
              size_y: 80,
              size_z: 20,
              box_type: "FULL",
            },
            pose: {
              position: [0, 40, 0],
            },
          },
        },
      },
    },
  }

  const rapidlyChangingMotionState: MotionGroupStateResponse = {
    state: {
      controller: "ur5e",
      joint_limit_reached: { limit_reached: [] },
      joint_position: { joints: [0, 0, Math.PI / 2, 0, 0, 0] },
      joint_current: { joints: [0, 0, 0, 0, 0, 0] },
      joint_velocity: { joints: [0, 0, 0, 0, 0, 0] },
      motion_group: "0",
      tcp_pose: {
        position: { x: 0, y: 0, z: 0 },
        orientation: { x: 0, y: 0, z: 0 },
        tcp: "Flange",
      },
      velocity: {},
    },
  }

  const theme = useTheme()
  return (
    <CollisionSceneElement
      scene={scene}
      meshChildrenProvider={(colliderKey, collider) => (
        <meshStandardMaterial
          color={
            colliderKey === "test/convex-hull"
              ? theme.palette.tertiary.main
              : theme.palette.primary.main
          }
          opacity={0.5}
          transparent
        />
      )}
      motionGroupStates={{
        "0@ur5e": {
          state: rapidlyChangingMotionState,
          dhParameters: UR5E_DH_PARAMETERS,
          mountingPosition: new THREE.Vector3(0, 0, -1),
        },
      }}
    />
  )
}

export const CollisionSceneElementSt = {
  args: {},
  render: (args) => <CollisionSceneElementScene {...args} />,
  name: "Default",
} satisfies Story
