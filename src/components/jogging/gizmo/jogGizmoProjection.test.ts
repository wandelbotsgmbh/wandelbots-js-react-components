import {
  Group,
  Object3D,
  PerspectiveCamera,
  Quaternion,
  Vector2,
  Vector3,
} from "three"
import { describe, expect, it } from "vitest"
import { seenFrom, VIEWS } from "./__fixtures__/views"
import { gizmoGrabSizes, gizmoMeasures } from "./gizmoShared"
import {
  fitGizmoRadiusPx,
  grabAreasOf,
  hasTurned,
  type JogGrabSizes,
  jogFrameInCamera,
  jogFrameInView,
  NOVA_AXES_IN_SCENE,
  novaAxesSeenBy,
  type ProjectedJogHandle,
  projectJogHandles,
  UNIT_VECTOR,
} from "./jogGizmoProjection"

const about = (axis: [number, number, number], degrees: number) =>
  new Quaternion().setFromAxisAngle(
    new Vector3(...axis),
    (degrees * Math.PI) / 180,
  )

/** Screen position of a handle, in gizmo radii, y pointing down */
function tipOf(q: Quaternion, name: string) {
  const handle = projectJogHandles(q).find(
    (h) => `${h.axis}${h.direction}` === name,
  )
  if (!handle) throw new Error(`no handle ${name}`)
  return { x: handle.x, y: handle.y, depth: handle.depth }
}

function expectTip(q: Quaternion, name: string, x: number, y: number) {
  const tip = tipOf(q, name)
  expect(tip.x).toBeCloseTo(x)
  expect(tip.y).toBeCloseTo(y)
}

describe("projectJogHandles", () => {
  it("draws an unturned frame as the camera sees it: X right, Y up, Z at the viewer", () => {
    const q = new Quaternion()

    expectTip(q, "x+", 1, 0)
    expectTip(q, "x-", -1, 0)
    expectTip(q, "y+", 0, -1)
    expectTip(q, "z+", 0, 0)
    expect(tipOf(q, "z+").depth).toBeGreaterThan(tipOf(q, "z-").depth)
  })

  it("turns the handles with the frame", () => {
    // X turned a quarter turn about Z points where Y was: up on screen
    expectTip(about([0, 0, 1], 90), "x+", 0, -1)
  })
})

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

describe("fitGizmoRadiusPx", () => {
  it("fits the gizmo into the shorter side of its canvas, leaving the margin free", () => {
    expect(fitGizmoRadiusPx(300, 200, 20)).toBe(80)
    expect(fitGizmoRadiusPx(200, 300, 20)).toBe(80)
  })

  it("stays drawable in a canvas not measured yet", () => {
    expect(fitGizmoRadiusPx(0, 0, 20)).toBeGreaterThan(0)
  })
})

