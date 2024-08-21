import { createNovaMuiTheme } from "./themes/theming"
import { useContext, type FC } from "react"
import { useTheme } from "@mui/material"
import { I18nextProvider } from "react-i18next"
// @ts-expect-error invalid type-only import error
import i18n from "./i18n/config"
import { NovaThemeProvider, NovaComponentsContext } from "./NovaThemeProvider"

/**
 * Our components require a certain context that may or may not
 * be provided by the user application; this wrapper ensures
 * they can be used either way.
 */
export function externalizeComponent<T extends JSX.ElementType>(
  Component: T,
): T {
  const WrappedComponent = ((props: T) => (
    <NovaComponentsProvider>
      <Component {...(props as any)} />
    </NovaComponentsProvider>
  )) as any

  return WrappedComponent
}

const NovaComponentsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const context = useContext(NovaComponentsContext)
  const theme = useTheme()

  if (context.novaMuiThemeSet) {
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  } else {
    const defaultTheme = createNovaMuiTheme({
      palette: {
        mode: theme.palette.mode,
      },
    })
    return (
      <NovaThemeProvider theme={defaultTheme}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </NovaThemeProvider>
    )
  }
}
