import { Nova } from "@wandelbots/nova-js/v2"
import { defaultGetModel } from "@wandelbots/wandelbots-js-react-components"

/** The NOVA instance that the playground connects to */
export type PlaygroundInstance = {
  /** The base URL, for example http://172.31.12.205 */
  url: string
  cellId: string
  /**
   * The NOVA client of the playground. The library parts take it as `nova`
   * and read its URL and access token.
   */
  nova: Nova
  /** Downloads a motion group model (defaultGetModel with the client) */
  getModel: (modelFromController: string) => Promise<string>
}

/**
 * The NOVA instance from playground/vite.config.ts, or undefined when none is
 * set. The playground never shows the access token.
 */
export function playgroundInstance(): PlaygroundInstance | undefined {
  const url = import.meta.env.NOVA_INSTANCE_URL
  if (!url) return undefined

  const nova = new Nova({
    instanceUrl: url,
    accessToken: import.meta.env.NOVA_ACCESS_TOKEN || undefined,
  })
  return {
    url,
    cellId: import.meta.env.NOVA_CELL_ID,
    nova,
    getModel: (modelFromController) =>
      defaultGetModel(modelFromController, nova),
  }
}
