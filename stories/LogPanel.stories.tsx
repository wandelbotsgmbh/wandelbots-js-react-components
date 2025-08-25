import { Button, Stack } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { LogPanel, type LogStore } from "../src/index"

const meta: Meta<typeof LogPanel> = {
  title: "Components/LogPanel",
  component: LogPanel,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component: `A complete log panel component with built-in state management using MobX. 

## Usage

\`\`\`tsx
function MyComponent() {
  const [logStore, setLogStore] = useState<LogStore>()

  return (
    <LogPanel 
      height={400}
      onStoreReady={setLogStore}
    />
  )
}

// Then use the store to add messages
logStore?.addInfo("Operation completed successfully")
logStore?.addError("Something went wrong")
logStore?.addWarning("Warning message")
logStore?.addDebug("Debug information")
\`\`\``,
      },
    },
  },
  argTypes: {
    store: {
      control: false,
      description:
        "Optional LogStore instance. If not provided, creates its own.",
    },
    height: {
      control: { type: "text" },
      description: "Height of the component",
      defaultValue: 400,
    },
    onStoreReady: {
      action: "store-ready",
      description: "Callback when the store is ready for external access",
    },
  },
}

export default meta

export const Interactive: StoryObj<typeof LogPanel> = {
  render: (args) => {
    const [logStore, setLogStore] = useState<LogStore | null>(null)

    const handleStoreReady = (store: LogStore) => {
      setLogStore(store)
      args.onStoreReady?.(store)
    }

    const addInfoMessage = () => {
      logStore?.addInfo(
        `Info: Operation completed at ${new Date().toLocaleTimeString()}`,
      )
    }

    const addWarningMessage = () => {
      logStore?.addWarning(
        `Warning: System approaching limits at ${new Date().toLocaleTimeString()}`,
      )
    }

    const addErrorMessage = () => {
      logStore?.addError(
        `Error: Connection failed at ${new Date().toLocaleTimeString()}`,
      )
    }

    const addDebugMessage = () => {
      logStore?.addDebug(
        `Debug: Function called with parameters {id: ${Math.floor(Math.random() * 1000)}, timestamp: ${new Date().toISOString()}}`,
      )
    }

    return (
      <Stack spacing={2} sx={{ width: 600 }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={addInfoMessage}
            disabled={!logStore}
          >
            Add Info
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={addWarningMessage}
            color="warning"
            disabled={!logStore}
          >
            Add Warning
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={addErrorMessage}
            color="error"
            disabled={!logStore}
          >
            Add Error
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={addDebugMessage}
            disabled={!logStore}
            sx={{ color: "text.disabled", borderColor: "text.disabled" }}
          >
            Add Debug
          </Button>
        </Stack>
        <LogPanel {...args} onStoreReady={handleStoreReady} />
      </Stack>
    )
  },
  args: {
    height: 400,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive log panel with built-in state management. Use the buttons above to add different types of log messages. The component manages its own LogStore internally.",
      },
    },
  },
}

export const DefaultHeight: StoryObj<typeof LogPanel> = {
  render: (args) => {
    const handleStoreReady = (store: LogStore) => {
      // Add some sample messages
      store.addInfo("Nova client initialized and connected to robot controller")
      store.addDebug(
        "Connection parameters: {host: '192.168.1.100', port: 8080, timeout: 5000}",
      )
      store.addWarning(
        "Joint 3 approaching velocity limit - reducing speed to 80%",
      )
      store.addError(
        "Safety zone violation detected - emergency stop triggered",
      )
      store.addDebug(
        "Error context: {zone_id: 'SZ_001', tcp_position: [245.67, -123.45, 378.90]}",
      )
    }

    return <LogPanel {...args} onStoreReady={handleStoreReady} />
  },
  args: {
    // Use default height
  },
  parameters: {
    docs: {
      description: {
        story: "LogPanel with default height (400px) and some sample messages.",
      },
    },
  },
}

