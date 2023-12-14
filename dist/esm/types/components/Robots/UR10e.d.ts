import { AxisConfig } from "./index";
import React, { RefObject } from "react";
import { Group } from "three";
interface UR10eProps {
    axisConfig: AxisConfig;
    planData?: any;
    isGhost: boolean;
    flangeRef: RefObject<Group>;
}
export declare function UR10e({ axisConfig, planData, isGhost, flangeRef, ...props }: UR10eProps): React.JSX.Element;
export {};
