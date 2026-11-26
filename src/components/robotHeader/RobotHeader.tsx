import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import type { SxProps, Theme } from "@mui/material/styles"
import { type ReactNode, useId } from "react"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../../externalizeComponent"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { SafetyBar, type SafetyBarProps } from "../../SafetyBar/SafetyBar"
import type { AppItem } from "../AppHeader"
import type { RobotControlSelect } from "../robotControl/RobotControlPanel"
import { SmallSelect } from "../robotControl/SmallSelect"
import { ActivationSwitch } from "./ActivationSwitch"
import { AppNavigation } from "./AppNavigation"

/** Whether the robot is activated: its controller in control mode */
export type RobotHeaderActivationState =
  | "inactive"
  | "activating"
  | "active"
  | "deactivating"

/** The activation switch: the app changes the controller's mode */
export type RobotHeaderActivation = {
  state: RobotHeaderActivationState
  /** The robot cannot be activated now, e.g. at an emergency stop */
  disabled?: boolean
  /** Activates an inactive robot, deactivates an active one */
  onToggle: () => void
}

/** What the app gives RobotHeader */
export type RobotHeaderProps = {
  /** The app's icon before its name, e.g. Robot Pad's robot arm */
  appIcon?: ReactNode
  appName: string
  /** The apps of the app menu (the grid button) */
  apps?: AppItem[]
  onAppSelect?: (app: AppItem) => void
  /** The search button; none without it */
  onSearch?: () => void
  /** The motion group select */
  motionGroup?: RobotControlSelect
  /**
   * The robot whose safety state and activation switch the header shows.
   * Without one, e.g. while no robot is loaded, the header shows neither.
   */
  session?: RobotSession | null
  /**
   * The safety state, operation mode and controller type (the SafetyBar),
   * instead of the session's: for an app without a `RobotSession`
   */
  safety?: Pick<
    SafetyBarProps,
    "isVirtual" | "motionGroupId" | "operationMode" | "safetyState"
  >
  /**
   * The activation switch, instead of the session's: for an app without a
   * `RobotSession`
   */
  activation?: RobotHeaderActivation
  /** The app's own buttons at the right, e.g. notifications and Add robot */
  actions?: ReactNode
  sx?: SxProps<Theme>
}

/** Hidden from sight, read by screen readers: the select's name */
const VISUALLY_HIDDEN = {
  position: "absolute",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const

/**
 * The header of a robot app, as Figma's top bar: the app menu, search and
 * the app's name at the left; the motion group, its safety state, operation
 * mode and controller type, and the activation switch in the middle; the
 * app's own buttons at the right.
 *
 * Given a robot session, it shows the robot's safety state and activation
 * switch and follows them: the switch is off while NOVA would refuse it, and
 * a refused mode change goes to the session's `onError`.
 *
 * ```tsx
 * <RobotHeader appName="My app" session={session} actions={<ConnectionWarning session={session} />} />
 * ```
 */
export const RobotHeader = externalizeComponent(
  ({
    appIcon,
    appName,
    apps = [],
    onAppSelect,
    onSearch,
    motionGroup,
    session,
    safety,
    activation,
    actions,
    sx,
  }: RobotHeaderProps) => {
    const { t } = useTranslation()
    const motionGroupLabelId = useId()
    const robot = session ?? null

    return (
      <Stack
        component="header"
        direction="row"
        data-testid="robot-header"
        sx={[
          (theme) => ({
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            padding: "8px 24px",
            minHeight: "52px",
            boxSizing: "border-box",
            background: theme.palette.backgroundPaperElevation?.[1],
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <AppNavigation
          appIcon={appIcon}
          appName={appName}
          apps={apps}
          onAppSelect={onAppSelect}
          onSearch={onSearch}
        />

        <Stack direction="row" sx={{ gap: "20px", alignItems: "center" }}>
          {motionGroup && (
            <>
              <Box
                component="span"
                id={motionGroupLabelId}
                sx={VISUALLY_HIDDEN}
              >
                {t("RobotHeader.MotionGroup.lb")}
              </Box>
              <SmallSelect
                labelId={motionGroupLabelId}
                width="240px"
                {...motionGroup}
              />
            </>
          )}
          {safety ? (
            <SafetyBar {...safety} />
          ) : (
            robot && <SafetyBar session={robot} />
          )}
          {activation ? (
            <ActivationSwitch {...activation} />
          ) : (
            robot && <ActivationSwitch session={robot} />
          )}
        </Stack>

        <Stack direction="row" sx={{ gap: "24px", alignItems: "center" }}>
          {actions}
        </Stack>
      </Stack>
    )
  },
)
