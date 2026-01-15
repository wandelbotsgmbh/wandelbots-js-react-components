import { createUnplugin } from "unplugin"

import { NovaClient } from "@wandelbots/nova-js/v2"
import { dedent } from "ts-dedent"

export const ROBOT_STORIES_REGEX = /SupportedModels.stories.tsx$/

// FIXME - this is for backwards compatibility, don't add new stuff here
// remove once all models are compatible and don't throw errors in the test
const HIDDEN_ROBOTS = [
  "KUKA_KR16_R1610_2",
  "KUKA_KR210_R2700",
  "FANUC_M20iD35",
  "YASKAWA_TURN2",
  "KUKA_DKP500_2",
]

/** Generates lines of CSF code defining stories for each robot model from Nova API */
export const generateRobotStories = async () => {
  const importStanza = dedent`
    import { robotStory } from "./robotStoryConfig.tsx"
  `

  let modelNames: string[] = []
  
  try {
    // Use Nova API to get available motion group models
    const baseUrl = process.env.WANDELAPI_BASE_URL
    const cellId = process.env.CELL_ID || "cell"
    
    if (baseUrl) {
      const nova = new NovaClient({ instanceUrl: baseUrl })
      modelNames = await nova.api.motionGroupModels.getMotionGroupModels()
    } else {
      console.warn("WANDELAPI_BASE_URL not configured, no robot models will be available")
    }
  } catch (error) {
    console.warn("Failed to fetch motion group models from Nova API:", error)
    // Fallback to empty array - no robot stories will be generated
    modelNames = []
  }

  const modelCsfAdditions: string[] = []

  for (const modelName of modelNames) {
    if (HIDDEN_ROBOTS.includes(modelName)) continue

    // Standardize filename to valid JS variable name
    const varName = modelName.replaceAll(/[^A-Za-z0-9_]/g, "_")

    modelCsfAdditions.push(dedent`
      export const ${varName} = robotStory("${modelName}")
      ${varName}.storyName = "${modelName}"
    `)
  }
  return importStanza + "\n\n" + modelCsfAdditions.join("\n\n")
}

export const unplugin = createUnplugin((options) => {
  return {
    name: "unplugin-robot-stories",
    enforce: "pre",
    loadInclude(id) {
      return ROBOT_STORIES_REGEX.test(id)
    },
    async load(fileName) {
      const fs = await import("node:fs/promises")
      const src = await fs.readFile(fileName, "utf-8")
      return src + "\n" + (await generateRobotStories())
    },
  }
})

export const robotStoryGenerationVitePlugin = unplugin.vite
