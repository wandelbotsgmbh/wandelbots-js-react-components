import { Divider, Stack, type PopoverOrigin } from "@mui/material"
import type { OperationMode, SafetyStateType } from "@wandelbots/nova-js/v2"
import { observer } from "mobx-react-lite"
import { externalizeComponent } from "../../externalizeComponent"
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

export const SafetyBar = externalizeComponent(
  observer(
    ({
      isVirtual,
      motionGroupId,
      operationMode,
      safetyState,
      anchorOrigin,
      transformOrigin,
      compact = true,
    }: SafetyBarProps) => {
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
    },
  ),
)
