"use client"

import type { Theme } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"
import defaultsDeep from "lodash-es/defaultsDeep"

/**
 * The palette of named colors we pick from for
 * configuring the default nova themes.
 */
const colors = {
  white: "#FFFFFF",
  midnightblue: "#001337",
  lightbuttonblue: "#47D3FF",
  midnightgray: "#DDE0E4",
  midnightgray500: "#828B9B",
  skyblue500: "#06B8F1",
  skyblue600: "#0094CE",
  darkishblue: "#262F42",
  darkestblue: "#101629",
  grayishblue: "#505968",
  darkgrayishblue: "#363c4b",
  scaryred: "#FF0E65",
  tealGreen: "#1AC0B2",
  magenta: "#EA3785",
}

/**
 * A Nova components theme is a collection of Nova-specific settings that is
 * not specifically MUI-related, but can be used to construct a MUI
 * theme in turn.
 *
 * This object defines the default Nova theme settings, and the structure
 * of the options here is used to validate alternative themes.
 */
export const novaDarkTheme = {
  mode: "dark" as "dark" | "light",
  colors: {
    primary: colors.skyblue500,
    textDefault: colors.white,
    textSubtle: colors.midnightgray,
    background: {
      default: colors.darkishblue,
      panel: colors.darkestblue,
    },
  },
}

export type NovaTheme = typeof novaDarkTheme

export const novaLightTheme = {
  mode: "light",
  colors: {
    primary: colors.skyblue500,
    textDefault: colors.darkishblue,
    textSubtle: colors.midnightgray,
    background: {
      default: colors.skyblue500,
      panel: colors.white,
    },
  },
} satisfies NovaTheme

/**
 * Configure a Nova theme with the given options.
 * If no options are provided, the default dark theme is used.
 * Otherwise, the default dark or light theme is extended with
 * the overrides provided as appropriate.
 */
export function createNovaTheme(opts: Partial<NovaTheme> = {}): NovaTheme {
  const defaults = opts.mode === "light" ? novaLightTheme : novaDarkTheme
  return defaultsDeep(opts, defaults)
}

/**
 * Turn a set of Nova theme settings into a Material UI theme.
 *
 * The original Nova settings are available on the resulting MUI
 * theme object under the `nova` key, if needed.
 */
export function createMUIThemeFromNova(novaTheme: NovaTheme): Theme {
  const nova = novaTheme
  const isDark = nova.mode === "dark"

  return createTheme({
    palette: {
      mode: nova.mode,
      primary: {
        main: nova.colors.primary,
      },
      background: {
        default: nova.colors.background.default,
        paper: nova.colors.background.panel,
      },
    },
    typography: {
      allVariants: {
        color: nova.colors.textDefault,
      },
    },
    components: {
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#505968" : undefined,
            borderRadius: "10px",
            color: "currentColor",
            "& > div": {
              padding: "4px 16px",
            },
            "& fieldset": {
              border: isDark ? "none" : undefined,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#505968" : undefined,
            borderRadius: "10px",
            color: "currentColor",
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
              backgroundColor: isDark ? "#3d4455" : undefined,
              color: isDark ? "rgba(255, 255, 255, 0.8)" : undefined,

              "&.Mui-selected": isDark
                ? {
                    color: "white",
                    backgroundColor: "#505968",
                  }
                : undefined,
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#101629" : undefined,
            minHeight: "42px",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: "42px",
            textTransform: "none",
            "&.Mui-selected": isDark
              ? {
                  color: "white",
                  backgroundColor: "#404554",
                }
              : undefined,
          },
        },
      },
    },
    nova,
  })
}
