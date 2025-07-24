import { Stack, Typography, useTheme } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { SafetyBar, type SafetyBarProps } from "../src"

const SafetyBarWrapper = (props: SafetyBarProps) => {
  const theme = useTheme()
  return (
    <Stack gap={4} sx={{ paddingTop: "1rem", paddingBottom: "3rem" }}>
      <Stack gap={2}>
        <Typography variant="body2" color={theme.palette.text.primary}>
          Compact
        </Typography>
        <SafetyBar {...props} />
      </Stack>
      <Stack gap={2}>
        <Typography variant="body2" color={theme.palette.text.primary}>
          Extended
        </Typography>
        <SafetyBar {...props} compact={false} />
      </Stack>
    </Stack>
  )
}

const meta: Meta<typeof SafetyBar> = {
  title: "Safety/SafetyBar",
  component: SafetyBarWrapper,
  tags: ["autodocs"],
  args: {
    isVirtual: false,
    motionGroupId: "robot1",
    operationMode: "OPERATION_MODE_AUTO",
    safetyState: "SAFETY_STATE_NORMAL",
    compact: true,
  },
  argTypes: {
    isVirtual: {
      control: "boolean",
      description: "Whether the robot is virtual or physical",
      table: {
        type: { summary: "boolean" },
      },
    },
    motionGroupId: {
      control: "text",
      description: "ID of the motion group",
      table: {
        type: { summary: "string" },
      },
    },
    operationMode: {
      control: "select",
      options: [
        "OPERATION_MODE_AUTO",
        "OPERATION_MODE_MANUAL",
        "OPERATION_MODE_MANUAL_T1",
        "OPERATION_MODE_MANUAL_T2",
      ],
      description: "Current operation mode of the robot",
    },
    compact: {
      control: "boolean",
      description: "Whether to display the safety bar in compact mode",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    safetyState: {
      control: "select",
      options: [
        "SAFETY_STATE_NORMAL",
        "SAFETY_STATE_DEVICE_EMERGENCY_STOP",
        "SAFETY_STATE_ROBOT_EMERGENCY_STOP",
        "SAFETY_STATE_STOP_0",
        "SAFETY_STATE_STOP_1",
        "SAFETY_STATE_STOP_2",
        "SAFETY_STATE_PROTECTIVE_STOP",
        "SAFETY_STATE_STOP",
        "SAFETY_STATE_REDUCED",
        "SAFETY_STATE_MASTERING",
        "SAFETY_STATE_CONFIRM_SAFETY",
        "SAFETY_STATE_OPERATOR_SAFETY",
        "SAFETY_STATE_RECOVERY",
        "SAFETY_STATE_VIOLATION",
        "SAFETY_STATE_UNKNOWN",
        "SAFETY_STATE_FAULT",
      ],
      description: "Current safety state of the robot",
    },
  },
}

export default meta
type Story = StoryObj<typeof SafetyBar>

export const Default: Story = {}

export const VirtualRobot: Story = {
  args: {
    isVirtual: true,
    motionGroupId: "virtual_robot",
  },
}

export const ManualMode: Story = {
  args: {
    operationMode: "OPERATION_MODE_MANUAL",
  },
}

export const EmergencyStop: Story = {
  args: {
    safetyState: "SAFETY_STATE_DEVICE_EMERGENCY_STOP",
  },
}

export const ProtectiveStop: Story = {
  args: {
    safetyState: "SAFETY_STATE_PROTECTIVE_STOP",
  },
}

export const ErrorState: Story = {
  args: {
    safetyState: "SAFETY_STATE_FAULT",
  },
}
