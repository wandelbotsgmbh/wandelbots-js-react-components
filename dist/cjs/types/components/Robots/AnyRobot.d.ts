import { RefObject } from "react";
import { Group } from "three";
import { RobotType } from "./index";
import { AxisConfig } from "./index";
import React from "react";
interface AnyRobotProps {
    robotType: RobotType;
    axisConfig: AxisConfig;
    isGhost: boolean;
    flangeRef: RefObject<Group>;
}
export declare function AnyRobot({ robotType, axisConfig, isGhost, flangeRef }: AnyRobotProps): React.JSX.Element;
export {};
