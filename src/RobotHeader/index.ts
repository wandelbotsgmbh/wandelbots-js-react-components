// The header of a robot app: `@wandelbots/wandelbots-js-react-components/RobotHeader`.
// No three.js needed.
export type { AppItem } from "../components/AppHeader"
export type {
  RobotControlOption,
  RobotControlSelect,
} from "../components/robotControl/RobotControlPanel"
export {
  RobotHeader,
  RobotHeader as default,
  type RobotHeaderActivation,
  type RobotHeaderActivationState,
  type RobotHeaderProps,
} from "../components/robotHeader/RobotHeader"
export { robotActivationOf } from "../components/robotHeader/robotActivationOf"
export { robotSafetyOf } from "../components/robotHeader/robotSafetyOf"
export type { SafetyBarProps } from "../SafetyBar/SafetyBar"
// For the header's actions: a warning that the live state stopped arriving
export {
  type ConnectionQuality,
  ConnectionWarning,
  type ConnectionWarningProps,
} from "../components/connectionWarning/ConnectionWarning"
export { connectionWarningOf } from "../components/connectionWarning/connectionWarningOf"
