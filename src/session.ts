// The library without React: a robot of a NOVA cell, loaded and connected,
// for every app, also one without the library's UI. Loads no React, no MUI
// and no three.js. `/core` exports all of this too.

// Jogging the robot, with the user's jogging settings
export {
  JoggingRefusedError,
  type JoggingRefusedReason,
} from "./components/jogging/JoggingRefusedError"
export {
  JoggingStore,
  type JoggingStoreOptions,
  type JoggingStoreStorage,
} from "./components/jogging/JoggingStore"
// A pose or joints as copied: "(x, y, z, rx, ry, rz)", "[j1, …]"
export {
  jointsToText,
  poseToText,
} from "./components/robotControl/poseText"
export type { ConnectionLogger } from "./lib/connectionLogger"
// What a session's live state reads (`session.state.stream`); the session
// makes it
export { ControllerStateStream } from "./lib/ControllerStateStream"
export type { ControllerStateSource } from "./lib/controllerStateSource"
export * from "./lib/JoggerConnection"
export * from "./lib/MotionStreamConnection"
export {
  jointValuesEqual,
  type MotionStateReadout,
  poseEqual,
  tcpMotionEqual,
  unwrapRotationVector,
} from "./lib/motionStateUpdate"
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
export type { RobotPose } from "./lib/robotSession/robotPose"
// Move to of a session (`session.trajectory`); the session makes it
export {
  type PlannedTrajectory,
  type PlanTrajectoryResult,
  TrajectoryExecutionStore,
  type TrajectoryState,
  type TrajectoryTarget,
} from "./lib/TrajectoryExecutionStore"
