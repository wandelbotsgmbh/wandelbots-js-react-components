import { type GroupProps } from "@react-three/fiber"

import type { ConnectedMotionGroup } from "@wandelbots/wandelbots-js"
import { defaultGetModel, SupportedRobot } from "./SupportedRobot"

export type RobotProps = {
  connectedMotionGroup: ConnectedMotionGroup
  getModel?: (modelFromController: string) => string
  isGhost?: boolean
} & GroupProps

/**
 * The Robot component is a wrapper around the SupportedRobot component
 * for usage with @wandelbots/wandelbots-js ConnectedMotionGroup object.
 *
 * @param {RobotProps} props - The properties for the Robot component.
 * @param {ConnectedMotionGroup} props.connectedMotionGroup - The connected motion group containing motion state and parameters.
 * @param {Function} [props.getModel=defaultGetModel] - Optional function to get the model URL. Defaults to defaultGetModel.
 * @param {Object} props - Additional properties passed to the SupportedRobot component.
 *
 * @returns {JSX.Element} The rendered SupportedRobot component.
 */
export function Robot({
  connectedMotionGroup,
  getModel = defaultGetModel,
  isGhost = false,
  ...props
}: RobotProps) {
  if (!connectedMotionGroup.dhParameters) {
    return null
  }

  return (
    <SupportedRobot
      rapidlyChangingMotionState={
        connectedMotionGroup.rapidlyChangingMotionState
      }
      modelFromController={connectedMotionGroup.modelFromController || ""}
      dhParameters={connectedMotionGroup.dhParameters}
      getModel={getModel}
      isGhost={isGhost}
      {...props}
    />
  )
}
