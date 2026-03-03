import React, { useEffect, useMemo, useState } from "react"
import { JointTypeEnum } from "@wandelbots/nova-js/v2"

import { externalizeComponent } from "../../externalizeComponent"
import { SupportedRobot, type SupportedRobotProps } from "./SupportedRobot"
import { SupportedLinearAxis, type SupportedLinearAxisProps } from "./SupportedLinearAxis"

export type MotionGroupVisualizerProps = {
  instanceUrl: string
  inverseSolver?: string | null
} & (SupportedRobotProps | SupportedLinearAxisProps)

export const MotionGroupVisualizer: React.FC<MotionGroupVisualizerProps> = externalizeComponent((props: MotionGroupVisualizerProps) => {
  const {
    inverseSolver,
    dhParameters,
    ...rest
  } = props

  /**
   * Joint type to find out - in combination with inverseSolver - whether the
   * active robot is a turn table
   */
  const [jointType, setJointType] = useState<JointTypeEnum>(JointTypeEnum.RevoluteJoint)

  /**
   * Sets the joint type according to delivered dh parameter type
   *
   * TODO as soon as V2 api migration is done, the setting of the default RevoluteJoint value should be
   *  deleted, cause the type property is expected to be always delivered. It is not the case in the V1 at the
   *  moment.
   */
  useEffect(() => {
    if (dhParameters.length) {
      setJointType(dhParameters[0].type ?? JointTypeEnum.RevoluteJoint)
    }
  }, [dhParameters])

  /**
   * The turntable models return inverseSolver = null - however these models
   * should be rendered with SupportedRobot instead of SupportedLinearAxis
   */
  const isTurnTable = useMemo(() => {
    return inverseSolver === null && jointType === JointTypeEnum.RevoluteJoint
  }, [inverseSolver, jointType])

  /**
   * Linear axis check
   */
  const isLinearAxis = useMemo(() => {
    return inverseSolver === null && jointType === JointTypeEnum.PrismaticJoint
  }, [inverseSolver, jointType])

  /**
   * Robot differentiation for readability reasons
   */
  const isRobot = useMemo(() => {
    return !!inverseSolver
  }, [inverseSolver])


  if (isRobot || isTurnTable) {
    return (
      <SupportedRobot dhParameters={dhParameters} {...rest} />
    )
  }

  if(isLinearAxis) {
    return (
      <SupportedLinearAxis dhParameters={dhParameters} {...rest} />
    )
  }

  return <></>
})