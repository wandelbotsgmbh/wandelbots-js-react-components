import { createTheme } from "@mui/material"

export function createDarkTheme() {
  const colorExtension = {
    primary: {
      contrast: "rgba(255, 255, 255, 0.87)",
      hover: "rgba(142, 86, 252, 0.08)",
      selected: "rgba(142, 86, 252, 0.16)",
      focus: "rgba(142, 86, 252, 0.12)",
      focusVisible: "rgba(142, 86, 252, 0.3)",
      outlineBorder: "rgba(142, 86, 252, 0.5)",
    },
    tertiary: {
      main: "rgba(100, 255, 218, 1)",
      dark: "rgba(38, 166, 154, 1)",
      light: "rgba(167, 255, 235, 1)",
      contrast: "rgba(0, 0, 0, 1)",
    },
    backgrund: {
      paper: {
        elevation: {
          0: "rgba(17, 19, 31, 1)",
          2: "rgba(23, 25, 39, 1)",
          16: "rgba(57, 63, 87, 1)",
          24: "rgba(66, 73, 101, 1)",
        },
      },
    },
    action: {
      divider: "rgba(255, 255, 255, 0.12)",
    },
  }

  return createTheme({
    palette: {
      text: {
        primary: "rgba(255, 255, 255, 1)",
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.38)",
      },
      primary: {
        main: "rgba(142, 86, 252, 1)",
        dark: "rgba(136, 58, 255, 1)",
        light: "rgba(157, 131, 246, 1)",
        contrastText: "rgba(255, 255, 255, 0.87)",
      },
      secondary: {
        main: "rgba(255, 255, 255, 1)",
        dark: "rgba(255, 255, 255, 0.06)",
        contrastText: "rgba(255, 255, 255, 0.87)",
      },
      error: {
        main: "rgba(239, 83, 80, 1)",
        dark: "rgba(229, 57, 53, 1)",
        light: "rgba(239, 154, 154, 1)",
        contrastText: "rgba(255, 255, 255, 1)",
      },
      warning: {
        main: "rgba(255, 255, 255, 1)",
        dark: "rgba(255, 145, 0, 1)",
        light: "rgba(255, 209, 128, 1)",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      success: {
        main: "rgba(38, 166, 154, 1)",
        dark: "rgba(0, 121, 107, 1)",
        light: "rgba(128, 203, 196, 1)",
        contrastText: "rgba(255, 255, 255, 0.87)",
      },
      background: {
        default: "rgba(2, 6, 23, 1)",
        paper: "rgba(17, 19, 31, 1)",
      },
      action: {
        active: "rgba(255, 255, 255, 0.56)",
        hover: "rgba(255, 255, 255, 0.08)",
        selected: "rgba(255, 255, 255, 0.16)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        focus: "rgba(255, 255, 255, 0.12)",
        disabled: "rgba(255, 255, 255, 0.38)",
      },
      common: {
        white: "rgba(255, 255, 255, 1)",
        black: "rgba(255, 255, 255, 1)",
      },
    },
  })
}
