import { PivotControls } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import type {
  CoordinateSystem,
  MotionGroupState,
  Pose,
} from "@wandelbots/nova-js/v2"
import { autorun } from "mobx"
import { type ReactNode, useEffect, useRef } from "react"
import type { Group } from "three"
import { Pose3 } from "../../lib/Pose3"
import { parseRotationToQuaternion } from "../../lib/rotation"
import type { OrientationId } from "../jogging/JoggingStore"
import { ValueInterpolator } from "../utils/interpolation"

/** Props of {@link JoggingAxes} */
export type JoggingAxesProps = {
  /**
   * The coordinate system whose axes are drawn, in NOVA's world (mm); the
   * world's origin if left out
   */
  base?: CoordinateSystem
  /** The selected TCP's offset from the flange (mm, rotation vector) */
  tcpOffset?: Pose
  /**
   * The robot's motion state: the TCP's axes follow its `flange_pose`, a new
   * object as well as changes made in place, as a MobX store makes them
   */
  rapidlyChangingMotionState: MotionGroupState
  /**
   * The axes jogging moves along: the coordinate system's ("coordsys") or the
   * tool's. The other ones are grey.
   */
  orientation: OrientationId
  /** Whether the TCP's axes show the rings of rotation */
  rotate?: boolean
}

const AXIS_COLORS: [string, string, string] = ["#ff2060", "#20df80", "#2080ff"]
const INACTIVE_AXIS_COLORS: [string, string, string] = [
  "#6A6A6A",
  "#9B9B9B",
  "#727272",
]
const INACTIVE_HOVER_COLOR = "#BBBBBB"
const INACTIVE_OPACITY = 0.5

/** The flange pose as interpolated values: position in m, quaternion */
function flangeValues(pose: Pose | undefined): number[] {
  if (!pose) return [0, 0, 0, 0, 0, 0, 1]
  const { position, quaternion } = Pose3.fromPose(pose)
  return [
    position.x / 1000,
    position.y / 1000,
    position.z / 1000,
    quaternion.x,
    quaternion.y,
    quaternion.z,
    quaternion.w,
  ]
}

/**
 * The axes that jogging moves along, in NOVA's coordinates (Z up, m): those
 * of a coordinate system, and those of the TCP, which follow the robot's
 * flange with a spring. The axes jogging does not move along are grey.
 *
 * ```tsx
 * <JoggingAxes
 *   base={jogging.jogCoordSystem}
 *   rapidlyChangingMotionState={session.state.rapidlyChangingMotionState}
 *   orientation={jogging.selectedOrientation}
 * />
 * ```
 */
export function JoggingAxes({
  base,
  tcpOffset,
  rapidlyChangingMotionState,
  orientation,
  rotate = false,
}: JoggingAxesProps) {
  const flangeRef = useRef<Group>(null)
  const interpolator = useRef<ValueInterpolator | null>(null)
  const invalidate = useThree((state) => state.invalidate)
  const isTool = orientation === "tool"

  // The spring starts at the flange once; then it follows it (below)
  // biome-ignore lint/correctness/useExhaustiveDependencies: see above
  useEffect(() => {
    const spring = new ValueInterpolator(
      flangeValues(rapidlyChangingMotionState.flange_pose),
      { tension: 120, friction: 20, threshold: 0.001 },
    )
    interpolator.current = spring
    return () => {
      spring.destroy()
      interpolator.current = null
    }
  }, [])

  // The flange of a new motion state, and of one a MobX store changes in
  // place. Applied directly, not in a requestAnimationFrame: the spring moves
  // once per drawn frame anyway, and a hidden tab runs no animation frames,
  // so they piled up while it was hidden (RB-4363).
  useEffect(
    () =>
      autorun(() => {
        const pose = rapidlyChangingMotionState.flange_pose
        if (!pose) return
        interpolator.current?.setTarget(flangeValues(pose))
        invalidate()
      }),
    [rapidlyChangingMotionState, invalidate],
  )

  useFrame((_, delta) => {
    const spring = interpolator.current
    const flange = flangeRef.current
    if (!spring || !flange) return
    const done = spring.update(delta)
    const [x = 0, y = 0, z = 0, qx = 0, qy = 0, qz = 0, qw = 1] =
      spring.getCurrentValues()
    flange.position.set(x, y, z)
    flange.quaternion.set(qx, qy, qz, qw)
    if (!done) invalidate()
  })

  return (
    <>
      <NovaTransform transform={base}>
        <Axes active={!isTool} rotate={false} />
      </NovaTransform>
      <group ref={flangeRef}>
        <NovaTransform transform={tcpOffset}>
          <Axes active={isTool} rotate={rotate} />
        </NovaTransform>
      </group>
    </>
  )
}

/** A NOVA transform (mm; a rotation vector unless it says otherwise) */
function NovaTransform({
  transform,
  children,
}: {
  transform?: Pose & Pick<CoordinateSystem, "orientation_type">
  children: ReactNode
}) {
  const position = transform?.position
  return (
    <group
      position={[
        (position?.[0] ?? 0) / 1000,
        (position?.[1] ?? 0) / 1000,
        (position?.[2] ?? 0) / 1000,
      ]}
      quaternion={parseRotationToQuaternion(
        transform?.orientation ?? [0, 0, 0],
        transform?.orientation_type ?? "ROTATION_VECTOR",
      )}
    >
      {children}
    </group>
  )
}

function Axes({ active, rotate }: { active: boolean; rotate: boolean }) {
  return (
    <PivotControls
      depthTest={false}
      scale={0.12}
      disableRotations={!rotate}
      disableSliders
      disableScaling
      autoTransform={false}
      opacity={active ? 1 : INACTIVE_OPACITY}
      axisColors={active ? AXIS_COLORS : INACTIVE_AXIS_COLORS}
      hoveredColor={active ? undefined : INACTIVE_HOVER_COLOR}
    />
  )
}
