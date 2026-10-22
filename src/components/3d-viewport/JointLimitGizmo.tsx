"use client"

import { Line } from "@react-three/drei"
import { useMemo } from "react"
import * as THREE from "three"
import {
  type GizmoChainOffset,
  type GizmoDhParameter,
  type GizmoJointLimit,
  jointFrames,
} from "./jointLimitFrames"

export type {
  GizmoChainOffset,
  GizmoDhParameter,
  GizmoJointLimit,
} from "./jointLimitFrames"

export type JointLimitGizmoProps = {
  dhParameters: GizmoDhParameter[]
  chainOffset?: GizmoChainOffset | null
  limits: (GizmoJointLimit | null)[]
  /** Radians for revolute joints; millimetres for prismatic joints. */
  jointPositions?: number[]
  size?: number
  highlightedJoint?: number | null
}

const LIMIT_COLOR = "#ff4b4b"
const AXIS_COLOR = "#2fa8ff"
const REST_COLOR = "#8a8d9e"
const ARC_SEGMENTS_PER_TURN = 96
const SPIRAL_GROWTH_PER_TURN = 0.15
const Y_AXIS = new THREE.Vector3(0, 1, 0)
const DIMMED_OPACITY = 0.2
const HIGHLIGHT_SCALE = 2

type Emphasis = "normal" | "highlighted" | "dimmed"

/** A `GizmoJointLimit` narrowed to the finite, ordered range every marker needs. */
type BoundedJointLimit = { lower_limit: number; upper_limit: number }

function boundedLimit(
  limit: GizmoJointLimit | null | undefined,
): BoundedJointLimit | null {
  const { lower_limit, upper_limit } = limit ?? {}
  // Joints are never actually unbounded, but guard against non-finite
  // limits anyway: an infinite span would otherwise blow up the arc segment
  // count in revoluteRange.
  if (
    typeof lower_limit !== "number" ||
    typeof upper_limit !== "number" ||
    !Number.isFinite(lower_limit) ||
    !Number.isFinite(upper_limit) ||
    !(lower_limit < upper_limit)
  )
    return null
  return { lower_limit, upper_limit }
}

function Arrowhead({
  base,
  direction,
  size,
  color,
  opacity,
}: {
  base: THREE.Vector3
  direction: THREE.Vector3
  size: number
  color: string
  opacity: number
}) {
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    Y_AXIS,
    direction.clone().normalize(),
  )
  const position = base
    .clone()
    .addScaledVector(direction.clone().normalize(), size / 2)
  return (
    <mesh position={position} quaternion={quaternion} renderOrder={10}>
      <coneGeometry args={[size * 0.35, size, 16]} />
      <meshBasicMaterial
        color={color}
        depthTest={false}
        transparent
        opacity={opacity}
      />
    </mesh>
  )
}

function Polyline({
  points,
  color,
  width,
  opacity,
}: {
  points: THREE.Vector3[]
  color: string
  width: number
  opacity: number
}) {
  return (
    <Line
      points={points}
      color={color}
      lineWidth={width}
      depthTest={false}
      transparent
      opacity={opacity}
      renderOrder={10}
    />
  )
}

function shortenEnd(points: THREE.Vector3[], length: number): THREE.Vector3[] {
  const result = [...points]
  let remaining = length
  while (result.length > 1) {
    const end = result[result.length - 1]
    const previous = result[result.length - 2]
    const segment = end.distanceTo(previous)
    if (segment > remaining) {
      result[result.length - 1] = end
        .clone()
        .lerp(previous, remaining / segment)
      return result
    }
    remaining -= segment
    result.pop()
  }
  return result
}

function revoluteRange(
  lowerLimit: number,
  upperLimit: number,
  sign: number,
  radius: number,
): THREE.Vector3[] {
  const start = sign * lowerLimit
  const end = sign * upperLimit
  const span = Math.abs(end - start)
  const segments = Math.max(
    2,
    Math.ceil((span / (2 * Math.PI)) * ARC_SEGMENTS_PER_TURN),
  )
  return Array.from({ length: segments + 1 }, (_, step) => {
    const angle = start + ((end - start) * step) / segments
    const turns = (span * step) / segments / (2 * Math.PI)
    const spiralRadius = radius * (1 + SPIRAL_GROWTH_PER_TURN * turns)
    return new THREE.Vector3(
      Math.cos(angle) * spiralRadius,
      Math.sin(angle) * spiralRadius,
      0,
    )
  })
}

/**
 * Builds every marker point in the joint's own local frame (identity origin,
 * local Z = joint axis). None of this depends on `frame` — the joint's live
 * position in the chain — so it stays referentially stable while a stream of
 * `jointPositions` updates only the wrapping group's transform below. That
 * keeps drei's `<Line>` (which rebuilds its `LineGeometry` whenever its
 * `points` array reference changes) from reallocating line geometry on every
 * incoming pose.
 */
