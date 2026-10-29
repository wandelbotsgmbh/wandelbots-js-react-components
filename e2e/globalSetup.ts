import { novaInstance } from "./novaInstance"

/**
 * Stops the e2e tests at once when no NOVA instance is set. Skipped tests
 * would look like a success, also in CI.
 */
export default function setup() {
  const instance = novaInstance()
  if (!instance.url) {
    throw new Error(
      "The e2e tests need a NOVA instance. Set NOVA_INSTANCE_URL (and NOVA_ACCESS_TOKEN for a cloud instance), or run `pnpm td`, which reserves a test instance and writes WANDELAPI_BASE_URL into .env.local. In pull requests, the workflow e2e creates an instance.",
    )
  }
  console.log(`e2e tests against ${instance.url} (${instance.source})`)
}
