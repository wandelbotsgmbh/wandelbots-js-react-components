/**
 * Creates, checks and deletes a NOVA cloud instance on the portal of
 * Wandelbots for the workflow nova-instance.yml. It uses the same portal API
 * as the integration tests of service-manager (test/scripts/portal_manager.py)
 * and the CI of the NOVA Python SDK (wandelbots-nova).
 *
 * POST /v1/instances takes no lifetime, and the portal keeps an instance for
 * a day or longer. So the workflow must always run `delete`. Before it
 * creates an instance, `create` also deletes the instances of earlier runs
 * that have ended, and it waits while all instances of the license are in
 * use.
 *
 * Commands:
 *   create   – gets an access token and creates an instance
 *   wait     – waits until all services of the instance run and the cell exists
 *   snapshot – saves the state of the instance in e2e-results/nova-instance.json
 *   delete   – deletes the instance; does nothing when none was created
 *   report   – prepares e2e-results/ for the artifact of the run: replaces the
 *              access token and the host of the instance in its text files,
 *              accepts the screenshots of the Playwright tests (PNG files in
 *              e2e-results/screenshots/), refuses all other files that are
 *              not text, and writes the results of the vitest and the
 *              Playwright tests and the names of the screenshots into the
 *              summary of the job
 *
 * The repository is public, so everybody can download the artifacts of its
 * runs. GitHub hides secrets only in the log, not in artifacts: the workflow
 * uploads e2e-results/ only after `report` succeeded. Do not put files there
 * that `report` cannot check, such as traces with network requests. The only
 * exception are the screenshots: a picture cannot be checked for text, so the
 * Playwright tests check before each screenshot that the page does not show
 * the access token (e2e/playground/helpers.ts).
 *
 * Environment:
 *   PORTAL_AUTH_URL      – token endpoint of the portal login
 *   PORTAL_API_URL       – portal API, e.g. https://api.portal.wandelbots.io
 *   PORTAL_CLIENT_ID     – public client ID of the portal login
 *   PORTAL_REFRESH_TOKEN – refresh token of the CI test user (a secret)
 *   GITHUB_TOKEN         – optional: lets `create` check whether the run of an
 *                          older instance has ended
 *   GITHUB_ENV           – `create` writes NOVA_ACCESS_TOKEN, NOVA_INSTANCE_ID
 *                          and NOVA_INSTANCE_URL into it for the next steps
 *   GITHUB_STEP_SUMMARY  – `report` writes the test results into it
 */
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"

type ServiceStatus = { service: string; status: { code: string } }
type PortalInstance = { instance_id: string; sandbox_name?: string }
/** A test in the JSON report of vitest */
type TestResult = {
  fullName: string
  status: string
  duration?: number | null
  failureMessages?: string[]
}
/** A file or a `describe` in the JSON report of Playwright */
type PlaywrightSuite = {
  title: string
  specs?: {
    title: string
    tests: {
      /** expected, unexpected, flaky (passed in a later try) or skipped */
      status?: string
      results: {
        status: string
        duration: number
        errors?: { message?: string }[]
      }[]
    }[]
  }[]
  suites?: PlaywrightSuite[]
}
/** A row of a table of tests in the summary of the job */
type SummaryRow = { title: string; status: string; durationMs?: number | null }

/** The folder that the workflow uploads as the artifact e2e-results */
const RESULTS_DIR = "e2e-results"
/** The screenshots of the Playwright tests (e2e/playground/helpers.ts) */
const SCREENSHOT_DIR = "screenshots"

const CREATE_TIMEOUT_MS = 10 * 60_000
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

/**
 * Logs the licenses that the portal finds for the CI user, without the
 * license keys. The portal answers "cannot list user licenses" both when the
 * user has no license and when it cannot read the email of the token; this
 * request tells the two apart.
 */
