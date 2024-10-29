import { useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { Box3, PerspectiveCamera } from "three"
import { degToRad } from "three/src/math/MathUtils.js"

export function useZoomCameraToScene() {
  const [cameraUpdated, setCameraUpdated] = useState(false)
  const { camera, scene, invalidate } = useThree()

  function getDistanceToFitSphere(radius: number): number {
    if (!(camera instanceof PerspectiveCamera)) {
      return 0
    }

    // https://stackoverflow.com/a/44849975
    const vFOV = degToRad(camera.getEffectiveFOV())
    const hFOV = Math.atan(Math.tan(vFOV * 0.5) * camera.aspect) * 2
    const fov = 1 < camera.aspect ? vFOV : hFOV
    return radius / Math.sin(fov * 0.5)
  }

  function fitCameraToScene() {
    console.log(scene)
    console.log(camera)
    const rootGroup = scene.children[0]
    const box = new Box3().setFromObject(rootGroup, true)
    console.log(box.min, box.max)

    console.log(box)

    const sphereRadius = Math.max(
      box.max.x,
      Math.abs(box.min.x),
      box.max.y,
      Math.abs(box.min.y),
      box.max.z,
      Math.abs(box.min.z),
    )

    const fitSphereRadius = getDistanceToFitSphere(sphereRadius)
    console.log(sphereRadius, fitSphereRadius)

    camera.position.set(fitSphereRadius, fitSphereRadius, fitSphereRadius)
    camera.updateMatrix()

    setCameraUpdated(true)
  }

  useEffect(() => {
    fitCameraToScene()
  }, [])

  return { cameraUpdated }
}
