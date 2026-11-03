import { isPageId, type PageId } from "./pages"

/**
 * What the URL selects, for example `?page=jogging&motionGroup=0@ur5e`. So an
 * e2e test can open each page with its own virtual robot.
 */
export type PlaygroundLocation = {
  page: PageId
  /** Without it, the playground selects the first motion group of the cell */
  motionGroup?: string
}

export function readLocation(): PlaygroundLocation {
  const params = new URLSearchParams(window.location.search)
  const page = params.get("page")
  return {
    page: isPageId(page) ? page : "jogging",
    motionGroup: params.get("motionGroup") || undefined,
  }
}

/** Writes the selection into the URL, without a new entry in the history */
export function writeLocation({ page, motionGroup }: PlaygroundLocation) {
  const params = new URLSearchParams(window.location.search)
  params.set("page", page)
  if (motionGroup) {
    params.set("motionGroup", motionGroup)
  } else {
    params.delete("motionGroup")
  }
  // "@" is allowed in a query and easier to read than "%40"
  const query = params.toString().replace(/%40/g, "@")
  window.history.replaceState(null, "", `?${query}`)
}
