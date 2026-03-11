import type { Meta, StoryObj } from "@storybook/react-vite"
import { Vector3 } from "three"
import type { MotionGroupDescription } from "@wandelbots/nova-js/v2"
import { SafetyZonesRenderer } from "../src"
import { Setup } from "../src/Setup"
import type { SafetySetupSafetyZone } from "@wandelbots/nova-js/v1"

const meta: Meta<typeof SafetyZonesRenderer> = {
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
}

export default meta

type Story = StoryObj<typeof SafetyZonesRenderer>

const safetyZonesV1: SafetySetupSafetyZone[] = [
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
                  x: 1500,
                  y: 0,
                  z: -500,
                },
                {
                  x: 1500,
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
                  x: 1500,
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
                  x: 1500,
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
                  x: 1500,
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
                  x: 1500,
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
            x: 142.89320182080905,
            y: 353.5533845424652,
            z: 1557.10673999067,
          },
          {
            x: 342.89319497510076,
            y: 636.3960921764374,
            z: 1757.1067331449617,
          },
          {
            x: 542.8931881293923,
            y: 353.5533845424652,
            z: 1957.1067262992533,
          },
          {
            x: 342.89319497510064,
            y: 70.71067690849304,
            z: 1757.1067331449615,
          },
          {
            x: -139.9495058131631,
            y: 353.5533845424652,
            z: 1839.949447624642,
          },
          {
            x: 60.05048734112859,
            y: 636.3960921764374,
            z: 2039.9494407789339,
          },
          {
            x: 260.0504804954202,
            y: 353.5533845424652,
            z: 2239.9494339332255,
          },
          {
            x: 60.05048734112847,
            y: 70.71067690849304,
            z: 2039.9494407789336,
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
    id: 7,
    priority: 0,
    geometry: {
      convex_hull: {
        vertices: [
          {
            x: -450,
            y: -100,
            z: -100,
          },
          {
            x: -450,
            y: 50,
            z: -100,
          },
          {
            x: -450,
            y: 50,
            z: 50,
          },
          {
            x: -450,
            y: -100,
            z: 50,
          },
          {
            x: -600,
            y: -100,
            z: -100,
          },
          {
            x: -600,
            y: 50,
            z: -100,
          },
          {
            x: -600,
            y: 50,
            z: 50,
          },
          {
            x: -600,
            y: -100,
            z: 50,
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
      id: "Raum 7",
    },
    motion_group_uid: 0,
  },
]

const safetyZonesV2: MotionGroupDescription['safety_zones'] = {
  "1__0_bottom": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          1600,
          1200,
          2500
        ],
        [
          1600,
          -900,
          2500
        ],
        [
          -1000,
          -900,
          2500
        ],
        [
          -1000,
          1200,
          2500
        ]
      ]
    },
    "pose": {
      "position": [
        0,
        0,
        0
      ],
      "orientation": [
        0,
        0,
        0
      ]
    }
  },
  "1__0_side_0": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          1600,
          1200,
          2500
        ],
        [
          1600,
          -900,
          2500
        ],
        [
          1600,
          -900,
          -1000
        ],
        [
          1600,
          1200,
          -1000
        ]
      ]
    },
    "pose": {
      "position": [
        0,
        0,
        0
      ],
      "orientation": [
        0,
        0,
        0
      ]
    }
  },
  "1__0_side_1": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          1600,
          -900,
          2500
        ],
        [
          -1000,
          -900,
          2500
        ],
        [
          -1000,
          -900,
          -1000
        ],
        [
          1600,
          -900,
          -1000
        ]
      ]
    },
    "pose": {
      "position": [
        0,
        0,
        0
      ],
      "orientation": [
        0,
        0,
        0
      ]
    }
  },
  "1__0_side_2": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          -1000,
          -900,
          2500
        ],
        [
          -1000,
          1200,
          2500
        ],
        [
          -1000,
          1200,
          -1000
        ],
        [
          -1000,
          -900,
          -1000
        ]
      ]
    },
    "pose": {
      "position": [
        0,
        0,
        0
      ],
      "orientation": [
        0,
        0,
        0
      ]
    }
  },
  "1__0_side_3": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          -1000,
          1200,
          2500
        ],
        [
          1600,
          1200,
          2500
        ],
        [
          1600,
          1200,
          -1000
        ],
        [
          -1000,
          1200,
          -1000
        ]
      ]
    },
    "pose": {
      "position": [
        0,
        0,
        0
      ],
      "orientation": [
        0,
        0,
        0
      ]
    }
  },
  "1__0_top": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          1600,
          1200,
          -1000
        ],
        [
          1600,
          -900,
          -1000
        ],
        [
          -1000,
          -900,
          -1000
        ],
        [
          -1000,
          1200,
          -1000
        ]
      ]
    },
    "pose": {
      "position": [
        0,
        0,
        0
      ],
      "orientation": [
        0,
        0,
        0
      ]
    }
  },
  "2__0": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          430,
          430,
          -470
        ],
        [
          430,
          430,
          -1000
        ],
        [
          430,
          -430,
          -470
        ],
        [
          430,
          -430,
          -1000
        ],
        [
          -430,
          -430,
          -470
        ],
        [
          -430,
          -430,
          -1000
        ],
        [
          -430,
          430,
          -470
        ],
        [
          -430,
          430,
          -1000
        ]
      ]
    },
    "pose": {
      "position": [
        0,
        0,
        0
      ],
      "orientation": [
        0,
        0,
        0
      ]
    }
  },
  "3__0": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          -350,
          -650,
          2500
        ],
        [
          -350,
          -650,
          -1000
        ],
        [
          -350,
          -900,
          2500
        ],
        [
          -350,
          -900,
          -1000
        ],
        [
          -1000,
          -900,
          2500
        ],
        [
          -1000,
          -900,
          -1000
        ],
        [
          -1000,
          -650,
          2500
        ],
        [
          -1000,
          -650,
          -1000
        ]
      ]
    },
    "pose": {
      "position": [
        0,
        0,
        0
      ],
      "orientation": [
        0,
        0,
        0
      ]
    }
  }
}

function SafetyZonesRendererScene(
  props: React.ComponentProps<typeof SafetyZonesRenderer>,
) {

  return (
    <SafetyZonesRenderer {...props} />
  )
}

export const SafetyZonesRendererSt = {
  args: {
    safetyZones: safetyZonesV1,
  },
  render: (args) => <SafetyZonesRendererScene {...args} />,
  name: "Safety Zones V1",
} satisfies Story

export const SafetyZonesRendererV2 = {
  args: {
    safetyZones: safetyZonesV2,
  },
  render: (args) => <SafetyZonesRendererScene {...args} />,
  name: "Safety Zones V2",
} satisfies Story
