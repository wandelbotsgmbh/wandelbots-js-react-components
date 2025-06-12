import type { DocsContainerProps } from "@storybook/addon-docs/blocks"
import { DocsContainer as BaseContainer } from "@storybook/addon-docs/blocks"
import type { FC, PropsWithChildren } from "react"
import { themes } from "storybook/theming"

export const DocsContainer: FC<PropsWithChildren<DocsContainerProps>> = ({
  children,
  context,
}) => {
  // Force dark theme for documentation
  return (
    <BaseContainer theme={themes.dark} context={context}>
      {children}
    </BaseContainer>
  )
}
