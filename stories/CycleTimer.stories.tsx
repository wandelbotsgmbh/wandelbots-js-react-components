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
- \`startNewCycle(maxTimeSeconds, elapsedSeconds?)\` - Start countdown timer with optional elapsed time offset
- \`startMeasuring(elapsedSeconds?)\` - Start measuring mode with optional elapsed time offset
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
        "Callback that receives timer control functions (startNewCycle, startMeasuring, setIdle, completeMeasuring, pause, resume, isPaused)",
    },
    onCycleEnd: {
      action: "onCycleEnd",
      description:
        "Callback fired when a cycle actually completes (reaches zero) - only for countdown mode",
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
 * Use the buttons to switch between different states: idle, measuring, countdown, and success.
 * Test pause/resume controls and error state behavior.
 */
export const Default: Story = {
  args: {
    autoStart: true,
  },
  render: function Render(args) {
    const [hasError, setHasError] = React.useState(false)
    const controlsRef = React.useRef<{
      startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void
      startMeasuring: (elapsedSeconds?: number) => void
      setIdle: () => void
      completeMeasuring: () => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    } | null>(null)

    const handleCycleComplete = (controls: {
      startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void
      startMeasuring: (elapsedSeconds?: number) => void
      setIdle: () => void
      completeMeasuring: () => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    }) => {
      controlsRef.current = controls
      args.onCycleComplete(controls)
    }

    const setIdle = () => {
      if (controlsRef.current) {
        controlsRef.current.setIdle()
      }
    }

    const startMeasuring = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring()
      }
    }

    const completeMeasuring = () => {
      if (controlsRef.current) {
        controlsRef.current.completeMeasuring()
      }
    }

    const startCountdown = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(90) // 90 second countdown
      }
    }

    const startCountdownWithOffset = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(120, 30) // 120 second countdown, started with 30 seconds already elapsed
      }
    }

    const startMeasuringWithOffset = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring(45) // Start measuring with 45 seconds already elapsed
      }
    }

    const startMeasuringHours = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring(7384) // ~2h 3m 4s elapsed
      }
    }

    const startCountdownHours = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(7200) // 2 hour countdown
      }
    }

    const startCountdownDays = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(90000) // ~25 hour countdown (1d 1h)
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

    const toggleError = () => {
      setHasError(!hasError)
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <CycleTimer
          {...args}
          onCycleComplete={handleCycleComplete}
          hasError={hasError}
        />

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={setIdle} size="small">
            Set Idle
          </Button>
          <Button variant="contained" onClick={startMeasuring} size="small">
            Start Measuring
          </Button>
          <Button
            variant="contained"
            onClick={startMeasuringWithOffset}
            size="small"
          >
            Start Measuring (45s)
          </Button>
          <Button variant="contained" onClick={completeMeasuring} size="small">
            Complete Measuring
          </Button>
          <Button variant="contained" onClick={startCountdown} size="small">
            Start 90s Countdown
          </Button>
          <Button
            variant="contained"
            onClick={startCountdownWithOffset}
            size="small"
          >
            Start 120s (30s elapsed)
          </Button>
          <Button
            variant="contained"
            onClick={startMeasuringHours}
            size="small"
            color="secondary"
          >
            Measuring ~2h 3m
          </Button>
          <Button
            variant="contained"
            onClick={startCountdownHours}
            size="small"
            color="secondary"
          >
            Countdown 2h
          </Button>
          <Button
            variant="contained"
            onClick={startCountdownDays}
            size="small"
            color="secondary"
          >
            Countdown ~25h
          </Button>
          <Button variant="outlined" onClick={pauseTimer} size="small">
            Pause
          </Button>
          <Button variant="outlined" onClick={resumeTimer} size="small">
            Resume
          </Button>
          <Button
            variant={hasError ? "contained" : "outlined"}
            color="error"
            onClick={toggleError}
            size="small"
          >
            {hasError ? "Clear Error" : "Trigger Error"}
          </Button>
        </Box>
      </Box>
    )
  },
}

/**
 * Small variant with animated progress icon next to text.
 * Shows cycle-specific information in a compact format.
 */
export const SmallVariant: Story = {
  args: {
    variant: "small",
    autoStart: true,
  },
  render: function Render(args) {
    const controlsRef = React.useRef<{
      startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void
      startMeasuring: (elapsedSeconds?: number) => void
      setIdle: () => void
      completeMeasuring: () => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    } | null>(null)

    const handleCycleComplete = (controls: {
      startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void
      startMeasuring: (elapsedSeconds?: number) => void
      setIdle: () => void
      completeMeasuring: () => void
      pause: () => void
      resume: () => void
      isPaused: () => boolean
    }) => {
      controlsRef.current = controls
      args.onCycleComplete(controls)
    }

    const startMeasuring = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring()
      }
    }

    const startMeasuringHours = () => {
      if (controlsRef.current) {
        controlsRef.current.startMeasuring(7384) // ~2h 3m 4s elapsed
      }
    }

    const startCountdown = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(60) // 60 second countdown
      }
    }

    const startCountdownHours = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(7200) // 2 hour countdown
      }
    }

    const startCountdownDays = () => {
      if (controlsRef.current) {
        controlsRef.current.startNewCycle(90000) // ~25 hour countdown (1d 1h)
      }
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 3,
        }}
      >
        <CycleTimer {...args} onCycleComplete={handleCycleComplete} />

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button variant="contained" onClick={startMeasuring} size="small">
            Start Measuring
          </Button>
          <Button variant="contained" onClick={startCountdown} size="small">
            Start 60s Countdown
          </Button>
          <Button
            variant="contained"
            onClick={startMeasuringHours}
            size="small"
            color="secondary"
          >
            Measuring ~2h 3m
          </Button>
          <Button
            variant="contained"
            onClick={startCountdownHours}
            size="small"
            color="secondary"
          >
            Countdown 2h
          </Button>
          <Button
            variant="contained"
            onClick={startCountdownDays}
            size="small"
            color="secondary"
          >
            Countdown ~25h
          </Button>
        </Box>
      </Box>
    )
  },
}
