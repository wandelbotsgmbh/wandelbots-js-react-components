import { Box } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ConnectedMotionGroup, DHParameter } from "@wandelbots/nova-js/v1"
import React, { useMemo } from "react"
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
  const mockConnectedMotionGroup = useMemo(() => {
    return {
      rapidlyChangingMotionState,
      modelFromController: props.modelFromController,
      dhParameters: props.dhParameters || [],
      // Add other required properties for ConnectedMotionGroup interface
      motionGroupId: "0",
      controllerId: props.modelFromController,
    } as Partial<ConnectedMotionGroup> as ConnectedMotionGroup
  }, [props.modelFromController, props.dhParameters])

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
A fully responsive card component that displays a 3D robot with states and controls.

**Features:**
- **Container-Adaptive Card** that automatically fills its container (100% width/height)
- **Minimum size constraints** (300px width, 400px height) for optimal usability
- **Robot name display** in Typography h6 at top-left
- **Program state indicator** below the name showing current execution state
- **Auto-fitting 3D robot model** that scales with container size and robot pose changes
- **Runtime display** with Inter font styling
- **Compact cycle time component** with small variant
- **Transparent gray divider** line for visual separation
- **"Drive to Home" button** with press-and-hold functionality
- **Localization support** via react-i18next
- **Material-UI theming integration**

The card is designed to adapt to any container size, making it perfect for responsive grid layouts, dashboards, and flexible UI designs. Simply place it in a sized container and it will automatically fill the available space while maintaining proper proportions.

**Container Sizing:**
Instead of passing width/height props, size the container that holds the RobotCard. The card will automatically adapt to fill the container while respecting minimum dimensions for usability.

**Drive to Home Functionality:**
The button supports press-and-hold behavior where the onDriveToHomePress callback is fired when the button is pressed down, and onDriveToHomeRelease is fired when released. This allows for implementing robot movement that continues only while the user is actively pressing the button.
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
    runtime: {
      control: "text",
      description: "Runtime text to display",
      table: {
        type: { summary: "string" },
      },
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
    runtime: "2h 45m 12s",
    driveToHomeEnabled: true,
    modelFromController: "UniversalRobots_UR5e",
  },
}

export default meta
type Story = StoryObj<typeof RobotCardWithMockConnectedMotionGroup>

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
 * Interactive RobotCard showing a 3D robot with states and controls.
 * The card is resizable and includes all the main features like program state indicator,
 * 3D robot visualization, runtime display, cycle timer, and drive to home button.
 * Try enabling the "Drive to Home" button and pressing/holding it to see the press-and-hold behavior.
 */
export const Interactive: Story = {
  loaders: [
    async () => ({
      dhParameters: await getDHParams("UniversalRobots_UR5e"),
    }),
  ],
  render: function Render(args, { loaded: { dhParameters } }) {
    const [pressCount, setPressCount] = React.useState(0)
    const [isPressed, setIsPressed] = React.useState(false)

    const handleDriveToHomePress = () => {
      setIsPressed(true)
      console.log("Drive to Home pressed - robot movement would start")
    }

    const handleDriveToHomeRelease = () => {
      setIsPressed(false)
      setPressCount((prev) => prev + 1)
      console.log("Drive to Home released - robot movement would stop")
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: 2,
        }}
      >
        <Box sx={{ width: 484, height: 578 }}>
          <RobotCardWithMockConnectedMotionGroup
            {...args}
            dhParameters={dhParameters}
            onDriveToHomePress={handleDriveToHomePress}
            onDriveToHomeRelease={handleDriveToHomeRelease}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            Button Status: {isPressed ? "PRESSED" : "Released"}
          </Box>
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            Total Press Count: {pressCount}
          </Box>
          <Box sx={{ typography: "caption", color: "text.secondary" }}>
            The card is resizable - try dragging the resize handle in the
            bottom-right corner. The Drive to Home button demonstrates
            press-and-hold functionality for robot control.
          </Box>
        </Box>
      </Box>
    )
  },
}

/**
 * Multiple robot cards displayed in a grid layout to demonstrate
 * how they would appear in a multi-robot monitoring interface.
 * Each card shows a different robot model with various states.
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
        runtime: "1h 23m 45s",
      },
      {
        name: "UR10e Station B",
        modelFromController: robotConfigs[1].model,
        dhParameters: robotConfigs[1].dhParameters,
        programState: "paused" as const,
        safetyState: "SAFETY_STATE_NORMAL" as const,
        runtime: "3h 12m 08s",
      },
      {
        name: "KUKA Station C",
        modelFromController: robotConfigs[2].model,
        dhParameters: robotConfigs[2].dhParameters,
        programState: "idle" as const,
        safetyState: "SAFETY_STATE_STOP" as const,
        runtime: "0h 00m 00s",
      },
      {
        name: "FANUC Station D",
        modelFromController: robotConfigs[3].model,
        dhParameters: robotConfigs[3].dhParameters,
        programState: "stopping" as const,
        safetyState: "SAFETY_STATE_DEVICE_EMERGENCY_STOP" as const,
        runtime: "2h 55m 33s",
      },
    ]

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: 3,
          padding: 2,
          maxWidth: 1200,
          "& > *": {
            height: 500, // Container height for each card
          },
        }}
      >
        {robots.map((robot) => (
          <RobotCardWithMockConnectedMotionGroup
            key={robot.name}
            {...args}
            robotName={robot.name}
            modelFromController={robot.modelFromController}
            dhParameters={robot.dhParameters}
            programState={robot.programState}
            safetyState={robot.safetyState}
            runtime={robot.runtime}
            driveToHomeEnabled={robot.programState === "idle"}
          />
        ))}
      </Box>
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
 * Example with different robot types and sizes to demonstrate the auto-fit camera feature.
 * The camera automatically adjusts to keep the entire robot visible regardless of its size.
 */
