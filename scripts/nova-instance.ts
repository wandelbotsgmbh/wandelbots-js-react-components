/**
 * Creates, checks and deletes a NOVA cloud instance on the dev portal for the
 * workflow nova-instance.yml. It uses the same portal API as the integration
 * tests of service-manager (test/scripts/portal_manager.py).
 *
 * Commands:
 *   create – gets an access token and creates an instance
 *   wait   – waits until all services of the instance run and the cell exists
 *   delete – deletes the instance; does nothing when none was created
 *
 * Environment:
 *   PORTAL_AUTH_URL           – token endpoint of the portal login
 *   PORTAL_API_URL            – portal API, e.g. https://api.portal.dev.wandelbots.io
 *   PORTAL_CLIENT_ID          – public client ID of the portal login
 *   PORTAL_REFRESH_TOKEN      – refresh token of the CI test user (a secret)
 *   NOVA_INSTANCE_TTL_MINUTES – the portal deletes the instance after this time
 *                               (default 60), also when the job cannot do it
 *   GITHUB_ENV                – `create` writes NOVA_ACCESS_TOKEN,
 *                               NOVA_INSTANCE_ID and NOVA_INSTANCE_URL into it
 *                               for the next steps
 */
import { appendFileSync } from "node:fs"

type ServiceStatus = { service: string; status: { code: string } }

const READY_TIMEOUT_MS = 20 * 60_000
const POLL_INTERVAL_MS = 15_000

function env(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is not set`)
  }
  return value
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function describe(error: unknown): string {
  if (error instanceof Error) {
    const cause = error.cause as { code?: string; message?: string } | undefined
    return cause
      ? `${error.message} (${cause.code ?? cause.message})`
      : error.message
  }
  return String(error)
}

/** Hides a value in the log of the GitHub Actions job. */
function mask(value: string) {
  console.log(`::add-mask::${value}`)
}

/** Passes a value to the next steps of the job. */
function exportVariable(name: string, value: string) {
  process.env[name] = value
  const file = process.env.GITHUB_ENV
  if (file) {
    appendFileSync(file, `${name}=${value}\n`)
  }
}

async function readJson(response: Response) {
  try {
    return await response.json()
  } catch {
    return {}
  }
}

async function getAccessToken(): Promise<string> {
  const response = await fetch(env("PORTAL_AUTH_URL"), {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: env("PORTAL_CLIENT_ID"),
      refresh_token: env("PORTAL_REFRESH_TOKEN"),
    }),
  })
  const body = await readJson(response)
  if (!response.ok || !body.access_token) {
    throw new Error(
      `The token request failed: HTTP ${response.status} ${body.error ?? ""} ${body.error_description ?? ""}`,
    )
  }
  mask(body.access_token)
  return body.access_token
}

async function create() {
  const accessToken = await getAccessToken()
  exportVariable("NOVA_ACCESS_TOKEN", accessToken)

  const { GITHUB_SERVER_URL, GITHUB_REPOSITORY, GITHUB_RUN_ID } = process.env
  const sandboxName = GITHUB_RUN_ID
    ? `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`
    : "local"
  const ttlMinutes = Number(process.env.NOVA_INSTANCE_TTL_MINUTES ?? 60)

  const attempts = 5
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(`${env("PORTAL_API_URL")}/v1/instances`, {
        method: "POST",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sandbox_name: sandboxName,
          ttl_minutes: ttlMinutes,
        }),
      })
      const body = await readJson(response)
      if (body.host) {
        mask(body.host)
      }
      if (response.ok && body.instance_id && body.host) {
        exportVariable("NOVA_INSTANCE_ID", body.instance_id)
        exportVariable("NOVA_INSTANCE_URL", `https://${body.host}`)
        console.log(
          `Created the instance ${body.instance_id}. The portal deletes it after ${ttlMinutes} min.`,
        )
        return
      }
      console.log(
        `Attempt ${attempt}/${attempts}: HTTP ${response.status} ${JSON.stringify(body).slice(0, 300)}`,
      )
    } catch (error) {
      console.log(`Attempt ${attempt}/${attempts}: ${describe(error)}`)
    }
    if (attempt < attempts) {
      await sleep(attempt * 5000)
    }
  }
  throw new Error(`No instance after ${attempts} attempts`)
}

/** Calls `check` until it returns true; otherwise it returns the state for the log. */
async function poll(
  name: string,
  deadline: number,
  check: () => Promise<true | string>,
) {
  const start = Date.now()
  for (;;) {
    let state: true | string
    try {
      state = await check()
    } catch (error) {
      state = describe(error)
    }
    const seconds = Math.round((Date.now() - start) / 1000)
    if (state === true) {
      console.log(`${name}: ready after ${seconds} s`)
      return
    }
    if (Date.now() > deadline) {
      throw new Error(`${name}: not ready after ${seconds} s (${state})`)
    }
    console.log(`${name}: waiting (${seconds} s): ${state}`)
    await sleep(POLL_INTERVAL_MS)
  }
}

async function waitUntilReady() {
  const api = `${env("NOVA_INSTANCE_URL")}/api/v2`
  const headers = { authorization: `Bearer ${env("NOVA_ACCESS_TOKEN")}` }
  const get = (path: string) =>
    fetch(`${api}${path}`, { headers, signal: AbortSignal.timeout(10_000) })
  const deadline = Date.now() + READY_TIMEOUT_MS

  // All services report "Running", as in wait_for_instance_readiness of service-manager
  await poll("Services", deadline, async () => {
    const response = await get("/system/status")
    if (!response.ok) {
      return `HTTP ${response.status}`
    }
    const services: ServiceStatus[] = await response.json()
    const waiting = services.filter((s) => s.status.code !== "Running")
    if (services.length > 0 && waiting.length === 0) {
      return true
    }
    return services.length === 0
      ? "no services yet"
      : waiting.map((s) => `${s.service}: ${s.status.code}`).join(", ")
  })

  // The default cell "cell"
  let cells: string[] = []
  await poll("Cell", deadline, async () => {
    const response = await get("/cells")
    if (!response.ok) {
      return `HTTP ${response.status}`
    }
    cells = await response.json()
    return cells.includes("cell") || `cells: ${cells.join(", ") || "none"}`
  })

  const version = await (await get("/system/version")).text()
  console.log(`NOVA ${version}, cells: ${cells.join(", ")}`)
}

async function remove() {
  const instanceId = process.env.NOVA_INSTANCE_ID
  if (!instanceId) {
    console.log("No instance was created, so there is nothing to delete.")
    return
  }
  const accessToken = process.env.NOVA_ACCESS_TOKEN || (await getAccessToken())
  const response = await fetch(
    `${env("PORTAL_API_URL")}/v1/instances/${instanceId}`,
    { method: "DELETE", headers: { authorization: `Bearer ${accessToken}` } },
  )
  if (!response.ok) {
    throw new Error(
      `Deleting the instance ${instanceId} failed: HTTP ${response.status} ${(await response.text()).slice(0, 300)}`,
    )
  }
  console.log(`Deleted the instance ${instanceId}.`)
}

const commands: Record<string, () => Promise<void>> = {
  create,
  wait: waitUntilReady,
  delete: remove,
}

const command = commands[process.argv[2] ?? ""]
if (!command) {
  console.error("Usage: node scripts/nova-instance.ts create|wait|delete")
  process.exit(1)
}
try {
  await command()
} catch (error) {
  console.error(`Error: ${describe(error)}`)
  process.exit(1)
}
