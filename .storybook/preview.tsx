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

      // Not a nova-derived theme since we want to test that the
      // downstream components correctly get a nova theme automatically
      // if not provided with one
      const muiTheme = createTheme({
        palette: {
          mode: isDark ? "dark" : "light",
          background: {
            default: isDark ? "#151D35" : "#F5F8FA",
            paper: isDark ? "#262f41" : "#FFFFFF",
          },
        },
        components: {
          MuiSelect: {
            styleOverrides: {
              root: {
                backgroundColor: "#505968",
                borderRadius: "10px",
                borderStyle: "none",
                color: "currentColor",
                "& > div": {
                  padding: "4px 16px",
                },
                "& fieldset": {
                  border: "none",
                },
              },
            },
          },
          MuiToggleButtonGroup: {
            styleOverrides: {
              root: {
                "& > button": {
                  borderRadius: "8px",
                  textTransform: "none",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  width: "100%",
                  borderWidth: 0,
                  backgroundColor: "#3d4455",
                  color: "rgba(255, 255, 255, 0.8)",

                  "&.Mui-selected": {
                    color: "white",
                    backgroundColor: "#505968",
                  },
                },
              },
            },
          },
          MuiTabs: {
            styleOverrides: {
              root: {
                backgroundColor: "#101629",
                minHeight: "42px",
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                minHeight: "42px",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "white",
                  backgroundColor: "#404554",
                },
              },
            },
          },
        },
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
