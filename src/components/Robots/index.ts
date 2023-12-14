// export { RobotType, parseRobotType } from "./RobotType";
// export { AxisConfig, defaultAxisConfig } from "./AxisConfig";
export { AnyRobot } from "./AnyRobot";
export { AR1440 } from "./AR1440";
export { AR2010 } from "./AR2010";
export { UR5e } from "./UR5e";
export { UR10e } from "./UR10e";

// This should not be necessary. For some reason `npm run build` fails when contents of 
// a ts file in this directory are re-exported and not declared here directly.

export interface AxisConfig {
  axis_1: number;
  axis_2: number;
  axis_3: number;
  axis_4: number;
  axis_5: number;
  axis_6: number;
  useSkill: boolean;
  showCalibrationPoints: boolean;
}

export const defaultAxisConfig: AxisConfig = {
  axis_1: 2 * Math.PI,
  axis_2: 2 * Math.PI,
  axis_3: 2 * Math.PI,
  axis_4: 2 * Math.PI,
  axis_5: 2 * Math.PI,
  axis_6: 2 * Math.PI,
  useSkill: false,
  showCalibrationPoints: false,
};

export type RobotType = "ur5e" | "ur10e" | "ar1440" | "ar2010";

export function parseRobotType(input: string): RobotType {
  if (input.includes("ur10")) {
    return "ur10e";
  }
  if (input.includes("ur5")) {
    return "ur5e";
  }
  if (input.includes("ar1440")) {
    return "ar1440";
  }
  if (input.includes("ar2010")) {
    return "ar2010";
  }
  return "ur10e";
}
