import { CssBaseline, ThemeProvider } from "@mui/material"
import type { Preview } from "@storybook/react-vite"
import { createNovaMuiTheme } from "../src"
import { DocsContainer } from "./DocsContainer"
import "./global.css"

const preview: Preview = {
  parameters: {
    docs: {
      container: DocsContainer,
    },

    // Force dark backgrounds
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#121212" }],
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
      // Force dark theme for all components
      const muiTheme = createNovaMuiTheme({
        palette: { mode: "dark" },
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
