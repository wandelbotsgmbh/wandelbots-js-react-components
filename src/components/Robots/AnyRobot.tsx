import { AR1440 } from "./AR1440";
import { AR2010 } from "./AR2010";
import { UR5e } from "./UR5e";
import { UR10e } from "./UR10e";
import { RefObject } from "react";
import { Group } from "three";
import { RobotType } from "./index";
import { AxisConfig } from "./index";
// @ts-ignore
import React from "react";

interface AnyRobotProps {
  robotType: RobotType;
  axisConfig: AxisConfig;
  isGhost: boolean;
  flangeRef: RefObject<Group>;
}

export function AnyRobot({ robotType, axisConfig, isGhost, flangeRef }: AnyRobotProps) {
  let robot: JSX.Element;

  switch (robotType) {
    case "ur5e":
      robot = <UR5e axisConfig={axisConfig} isGhost={isGhost} flangeRef={flangeRef} />;
      break;
    case "ur10e":
      robot = <UR10e axisConfig={axisConfig} isGhost={isGhost} flangeRef={flangeRef} />;
      break;
    case "ar1440":
      robot = <AR1440 axisConfig={axisConfig} isGhost={isGhost} flangeRef={flangeRef} />;
      break;
    case "ar2010":
      robot = <AR2010 axisConfig={axisConfig} isGhost={isGhost} flangeRef={flangeRef} />;
      break;
  }

  return (
    <group rotation={[Math.PI / 2, Math.PI * 2, 0]}>
      {robot}
    </group>
  )

}
