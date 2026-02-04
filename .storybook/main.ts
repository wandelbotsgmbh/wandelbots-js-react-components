import type { StorybookConfig } from "@storybook/react-vite"
import { config as dotenvConfig } from "dotenv"
import { readFileSync } from "node:fs"
import { loadCsf } from "storybook/internal/csf-tools"
import type { Indexer } from "storybook/internal/types"
import {
  generateRobotStories,
  robotStoryGenerationVitePlugin,
} from "./robotStoryGeneration.ts"

// Load environment variables from .env.local
dotenvConfig({ path: '.env.local' })

const config: StorybookConfig = {
  stories: [
    "../stories/GettingStarted.mdx",
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ...(process.env.NODE_ENV !== "production"
      ? [
          "../stories-dev/**/*.mdx",
          "../stories-dev/**/*.stories.@(js|jsx|mjs|ts|tsx)",
        ]
      : []),
  ],
  addons: ["storybook-preset-inline-svg", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // TS config from mui integration guide https://storybook.js.org/recipes/@mui/material
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // Speeds up Storybook build time
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },

      // Makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,

      // Makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,

      // Filters out extraneous inherited MUI and threejs props
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  viteFinal: (config: any) => {
    const { plugins = [] } = config
    plugins.push(robotStoryGenerationVitePlugin())
    config.plugins = plugins
    
    // Make environment variables available in the browser
    config.define = {
      ...config.define,
      'import.meta.env.WANDELAPI_BASE_URL': JSON.stringify(process.env.WANDELAPI_BASE_URL || ''),
      'import.meta.env.CELL_ID': JSON.stringify(process.env.CELL_ID || 'cell'),
    }
    console.log("Final Vite config for Storybook:", config)
    
    return config
  },

  // Generate a robot model story for each .glb file in the public/models directory
  // Adapted from https://github.com/storybookjs/storybook/issues/25554
  experimental_indexers: async (existingIndexers) => {
    const customIndexer: Indexer = {
      test: /SupportedModels.stories.tsx$/,
      createIndex: async (fileName, opts) => {
        const baseCsf = readFileSync(fileName, "utf-8")
        const generatedCsf = baseCsf + "\n\n" + (await generateRobotStories())

        return loadCsf(generatedCsf, {
          ...opts,
          fileName,
        }).parse().indexInputs
      },
    }

    return [customIndexer, ...(existingIndexers || [])]
  },
}

export default config
