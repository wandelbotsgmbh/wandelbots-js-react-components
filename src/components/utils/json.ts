// On their own, without the three.js helpers of converters.ts: the NOVA
// connections and the parts without 3D use them, and must not load three.js

/** Try to parse something as JSON; undefined if it is not JSON */
export function tryParseJson(json: unknown): unknown {
  try {
    return JSON.parse(json as string)
  } catch {
    return undefined
  }
}

/** Try to turn something into JSON; undefined if that fails */
export function tryStringifyJson(json: unknown): string | undefined {
  try {
    return JSON.stringify(json)
  } catch {
    return undefined
  }
}
