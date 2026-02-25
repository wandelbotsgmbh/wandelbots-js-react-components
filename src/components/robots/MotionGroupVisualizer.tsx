import React, { useMemo } from "react"

import { externalizeComponent } from "../../externalizeComponent"
import { SupportedRobot, type SupportedRobotProps } from "./SupportedRobot"
import { SupportedLinearAxis, type SupportedLinearAxisProps } from "./SupportedLinearAxis"

export type MotionGroupVisualizerProps = {
  instanceUrl: string
  inverseSolver: string | null
  // TODO get this type from nova-js
  jointType: "REVOLUTE_JOINT" | "PRISMATIC_JOINT"
} & (SupportedRobotProps | SupportedLinearAxisProps)

export const MotionGroupVisualizer: React.FC<MotionGroupVisualizerProps> = externalizeComponent((props: MotionGroupVisualizerProps) => {
  const {
    inverseSolver,
    jointType,
    ...rest
  } = props

  /**
   * The turntable models return inverseSolver = null - however these models
   * should be rendered with SupportedRobot instead of SupportedLinearAxis
   */
  const isTurnTable = useMemo(() => {
    return !inverseSolver && jointType === "REVOLUTE_JOINT"
  }, [inverseSolver, jointType])

  if (inverseSolver || isTurnTable) {
    return (
      <SupportedRobot {...rest} />
    )
  }

  return (
    <SupportedLinearAxis {...rest} />
  )
})