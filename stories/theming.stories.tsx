import type { Meta, StoryObj } from "@storybook/react"
import { JoggingPanel, NovaThemeProvider, createNovaMuiTheme } from "../src"
import { Default as JoggingPanelStory } from "./JoggingPanel.stories"
import { createTheme } from "@mui/material"

const meta: Meta<typeof JoggingPanel> = {
  component: JoggingPanel,
}

export default meta

export const JoggingStoryExtendedTheme: StoryObj<typeof JoggingPanel> = {
  ...JoggingPanelStory,
  tags: ["!dev", "!autodocs"],
  render: (args) => {
    const theme = createNovaMuiTheme({
      palette: {
        background: {
          paper: "black",
        },
      },
    })

    return (
      <NovaThemeProvider theme={theme}>
        <JoggingPanel {...args} />
      </NovaThemeProvider>
    )
  },
}

export const JoggingStoryReplacedTheme: StoryObj<typeof JoggingPanel> = {
  ...JoggingPanelStory,
  tags: ["!dev", "!autodocs"],
  render: (args) => {
    const theme = createTheme()

    return (
      <NovaThemeProvider theme={theme}>
        <JoggingPanel {...args} />
      </NovaThemeProvider>
    )
  },
}
