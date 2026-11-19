import {
  Group,
  Object3D,
  PerspectiveCamera,
  Quaternion,
  Vector2,
  Vector3,
} from "three"
import { describe, expect, it } from "vitest"
import { about, expectTip, tipOf } from "./__fixtures__/helpers"
import { projectJogHandles } from "./arrows"
import {
  hasTurned,
  jogFrameInCamera,
  jogFrameInView,
  NOVA_AXES_IN_SCENE,
  novaAxesSeenBy,
  UNIT_VECTOR,
} from "./gizmoView"

describe("jogFrameInCamera", () => {
  it("turns the frame against the camera: rolling the camera rolls the axes the other way", () => {
    const camera = about([0, 0, 1], 90)
    const frame = new Quaternion()

    expectTip(jogFrameInCamera(camera, frame), "x+", 0, 1)
  })

  it("applies the frame first, then the camera", () => {
    // Frame: X turned onto Y. Camera: tilted a quarter turn about X, so
    // world Y points away from it.
    const camera = about([1, 0, 0], 90)
    const frame = about([0, 0, 1], 90)
    const q = jogFrameInCamera(camera, frame)

    expectTip(q, "x+", 0, 0)
    expect(tipOf(q, "x+").depth).toBeLessThan(0)
  })
})

describe("novaAxesSeenBy and jogFrameInView", () => {
  /** The playground's camera: Y up, at (2, 1.5, 2), looking at the robot */
  function playgroundCamera() {
    const camera = new PerspectiveCamera()
    camera.position.set(2, 1.5, 2)
    camera.lookAt(0, 0, 0)
    camera.updateMatrixWorld()
    return camera
  }

  /**
   * Where this library draws a robot: in a group that turns NOVA's Z up into
   * the scene's Y up
   */
  function robotInScene() {
    const nova = new Group()
    nova.rotation.x = -Math.PI / 2
    const robot = new Object3D()
    nova.add(robot)
    nova.updateMatrixWorld()
    return robot
  }

  /** Where a small move along `direction` (in NOVA's coordinates) goes on screen, y down */
  function onScreen(camera: PerspectiveCamera, direction: Vector3) {
    const robot = robotInScene()
    const from = robot.localToWorld(new Vector3()).project(camera)
    const to = robot
      .localToWorld(direction.clone().multiplyScalar(1e-3))
      .project(camera)
    return new Vector2(to.x - from.x, from.y - to.y).normalize()
  }

  /** Every handle points on screen where the robot goes when jogged along it */
  function expectHandlesPointWhereTheRobotGoes(
    camera: PerspectiveCamera,
    frame: Quaternion,
  ) {
    // As JoggingGizmoOrientation and JoggingGizmo do it together: the 3D
    // view sees NOVA's axes, and the gizmo turns them to its frame
    const view = novaAxesSeenBy(camera)
    for (const handle of projectJogHandles(jogFrameInView(view, frame))) {
      const move = UNIT_VECTOR[handle.axis]
        .clone()
        .multiplyScalar(handle.direction === "+" ? 1 : -1)
        .applyQuaternion(frame)
      const drawn = new Vector2(handle.x, handle.y).normalize()
      const degreesOff =
        (Math.acos(Math.min(1, drawn.dot(onScreen(camera, move)))) * 180) /
        Math.PI
      expect(degreesOff, `${handle.axis}${handle.direction}`).toBeLessThan(1)
    }
  }

  it("translates NOVA's axes into the scene's as the teaching app's gizmo does: X to X, Y to -Z, Z to Y", () => {
    const seen = (axis: Vector3) =>
      axis.clone().applyQuaternion(NOVA_AXES_IN_SCENE)

    expect(seen(UNIT_VECTOR.x).distanceTo(new Vector3(1, 0, 0))).toBeCloseTo(0)
    expect(seen(UNIT_VECTOR.y).distanceTo(new Vector3(0, 0, -1))).toBeCloseTo(0)
    expect(seen(UNIT_VECTOR.z).distanceTo(new Vector3(0, 1, 0))).toBeCloseTo(0)
  })

  it("points every arrow where the robot goes, reading only the camera: no group needed", () => {
    expectHandlesPointWhereTheRobotGoes(playgroundCamera(), new Quaternion())
  })

  it("turns them to a jog frame in NOVA's coordinates, e.g. the tool's", () => {
    const tool = about([0, 0, 1], 90).multiply(about([1, 0, 0], 30))

    expectHandlesPointWhereTheRobotGoes(playgroundCamera(), tool)
  })
})

describe("hasTurned", () => {
  it("ignores float noise in a rotation computed afresh each frame", () => {
    const a = new Quaternion(
      -0.443021187480076,
      -0.17232801649986043,
      -0.3189451122511099,
      0.8199446917592028,
    )
    const b = new Quaternion(
      -0.4430211874800762,
      -0.17232801649986057,
      -0.31894511225111,
      0.8199446917592027,
    )

    expect(hasTurned(a, b)).toBe(false)
  })

  it("sees a turn of a tenth of a degree", () => {
    expect(hasTurned(new Quaternion(), about([0, 0, 1], 0.1))).toBe(true)
  })

  it("treats a quaternion and its negation as the same rotation", () => {
    const q = about([1, 0, 0], 30)
    const negated = new Quaternion(-q.x, -q.y, -q.z, -q.w)

    expect(hasTurned(q, negated)).toBe(false)
  })

  it("has always turned from no rotation at all", () => {
    expect(hasTurned(null, new Quaternion())).toBe(true)
  })
})
