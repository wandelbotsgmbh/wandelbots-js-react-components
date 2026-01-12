import { Box, Stack } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type {
  DHParameter,
  OperationMode,
  SafetyStateType,
} from "@wandelbots/nova-js/v2"
import { ProgramState } from "../src/components/ProgramControl"
import { RobotCard } from "../src/components/RobotCard"
import { getDefaultHomeConfig } from "../src/components/robots/manufacturerHomePositions"
import { Robot } from "../src/components/robots/Robot"
import type { ConnectedMotionGroup } from "../src/lib/ConnectedMotionGroup"
import { rapidlyChangingMotionState } from "./robots/motionState"
import { getDHParams } from "./robots/robotStoryConfig"

// Example custom content component for demonstration
const ExampleCustomContent = () => (
  <Box>
    <Box sx={{ mb: 1, color: "text.secondary", fontSize: "14px" }}>Runtime</Box>
    <Box sx={{ fontSize: "18px", fontWeight: "bold" }}>05:23</Box>
  </Box>
)

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
  // Get manufacturer-specific default joint config
  const defaultJointConfig = getDefaultHomeConfig(props.modelFromController)

  // Create custom motion state with manufacturer-specific joint positions
  const customMotionState = {
    ...rapidlyChangingMotionState,
    joint_position: defaultJointConfig || [0, 0, 0, 0, 0, 0],
  }

  // Create the mock ConnectedMotionGroup with reactive properties
  const mockConnectedMotionGroup = {
    rapidlyChangingMotionState: customMotionState,
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
            getModel={async (modelFromController: string) => {
              // Fetch from storybook rather than CDN to ensure version alignment
              const url = `./models/${modelFromController}.glb`
              try {
                const response = await fetch(url)
                const blob = await response.blob()
                const file = new File([blob], `${modelFromController}.glb`, { type: 'model/gltf-binary' })
                return URL.createObjectURL(file)
              } catch (error) {
                // Fallback to empty file
                const mockBlob = new Blob([], { type: 'model/gltf-binary' })
                const mockFile = new File([mockBlob], `${modelFromController}.glb`, { type: 'model/gltf-binary' })
                return URL.createObjectURL(mockFile)
              }
            }}
          />
        ))
      }
    />
  )
}

const meta: Meta = {
  title: "Components/RobotCard/Stories",
  tags: ["!dev"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    robotName: {
      control: "text",
      description: "Name of the robot displayed at the top",
    },
    programState: {
      control: "select",
      options: [
        ProgramState.IDLE,
        ProgramState.PREPARING,
        ProgramState.STARTING,
        ProgramState.RUNNING,
        ProgramState.PAUSING,
        ProgramState.PAUSED,
        ProgramState.STOPPING,
        ProgramState.COMPLETED,
        ProgramState.FAILED,
        ProgramState.STOPPED,
        ProgramState.ERROR,
      ],
      description: "The current state of the program execution",
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
    },
    showCustomContent: {
      control: "boolean",
      description: "Whether to show custom content component example",
    },
  },
  args: {
    robotName: "UR5e Robot",
    programState: ProgramState.IDLE,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO",
    driveToHomeEnabled: true,
    modelFromController: "UniversalRobots_UR5e",
    showCustomContent: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic RobotCard showing the component structure without complex interactions.
 * This demonstrates the layout and visual hierarchy of the card.
 */
export const Basic: Story = {
  args: {
    robotName: "UR5e Robot",
    programState: ProgramState.IDLE,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO",
    driveToHomeEnabled: false,
    modelFromController: "UniversalRobots_UR5e",
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
          robotName={args.robotName}
          programState={args.programState}
          safetyState={args.safetyState as SafetyStateType}
          operationMode={args.operationMode as OperationMode}
          driveToHomeEnabled={args.driveToHomeEnabled}
          modelFromController={args.modelFromController}
          dhParameters={dhParameters}
          customContentComponent={
            args.showCustomContent ? ExampleCustomContent : undefined
          }
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
        operationMode: "OPERATION_MODE_AUTO" as const,
      },
      {
        name: "UR10e Station B",
        modelFromController: robotConfigs[1].model,
        dhParameters: robotConfigs[1].dhParameters,
        programState: ProgramState.PAUSED,
        safetyState: "SAFETY_STATE_NORMAL" as const,
        operationMode: "OPERATION_MODE_AUTO" as const,
      },
      {
        name: "KUKA Station C",
        modelFromController: robotConfigs[2].model,
        dhParameters: robotConfigs[2].dhParameters,
        programState: ProgramState.IDLE,
        safetyState: "SAFETY_STATE_STOP" as const,
        operationMode: "OPERATION_MODE_MANUAL" as const,
      },
      {
        name: "FANUC Station D",
        modelFromController: robotConfigs[3].model,
        dhParameters: robotConfigs[3].dhParameters,
        programState: ProgramState.STOPPING,
        safetyState: "SAFETY_STATE_DEVICE_EMERGENCY_STOP" as const,
        operationMode: "OPERATION_MODE_MANUAL_T1" as const,
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
              robotName={robot.name}
              programState={robot.programState}
              safetyState={robot.safetyState as SafetyStateType}
              operationMode={robot.operationMode as OperationMode}
              driveToHomeEnabled={robot.programState === ProgramState.IDLE}
              modelFromController={robot.modelFromController}
              dhParameters={robot.dhParameters}
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
    programState: ProgramState.IDLE,
    safetyState: "SAFETY_STATE_NORMAL",
    operationMode: "OPERATION_MODE_AUTO",
    driveToHomeEnabled: false,
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
          robotName={args.robotName}
          programState={args.programState}
          safetyState={args.safetyState as SafetyStateType}
          operationMode={args.operationMode as OperationMode}
          driveToHomeEnabled={args.driveToHomeEnabled}
          modelFromController={args.modelFromController}
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
              robotName="UR5e Landscape"
              programState={ProgramState.RUNNING}
              safetyState={"SAFETY_STATE_NORMAL" as SafetyStateType}
              operationMode={"OPERATION_MODE_AUTO" as OperationMode}
              driveToHomeEnabled={args.driveToHomeEnabled}
              modelFromController="UniversalRobots_UR5e"
              dhParameters={dhParameters}
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
              robotName="UR5e Portrait"
              programState={ProgramState.IDLE}
              safetyState={"SAFETY_STATE_NORMAL" as SafetyStateType}
              operationMode={"OPERATION_MODE_AUTO" as OperationMode}
              driveToHomeEnabled={args.driveToHomeEnabled}
              modelFromController="UniversalRobots_UR5e"
              dhParameters={dhParameters}
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
            robotName={args.robotName}
            programState={args.programState}
            safetyState={args.safetyState as SafetyStateType}
            operationMode={args.operationMode as OperationMode}
            driveToHomeEnabled={args.driveToHomeEnabled}
            modelFromController={args.modelFromController}
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
