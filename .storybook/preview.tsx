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

    // Support for built-in Storybook dark mode
    backgrounds: { disable: true },

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
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light"
      const muiTheme = createNovaMuiTheme({
        palette: { mode: theme },
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
