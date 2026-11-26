import type { CoordinateSystem } from "@wandelbots/nova-js/v2"

// Random poses for the tests that compare the pose math on plain numbers with
// the one on three.js objects. The numbers are the same on every run.

export type Random = () => number

/** A random number generator that repeats its numbers for a seed (mulberry32) */
export function seededRandom(seed: number): Random {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const between = (random: Random, min: number, max: number) =>
  min + (max - min) * random()

const pick = <T>(random: Random, values: readonly T[]): T =>
  values[Math.floor(random() * values.length)] as T

/** A direction: a vector of length 1, any direction as likely as another */
function randomDirection(random: Random): [number, number, number] {
  const z = between(random, -1, 1)
  const angle = between(random, 0, 2 * Math.PI)
  const radius = Math.sqrt(1 - z * z)
  return [radius * Math.cos(angle), radius * Math.sin(angle), z]
}

/**
 * Rotation vectors where the math is delicate: no rotation, rotations too
 * small for their length to be a number above 0, half and full turns about
 * one axis, and more than a full turn
 */
export const EDGE_ROTATION_VECTORS: readonly number[][] = [
  [0, 0, 0],
  [-0, -0, -0],
  [1e-200, 0, 0],
  [1e-160, -1e-160, 1e-160],
  [1e-12, 0, 0],
  [0, 1e-8, -1e-8],
  [Math.PI, 0, 0],
  [0, -Math.PI, 0],
  [0, 0, Math.PI],
  [Math.PI / 2, 0, 0],
  [0, 0, -Math.PI / 2],
  [0, 2 * Math.PI, 0],
  [0, 0, 3 * Math.PI],
  [1.2, -2.9, 0.4],
]

/**
 * A rotation vector: half of them up to a half turn, the others near a half
 * turn (down to the last bits), beyond it (up to two full turns, as an
 * unwrapped orientation of the motion stream has it) or tiny
 */
export function randomRotationVector(random: Random): number[] {
  const kind = random()
  let angle: number
  if (kind < 0.5) {
    angle = between(random, 0, Math.PI)
  } else if (kind < 0.7) {
    angle = Math.PI + between(random, -1, 1) * 10 ** -between(random, 3, 16)
  } else if (kind < 0.85) {
    angle = between(random, Math.PI, 4 * Math.PI)
  } else {
    angle = 10 ** -between(random, 3, 20)
  }
  return randomDirection(random).map((value) => value * angle)
}

/**
 * Quaternions as NOVA has them, [x, y, z, w], where the math is delicate: no
 * rotation with either sign, half turns (w is 0, or next to it with either
 * sign), no length, not of length 1, and with entries missing
 */
export const EDGE_QUATERNIONS: readonly number[][] = [
  [0, 0, 0, 1],
  [0, 0, 0, -1],
  [1, 0, 0, 0],
  [0, 1, 0, -0],
  [0, 0, 1, 1e-17],
  [0, 0, 1, -1e-17],
  [0.5, 0.5, 0.5, 0.5],
  [-0.5, 0.5, -0.5, -0.5],
  [0, 0, 0, 0],
  [0, 0, 0, 2],
  [3, -4, 0, 0],
  [0.1, 0.2, 0.3, 0.4],
  [],
  [0.6],
  [0.1, 0.2, 0.3],
]

/**
 * A quaternion as NOVA has it, [x, y, z, w]: of length 1, or (one of four)
 * of another length, as a controller's configuration can hold it
 */
export function randomQuaternion(random: Random): number[] {
  const [x, y, z] = randomDirection(random)
  const halfAngle = between(random, -Math.PI, Math.PI)
  const sin = Math.sin(halfAngle)
  const length = random() < 0.25 ? 10 ** between(random, -3, 3) : 1
  return [x * sin, y * sin, z * sin, Math.cos(halfAngle)].map(
    (value) => value * length,
  )
}

/** A position in mm within a robot's reach, sometimes on an axis or at 0 */
export function randomPosition(random: Random): number[] {
  return [0, 1, 2].map(() =>
    random() < 0.15 ? 0 : between(random, -3000, 3000),
  )
}

/** What NOVA can say about the position and orientation of a frame */
export type RandomFrame = Pick<
  CoordinateSystem,
  "position" | "orientation" | "orientation_type"
>

/**
 * The pose of a coordinate system or of a TCP as NOVA can describe it: with
 * a rotation vector (the type named or left out), a quaternion, an
 * orientation or a position left out
 */
export function randomFrame(random: Random): RandomFrame {
  const position = random() < 0.1 ? undefined : randomPosition(random)
  const kind = random()
  if (kind < 0.4) {
    return {
      position,
      orientation: randomRotationVector(random),
      orientation_type: "ROTATION_VECTOR",
    }
  }
  if (kind < 0.55) {
    return { position, orientation: randomRotationVector(random) }
  }
  if (kind < 0.7) {
    return {
      position,
      orientation: pick(random, EDGE_ROTATION_VECTORS),
      orientation_type: "ROTATION_VECTOR",
    }
  }
  if (kind < 0.85) {
    return {
      position,
      orientation: randomQuaternion(random),
      orientation_type: "QUATERNION",
    }
  }
  if (kind < 0.95) {
    return {
      position,
      orientation: pick(random, EDGE_QUATERNIONS),
      orientation_type: "QUATERNION",
    }
  }
  return { position }
}
