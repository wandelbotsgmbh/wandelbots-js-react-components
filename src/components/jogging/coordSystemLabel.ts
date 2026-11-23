import type { CoordinateSystem } from "@wandelbots/nova-js/v2"
import type { JoggingStore } from "./JoggingStore"

/**
 * A coordinate system's name in a select, with its id when another one has
 * the same name
 */
export function coordSystemLabel(
  store: Pick<JoggingStore, "coordSystemCountByName">,
  cs: CoordinateSystem,
) {
  return cs.name && (store.coordSystemCountByName[cs.name] ?? 0) > 1
    ? `${cs.name} / ${cs.coordinate_system}`
    : cs.name || cs.coordinate_system
}
