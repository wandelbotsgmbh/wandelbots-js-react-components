import type { GroupProps } from "@react-three/fiber"
import type { Group } from "three"

export type RobotModelProps = {
  modelURL: string
  onModelLoaded?: () => void
  flangeRef?: React.Ref<Group>
} & GroupProps

/**
 * Configuration needed to render a specific robot model that
 * isn't already handled by the gltf => tsx export
 */
export type RobotModelConfig = {
  rotationOffsets?: number[]
  rotationSign?: number[]
}

export type RobotModelComponent = {
  (props: RobotModelProps): JSX.Element
  config?: RobotModelConfig
}
