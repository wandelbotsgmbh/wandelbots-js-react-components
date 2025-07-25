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
      description: {
        component: `
A circular gauge timer component that shows the remaining time of a cycle.

**Key Features:**
- **Visual countdown with circular progress gauge** (264px diameter)
- **Complete timer control interface** (start, pause, resume, elapsed time support)
- **Automatic callback triggers** when cycles complete
- **Two display variants:** large gauge with centered time display, or compact icon with text
- Smooth spring-based progress animations for all state transitions
- Fully localized with i18next
- Material-UI theming integration

**Control Functions:**
- \`startNewCycle(maxTimeSeconds, elapsedSeconds?)\` - Start a new timer cycle
- \`pause()\` - Pause the countdown while preserving remaining time  
- \`resume()\` - Resume countdown from where it was paused
- \`isPaused()\` - Check current pause state
        `,
      },
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
        "Callback that receives timer control functions (startNewCycle, pause, resume, isPaused)",
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
    variant: {
      control: "select",
      options: ["default", "small"],
      description:
        "Visual variant: 'default' (large gauge) or 'small' (animated icon with text)",
      table: {
        defaultValue: {
          summary: "default",
        },
      },
    },
    compact: {
      control: "boolean",
      description:
        "For small variant: whether to hide remaining time details (compact)",
      table: {
        defaultValue: {
          summary: "false",
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
 * Click "Start New Cycle" to begin a countdown, then use pause/resume controls.
 */
export const Default: Story = {
  args: {
    autoStart: true,
  },
  render: function Render(args) {
    const controlsRef: React.MutableRefObject<{
      startNewCycle: (maxTime: number, elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    } | null> = React.useRef(null)

    const handleCycleComplete = (controls: {
      startNewCycle: (maxTime: number, elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    }) => {
      controlsRef.current = controls
      console.log("Timer controls ready.")
    }

    const handleCycleEnd = () => {
      console.log("Cycle completed! Timer reached zero.")
    }

    const startDemo = (minutes: number) => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(minutes * 60) // Convert minutes to seconds
      }
    }

    const pauseTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.pause()
      }
    }

    const resumeTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.resume()
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
            Start 5 min cycle
          </Button>
          <Button variant="contained" onClick={() => startDemo(3)}>
            Start 3 min cycle
          </Button>
          <Button variant="contained" onClick={() => startDemo(0.1)}>
            Start 6 sec cycle (demo)
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button variant="outlined" onClick={pauseTimer}>
            Pause timer
          </Button>
          <Button variant="outlined" onClick={resumeTimer}>
            Resume timer
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
    const controlsRef: React.MutableRefObject<{
      startNewCycle: (maxTime: number, elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    } | null> = React.useRef(null)

    const handleCycleComplete = (controls: {
      startNewCycle: (maxTime: number, elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    }) => {
      controlsRef.current = controls
      console.log("Timer controls ready for manual control.")
    }

    const startDemo = (minutes: number) => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(minutes * 60)
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
            Set 2 min cycle (manual start)
          </Button>
          <Button variant="contained" onClick={() => startDemo(0.05)}>
            Set 3 sec cycle (demo)
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
    const controlsRef: React.MutableRefObject<{
      startNewCycle: (maxTime: number, elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    } | null> = React.useRef(null)

    const handleCycleComplete = (controls: {
      startNewCycle: (maxTime: number, elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    }) => {
      controlsRef.current = controls
    }

    const handleCycleEnd = () => {
      setCycleCount((prev) => prev + 1)

      if (isAutoRestart) {
        // Automatically start a new 10-second cycle
        setTimeout(() => {
          if (controlsRef.current) {
            controlsRef.current.startNewCycle(10)
          }
        }, 1000)
      }
    }

    const startDemo = () => {
      if (controlsRef.current) {
        setCycleCount(0)
        controlsRef.current.startNewCycle(10) // Start with 10 seconds
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
            Start continuous demo (10s cycles)
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

/**
 * Small variant with animated progress icon next to text.
 * Shows the format: [ANIMATED_ICON] X:XX/X:XX min
 * The icon is a gauge border only (no fill) that animates with progress.
 */
export const SmallVariant: Story = {
  args: {
    variant: "small",
    autoStart: true,
  },
  render: function Render(args) {
    const controlsRef: React.MutableRefObject<{
      startNewCycle: (maxTime: number, elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    } | null> = React.useRef(null)

    const handleCycleComplete = (controls: {
      startNewCycle: (maxTime: number, elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    }) => {
      controlsRef.current = controls
    }

    const handleCycleEnd = () => {
      console.log("Small timer cycle completed!")
    }

    const startDemo = (minutes: number) => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(minutes * 60)
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
            Start 5 min cycle
          </Button>
          <Button variant="contained" onClick={() => startDemo(0.1)}>
            Start 6 sec cycle (demo)
          </Button>
        </Box>
      </Box>
    )
  },
}

/**
 * Small compact variant that only shows remaining time with animated icon.
 * Format: [ANIMATED_ICON] X:XX
 * The icon shows progress animation without any text details.
 */
export const SmallCompact: Story = {
  args: {
    variant: "small",
    compact: true,
    autoStart: true,
  },
  render: function Render(args) {
    const controlsRef: React.MutableRefObject<{
      startNewCycle: (maxTime: number, elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    } | null> = React.useRef(null)

    const handleCycleComplete = (controls: {
      startNewCycle: (maxTime: number, elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    }) => {
      controlsRef.current = controls
    }

    const handleCycleEnd = () => {
      console.log("Small compact timer cycle completed!")
    }

    const startDemo = (minutes: number) => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(minutes * 60)
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
          <Button variant="contained" onClick={() => startDemo(3)}>
            Start 3 min cycle
          </Button>
          <Button variant="contained" onClick={() => startDemo(0.05)}>
            Start 3 sec cycle (demo)
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
          Compact variant only shows the remaining time without total duration.
        </Box>
      </Box>
    )
  },
}

/**
 * Pause/Resume functionality demo.
 * Demonstrates the complete timer control interface including pause and resume.
 */
export const PauseResumeDemo: Story = {
  args: {
    autoStart: true,
  },
  render: function Render(args) {
    const [isPaused, setIsPaused] = React.useState(false)
    const controlsRef: React.MutableRefObject<{
      startNewCycle: (maxTime: number, elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    } | null> = React.useRef(null)

    const handleCycleComplete = (controls: {
      startNewCycle: (maxTime: number, elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    }) => {
      controlsRef.current = controls
      console.log("Timer controls ready for pause/resume demo.")
    }

    const handleCycleEnd = () => {
      console.log("Pause/Resume demo cycle completed!")
      setIsPaused(false) // Reset pause state when cycle completes
    }

    const startDemo = (minutes: number, elapsedSeconds?: number) => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(minutes * 60, elapsedSeconds)
        setIsPaused(false)
      }
    }

    const pauseTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.pause()
        setIsPaused(true)
      }
    }

    const resumeTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.resume()
        setIsPaused(false)
      }
    }

    const checkPauseState = () => {
      if (controlsRef.current) {
        const currentState = controlsRef.current.isPaused()
        setIsPaused(currentState)
        console.log("Current pause state:", currentState)
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
          <Button variant="contained" onClick={() => startDemo(2)}>
            Start 2 min cycle
          </Button>
          <Button variant="contained" onClick={() => startDemo(0.2)}>
            Start 12 sec cycle (demo)
          </Button>
          <Button variant="outlined" onClick={() => startDemo(5, 120)}>
            Start 5 min with 2 min elapsed
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            color="warning"
            onClick={pauseTimer}
            disabled={isPaused}
          >
            Pause timer
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={resumeTimer}
            disabled={!isPaused}
          >
            Resume timer
          </Button>
          <Button variant="text" onClick={checkPauseState}>
            Check pause state
          </Button>
        </Box>

        <Box
          sx={{
            typography: "body2",
            color: isPaused ? "warning.main" : "text.secondary",
            textAlign: "center",
            maxWidth: 500,
            fontWeight: isPaused ? "bold" : "normal",
          }}
        >
          Timer Status: {isPaused ? "⏸️ PAUSED" : "▶️ Running"}
          <br />
          <br />
          This demo showcases the complete timer control interface. You can
          start cycles with or without elapsed time, pause the countdown, and
          resume from where you left off. The timer preserves its state during
          pause.
        </Box>
      </Box>
    )
  },
}
