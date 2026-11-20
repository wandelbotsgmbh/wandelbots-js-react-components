import type { CoordinateSystem, Pose, RobotTcp } from "@wandelbots/nova-js/v2"
import keyBy from "lodash-es/keyBy.js"
import { Pose3 } from "./Pose3"

// Ported from RobotPad (src/util/PoseTransformer.ts): the coordinate systems
// and the TCPs.

/** A pose and the coordinate system that it is relative to */
export type ReferencedPose = {
  pose: Required<Pose>
  coordinateSystemId: string
}

/** The id without the controller's suffix, e.g. "base" for "baseOnkuka" */
function stripControllerSuffix(coordinateSystemId: string): string {
  const suffixIndex = coordinateSystemId.lastIndexOf("On")
  return suffixIndex > 0
    ? coordinateSystemId.slice(0, suffixIndex)
    : coordinateSystemId
}

/**
 * The coordinate system of an id, also when the id or the known one has the
 * controller's suffix and the other has not
 */
function resolveCoordinateSystem(
  coordinateSystemsById: Record<string, CoordinateSystem>,
  coordinateSystemId: string,
): CoordinateSystem | undefined {
  const exactMatch = coordinateSystemsById[coordinateSystemId]
  if (exactMatch) {
    return exactMatch
  }

  const canonicalId = stripControllerSuffix(coordinateSystemId)
  const directCanonicalMatch = coordinateSystemsById[canonicalId]
  if (directCanonicalMatch) {
    return directCanonicalMatch
  }

  const matchingIds = Object.keys(coordinateSystemsById).filter(
    (knownId) => stripControllerSuffix(knownId) === canonicalId,
  )

  if (matchingIds.length !== 1) {
    return undefined
  }

  const resolvedId = matchingIds[0]
  return resolvedId ? coordinateSystemsById[resolvedId] : undefined
}

/** The world frame: the origin of every other coordinate system */
const WORLD: CoordinateSystem = {
  coordinate_system: "world",
  name: "world",
  reference_coordinate_system: "",
  position: [0, 0, 0],
  orientation: [0, 0, 0],
  orientation_type: "ROTATION_VECTOR",
}

/** Every coordinate system by its id, with its pose relative to world */
function normalizeCoordinateSystems(
  coordinateSystems: CoordinateSystem[],
): Record<string, CoordinateSystem> {
  const byId = keyBy(
    coordinateSystems.map((coordinateSystem) => ({
      ...coordinateSystem,
      coordinate_system: coordinateSystem.coordinate_system || "world",
    })),
    "coordinate_system",
  )
  // World always exists, also when a controller lists no coordinate systems
  byId.world ??= WORLD
  const normalizedById: Record<string, CoordinateSystem> = {}

  const normalize = (coordinateSystemId: string): CoordinateSystem => {
    const cached = normalizedById[coordinateSystemId]
    if (cached) {
      return cached
    }

    const coordinateSystem = resolveCoordinateSystem(byId, coordinateSystemId)
    if (!coordinateSystem) {
      throw new Error(
        `Unknown coordinate system ${coordinateSystemId}. Known coordinate systems are: ${Object.keys(byId).join(", ")}`,
      )
    }

    const referenceCoordinateSystemId =
      coordinateSystem.reference_coordinate_system || "world"

    let normalized: CoordinateSystem
    if (referenceCoordinateSystemId === "world") {
      normalized = coordinateSystem
    } else {
      const reference = normalize(referenceCoordinateSystemId)
      const combined = Pose3.fromCoordinateSystem(reference).multiply(
        Pose3.fromCoordinateSystem(coordinateSystem),
      )
      normalized = {
        ...coordinateSystem,
        position: [
          combined.position.x,
          combined.position.y,
          combined.position.z,
        ],
        orientation: [
          combined.orientation.x,
          combined.orientation.y,
          combined.orientation.z,
        ],
        orientation_type: "ROTATION_VECTOR",
        reference_coordinate_system: reference.reference_coordinate_system,
      }
    }

    normalizedById[coordinateSystemId] = normalized
    return normalized
  }

  return Object.fromEntries(
    Object.keys(byId).map((coordinateSystemId) => [
      coordinateSystemId,
      normalize(coordinateSystemId),
    ]),
  )
}

