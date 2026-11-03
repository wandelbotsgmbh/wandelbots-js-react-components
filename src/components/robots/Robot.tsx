import type { ThreeElements } from "@react-three/fiber"
import { useCallback } from "react"
import type { Group } from "three"
import type { ConnectedMotionGroup } from "../../lib/ConnectedMotionGroup"
import { defaultGetModel } from "./robotModelLogic"
import { SupportedRobot } from "./SupportedRobot"

export type RobotProps = {
  connectedMotionGroup: ConnectedMotionGroup
  getModel?: (modelFromController: string) => Promise<string>
  flangeRef?: React.Ref<Group>
  transparentColor?: string
  postModelRender?: () => void
} & ThreeElements["group"]

/**
 * The Robot component is a wrapper around the SupportedRobot component
 * for usage with @wandelbots/nova-js ConnectedMotionGroup object.
 *
 * @param {RobotProps} props - The properties for the Robot component.
 * @param {ConnectedMotionGroup} props.connectedMotionGroup - The connected motion group containing motion state and parameters.
 * @param {Function} [props.getModel] - Optional function to get the model URL. Defaults to defaultGetModel with the connection of the connected motion group (its URL and access token).
 * @param {Object} props - Additional properties passed to the SupportedRobot component.
 *
 * @returns {JSX.Element} The rendered SupportedRobot component.
 */
export function Robot({
  connectedMotionGroup,
  getModel,
  flangeRef,
  transparentColor,
  postModelRender,
  ...props
}: RobotProps) {
  // The model from the instance of the motion group, with the access token
  // of its connection
  const getModelOfConnection = useCallback(
    (model: string) => defaultGetModel(model, connectedMotionGroup.nova),
    [connectedMotionGroup],
  )

  if (!connectedMotionGroup.dhParameters) {
    return null
  }

  const mountingPosition = connectedMotionGroup.mountingPosition
  const mountingQuaternion = connectedMotionGroup.mountingQuaternion

  return (
    <SupportedRobot
      rapidlyChangingMotionState={
        connectedMotionGroup.rapidlyChangingMotionState
      }
      modelFromController={connectedMotionGroup.modelFromController || ""}
      dhParameters={connectedMotionGroup.dhParameters}
      getModel={getModel ?? getModelOfConnection}
      flangeRef={flangeRef}
      transparentColor={transparentColor}
      postModelRender={postModelRender}
      chainOffsetPosition={mountingPosition}
      chainOffsetQuaternion={mountingQuaternion}
      {...props}
    />
  )
}

export { defaultGetModel }

export default Robot
