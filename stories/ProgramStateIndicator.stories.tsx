import type { Meta, StoryObj } from "@storybook/react-vite"
import { ProgramStateIndicator } from "../src"

const meta: Meta<typeof ProgramStateIndicator> = {
  title: "Components/ProgramStateIndicator",
  component: ProgramStateIndicator,
  tags: ["!dev"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A state indicator component that displays the current program execution state combined with robot controller safety and operation mode states.

**Features:**
- Combines program state with safety and operation mode states
- Color-coded based on state severity (success, warning, error)
- Rendered as Material-UI filled chip
- Localization support via react-i18next
- Handles emergency stops, errors, and manual action requirements

**State Priority:**
1. Emergency Stop (E-Stop) - Highest priority, always shown
2. Stop States - Critical safety stops
3. Error States - System faults and unknown states  
4. Normal Operation - Program state (running, paused, idle, ready)
5. Manual Action Required - States requiring operator intervention

The component automatically determines the appropriate state to display based on the combination of program, safety, and operation mode states.
        `,
      },
    },
  },
  argTypes: {
    programState: {
      control: "select",
      options: ["idle", "running", "paused", "stopping"],
      description: "The current state of the program execution",
      table: {
        type: {
          summary: "'idle' | 'running' | 'paused' | 'stopping'",
        },
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
      description: "Current safety state of the robot controller",
    },
    operationMode: {
      control: "select",
      options: [
        "OPERATION_MODE_AUTO",
        "OPERATION_MODE_MANUAL",
        "OPERATION_MODE_MANUAL_T1",
        "OPERATION_MODE_MANUAL_T2",
      ],
      description: "Current operation mode of the robot controller",
    },
  },
  args: {
    programState: "idle",
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO",
  },
}

export default meta
type Story = StoryObj<typeof ProgramStateIndicator>

export const ReadyAuto: Story = {
  args: {
    programState: "idle",
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO",
  },
}

export const RunningAuto: Story = {
  args: {
    programState: "running",
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO",
  },
}

export const PausedAuto: Story = {
  args: {
    programState: "paused",
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO",
  },
}

export const ErrorAuto: Story = {
  args: {
    programState: "running",
    safetyState: "SAFETY_STATE_FAULT",
    operationMode: "OPERATION_MODE_AUTO",
  },
}

export const EStopAuto: Story = {
  args: {
    programState: "running",
    safetyState: "SAFETY_STATE_DEVICE_EMERGENCY_STOP",
    operationMode: "OPERATION_MODE_AUTO",
  },
}

export const StoppedAuto: Story = {
  args: {
    programState: "running",
    safetyState: "SAFETY_STATE_STOP",
    operationMode: "OPERATION_MODE_AUTO",
  },
}

export const RunningManual: Story = {
  args: {
    programState: "running",
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_MANUAL",
  },
}

export const RunningManualT1: Story = {
  args: {
    programState: "running",
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_MANUAL_T1",
  },
}

export const RunningManualT2: Story = {
  args: {
    programState: "running",
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_MANUAL_T2",
  },
}
