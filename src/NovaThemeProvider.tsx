import type { PropsOf } from "@emotion/react"
import { ThemeProvider, useTheme } from "@mui/material/styles"
import { createContext, type FC } from "react"

export const NovaComponentsContext = createContext({
  novaMuiThemeSet: false,
})

export const NovaThemeProvider: FC<PropsOf<typeof ThemeProvider> | any> = ({
  children,
  ...rest
}) => {
  return (
    <ThemeProvider {...rest}>
      <NovaComponentsContext.Provider value={{ novaMuiThemeSet: true }}>
        {children}
      </NovaComponentsContext.Provider>
    </ThemeProvider>
  )
}
