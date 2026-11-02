import { Nova } from "@wandelbots/nova-js/v2"
import { describe, expect, test } from "vitest"
import { cellIdOf, createNovaClient } from "./novaConnection"

const instanceUrl = "https://mock.example.com"

describe("createNovaClient", () => {
  test("creates a client for the url of an instance", () => {
    const nova = createNovaClient(instanceUrl)
    expect(nova).toBeInstanceOf(Nova)
    expect(nova.config.instanceUrl).toBe(instanceUrl)
  })

  test("uses a client of the library's own nova-js as it is", () => {
    const appClient = new Nova({ instanceUrl })
    expect(createNovaClient(appClient)).toBe(appClient)
  })

  test("reads only the url and the current token of another client", () => {
    // A client of another nova-js version: an object of another class
    const otherClient = {
      config: { instanceUrl, accessToken: "first-token" },
      accessToken: "renewed-token",
      api: {},
    }
    const nova = createNovaClient(otherClient)
    expect(nova).toBeInstanceOf(Nova)
    expect(nova).not.toBe(otherClient)
    expect(nova.config.instanceUrl).toBe(instanceUrl)
    expect(nova.accessToken).toBe("renewed-token")
  })

  test("takes the token of the config when the client has no other", () => {
    const nova = createNovaClient({
      config: { instanceUrl, accessToken: "config-token" },
    })
    expect(nova.accessToken).toBe("config-token")
  })
})

describe("cellIdOf", () => {
  test("returns the cell of a cell-scoped client", () => {
    expect(cellIdOf({ config: { instanceUrl, cellId: "my-cell" } })).toBe(
      "my-cell",
    )
  })

  test("returns nothing for a url or an instance-level client", () => {
    expect(cellIdOf(instanceUrl)).toBeUndefined()
    expect(cellIdOf(new Nova({ instanceUrl }))).toBeUndefined()
  })
})
