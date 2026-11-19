import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import type { SxProps, Theme } from "@mui/material/styles"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import { CloseFilled } from "@wandelbots/icons/CloseFilled"
import { type RefObject, useState } from "react"
import { useTranslation } from "react-i18next"
import type { Quaternion } from "three"
import { externalizeComponent } from "../../externalizeComponent"
import type { JogAxis, JogDirection, JogHandle } from "../jogging/jogHandle"
import { type CartesianJogSettings, CartesianJogTab } from "./CartesianJogTab"

/** Whether a jog moves the TCP along the axes or turns it about them */
export type JogMotion = "translate" | "rotate"

/** A choice of one of the panel's selects */
export type RobotControlOption = {
  id: string
  /** As shown, e.g. "Flange" */
  label: string
}

/** A select of the panel, e.g. the TCP: the app gives its choices */
export type RobotControlSelect = {
  options: RobotControlOption[]
  /** The `id` of the chosen option */
  value: string
  onChange: (id: string) => void
}

/**
 * A jog velocity and its range, in NOVA's units: mm/s to translate, rad/s
 * to rotate. The panel shows mm/s and °/s.
 */
export type RobotControlVelocity = { value: number; min: number; max: number }

/** Jogging one step per press: what the app needs for the Increment mode */
export type RobotControlIncrements = {
  /**
   * The step sizes to choose from, in NOVA's units: mm to translate, rad to
   * rotate. The panel shows mm and degrees, and starts with the first.
   */
  steps: Record<JogMotion, number[]>
  /** A control was pressed: jog one step of `distance` */
  onStep: (
    motion: JogMotion,
    axis: JogAxis,
    direction: JogDirection,
    distance: number,
  ) => void
  /** The step that runs now: its control shows as pressed */
  running?: JogHandle | null
}

/**
 * Props of {@link RobotControlPanel}
 */
export type RobotControlPanelProps = {
  /** Shows a close button in the header that calls this */
  onClose?: () => void
  /** Disables every control, e.g. while another motion runs */
  disabled?: boolean
  /** The TCP to jog. Without it, the panel has no TCP select. */
  tcp?: RobotControlSelect
  /** The frame whose axes the TCP jogs along. Without it, no select. */
  jogFrame?: RobotControlSelect
  /** The velocity of each motion: see {@link RobotControlVelocity} */
  velocity: Record<JogMotion, RobotControlVelocity>
  /** The velocity of a motion was changed, in NOVA's units */
  onVelocityChange: (motion: JogMotion, value: number) => void
  /**
   * A jog control was pressed: jog along `axis` (or about it, to rotate)
   * until `onJogStop`
   */
  onJogStart: (
    motion: JogMotion,
    axis: JogAxis,
    direction: JogDirection,
  ) => void
  /**
   * The jog must stop: its control was let go, or the tab, the mode or the
   * view changed while it was held
   */
  onJogStop: () => void
  /**
   * The Increment mode, one step per press. Without it, the panel has no
   * Continuous/Increment toggle and jogs while a control is held.
   */
  increments?: RobotControlIncrements
  /**
   * NOVA's axes as the app's 3D view sees them, from a
   * `JoggingGizmoOrientation` in its scene: see `JoggingGizmo`. Without it,
   * the panel jogs with buttons and offers no gizmo.
   */
  gizmoOrientation?: RefObject<Quaternion | null>
  /** The orientation of the frame the gizmo jogs along: see `JoggingGizmo` */
  gizmoFrameQuaternion?: Quaternion | (() => Quaternion)
  /** Styles of the panel's box, e.g. its width */
  sx?: SxProps<Theme>
}

/**
 * The Robot control panel of the design: a header, the tabs Translate and
 * Rotate, and in them the TCP and the frame to jog along, Continuous or
 * Increment, the velocity, the step size, and the gizmo or the buttons.
 *
 * It moves nothing itself: the app gets the presses (`onJogStart`,
 * `onJogStop`, `increments.onStep`) and keeps the velocity and the selects
 * in its own store. The panel keeps the rest: the tab, the mode, the step
 * size and whether it shows the gizmo or the buttons.
 */
export const RobotControlPanel = externalizeComponent(
  ({ onClose, sx, ...props }: RobotControlPanelProps) => {
    const { t } = useTranslation()
    const [motion, setMotion] = useState<JogMotion>("translate")
    const [settings, setSettings] = useState<CartesianJogSettings>({
      mode: "continuous",
      view: "gizmo",
      step: { translate: 0, rotate: 0 },
    })
    const title = t("RobotControl.Title.ti")

    return (
      <Stack
        data-testid="robot-control-panel"
        sx={[
          (theme) => ({
            minHeight: 0,
            overflow: "hidden",
            borderRadius: "16px",
            background: theme.palette.backgroundPaperElevation?.[5],
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 20px 8px",
          }}
        >
          <Typography
            component="h2"
            color="text.primary"
            sx={{ fontSize: "20px" }}
          >
            {title}
          </Typography>
          {onClose && (
            <IconButton
              aria-label={t("RobotControl.Close.bt")}
              onClick={onClose}
              size="small"
            >
              <CloseFilled />
            </IconButton>
          )}
        </Stack>

        <Tabs
          value={motion}
          onChange={(_event, next: JogMotion) => setMotion(next)}
          aria-label={title}
          // The panel can get narrower than its tabs: scroll rather than
          // cut the last one off
          variant="scrollable"
          scrollButtons={false}
          sx={{
            marginX: "20px",
            borderBottom: 1,
            borderColor: "divider",
            // The theme gives tabs a background of their own; here they sit
            // on the panel
            background: "transparent",
          }}
        >
          <Tab
            value="translate"
            label={t("RobotControl.Tab.Translate.bt")}
            sx={{ minWidth: 0, paddingX: "12px", textTransform: "none" }}
          />
          <Tab
            value="rotate"
            label={t("RobotControl.Tab.Rotate.bt")}
            sx={{ minWidth: 0, paddingX: "12px", textTransform: "none" }}
          />
        </Tabs>

        <Stack sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden" }}>
          <CartesianJogTab
            {...props}
            motion={motion}
            settings={settings}
            onSettingsChange={setSettings}
          />
        </Stack>
      </Stack>
    )
  },
)
