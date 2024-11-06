import { OrbitControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { type ReactNode, useCallback, useState } from "react"
import type { Group } from "three"
import { Box3, Sphere, Vector3 } from "three"

/**
 * Variant of OrbitControls that orbits the bounding sphere
 * of the component children, for e.g. demoing a model
 */
export function OrbitControlsAround({ children }: { children: ReactNode }) {
  const { scene, camera } = useThree()
  const [targetSphere, setTargetSphere] = useState(new Sphere())
  const [lockZoom, setLockZoom] = useState(true)

  const groupRef: React.RefCallback<Group> = useCallback(
    (group) => {
      if (!group) return

      const bbox = new Box3().setFromObject(scene)
      const center = bbox.getCenter(new Vector3())
      const bsphere = bbox.getBoundingSphere(new Sphere(center))
      setTargetSphere(bsphere)

      setTimeout(() => {
        setLockZoom(false)
      }, 100)
    },
    [camera],
  )

  return (
    <group ref={groupRef}>
      {children}
      <OrbitControls
        camera={camera}
        target={targetSphere.center.add(new Vector3(0, -0.1, 0))}
        minDistance={lockZoom ? targetSphere.radius * 3 : targetSphere.radius}
        maxDistance={lockZoom ? targetSphere.radius * 3 : 3}
      />
    </group>
  )
}
