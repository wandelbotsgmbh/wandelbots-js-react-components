import { createUnplugin } from "unplugin"

import { glob } from "glob"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
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

/** Generates lines of CSF code defining stories for each robot model .glb file */
export const generateRobotStories = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const modelsDir = path.resolve(__dirname, "../public/models")
  const modelFiles = await glob(path.join(modelsDir, "*.glb"))

  const importStanza = dedent`
    import { robotStory } from "./robotStoryConfig.tsx"
  `

  const modelCsfAdditions: string[] = []

  for (const modelFile of modelFiles) {
    const modelName = modelFile.split("/").pop()!.split(".")[0]!
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
      const src = await fs.readFile(fileName, "utf-8")
      return src + "\n" + (await generateRobotStories())
    },
  }
})

export const robotStoryGenerationVitePlugin = unplugin.vite
