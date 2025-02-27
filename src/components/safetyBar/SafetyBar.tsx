import { Divider, Stack } from "@mui/material"
import type {
  RobotControllerStateOperationModeEnum,
  RobotControllerStateSafetyStateEnum,
} from "@wandelbots/wandelbots-js"
import { observer } from "mobx-react-lite"
import { externalizeComponent } from "../../externalizeComponent"
import { ControllerTypeIndicator } from "./ControllerTypeIndicator"
import { OperationModeIndicator } from "./OperationModeIndicator"
import { SafetyStateIndicator } from "./SafetyStateIndicator"

export interface SafetyBarProps {
  isVirtual: boolean
  motionGroupId: string
  operationMode: RobotControllerStateOperationModeEnum
  safetyState: RobotControllerStateSafetyStateEnum
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
