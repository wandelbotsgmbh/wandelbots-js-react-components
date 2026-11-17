import { Matrix4, Quaternion, Vector3 } from "three"
import { jogFrameInCamera } from "../jogGizmoProjection"

/**
 * The jog frame as a camera sees it that looks at it from `azimuth` and
 * `elevation`, in degrees, with Z up
 */
export function seenFrom(azimuth: number, elevation: number) {
  const a = (azimuth * Math.PI) / 180
  const e = (elevation * Math.PI) / 180
  const eye = new Vector3(
    Math.cos(e) * Math.cos(a),
    Math.cos(e) * Math.sin(a),
    Math.sin(e),
  )
  const camera = new Quaternion().setFromRotationMatrix(
    new Matrix4().lookAt(eye, new Vector3(), new Vector3(0, 0, 1)),
  )
  return jogFrameInCamera(camera, new Quaternion())
}

/**
 * Views from all around, as [azimuth, elevation] in degrees: also straight
 * along each axis and from right above and below
 */
export const VIEWS: readonly [number, number][] = (() => {
  const views: [number, number][] = []
  for (let azimuth = 0; azimuth < 360; azimuth += 15) {
    for (let elevation = -75; elevation <= 75; elevation += 15) {
      views.push([azimuth, elevation])
    }
    views.push([azimuth, 89.9], [azimuth, 87], [azimuth, -89.9])
  }
  return views
})()
