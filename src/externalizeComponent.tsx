import { type FC } from "react"
import { I18nextProvider } from "react-i18next"
import { i18n } from "./i18n/config"

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
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
