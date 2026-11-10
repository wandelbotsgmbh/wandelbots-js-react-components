import { Nova } from "@wandelbots/nova-js/v2"
import { expect, test, vi } from "vitest"
import { ConnectedMotionGroup } from "./ConnectedMotionGroup"

test("dispose closes the websockets of the motion group", async () => {
  const motionGroup = await ConnectedMotionGroup.connect(
    new Nova({ instanceUrl: "https://mock.example.com" }),
    "0@mock-ur5e",
  )
  const closeMotionState = vi.spyOn(motionGroup.motionStateSocket, "close")
  const closeControllerState = vi.spyOn(
    motionGroup.controllerStateSocket,
    "close",
  )

  motionGroup.dispose()

  expect(closeMotionState).toHaveBeenCalled()
  expect(closeControllerState).toHaveBeenCalled()
})
