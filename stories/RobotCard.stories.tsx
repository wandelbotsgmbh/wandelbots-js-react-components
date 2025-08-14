import { Box, Stack } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ConnectedMotionGroup, DHParameter } from "@wandelbots/nova-js/v1"
import { ProgramState } from "../src/components/ProgramControl"
import { RobotCard } from "../src/components/RobotCard"
import { Robot } from "../src/components/robots/Robot"
import { rapidlyChangingMotionState } from "./robots/motionState"
import { getDHParams } from "./robots/robotStoryConfig"

// Component that creates a mock ConnectedMotionGroup for the story with real robot models
function RobotCardWithMockConnectedMotionGroup(
  props: Omit<
    React.ComponentProps<typeof RobotCard>,
    "connectedMotionGroup"
  > & {
    modelFromController: string
    dhParameters?: DHParameter[]
  },
) {
  const mockConnectedMotionGroup = {
    rapidlyChangingMotionState,
    modelFromController: props.modelFromController,
    dhParameters: props.dhParameters || [],
    // Add other required properties for ConnectedMotionGroup interface
    motionGroupId: "0",
    controllerId: props.modelFromController,
  } as Partial<ConnectedMotionGroup> as ConnectedMotionGroup

  const { modelFromController: _, dhParameters: __, ...cardProps } = props
  return (
    <RobotCard
      {...cardProps}
      connectedMotionGroup={mockConnectedMotionGroup}
      robotComponent={
        props.robotComponent ||
        ((robotProps) => (
          <Robot
            {...robotProps}
            getModel={(modelFromController: string) => {
              // Fetch from storybook rather than CDN to ensure version alignment
              return `./models/${modelFromController}.glb`
            }}
          />
        ))
      }
    />
  )
}

const meta: Meta<typeof RobotCardWithMockConnectedMotionGroup> = {
  title: "Components/RobotCard",
  component: RobotCardWithMockConnectedMotionGroup,
  tags: ["!dev"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A responsive card component that displays a 3D robot with controls and state indicators.

## Usage

\`\`\`tsx
import { RobotCard, CycleTimer } from '@wandelbots/wandelbots-js-react-components'
import { 
  NovaClient,
  RobotControllerStateSafetyStateEnum,
  RobotControllerStateOperationModeEnum 
} from '@wandelbots/nova-js/v1'
import { ProgramState } from '@wandelbots/wandelbots-js-react-components'
import { useState, useCallback } from 'react'

function MyRobotDashboard() {
  const [programState, setProgramState] = useState<ProgramState>(ProgramState.IDLE)
  
  const nova = new NovaClient({ instanceUrl: 'https://your-robot.com' })
  const connectedMotionGroup = nova.connectMotionGroup(await nova.getMotionGroup('0'))

  // Custom timer that starts a cycle automatically
  const CustomTimer = useCallback((props) => (
    <CycleTimer
      {...props}
      onCycleComplete={(controls) => {
        // Start a 30 second production cycle
        controls.startNewCycle(30)
        setProgramState(ProgramState.RUNNING)
      }}
      onCycleEnd={() => {
        setProgramState(ProgramState.IDLE)
      }}
    />
  ), [])

  return (
    <RobotCard
      robotName="Production Robot"
      programState={programState}
      safetyState={RobotControllerStateSafetyStateEnum.SAFETY_STATE_NORMAL}
      operationMode={RobotControllerStateOperationModeEnum.OPERATION_MODE_AUTO}
      connectedMotionGroup={connectedMotionGroup}
      cycleTimerComponent={CustomTimer}
      driveToHomeEnabled={true}
    />
  )
}
\`\`\`
        `,
      },
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
  },
  argTypes: {
    robotName: {
      control: "text",
      description: "Name of the robot displayed at the top",
      table: {
        type: { summary: "string" },
      },
    },
    programState: {
      control: "select",
      options: [
        ProgramState.IDLE,
        ProgramState.RUNNING,
        ProgramState.PAUSED,
        ProgramState.STOPPING,
      ],
      description: "The current state of the program execution",
      table: {
        type: {
          summary: "ProgramState",
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
    driveToHomeEnabled: {
      control: "boolean",
      description: "Whether the Drive to Home button should be enabled",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    onDriveToHomePress: {
      action: "onDriveToHomePress",
      description: "Callback fired when Drive to Home button is pressed",
    },
    onDriveToHomeRelease: {
      action: "onDriveToHomeRelease",
      description: "Callback fired when Drive to Home button is released",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    modelFromController: {
      control: "select",
      options: [
        "UniversalRobots_UR3e",
        "UniversalRobots_UR5e",
        "UniversalRobots_UR10e",
        "UniversalRobots_UR16e",
        "KUKA_KR6_R700_2",
        "KUKA_KR10_R1100_2",
        "ABB_1200_07_7",
        "FANUC_CRX10iA",
      ],
      description: "Robot model to display",
      table: {
        type: { summary: "string" },
      },
    },
  },
  args: {
    robotName: "UR5e Robot",
    programState: ProgramState.IDLE,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO",
    driveToHomeEnabled: true,
    modelFromController: "UniversalRobots_UR5e",
  },
}

export default meta
type Story = StoryObj<typeof RobotCardWithMockConnectedMotionGroup>

/**
 * Interactive RobotCard that responds to all control parameters.
 * Use the controls panel to modify robot name, states, layout, and other properties
 * to explore the component's behavior and visual appearance.
 */
export const Interactive: Story = {
  args: {
    // Inherit from meta args but make them explicit for this story
    robotName: "UR5e Robot",
    programState: ProgramState.IDLE,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO",
    driveToHomeEnabled: true,
    modelFromController: "UniversalRobots_UR5e",
  },
  loaders: [
    async (context) => ({
      dhParameters: await getDHParams(
        context.args.modelFromController || "UniversalRobots_UR5e",
      ),
    }),
  ],
  render: function Render(args, { loaded: { dhParameters } }) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2,
          width: 484,
          height: 578,
        }}
      >
        <RobotCardWithMockConnectedMotionGroup
          {...args}
          dhParameters={dhParameters}
        />
      </Box>
    )
  },
}