describe("grabAreasOf", () => {
  const sizes: JogGrabSizes = {
    radiusPx: 100,
    gripPx: 30,
    innerPx: 12,
    beyondTipPx: 8,
    minTipPx: 16,
    headLength: 0.26,
  }
  const nameOf = (h: ProjectedJogHandle) => `${h.axis}${h.direction}`

  function areasOf(q: Quaternion, measures = sizes) {
    const handles = projectJogHandles(q)
    const areas = grabAreasOf(handles, measures)
    return {
      handles,
      areas,
      area: (name: string) =>
        areas[handles.findIndex((h) => nameOf(h) === name)],
    }
  }

  /**
   * The handle a press at (x, y) px from the center reaches, as the browser
   * picks among the bars laid over the gizmo: the highest layer wins
   */
  function pressAt(
    { handles, areas }: ReturnType<typeof areasOf>,
    x: number,
    y: number,
    measures = sizes,
  ) {
    let reached: string | null = null
    let layer = Number.NEGATIVE_INFINITY
    areas.forEach((area, i) => {
      if (!area) return
      const dx = Math.cos(area.angle)
      const dy = Math.sin(area.angle)
      const along = (x - area.x) * dx + (y - area.y) * dy
      const across = (y - area.y) * dx - (x - area.x) * dy
      const inside =
        along >= 0 &&
        along <= area.length &&
        Math.abs(across) <= measures.gripPx / 2
      if (inside && area.layer >= layer) {
        reached = nameOf(handles[i])
        layer = area.layer
      }
    })
    return reached
  }

  it("covers the handle's half of the axis, from beside the center to past the tip", () => {
    const area = areasOf(new Quaternion()).area("x+")

    expect(area?.x).toBeCloseTo(12)
    expect(area?.y).toBeCloseTo(0)
    expect(area?.length).toBeCloseTo(96)
    expect(area?.angle).toBeCloseTo(0)
  })

  it("points the way its half of the axis points on screen", () => {
    const { area } = areasOf(new Quaternion())
    // Y is up on screen, where screen y grows downward
    expect(area("y+")?.x).toBeCloseTo(0)
    expect(area("y+")?.y).toBeCloseTo(-12)
    expect(area("y+")?.angle).toBeCloseTo(-Math.PI / 2)
    expect(Math.abs(area("x-")?.angle ?? 0)).toBeCloseTo(Math.PI)
  })

  it("gets shorter as its axis turns toward the viewer", () => {
    // X turned 60° toward the viewer shows at half its length. Turned about
    // X too, so that no other arrow points the same way on screen.
    const area = areasOf(
      about([0, 1, 0], -60).multiply(about([1, 0, 0], 45)),
    ).area("x+")

    expect(area?.length).toBeCloseTo(50 - 12 + 8)
  })

  it("gives an axis pointing at the viewer no grab area: its two halves cannot be told apart", () => {
    const { area } = areasOf(new Quaternion())

    expect(area("z+")).toBeNull()
    expect(area("z-")).toBeNull()
  })

  it("gives the farther of two arrowheads drawn over each other no grab area", () => {
    // From the front, 40° up: Y+ points away and up on screen, Z+ up, and
    // their arrowheads overlap
    const { area } = areasOf(seenFrom(-90, 40))

    expect(area("y+")).toBeNull()
    expect(area("z+")).not.toBeNull()
  })

  it("never reaches across the center, whichever way the camera looks", () => {
    const crossing: string[] = []
    for (const [azimuth, elevation] of VIEWS) {
      const { handles, areas } = areasOf(seenFrom(azimuth, elevation))
      areas.forEach((area, i) => {
        if (!area) return
        const start =
          area.x * Math.cos(area.angle) + area.y * Math.sin(area.angle)
        if (start < sizes.innerPx - 1e-9) {
          crossing.push(`${nameOf(handles[i])} at ${azimuth}°/${elevation}°`)
        }
      })
    }

    expect(crossing.slice(0, 10)).toEqual([])
  })

  it("jogs along the arrow whose arrowhead is pressed, whichever way the camera looks", () => {
    // The measures of a gizmo of the default size
    const measures = gizmoGrabSizes(
      200,
      fitGizmoRadiusPx(200, 200, gizmoMeasures(200).marginPx),
    )
    const wrong: string[] = []
    for (const [azimuth, elevation] of VIEWS) {
      const layout = areasOf(seenFrom(azimuth, elevation), measures)
      layout.handles.forEach((handle, i) => {
        if (!layout.areas[i]) return
        for (const along of [0.74, 0.8, 0.87, 0.94, 1]) {
          const reached = pressAt(
            layout,
            handle.x * measures.radiusPx * along,
            handle.y * measures.radiusPx * along,
            measures,
          )
          if (reached !== nameOf(handle)) {
            wrong.push(
              `${nameOf(handle)} at ${azimuth}°/${elevation}° jogs ${reached}`,
            )
            return
          }
        }
      })
    }

    expect(wrong.slice(0, 10)).toEqual([])
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
