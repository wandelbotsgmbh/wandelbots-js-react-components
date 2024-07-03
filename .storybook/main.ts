import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  staticDirs: [
    '../public',
    // Configuration files for the wandelscript editor
    {from: '../src/components/WandelscriptEditor/language_configuration', to: 'language_configuration/'},
    // Web worker scripts for the monaco editor
    {from: '../node_modules/monaco-editor-workers/dist/workers', to: 'workers/'}
  ],
  docs: {
    autodocs: "tag",
  },
  webpackFinal: (config, _) => {
    // Rescources of the monaco editor
    if (config.module?.rules) {
      config.module.rules.push({
        test: /\.(mp3|wasm|ttf)$/i,
        type: 'asset/resource'
      })
    }

    return config;
  }
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
