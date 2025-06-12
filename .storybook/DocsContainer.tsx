import type { DocsContainerProps } from "@storybook/addon-docs/blocks"
import { DocsContainer as BaseContainer } from "@storybook/addon-docs/blocks"
import type { FC, PropsWithChildren } from "react"
import { themes } from "storybook/theming"

export const DocsContainer: FC<PropsWithChildren<DocsContainerProps>> = ({
  children,
  context,
}) => {
  // Get theme from Storybook globals - using a safer access pattern
  let theme = "light"
  try {
    theme =
      (context as any)?.store?.globals?.globals?.theme ||
      (context as any)?.globals?.theme ||
      "light"
  } catch (e) {
    // Fallback to light theme if access fails
    theme = "light"
  }

  const isDark = theme === "dark"

  return (
    <BaseContainer
      theme={isDark ? themes.dark : themes.light}
      context={context}
    >
      {children}
    </BaseContainer>
  )
}
