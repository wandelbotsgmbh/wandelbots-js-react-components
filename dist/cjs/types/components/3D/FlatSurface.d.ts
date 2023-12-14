import { Vector3, Color } from "three";
import React from "react";
import "../../extensions";
export interface FlatSurfaceProps {
    positions: Vector3[];
    color?: Color | string;
    outline?: boolean;
    outlineColor?: Color | string;
    onClick?: () => void;
}
export declare function FlatSurface(props: FlatSurfaceProps): React.JSX.Element;
