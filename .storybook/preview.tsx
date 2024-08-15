import type { Preview } from "@storybook/react"
import { Box, createTheme, ThemeProvider } from "@mui/material"
import React from "react"
import { DocsContainer } from "./DocsContainer"
import { useDarkMode } from "storybook-dark-mode"
import "./global.css"

const preview: Preview = {
  parameters: {
    docs: {
      container: DocsContainer,
    },
    darkMode: {
      stylePreview: true,
      darkClass: "dark",
      lightClass: "light",
    },
  },
  decorators: [
    (Story) => {
      const isDark = useDarkMode()
      const muiTheme = createTheme({
        palette: { mode: isDark ? "dark" : "light" },
      })

      return (
        <ThemeProvider theme={muiTheme}>
          <Story />
        </ThemeProvider>
      )
    },
  ],
  tags: ["autodocs"],
}

export default preview
