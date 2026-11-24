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
import { JogDisabledReason } from "./JogDisabledReason"
import { JointJogTab } from "./JointJogTab"
import { MoveToTab } from "./MoveToTab"

/** Whether a jog moves the TCP along the axes or turns it about them */
export type JogMotion = "translate" | "rotate"

/** A tab of the panel */
export type RobotControlTab = JogMotion | "joint" | "moveTo"

/** Jogging while a control is held, or one step per press */
export type RobotControlJogMode = "continuous" | "increment"

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
  /**
   * The chosen step size of a motion, one of its `steps`. Without it, the
   * panel keeps its own choice (the first step to start with).
   */
  step?: Partial<Record<JogMotion, number>>
  /** A step size was chosen in the panel */
  onStepChange?: (motion: JogMotion, distance: number) => void
}

/** One joint of the Joint tab, in NOVA's units: rad, or mm for a linear axis */
export type RobotControlJoint = {
  /** Its live position */
  value: number
  /** Its lower limit: see `JoggingJointSlider` for a joint without limits */
  min?: number
  /** Its upper limit */
  max?: number
  /** What it is, e.g. "Base", shown after its label (J1, J2, …) */
  name?: string
}

/** The Joint tab: what the app gives to jog joint by joint */
export type RobotControlJoints = {
  /** The joints in order: the panel labels them J1, J2, … */
  joints: RobotControlJoint[]
  /** The joints are linear axes, in mm and mm/s. Defaults to revolute joints. */
  linear?: boolean
  /** The velocity of a joint jog: rad/s, or mm/s for linear axes */
  velocity: RobotControlVelocity
  onVelocityChange: (value: number) => void
  /**
   * A joint's slider was pressed: jog joint `index` (from 0) in `direction`
   * until `onJogStop`. As with `JoggingJointSlider`, one press can bring
   * several starts and stops, always in turn; when the goal passes the
   * joint, `onJogStop` and the `onJogStart` of the other way come in the
   * same event. One joint jogs at a time.
   */
  onJogStart: (index: number, direction: JogDirection) => void
  /** The joint must stop: it got to its goal, or its slider was let go */
  onJogStop: () => void
}

/**
 * A pose of the TCP: the position in mm and the orientation as a rotation
 * vector in rad, as NOVA gives it
 */
export type RobotControlPose = {
  position: [number, number, number]
  orientation: [number, number, number]
}

/**
 * Where the move to the typed pose is, as RobotPad's trajectory: "planning"
 * the move, "planned" and loaded so that the button can start it, "moving",
 * "stopping" after the release, or "idle" (no plan)
 */
export type RobotControlMoveState =
  | "idle"
  | "planning"
  | "planned"
  | "moving"
  | "stopping"

/**
 * The Move to tab, as RobotPad's pose field: what the app gives to move the
 * TCP to a typed pose. The field shows the TCP's current pose; Edit pose (or
 * a click on the field) makes it editable, and Save pose edit (or Enter)
 * makes the typed pose the target. Then Reset and the Move to button show:
 * held for 200 ms, it starts the move; let go, it pauses it. Once a move has
 * taken the TCP to the target and it stands still, the field shows the
 * current pose again.
 */
export type RobotControlMoveTo = {
  /**
   * The TCP's pose now, relative to the chosen `frame`. A function, read
   * every animation frame while the field shows it: the pose changes too
   * fast for a prop.
   */
  getCurrentPose: () => RobotControlPose | null
  /** The frame the typed pose is relative to ("Relative to"). Without it, no select. */
  frame?: RobotControlSelect
  /**
   * A typed pose became the target: plan the move to it and load it, so that
   * the button can start it at once. null: the field shows the current pose
   * again (Reset, the TCP arrived, another tab was chosen, or the TCP or the
   * frame changed): drop the plan. A held move gets its `onMoveStop` first.
   */
  onTargetChange: (pose: RobotControlPose | null) => void
  /** Where the move is: the button waits, says Moving… or Stopping… */
  state: RobotControlMoveState
  /** Why the TCP cannot move to the target, e.g. it is out of reach */
  error?: string | null
  /** The button was held 200 ms while the move was "planned": start it */
  onMoveStart: (pose: RobotControlPose) => void
  /**
   * The button was let go after a start, or the hold ended otherwise (e.g.
   * another tab, or editing another pose): pause the move
   */
  onMoveStop: () => void
}

