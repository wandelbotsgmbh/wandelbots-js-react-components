import { Nova } from "@wandelbots/nova-js/v2"

/**
 * How the library connects to a NOVA instance: the base URL of the
 * instance, or a NOVA client of the app (`Nova` of `@wandelbots/nova-js`,
 * also of another version than the library's).
 *
 * The library reads only the URL and the access token of the app's client,
 * and connects with its own client of its own nova-js version. So a newer
 * or older nova-js in the app does not change the library.
 */
export type NovaConnection =
  | string
  | {
      readonly config: {
        readonly instanceUrl: string
        readonly accessToken?: string
        /** The cell of the cell-scoped `NovaClient` of older nova-js versions */
        readonly cellId?: string
      }
      readonly accessToken?: string | null
    }

/** The library's own NOVA client for a connection */
export function createNovaClient(connection: NovaConnection): Nova {
  if (connection instanceof Nova) {
    // A client of the library's own nova-js copy: use it as it is
    return connection
  }

  if (typeof connection === "string") {
    return new Nova({ instanceUrl: connection })
  }

  return new Nova({
    instanceUrl: connection.config.instanceUrl,
    accessToken:
      connection.accessToken ?? connection.config.accessToken ?? undefined,
  })
}

/** The cell of a cell-scoped client of an older nova-js version, if any */
export function cellIdOf(connection: NovaConnection): string | undefined {
  return typeof connection === "string" ? undefined : connection.config.cellId
}
