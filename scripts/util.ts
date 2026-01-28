import axios from "axios"
import fs from "fs/promises"

// Simple delay function to replace nova-js dependency
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Simple error message function to replace nova-js dependency
function makeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}

// ServiceStatus type definition to replace nova-js dependency
type ServiceStatus = {
  service: string
  status: {
    code: string
  }
}

/**
 * Update our .env.local file with the given env changes
 */
export async function patchLocalEnv(changes: Record<string, string>) {
  console.log(`Patching .env.local with ${JSON.stringify(changes, null, 2)}`)

  let envLocal = ""
  try {
    envLocal = await fs.readFile(".env.local", "utf-8")
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      // Doesn't exist yet, which is fine
    } else {
      throw err
    }
  }

  for (const [key, value] of Object.entries(changes)) {
    if (envLocal.includes(`${key}=`)) {
      envLocal = envLocal.replace(new RegExp(`${key}=.*`), `${key}=${value}`)
    } else {
      envLocal += `\n${key}=${value}`
    }
  }

  await fs.writeFile(".env.local", envLocal)
  Object.assign(process.env, changes)
}

/**
 * Polls getSystemStatus until all backend services are running
 * This is the instance in general, not a specific cell-- use waitForCellStartup
 * for that
 * @param instanceUrl The base URL of the Nova instance to poll
 */
export async function waitForNovaInstanceStartup(instanceUrl: string) {
  const timeout = 180000
  const startTime = Date.now()
  console.log("Waiting for NOVA instance to be ready...")

  while (true) {
    try {
      const { data: services } = (await axios.get(
        `${instanceUrl}/api/v1/system/status`,
      )) as { data: ServiceStatus[] }

      if (services.length === 0) {
        console.log(`Waiting for instance services to appear...`)
        await delay(1000)
        continue
      }

      const notRunningServices = services.filter(
        (s) => s.status.code !== "Running",
      )

      if (notRunningServices.length === 0) {
        // It's up!
        console.log(
          `All instance services running: ${services.map((s) => s.service).join(", ")}`,
        )

        break
      }

      console.log(
        `Waiting for services: ${notRunningServices.map((s) => `${s.service} ${s.status.code}`).join(", ")}`,
      )

      if (Date.now() - startTime > timeout) {
        throw new Error(
          `Timed out after ${timeout}ms waiting for all services to run at ${instanceUrl}. ${notRunningServices.length}/${services.length} services failed to start: ${notRunningServices.map((s) => s.service).join(", ")}`,
        )
      }
    } catch (err) {
      if (Date.now() - startTime > timeout) {
        throw new Error(
          `Timed out after ${timeout}ms waiting for NOVA instance to boot at ${instanceUrl}. ${makeErrorMessage(err)}`,
        )
      }
    }

    await delay(5000)
  }
}

/**
 * Polls getCellStatus until all services are running
 * @param instanceUrl The base URL of the NOVA instance to poll
 * @param cell The cell id
 */
export async function waitForCellStartup(
  instanceUrl: string,
  cell: string,
  opts: {
    timeout?: number
  } = {},
) {
  const timeout = opts.timeout ?? 180000
  const start = Date.now()

  while (true) {
    try {
      const { data: services } = (await axios.get(
        `${instanceUrl}/api/v1/cells/${cell}/status`,
      )) as { data: ServiceStatus[] }

      if (services.length === 0) {
        console.log(`Waiting for cell services to appear...`)
        await delay(1000)
        continue
      }

      const notRunningServices = services.filter(
        (s) => s.status.code !== "Running",
      )

      if (notRunningServices.length === 0) {
        // It's up!
        console.log(
          `All cell services running: ${services.map((s) => s.service).join(", ")}`,
        )
        break
      }

      if (Date.now() - start > timeout) {
        throw new Error(
          `Timed out after ${timeout}ms waiting for ${cell} services to run at ${instanceUrl}. ${notRunningServices.length}/${services.length} services failed to start: ${notRunningServices.map((s) => s.service).join(", ")}`,
        )
      } else {
        if (services.length) {
          console.log(
            `Waiting for cell services: ${notRunningServices.map((s) => `${s.service} ${s.status.code}`).join(", ")}`,
          )
        }
      }
    } catch (err) {
      if (Date.now() - start > timeout) {
        throw new Error(
          `Timed out after ${timeout}ms waiting for ${cell} services to run at ${instanceUrl}. ${makeErrorMessage(err)}`,
        )
      }
    }

    await delay(5000)
  }
}

export async function profile<T>(
  promise: Promise<T>,
): Promise<{ time: number; result: T }> {
  const start = Date.now()
  const result = await promise
  return { time: Date.now() - start, result }
}
