import { AxisConfig } from "./index";
import React, { RefObject } from "react";
import { Group } from "three";
interface AR2010Props {
    axisConfig: AxisConfig;
    planData?: any;
    isGhost: boolean;
    flangeRef: RefObject<Group>;
}
export declare function AR2010({ axisConfig, planData, isGhost, flangeRef, ...props }: AR2010Props): React.JSX.Element;
export {};
