import type { DHParameter, MotionGroupDescription } from "@wandelbots/nova-js/v2"

export const safetyZonesHull: MotionGroupDescription['safety_zones'] = {
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

export const safetyZonesPlane: MotionGroupDescription['safety_zones'] = {
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

export const safetyZonesSphere: MotionGroupDescription['safety_zones'] = {
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

export const safetyZonesCapsule: MotionGroupDescription['safety_zones'] = {
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

export const safetyZonesPrism: MotionGroupDescription['safety_zones'] = {
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

export const safetyZonesLozenge: MotionGroupDescription['safety_zones'] = {
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