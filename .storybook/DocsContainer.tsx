import {
  DocsContainer as BaseContainer,
  DocsContainerProps,
} from "@storybook/blocks"
import { addons } from "@storybook/preview-api"
import { themes } from "@storybook/theming"
import React, { FC, PropsWithChildren, useEffect, useState } from "react"
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode"

const channel = addons.getChannel()

export const DocsContainer: FC<PropsWithChildren<DocsContainerProps>> = ({
  children,
  context,
}) => {
  const [isDark, setDark] = useState(false)

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setDark)
    return () => channel.off(DARK_MODE_EVENT_NAME, setDark)
  }, [channel])

  return (
    <BaseContainer
      theme={isDark ? themes.dark : themes.light}
      context={context}
    >
      {children}
    </BaseContainer>
  )
}
