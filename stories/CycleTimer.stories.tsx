import { Box, Button } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { CycleTimer } from "../src/components/CycleTimer"

const meta: Meta<typeof CycleTimer> = {
  title: "Components/CycleTimer",
  component: CycleTimer,
  tags: ["!dev"],
  parameters: {
    layout: "centered",
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  args: {
    autoStart: true,
    onCycleComplete: () => {}, // Default no-op function for docs
  },
  argTypes: {
    onCycleComplete: {
      action: "onCycleComplete",
      description:
        "Callback that receives the startNewCycle function for controlling the timer",
    },
    onCycleEnd: {
      action: "onCycleEnd",
      description:
        "Callback fired when a cycle actually completes (reaches zero)",
    },
    autoStart: {
      control: "boolean",
      description:
        "Whether the timer should start automatically when maxTime is set",
      table: {
        defaultValue: {
          summary: "true",
        },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default CycleTimer with automatic timer functionality.
 * Click "Start New Cycle" to begin a 5-minute countdown.
 */
export const Default: Story = {
  args: {
    autoStart: true,
  },
  render: function Render(args) {
    const timerRef: React.MutableRefObject<((maxTime: number) => void) | null> =
      React.useRef(null)

    const handleCycleComplete = (startNewCycle: (maxTime: number) => void) => {
      timerRef.current = startNewCycle
      console.log("Timer ready for new cycle.")
    }

    const handleCycleEnd = () => {
      console.log("Cycle completed! Timer reached zero.")
      // In a real application, you might want to automatically start a new cycle
      // For demo purposes, we just log and wait for manual restart
    }

    const startDemo = (minutes: number) => {
      if (timerRef.current) {
        timerRef.current(minutes * 60) // Convert minutes to seconds
      }
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <CycleTimer
          {...args}
          onCycleComplete={handleCycleComplete}
          onCycleEnd={handleCycleEnd}
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={() => startDemo(5)}>
            Start 5 Min Cycle
          </Button>
          <Button variant="contained" onClick={() => startDemo(3)}>
            Start 3 Min Cycle
          </Button>
          <Button variant="contained" onClick={() => startDemo(0.1)}>
            Start 6 Sec Cycle (Demo)
          </Button>
        </Box>
      </Box>
    )
  },
}

/**
 * CycleTimer with manual start mode.
 * The timer will not start automatically when a new cycle is set.
 */
export const ManualStart: Story = {
  args: {
    autoStart: false,
  },
  render: function Render(args) {
    const timerRef: React.MutableRefObject<((maxTime: number) => void) | null> =
      React.useRef(null)

    const handleCycleComplete = (startNewCycle: (maxTime: number) => void) => {
      timerRef.current = startNewCycle
      console.log("Timer ready for manual restart.")
    }

    const startDemo = (minutes: number) => {
      if (timerRef.current) {
        timerRef.current(minutes * 60)
      }
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <CycleTimer {...args} onCycleComplete={handleCycleComplete} />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={() => startDemo(2)}>
            Set 2 Min Cycle (Manual Start)
          </Button>
          <Button variant="contained" onClick={() => startDemo(0.05)}>
            Set 3 Sec Cycle (Demo)
          </Button>
        </Box>

        <Box
          sx={{
            typography: "body2",
            color: "text.secondary",
            textAlign: "center",
            maxWidth: 400,
          }}
        >
          With autoStart disabled, the timer will be set but won't start
          counting down automatically. You would need to implement your own
          start trigger in a real application.
        </Box>
      </Box>
    )
  },
}

/**
 * Interactive demo showing the complete cycle workflow.
 * Demonstrates automatic restart and continuous operation.
 */
export const ContinuousCycles: Story = {
  args: {
    autoStart: true,
  },
  render: function Render(args) {
    const [cycleCount, setCycleCount] = React.useState(0)
    const [isAutoRestart, setIsAutoRestart] = React.useState(false)
    const timerRef: React.MutableRefObject<((maxTime: number) => void) | null> =
      React.useRef(null)

    const handleCycleComplete = (startNewCycle: (maxTime: number) => void) => {
      timerRef.current = startNewCycle
    }

    const handleCycleEnd = () => {
      setCycleCount((prev) => prev + 1)

      if (isAutoRestart) {
        // Automatically start a new 10-second cycle
        setTimeout(() => {
          if (timerRef.current) {
            timerRef.current(10)
          }
        }, 1000)
      }
    }

    const startDemo = () => {
      if (timerRef.current) {
        setCycleCount(0)
        timerRef.current(10) // Start with 10 seconds
      }
    }

    const toggleAutoRestart = () => {
      setIsAutoRestart(!isAutoRestart)
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <CycleTimer
          {...args}
          onCycleComplete={handleCycleComplete}
          onCycleEnd={handleCycleEnd}
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={startDemo}>
            Start Continuous Demo (10s cycles)
          </Button>
          <Button
            variant={isAutoRestart ? "contained" : "outlined"}
            onClick={toggleAutoRestart}
          >
            Auto-restart: {isAutoRestart ? "ON" : "OFF"}
          </Button>
        </Box>

        <Box sx={{ typography: "h6", color: "primary.main" }}>
          Cycles completed: {cycleCount}
        </Box>

        <Box
          sx={{
            typography: "body2",
            color: "text.secondary",
            textAlign: "center",
            maxWidth: 500,
          }}
        >
          This demonstrates how the CycleTimer can be used in a continuous
          operation scenario. When auto-restart is enabled, new cycles start
          automatically after each completion.
        </Box>
      </Box>
    )
  },
}
