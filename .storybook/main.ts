import { loadCsf } from "@storybook/csf-tools"
import type { StorybookConfig } from "@storybook/react-vite"
import { glob } from "fs/promises"
import path from "path"
import type { Indexer } from "storybook/internal/types"
import { dedent } from "ts-dedent"

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
  addons: [
    "@storybook/addon-essentials",
    "storybook-preset-inline-svg",
    "storybook-dark-mode",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
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

  // Generate a robot model story for each .glb file in the public/models directory
  // Adapted from https://stackblitz.com/edit/github-h2rgfk-2j2bg3?file=.storybook%2Fregression%2Findexer.ts
  experimental_indexers: async (existingIndexers) => {
    const customIndexer: Indexer = {
      test: /SupportedModels.stories.tsx$/,
      createIndex: async (fileName, opts) => {
        console.log(fileName)
        const modelsDir = path.resolve(__dirname, "../public/models")
        const modelFiles = glob(path.join(modelsDir, "*.glb"))

        let csfContent = dedent`
          import { sharedStoryConfig, robotStory } from "./robotStoryConfig"

          export default {
            ...sharedStoryConfig,
            tags: ["!autodocs"],
            title: "3D View/Robot/Supported Models",
          }
        `

        for await (const modelFile of modelFiles) {
          console.log(modelFile)
          const modelName = modelFile.split("/").pop()!.split(".")[0]!

          csfContent += "\n\n"
          csfContent += dedent`
            export const ${modelName} = robotStory("${modelName}")
            ${modelName}.storyName = "${modelName}"
          `
        }

        console.log(csfContent)

        const result = loadCsf(csfContent, { ...opts, fileName }).parse()
          .indexInputs
        console.log(result)
        return result
      },
    }

    return [customIndexer, ...(existingIndexers || [])]
  },
}

export default config
