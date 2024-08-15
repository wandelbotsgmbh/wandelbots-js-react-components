import { ThemeProvider } from "@emotion/react"
import { createMUIThemeFromNova, createNovaTheme } from "./themes/theming"
import type { FC } from "react"
import { useTheme } from "@mui/material"
import { I18nextProvider } from "react-i18next"
// @ts-expect-error invalid type-only import error
import i18n from "./i18n/config"

/**
 * Our components require a certain context that may or may not
 * be provided by the user application; this wrapper ensures
 * they can be used either way.
 */
export function externalizeComponent<T>(
  Component: (props: T) => React.ReactNode,
) {
  return (props: T) => (
    <NovaComponentsProvider>
      <Component {...(props as T & JSX.IntrinsicAttributes)} />
    </NovaComponentsProvider>
  )
}

const NovaComponentsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useTheme()
  const defaultNovaTheme = createNovaTheme({
    mode: theme.palette.mode,
  })
  const defaultTheme = createMUIThemeFromNova(defaultNovaTheme)
  return (
    <ThemeProvider theme={defaultTheme}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </ThemeProvider>
  )
}
