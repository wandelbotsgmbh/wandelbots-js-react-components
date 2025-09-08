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
A circular gauge timer component with multiple states for different cycle tracking scenarios.

**States:**
- **Idle:** Shows "Waiting for program cycle" with transparent inner circle
- **Measuring:** Count-up timer with "Cycle Time" / "measuring..." labels  
- **Countdown:** Timer counts down from set time with remaining time display
- **Count-up:** Simple elapsed time without special labels
- **Success:** Brief green animation after measuring completes

**Key Features:**
- **Visual progress with circular gauge** (264px diameter)
- **Complete timer control interface** (start, pause, resume, state switching)
- **Error state support:** Pauses timer and shows error styling with automatic resume
- **Smooth transitions** between all states with fade animations
- **Success animations** for measuring completion with color transitions
- **Two display variants:** large gauge with centered display, or compact icon/text-only modes
- Smooth spring-based progress animations for all state transitions
- Fully localized with i18next
- Material-UI theming integration

**Control Functions:**
- \`startNewCycle(maxTimeSeconds?, elapsedSeconds?)\` - Start countdown/count-up timer
- \`startMeasuring(elapsedSeconds?)\` - Start measuring mode with special labels
- \`startCountUp(elapsedSeconds?)\` - Start simple count-up without labels
- \`setIdle()\` - Set to idle state
- \`completeMeasuring()\` - Complete measuring and trigger success animation
- \`pause()\` / \`resume()\` - Pause and resume timer
- \`isPaused()\` - Check pause state
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
        "Callback that receives timer control functions (startNewCycle, startMeasuring, startCountUp, setIdle, completeMeasuring, pause, resume, isPaused)",
    },
    onCycleEnd: {
      action: "onCycleEnd",
      description:
        "Callback fired when a cycle actually completes (reaches zero) - only for count-down mode",
    },
    onMeasuringComplete: {
      action: "onMeasuringComplete",
      description:
        "Callback fired when measuring cycle completes and success animation finishes",
    },
    autoStart: {
      control: "boolean",
      description: "Whether the timer should start automatically when started",
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
    hasError: {
      control: "boolean",
      description:
        "Whether the timer is in an error state (pauses timer and shows error styling)",
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive demonstration of all CycleTimer states and functionality.
 * Use the buttons to switch between different states: idle, measuring, countdown, count-up, and success.
 * Test pause/resume controls and error state behavior.
 */
export const Default: Story = {
  args: {
    autoStart: true,
  },
  render: function Render(args) {
    const [hasError, setHasError] = React.useState(false)
    const [currentState, setCurrentState] = React.useState("idle")
    const [cycleCount, setCycleCount] = React.useState(0)
    const [isAutoRestart, setIsAutoRestart] = React.useState(false)
    const controlsRef: React.MutableRefObject<{
      startNewCycle: (maxTime?: number, elapsedSeconds?: number) => void
      startMeasuring: (elapsedSeconds?: number) => void
      startCountUp: (elapsedSeconds?: number) => void
      setIdle: () => void
      completeMeasuring: () => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    } | null> = React.useRef(null)
    const autoRestartTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    // Cleanup timeout on unmount
    React.useEffect(() => {
      return () => {
        if (autoRestartTimeoutRef.current) {
          clearTimeout(autoRestartTimeoutRef.current)
        }
      }
    }, [])

    const handleCycleComplete = (controls: {
      startNewCycle: (maxTime?: number, elapsedSeconds?: number) => void
      startMeasuring: (elapsedSeconds?: number) => void
      startCountUp: (elapsedSeconds?: number) => void
      setIdle: () => void
      completeMeasuring: () => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    }) => {
      controlsRef.current = controls
      console.log("Timer controls ready.")
    }

    const handleCycleEnd = () => {
      console.log("Cycle completed! Timer reached zero.")
      setCycleCount((prev) => prev + 1)

      if (isAutoRestart) {
        // Clear any existing timeout before setting a new one
        if (autoRestartTimeoutRef.current) {
          clearTimeout(autoRestartTimeoutRef.current)
        }

        // Automatically start a new 10-second cycle
        autoRestartTimeoutRef.current = setTimeout(() => {
          if (controlsRef.current) {
            controlsRef.current.startNewCycle(10)
          }
          autoRestartTimeoutRef.current = null
        }, 1000)
      }
    }

    const handleMeasuringComplete = () => {
      console.log("Measuring completed! Success animation triggered.")
      setCurrentState("idle") // Return to idle after success animation
    }

    const setIdle = () => {
      if (controlsRef.current) {
        controlsRef.current.setIdle()
        setCurrentState("idle")
      }
    }

    const startMeasuring = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring()
        setCurrentState("measuring")
      }
    }

    const startCountdown = (minutes: number) => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(minutes * 60)
        setCurrentState("countdown")
      }
    }

    const startCountUp = () => {
      if (controlsRef.current) {
        controlsRef.current.startCountUp()
        setCurrentState("countup")
      }
    }

    const completeMeasuring = () => {
      if (controlsRef.current) {
        controlsRef.current.completeMeasuring()
        setCurrentState("success")
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

    const triggerError = () => {
      setHasError(true)
    }

    const resolveError = () => {
      setHasError(false)
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          width: "100%",
          maxWidth: 800,
        }}
      >
        <CycleTimer
          {...args}
          hasError={hasError}
          onCycleComplete={handleCycleComplete}
          onCycleEnd={handleCycleEnd}
          onMeasuringComplete={handleMeasuringComplete}
        />

        <Box
          sx={{
            typography: "body2",
            color: "text.secondary",
            textAlign: "center",
            maxWidth: 600,
            mb: 2,
          }}
        >
          <strong>Current State:</strong> {currentState} | Use the buttons below
          to explore all timer states and functionality.
        </Box>

        {/* State Control Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            variant={currentState === "idle" ? "contained" : "outlined"}
            onClick={setIdle}
          >
            Idle State
          </Button>
          <Button
            variant={currentState === "measuring" ? "contained" : "outlined"}
            onClick={startMeasuring}
          >
            Start Measuring
          </Button>
          <Button
            variant={currentState === "countup" ? "contained" : "outlined"}
            onClick={startCountUp}
          >
            Simple Count-Up
          </Button>
        </Box>

        {/* Countdown Control Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => startCountdown(5)}
          >
            Start 5 min Countdown
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => startCountdown(3)}
          >
            Start 3 min Countdown
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => startCountdown(0.1)}
          >
            Start 6 sec Countdown (demo)
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setCycleCount(0)
              startCountdown(0.17) // 10 seconds for continuous demo
            }}
          >
            Start 10s Continuous Demo
          </Button>
        </Box>

        {/* Measuring Controls */}
        {currentState === "measuring" && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={completeMeasuring}
            >
              Complete Measuring (Trigger Success)
            </Button>
          </Box>
        )}

        {/* Pause/Resume Controls */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button variant="outlined" onClick={pauseTimer}>
            Pause Timer
          </Button>
          <Button variant="outlined" onClick={resumeTimer}>
            Resume Timer
          </Button>
        </Box>

        {/* Auto Restart Controls */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant={isAutoRestart ? "contained" : "outlined"}
            onClick={() => setIsAutoRestart(!isAutoRestart)}
          >
            Auto-restart: {isAutoRestart ? "ON" : "OFF"}
          </Button>
          <Box sx={{ typography: "body2", color: "primary.main" }}>
            Cycles completed: {cycleCount}
          </Box>
        </Box>

        {/* Error State Controls */}
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
            color="error"
            onClick={triggerError}
            disabled={hasError}
          >
            Trigger Error
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={resolveError}
            disabled={!hasError}
          >
            Resolve Error
          </Button>
        </Box>

        {/* State Descriptions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            backgroundColor: "background.paper",
            width: "100%",
          }}
        >
          <Box sx={{ typography: "h6", color: "text.primary" }}>
            State Descriptions:
          </Box>
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            <strong>Idle:</strong> Shows "Waiting for program cycle" with
            transparent inner circle and #181927 outer ring
          </Box>
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            <strong>Measuring:</strong> Count-up timer with "Cycle Time" /
            "measuring..." labels - use "Complete Measuring" to trigger success
            animation
          </Box>
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            <strong>Countdown:</strong> Timer counts down from set time with
            "Remaining Time" / "of X min." labels
          </Box>
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            <strong>Count-Up:</strong> Simple elapsed time display without
            special labels
          </Box>
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            <strong>Success:</strong> Brief green animation state after
            measuring completes (1 second duration)
          </Box>
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            <strong>Auto-restart:</strong> When enabled, timers automatically
            restart after completion with a 1-second delay. Use the "10s
            Continuous Demo" button to test this feature.
          </Box>
        </Box>
      </Box>
    )
  },
}

/**
 * Count-up timer that shows elapsed time without a maximum.
 * The gauge progresses in minute steps and continues counting up indefinitely.
 * Perfect for tracking work sessions or elapsed operation time.
 */
/**
 * Demonstrates fade transitions when switching between count-down and count-up modes.
 * Click the mode switching buttons to see smooth text fade animations.
 */
/**
 * CycleTimer with manual start mode.
 * The timer will not start automatically when a new cycle is set.
 */
/**
 * Interactive demo showing the complete cycle workflow.
 * Demonstrates automatic restart and continuous operation.
 */
/**
 * Small variant with animated progress icon next to text.
 * Shows the format: [ANIMATED_ICON] X:XX/X:XX min
 * The icon is a gauge border only (no fill) that animates with progress.
 */
/**
 * Small compact variant that only shows remaining time with animated icon.
 * Format: [ANIMATED_ICON] X:XX
 * The icon shows progress animation without any text details.
 */
/**
 * Small variant with count-up timer.
 * Shows elapsed time with animated progress icon, no maximum limit.
 */
/**
 * Pause/Resume functionality demo.
 * Demonstrates the complete timer control interface including pause and resume.
 */
/**
 * Small variant demonstration with all states including text-only mode for simple count-up.
 * Shows compact display with progress ring icons and simplified layouts.
 */
export const SmallVariantAllStates: Story = {
  args: {
    variant: "small",
    autoStart: true,
  },
  render: function Render(args) {
    const [hasError, setHasError] = React.useState(false)
    const [currentState, setCurrentState] = React.useState("idle")
    const [compact, setCompact] = React.useState(false)
    const controlsRef: React.MutableRefObject<{
      startNewCycle: (maxTime?: number, elapsedSeconds?: number) => void
      startMeasuring: (elapsedSeconds?: number) => void
      startCountUp: (elapsedSeconds?: number) => void
      setIdle: () => void
      completeMeasuring: () => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    } | null> = React.useRef(null)

    const handleCycleComplete = (controls: {
      startNewCycle: (maxTime?: number, elapsedSeconds?: number) => void
      startMeasuring: (elapsedSeconds?: number) => void
      startCountUp: (elapsedSeconds?: number) => void
      setIdle: () => void
      completeMeasuring: () => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    }) => {
      controlsRef.current = controls
      console.log("Small variant timer controls ready.")
    }

    const handleMeasuringComplete = () => {
      console.log("Measuring completed in small variant!")
      setCurrentState("idle")
    }

    const setIdle = () => {
      if (controlsRef.current) {
        controlsRef.current.setIdle()
        setCurrentState("idle")
      }
    }

    const startMeasuring = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring()
        setCurrentState("measuring")
      }
    }

    const startCountdown = (minutes: number) => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(minutes * 60)
        setCurrentState("countdown")
      }
    }

    const startCountUp = () => {
      if (controlsRef.current) {
        controlsRef.current.startCountUp()
        setCurrentState("countup")
      }
    }

    const completeMeasuring = () => {
      if (controlsRef.current) {
        controlsRef.current.completeMeasuring()
        setCurrentState("success")
      }
    }

    const triggerError = () => {
      setHasError(true)
    }

    const resolveError = () => {
      setHasError(false)
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 4,
          width: "100%",
          maxWidth: 800,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            backgroundColor: "background.paper",
            minHeight: 60,
          }}
        >
          <Box
            sx={{ typography: "body1", fontWeight: "medium", minWidth: 150 }}
          >
            Small Variant Timer:
          </Box>
          <CycleTimer
            {...args}
            hasError={hasError}
            compact={compact}
            onCycleComplete={handleCycleComplete}
            onMeasuringComplete={handleMeasuringComplete}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            <strong>Current State:</strong> {currentState}
          </Box>
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            <strong>Compact Mode:</strong> {compact ? "Yes" : "No"}
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setCompact(!compact)}
          >
            Toggle Compact
          </Button>
        </Box>

        {/* State Control Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant={currentState === "idle" ? "contained" : "outlined"}
            size="small"
            onClick={setIdle}
          >
            Idle
          </Button>
          <Button
            variant={currentState === "measuring" ? "contained" : "outlined"}
            size="small"
            onClick={startMeasuring}
          >
            Measuring
          </Button>
          <Button
            variant={currentState === "countup" ? "contained" : "outlined"}
            size="small"
            onClick={startCountUp}
          >
            Count-Up
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => startCountdown(3)}
          >
            3 min Countdown
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => startCountdown(0.1)}
          >
            6 sec Countdown
          </Button>
        </Box>

        {/* Special Controls */}
        {currentState === "measuring" && (
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={completeMeasuring}
            >
              Complete Measuring
            </Button>
          </Box>
        )}

        {/* Error Controls */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={triggerError}
            disabled={hasError}
          >
            Trigger Error
          </Button>
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={resolveError}
            disabled={!hasError}
          >
            Resolve Error
          </Button>
        </Box>

        {/* Feature Descriptions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            backgroundColor: "background.paper",
            width: "100%",
          }}
        >
          <Box sx={{ typography: "h6", color: "text.primary" }}>
            Small Variant Features:
          </Box>
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            <strong>Progress Ring:</strong> Shows animated progress ring for all
            states except count-up mode
          </Box>
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            <strong>Text-Only Mode:</strong> Count-up state with compact=true
            shows only text without progress ring
          </Box>
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            <strong>Compact Mode:</strong> Reduces text detail for measuring and
            countdown states
          </Box>
          <Box sx={{ typography: "body2", color: "text.secondary" }}>
            <strong>Responsive Layout:</strong> Horizontal layout with
            consistent 20px ring icon and text spacing
          </Box>
        </Box>
      </Box>
    )
  },
}
