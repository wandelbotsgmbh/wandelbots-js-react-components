import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import { Fragment } from "react"
import { JOG_AXES, JOG_DIRECTIONS } from "../jogHandle"
import {
  axisColor,
  focusKey,
  focusOutline,
  type GizmoHandlesProps,
  gizmoMeasures,
  gripProps,
  gripStyle,
  HALVES,
  halfKey,
  haloKey,
  handleKey,
  handleState,
  highlightOf,
  NOWHERE,
  overlayRef,
} from "./gizmoShared"

/**
 * The rotation handles: a round button on each arrowhead, which names the
 * handle and takes the keyboard's focus, and a band along its arc, so it can
 * be grabbed anywhere along it
 */
export function RotationHandles(props: GizmoHandlesProps) {
  const { disabled, label, overlay, size } = props
  const theme = useTheme()
  const { gripPx } = gizmoMeasures(size)

  return JOG_AXES.flatMap((axis) =>
    JOG_DIRECTIONS.map((direction) => {
      const handle = { axis, direction }
      const state = handleState(handle, props)
      const grip = gripProps(handle, props)

      return (
        <Fragment key={handleKey(handle)}>
          {/* The highlight of the whole band, drawn once */}
          <Box
            component="span"
            aria-hidden
            ref={overlayRef(overlay, haloKey(handle))}
            sx={{
              // Cut to the band along the arc by RotationScene
              position: "absolute",
              inset: 0,
              clipPath: NOWHERE,
              pointerEvents: "none",
              background: highlightOf(axisColor(axis), state),
            }}
          />
          {HALVES.map((half) => (
            <Box
              key={half}
              component="span"
              aria-hidden
              ref={overlayRef(overlay, halfKey(handle, half))}
              {...grip}
              sx={{
                // Covers the gizmo, cut to its half of the band by
                // RotationScene, every frame the gizmo turns
                position: "absolute",
                inset: 0,
                clipPath: NOWHERE,
                ...gripStyle(disabled),
              }}
            />
          ))}
          <Box
            component="button"
            type="button"
            ref={overlayRef(overlay, handleKey(handle))}
            disabled={disabled}
            aria-label={label(handle)}
            aria-pressed={state.pressed}
            {...grip}
            sx={{
              // Placed on the arrowhead by RotationScene. It shows nothing
              // itself: the band's highlight covers the arrowhead
              position: "absolute",
              width: gripPx,
              height: gripPx,
              transform: "translate(-50%, -50%)",
              padding: 0,
              border: "none",
              borderRadius: "50%",
              background: "transparent",
              // Around the arrowhead only where the arc has no band; else
              // the ring below goes around the whole band
              "&:focus-visible": { outline: focusOutline(theme) },
              "&[data-band='shown']:focus-visible": { outline: "none" },
              ...gripStyle(disabled),
            }}
          />
          {/* The keyboard's focus ring around the band, as the translation
              handles have it around their bar. It follows the button. */}
          <Box
            component="svg"
            aria-hidden
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              width: size,
              height: size,
              overflow: "visible",
              pointerEvents: "none",
              display: "none",
              zIndex: 100,
              "button[data-band='shown']:focus-visible + &": {
                display: "block",
              },
            }}
          >
            <path
              ref={overlayRef(overlay, focusKey(handle))}
              fill="none"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              strokeLinejoin="round"
            />
          </Box>
        </Fragment>
      )
    }),
  )
}
