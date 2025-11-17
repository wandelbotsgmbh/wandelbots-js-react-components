import type { MotionGroupState } from "@wandelbots/nova-js/v2"

export const rapidlyChangingMotionState: MotionGroupState = {
  motion_group: "",
  controller: "",
  joint_position: [0, 0, 0, 0, 0, 0],
  tcp_pose: {
    position: [0, 0, 0],
    orientation: [0, 0, 0],
  },
  joint_limit_reached: {
    limit_reached: [false, false, false, false, false, false],
  },
  sequence_number: 0,
  standstill: true,
  timestamp: "2025-11-10T11:19:05.409098209Z",
}