/**
 * Props of {@link RobotControlPanel}
 */
export type RobotControlPanelProps = {
  /** Shows a close button in the header that calls this */
  onClose?: () => void
  /**
   * Disables every control: nothing may move and no setting may change. The
   * app's lock, e.g. while a program runs.
   */
  disabled?: boolean
  /**
   * Disables the jogging of the Translate, Rotate and Joint tabs, e.g. while
   * the robot is not activated or a trajectory moves it: the gizmo, the
   * buttons and the joint sliders, and the TCP select, whose change needs
   * the jogging connection as a jog does. The settings that move nothing
   * stay usable, so the user can prepare them: the frame to jog along,
   * Continuous or Increment, the step size and the velocity. Move to stays
   * usable too: a move of its own must not end because the app locks
   * jogging while it runs.
   */
  jogDisabled?: boolean
  /**
   * Why jogging is off, in the user's language, e.g. "The robot must be
   * activated first". The Translate and Rotate tabs show it in place of
   * their hint of how to jog, the Joint tab under its joints. The panel
   * shows it whenever it is given: give it while `jogDisabled` (or
   * `disabled`) is set for that reason.
   */
  jogDisabledReason?: string
  /**
   * Shows a Try again button under `jogDisabledReason`, for a reason that
   * the user can end: e.g. another client held the jogging connection. The
   * app then drops the reason and lets jogging be tried again.
   */
  onJogRetry?: () => void
  /**
   * The robot can jog its TCP along axes: the Translate and Rotate tabs.
   * False for a motion group without an inverse solver, e.g. a linear axis
   * or a turntable (see `JoggingStore.canJogCartesian`). Defaults to true.
   */
  cartesian?: boolean
  /** The tab to show. Without it, the panel keeps its own tab. */
  tab?: RobotControlTab
  /** A tab was chosen in the panel */
  onTabChange?: (tab: RobotControlTab) => void
  /** The jog mode. Without it, the panel keeps its own mode. */
  jogMode?: RobotControlJogMode
  /** A jog mode was chosen in the panel */
  onJogModeChange?: (mode: RobotControlJogMode) => void
  /** The TCP to jog. Without it, the panel has no TCP select. */
  tcp?: RobotControlSelect
  /**
   * The frame the TCP jogs relative to ("Move relative to"), e.g. a
   * coordinate system or the selected TCP. Without it, no select.
   */
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
  /** The Joint tab. Without it, the panel has none. */
  joints?: RobotControlJoints
  /**
   * The Move to tab. Without it, the panel has none. It moves with the
   * translation velocity (`velocity.translate`).
   */
  moveTo?: RobotControlMoveTo
  /** Styles of the panel's box, e.g. its width */
  sx?: SxProps<Theme>
}

/**
 * The Robot control panel of the design: a header, the tabs Translate and
 * Rotate, and in them the TCP and the frame to jog along, Continuous or
 * Increment, the velocity, the step size, and the gizmo or the buttons; the
 * tab Joint, with a slider per joint and the joint velocity; and the tab
 * Move to, with a target pose and a button to hold to move there.
 *
 * It moves nothing itself: the app gets the presses (`onJogStart`,
 * `onJogStop`, `increments.onStep`) and keeps the velocity and the selects
 * in its own store. The panel keeps the rest: the tab, the mode, the step
 * size and whether it shows the gizmo or the buttons.
 */
