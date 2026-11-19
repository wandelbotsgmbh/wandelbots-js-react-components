import { Matrix4, type Object3D, Quaternion, Vector3 } from "three"
import type { JogAxis } from "../jogHandle"

// How the gizmo is turned: NOVA's axes as the camera of the app's 3D view
// sees them (from JoggingGizmoOrientation), and the jog frame on top of
// them (JoggingGizmo's frameQuaternion)

/** The unit vector along each axis */
export const UNIT_VECTOR: Record<JogAxis, Vector3> = {
  x: new Vector3(1, 0, 0),
  y: new Vector3(0, 1, 0),
  z: new Vector3(0, 0, 1),
}

/**
 * The jog frame as the camera sees it, `camera⁻¹ · frame`: what turns the
 * gizmo so that the handle pointing right on screen moves the robot right on
 * screen.
 *
 * Both are world orientations, so this works whichever axis is up in the
 * scene.
 */
export function jogFrameInCamera(
  cameraWorldQuaternion: Quaternion,
  frameWorldQuaternion: Quaternion,
  target = new Quaternion(),
): Quaternion {
  return target
    .copy(cameraWorldQuaternion)
    .invert()
    .multiply(frameWorldQuaternion)
}

/**
 * The dictionary from NOVA's axes to the 3D scene's: NOVA has Z up, the
 * scene (as that of this library's robots) Y up. NOVA's X is the scene's X,
 * its Y the scene's -Z, its Z the scene's Y. The teaching app's gizmo uses
 * the same table.
 */
export const NOVA_AXES_IN_SCENE = new Quaternion().setFromRotationMatrix(
  new Matrix4().makeBasis(
    new Vector3(1, 0, 0),
    new Vector3(0, 0, -1),
    new Vector3(0, 1, 0),
  ),
)

const cameraWorld = new Quaternion()

const NOVA_AXES_AS_THEY_ARE = new Quaternion()

/**
 * NOVA's axes in the 3D scene of `camera`, by which way its camera has up. A
 * scene that is Z up like NOVA's world (e.g. RobotPad's, whose camera's up is
 * Z) has NOVA's axes as they are. A scene that is Y up (this library's
 * robots, the teaching app) needs the dictionary.
 */
export function novaAxesInScene(camera: Object3D): Quaternion {
  return camera.up.z > 0.5 ? NOVA_AXES_AS_THEY_ARE : NOVA_AXES_IN_SCENE
}

/** NOVA's axes as `camera` sees them */
export function novaAxesSeenBy(
  camera: Object3D,
  target = new Quaternion(),
): Quaternion {
  camera.getWorldQuaternion(cameraWorld)
  return jogFrameInCamera(cameraWorld, novaAxesInScene(camera), target)
}

/**
 * The jog frame as the camera sees it: `view`, NOVA's axes as the camera
 * sees them (see {@link novaAxesSeenBy}), turned by `frame`, the jog frame
 * in NOVA's coordinates
 */
export function jogFrameInView(
  view: Quaternion,
  frame: Quaternion,
  target = new Quaternion(),
): Quaternion {
  return target.copy(view).multiply(frame)
}

/**
 * Below this, two rotations count as the same: about a sixtieth of a degree,
 * far under what shows on screen and far over float noise
 */
const SAME_ROTATION_EPSILON = 1e-8

/**
 * Whether `next` is a different rotation from `previous`, so the gizmo has to
 * be drawn anew. A camera orientation computed afresh each frame differs in
 * its last digits without turning, and a quaternion and its negation are the
 * same rotation, so this compares rotations, not numbers.
 */
export function hasTurned(
  previous: Quaternion | null,
  next: Quaternion,
): boolean {
  if (!previous) return true
  return Math.abs(previous.dot(next)) < 1 - SAME_ROTATION_EPSILON
}
