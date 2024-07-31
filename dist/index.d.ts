import * as react_jsx_runtime from 'react/jsx-runtime';
import { GroupProps } from '@react-three/fiber';
import { ConnectedMotionGroup, SafetySetupSafetyZone } from '@wandelbots/wandelbots-js';

type DHRobotProps = {
    connectedMotionGroup: ConnectedMotionGroup;
} & GroupProps;
type RobotProps = {
    connectedMotionGroup: ConnectedMotionGroup;
    modelURL: string;
} & GroupProps;
type SupportedRobotProps = {
    connectedMotionGroup: ConnectedMotionGroup;
    getModel?: (modelFromController: string) => string;
} & GroupProps;
declare function SupportedRobot({ connectedMotionGroup, getModel, ...props }: SupportedRobotProps): react_jsx_runtime.JSX.Element;

type AxisConfig = number[];
declare const defaultAxisConfig: AxisConfig;

/**
 * Renders a preset environment for the 3D scene.
 * This component wraps the scene with an `Environment` component
 * and builds a lightmap build with `Lightformers`.
 */
declare function PresetEnvironment(): react_jsx_runtime.JSX.Element;

type SafetyZonesRendererProps = {
    safetyZones: SafetySetupSafetyZone[];
} & GroupProps;
declare function SafetyZonesRenderer({ safetyZones, ...props }: SafetyZonesRendererProps): react_jsx_runtime.JSX.Element;

export { AxisConfig, DHRobotProps, PresetEnvironment, RobotProps, SafetyZonesRenderer, SafetyZonesRendererProps, SupportedRobot, SupportedRobotProps, defaultAxisConfig };
