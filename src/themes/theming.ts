"use client"

import { createNovaMuiTheme as createUpstreamNovaTheme } from "@wandelbots/design-tokens/mui"
import { RadiusSm } from "@wandelbots/design-tokens"
import type { Theme, ThemeOptions } from "@mui/material/styles"
// Side-effect import: registers `MuiDataGrid` on MUI's `Components` interface
// so the override below is typed.
import "@mui/x-data-grid/themeAugmentation"

// White = palette.text.primary in dark mode. Hardcoded here because
// `componentsExt` values are baked at theme creation time (not slotted
// through MUI's function-form callbacks).
const onDark = "rgba(255, 255, 255, 1)"

/**
 * react/-package-specific overrides layered on top of the canonical Nova
 * theme from `@wandelbots/design-tokens`.
 *
 * Palette + typography + shape + the common component overrides
 * (MuiButton, MuiTab, MuiTabs, MuiToggleButton/Group, MuiSelect, MuiDrawer,
 *  MuiFab, MuiDialog, MuiCssBaseline scrollbars) live upstream — see
 * `@wandelbots/design-tokens/mui/theme.js`.
 */
const reactOverrides: ThemeOptions = {
  components: {
    // Globals for MUI X DataGrid filter popup. These keys deep-merge into
    // Nova's MuiCssBaseline.styleOverrides (which contains scrollbar rules)
    // because both are static objects.
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiDataGrid-panelContent": {
          borderRadius: "16px !important",
          "& .MuiPaper-root": {
            borderRadius: "16px !important",
          },
        },
        ".MuiDataGrid-filterForm": {
          borderRadius: "16px !important",
          "& .MuiInputBase-root": {
            borderRadius: "16px !important",
            "& fieldset": {
              borderRadius: "16px !important",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "16px !important",
            },
          },
          "& .MuiTextField-root": {
            "& .MuiInputBase-root": {
              borderRadius: "16px !important",
              "& fieldset": {
                borderRadius: "16px !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "16px !important",
              },
            },
          },
        },
        ".MuiDataGrid-filterFormValueInput": {
          "& .MuiInputBase-root": {
            borderRadius: "16px !important",
            "& fieldset": {
              borderRadius: "16px !important",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "16px !important",
            },
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        panelContent: {
          borderRadius: "16px !important",
        },
        filterForm: {
          "& .MuiInputBase-root": {
            borderRadius: `${RadiusSm}px !important`,
            "& fieldset": {
              borderRadius: `${RadiusSm}px !important`,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: `${RadiusSm}px !important`,
            },
          },
        },
        filterFormValueInput: {
          "& .MuiInputBase-root": {
            borderRadius: `${RadiusSm}px !important`,
            "& fieldset": {
              borderRadius: `${RadiusSm}px !important`,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: `${RadiusSm}px !important`,
            },
          },
        },
      },
    },
  },

  componentsExt: {
    JoggingPanel: {
      JoggingCartesian: {
        Axis: {
          X: {
            backgroundColor: "rgba(215, 66, 56, 1)",
            borderColor: "rgba(215, 66, 56, 1)",
            buttonBackgroundColor: {
              default: "rgba(241, 77, 66, 1)",
              pressed: "rgba(138, 41, 35, 1)",
              hovered: "rgba(241, 77, 66, 1)",
              disabled: "rgba(241, 77, 66, 1)",
            },
            color: "rgba(255, 198, 198, 1)",
            labelColor: onDark,
          },
          Y: {
            backgroundColor: "rgba(20, 151, 108, 1)",
            borderColor: "rgba(20, 151, 108, 1)",
            buttonBackgroundColor: {
              default: "rgba(28, 188, 135, 1)",
              pressed: "rgba(11, 89, 63, 1)",
              disabled: "rgba(28, 188, 135, 1)",
              hovered: "rgba(28, 188, 135, 1)",
            },
            color: "rgba(215, 255, 242, 1)",
            labelColor: onDark,
          },
          Z: {
            backgroundColor: "rgba(1, 87, 155, 1)",
            borderColor: "rgba(1, 87, 155, 1)",
            buttonBackgroundColor: {
              default: "rgba(2, 136, 209, 1)",
              pressed: "rgba(2, 64, 114, 1)",
              disabled: "rgba(2, 136, 209, 1)",
              hovered: "rgba(2, 136, 209, 1)",
            },
            color: "rgba(210, 239, 255, 1)",
            labelColor: onDark,
          },
        },
      },
      JoggingJoint: {
        Joint: {
          arrowColor: onDark,
        },
      },
      VelocitySlider: {
        sliderLegendColor: onDark,
      },
    },
  },
}

/**
 * Create the default Wandelbots Nova Material UI theme for use with
 * `@wandelbots/wandelbots-js-react-components`. Layers DataGrid +
 * JoggingPanel-defaults on top of the canonical Nova theme from
 * `@wandelbots/design-tokens`.
 *
 * Pass any number of `ThemeOptions` objects to override defaults. Each is
 * deep-merged in order via MUI's `createTheme`.
 *
 * Light mode is not currently supported. Passing `palette: { mode: "light" }`
 * will throw upstream. Browser-preference autodetection was removed when the
 * upstream theme dropped its light-mode stub. It can be re-introduced once
 * Figma synchronises a real light palette.
 */
export function createNovaTheme(...overrides: ThemeOptions[]): Theme {
  // Strip palette.mode from overrides — upstream throws on "light".
  // Warn consumers but don't crash to preserve backward compatibility.
  const sanitized = overrides.map((opts) => {
    if (opts?.palette?.mode) {
      if (opts.palette.mode === "light") {
        console.warn(
          "[createNovaTheme] palette.mode 'light' is not supported — " +
            "light tokens are not yet available. Falling back to dark mode. " +
            "Remove palette.mode from your theme options to silence this warning.",
        )
      }
      const { mode: _, ...restPalette } = opts.palette
      return { ...opts, palette: restPalette }
    }
    return opts
  })
  return createUpstreamNovaTheme(reactOverrides, ...sanitized)
}

/**
 * @deprecated Use {@link createNovaTheme} instead. This name shadows the
 * upstream `createNovaMuiTheme` from `@wandelbots/design-tokens/mui` (which
 * has a different, variadic signature) and is therefore confusing.
 */
export function createNovaMuiTheme(opts: ThemeOptions = {}): Theme {
  return createNovaTheme(opts)
}
