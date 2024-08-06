import type { Preview } from "@storybook/react";
import { ThemeProvider } from "@mui/material"
import { createNovaMUITheme, novaDarkTheme } from "../src/themes/novaTheme"
import { themes } from '@storybook/theming';
import { DocsContainer, type DocsContainerProps } from '@storybook/blocks'
import React, { type FC } from 'react'

const container: FC<DocsContainerProps> = (props: DocsContainerProps) => {
  const { globals } = (props.context as any).store.globals;
  console.log(globals);

  return (
    <DocsContainer
      {...props}
      context={props.context}
      theme={
        // Complains about missing properties, but it works
        (globals.theme === "Dark" ? themes.dark : themes.light) as any
      }
    />
  );
}

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: { stylePreview: true },
    docs: { container },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createNovaMUITheme(novaDarkTheme)}>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ["autodocs"]
};

export default preview;
