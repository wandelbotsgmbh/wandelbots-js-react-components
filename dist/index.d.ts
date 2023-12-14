import { Vector2, Vector3, Color, BufferGeometry, Group } from 'three';
import React, { RefObject } from 'react';
import { ButtonProps as ButtonProps$1 } from '@mui/material';

declare global {
    interface Array<T> {
        remove(value: T): Array<T>;
        group(count: number): Array<Array<T>>;
    }
}

declare module "three" {
    interface Vector3 {
        toVector2(): Vector2;
    }
}

interface FlatSurfaceProps {
    positions: Vector3[];
    color?: Color | string;
    outline?: boolean;
    outlineColor?: Color | string;
    onClick?: () => void;
}
declare function FlatSurface(props: FlatSurfaceProps): React.JSX.Element;

interface PointCloudBasicProps {
    size: number;
}
interface GeometryPointCloudProps extends PointCloudBasicProps {
    geometry: BufferGeometry;
}
interface BufferPointCloudProps extends PointCloudBasicProps {
    positions: Float32Array;
    colors: Float32Array;
}
type PointCloudProps = GeometryPointCloudProps | BufferPointCloudProps;
declare function PointCloud(props: PointCloudProps): React.JSX.Element;

declare function RotatingBox(props: any): React.JSX.Element;

type ButtonColor = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
interface ButtonProps extends ButtonProps$1 {
    label: string;
    color?: ButtonColor;
    onClick?: () => void;
    sx?: React.CSSProperties;
}
declare const Button: (props: ButtonProps) => React.JSX.Element;

interface AnyRobotProps {
    robotType: RobotType;
    axisConfig: AxisConfig;
    isGhost: boolean;
    flangeRef: RefObject<Group>;
}
declare function AnyRobot({ robotType, axisConfig, isGhost, flangeRef }: AnyRobotProps): React.JSX.Element;

interface AR1440Props {
    axisConfig: AxisConfig;
    planData?: any;
    isGhost: boolean;
    flangeRef: RefObject<Group>;
}
declare function AR1440({ axisConfig, planData, isGhost, flangeRef, ...props }: AR1440Props): React.JSX.Element;

interface AR2010Props {
    axisConfig: AxisConfig;
    planData?: any;
    isGhost: boolean;
    flangeRef: RefObject<Group>;
}
declare function AR2010({ axisConfig, planData, isGhost, flangeRef, ...props }: AR2010Props): React.JSX.Element;

interface UR5eProps {
    axisConfig: AxisConfig;
    planData?: any;
    isGhost: boolean;
    flangeRef: RefObject<Group>;
}
declare function UR5e({ axisConfig, planData, isGhost, flangeRef, ...props }: UR5eProps): React.JSX.Element;

interface UR10eProps {
    axisConfig: AxisConfig;
    planData?: any;
    isGhost: boolean;
    flangeRef: RefObject<Group>;
}
declare function UR10e({ axisConfig, planData, isGhost, flangeRef, ...props }: UR10eProps): React.JSX.Element;

interface AxisConfig {
    axis_1: number;
    axis_2: number;
    axis_3: number;
    axis_4: number;
    axis_5: number;
    axis_6: number;
    useSkill: boolean;
    showCalibrationPoints: boolean;
}
declare const defaultAxisConfig: AxisConfig;
type RobotType = "ur5e" | "ur10e" | "ar1440" | "ar2010";
declare function parseRobotType(input: string): RobotType;

export { AR1440, AR2010, AnyRobot, AxisConfig, Button, FlatSurface, FlatSurfaceProps, PointCloud, PointCloudProps, RobotType, RotatingBox, UR10e, UR5e, defaultAxisConfig, parseRobotType };
