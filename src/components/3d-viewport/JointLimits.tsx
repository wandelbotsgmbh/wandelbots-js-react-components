"use client"

import { Line } from "@react-three/drei"
import { useMemo } from "react"
import * as THREE from "three"
import {
  type ChainOffset,
  type DhParameter,
  type JointLimit,
  jointFrames,
} from "./jointLimitFrames"

export type { ChainOffset, DhParameter, JointLimit } from "./jointLimitFrames"

export type JointLimitsProps = {
  dhParameters: DhParameter[]
  chainOffset?: ChainOffset | null
  limits: (JointLimit | null)[]
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
  frame: THREE.Matrix4,
  limit: JointLimit,
  sign: number,
  radius: number,
): THREE.Vector3[] {
  const start = sign * limit.negative
  const end = sign * limit.positive
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
    ).applyMatrix4(frame)
  })
}

function JointLimitMarker({
  frame,
  dh,
  limit,
  size,
  emphasis,
}: {
  frame: THREE.Matrix4
  dh: DhParameter
  limit: JointLimit
  size: number
  emphasis: Emphasis
}) {
  const sign = dh.reverse_rotation_direction ? -1 : 1
  const prismatic = dh.type === "PRISMATIC_JOINT"
  const origin = new THREE.Vector3().applyMatrix4(frame)
  const local = (x: number, y: number, z: number) =>
    new THREE.Vector3(x, y, z).applyMatrix4(frame)
  const axisTip = local(0, 0, size)
  const scale = emphasis === "highlighted" ? HIGHLIGHT_SCALE : 1
  const opacity = emphasis === "dimmed" ? DIMMED_OPACITY : 1
  const arrow = size * 0.2 * (emphasis === "highlighted" ? 1.4 : 1)
  const lineWidth = 2 * scale
  const range = prismatic
    ? [
        local(size * 0.25, 0, (sign * limit.negative) / 1000),
        local(size * 0.25, 0, (sign * limit.positive) / 1000),
      ]
    : revoluteRange(frame, limit, sign, size * 0.6)
  const rest = prismatic ? local(size * 0.25, 0, 0) : local(size * 0.6, 0, 0)
  const rangeLength = range
    .slice(1)
    .reduce((total, point, index) => total + point.distanceTo(range[index]), 0)
  const limitArrow = Math.min(arrow, rangeLength / 3)
  const shortened = shortenEnd(
    shortenEnd(range, limitArrow).reverse(),
    limitArrow,
  ).reverse()
  const rangeStart = shortened[0]
  const rangeEnd = shortened[shortened.length - 1]

  return (
    <group>
      <Polyline
        points={[origin, axisTip]}
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
        points={[origin, rest]}
        color={REST_COLOR}
        width={1.5 * scale}
        opacity={opacity}
      />
      <Polyline
        points={shortened}
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

/** Draws joint axes and position ranges in NOVA's Z-up frame, in metres. */
export function JointLimits({
  dhParameters,
  chainOffset = null,
  limits,
  jointPositions,
  size = 0.15,
  highlightedJoint = null,
}: JointLimitsProps) {
  const frames = useMemo(
    () => jointFrames(dhParameters, chainOffset, jointPositions),
    [dhParameters, chainOffset, jointPositions],
  )
  return (
    <group>
      {frames.map((frame, index) => {
        const limit = limits[index]
        if (!limit || !(limit.negative < limit.positive)) return null
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