async function logLicenses(accessToken: string) {
  try {
    const response = await fetch(`${env("PORTAL_API_URL")}/v1/me/licenses`, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    const body = await readJson(response)
    if (!response.ok || !Array.isArray(body)) {
      console.log(
        `Licenses of the CI user: HTTP ${response.status} ${body.message ?? ""}`,
      )
      return
    }
    const licenses = body.map(
      (license) =>
        `${license.product_name} ${JSON.stringify(license.feature_limitations ?? {})}`,
    )
    console.log(
      `Licenses of the CI user: ${licenses.length} (${licenses.join("; ")})`,
    )
  } catch (error) {
    console.log(`Licenses of the CI user: ${describe(error)}`)
  }
}

/**
 * Deletes the leftover instances of the CI user: the instances of workflow
 * runs that have ended, and the instances of the current run. An instance is
 * left over when the delete step of its run did not run or failed, and it
 * uses one of the instances that the license allows. Before `create` has an
 * instance, an instance of the current run is always a leftover: an earlier
 * attempt of the run created it (a re-run keeps the run ID, and GitHub
 * reports the run as in progress again), or an earlier try of `create` whose
 * answer got lost. This expects that only one job of a run creates an
 * instance. Instances that no run of this repository created stay.
 */
async function deleteLeftovers(accessToken: string) {
  const {
    GITHUB_API_URL,
    GITHUB_REPOSITORY,
    GITHUB_RUN_ID,
    GITHUB_SERVER_URL,
    GITHUB_TOKEN,
  } = process.env
  if (!GITHUB_TOKEN) {
    return
  }
  const runs = `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/`
  const portal = env("PORTAL_API_URL")
  const headers = { authorization: `Bearer ${accessToken}` }
  try {
    const list = await readJson(
      await fetch(`${portal}/v1/instances`, { headers }),
    )
    const instances: PortalInstance[] = list.instances ?? []
    for (const instance of instances) {
      if (!instance.sandbox_name?.startsWith(runs)) {
        continue
      }
      const runId = instance.sandbox_name.slice(runs.length)
      if (runId !== GITHUB_RUN_ID) {
        const run = await fetch(
          `${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY}/actions/runs/${runId}`,
          { headers: { authorization: `Bearer ${GITHUB_TOKEN}` } },
        )
        // HTTP 404: the run was deleted
        const ended =
          run.status === 404 || (await readJson(run)).status === "completed"
        if (!ended) {
          continue
        }
      }
      const response = await fetch(
        `${portal}/v1/instances/${instance.instance_id}`,
        { method: "DELETE", headers },
      )
      console.log(
        response.ok
          ? `Deleted the leftover instance ${instance.instance_id} of the run ${instance.sandbox_name}.`
          : `Could not delete the leftover instance ${instance.instance_id} of the run ${instance.sandbox_name}: HTTP ${response.status}`,
      )
    }
  } catch (error) {
    console.log(`Could not check for old instances: ${describe(error)}`)
  }
}

async function create() {
  const accessToken = await getAccessToken()
  exportVariable("NOVA_ACCESS_TOKEN", accessToken)

  const { GITHUB_SERVER_URL, GITHUB_REPOSITORY, GITHUB_RUN_ID } = process.env
  const sandboxName = GITHUB_RUN_ID
    ? `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`
    : "local"

  const deadline = Date.now() + CREATE_TIMEOUT_MS
  for (let attempt = 1; ; attempt++) {
    await deleteLeftovers(accessToken)
    let state: string
    let pause = Math.min(attempt * 5000, 30_000)
    let refused = false
    try {
      const response = await fetch(`${env("PORTAL_API_URL")}/v1/instances`, {
        method: "POST",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ sandbox_name: sandboxName }),
      })
      const body = await readJson(response)
      if (body.host) {
        mask(body.host)
      }
      if (response.ok && body.instance_id && body.host) {
        exportVariable("NOVA_INSTANCE_ID", body.instance_id)
        exportVariable("NOVA_INSTANCE_URL", `https://${body.host}`)
        console.log(`Created the instance ${body.instance_id}.`)
        return
      }
      state = `HTTP ${response.status} ${JSON.stringify(body).slice(0, 300)}`
      if (response.status === 409) {
        // Another run of the CI user creates an instance at the same moment
        pause = 10_000
      } else if (String(body.message).includes("sandbox name already in use")) {
        // The portal still has the leftover instance of this run that
        // deleteLeftovers just deleted
        pause = 10_000
      } else if (String(body.message).includes("maximum number of")) {
        // All instances of the license are in use: wait until a run deletes its instance
        pause = 60_000
      } else {
        // A client error, such as a missing license, does not go away with a retry
        refused =
          response.status >= 400 &&
          response.status < 500 &&
          response.status !== 429
      }
    } catch (error) {
      state = describe(error)
    }
    if (refused) {
      await logLicenses(accessToken)
      throw new Error(`The portal refused to create an instance: ${state}`)
    }
    if (Date.now() + pause > deadline) {
      throw new Error(`No instance after ${attempt} attempts: ${state}`)
    }
    console.log(`Attempt ${attempt}: ${state}`)
    await sleep(pause)
  }
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

/**
 * Saves the state of the instance after the tests: the NOVA version, the
 * services, the cells, and the configuration and state of each controller
 * of the cell "cell".
 */
