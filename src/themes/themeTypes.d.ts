import { NovaTheme } from "./novaTheme";

declare module "@mui/material/styles" {
  interface Theme {
    nova: NovaTheme
  }

  interface ThemeOptions {
    nova?: NovaTheme
  }
}