function useLocalMarkerGeometry(
  dh: GizmoDhParameter,
  limit: BoundedJointLimit,
  size: number,
  arrow: number,
) {
  const theta = dh.theta ?? 0
  const d = dh.d ?? 0
  const prismatic = dh.type === "PRISMATIC_JOINT"
  const sign = dh.reverse_rotation_direction ? -1 : 1
  const { lower_limit: lowerLimit, upper_limit: upperLimit } = limit

  return useMemo(() => {
    const markerFrame = new THREE.Matrix4()
      .makeRotationZ(theta)
      .multiply(
        new THREE.Matrix4().makeTranslation(0, 0, prismatic ? d / 1000 : 0),
      )
    const point = (x: number, y: number, z: number) =>
      new THREE.Vector3(x, y, z).applyMatrix4(markerFrame)
    const origin = new THREE.Vector3().applyMatrix4(markerFrame)
    const axisTip = point(0, 0, size)
    const range = (
      prismatic
        ? [
            point(size * 0.25, 0, (sign * lowerLimit) / 1000),
            point(size * 0.25, 0, (sign * upperLimit) / 1000),
          ]
        : revoluteRange(lowerLimit, upperLimit, sign, size * 0.6)
    ).map((p) => (prismatic ? p : p.applyMatrix4(markerFrame)))
    const rest = prismatic ? point(size * 0.25, 0, 0) : point(size * 0.6, 0, 0)
    const rangeLength = range
      .slice(1)
      .reduce((total, p, index) => total + p.distanceTo(range[index]), 0)
    const limitArrow = Math.min(arrow, rangeLength / 3)
    const shortened = shortenEnd(
      shortenEnd(range, limitArrow).reverse(),
      limitArrow,
    ).reverse()

    return {
      axisPoints: [origin, axisTip],
      axisTip,
      origin,
      restPoints: [origin, rest],
      range,
      limitPoints: shortened,
      rangeStart: shortened[0],
      rangeEnd: shortened[shortened.length - 1],
    }
  }, [theta, d, prismatic, sign, size, lowerLimit, upperLimit, arrow])
}

function JointLimitMarker({
  frame,
  dh,
  limit,
  size,
  emphasis,
}: {
  frame: THREE.Matrix4
  dh: GizmoDhParameter
  limit: BoundedJointLimit
  size: number
  emphasis: Emphasis
}) {
  const scale = emphasis === "highlighted" ? HIGHLIGHT_SCALE : 1
  const opacity = emphasis === "dimmed" ? DIMMED_OPACITY : 1
  const arrow = size * 0.2 * (emphasis === "highlighted" ? 1.4 : 1)
  const lineWidth = 2 * scale

  const {
    axisPoints,
    axisTip,
    origin,
    restPoints,
    range,
    limitPoints,
    rangeStart,
    rangeEnd,
  } = useLocalMarkerGeometry(dh, limit, size, arrow)

  // The joint's live position in the chain: this is the only thing that
  // changes on every incoming pose, so it's kept out of the memoized
  // geometry above and applied to the wrapping group instead.
  const { position, quaternion } = useMemo(() => {
    const position = new THREE.Vector3()
    const quaternion = new THREE.Quaternion()
    frame.decompose(position, quaternion, new THREE.Vector3())
    return { position, quaternion }
  }, [frame])

  return (
    <group position={position} quaternion={quaternion}>
      <Polyline
        points={axisPoints}
        color={AXIS_COLOR}
        width={lineWidth}
        opacity={opacity}
      />
      <Arrowhead
        base={axisTip}
        direction={axisTip.clone().sub(origin)}
        size={arrow}
        color={AXIS_COLOR}
        opacity={opacity}
      />
      <Polyline
        points={restPoints}
        color={REST_COLOR}
        width={1.5 * scale}
        opacity={opacity}
      />
      <Polyline
        points={limitPoints}
        color={LIMIT_COLOR}
        width={lineWidth}
        opacity={opacity}
      />
      <Arrowhead
        base={rangeStart}
        direction={range[0].clone().sub(rangeStart)}
        size={rangeStart.distanceTo(range[0])}
        color={LIMIT_COLOR}
        opacity={opacity}
      />
      <Arrowhead
        base={rangeEnd}
        direction={range[range.length - 1].clone().sub(rangeEnd)}
        size={rangeEnd.distanceTo(range[range.length - 1])}
        color={LIMIT_COLOR}
        opacity={opacity}
      />
    </group>
  )
}

/**
 * Draws joint axes and position ranges in NOVA's Z-up frame (joint axis =
 * local Z), in metres.
 *
 * This library's robot visualizers ({@link SupportedRobot}, {@link Robot},
 * the DH fallback renderer) place robots in three.js's Y-up world and rotate
 * each joint about local Y. To overlay this gizmo on one of them, wrap it in
 * a group that rotates Z onto Y, e.g.:
 *
 * ```tsx
 * <group rotation={[-Math.PI / 2, 0, 0]}>
 *   <JointLimitGizmo dhParameters={dhParameters} limits={limits} jointPositions={jointPositions} />
 * </group>
 * ```
 *
 * Use the same `dhParameters` and displayed `jointPositions` as the robot.
 * The example above assumes identity mounting. For a mounted robot, wrap
 * this example in an outer group using the same mounting position (in metres)
 * and quaternion passed to the robot, and leave the gizmo's `chainOffset` null.
 * Passing that mounting pose as `chainOffset` here would also rotate it during
 * the Z-to-Y conversion.
 */
export function JointLimitGizmo({
  dhParameters,
  chainOffset = null,
  limits,
  jointPositions,
  size = 0.15,
  highlightedJoint = null,
}: JointLimitGizmoProps) {
  const frames = useMemo(
    () => jointFrames(dhParameters, chainOffset, jointPositions),
    [dhParameters, chainOffset, jointPositions],
  )
  return (
    <group>
      {frames.map((frame, index) => {
        const limit = boundedLimit(limits[index])
        if (!limit) return null
        return (
          <JointLimitMarker
            // biome-ignore lint/suspicious/noArrayIndexKey: joints are addressed by index
            key={index}
            frame={frame}
            dh={dhParameters[index]}
            limit={limit}
            size={size}
            emphasis={
              highlightedJoint === null
                ? "normal"
                : highlightedJoint === index
                  ? "highlighted"
                  : "dimmed"
            }
          />
        )
      })}
    </group>
  )
}
