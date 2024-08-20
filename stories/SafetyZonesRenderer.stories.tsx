import type { Meta, StoryObj } from "@storybook/react"
import { Euler, Vector3, WebGLRenderer } from "three"
import { SafetyZonesRenderer } from "../src"
import type { SafetySetupSafetyZone } from "@wandelbots/wandelbots-js"
import { Setup } from "../src/Setup"

export default {
  tags: ["!dev"],
  title: "3D View/SafetyZonesRenderer",
  component: SafetyZonesRenderer,
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
        <Setup cameraPosition={new Vector3(0, 0, 10)}>
          <group position={[0, 0, 0]}>
            <Story />
          </group>
        </Setup>
      </div>
    ),
  ],
} satisfies Meta<typeof SafetyZonesRenderer>

type Story = StoryObj<typeof SafetyZonesRenderer>

function SafetyZonesRendererScene(
  props: React.ComponentProps<typeof SafetyZonesRenderer>,
) {
  const safetyZones: SafetySetupSafetyZone[] = [
    {
      id: 0,
      priority: 0,
      geometry: {
        compound: {
          child_geometries: [
            {
              convex_hull: {
                vertices: [
                  {
                    x: 900,
                    y: 1500,
                    z: -500,
                  },
                  {
                    x: -1250,
                    y: 1500,
                    z: -500,
                  },
                  {
                    x: -1250,
                    y: 1500,
                    z: 3000,
                  },
                  {
                    x: 900,
                    y: 1500,
                    z: 3000,
                  },
                ],
              },
              init_pose: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 1,
                },
              },
              id: "boundingPrism_side",
            },
            {
              convex_hull: {
                vertices: [
                  {
                    x: -1250,
                    y: 1500,
                    z: -500,
                  },
                  {
                    x: -1250,
                    y: -1500,
                    z: -500,
                  },
                  {
                    x: -1250,
                    y: -1500,
                    z: 3000,
                  },
                  {
                    x: -1250,
                    y: 1500,
                    z: 3000,
                  },
                ],
              },
              init_pose: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 1,
                },
              },
              id: "boundingPrism_side",
            },
            {
              convex_hull: {
                vertices: [
                  {
                    x: -1250,
                    y: -1500,
                    z: -500,
                  },
                  {
                    x: 900,
                    y: -1500,
                    z: -500,
                  },
                  {
                    x: 900,
                    y: -1500,
                    z: 3000,
                  },
                  {
                    x: -1250,
                    y: -1500,
                    z: 3000,
                  },
                ],
              },
              init_pose: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 1,
                },
              },
              id: "boundingPrism_side",
            },
            {
              convex_hull: {
                vertices: [
                  {
                    x: 900,
                    y: -1500,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                  {
                    x: 900,
                    y: -1500,
                    z: 3000,
                  },
                ],
              },
              init_pose: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 1,
                },
              },
              id: "boundingPrism_side",
            },
            {
              convex_hull: {
                vertices: [
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                ],
              },
              init_pose: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 1,
                },
              },
              id: "boundingPrism_side",
            },
            {
              convex_hull: {
                vertices: [
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                ],
              },
              init_pose: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 1,
                },
              },
              id: "boundingPrism_side",
            },
            {
              convex_hull: {
                vertices: [
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                ],
              },
              init_pose: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 1,
                },
              },
              id: "boundingPrism_side",
            },
            {
              convex_hull: {
                vertices: [
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                ],
              },
              init_pose: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 1,
                },
              },
              id: "boundingPrism_side",
            },
            {
              convex_hull: {
                vertices: [
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                ],
              },
              init_pose: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 1,
                },
              },
              id: "boundingPrism_side",
            },
            {
              convex_hull: {
                vertices: [
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 900,
                    y: 1500,
                    z: -500,
                  },
                  {
                    x: 900,
                    y: 1500,
                    z: 3000,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                ],
              },
              init_pose: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 1,
                },
              },
              id: "boundingPrism_side",
            },
            {
              convex_hull: {
                vertices: [
                  {
                    x: 900,
                    y: 1500,
                    z: -500,
                  },
                  {
                    x: -1250,
                    y: 1500,
                    z: -500,
                  },
                  {
                    x: -1250,
                    y: -1500,
                    z: -500,
                  },
                  {
                    x: 900,
                    y: -1500,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: -500,
                  },
                ],
              },
              init_pose: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 1,
                },
              },
              id: "boundingPrism_bottom",
            },
            {
              convex_hull: {
                vertices: [
                  {
                    x: 900,
                    y: 1500,
                    z: 3000,
                  },
                  {
                    x: -1250,
                    y: 1500,
                    z: 3000,
                  },
                  {
                    x: -1250,
                    y: -1500,
                    z: 3000,
                  },
                  {
                    x: 900,
                    y: -1500,
                    z: 3000,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                  {
                    x: 0,
                    y: 0,
                    z: 3000,
                  },
                ],
              },
              init_pose: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 1,
                },
              },
              id: "boundingPrism_top",
            },
          ],
        },
        init_pose: {
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          orientation: {
            x: 0,
            y: 0,
            z: 0,
            w: 1,
          },
        },
        id: "CellArea",
      },
      motion_group_uid: 0,
    },
    {
      id: 5,
      priority: 0,
      geometry: {
        convex_hull: {
          vertices: [
            {
              x: -2100.000052453666,
              y: 1199.9999082060847,
              z: 3100,
            },
            {
              x: -2200.000052453666,
              y: 1199.9999038349458,
              z: 3100,
            },
            {
              x: -2200.000052453666,
              y: 1199.9999038349458,
              z: 3200,
            },
            {
              x: -2100.000052453666,
              y: 1199.9999082060847,
              z: 3200,
            },
            {
              x: -2100.000048082527,
              y: 1099.9999082060847,
              z: 3100,
            },
            {
              x: -2200.000048082527,
              y: 1099.9999038349458,
              z: 3100,
            },
            {
              x: -2200.000048082527,
              y: 1099.9999038349458,
              z: 3200,
            },
            {
              x: -2100.000048082527,
              y: 1099.9999082060847,
              z: 3200,
            },
          ],
        },
        init_pose: {
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          orientation: {
            x: 0,
            y: 0,
            z: 0,
            w: 1,
          },
        },
        id: "Raum 5",
      },
      motion_group_uid: 0,
    },
    {
      id: 6,
      priority: 0,
      geometry: {
        convex_hull: {
          vertices: [
            {
              x: -950.0000605808924,
              y: 1385.9292258806447,
              z: -42.426406145095825,
            },
            {
              x: -1020.0000605808924,
              y: 1385.9292228208476,
              z: -42.426406145095825,
            },
            {
              x: -1020.0000630535818,
              y: 1442.497764347642,
              z: 14.142135381698608,
            },
            {
              x: -950.0000630535818,
              y: 1442.4977674074391,
              z: 14.142135381698608,
            },
            {
              x: -950.0000587263753,
              y: 1343.5028197355489,
              z: 0,
            },
            {
              x: -1020.0000587263753,
              y: 1343.5028166757518,
              z: 0,
            },
            {
              x: -1020.0000611990647,
              y: 1400.0713582025462,
              z: 56.568541526794434,
            },
            {
              x: -950.0000611990647,
              y: 1400.0713612623433,
              z: 56.568541526794434,
            },
          ],
        },
        init_pose: {
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          orientation: {
            x: 0,
            y: 0,
            z: 0,
            w: 1,
          },
        },
        id: "Raum 6",
      },
      motion_group_uid: 0,
    },
  ]

  return <SafetyZonesRenderer safetyZones={safetyZones} />
}

export const SafetyZonesRendererSt = {
  args: {},
  render: (args) => <SafetyZonesRendererScene {...args} />,
  name: "Default",
} satisfies Story