export const DifferentRobotSizes: Story = {
  loaders: [
    async () => ({
      ur5eDhParams: await getDHParams("UniversalRobots_UR5e"),
      ur10eDhParams: await getDHParams("UniversalRobots_UR10e"),
    }),
  ],
  render: function Render(args, { loaded: { ur5eDhParams, ur10eDhParams } }) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: 3,
          padding: 2,
          maxWidth: 1000,
          "& > *": {
            height: 500, // Container height for each card
          },
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ typography: "h6", mb: 2 }}>Standard UR5e Robot</Box>
          <RobotCardWithMockConnectedMotionGroup
            {...args}
            robotName="UR5e Standard"
            modelFromController="UniversalRobots_UR5e"
            dhParameters={ur5eDhParams}
            programState="running"
            safetyState="SAFETY_STATE_NORMAL"
            runtime="1h 15m 30s"
          />
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ typography: "h6", mb: 2 }}>Large UR10e Robot</Box>
          <RobotCardWithMockConnectedMotionGroup
            {...args}
            robotName="UR10e Heavy Duty"
            modelFromController="UniversalRobots_UR10e"
            dhParameters={ur10eDhParams}
            programState="idle"
            safetyState="SAFETY_STATE_NORMAL"
            runtime="2h 45m 12s"
          />
        </Box>
      </Box>
    )
  },
}

/**
 * Example showing different robot models with auto-fit camera.
 * The camera automatically adjusts to keep each robot model properly visible.
 */
export const CustomRobotModels: Story = {
  loaders: [
    async () => ({
      dhParameters: await getDHParams("KUKA_KR6_R700_2"),
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
        <Box
          sx={{ textAlign: "center", maxWidth: 600, width: 450, height: 550 }}
        >
          <Box sx={{ typography: "h6", mb: 1 }}>KUKA Robot Model</Box>
          <Box sx={{ typography: "body2", color: "text.secondary", mb: 2 }}>
            This example shows a KUKA robot model. The auto-fit camera
            automatically adjusts for different robot sizes and configurations.
          </Box>
          <RobotCardWithMockConnectedMotionGroup
            {...args}
            robotName="KUKA Industrial Robot"
            modelFromController="KUKA_KR6_R700_2"
            dhParameters={dhParameters}
            programState="running"
            safetyState="SAFETY_STATE_NORMAL"
            runtime="4h 32m 18s"
          />
        </Box>
      </Box>
    )
  },
}

/**
 * Showcase of different robot manufacturers and models to demonstrate
 * the variety of robots supported by the component.
 */
export const RobotManufacturers: Story = {
  loaders: [
    async () => ({
      robotConfigs: await Promise.all([
        {
          model: "UniversalRobots_UR3e",
          dhParameters: await getDHParams("UniversalRobots_UR3e"),
        },
        {
          model: "KUKA_KR6_R700_2",
          dhParameters: await getDHParams("KUKA_KR6_R700_2"),
        },
        {
          model: "ABB_1200_07_7",
          dhParameters: await getDHParams("ABB_1200_07_7"),
        },
        {
          model: "FANUC_CRX10iA",
          dhParameters: await getDHParams("FANUC_CRX10iA"),
        },
      ]),
    }),
  ],
  render: function Render(args, { loaded: { robotConfigs } }) {
    const robotModels = [
      {
        name: "Universal Robots UR3e",
        modelFromController: robotConfigs[0].model,
        dhParameters: robotConfigs[0].dhParameters,
        manufacturer: "Universal Robots",
        description: "Compact collaborative robot",
      },
      {
        name: "KUKA KR6 R700-2",
        modelFromController: robotConfigs[1].model,
        dhParameters: robotConfigs[1].dhParameters,
        manufacturer: "KUKA",
        description: "Precision industrial robot",
      },
      {
        name: "ABB IRB 1200",
        modelFromController: robotConfigs[2].model,
        dhParameters: robotConfigs[2].dhParameters,
        manufacturer: "ABB",
        description: "Versatile industrial robot",
      },
      {
        name: "FANUC CRX-10iA",
        modelFromController: robotConfigs[3].model,
        dhParameters: robotConfigs[3].dhParameters,
        manufacturer: "FANUC",
        description: "Collaborative robot arm",
      },
    ]

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 3,
          padding: 2,
          maxWidth: 1400,
          "& > *": {
            height: 450, // Container height for each card
          },
        }}
      >
        {robotModels.map((robot, index) => (
          <Box key={robot.modelFromController} sx={{ textAlign: "center" }}>
            <Box sx={{ typography: "subtitle1", mb: 1, fontWeight: "bold" }}>
              {robot.manufacturer}
            </Box>
            <Box sx={{ typography: "body2", color: "text.secondary", mb: 2 }}>
              {robot.description}
            </Box>
            <RobotCardWithMockConnectedMotionGroup
              {...args}
              robotName={robot.name}
              modelFromController={robot.modelFromController}
              dhParameters={robot.dhParameters}
              programState={index % 2 === 0 ? "running" : "idle"}
              safetyState="SAFETY_STATE_NORMAL"
              runtime={`${index + 1}h ${(index * 15) % 60}m 30s`}
              driveToHomeEnabled={index % 2 === 1}
            />
          </Box>
        ))}
      </Box>
    )
  },
}
