"use client"

import type { Theme, ThemeOptions } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"

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
 * Settings used to construct the Nova default theme.
 * The dark theme is the default and defines the structure of the
 * settings.
 */
export const novaDarkSettings = {
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

export type NovaThemeSettings = typeof novaDarkSettings

export const novaLightSettings = {
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
} satisfies NovaThemeSettings

/**
 * Create the default Wandelbots Nova Material UI theme, overriding
 * any defaults with the provided theme options.
 */
export function createNovaMuiTheme(opts: ThemeOptions): Theme {
  let isDark = true
  if (opts.palette?.mode === "light") {
    isDark = false
  } else if (opts.palette?.mode !== "dark") {
    const browserPrefersLight =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: light)")?.matches
    isDark = !browserPrefersLight
  }

  const nova = isDark ? novaDarkSettings : novaLightSettings

  const theme = createTheme({
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

  if (opts) {
    return createTheme(theme, opts)
  } else {
    return theme
  }
}
