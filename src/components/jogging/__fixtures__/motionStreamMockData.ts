/**
 * Real motion state data captured from websocket connections
 * to actual robot controllers, converted to MotionGroupState format.
 */
import { JointTypeEnum } from "@wandelbots/nova-js/v2"
import type {
  MotionGroupState,
  MotionGroupDescription,
  DHParameter,
} from "@wandelbots/nova-js/v2"

// ---------------------------------------------------------------------------
// UR5e – 6 revolute joints
// ---------------------------------------------------------------------------

export const ur5eMotionGroupState: MotionGroupState = {
  motion_group: "0@ur5emock",
  controller: "ur5emock",
  joint_position: [
    0, -1.5709999799728394, -1.5709999799728394, -1.5709999799728394,
    1.5709999799728394, -1.5709999799728394,
  ],
  joint_limit_reached: {
    limit_reached: [false, false, false, false, false, false],
  },
  tcp_pose: {
    position: [491.9256498952305, -133.27971614361718, 487.42935363090754],
    orientation: [
      -3.1413887753705083, -0.0003197791888075772, 0.000959598168759525,
    ],
  },
  tcp: "Flange",
  flange_pose: {
    position: [491.9256498952305, -133.27971614361718, 487.42935363090754],
    orientation: [
      -3.1413887753705083, -0.0003197791888075772, 0.000959598168759525,
    ],
  },
  coordinate_system: "",
  standstill: true,
  sequence_number: 38283,
  timestamp: "2026-04-24T08:23:04.230859905Z",
  description_revision: 0,
}

export const ur5eDhParameters: DHParameter[] = Array.from(
  { length: 6 },
  () => ({ type: JointTypeEnum.RevoluteJoint }) as DHParameter,
)

export const ur5eDescription: MotionGroupDescription = {
  motion_group_model: "ur5e",
  cycle_time: 0.004,
  mounting: {},
  operation_limits: { auto_limits: { joints: [] } },
  dh_parameters: ur5eDhParameters,
} as unknown as MotionGroupDescription

// ---------------------------------------------------------------------------
// Turn mock – 2 revolute joints
// ---------------------------------------------------------------------------

export const turnMockMotionGroupState: MotionGroupState = {
  motion_group: "0@turnmock",
  controller: "turnmock",
  joint_position: [0, 0],
  joint_limit_reached: {
    limit_reached: [false, false],
  },
  tcp_pose: {
    position: [0, 0, 0],
    orientation: [0, 0, 0],
  },
  tcp: "",
  flange_pose: {
    position: [0, 0, 0],
    orientation: [0, 0, 0],
  },
  coordinate_system: "",
  standstill: true,
  sequence_number: 31111,
  timestamp: "2026-04-24T08:26:21.729120996Z",
  description_revision: 0,
}

export const turnMockDhParameters: DHParameter[] = Array.from(
  { length: 2 },
  () => ({ type: JointTypeEnum.RevoluteJoint }) as DHParameter,
)

export const turnMockDescription: MotionGroupDescription = {
  motion_group_model: "turnmock",
  cycle_time: 0.004,
  mounting: {},
  operation_limits: { auto_limits: { joints: [] } },
  dh_parameters: turnMockDhParameters,
} as unknown as MotionGroupDescription

// ---------------------------------------------------------------------------
// Linear axis mock – 1 prismatic joint
// ---------------------------------------------------------------------------

export const linearAxisMotionGroupState: MotionGroupState = {
  motion_group: "0@linearaxismock",
  controller: "linearaxismock",
  joint_position: [0],
  joint_limit_reached: {
    limit_reached: [false],
  },
  tcp_pose: {
    position: [0, 0, 0],
    orientation: [0, 0, 0],
  },
  tcp: "Flange",
  flange_pose: {
    position: [0, 0, 0],
    orientation: [0, 1.5707963267948966, 0],
  },
  coordinate_system: "",
  standstill: true,
  sequence_number: 40497,
  timestamp: "2026-04-24T08:27:41.630099378Z",
  description_revision: 0,
}

export const linearAxisDhParameters: DHParameter[] = [
  { type: JointTypeEnum.PrismaticJoint } as DHParameter,
]

export const linearAxisDescription: MotionGroupDescription = {
  motion_group_model: "linearaxismock",
  cycle_time: 0.004,
  mounting: {},
  operation_limits: { auto_limits: { joints: [] } },
  dh_parameters: linearAxisDhParameters,
} as unknown as MotionGroupDescription
