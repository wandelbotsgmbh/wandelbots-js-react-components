import { JointTypeEnum } from "@wandelbots/nova-js/v2"
import type React from "react"
import { useEffect, useMemo, useState } from "react"

import { externalizeComponent } from "../../externalizeComponent"
import { useSmoothedMotionState } from "../utils/useSmoothedMotionState"
import {
  SupportedLinearAxisExact,
  type SupportedLinearAxisProps,
} from "./SupportedLinearAxis"
import { SupportedRobotExact, type SupportedRobotProps } from "./SupportedRobot"

export type MotionGroupVisualizerProps = {
  instanceUrl: string
  inverseSolver?: string | null
} & (SupportedRobotProps | SupportedLinearAxisProps)

/**
 * Picks the right visualizer for the motion group (robot, turntable or linear
 * axis) and renders it at exactly the pose it is given — no smoothing.
 *
 * For spring-damped transitions, use {@link MotionGroupVisualizer}.
 */
export const MotionGroupVisualizerExact: React.FC<MotionGroupVisualizerProps> =
  externalizeComponent((props: MotionGroupVisualizerProps) => {
    const { inverseSolver, dhParameters, ...rest } = props

    /**
     * Joint type to find out - in combination with inverseSolver - whether the
     * active robot is a turn table
     */
    const [jointType, setJointType] = useState<JointTypeEnum>(
      JointTypeEnum.RevoluteJoint,
    )

    /**
     * Sets the joint type according to delivered dh parameter type
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
      return (
        inverseSolver === null && jointType === JointTypeEnum.PrismaticJoint
      )
    }, [inverseSolver, jointType])

    /**
     * Robot differentiation for readability reasons
     */
    const isRobot = useMemo(() => {
      return !!inverseSolver
    }, [inverseSolver])

    if (isRobot || isTurnTable) {
      return <SupportedRobotExact dhParameters={dhParameters} {...rest} />
    }

    if (isLinearAxis) {
      return <SupportedLinearAxisExact dhParameters={dhParameters} {...rest} />
    }

    return null
  })

/**
 * Motion group visualizer with built-in spring smoothing of the joint stream.
 *
 * Thin wrapper that runs the incoming motion state through
 * {@link useSmoothedMotionState} and renders {@link MotionGroupVisualizerExact}.
 * It is the batteries-included default; drop down to `MotionGroupVisualizerExact`
 * when you need to control or disable smoothing.
 */
export const MotionGroupVisualizer: React.FC<MotionGroupVisualizerProps> =
  externalizeComponent((props: MotionGroupVisualizerProps) => {
    const smoothedMotionState = useSmoothedMotionState(
      props.rapidlyChangingMotionState,
    )

    return (
      <MotionGroupVisualizerExact
        {...props}
        rapidlyChangingMotionState={smoothedMotionState}
      />
    )
  })

export default MotionGroupVisualizer
