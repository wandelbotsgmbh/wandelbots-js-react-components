import { AxisConfig } from "./index";
import React, { RefObject } from "react";
import { Group } from "three";
interface AR1440Props {
    axisConfig: AxisConfig;
    planData?: any;
    isGhost: boolean;
    flangeRef: RefObject<Group>;
}
export declare function AR1440({ axisConfig, planData, isGhost, flangeRef, ...props }: AR1440Props): React.JSX.Element;
export {};
