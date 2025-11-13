import { NovaClient } from "@wandelbots/nova-js/v2"
import { expect, test } from "vitest"
import { MotionStreamConnection } from "./MotionStreamConnection"

test("motion stream", async () => {
  const nova = new NovaClient({
    instanceUrl: "https://mock.example.com",
  })

  const motionStream = await MotionStreamConnection.open(nova, "0@mock-ur5e")
  expect(motionStream.joints.length).toBe(6)

  // Test changing the url
  motionStream.motionStateSocket.changeUrl(
    nova.makeWebsocketURL("/motion-groups/0@mock-ur5e/state-stream?tcp=foo"),
  )

  await motionStream.motionStateSocket.firstMessage()

  expect(motionStream.motionStateSocket.url).toBe(
    "wss://mock.example.com/api/v2/cells/cell/motion-groups/0@mock-ur5e/state-stream?tcp=foo",
  )
})
