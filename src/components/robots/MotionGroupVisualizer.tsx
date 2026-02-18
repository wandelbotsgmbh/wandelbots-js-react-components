import React, { useCallback, useEffect, useMemo, useState } from "react"
import { NovaClient } from "@wandelbots/nova-js/v2"
import type { KinematicModel } from "@wandelbots/nova-api/v2"

import { externalizeComponent } from "../../externalizeComponent"
import { SupportedRobot, type SupportedRobotProps } from "./SupportedRobot"
import { SupportedLinearAxis, type SupportedLinearAxisProps } from "./SupportedLinearAxis"

export type MotionGroupVisualizerProps = {
  instanceUrl: string
  inverseSolver?: string | null
} & (SupportedRobotProps | SupportedLinearAxisProps)

export const MotionGroupVisualizer: React.FC<MotionGroupVisualizerProps> = externalizeComponent((props: MotionGroupVisualizerProps) => {
  const { instanceUrl, inverseSolver: inverseSolverProp, modelFromController, ...rest } = props

  const [inverseSolver, setInverseSolver] = useState<string | null | undefined>(inverseSolverProp)

  /**
   * Fetches the kinematic model from the API and saved the inverse_solver property, which defined
   * whether the motion group should be displayed as a robot or linear axis
   */
  const fetchKinematicModel = useCallback(async () => {
    const nova = new NovaClient({ instanceUrl })
    
    console.log('NOVA CLIENT', instanceUrl, nova)

    try {
      const kinematicModel: KinematicModel = await nova.api.motionGroupModels.getMotionGroupKinematicModel(
        modelFromController,
      )

      setInverseSolver(kinematicModel.inverse_solver)
    } catch (err) {
      console.warn(`Failed to fetch kinematic model from API for ${modelFromController}, falling back to local config`)
    }
  }, [modelFromController, instanceUrl])

  /**
   * Checks the delivered inverseSolver property from the consumer
   * Defined, Null - carry on with the delivered value - the inverseSolver was fetched via consumer app
   * Undefined - carry out a request to fetch the inverseSolver value
   */
  useEffect(() => {
    const shouldKinematicBeFetched = inverseSolverProp === undefined && !!modelFromController && !!instanceUrl

    if (shouldKinematicBeFetched) {
      fetchKinematicModel()
    }
  }, [inverseSolverProp, modelFromController, fetchKinematicModel, instanceUrl])

  /**
   * The turntable models return inverseSolver = null - however these models
   * should be rendered with SupportedRobot instead of SupportedLinearAxis
   *
   * In the future - this hard coded check would be replaced with a new "type" property
   * from dh parameters
   */
  const isTurnTable = useMemo(() => {
    return ["KUKA_DK250", "KUKA_DK500", "YASKAWA_TURN1", "YASKAWA_TURN2", "YASKAWA_TURN3"]
      .includes(modelFromController)
  }, [modelFromController])

  if (inverseSolver || isTurnTable) {
    return (
      <SupportedRobot modelFromController={modelFromController} {...rest} />
    )
  }

  if (inverseSolver === null) {
    return (
      <SupportedLinearAxis modelFromController={modelFromController} {...rest} />
    )
  }

  return null
})