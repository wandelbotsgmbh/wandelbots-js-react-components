import Divider from "@mui/material/Divider"
import type { PopoverOrigin } from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import type { OperationMode, SafetyStateType } from "@wandelbots/nova-js/v2"
import { observer } from "mobx-react-lite"
import { useOptionalRobotSessionOf } from "../components/robotSession/RobotSessionProvider"
import { externalizeComponent } from "../externalizeComponent"
import type { RobotSession } from "../lib/robotSession/RobotSession"
import { robotSafetyOf } from "./robotSafetyOf"
import { ControllerTypeIndicator } from "./ControllerTypeIndicator"
import { OperationModeIndicator } from "./OperationModeIndicator"
import { SafetyStateIndicator } from "./SafetyStateIndicator"

export interface SafetyBarProps {
  isVirtual: boolean
  motionGroupId: string
  operationMode: OperationMode
  safetyState: SafetyStateType
  anchorOrigin?: PopoverOrigin
  transformOrigin?: PopoverOrigin
  compact?: boolean
}

/**
 * SafetyBar for a robot session (`session`, else the provider's): its safety
 * state, operation mode and controller type, which any of SafetyBarProps
 * given here replaces. Without a robot, e.g. while none is loaded, nothing.
 */
export type SafetyBarOfSessionProps = Partial<SafetyBarProps> & {
  session: RobotSession | null | undefined
}

/**
 * The robot's safety state, operation mode and controller type. Given a
 * robot session, it shows the robot's and follows them, e.g. an emergency
 * stop as soon as NOVA reports it: `<SafetyBar session={session} />`.
 */
export const SafetyBar = externalizeComponent(
  observer((props: SafetyBarProps | SafetyBarOfSessionProps) => {
    const {
      session,
      anchorOrigin,
      transformOrigin,
      compact = true,
      ...overrides
    }: Partial<SafetyBarOfSessionProps> = props
    const robot = useOptionalRobotSessionOf(session)
    const { isVirtual, motionGroupId, operationMode, safetyState } = {
      ...(robot && robotSafetyOf(robot)),
      ...overrides,
    }
    if (
      isVirtual === undefined ||
      motionGroupId === undefined ||
      operationMode === undefined ||
      safetyState === undefined
    ) {
      return null
    }
    const gap = compact ? 1 : 2

    return (
      <Stack
        direction="row"
        gap={gap}
        alignItems="center"
        sx={{ height: "24px" }}
      >
        <SafetyStateIndicator
          safetyState={safetyState}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          compact={compact}
        />

        <Divider orientation="vertical" flexItem />

        <OperationModeIndicator
          operationMode={operationMode}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          compact={compact}
        />

        <Divider orientation="vertical" flexItem />

        <ControllerTypeIndicator
          isVirtual={isVirtual}
          motionGroupId={motionGroupId}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          compact={compact}
        />
      </Stack>
    )
  }),
)

export default SafetyBar
