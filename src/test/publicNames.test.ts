import { existsSync, readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import {
  collectPublicNames,
  missingReasons,
  renderTable,
  reportsDir,
  staleReasons,
  tablePath,
} from "../../scripts/publicNames"

// Every public name has a reason to be public (scripts/publicNames.ts). Run
// `pnpm run api:update` and `pnpm run api:names` after a change of the API.
describe("the public names", () => {
  const names = collectPublicNames(reportsDir)

  it("each has a reason", () => {
    expect(missingReasons(names)).toEqual([])
  })

  it("leave no reason for a name that is not public any more", () => {
    expect(staleReasons(names)).toEqual([])
  })

  it("are listed in etc/public-names.md", () => {
    expect(existsSync(tablePath)).toBe(true)
    expect(readFileSync(tablePath, "utf8")).toBe(renderTable(names))
  })
})
