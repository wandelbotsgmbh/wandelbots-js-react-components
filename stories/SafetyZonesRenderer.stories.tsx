import type { Meta, StoryObj } from "@storybook/react-vite"
import { Vector3 } from "three"
import type { MotionGroupDescription } from "@wandelbots/nova-js/v2"
import { SafetyZonesRenderer } from "../src"
import { Setup } from "../src/Setup"

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

function SafetyZonesRendererScene(
  props: React.ComponentProps<typeof SafetyZonesRenderer>,
) {
  const safetyZones: MotionGroupDescription['safety_zones'] = {
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

  return (
    <SafetyZonesRenderer safetyZones={safetyZones} />
  )
}

export const SafetyZonesRendererSt = {
  args: {},
  render: (args) => <SafetyZonesRendererScene {...args} />,
  name: "Default",
} satisfies Story
