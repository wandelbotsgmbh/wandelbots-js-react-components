// MUI theme augmentation for react/-specific extensions.
//
// Side-effect import: pulls in Nova's `declare module "@mui/material/styles"`
// (which adds `tertiary`, `backgroundPaperElevation`, and `paletteExt`).
import "@wandelbots/design-tokens/mui"

import type {} from "@mui/material/styles"

export interface AxisControlComponentColors {
  color?: string
  borderColor?: string
  backgroundColor?: string
  buttonBackgroundColor?: {
    default?: string
    pressed?: string
    disabled?: string
    hovered?: string
  }
  labelColor?: string
}

// `componentsExt` is a react/-only extension slot for jogging-panel theming.
// It deliberately lives here (not in `@wandelbots/design-tokens`) because
// jogging/robotics concerns belong in this package per the Nova design-system
// architecture rules.
declare module "@mui/material/styles" {
  interface Theme {
    componentsExt?: {
      JoggingPanel?: {
        JoggingCartesian?: {
          Axis?: {
            X?: AxisControlComponentColors
            Y?: AxisControlComponentColors
            Z?: AxisControlComponentColors
            CustomRotation?: AxisControlComponentColors
          }
        }
        JoggingJoint?: {
          Joint?: {
            arrowColor?: string
          }
        }
        VelocitySlider?: {
          sliderLegendColor?: string
        }
      }
    }
  }

  interface ThemeOptions {
    componentsExt?: Theme["componentsExt"]
  }
}