function expectCoordinateSystem(
  coordinateSystemsById: Record<string, CoordinateSystem>,
  coordinateSystemId: string,
) {
  const coordinateSystem = resolveCoordinateSystem(
    coordinateSystemsById,
    coordinateSystemId || "world",
  )
  if (!coordinateSystem) {
    throw new Error(
      `Unknown coordinate system ${coordinateSystemId}. Known coordinate systems are: ${Object.keys(coordinateSystemsById).join(", ")}`,
    )
  }
  return coordinateSystem
}

/**
 * A coordinate system's pose relative to world, following its chain of
 * reference coordinate systems. Throws for an unknown id.
 */
export function resolveCoordinateSystemInWorld(
  coordinateSystemId: string,
  coordinateSystems: CoordinateSystem[],
): CoordinateSystem {
  return expectCoordinateSystem(
    normalizeCoordinateSystems(coordinateSystems),
    coordinateSystemId,
  )
}

/**
 * The pose expressed in another coordinate system. Coordinate systems that
 * refer to others are resolved through `coordinateSystems`; an empty id is
 * world. Throws for an unknown id.
 */
export function transformPoseToCoordinateSystem(
  inputPose: ReferencedPose,
  targetCoordinateSystemId: string,
  coordinateSystems: CoordinateSystem[],
): ReferencedPose {
  if (inputPose.coordinateSystemId === targetCoordinateSystemId) {
    return inputPose
  }

  const coordinateSystemsById = normalizeCoordinateSystems(coordinateSystems)
  const poseCoordinateSystem = expectCoordinateSystem(
    coordinateSystemsById,
    inputPose.coordinateSystemId || "world",
  )
  const targetCoordinateSystem = expectCoordinateSystem(
    coordinateSystemsById,
    targetCoordinateSystemId,
  )

  if (
    poseCoordinateSystem.coordinate_system ===
    targetCoordinateSystem.coordinate_system
  ) {
    return {
      ...inputPose,
      coordinateSystemId: targetCoordinateSystem.coordinate_system,
    }
  }

  const transformed = Pose3.fromCoordinateSystem(targetCoordinateSystem)
    .inverse()
    .multiply(
      Pose3.fromCoordinateSystem(poseCoordinateSystem).multiply(
        Pose3.fromPose(inputPose.pose),
      ),
    )

  return {
    pose: {
      position: [
        transformed.position.x,
        transformed.position.y,
        transformed.position.z,
      ],
      orientation: [
        transformed.orientation.x,
        transformed.orientation.y,
        transformed.orientation.z,
      ],
    },
    coordinateSystemId: targetCoordinateSystem.coordinate_system,
  }
}

/** A TCP's offset from the flange, as `RobotTcp` has it */
export type TcpOffset = Pick<
  RobotTcp,
  "position" | "orientation" | "orientation_type"
>

/**
 * The pose of one TCP as the pose of another TCP of the same flange, both
 * relative to the same coordinate system: back to the flange, then out to
 * the other TCP
 */
export function transformPoseToTcp(
  pose: Pose,
  poseTcp: TcpOffset,
  targetTcp: TcpOffset,
): Required<Pose> {
  const transformed = Pose3.fromPose(pose)
    .multiply(Pose3.fromRobotTcp(poseTcp).inverse())
    .multiply(Pose3.fromRobotTcp(targetTcp))
  const { position, orientation } = transformed
  return {
    position: [position.x, position.y, position.z],
    orientation: [orientation.x, orientation.y, orientation.z],
  }
}
