import type { Preview } from "@storybook/react"
import { ThemeProvider } from "@mui/material"
import {
  createNovaMUITheme,
  novaDarkTheme,
  novaLightTheme,
} from "../src/themes/novaTheme"
import React from "react"
import { DocsContainer } from "./DocsContainer"
import { useDarkMode } from "storybook-dark-mode"

const preview: Preview = {
  parameters: {
    docs: {
      container: DocsContainer,
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
