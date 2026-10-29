import { existsSync, readFileSync } from "node:fs"
import { parse } from "dotenv"

/**
 * The NOVA instance of the e2e tests: NOVA_INSTANCE_URL and
 * NOVA_ACCESS_TOKEN, which the workflow e2e sets. Without NOVA_INSTANCE_URL,
 * it uses WANDELAPI_BASE_URL from .env.local, which `pnpm td` writes for a
 * test instance (Storybook uses it too). A test instance needs no token.
 */
export function novaInstance(): {
  url?: string
  accessToken?: string
  source: string
} {
  const { NOVA_INSTANCE_URL, NOVA_ACCESS_TOKEN } = process.env
  if (NOVA_INSTANCE_URL) {
    return {
      url: NOVA_INSTANCE_URL,
      accessToken: NOVA_ACCESS_TOKEN,
      source: "NOVA_INSTANCE_URL",
    }
  }
  const local = existsSync(".env.local")
    ? parse(readFileSync(".env.local"))
    : {}
  return {
    url: local.WANDELAPI_BASE_URL || undefined,
    accessToken: NOVA_ACCESS_TOKEN,
    source: "WANDELAPI_BASE_URL in .env.local",
  }
}
