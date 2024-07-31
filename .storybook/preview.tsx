import type { Preview } from "@storybook/react";
import { ThemeProvider } from "@mui/material"
import { wbTheme } from "../src/themes/wbTheme"

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={wbTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ["autodocs"]
};

export default preview;
