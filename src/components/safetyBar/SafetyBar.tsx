import { Divider, Stack } from "@mui/material"
import { observer } from "mobx-react-lite"
import { externalizeComponent } from "../../externalizeComponent"
import { ControllerTypeIndicator } from "./ControllerTypeIndicator"
import { OperationModeIndicator } from "./OperationModeIndicator"
import { SafetyStateIndicator } from "./SafetyStateIndicator"

export type OperationMode =
  | "OPERATION_MODE_AUTO"
  | "OPERATION_MODE_MANUAL"
  | "OPERATION_MODE_MANUAL_T1"
  | "OPERATION_MODE_MANUAL_T2"

export type SafetyState =
  | "SAFETY_STATE_NORMAL"
  | "SAFETY_STATE_DEVICE_EMERGENCY_STOP"
  | "SAFETY_STATE_ROBOT_EMERGENCY_STOP"
  | "SAFETY_STATE_STOP_0"
  | "SAFETY_STATE_STOP_1"
  | "SAFETY_STATE_STOP_2"
  | "SAFETY_STATE_PROTECTIVE_STOP"
  | "SAFETY_STATE_STOP"
  | "SAFETY_STATE_REDUCED"
  | "SAFETY_STATE_MASTERING"
  | "SAFETY_STATE_CONFIRM_SAFETY"
  | "SAFETY_STATE_OPERATOR_SAFETY"
  | "SAFETY_STATE_RECOVERY"
  | "SAFETY_STATE_VIOLATION"
  | "SAFETY_STATE_UNKNOWN"
  | "SAFETY_STATE_FAULT"

export interface SafetyBarProps {
  isVirtual: boolean
  motionGroupId: string
  operationMode: OperationMode
  safetyState: SafetyState
}

export const SafetyBar = externalizeComponent(
  observer((props: SafetyBarProps) => {
    return (
      <Stack
        direction="row"
        gap="8px"
        alignItems="center"
        sx={{ height: "24px" }}
      >
        <SafetyStateIndicator safetyState={props.safetyState} />

        <Divider orientation="vertical" flexItem />

        <OperationModeIndicator operationMode={props.operationMode} />

        <Divider orientation="vertical" flexItem />

        <ControllerTypeIndicator
          isVirtual={props.isVirtual}
          motionGroupId={props.motionGroupId}
        />
      </Stack>
    )
  }),
)
