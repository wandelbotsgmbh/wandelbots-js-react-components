import { AxisConfig } from "./index";
import React, { RefObject } from "react";
import { Group } from "three";
interface UR5eProps {
    axisConfig: AxisConfig;
    planData?: any;
    isGhost: boolean;
    flangeRef: RefObject<Group>;
}
export declare function UR5e({ axisConfig, planData, isGhost, flangeRef, ...props }: UR5eProps): React.JSX.Element;
export {};
