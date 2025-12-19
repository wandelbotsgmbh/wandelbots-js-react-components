import { ThemeProvider, useTheme } from "@mui/material/styles"
import { type FC } from "react"
import { I18nextProvider } from "react-i18next"
import { i18n } from "./i18n/config"

/**
 * Our components require a certain context that may or may not
 * be provided by the user application; this wrapper ensures
 * they can be used either way.
 */
export function externalizeComponent<T extends React.JSX.ElementType>(
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
  // Preserve the existing MUI theme from parent context if it exists
  let theme
  try {
    theme = useTheme()
  } catch {
    // No theme context exists, which is fine - MUI will use defaults
  }

  const content = <I18nextProvider i18n={i18n}>{children}</I18nextProvider>

  // If a theme exists in parent context, pass it through to maintain theme inheritance
  return theme ? (
    <ThemeProvider theme={theme}>{content}</ThemeProvider>
  ) : (
    content
  )
}
