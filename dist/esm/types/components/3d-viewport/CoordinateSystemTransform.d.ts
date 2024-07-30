import type { CoordinateSystem } from "@wandelbots/wandelbots-api-client";
import type { ReactNode } from "react";
/**
 * Applies a API coordinate system transformation to
 * all react-three child components.
 */
export declare const CoordinateSystemTransform: ({ coordinateSystem, children, }: {
    coordinateSystem?: CoordinateSystem;
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