export const RobotControlPanel = externalizeComponent(
  ({
    onClose,
    sx,
    joints,
    moveTo,
    jogDisabled = false,
    jogDisabledReason,
    onJogRetry,
    cartesian = true,
    tab: appTab,
    onTabChange,
    jogMode,
    onJogModeChange,
    ...props
  }: RobotControlPanelProps) => {
    const { t } = useTranslation()
    const disabled = props.disabled ?? false
    // The panel's own tab, mode and step size: those the app does not give
    const [ownTab, setOwnTab] = useState<RobotControlTab>("translate")
    const [ownSettings, setOwnSettings] = useState<CartesianJogSettings>({
      mode: "continuous",
      view: "gizmo",
      step: { translate: 0, rotate: 0 },
    })
    // The tabs of what the robot can do and the app gives
    const tabs: RobotControlTab[] = [
      ...(cartesian ? (["translate", "rotate"] as const) : []),
      ...(joints ? (["joint"] as const) : []),
      ...(moveTo ? (["moveTo"] as const) : []),
    ]
    const chosenTab = appTab ?? ownTab
    // A tab that is not there gives way to the first one
    const tab: RobotControlTab | undefined = tabs.includes(chosenTab)
      ? chosenTab
      : tabs[0]
    const settings = withAppSettings(ownSettings, jogMode, props.increments)
    const title = t("RobotControl.Title.ti")
    // The same on every jog tab; each tab puts it where it fits
    const jogDisabledNotice = jogDisabledReason ? (
      <JogDisabledReason
        text={jogDisabledReason}
        onRetry={onJogRetry}
        disabled={disabled}
      />
    ) : undefined

    function changeTab(next: RobotControlTab) {
      setOwnTab(next)
      onTabChange?.(next)
    }

    function changeSettings(next: CartesianJogSettings) {
      setOwnSettings(next)
      if (next.mode !== settings.mode) onJogModeChange?.(next.mode)
      for (const motion of ["translate", "rotate"] as const) {
        const distance = props.increments?.steps[motion][next.step[motion]]
        if (
          next.step[motion] !== settings.step[motion] &&
          distance !== undefined
        ) {
          props.increments?.onStepChange?.(motion, distance)
        }
      }
    }

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
          value={tab ?? false}
          onChange={(_event, next: RobotControlTab) => changeTab(next)}
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
          {cartesian && (
            <Tab
              value="translate"
              label={t("RobotControl.Tab.Translate.bt")}
              sx={{ minWidth: 0, paddingX: "12px", textTransform: "none" }}
            />
          )}
          {cartesian && (
            <Tab
              value="rotate"
              label={t("RobotControl.Tab.Rotate.bt")}
              sx={{ minWidth: 0, paddingX: "12px", textTransform: "none" }}
            />
          )}
          {joints && (
            <Tab
              value="joint"
              label={t("RobotControl.Tab.Joint.bt")}
              sx={{ minWidth: 0, paddingX: "12px", textTransform: "none" }}
            />
          )}
          {moveTo && (
            <Tab
              value="moveTo"
              label={t("RobotControl.Tab.MoveTo.bt")}
              sx={{ minWidth: 0, paddingX: "12px", textTransform: "none" }}
            />
          )}
        </Tabs>

        <Stack sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden" }}>
          {tab === "joint" && joints ? (
            <JointJogTab
              joints={joints}
              disabled={disabled}
              jogDisabled={jogDisabled}
              disabledReason={jogDisabledNotice}
            />
          ) : tab === "moveTo" && moveTo ? (
            <MoveToTab
              moveTo={moveTo}
              tcp={props.tcp}
              velocity={props.velocity.translate}
              onVelocityChange={(value) =>
                props.onVelocityChange("translate", value)
              }
              disabled={disabled}
            />
          ) : tab === "translate" || tab === "rotate" ? (
            <CartesianJogTab
              {...props}
              disabled={disabled}
              jogDisabled={jogDisabled}
              jogDisabledReason={jogDisabledNotice}
              motion={tab}
              settings={settings}
              onSettingsChange={changeSettings}
            />
          ) : null}
        </Stack>
      </Stack>
    )
  },
)

/**
 * The jog settings as shown: the panel's own, with the jog mode and the
 * step sizes the app gives instead, where it gives them
 */
function withAppSettings(
  own: CartesianJogSettings,
  jogMode: RobotControlJogMode | undefined,
  increments: RobotControlIncrements | undefined,
): CartesianJogSettings {
  const stepIndex = (motion: JogMotion) => {
    const distance = increments?.step?.[motion]
    if (distance === undefined) return own.step[motion]
    const index = increments?.steps[motion].findIndex(
      (step) => Math.abs(step - distance) <= 1e-9 * Math.max(1, Math.abs(step)),
    )
    return index === undefined || index < 0 ? own.step[motion] : index
  }
  return {
    ...own,
    mode: jogMode ?? own.mode,
    step: { translate: stepIndex("translate"), rotate: stepIndex("rotate") },
  }
}
