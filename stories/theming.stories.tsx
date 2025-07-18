import type { Meta, StoryObj } from "@storybook/react-vite"
import { JoggingPanel, createNovaMuiTheme } from "../src"
import { Default as JoggingPanelStory } from "./JoggingPanel.stories"
import { createTheme, ThemeProvider } from "@mui/material"

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
        primary: {
          main: "#ff0000",
        },
      },
    })

    return (
      <ThemeProvider theme={theme}>
        <JoggingPanel {...args} />
      </ThemeProvider>
    )
  },
}

export const JoggingStoryReplacedTheme: StoryObj<typeof JoggingPanel> = {
  ...JoggingPanelStory,
  tags: ["!dev", "!autodocs"],
  render: (args) => {
    const theme = createTheme({
      typography: {
        fontFamily: "Comic Sans MS",
      },
    })

    return (
      <ThemeProvider theme={theme}>
        <JoggingPanel {...args} />
      </ThemeProvider>
    )
  },
}
