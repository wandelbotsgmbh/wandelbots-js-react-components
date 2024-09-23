import { Box, useTheme } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react"
import { JoggingPanel, type JoggingPanelProps } from "../src/index"

const JoggingPanelWrapper = (props: JoggingPanelProps) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.backgroundPaperElevation?.[5],
        maxWidth: "min-content",
      }}
    >
      <JoggingPanel {...props} />
    </Box>
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
