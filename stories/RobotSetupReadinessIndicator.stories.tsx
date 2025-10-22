import type { Meta, StoryObj } from "@storybook/react"
import {
  RobotSetupReadinessIndicator,
  RobotSetupReadinessState,
} from "../src/components/RobotSetupReadinessIndicator"

const meta: Meta<typeof RobotSetupReadinessIndicator> = {
  title: "Components/RobotSetupReadinessIndicator",
  component: RobotSetupReadinessIndicator,
  tags: ["!dev"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    setupState: {
      control: "radio",
      options: [
        RobotSetupReadinessState.PRECONDITION_NOT_FULFILLED,
        RobotSetupReadinessState.ROBOT_DISCONNECTED,
        RobotSetupReadinessState.CELL_OPEN,
        RobotSetupReadinessState.E_STOP,
        RobotSetupReadinessState.READY,
      ],
      description: "The current setup readiness state of the robot",
      table: {
        type: {
          summary: "RobotSetupReadinessState",
        },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    setupState: RobotSetupReadinessState.READY,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {}
