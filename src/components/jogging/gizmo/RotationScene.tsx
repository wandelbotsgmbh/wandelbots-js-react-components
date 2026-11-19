import { useMemo, useRef } from "react"
import { type Group, Matrix4, Quaternion, Vector3 } from "three"
import {
  JOG_AXES,
  JOG_DIRECTIONS,
  type JogAxis,
  type JogDirection,
} from "../jogHandle"
import { arcGrabAreasOf } from "./arcGrabAreas"
import {
  ARC_BASIS,
  ARC_RADIUS,
  ARC_SWEEP,
  arcAngles,
  projectJogArcs,
} from "./arcs"
import {
  ARROW_HEAD_LENGTH as HEAD_LENGTH,
  ARROW_HEAD_RADIUS as HEAD_RADIUS,
  axisColor,
  focusKey,
  type GizmoSceneProps,
  gizmoArcGrabSizes,
  HALVES,
  halfKey,
  haloKey,
  handleKey,
  NOWHERE,
  UP,
} from "./gizmoShared"
import { UNIT_VECTOR } from "./gizmoView"
import { useGizmoTurn } from "./useGizmoTurn"

const TUBE_RADIUS = 0.03

/**
 * The rotation gizmo's arcs, turned by `orientation` whenever it turns. Also
 * lays the grab bands and arrowhead circles over them.
 */
export function RotationScene({
  orientation,
  lit,
  disabled,
  size,
  radius,
  overlay,
}: GizmoSceneProps) {
  const group = useRef<Group>(null)
  const center = size / 2
  const px = (value: number) => `${(center + value).toFixed(2)}px`
  const polygonOf = (points: { x: number; y: number }[]) =>
    `polygon(${points.map((p) => `${px(p.x)} ${px(p.y)}`).join(", ")})`
  const pathOf = (points: { x: number; y: number }[]) =>
    `M${points.map((p) => `${(center + p.x).toFixed(2)} ${(center + p.y).toFixed(2)}`).join("L")}Z`

  useGizmoTurn(
    orientation,
    group,
    (q) => {
      let placedAll = true
      const arcs = projectJogArcs(q)
      const areas = arcGrabAreasOf(arcs, gizmoArcGrabSizes(size, radius))
      for (const [i, arc] of arcs.entries()) {
        const head = overlay.current.get(handleKey(arc)) as
          | HTMLElement
          | undefined
        const halo = overlay.current.get(haloKey(arc)) as
          | HTMLElement
          | undefined
        const focusRing = overlay.current.get(focusKey(arc))
        const halves = HALVES.map(
          (half) =>
            overlay.current.get(halfKey(arc, half)) as HTMLElement | undefined,
        )
        if (!head || !halo || !focusRing || halves.some((half) => !half)) {
          placedAll = false
          continue
        }
        const area = areas[i]
        // Also where the keyboard's focus shows, when a press could not tell
        // which way this handle turns and only the keyboard reaches it
        head.style.left = px(arc.head.x * radius)
        head.style.top = px(arc.head.y * radius)
        head.style.zIndex = area ? String(area.headLayer) : "0"
        head.style.pointerEvents = area ? "" : "none"
        head.dataset.band = area ? "shown" : "none"
        halo.style.clipPath = area ? polygonOf(area.band) : NOWHERE
        focusRing.setAttribute("d", area ? pathOf(area.band) : "")
        for (const [k, element] of halves.entries()) {
          if (!element) continue
          const half = area?.halves[k]
          element.style.clipPath = half ? polygonOf(half.polygon) : NOWHERE
          element.style.zIndex = half ? String(half.layer) : "0"
          element.style.pointerEvents = half ? "" : "none"
        }
      }
      return placedAll
    },
    `${size}:${radius}`,
  )

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#c4c8d0" />
      </mesh>
      {JOG_AXES.map((axis) => (
        <Arcs
          key={axis}
          axis={axis}
          color={axisColor(axis)}
          lit={lit?.axis === axis ? lit.direction : null}
          disabled={disabled}
        />
      ))}
    </group>
  )
}

/**
 * The circle about one axis: an arc per direction, each with an arrowhead the
 * way it turns, so the arc a handle covers lights up as a whole
 */
function Arcs({
  axis,
  color,
  lit,
  disabled,
}: {
  axis: JogAxis
  color: string
  lit: JogDirection | null
  disabled: boolean
}) {
  // The circle's plane: x and y along the axis's basis, z along the axis
  const plane = useMemo(() => {
    const [u, v] = ARC_BASIS[axis]
    return new Quaternion().setFromRotationMatrix(
      new Matrix4().makeBasis(u, v, UNIT_VECTOR[axis]),
    )
  }, [axis])

  return (
    <group quaternion={plane}>
      {JOG_DIRECTIONS.map((direction) => {
        const isLit = lit === direction
        const opacity = isLit ? 1 : disabled ? 0.35 : 0.8
        const tube = isLit ? TUBE_RADIUS * 1.5 : TUBE_RADIUS
        return (
          <group key={direction}>
            <mesh rotation={[0, 0, arcAngles(direction).start]}>
              <torusGeometry args={[ARC_RADIUS, tube, 12, 48, ARC_SWEEP]} />
              <meshBasicMaterial color={color} transparent opacity={opacity} />
            </mesh>
            <ArcHead
              direction={direction}
              color={color}
              opacity={opacity}
              lit={isLit}
            />
          </group>
        )
      })}
    </group>
  )
}

/** The arrowhead of an arc: on the circle, pointing along it the way it turns */
function ArcHead({
  direction,
  color,
  opacity,
  lit,
}: {
  direction: JogDirection
  color: string
  opacity: number
  lit: boolean
}) {
  const { position, rotation } = useMemo(() => {
    const { head } = arcAngles(direction)
    // Backward along the circle for the − arc
    const sign = direction === "+" ? 1 : -1
    return {
      position: new Vector3(
        Math.cos(head) * ARC_RADIUS,
        Math.sin(head) * ARC_RADIUS,
        0,
      ),
      rotation: new Quaternion().setFromUnitVectors(
        UP,
        new Vector3(-Math.sin(head) * sign, Math.cos(head) * sign, 0),
      ),
    }
  }, [direction])

  return (
    <mesh position={position} quaternion={rotation} scale={lit ? 1.2 : 1}>
      <coneGeometry args={[HEAD_RADIUS, HEAD_LENGTH, 20]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}
