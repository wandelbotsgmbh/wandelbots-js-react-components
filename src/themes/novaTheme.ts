"use client"

import { createTheme, useTheme } from "@mui/material/styles"
import type { ThemeOptions } from "@mui/system";
import { defaultsDeep } from "lodash-es"

const baseColors = {
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

/** Colors for the dark theme */
export const darkColors = {
  primary: baseColors.skyblue500,
  textDefault: baseColors.white,
  textInverse: baseColors.darkestblue,
  textError: baseColors.scaryred,
  textSubtle: baseColors.midnightgray500,
  backgroundDefault: baseColors.darkishblue,
  inputBackgroundDefault: baseColors.darkgrayishblue,
  borderColorDefault: "#3A4150",

  selectBackground: baseColors.grayishblue,
  appBarBackground: baseColors.darkestblue,
  virtualRobot: "#1AC0B2",
  physicalRobot: "#956FFA",
  robotViewportBackground: "#1F283A",
  viewportButtonInactiveBackground: baseColors.darkestblue,
  viewportButtonHover: baseColors.midnightgray500,
  viewportButtonActiveBackground: baseColors.skyblue500,
  tabsBarBackground: baseColors.darkestblue,
  activeTabBackground: baseColors.darkishblue,
  omniverseConfigurationSuccess: baseColors.tealGreen,
  omniverseConfigurationFailure: baseColors.magenta,
}

/** Colors for the light theme */
export const lightColors = {
  primary: baseColors.lightbuttonblue,
  textDefault: "#18181B",
  textInverse: baseColors.white,
  textError: baseColors.scaryred,
  textSubtle: baseColors.midnightgray500,
  backgroundDefault: baseColors.white,
  inputBackgroundDefault: baseColors.white,
  borderColorDefault: baseColors.midnightgray500,

  selectBackground: "#E4E4E7",
  appBarBackground: baseColors.white,
  virtualRobot: "green",
  physicalRobot: "blue",
  robotViewportBackground: "#E4E4E7",
  viewportButtonInactiveBackground: baseColors.midnightgray,
  viewportButtonHover: baseColors.midnightgray500,
  viewportButtonActiveBackground: baseColors.lightbuttonblue,
  tabsBarBackground: baseColors.white,
  activeTabBackground: baseColors.white,
  omniverseConfigurationSuccess: baseColors.tealGreen,
  omniverseConfigurationFailure: baseColors.magenta,
}

/** Gets the colors for the current theme (light or dark) */
export function useThemeColors() {
  return useTheme().palette.mode === "dark" ? darkColors : lightColors
}



/**
 * 
 */
export const novaThemeMUIDefaults: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: colors.skyblue500,
    },
    background: {
      default: colors.darkishblue,
    },
  },
  typography: {
    allVariants: {
      color: colors.white,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.darkishblue,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: colors.tabsBarBackground,
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
            color: "inherit",
            backgroundColor: colors.activeTabBackground,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
          fontSize: "14px",
          fontWeight: 500,
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            border: "2px solid rgba(255, 255, 255, 0.6)",
            color: "rgba(255, 255, 255, 0.6)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              border: "2px solid rgba(255, 255, 255, 0.8)",
            },
          },
        },
      ],
    },
    MuiFab: {
      styleOverrides: {
        root: {
          width: "48px",
          height: "48px",
          backgroundColor: colors.viewportButtonInactiveBackground,
          color: colors.textDefault,
          "&:hover": {
            backgroundColor: colors.viewportButtonHover,
          },
        },
      },
      variants: [
        {
          props: { variant: "active" },
          style: {
            backgroundColor: colors.viewportButtonActiveBackground,
            color: colors.textInverse,
            "&:hover": {
              backgroundColor: colors.viewportButtonActiveBackground,
            },
          },
        },
      ],
    },
  }
};

export const novaDarkThemeCustomOptions = {
  layout: {
    /** Height of the little gradient bar at the top */
    linearGradientHeight: 12,
    linearGradientStart: "#EA3767",
    linearGradientEnd: "#72D0FB",
    /** Height of the sidebar logo and security panel container */
    topPanelHeight: 72,
  },
};

export const novaThemeOptions = {
  ...novaDarkThemeMUIOptions,
  ...novaDarkThemeCustomOptions,
};

export type NovaThemeOptions = typeof novaThemeOptions;


export function createNovaTheme(
  mode: "light" | "dark",
  options: ThemeOptions = {},
) {
  const colors = mode === "light" ? lightColors : darkColors
  return createTheme(
    defaultsDeep(options, {
    }),
  )
}