import type { MotionGroupStateResponse } from "@wandelbots/nova-js/v1"

export const rapidlyChangingMotionState: MotionGroupStateResponse = {
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
    sequence_number: "0",
  },
}
