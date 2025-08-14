import { Box, Stack } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ConnectedMotionGroup, DHParameter } from "@wandelbots/nova-js/v1"
import { RobotCard } from "../src/components/RobotCard"
import { SupportedRobot } from "../src/components/robots/SupportedRobot"
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
      robotComponent={(robotProps) => (
        <SupportedRobot
          {...robotProps}
          getModel={(modelFromController: string) => {
            // Fetch from storybook rather than CDN to ensure version alignment
            return `./models/${modelFromController}.glb`
          }}
        />
      )}
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
A fully responsive Material-UI Card component that renders a 3D robot visualization with robotics controls and state indicators.

**Architecture:**
- Built with React Three Fiber for 3D rendering and Material-UI for UI components
- Uses drei's \`<Bounds>\` component with automatic model fitting via \`postModelRender\` callback
- Implements responsive layout switching based on container aspect ratio detection
- Leverages MobX observer pattern for reactive state management
- Integrates with Wandelbots Nova-JS \`ConnectedMotionGroup\` for real-time robot data

**Layout System:**
- **Portrait Mode (height > width):** Vertical stack - header, 3D viewport, controls
- **Landscape Mode (width > height):** Horizontal split - 3D viewport (50%) | content panel (50%)
- **Container-based sizing:** Automatically fills parent container (100% width/height)
- **Minimum constraints:** 300px width, 400px height (portrait) / 300px height (landscape)

**3D Rendering Features:**
- Auto-fitting camera that responds to robot model loading and pose changes
- Real-time robot pose updates via \`rapidlyChangingMotionState\`
- Customizable robot component with DH parameter support
- Transparent background with preset lighting environment
- Optimized rendering with device pixel ratio scaling

**Component Integration:**
- **Robot State:** Program execution state, safety status, operation mode indicators
- **Cycle Timer:** Configurable timer component with variant and compact modes
- **Drive Controls:** Press-and-hold "Drive to Home" button with mouse/touch event handling
- **Internationalization:** Full i18next support for all text elements

**Technical Implementation:**
- Uses ResizeObserver for responsive layout detection
- Implements bounds refresh trigger system for 3D model fitting
- Supports custom robot and cycle timer component injection
- Material-UI theming with CSS custom properties for dark mode compatibility

**Use Cases:**
Perfect for robotics dashboards, monitoring interfaces, and control panels where real-time 3D robot visualization is needed alongside operational controls and status information.
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
    programState: "idle",
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
    programState: "idle",
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
        programState: "running" as const,
        safetyState: "SAFETY_STATE_NORMAL" as const,
      },
      {
        name: "UR10e Station B",
        modelFromController: robotConfigs[1].model,
        dhParameters: robotConfigs[1].dhParameters,
        programState: "paused" as const,
        safetyState: "SAFETY_STATE_NORMAL" as const,
      },
      {
        name: "KUKA Station C",
        modelFromController: robotConfigs[2].model,
        dhParameters: robotConfigs[2].dhParameters,
        programState: "idle" as const,
        safetyState: "SAFETY_STATE_STOP" as const,
      },
      {
        name: "FANUC Station D",
        modelFromController: robotConfigs[3].model,
        dhParameters: robotConfigs[3].dhParameters,
        programState: "stopping" as const,
        safetyState: "SAFETY_STATE_DEVICE_EMERGENCY_STOP" as const,
      },
    ]

    return (
      <Stack
        spacing={4}
        sx={{
          padding: 3,
          maxWidth: "100%",
          overflow: "auto", // Allow horizontal scrolling if needed
        }}
      >
        {robots.map((robot) => (
          <Box
            key={robot.name}
            sx={{
              width: 500,
              height: 320, // Increased to accommodate minHeight: 300 + padding
              minHeight: 320,
            }}
          >
            <RobotCardWithMockConnectedMotionGroup
              {...args}
              robotName={robot.name}
              modelFromController={robot.modelFromController}
              dhParameters={robot.dhParameters}
              programState={robot.programState}
              safetyState={robot.safetyState}
              driveToHomeEnabled={robot.programState === "idle"}
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
              programState="running"
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
              programState="idle"
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
