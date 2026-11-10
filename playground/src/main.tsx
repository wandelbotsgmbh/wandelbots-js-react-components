import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
// The font of the theme (Inter), as the apps load it
import "@wandelbots/fonts/css"
import { createNovaMuiTheme } from "@wandelbots/mui"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

// The theme of the Nova design system, as an app uses it with the library
const theme = createNovaMuiTheme()

const root = document.getElementById("root")
if (!root) throw new Error("The element #root is missing")

// StrictMode mounts each part twice in development: a part that leaves a
// connection open shows up
createRoot(root).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
