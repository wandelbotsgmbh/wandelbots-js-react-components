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

    backgrounds: {
      default: "dark",
      options: {
        dark: { name: "dark", value: "#141623" },
        light: { name: "light", value: "#ffffff" },
      },
    },

    options: {
      storySort: {
        order: [
          "Getting Started",
          "3D View",
          [
            "Model Visualization",
            "TrajectoryRenderer",
            "SafetyZonesRenderer",
            "CollisionSceneRenderer",
          ],
          "Jogging",
          "Safety",
          "Components",
          ["RobotCard", ["Stories", "Usage Docs"]],
          "Navigation",
          "*", // Everything else
        ],
      },
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
  initialGlobals: {
    backgrounds: { value: "dark" },
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
