import Box from "@mui/material/Box"
import { buttonClasses } from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { alpha } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { Rotation } from "@wandelbots/icons/Rotation"
import { SecondaryButton } from "@wandelbots/mui"
import { externalizeComponent } from "../../externalizeComponent"
import {
  JOG_AXES,
  JOG_DIRECTIONS,
  type JogAxis,
  type JogHandle,
  jogHandleName,
} from "./jogHandle"
import { jogAxisColors } from "./joggingColors"
import { type JogControlsProps, useJogControls } from "./useJogControls"

/**
 * Props of {@link JoggingButtons}: the same as those of JoggingGizmo, less
 * what only a 3D drawing needs
 */
export type JoggingButtonsProps = JogControlsProps

/**
 * The label of a row: its axis, in the axis color. Dimmed while the buttons
 * are disabled, as the gizmo dims its axis labels.
 */
function AxisLabel({
  axis,
  motion,
  disabled,
}: {
  axis: JogAxis
  motion: "translate" | "rotate"
  disabled: boolean
}) {
  const color = jogAxisColors[axis]
  return (
    <Box
      aria-hidden
      sx={{
        opacity: disabled ? 0.4 : 1,
        width: 30,
        height: 30,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        backgroundColor: alpha(color, 0.15),
        border: `1px solid ${alpha(color, 0.4)}`,
      }}
    >
      <Typography variant="caption" sx={{ color }}>
        {motion === "rotate" ? `R${axis}` : axis.toUpperCase()}
      </Typography>
    </Box>
  )
}

/** The way a rotate button turns: mirrored for minus */
function turnIcon(handle: JogHandle) {
  return (
    <Rotation
      style={handle.direction === "-" ? { transform: "scaleX(-1)" } : undefined}
    />
  )
}

/**
 * Jogging by buttons: a row per axis with a minus and a plus button, held to
 * jog. `motion` picks whether they move the robot along the axes (X-, X+) or
 * turn it about them (Rx-, Rx+).
 *
 * Unlike JoggingGizmo, the buttons do not turn with the 3D view: X+ is X+ of
 * the jog frame, wherever the camera looks from. They take the same props as
 * the gizmo, so an app wires both the same way.
 */
export const JoggingButtons = externalizeComponent(
  (props: JoggingButtonsProps) => {
    const { motion = "translate", disabled = false } = props
    const { handlersFor, label, isPressed } = useJogControls(props)

    return (
      <Stack
        data-testid="jogging-buttons"
        sx={{ gap: "16px", width: 280, maxWidth: "100%" }}
      >
        {JOG_AXES.map((axis) => (
          <Stack
            key={axis}
            direction="row"
            sx={{ alignItems: "center", gap: "16px" }}
          >
            <AxisLabel axis={axis} motion={motion} disabled={disabled} />
            {JOG_DIRECTIONS.map((direction) => {
              const handle = { axis, direction }
              const pressed = isPressed(handle)
              const icon = motion === "rotate" ? turnIcon(handle) : undefined
              const color = jogAxisColors[axis]
              const pressedLook = {
                backgroundColor: alpha(color, 0.25),
                borderColor: alpha(color, 0.4),
              }
              return (
                <SecondaryButton
                  key={direction}
                  size="large"
                  disabled={disabled}
                  aria-label={label(handle)}
                  aria-pressed={pressed}
                  startIcon={direction === "-" ? icon : undefined}
                  endIcon={direction === "+" ? icon : undefined}
                  {...handlersFor(handle)}
                  sx={{
                    flex: 1,
                    // A held button must not scroll the page or select text
                    touchAction: "none",
                    userSelect: "none",
                    // The turn icon as the design has it: 24 px, in the 18 px
                    // wide slot of its icon, so the label stays where it is
                    "& svg": { width: 24, height: 24 },
                    [`& .${buttonClasses.startIcon}`]: { marginLeft: "-6px" },
                    [`& .${buttonClasses.endIcon}`]: { marginRight: "-6px" },
                    // Pressed also while disabled: an app disables the
                    // buttons while a step runs, and shows that step with
                    // activeHandle
                    ...(pressed && {
                      ...pressedLook,
                      [`&.${buttonClasses.disabled}`]: pressedLook,
                    }),
                  }}
                >
                  {jogHandleName(handle, motion)}
                </SecondaryButton>
              )
            })}
          </Stack>
        ))}
      </Stack>
    )
  },
)
