import { createTheme, type Theme } from "@mui/material"

export function createDarkTheme(): Theme {
  const baseTheme = createTheme({
    palette: {
      mode: "dark",
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
      tertiary: {
        main: "rgba(100, 255, 218, 1)",
        dark: "rgba(38, 166, 154, 1)",
        light: "rgba(167, 255, 235, 1)",
        contrastText: "rgba(0, 0, 0, 1)",
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
        black: "rgba(0, 0, 0, 1)",
      },
      divider: "rgba(255, 255, 255, 0.12)",
      backgroundPaperElevation: {
        0: "#11131F",
        1: "#141623",
        2: "#171927",
        3: "#1A1C2B",
        4: "#1D1F2F",
        5: "#202233",
        6: "#232537",
        7: "#26283B",
        8: "#292B3F",
        9: "#2C2E43",
        10: "#2F3147",
        11: "#32344B",
        12: "#35374F",
        13: "#383A53",
        14: "#3B3D57",
        15: "#3E405B",
        16: "#393F57",
      },
    },
    paletteExt: {
      primary: {
        hover: "rgba(142, 86, 252, 0.08)",
        selected: "rgba(142, 86, 252, 0.16)",
        focus: "rgba(142, 86, 252, 0.12)",
        focusVisible: "rgba(142, 86, 252, 0.3)",
        outlineBorder: "rgba(142, 86, 252, 0.5)",
      },
      secondary: {
        tonal: "rgba(255,255,255,0.1)",
      },
    },
  })

  return {
    ...baseTheme,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "10px",
          },
        },
        variants: [
          {
            props: { color: "secondary", variant: "contained" },
            style: {
              border: `1px solid ${baseTheme.palette.divider}`,
              background: baseTheme.paletteExt?.secondary?.tonal?.toString(),
            },
          },
        ],
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            border: "1px solid",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            color: baseTheme.palette.text.secondary,
            "&.Mui-selected": {
              color: baseTheme.palette.text.primary,
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            background: baseTheme.palette.backgroundPaperElevation?.[1],
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            ".MuiToggleButtonGroup-firstButton": {
              borderRadius: "10px 0 0 10px",
            },
            ".MuiToggleButtonGroup-lastButton": {
              borderRadius: "0 10px 10px 0",
            },
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            padding: "6px 16px",
          },
        },
      },
      MuiSelect: {
        variants: [
          {
            props: { variant: "filled" },
            style: {
              borderRadius: "10px",
              "::before, ::after": {
                visibility: "collapse",
              },
              ".MuiInputBase-input": {
                padding: "6px 16px",
                borderRadius: "10px",
              },
            },
          },
        ],
      },
      MuiFab: {
        styleOverrides: {
          root: {
            background: baseTheme.paletteExt?.secondary?.tonal,
          },
        },
        variants: [
          {
            props: { color: "primary" },
            style: {
              background: baseTheme.palette.primary.main,
            },
          },
        ],
      },
    },

    componentsExt: {
      JoggingCartesian: {
        Axis: {
          X: {
            backgroundColor: "rgba(215, 66, 56, 1)",
            borderColor: "rgba(215, 66, 56, 1)",
            buttonBackgroundColor: "rgba(241, 77, 66, 1)",
            color: "rgba(255, 255, 255, 1)",
          },
          Y: {
            backgroundColor: "rgba(20, 151, 108, 1)",
            borderColor: "rgba(20, 151, 108, 1)",
            buttonBackgroundColor: "rgba(28, 188, 135, 1)",
            color: "rgba(255, 255, 255, 1)",
          },
          Z: {
            backgroundColor: "rgba(1, 87, 155, 1)",
            borderColor: "rgba(1, 87, 155, 1)",
            buttonBackgroundColor: "rgba(2, 136, 209, 1)",
            color: "rgba(255, 255, 255, 1)",
          },
        },
      },
    },
  }
}
