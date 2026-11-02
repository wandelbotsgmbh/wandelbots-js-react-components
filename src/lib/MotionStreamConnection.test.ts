import { Nova } from "@wandelbots/nova-js/v2"
import { expect, test } from "vitest"
import { MotionStreamConnection } from "./MotionStreamConnection"

test("motion stream", async () => {
  const nova = new Nova({
    instanceUrl: "https://mock.example.com",
  })

  const motionStream = await MotionStreamConnection.open(nova, "0@mock-ur5e")
  expect(motionStream.joints.length).toBe(6)

  // Test changing the url (e.g. changing response_rate)
  motionStream.motionStateSocket.changeUrl(
    nova.makeWebsocketURL(
      "/cells/cell/motion-groups/0@mock-ur5e/state-stream?response_rate=100",
    ),
  )

  await motionStream.motionStateSocket.firstMessage()

  expect(motionStream.motionStateSocket.url).toBe(
    "wss://mock.example.com/api/v2/cells/cell/motion-groups/0@mock-ur5e/state-stream?response_rate=100",
  )
})

// A client of another nova-js version (here: the shape of the cell-scoped
// NovaClient of nova-js 3): the library connects with its own client
test("motion stream with a client of another nova-js version", async () => {
  const otherClient = {
    config: { instanceUrl: "https://mock.example.com", cellId: "cell" },
    accessToken: null,
  }

  const motionStream = await MotionStreamConnection.open(
    otherClient,
    "0@mock-ur5e",
  )
  expect(motionStream.joints.length).toBe(6)
  expect(motionStream.nova).toBeInstanceOf(Nova)
  expect(motionStream.nova).not.toBe(otherClient)
})