/**
 * Basic RobotCard showing the component structure without complex interactions.
 * This demonstrates the layout and visual hierarchy of the card.
 */
export const Basic: Story = {
  args: {
    driveToHomeEnabled: false,
  },
  loaders: [
    async () => ({
      dhParameters: await getDHParams("UniversalRobots_UR5e"),
    }),
  ],
  render: function Render(args, { loaded: { dhParameters } }) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2,
          width: 484,
          height: 578,
        }}
      >
        <RobotCardWithMockConnectedMotionGroup
          {...args}
          dhParameters={dhParameters}
        />
      </Box>
    )
  },
}

/**
 * Multiple robot cards displayed in a MUI Stack with landscape orientation
 * to demonstrate how they would appear in a multi-robot monitoring interface.
 * Each card shows a different robot model with various states in landscape format,
 * demonstrating the behavior of RobotCards within a Material-UI Stack component.
 */
export const MultipleRobots: Story = {
  loaders: [
    async () => ({
      robotConfigs: await Promise.all([
        {
          model: "UniversalRobots_UR5e",
          dhParameters: await getDHParams("UniversalRobots_UR5e"),
        },
        {
          model: "UniversalRobots_UR10e",
          dhParameters: await getDHParams("UniversalRobots_UR10e"),
        },
        {
          model: "KUKA_KR6_R700_2",
          dhParameters: await getDHParams("KUKA_KR6_R700_2"),
        },
        {
          model: "FANUC_CRX10iA",
          dhParameters: await getDHParams("FANUC_CRX10iA"),
        },
      ]),
    }),
  ],
  render: function Render(args, { loaded: { robotConfigs } }) {
    const robots = [
      {
        name: "UR5e Station A",
        modelFromController: robotConfigs[0].model,
        dhParameters: robotConfigs[0].dhParameters,
        programState: ProgramState.RUNNING,
        safetyState: "SAFETY_STATE_NORMAL" as const,
      },
      {
        name: "UR10e Station B",
        modelFromController: robotConfigs[1].model,
        dhParameters: robotConfigs[1].dhParameters,
        programState: ProgramState.PAUSED,
        safetyState: "SAFETY_STATE_NORMAL" as const,
      },
      {
        name: "KUKA Station C",
        modelFromController: robotConfigs[2].model,
        dhParameters: robotConfigs[2].dhParameters,
        programState: ProgramState.IDLE,
        safetyState: "SAFETY_STATE_STOP" as const,
      },
      {
        name: "FANUC Station D",
        modelFromController: robotConfigs[3].model,
        dhParameters: robotConfigs[3].dhParameters,
        programState: ProgramState.STOPPING,
        safetyState: "SAFETY_STATE_DEVICE_EMERGENCY_STOP" as const,
      },
    ]

    return (
      <Stack
        spacing={1}
        sx={{
          padding: 1,
          width: 500,
          overflow: "auto", // Allow horizontal scrolling if needed
        }}
      >
        {robots.map((robot) => (
          <Box
            key={robot.name}
            sx={{
              height: 300,
            }}
          >
            <RobotCardWithMockConnectedMotionGroup
              {...args}
              robotName={robot.name}
              modelFromController={robot.modelFromController}
              dhParameters={robot.dhParameters}
              programState={robot.programState}
              safetyState={robot.safetyState}
              driveToHomeEnabled={robot.programState === ProgramState.IDLE}
            />
          </Box>
        ))}
      </Stack>
    )
  },
}

/**
 * Compact variant of the robot card with smaller dimensions
 * suitable for dense dashboard layouts.
 */
