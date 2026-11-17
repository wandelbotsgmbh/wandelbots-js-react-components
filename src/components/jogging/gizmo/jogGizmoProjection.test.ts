import { Quaternion, Vector3 } from "three"
import { describe, expect, it } from "vitest"
import {
  fitGizmoRadiusPx,
  grabAreaOf,
  hasTurned,
  jogFrameInCamera,
  projectJogHandles,
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

describe("fitGizmoRadiusPx", () => {
  it("fits the gizmo into the shorter side of its canvas, leaving the margin free", () => {
    expect(fitGizmoRadiusPx(300, 200, 20)).toBe(80)
    expect(fitGizmoRadiusPx(200, 300, 20)).toBe(80)
  })

  it("stays drawable in a canvas not measured yet", () => {
    expect(fitGizmoRadiusPx(0, 0, 20)).toBeGreaterThan(0)
  })
})

describe("grabAreaOf", () => {
  const sizes = { radiusPx: 100, innerPx: 12, beyondTipPx: 8, minLengthPx: 32 }
  const handle = (q: Quaternion, name: string) => {
    const found = projectJogHandles(q).find(
      (h) => `${h.axis}${h.direction}` === name,
    )
    if (!found) throw new Error(`no handle ${name}`)
    return found
  }

  it("covers the handle's half of the axis, from beside the center to past the tip", () => {
    const area = grabAreaOf(handle(new Quaternion(), "x+"), sizes)

    expect(area.x).toBeCloseTo(12)
    expect(area.y).toBeCloseTo(0)
    expect(area.length).toBeCloseTo(96)
    expect(area.angle).toBeCloseTo(0)
  })

  it("points the way its half of the axis points on screen", () => {
    // Y is up on screen, where screen y grows downward
    const up = grabAreaOf(handle(new Quaternion(), "y+"), sizes)
    expect(up.x).toBeCloseTo(0)
    expect(up.y).toBeCloseTo(-12)
    expect(up.angle).toBeCloseTo(-Math.PI / 2)

    const left = grabAreaOf(handle(new Quaternion(), "x-"), sizes)
    expect(Math.abs(left.angle)).toBeCloseTo(Math.PI)
  })

  it("gets shorter as its axis turns toward the viewer", () => {
    // X turned 60° toward the viewer shows at half its length
    const area = grabAreaOf(handle(about([0, 1, 0], -60), "x+"), sizes)

    expect(area.length).toBeCloseTo(50 - 12 + 8)
  })

  it("keeps a fingertip-sized area at the tip of an axis pointing at the viewer", () => {
    const area = grabAreaOf(handle(new Quaternion(), "z+"), sizes)

    expect(area.length).toBe(32)
    // Centered on the tip, which is at the center of the gizmo
    expect(area.x + (area.length / 2) * Math.cos(area.angle)).toBeCloseTo(0)
    expect(area.y + (area.length / 2) * Math.sin(area.angle)).toBeCloseTo(0)
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
