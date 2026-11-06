/// <reference types="vite/client" />

// Set by playground/vite.config.ts
interface ImportMetaEnv {
  /** The base URL of the NOVA instance, or "" when none is set */
  readonly NOVA_INSTANCE_URL: string
  /** The access token for a cloud instance, or "" */
  readonly NOVA_ACCESS_TOKEN: string
  readonly NOVA_CELL_ID: string
}
