import { Stack, Typography, useTheme } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react"
import { JoggingPanel, type JoggingPanelProps } from "../src/index"

const JoggingPanelWrapper = (props: JoggingPanelProps) => {
  const theme = useTheme()
  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        maxWidth: "min-content",
      }}
    >
      <JoggingPanel
        {...props}
        sx={{
          width: "320px",
          backgroundColor: theme.palette.backgroundPaperElevation?.[5],
        }}
      />
      <JoggingPanel
        {...props}
        sx={{
          width: "460px",
          backgroundColor: theme.palette.backgroundPaperElevation?.[5],
        }}
        renderChildren={(tabId) => {
          if (tabId === "cartesian") {
            return (
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  background: theme.palette.backgroundPaperElevation?.[7],
                  borderRadius: "16px",
                  minHeight: "200px",
                }}
              >
                <Typography color={theme.palette.text.primary}>
                  Children Cartesian
                </Typography>
              </Stack>
            )
          }

          return (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                background: theme.palette.backgroundPaperElevation?.[7],
                borderRadius: "16px",
                minHeight: "200px",
              }}
            >
              <Typography color={theme.palette.text.primary}>
                Children Joint
              </Typography>
            </Stack>
          )
        }}
      />
    </Stack>
  )
}

const meta: Meta<typeof JoggingPanel> = {
  title: "Jogging/JoggingPanel",
  tags: ["!dev"],
  component: JoggingPanelWrapper,
}
export default meta

export const Default: StoryObj<typeof JoggingPanel> = {
  args: {
    nova: "https://mock.example.com",
    motionGroupId: "0@mock-ur5e",
  },
  argTypes: {
    nova: {
      control: {
        type: "text",
      },
    },
  },
}
