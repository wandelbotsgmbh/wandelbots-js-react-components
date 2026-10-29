/**
 * Stops the e2e tests at once when no NOVA instance is set. Skipped tests
 * would look like a success, also in CI.
 */
export default function setup() {
  if (!process.env.NOVA_INSTANCE_URL) {
    throw new Error(
      "The e2e tests need a NOVA instance. Set NOVA_INSTANCE_URL, and NOVA_ACCESS_TOKEN for a cloud instance. In pull requests, the workflow e2e creates one.",
    )
  }
}