export const ScrollingExample: StoryObj<typeof LogPanel> = {
  render: (args) => {
    const [logStore, setLogStore] = useState<LogStore | null>(null)

    const handleStoreReady = (store: LogStore) => {
      setLogStore(store)
      // Pre-populate with many messages to demonstrate scrolling
      for (let i = 1; i <= 50; i++) {
        const level =
          i % 10 === 0
            ? "debug"
            : i % 7 === 0
              ? "error"
              : i % 3 === 0
                ? "warning"
                : "info"
        const timestamp = new Date(Date.now() - (50 - i) * 1000)

        if (level === "debug") {
          store.addDebug(
            `Debug trace #${i}: Function robotController.getJointPositions() returned [${(i * 15) % 180}, ${(i * 20) % 180}, ${(i * 25) % 180}, ${(i * 30) % 180}, ${(i * 35) % 180}, ${(i * 40) % 180}] in ${(i % 10) + 1}ms`,
          )
        } else if (level === "error") {
          store.addError(
            `Robot motion error #${i}: Joint ${(i % 6) + 1} position feedback timeout. Communication with servo drive lost. Check encoder cables and power supply connections. Recovery requires manual joint reset procedure.`,
          )
        } else if (level === "warning") {
          store.addWarning(
            `Motion planning warning #${i}: Path optimization detected potential singularity near joint configuration J${i % 6}=${(i * 15) % 180}°`,
          )
        } else {
          store.addInfo(
            `Motion sequence #${i}: Waypoint reached successfully at ${timestamp.toLocaleTimeString()}, TCP velocity: ${(i * 50) % 1000}mm/s`,
          )
        }
      }
    }

    const addRandomMessage = () => {
      if (!logStore) return

      const messages = [
        "Nova client connected to robot controller at 192.168.1.100",
        "Motion group 0@ur5e initialized successfully",
        "Wandelscript program compiled and validated",
        "Robot moved to home position [0.0, -90.0, 0.0, -90.0, 0.0, 0.0]",
        "Safety zone collision detected - motion stopped",
        "TCP calibration completed with accuracy ±0.1mm",
        "Joint velocity limits updated: [180°/s, 180°/s, 180°/s, 360°/s, 360°/s, 360°/s]",
        "Emergency stop button pressed - all motions halted",
        "Robot workspace boundaries recalibrated",
        "Nova API rate limit: 100 requests remaining in current window",
        "Gripper IO signal received: digital_out_0 = HIGH",
        "Path planning optimization reduced cycle time by 12%",
        "Robot temperature monitoring: Joint 1 at 45°C (normal range)",
        "Wandelbots skill library updated to version 2.1.3",
        "Motion execution completed in 4.2 seconds",
        "Safety controller heartbeat lost - entering safe mode",
        "Robot pose validation failed: position outside workspace",
        "Nova WebSocket connection established with latency 15ms",
        "Coordinate system transformation applied: base_link → tool0",
        "Program execution paused - awaiting operator confirmation",
      ]

      const levels: Array<"info" | "warning" | "error" | "debug"> = [
        "info",
        "warning",
        "error",
        "debug",
      ]
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)]
      const randomLevel = levels[Math.floor(Math.random() * levels.length)]

      logStore.addMessage(randomMessage, randomLevel)
    }

    return (
      <Stack spacing={2} sx={{ width: 700 }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={addRandomMessage}
            disabled={!logStore}
          >
            Add Random Message
          </Button>
        </Stack>
        <LogPanel {...args} onStoreReady={handleStoreReady} />
      </Stack>
    )
  },
  args: {
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          "LogPanel with many messages to demonstrate scrolling behavior. The component automatically scrolls to show the latest messages, and long messages are properly wrapped.",
      },
    },
  },
}

