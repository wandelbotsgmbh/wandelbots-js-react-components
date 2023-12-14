export { AnyRobot } from "./AnyRobot";
export { AR1440 } from "./AR1440";
export { AR2010 } from "./AR2010";
export { UR5e } from "./UR5e";
export { UR10e } from "./UR10e";
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
export declare const defaultAxisConfig: AxisConfig;
export type RobotType = "ur5e" | "ur10e" | "ar1440" | "ar2010";
export declare function parseRobotType(input: string): RobotType;
