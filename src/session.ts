// The library without React: a robot of a NOVA cell, loaded and connected,
// for every app, also one without the library's UI. Loads no React, no MUI
// and no three.js. `/core` exports all of this too.

// Jogging the robot, with the user's jogging settings
export {
  JoggingStore,
  type JoggingStoreOptions,
  type JoggingStoreStorage,
} from "./components/jogging/JoggingStore"
// A pose or joints as typed and copied: "(x, y, z, rx, ry, rz)", "[j1, …]"
export {
  jointsToText,
  parseJointsText,
  parsePoseText,
  poseToText,
} from "./components/robotControl/poseText"
export type { ConnectionLogger } from "./lib/connectionLogger"
export {
  ControllerStateStream,
  type ControllerStateStreamError,
  type ControllerStateStreamOptions,
  MOTION_DELTA_THRESHOLD,
} from "./lib/ControllerStateStream"
export {
  type ControllerStateSource,
  controllerStateWebsocket,
} from "./lib/controllerStateSource"
export * from "./lib/JoggerConnection"
export * from "./lib/MotionStreamConnection"
export * from "./lib/motionStateUpdate"
export type { NovaConnection } from "./lib/novaConnection"
export { planErrorTranslationKey } from "./lib/planErrorTranslation"
// Pose math with plain numbers
export {
  deriveSelectedTcpPose,
  type ReferencedPose,
  resolveCoordinateSystemInWorld,
  type TcpReferencedPose,
  transformPoseToCoordinateSystem,
} from "./lib/PoseTransformer"
// A robot of a NOVA cell, loaded and connected
export {
  type LoadRobotSessionOptions,
  loadRobotSession,
  type RobotSessionEvent,
  RobotSessionLoad,
  type RobotSessionLoadState,
} from "./lib/robotSession/loadRobotSession"
export {
  RobotActivation,
  type RobotActivationState,
  RobotModeChangeError,
} from "./lib/robotSession/RobotActivation"
export { RobotDescription } from "./lib/robotSession/RobotDescription"
export {
  isRobotLoadStepError,
  ROBOT_LOAD_STEP_IDS,
  RobotLoadProgress,
  type RobotLoadStep,
  RobotLoadStepError,
  type RobotLoadStepId,
  type RobotLoadStepStatus,
} from "./lib/robotSession/RobotLoadProgress"
export { RobotLiveState } from "./lib/robotSession/RobotLiveState"
export {
  type RobotNotMoveableReason,
  RobotSafety,
} from "./lib/robotSession/RobotSafety"
export {
  RobotSession,
  type RobotSessionError,
  type RobotSessionOptions,
} from "./lib/robotSession/RobotSession"
export {
  RobotTargetPose,
  type StagedTargetPose,
} from "./lib/robotSession/RobotTargetPose"
export {
  type RobotPose,
  trajectoryTargetOf,
} from "./lib/robotSession/robotPose"
export * from "./lib/TrajectoryExecutionStore"
