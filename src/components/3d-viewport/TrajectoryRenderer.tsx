import { Line } from "@react-three/drei"
import type { Pose } from "@wandelbots/nova-js/v2"
import * as THREE from "three"

export type TrajectoryRendererProps = {
  trajectory: Pose[]
} & React.JSX.IntrinsicElements["group"]

export function TrajectoryRenderer({
                                     trajectory,
                                     ...props
                                   }: TrajectoryRendererProps) {
  const points =
    trajectory
      ?.map((pose: Pose) => {
        if (pose.position?.length) {
          return new THREE.Vector3(
            pose.position[0] / 1000,
            pose.position[2] / 1000,
            -pose.position[1] / 1000,
          )
        }
        return null
      })
      .filter((point): point is THREE.Vector3 => point !== null) || []

  return (
    <group {...props}>
      {points.length > 0 && (
        <Line
          points={points}
          lineWidth={3}
          polygonOffset={true}
          polygonOffsetFactor={10}
          polygonOffsetUnits={10}
        />
      )}
    </group>
  )
}
