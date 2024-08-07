import type { Preview } from "@storybook/react"
import { Box, ThemeProvider } from "@mui/material"
import {
  createNovaMUITheme,
  novaDarkTheme,
  novaLightTheme,
} from "../src/themes/novaTheme"
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

      return (
        <ThemeProvider
          theme={createNovaMUITheme(isDark ? novaDarkTheme : novaLightTheme)}
        >
          <Story />
        </ThemeProvider>
      )
    },
  ],
  tags: ["autodocs"],
}

export default preview
