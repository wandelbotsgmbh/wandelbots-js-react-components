import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import { JOG_AXES, JOG_DIRECTIONS } from "../jogHandle"
import {
  axisColor,
  focusOutline,
  type GizmoHandlesProps,
  gizmoMeasures,
  gripProps,
  gripStyle,
  handleKey,
  handleState,
  highlightOf,
  labelKey,
  overlayRef,
} from "./gizmoShared"

/**
 * The translation handles: a button per direction, a bar along its half of
 * the axis, so it can be grabbed anywhere along it. And the axis labels.
 */
export function TranslationHandles(props: GizmoHandlesProps) {
  const { disabled, label, overlay, size } = props
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
          const state = handleState(handle, props)
          return (
            <Box
              key={handleKey(handle)}
              component="button"
              type="button"
              ref={overlayRef(overlay, handleKey(handle))}
              disabled={disabled}
              aria-label={label(handle)}
              aria-pressed={state.pressed}
              {...gripProps(handle, props)}
              sx={{
                // Placed, sized and turned along its half of the axis by
                // TranslationScene, every frame the gizmo turns
                position: "absolute",
                height: gripPx,
                transformOrigin: "0 50%",
                padding: 0,
                borderRadius: `${gripPx / 2}px`,
                border: "none",
                background: highlightOf(axisColor(axis), state),
                "&:focus-visible": { outline: focusOutline(theme) },
                ...gripStyle(disabled),
              }}
            />
          )
        }),
      )}
    </>
  )
}
