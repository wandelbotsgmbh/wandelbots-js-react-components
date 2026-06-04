import type { Nova, NovaClient } from "@wandelbots/nova-js/v2"

/**
 * A Nova-like client. We accept either the current instance-level `Nova`
 * client or, for backwards compatibility, the deprecated cell-scoped
 * `NovaClient`.
 */
export type AnyNovaClient = Nova | NovaClient

/**
 * The deprecated `NovaClient` is scoped to a single cell: its API methods do
 * not take a leading `cellId` argument and its websocket paths are relative
 * to the cell (e.g. `/controllers/...`). The current `Nova` client is
 * instance-level: API methods take a leading `cellId` and websocket paths are
 * prefixed with `/cells/{cellId}`.
 *
 * `NovaCellAPIClient` (used by the deprecated `NovaClient`) exposes a `cellId`
 * property, whereas the instance-level `NovaAPIClient` does not. We use this
 * to tell the two apart.
 */
function isDeprecatedNovaClient(nova: AnyNovaClient): nova is NovaClient {
  return "cellId" in nova.api
}

/**
 * For backwards compatibility we still accept the deprecated cell-scoped
 * `NovaClient`. This normalizes it to present the same interface as the
 * current instance-level `Nova` client, so the rest of the code can be
 * written against the newer API.
 *
 * Instance-level `Nova` clients are returned unchanged.
 */
export function asNovaInstance(nova: AnyNovaClient): Nova {
  if (!isDeprecatedNovaClient(nova)) {
    return nova
  }

  const client = nova

  // Wrap the cell-scoped API so that callers can pass a leading `cellId`
  // argument (as the instance-level API expects). The cell-scoped client
  // already knows its cell, so we simply drop that argument before
  // forwarding the call.
  const api = new Proxy(client.api, {
    get(target, group) {
      const groupApi = Reflect.get(target, group)
      if (!groupApi || typeof groupApi !== "object") {
        return groupApi
      }

      return new Proxy(groupApi, {
        get(groupTarget, method) {
          const fn = Reflect.get(groupTarget, method)
          if (typeof fn !== "function") {
            return fn
          }
          return (_cellId: string, ...args: unknown[]) =>
            fn.apply(groupTarget, args)
        },
      })
    },
  })

  return new Proxy(client, {
    get(target, prop) {
      if (prop === "api") {
        return api
      }
      if (prop === "openReconnectingWebsocket") {
        // Strip the `/cells/{cellId}` prefix the newer API uses; the
        // cell-scoped client expects cell-relative paths.
        return (path: string) =>
          target.openReconnectingWebsocket(path.replace(/^\/cells\/[^/]+/, ""))
      }
      return Reflect.get(target, prop)
    },
  }) as unknown as Nova
}
