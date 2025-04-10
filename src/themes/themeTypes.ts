import type { editor } from "monaco-editor"

type NovaColorPaletteExtension = {
  paletteExt?: {
    primary?: {
      hover?: string
      selected?: string
      focus?: string
      focusVisible?: string
      outlineBorder?: string
    }
    secondary?: {
      tonal?: string
    }
  }
}

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

interface NovaComponentsExtension {
  componentsExt?: {
    JoggingCartesian?: {
      Axis?: {
        X?: AxisControlComponentColors
        Y?: AxisControlComponentColors
        Z?: AxisControlComponentColors
      }
    }
    JoggingJoint?: {
      Joint?: {
        arrowColor?: string
      }
    }
    WandelscriptEditor?: {
      monacoTheme: editor.IStandaloneThemeData
    }
  }
}

interface BackgroundPaperElevation {
  0?: string
  1?: string
  2?: string
  3?: string
  4?: string
  5?: string
  6?: string
  7?: string
  8?: string
  9?: string
  10?: string
  11?: string
  12?: string
  13?: string
  14?: string
  15?: string
  16?: string
  17?: string
  18?: string
  19?: string
  20?: string
  21?: string
  22?: string
  23?: string
  24?: string
}

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"]
    backgroundPaperElevation?: BackgroundPaperElevation
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"]
    backgroundPaperElevation?: BackgroundPaperElevation
  }

  interface Theme extends NovaComponentsExtension, NovaColorPaletteExtension {}

  interface ThemeOptions
    extends NovaComponentsExtension,
      NovaColorPaletteExtension {}
}