async function snapshot() {
  if (!process.env.NOVA_INSTANCE_URL) {
    console.log("No instance was created, so there is no state to save.")
    return
  }
  const api = `${env("NOVA_INSTANCE_URL")}/api/v2`
  const headers = { authorization: `Bearer ${env("NOVA_ACCESS_TOKEN")}` }
  // Returns the answer, or the error as text, so that one failed request
  // does not lose the others
  const get = async (path: string): Promise<unknown> => {
    try {
      const response = await fetch(`${api}${path}`, {
        headers,
        signal: AbortSignal.timeout(10_000),
      })
      const text = await response.text()
      if (!response.ok) {
        return `HTTP ${response.status} ${text.slice(0, 300)}`
      }
      try {
        return JSON.parse(text)
      } catch {
        return text
      }
    } catch (error) {
      return describe(error)
    }
  }

  const names = await get("/cells/cell/controllers")
  const controllers: Record<string, unknown> = {}
  for (const name of Array.isArray(names) ? names : []) {
    controllers[name] = {
      configuration: await get(`/cells/cell/controllers/${name}`),
      state: await get(`/cells/cell/controllers/${name}/state`),
    }
  }
  const state = {
    version: await get("/system/version"),
    services: await get("/system/status"),
    cells: await get("/cells"),
    controllers: Array.isArray(names) ? controllers : names,
  }
  mkdirSync(RESULTS_DIR, { recursive: true })
  const file = join(RESULTS_DIR, "nova-instance.json")
  writeFileSync(file, `${JSON.stringify(state, null, 2)}\n`)
  console.log(`Saved the state of the instance in ${file}.`)
}

/**
 * Prepares e2e-results/ for the artifact of the run: replaces the access
 * token and the host of the instance in its text files, accepts the
 * screenshots, refuses all other files, and writes the test results into the
 * summary of the job.
 */
async function report() {
  if (!existsSync(RESULTS_DIR)) {
    console.log(`There is no folder ${RESULTS_DIR}, so there is nothing to do.`)
    return
  }
  const replacements: [string, string][] = []
  if (process.env.NOVA_ACCESS_TOKEN) {
    replacements.push([process.env.NOVA_ACCESS_TOKEN, "***"])
  }
  if (process.env.NOVA_INSTANCE_URL) {
    replacements.push([new URL(process.env.NOVA_INSTANCE_URL).host, "***"])
  }
  for (const name of readdirSync(RESULTS_DIR, { recursive: true })) {
    const file = join(RESULTS_DIR, String(name))
    if (!statSync(file).isFile()) {
      continue
    }
    // The screenshots of the Playwright tests. A picture cannot be checked
    // for text: the tests check before each screenshot that the page does
    // not show the access token (e2e/playground/helpers.ts).
    if (isScreenshot(String(name))) {
      continue
    }
    if (!/\.(json|xml|log|txt|md|html)$/.test(file)) {
      throw new Error(`${file} is not a text file, so it cannot be checked`)
    }
    const text = readFileSync(file, "utf8")
    let checked = text
    for (const [secret, replacement] of replacements) {
      checked = checked.split(secret).join(replacement)
    }
    if (checked !== text) {
      writeFileSync(file, checked)
      console.log(`Replaced the access token or the host in ${file}.`)
    }
  }
  writeSummary()
}

/** A PNG file in e2e-results/screenshots/ (a path relative to e2e-results/) */
function isScreenshot(name: string) {
  const parts = name.split(/[/\\]/)
  return (
    parts.length === 2 &&
    parts[0] === SCREENSHOT_DIR &&
    parts[1].endsWith(".png")
  )
}

/**
 * Writes the results of the tests into the summary of the job: the vitest
 * e2e tests (results.json), the Playwright tests of the playground
 * (playwright-results.json), and the names of the screenshots.
 */
function writeSummary() {
  const summaryFile = process.env.GITHUB_STEP_SUMMARY
  if (!summaryFile) {
    return
  }
  const sections = [vitestSummary(), playwrightSummary(), screenshotSummary()]
  if (sections.every((section) => section.length === 0)) {
    return
  }
  const instanceFile = join(RESULTS_DIR, "nova-instance.json")
  const version = existsSync(instanceFile)
    ? JSON.parse(readFileSync(instanceFile, "utf8")).version
    : undefined

  const lines = [
    typeof version === "string"
      ? `### e2e tests on NOVA ${version}`
      : "### e2e tests",
    "",
    ...sections.flat(),
    `The artifact ${RESULTS_DIR} holds the output of the tests (output.log, playwright-output.log), their reports (junit.xml, results.json, playwright-junit.xml, playwright-results.json), the screenshots of the playground (${SCREENSHOT_DIR}/), the page of each failed Playwright test as text (playwright/), and the state of the instance after the tests (nova-instance.json).`,
  ]
  appendFileSync(summaryFile, `${lines.join("\n")}\n`)
}

