import Box from "@mui/material/Box"
import { alpha, useTheme } from "@mui/material/styles"
import { useMemo, useRef } from "react"
import { type Group, Quaternion } from "three"
import {
  isSameJogHandle,
  JOG_AXES,
  JOG_DIRECTIONS,
  type JogAxis,
  type JogDirection,
} from "../jogHandle"
import {
  ARROW_HEAD_LENGTH as HEAD_LENGTH,
  ARROW_HEAD_RADIUS as HEAD_RADIUS,
  axisColor,
  type GizmoHandlesProps,
  type GizmoSceneProps,
  gizmoGrabSizes,
  gizmoMeasures,
  handleKey,
  overlayRef,
  UP,
} from "./gizmoShared"
import {
  grabAreasOf,
  projectJogHandles,
  UNIT_VECTOR,
} from "./jogGizmoProjection"
import { useGizmoTurn } from "./useGizmoTurn"

const SHAFT_RADIUS = 0.035
/** Labels sit this far out from the center, in gizmo radii */
const LABEL_DISTANCE = 1.28

const labelKey = (axis: JogAxis) => `label:${axis}`

/**
 * The translation gizmo's arrows, turned by `orientation` whenever it turns.
 * Also lays the grab bars and labels over them.
 */
export function TranslationScene({
  orientation,
  lit,
  disabled,
  size,
  radius,
  overlay,
}: GizmoSceneProps) {
  const group = useRef<Group>(null)
  const center = size / 2

  useGizmoTurn(
    orientation,
    group,
    (q) => {
      let placedAll = true
      const tips = projectJogHandles(q)
      const areas = grabAreasOf(tips, gizmoGrabSizes(size, radius))
      for (const [i, tip] of tips.entries()) {
        const grip = overlay.current.get(handleKey(tip)) as
          | HTMLElement
          | undefined
        const area = areas[i]
        if (!grip) {
          placedAll = false
        } else if (area) {
          grip.style.left = `${center + area.x}px`
          grip.style.top = `${center + area.y}px`
          grip.style.width = `${area.length}px`
          grip.style.transform = `translateY(-50%) rotate(${area.angle}rad)`
          grip.style.zIndex = String(area.layer)
          grip.style.pointerEvents = ""
        } else {
          // A press here could not tell this handle from another one. The
          // keyboard, which picks a handle by its name, still reaches it.
          grip.style.pointerEvents = "none"
        }
        if (tip.direction !== "+") continue
        const label = overlay.current.get(labelKey(tip.axis)) as
          | HTMLElement
          | undefined
        if (label) {
          label.style.left = `${center + tip.x * radius * LABEL_DISTANCE}px`
          label.style.top = `${center + tip.y * radius * LABEL_DISTANCE}px`
        } else {
          placedAll = false
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
        <Arrow
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
 * One axis: a half arrow per direction, shaft and arrowhead, so the half a
 * handle covers lights up as a whole
 */
function Arrow({
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
  const rotation = useMemo(
    () => new Quaternion().setFromUnitVectors(UP, UNIT_VECTOR[axis]),
    [axis],
  )
  const shaftLength = 1 - HEAD_LENGTH

  return (
    <group quaternion={rotation}>
      {JOG_DIRECTIONS.map((direction) => {
        const isLit = lit === direction
        const opacity = isLit ? 1 : disabled ? 0.35 : 0.8
        const shaftRadius = isLit ? SHAFT_RADIUS * 1.5 : SHAFT_RADIUS
        return (
          // The minus half is the plus half turned around
          <group
            key={direction}
            rotation={[direction === "+" ? 0 : Math.PI, 0, 0]}
          >
            <mesh position={[0, shaftLength / 2, 0]}>
              <cylinderGeometry
                args={[shaftRadius, shaftRadius, shaftLength, 12]}
              />
              <meshBasicMaterial color={color} transparent opacity={opacity} />
            </mesh>
            <mesh
              position={[0, 1 - HEAD_LENGTH / 2, 0]}
              scale={isLit ? 1.2 : 1}
            >
              <coneGeometry args={[HEAD_RADIUS, HEAD_LENGTH, 20]} />
              <meshBasicMaterial color={color} transparent opacity={opacity} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

/**
 * The translation handles: a button per direction, a bar along its half of
 * the axis, so it can be grabbed anywhere along it. And the axis labels.
 */
export function TranslationHandles({
  held,
  activeHandle,
  disabled,
  onHover,
  handlersFor,
  label,
  overlay,
  size,
}: GizmoHandlesProps) {
  const theme = useTheme()
  const { gripPx, labelFontPx } = gizmoMeasures(size)

  return (
    <>
      {JOG_AXES.map((axis) => (
        <Box
          key={axis}
          component="span"
          aria-hidden
          ref={overlayRef(overlay, labelKey(axis))}
          sx={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            fontSize: labelFontPx,
            color: axisColor(axis),
            opacity: disabled ? 0.4 : 1,
          }}
        >
          {axis.toUpperCase()}
        </Box>
      ))}

      {JOG_AXES.flatMap((axis) =>
        JOG_DIRECTIONS.map((direction) => {
          const handle = { axis, direction }
          const color = axisColor(axis)
          const pressed =
            isSameJogHandle(held, handle) ||
            isSameJogHandle(activeHandle, handle)
          return (
            <Box
              key={handleKey(handle)}
              component="button"
              type="button"
              ref={overlayRef(overlay, handleKey(handle))}
              disabled={disabled}
              aria-label={label(handle)}
              aria-pressed={pressed}
              onPointerEnter={() => onHover(handle)}
              onPointerLeave={() => onHover(null)}
              {...handlersFor(handle)}
              sx={{
                // Placed, sized and turned along its half of the axis by
                // TranslationScene, every frame the gizmo turns
                position: "absolute",
                height: gripPx,
                transformOrigin: "0 50%",
                padding: 0,
                borderRadius: `${gripPx / 2}px`,
                border: "none",
                background: "transparent",
                cursor: disabled ? "default" : "pointer",
                touchAction: "none",
                userSelect: "none",
                "&:hover:not(:disabled)": { background: alpha(color, 0.12) },
                "&:focus-visible": {
                  outline: `2px solid ${theme.palette.primary.main}`,
                },
                ...(pressed && { background: alpha(color, 0.25) }),
              }}
            />
          )
        }),
      )}
    </>
  )
}
