import type { NovaThemeSettings } from "./novaTheme"

declare module "@mui/material/styles" {
  interface Theme {
    nova: NovaThemeSettings
  }

  interface ThemeOptions {
    nova?: NovaThemeSettings
  }
}
