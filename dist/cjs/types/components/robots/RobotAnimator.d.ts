import type * as THREE from "three";
import { type RobotSceneJoint } from "../utils/robotTreeQuery";
import type { ConnectedMotionGroup } from "@wandelbots/wandelbots-js";
type RobotAnimatorProps = {
    connectedMotionGroup: ConnectedMotionGroup;
    robotRootObjectName: string;
    onRotationChanged: (joints: THREE.Object3D[], jointValues: number[]) => void;
    jointCollector?: (rootObject: THREE.Object3D) => RobotSceneJoint[];
};
export default function RobotAnimator({ connectedMotionGroup, robotRootObjectName, onRotationChanged, jointCollector, }: RobotAnimatorProps): any;
export {};
