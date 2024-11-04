import { CssBaseline, ThemeProvider } from "@mui/material"
import type { Preview } from "@storybook/react"
import React from "react"
import { useDarkMode } from "storybook-dark-mode"
import { createNovaMuiTheme } from "../src"
import { DocsContainer } from "./DocsContainer"
import "./global.css"

const preview: Preview = {
  parameters: {
    docs: {
      container: DocsContainer,
      // Set to true to enable automatic play function testing
      // in the dev server; not true by default because the
      // expects there tend to override other errors with a less
      // helpful messsage
      // story: { autoplay: true },
    },

    // Duplicate functionality with storybook-dark-mode
    backgrounds: { disable: true },

    darkMode: {
      stylePreview: true,
      darkClass: "dark",
      lightClass: "light",
    },

    options: {
      storySort: (a, b) =>
        a.id === b.id
          ? 0
          : a.id.localeCompare(b.id, undefined, { numeric: true }),
    },

    // From mui integration guide https://storybook.js.org/recipes/@mui/material
    controls: {
      expanded: true, // Adds the description and default columns
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => {
      const isDark = useDarkMode()
      const muiTheme = createNovaMuiTheme({
        palette: { mode: isDark ? "dark" : "light" },
      })

      return (
        <>
          <CssBaseline />
          <ThemeProvider theme={muiTheme}>
            <Story />
          </ThemeProvider>
        </>
      )
    },
  ],
  tags: ["autodocs"],
}

export default preview
