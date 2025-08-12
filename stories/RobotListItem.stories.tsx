import { Box } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react"
import { RobotListItem } from "../src/components/RobotListItem"
import { 
  RobotSetupReadinessIndicator,
  RobotSetupReadinessState 
} from "../src/components/RobotSetupReadinessIndicator"

const meta: Meta<typeof RobotListItem> = {
  title: "Components/RobotListItem",
  component: RobotListItem,
  tags: ["!dev"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    robotName: {
      control: "text",
      description: "The name of the robot",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    robotType: {
      control: "text",
      description: "The type/model of the robot",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    setupState: {
      control: "radio",
      options: [
        RobotSetupReadinessState.PRECONDITION_NOT_FULFILLED,
        RobotSetupReadinessState.ROBOT_DISCONNECTED,
        RobotSetupReadinessState.READY,
      ],
      description: "The current setup readiness state of the robot",
      table: {
        type: {
          summary: "RobotSetupReadinessState",
        },
      },
    },
    PreconditionComponent: {
      control: "select",
      options: ["RobotSetupReadinessIndicator", "null"],
      mapping: {
        RobotSetupReadinessIndicator: RobotSetupReadinessIndicator,
        null: null,
      },
      description: "Component to render for the precondition indicator. Pass null to hide it.",
      table: {
        type: {
          summary: "ComponentType<{ setupState: RobotSetupReadinessState }> | null",
        },
        defaultValue: {
          summary: "RobotSetupReadinessIndicator",
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
    robotName: "Robot A1",
    robotType: "Universal Robot UR5e",
    setupState: RobotSetupReadinessState.READY,
    PreconditionComponent: RobotSetupReadinessIndicator,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {}

export const RobotListExample: Story = {
  name: "Robot List",
  render: () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "fit-content",
      }}
    >
      <RobotListItem
        robotName="Robot A1"
        robotType="Universal Robot UR5e"
        setupState={RobotSetupReadinessState.READY}
      />
      <RobotListItem
        robotName="Robot B2"
        robotType="KUKA KR 6 R900 sixx"
        setupState={RobotSetupReadinessState.ROBOT_DISCONNECTED}
      />
      <RobotListItem
        robotName="Production Line Robot"
        robotType="ABB IRB 1200"
        setupState={RobotSetupReadinessState.PRECONDITION_NOT_FULFILLED}
      />
      <RobotListItem
        robotName="Quality Control Robot"
        robotType="Fanuc LR Mate 200iD"
        setupState={RobotSetupReadinessState.READY}
      />
      <RobotListItem
        robotName="Assembly Station Robot with Very Long Name"
        robotType="Staubli TX2-90L with Extended Specifications"
        setupState={RobotSetupReadinessState.ROBOT_DISCONNECTED}
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example showing multiple robot list items in different states, including text overflow handling for long names.",
      },
    },
  },
}
