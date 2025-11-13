import { useTheme } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react"
import type { CollisionScene } from "@wandelbots/nova-js/v1"
import * as THREE from "three"
import CollisionSceneRenderer from "../src/components/3d-viewport/collider/CollisionSceneRenderer"
import { Setup } from "../src/Setup"
import { DEMO_CONVEX_HULL } from "./convexHull"

export default {
  tags: ["!dev"],
  title: "3D View/CollisionSceneRenderer",
  component: CollisionSceneRenderer,
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
} satisfies Meta<typeof CollisionSceneRenderer>

type Story = StoryObj<typeof CollisionSceneRenderer>

function CollisionSceneRendererScene(
  _props: React.ComponentProps<typeof CollisionSceneRenderer>,
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
  }

  const theme = useTheme()
  return (
    <CollisionSceneRenderer
      scene={scene}
      meshChildrenProvider={(colliderKey, _collider) => (
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
    />
  )
}

export const CollisionSceneRendererSt = {
  args: {},
  render: (args) => <CollisionSceneRendererScene {...args} />,
  name: "Default",
} satisfies Story
