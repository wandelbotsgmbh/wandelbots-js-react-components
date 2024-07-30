import type * as THREE from "three";
export type RobotSceneJoint = THREE.Object3D;
export declare const defaultJointNamePattern = "(^joint_[0-9]+$)|(_J[0-9]+$)";
export declare function getAllObjects(root: THREE.Object3D): THREE.Object3D[];
export declare function getAllJointsByName(rootObject: THREE.Object3D, jointNamePattern?: string): RobotSceneJoint[];
