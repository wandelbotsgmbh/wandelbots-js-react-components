import type { DHParameter, MotionGroupDescription } from "@wandelbots/nova-js/v2"
import type { SafetySetupSafetyZone } from "@wandelbots/nova-js/v1"

export const safetyZonesV1: SafetySetupSafetyZone[] = [
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

export const safetyZonesV2Hull: MotionGroupDescription['safety_zones'] = {
  "3__0": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          -350,
          -650,
          1500
        ],
        [
          -350,
          -650,
          -1000
        ],
        [
          -350,
          -900,
          1500
        ],
        [
          -350,
          -900,
          -1000
        ],
        [
          -1000,
          -900,
          1500
        ],
        [
          -1000,
          -900,
          -1000
        ],
        [
          -1000,
          -650,
          1500
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
        -800,
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

export const safetyZonesV2Plane: MotionGroupDescription['safety_zones'] = {
  "1_Plane 2_0": {
    "shape": {
      "shape_type": "plane"
    },
    "pose": {
      "position": [
        0,
        1000,
        0
      ],
      "orientation": [
        -100,
        0,
        0
      ]
    }
  }
}

export const safetyZonesV2Sphere: MotionGroupDescription['safety_zones'] = {
  "5_Camera protection_0": {
    "shape": {
      "radius": 350,
      "shape_type": "sphere"
    },
    "pose": {
      "position": [
        1000,
        -1000,
        1200
      ],
      "orientation": [
        0,
        0,
        0
      ]
    }
  }
}

export const safetyZonesV2Capsule: MotionGroupDescription['safety_zones'] = {
  "6_Steel column_0": {
    "shape": {
      "radius": 200,
      "cylinder_height": 700,
      "shape_type": "capsule"
    },
    "pose": {
      "position": [
        -120,
        -1100,
        150
      ],
      "orientation": [
        0,
        0,
        0
      ]
    }
  }
}

export const safetyZonesV2Prism: MotionGroupDescription['safety_zones'] = {
  "1_workspace boundary_0_bottom": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          800,
          -397.175,
          1500
        ],
        [
          800,
          402.825,
          1500
        ],
        [
          -550,
          402.825,
          1500
        ],
        [
          -550,
          -397.175,
          1500
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
  "1_workspace boundary_0_side_0": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          800,
          -397.175,
          1500
        ],
        [
          800,
          402.825,
          1500
        ],
        [
          800,
          402.825,
          -250
        ],
        [
          800,
          -397.175,
          -250
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
  "1_workspace boundary_0_side_1": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          800,
          402.825,
          1500
        ],
        [
          -550,
          402.825,
          1500
        ],
        [
          -550,
          402.825,
          -250
        ],
        [
          800,
          402.825,
          -250
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
  "1_workspace boundary_0_side_2": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          -550,
          402.825,
          1500
        ],
        [
          -550,
          -397.175,
          1500
        ],
        [
          -550,
          -397.175,
          -250
        ],
        [
          -550,
          402.825,
          -250
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
  "1_workspace boundary_0_side_3": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          -550,
          -397.175,
          1500
        ],
        [
          800,
          -397.175,
          1500
        ],
        [
          800,
          -397.175,
          -250
        ],
        [
          -550,
          -397.175,
          -250
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
  "1_workspace boundary_0_top": {
    "shape": {
      "shape_type": "convex_hull",
      "vertices": [
        [
          800,
          -397.175,
          -250
        ],
        [
          800,
          402.825,
          -250
        ],
        [
          -550,
          402.825,
          -250
        ],
        [
          -550,
          -397.175,
          -250
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

export const safetyZonesV2Lozenge: MotionGroupDescription['safety_zones'] = {
  "7_Conveyor belt_0": {
    "shape": {
      "radius": 50,
      "sphere_center_distance_x": 800,
      "sphere_center_distance_y": 300,
      "shape_type": "rectangular_capsule"
    },
    "pose": {
      "position": [
        -1200,
        0,
        1000
      ],
      "orientation": [
        0,
        0,
        0
      ]
    }
  }
}

export const dhParams: DHParameter[] = [
  {
    "alpha": 1.5707963267948966,
    "theta": 0,
    "a": 0,
    "d": 162.25,
    "reverse_rotation_direction": false
  },
  {
    "alpha": 0,
    "theta": 0,
    "a": -425,
    "d": 0,
    "reverse_rotation_direction": false
  },
  {
    "alpha": 0,
    "theta": 0,
    "a": -392.2,
    "d": 0,
    "reverse_rotation_direction": false
  },
  {
    "alpha": 1.5707963267948966,
    "theta": 0,
    "a": 0,
    "d": 133.3,
    "reverse_rotation_direction": false
  },
  {
    "alpha": -1.5707963267948966,
    "theta": 0,
    "a": 0,
    "d": 99.7,
    "reverse_rotation_direction": false
  },
  {
    "alpha": 0,
    "theta": 0,
    "a": 0,
    "d": 99.6,
    "reverse_rotation_direction": false
  }
]