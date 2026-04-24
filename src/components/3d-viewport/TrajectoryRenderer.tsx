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
        if (pose.position && pose.position.length >= 3) {
          const [x, y, z] = pose.position
          if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)) {
            return new THREE.Vector3(x / 1000, z / 1000, -y / 1000)
          }
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
