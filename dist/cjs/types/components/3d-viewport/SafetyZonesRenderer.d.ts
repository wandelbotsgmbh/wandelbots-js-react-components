import { SafetySetupSafetyZone } from "@wandelbots/wandelbots-js";
import { type GroupProps } from "@react-three/fiber";
export type SafetyZonesRendererProps = {
    safetyZones: SafetySetupSafetyZone[];
} & GroupProps;
export declare function SafetyZonesRenderer({ safetyZones, ...props }: SafetyZonesRendererProps): import("react/jsx-runtime").JSX.Element;
