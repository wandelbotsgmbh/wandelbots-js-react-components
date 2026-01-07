import { makeErrorMessage } from "./errorHandling"
import { config } from "dotenv"
import axios, { isAxiosError } from "axios"
import fs from "fs/promises"
import { omit } from "lodash-es"
import { username } from "username"
import { patchLocalEnv, waitForNovaInstanceStartup } from "./util"
config()

/**
 * Set up a k8s.wabo.run instance and add our testing cell with virtual robots
 * Used for both development and e2e testing
 */
async function testDeploy(
  opts: {
    instanceLifetimeMins?: number
    existingInstanceIp?: string
    cell?: string
    additionalCellConfig?: Record<string, any>
    https?: boolean
  } = {},
) {
  const startTime = Date.now()

  // Reserve or extend instance
  const existingInstanceIp = opts.existingInstanceIp
  const instanceLifetimeMins = opts.instanceLifetimeMins ?? 10
  const cell = opts.cell ?? "cell"
  let extendedInstance = false
  let instanceUrl = ""

  // Extend an existing instance if possible
  // causes fewer headaches for the infrastructure people :)
  if (existingInstanceIp) {
    console.log(`Found existing instance at ${existingInstanceIp}`)

    try {
      await axios.put(
        `https://k8s.wabo.run/instance?instance_ip=${existingInstanceIp}&duration=720`,
      )

      console.log(`Extended existing instance for ${instanceLifetimeMins} mins`)
      instanceUrl = `http://${existingInstanceIp}`
      extendedInstance = true
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 404) {
        console.log(`Previous instance expired`)
      } else {
        throw err
      }
    }
  }

  // If extending one wasn't possible, ask for a new instance
  if (!extendedInstance) {
    console.log("Reserving new k8s.wabo.run instance")

    const instanceComment = `robot-pad:${process.env.GITLAB_CI ? `ci:${process.env.CI_COMMIT_REF_NAME}` : `dev:${await username()}`}`

    const { data: instance } = await axios.get(
      `https://k8s.wabo.run/instance`,
      {
        params: {
          duration: instanceLifetimeMins,
          install_service_manager: true,
          comment: instanceComment,
        },
      },
    )

    console.log(`Instance reserved for ${instanceLifetimeMins} mins:`, {
      ...omit(instance, "kubeconfig"),
      comment: instanceComment,
    })

    instanceUrl = opts.https
      ? `https://${instance.ip}`
      : `http://${instance.ip}`

    const kubeconfig = Buffer.from(instance.kubeconfig, "base64").toString(
      "utf-8",
    )
    await fs.writeFile("kubeconfig.yml", kubeconfig)

    await patchLocalEnv({
      WANDELAPI_BASE_URL: instanceUrl,
      INSTANCE_ID: instance.id,
      CELL_ID: cell,
    })
  }

  // Wait for the API to come up
  await waitForNovaInstanceStartup(instanceUrl)

  // Delete existing cell if it exists
  // if (extendedInstance) {
  //   const { data: cells } = (await axios.get(
  //     `${instanceUrl}/api/v1/cells`,
  //   )) as {
  //     data: string[]
  //   }
  //   if (cells.includes(cell)) {
  //     console.log(`Deleting existing cell '${cell}'`)
  //     const res = await axios.delete(
  //       `${instanceUrl}/api/v1/cells/${cell}?completionTimeout=180`,
  //     )
  //     if (res.status !== 200) {
  //       // It's a 202, so won't be thrown automatically
  //       throw new Error(
  //         `Failed to delete existing cell within 180 seconds: ${res.status}`,
  //       )
  //     }
  //   }
  // }

  console.log(`test deployment completed in ${Date.now() - startTime}ms`)
}

async function main() {
  try {
    await testDeploy({
      instanceLifetimeMins: process.env.INSTANCE_LIFETIME_MINS
        ? parseInt(process.env.INSTANCE_LIFETIME_MINS, 10)
        : process.env.GITLAB_CI
          ? 30
          : 720,
      existingInstanceIp: process.env.GITLAB_CI
        ? undefined
        : process.env.API_GATEWAY_BASE,
    });
  } catch (err) {
    console.error(makeErrorMessage(err));
    process.exit(1);
  }
}

main()