export const CompactSize: Story = {
  args: {
    robotName: "Compact UR3e",
    modelFromController: "UniversalRobots_UR3e",
  },
  loaders: [
    async () => ({
      dhParameters: await getDHParams("UniversalRobots_UR3e"),
    }),
  ],
  render: function Render(args, { loaded: { dhParameters } }) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2,
          width: 300,
          height: 400,
        }}
      >
        <RobotCardWithMockConnectedMotionGroup
          {...args}
          dhParameters={dhParameters}
        />
      </Box>
    )
  },
}

/**
 * Landscape layout demonstration showing how the RobotCard automatically
 * adapts to landscape aspect ratios by placing the robot on the left and
 * content on the right with left-aligned text elements.
 */
export const LandscapeLayout: Story = {
  loaders: [
    async () => ({
      dhParameters: await getDHParams("UniversalRobots_UR5e"),
    }),
  ],
  render: function Render(args, { loaded: { dhParameters } }) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          padding: 2,
        }}
      >
        {/* Landscape orientation container */}
        <Box
          sx={{
            width: 800,
            height: 400,
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 1,
          }}
        >
          <Box
            sx={{
              typography: "subtitle2",
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            Landscape Mode (800×400) - Robot on Left, Content on Right
          </Box>
          <Box sx={{ flex: 1 }}>
            <RobotCardWithMockConnectedMotionGroup
              {...args}
              dhParameters={dhParameters}
              robotName="UR5e Landscape"
              programState={ProgramState.RUNNING}
              safetyState="SAFETY_STATE_NORMAL"
            />
          </Box>
        </Box>

        {/* Portrait orientation container for comparison */}
        <Box
          sx={{
            width: 400,
            height: 600,
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 1,
          }}
        >
          <Box
            sx={{
              typography: "subtitle2",
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            Portrait Mode (400×600) - Vertical Layout
          </Box>
          <Box sx={{ flex: 1 }}>
            <RobotCardWithMockConnectedMotionGroup
              {...args}
              dhParameters={dhParameters}
              robotName="UR5e Portrait"
              programState={ProgramState.IDLE}
              safetyState="SAFETY_STATE_NORMAL"
            />
          </Box>
        </Box>

        <Box
          sx={{
            maxWidth: 600,
            textAlign: "center",
            color: "text.secondary",
            typography: "body2",
          }}
        >
          The RobotCard automatically detects its container's aspect ratio and
          adjusts the layout accordingly:
          <br />• <strong>Landscape:</strong> Robot positioned on left (50%
          width), content on right with left-aligned text
          <br />• <strong>Portrait:</strong> Traditional vertical layout with
          robot in center
        </Box>
      </Box>
    )
  },
}

/**
 * Test responsive behavior with a resizable container.
 * Drag the resize handle to see how the robot scales and eventually hides at small sizes.
 * The component maintains consistent padding while making the 3D robot responsive.
 */
export const ResizableTest: Story = {
  args: {
    robotName: "Resizable Robot",
    programState: ProgramState.IDLE,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO",
    driveToHomeEnabled: true,
    modelFromController: "UniversalRobots_UR5e",
  },
  loaders: [
    async (context) => ({
      dhParameters: await getDHParams(
        context.args.modelFromController || "UniversalRobots_UR5e",
      ),
    }),
  ],
  render: function Render(args, { loaded: { dhParameters } }) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 800,
          margin: "0 auto",
          padding: 2,
        }}
      >
        <Box
          sx={{
            color: "text.secondary",
            typography: "body2",
            textAlign: "center",
            mb: 2,
          }}
        >
          <strong>Responsive Test:</strong> Drag the resize handle below to test
          responsive behavior.
          <br />• <strong>Landscape:</strong> Robot scales at {"<450px"}/
          {"<550px"}, hides at {"<350px"} width or {"<250px"} height
          <br />• <strong>Portrait:</strong> Robot scales at {"<300px"}/
          {"<400px"}, hides at {"<250px"} width or {"<180px"} height
          <br />• Less aggressive scaling/hiding for portrait mode to preserve
          central robot display
          <br />• Padding remains consistent for visual harmony
        </Box>

        <Box
          sx={{
            resize: "both",
            overflow: "auto",
            border: "2px dashed",
            borderColor: "primary.main",
            borderRadius: 2,
            padding: 1,
            minWidth: 200,
            minHeight: 150,
            width: 400,
            height: 300,
            background: "background.paper",
            position: "relative",
            "&::after": {
              content: '"↘ Drag to resize"',
              position: "absolute",
              bottom: 4,
              right: 4,
              fontSize: 12,
              color: "text.disabled",
              pointerEvents: "none",
            },
          }}
        >
          <RobotCardWithMockConnectedMotionGroup
            {...args}
            dhParameters={dhParameters}
          />
        </Box>

        <Box
          sx={{
            color: "text.secondary",
            typography: "caption",
            textAlign: "center",
            mt: 1,
          }}
        >
          Try different sizes to see the responsive behavior in action!
        </Box>
      </Box>
    )
  },
}
