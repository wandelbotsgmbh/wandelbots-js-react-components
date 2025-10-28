import { Box, Button } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Timer } from "../src/components/Timer"

const meta: Meta<typeof Timer> = {
  title: "Components/Timer",
  component: Timer,
  tags: ["!dev"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A simple count-up timer component with visual progress indication.

**Key Features:**
- **Count-up timer** that tracks elapsed time continuously
- **Visual progress gauge** that cycles every minute (264px diameter for default variant)
- **Two display variants:** large circular gauge or small icon with text
- **Timer control interface** (start, pause, resume, reset)
- **Error state support:** pauses timer and shows error styling with automatic resume
- **Smooth progress animations** with spring physics
- **Two variants:** default (large gauge) or small (animated icon with text)
- **Compact mode:** for small variant, shows only essential information
- Fully localized with i18next
- Material-UI theming integration

**Control Functions:**
- \`start(elapsedSeconds?)\` - Start timer with optional elapsed time
- \`pause()\` / \`resume()\` - Pause and resume timer
- \`reset()\` - Reset timer to zero
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
    onTimerReady: () => {}, // Default no-op function for docs
  },
  argTypes: {
    onTimerReady: {
      action: "onTimerReady",
      description:
        "Callback that receives timer control functions (start, pause, resume, reset, isPaused)",
    },
    autoStart: {
      control: "boolean",
      description:
        "Whether the timer should start automatically when initialized",
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
      description: "For small variant: whether to show compact display",
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
 * Interactive demonstration of Timer functionality.
 * Use the buttons to control the timer: start, pause, resume, reset.
 * Test error state behavior and see how the timer handles different scenarios.
 */
export const Default: Story = {
  args: {
    autoStart: true,
  },
  render: function Render(args) {
    const [hasError, setHasError] = React.useState(false)
    const controlsRef = React.useRef<{
      start: (elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      reset: () => void
      isPaused: () => boolean
    } | null>(null)

    const handleTimerReady = (controls: {
      start: (elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      reset: () => void
      isPaused: () => boolean
    }) => {
      controlsRef.current = controls
      args.onTimerReady(controls)
    }

    const startTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.start()
      }
    }

    const startWithElapsed = () => {
      if (controlsRef.current) {
        controlsRef.current.start(45) // Start with 45 seconds elapsed
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

    const resetTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.reset()
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
        <Timer {...args} onTimerReady={handleTimerReady} hasError={hasError} />

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={startTimer} size="small">
            Start Fresh
          </Button>
          <Button variant="contained" onClick={startWithElapsed} size="small">
            Start from 45s
          </Button>
          <Button variant="outlined" onClick={pauseTimer} size="small">
            Pause
          </Button>
          <Button variant="outlined" onClick={resumeTimer} size="small">
            Resume
          </Button>
          <Button variant="outlined" onClick={resetTimer} size="small">
            Reset
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
 * Shows the format: [ANIMATED_ICON] X:XX
 * The icon is a gauge border only (no fill) that animates with progress.
 */
export const SmallVariant: Story = {
  args: {
    variant: "small",
    autoStart: true,
  },
  render: function Render(args) {
    const controlsRef = React.useRef<{
      start: (elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      reset: () => void
      isPaused: () => boolean
    } | null>(null)

    const handleTimerReady = (controls: {
      start: (elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      reset: () => void
      isPaused: () => boolean
    }) => {
      controlsRef.current = controls
      args.onTimerReady(controls)
    }

    const resetTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.reset()
      }
    }

    const startTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.start()
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
        <Timer {...args} onTimerReady={handleTimerReady} />

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={startTimer} size="small">
            Start
          </Button>
          <Button variant="outlined" onClick={resetTimer} size="small">
            Reset
          </Button>
        </Box>
      </Box>
    )
  },
}

/**
 * Small compact variant that only shows elapsed time with animated icon.
 * Format: [ANIMATED_ICON] X:XX
 * The icon shows progress animation without any additional text details.
 */
export const SmallCompact: Story = {
  args: {
    variant: "small",
    compact: true,
    autoStart: true,
  },
  render: function Render(args) {
    const controlsRef = React.useRef<{
      start: (elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      reset: () => void
      isPaused: () => boolean
    } | null>(null)

    const handleTimerReady = (controls: {
      start: (elapsedSeconds?: number) => void
      pause: () => void
      resume: () => void
      reset: () => void
      isPaused: () => boolean
    }) => {
      controlsRef.current = controls
      args.onTimerReady(controls)
    }

    const resetTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.reset()
      }
    }

    const startTimer = () => {
      if (controlsRef.current) {
        controlsRef.current.start()
      }
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Timer {...args} onTimerReady={handleTimerReady} />

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={startTimer} size="small">
            Start
          </Button>
          <Button variant="outlined" onClick={resetTimer} size="small">
            Reset
          </Button>
        </Box>
      </Box>
    )
  },
}
