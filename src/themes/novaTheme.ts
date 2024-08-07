"use client"

import { createTheme, Theme } from "@mui/material/styles"
import type { editor } from "monaco-editor"

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
 * A Nova theme is a collection of Nova-specific settings that is
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
    backgroundDefault: colors.darkishblue,
    buttonPrimary: {
      background: "#00A4F5",
      text: "#FFFFFF",
    },
    buttonSecondary: {
      background: "#879399",
      text: "#FFFFFF",
    },
    buttonBack: {
      background: "transparent",
      text: "#151D35",
    },
    inputField: {
      background: "#F5F8FA",
      text: "#242C3E",
      unitBackground: "#CCD4D9",
      unitText: "#242C3E",
    },
  },
}

export type NovaTheme = typeof novaDarkTheme

export const novaLightTheme = {
  mode: "light" as "dark" | "light",
  colors: {
    primary: colors.skyblue500,
    textDefault: colors.darkishblue,
    textSubtle: colors.midnightgray,
    backgroundDefault: colors.skyblue500,
    buttonPrimary: {
      background: "#00A4F5",
      text: "#FFFFFF",
    },
    buttonSecondary: {
      background: "#879399",
      text: "#FFFFFF",
    },
    buttonBack: {
      background: "transparent",
      text: "#151D35",
    },
    inputField: {
      background: "#F5F8FA",
      text: "#242C3E",
      unitBackground: "#CCD4D9",
      unitText: "#242C3E",
    },
  },
} satisfies NovaTheme

/**
 * Turn a set of Nova theme settings into a Material UI theme.
 *
 * The original Nova settings are available on the resulting MUI
 * theme object under the `nova` key, if needed.
 */
export function createNovaMUITheme(novaTheme: NovaTheme): Theme {
  const nova = novaTheme
  return createTheme({
    palette: {
      mode: nova.mode,
      primary: {
        main: nova.colors.primary,
      },
      background: {
        default: nova.colors.backgroundDefault,
      },
    },
    typography: {
      allVariants: {
        color: nova.colors.textDefault,
      },
    },
    nova,
  })
}