export const LongMessagesExample: StoryObj<typeof LogPanel> = {
  render: (args) => {
    const [logStore, setLogStore] = useState<LogStore | null>(null)

    const handleStoreReady = (store: LogStore) => {
      setLogStore(store)

      // Add a variety of message lengths
      store.addInfo("Simple connection established")

      store.addWarning(
        "Motion planning detected potential collision with safety zone SZ_001. Recommended path deviation: 15mm offset along Y-axis to maintain 50mm safety margin.",
      )

      store.addError(
        `Fatal robot communication error occurred at ${new Date().toISOString()}: 
Connection to robot controller UR5e (Serial: 20231234567) was lost during critical motion sequence execution.

Error Details:
- Socket timeout after 5000ms
- Last received heartbeat: ${new Date(Date.now() - 8000).toISOString()}
- Motion state: EXECUTING (waypoint 15/23)
- Current joint positions: [12.5°, -95.3°, 47.8°, -142.1°, 89.7°, 0.0°]
- TCP position: [245.67, -123.45, 378.90] mm
- TCP orientation: [0.123, 0.456, 0.789, 0.321] quaternion

Network Diagnostics:
- Ping to 192.168.1.100: TIMEOUT (>1000ms)
- Switch port status: ACTIVE
- Cable integrity: OK
- Firewall rules: PASSED

Recovery Actions Required:
1. Check physical network connections to robot controller
2. Verify robot controller status LEDs (should be solid green)
3. Restart robot controller if necessary (hold power button 10 seconds)
4. Re-establish connection through Nova client
5. Perform homing sequence before resuming operations
6. Validate workspace calibration if position feedback errors persist

Impact Assessment:
- Production downtime: Estimated 15-30 minutes
- Work piece position: UNKNOWN (manual verification required)
- Safety status: SECURED (all motion stopped)

Contact support if error persists after following recovery procedures.
Reference: ERR_COMM_2024_0819_001`,
      )

      store.addInfo("Recovery procedure initiated")

      store.addError(
        `Wandelscript compilation failed with multiple syntax errors:

File: /workspace/programs/pick_and_place_v2.ws
Line 45: Unexpected token 'movej' - missing semicolon on previous line
Line 67: Undefined variable 'target_position_2' - did you mean 'target_position_1'?
Line 89: Function 'calculate_offset()' expects 3 parameters but received 2
Line 112: Invalid joint angle range: J4 = 195.5° exceeds maximum limit of 180°
Line 134: Unreachable code detected after return statement
Line 156: Missing closing bracket for IF statement starting at line 148

Compilation aborted. Please fix syntax errors and recompile.
For detailed syntax reference, see: https://docs.wandelbots.com/wandelscript/syntax`,
      )
    }

    const addLongMessage = () => {
      if (!logStore) return

      const longMessages = [
        `Stack trace for robot motion exception:
at RobotController.executeMotion() line 234
at MotionPlanner.planPath() line 156  
at PathOptimizer.calculateTrajectory() line 89
at CollisionDetector.checkSafetyZones() line 45
at SafetyController.validateMotion() line 12

Exception: Joint velocity limit exceeded during motion execution
Joint 3 commanded velocity: 195.5°/s (limit: 180°/s)
Motion was automatically stopped to prevent hardware damage.`,

        `Detailed calibration report for TCP offset calculation:
Robot: UR5e (Serial: 20231234567)
Tool: Pneumatic Gripper v2.1 (Weight: 0.85kg)
Calibration Method: 4-point touch

Measurement Points:
Point 1: Base[287.65, -156.23, 412.78] Tool[0.0, 0.0, 0.0]
Point 2: Base[287.65, -156.23, 412.78] Tool[45.0, 0.0, 0.0]  
Point 3: Base[287.65, -156.23, 412.78] Tool[0.0, 45.0, 0.0]
Point 4: Base[287.65, -156.23, 412.78] Tool[0.0, 0.0, 45.0]

Calculated TCP Offset: [0.0, 0.0, 145.7] mm
Standard Deviation: ±0.12mm (excellent precision)
Validation: PASSED (error < 0.5mm threshold)

Tool parameters updated in robot configuration.`,

        `Complete system diagnostics report generated at ${new Date().toISOString()}:

Hardware Status:
✓ Robot Controller: Online (Firmware 5.12.1)
✓ Safety PLC: Active (Emergency stops functional)  
✓ Servo Drives: All 6 axes responding normally
✓ I/O Modules: 16 digital inputs, 8 digital outputs operational
✓ Pneumatic System: 6.2 bar (within 6.0-7.0 bar range)
✓ Temperature Sensors: All joints within normal operating range

Network Configuration:
✓ Robot IP: 192.168.1.100 (static)
✓ Gateway: 192.168.1.1
✓ DNS: 8.8.8.8, 8.8.4.4
✓ Nova Client Connection: Stable (latency 12ms)
✓ WebSocket Status: Connected (Protocol v2.1)

Software Versions:
- Nova Core: 2.1.3
- Robot Driver: 1.8.2  
- Safety Module: 3.2.1
- Motion Planning: 4.1.0
- Wandelscript Runtime: 1.5.4

Performance Metrics (Last 24h):
- Uptime: 23h 47m (99.8%)
- Total Motions: 1,247
- Average Cycle Time: 24.6s
- Error Rate: 0.08% (1 error per 1,250 motions)
- Safety Stops: 0 (excellent)

Recommendations: No issues detected. System operating optimally.`,
      ]

      const randomLongMessage =
        longMessages[Math.floor(Math.random() * longMessages.length)]
      logStore.addError(randomLongMessage)
    }

    return (
      <Stack spacing={2} sx={{ width: 800 }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={addLongMessage}
            disabled={!logStore}
          >
            Add Long Message
          </Button>
        </Stack>
        <LogPanel {...args} onStoreReady={handleStoreReady} />
      </Stack>
    )
  },
  args: {
    height: 400,
  },
  parameters: {
    docs: {
      description: {
        story:
          "LogPanel demonstrating very long log messages with detailed stack traces, error reports, and system diagnostics. Long messages are automatically wrapped and can be scrolled within the log viewer.",
      },
    },
  },
}
