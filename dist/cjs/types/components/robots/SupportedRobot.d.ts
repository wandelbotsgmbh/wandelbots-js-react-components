import { type GroupProps } from "@react-three/fiber";
import type { ConnectedMotionGroup } from "@wandelbots/wandelbots-js";
export type DHRobotProps = {
    connectedMotionGroup: ConnectedMotionGroup;
} & GroupProps;
export type RobotProps = {
    connectedMotionGroup: ConnectedMotionGroup;
    modelURL: string;
} & GroupProps;
export type SupportedRobotProps = {
    connectedMotionGroup: ConnectedMotionGroup;
    getModel?: (modelFromController: string) => string;
} & GroupProps;
export declare function SupportedRobot({ connectedMotionGroup, getModel, ...props }: SupportedRobotProps): import("react/jsx-runtime").JSX.Element;
