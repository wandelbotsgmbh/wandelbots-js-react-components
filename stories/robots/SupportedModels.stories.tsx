import { sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!autodocs"],
  title: "3D View/Robot/Supported Models",
}

// This file is autopopulated at storybook build time by the
// indexer and builder defined in .storybook/main.ts
// It gets a story for every .glb file in the public/models directory