/** The vitest e2e tests: their results and errors, or nothing without a report */
function vitestSummary(): string[] {
  const resultsFile = join(RESULTS_DIR, "results.json")
  if (!existsSync(resultsFile)) {
    return []
  }
  const results = JSON.parse(readFileSync(resultsFile, "utf8"))
  const files: { message?: string; assertionResults: TestResult[] }[] =
    results.testResults ?? []
  const tests = files.flatMap((file) => file.assertionResults)
  return [
    `**vitest** (the NOVA connections, without a browser): ${results.numPassedTests} passed, ${results.numFailedTests} failed, ${results.numPendingTests} skipped`,
    "",
    ...testTable(
      tests.map((test) => ({
        title: test.fullName,
        status: test.status,
        durationMs: test.duration,
      })),
    ),
    ...errorBlocks([
      ...files.flatMap((file) => (file.message ? [file.message] : [])),
      ...tests.flatMap((test) => test.failureMessages ?? []),
    ]),
  ]
}

/**
 * The Playwright tests of the playground: their results and errors (also an
 * error of the global setup), or nothing without a report
 */
function playwrightSummary(): string[] {
  const resultsFile = join(RESULTS_DIR, "playwright-results.json")
  if (!existsSync(resultsFile)) {
    return []
  }
  const results = JSON.parse(readFileSync(resultsFile, "utf8"))
  const rows: SummaryRow[] = []
  const errors: string[] = (results.errors ?? []).map(
    (error: { message?: string }) => error.message ?? "",
  )
  // The title of a test: its file, its `describe` blocks and its own title
  const collect = (suite: PlaywrightSuite, path: string[]) => {
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests) {
        // The last try (in CI, a failed test runs once more)
        const result = test.results[test.results.length - 1]
        rows.push({
          title: [...path, spec.title].join(" › "),
          status:
            test.status === "flaky"
              ? `flaky (passed in try ${test.results.length})`
              : (result?.status ?? "not run"),
          durationMs: result?.duration,
        })
        // The errors of every try, also of a test that passed later
        for (const [index, tried] of test.results.entries()) {
          for (const error of tried.errors ?? []) {
            const prefix = test.results.length > 1 ? `try ${index + 1}: ` : ""
            errors.push(`${prefix}${error.message ?? ""}`)
          }
        }
      }
    }
    for (const child of suite.suites ?? []) {
      collect(child, [...path, child.title])
    }
  }
  for (const suite of results.suites ?? []) {
    collect(suite, [suite.title])
  }
  const stats = results.stats ?? {}
  return [
    `**Playwright** (the playground in Chromium): ${stats.expected ?? 0} passed, ${stats.flaky ?? 0} flaky, ${stats.unexpected ?? 0} failed, ${stats.skipped ?? 0} skipped`,
    "",
    ...testTable(rows),
    ...errorBlocks(errors),
  ]
}

/** The names of the screenshots, or nothing when there are none */
function screenshotSummary(): string[] {
  const folder = join(RESULTS_DIR, SCREENSHOT_DIR)
  const names = existsSync(folder)
    ? readdirSync(folder)
        .filter((name) => name.endsWith(".png"))
        .sort()
    : []
  if (names.length === 0) {
    return []
  }
  return [
    `**Screenshots** in ${SCREENSHOT_DIR}/: ${names.map((name) => `\`${name}\``).join(", ")}`,
    "",
  ]
}

/** A Markdown table of tests */
function testTable(rows: SummaryRow[]): string[] {
  const cell = (text: string) => text.replaceAll("|", "\\|")
  return [
    "| Test | Result | Duration |",
    "| --- | --- | --- |",
    ...rows.map(
      (row) =>
        `| ${cell(row.title)} | ${row.status} | ${row.durationMs == null ? "" : `${(row.durationMs / 1000).toFixed(1)} s`} |`,
    ),
    "",
  ]
}

/** The color codes of a terminal, which an error message can contain */
// biome-ignore lint/suspicious/noControlCharactersInRegex: the codes start with ESC
const COLOR_CODES = /\u001b\[[0-9;]*m/g

/** The first lines of each error, without the color codes of a terminal */
function errorBlocks(errors: string[]): string[] {
  return errors.flatMap((error) => [
    "```",
    ...error.replace(COLOR_CODES, "").split("\n").slice(0, 8),
    "```",
    "",
  ])
}

const commands: Record<string, () => Promise<void>> = {
  create,
  wait: waitUntilReady,
  snapshot,
  delete: remove,
  report,
}

const command = commands[process.argv[2] ?? ""]
if (!command) {
  console.error(
    "Usage: node scripts/nova-instance.ts create|wait|snapshot|delete|report",
  )
  process.exit(1)
}
try {
  await command()
} catch (error) {
  console.error(`Error: ${describe(error)}`)
  process.exit(1)
}
