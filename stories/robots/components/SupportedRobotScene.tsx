import { SupportedRobot } from "../../../src/components/robots/SupportedRobot"
import { rapidlyChangingMotionState } from "./motionState"
import { useZoomCameraToScene } from "./useZoomCameraToScene"

export default function SupportedRobotScene(
  props: React.ComponentProps<typeof SupportedRobot>,
) {
  const { cameraUpdated } = useZoomCameraToScene()

  function getLocalModel(modelFromController: string): string {
    return `/models/${modelFromController}.glb`
  }

  return (
    <group visible={cameraUpdated}>
      <SupportedRobot
        {...props}
        getModel={getLocalModel}
        rapidlyChangingMotionState={rapidlyChangingMotionState}
        dhParameters={JSON.parse("[]")}
      />
    </group>
  )
}
