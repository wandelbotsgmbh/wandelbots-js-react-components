import { Box, Button } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { ProgramControl } from "../src"

const meta: Meta<typeof ProgramControl> = {
  title: "Components/ProgramControl",
  component: ProgramControl,
  tags: ["!dev"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    state: {
      control: "select",
      options: ["idle", "running", "paused", "stopping"],
      description: "The current state of the program control",
      table: {
        type: {
          summary: "'idle' | 'running' | 'paused' | 'stopping'",
        },
      },
    },
    variant: {
      control: "select",
      options: ["with_pause", "without_pause"],
      description:
        "Variant of the component: 'with_pause' shows run/pause/stop buttons, 'without_pause' shows only run/stop buttons",
      table: {
        type: {
          summary: "'with_pause' | 'without_pause'",
        },
        defaultValue: {
          summary: "'with_pause'",
        },
      },
    },
    requiresManualReset: {
      control: "boolean",
      description:
        "When true, the component will stay in 'stopping' state until onReset is called manually. When false, auto-resets to 'idle' after 2 seconds.",
    },
    onRun: {
      action: "onRun",
      description: "Callback fired when the run/resume button is clicked",
    },
    onPause: {
      action: "onPause",
      description:
        "Callback fired when the pause button is clicked (only available in 'with_pause' variant)",
    },
    onStop: {
      action: "onStop",
      description: "Callback fired when the stop button is clicked",
    },
    onReset: {
      action: "onReset",
      description:
        "Function to reset the component from 'stopping' state back to 'idle'. This must be called manually by the user when requiresManualReset is true.",
    },
  },
  args: {
    state: "idle",
    variant: "with_pause",
    requiresManualReset: false,
  },
  render: function Component(args) {
    const [, setArgs] = useArgs()

    function onRun() {
      console.log("Run pressed")
      args.onRun?.()
      // Simulate state change
      if (args.state === "idle") {
        setArgs({ state: "running" })
      } else if (args.state === "paused") {
        setArgs({ state: "running" })
      }
    }

    function onPause() {
      console.log("Pause pressed")
      args.onPause?.()
      // Simulate state change
      if (args.state === "running") {
        setArgs({ state: "paused" })
      }
    }

    function onStop() {
      console.log("Stop pressed")
      args.onStop?.()
      // Simulate state change
      setArgs({ state: "stopping" })

      // If manual reset is required, don't auto-reset
      if (!args.requiresManualReset) {
        // Simulate return to idle after stopping
        setTimeout(() => {
          setArgs({ state: "idle" })
        }, 2000)
      }
    }

    function onReset() {
      console.log("Reset called")
      args.onReset?.()
      // Reset to idle state
      setArgs({ state: "idle" })
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
        <ProgramControl
          {...args}
          onRun={onRun}
          onPause={onPause}
          onStop={onStop}
          onReset={onReset}
        />

        {args.requiresManualReset && args.state === "stopping" && (
          <Button
            variant="outlined"
            color="info"
            onClick={onReset}
            sx={{ mt: 2 }}
          >
            🔄 Manual Reset (Trigger onReset)
          </Button>
        )}

        {args.requiresManualReset && (
          <Box
            sx={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "text.secondary",
              maxWidth: 300,
            }}
          >
            {args.state === "stopping"
              ? "Component is in stopping state. Use the Manual Reset button above or manually call onReset() to return to idle."
              : "When you press Stop, the component will stay in stopping state until you manually call the onReset function."}
          </Box>
        )}
      </Box>
    )
  },
}

export default meta
type Story = StoryObj<typeof ProgramControl>

export const WithPauseIdle: Story = {
  args: {
    state: "idle",
    variant: "with_pause",
  },
}

export const WithPauseRunning: Story = {
  args: {
    state: "running",
    variant: "with_pause",
  },
}

export const WithPausePaused: Story = {
  args: {
    state: "paused",
    variant: "with_pause",
  },
}

export const WithPauseStopping: Story = {
  args: {
    state: "stopping",
    variant: "with_pause",
  },
}

export const WithoutPauseIdle: Story = {
  args: {
    state: "idle",
    variant: "without_pause",
  },
}

export const WithoutPauseRunning: Story = {
  args: {
    state: "running",
    variant: "without_pause",
  },
}

export const WithManualReset: Story = {
  name: "Manual Reset Example",
  args: {
    state: "stopping",
    variant: "with_pause",
    requiresManualReset: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example shows the component in stopping state when manual reset is required. The user must manually call the onReset function to return to idle state.",
      },
    },
  },
}

export const Interactive: Story = {
  name: "Interactive Demo (Auto Reset)",
  args: {
    state: "idle",
    variant: "with_pause",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo with automatic reset after stopping. The component automatically returns to idle state after 2 seconds in stopping state.",
      },
    },
  },
}

export const ManualResetRequired: Story = {
  name: "Interactive Demo (Manual Reset)",
  args: {
    state: "idle",
    variant: "with_pause",
    requiresManualReset: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo with manual reset required. When stopped, the component stays in stopping state until you manually call the onReset function (check the Actions panel or use the reset button below).",
      },
    },
  },
}
