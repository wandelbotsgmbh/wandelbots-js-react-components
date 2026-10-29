/**
 * Example of an e2e test against a real NOVA instance. For each pull request,
 * the workflow .github/workflows/nova-instance.yml creates a NOVA cloud
 * instance with the newest released NOVA version and sets NOVA_INSTANCE_URL
 * and NOVA_ACCESS_TOKEN. Without them, the tests are skipped. To run them
 * against another instance:
 *
 *   NOVA_INSTANCE_URL=https://… NOVA_ACCESS_TOKEN=… pnpm run test:e2e
 */
import { setTimeout as sleep } from "node:timers/promises"
import { Nova } from "@wandelbots/nova-js/v2"
import { beforeAll, describe, expect, test, vi } from "vitest"
import { JoggerConnection } from "../src/lib/JoggerConnection"
import { MotionStreamConnection } from "../src/lib/MotionStreamConnection"

const { NOVA_INSTANCE_URL, NOVA_ACCESS_TOKEN } = process.env
const CELL = "cell"
const CONTROLLER = "ur5e"
const MOTION_GROUP = `0@${CONTROLLER}`

describe.skipIf(!NOVA_INSTANCE_URL)(
  "a virtual robot on a NOVA instance",
  () => {
    let nova: Nova

    beforeAll(async () => {
      nova = new Nova({
        instanceUrl: NOVA_INSTANCE_URL ?? "",
        accessToken: NOVA_ACCESS_TOKEN,
      })

      // The cell of a new instance has no robot
      await nova.api.controller.addRobotController(CELL, {
        name: CONTROLLER,
        configuration: {
          kind: "VirtualController",
          manufacturer: "universalrobots",
          type: "universalrobots-ur5e",
        },
      })
      await vi.waitFor(
        async () => {
          const state =
            await nova.api.controller.getCurrentRobotControllerState(
              CELL,
              CONTROLLER,
            )
          expect(
            state.motion_groups.map((group) => group.motion_group),
          ).toContain(MOTION_GROUP)
        },
        { timeout: 120_000, interval: 1000 },
      )
    })

    test("streams the joint positions", async () => {
      const motionStream = await MotionStreamConnection.open(nova, MOTION_GROUP)
      try {
        expect(
          motionStream.rapidlyChangingMotionState.joint_position,
        ).toHaveLength(6)
      } finally {
        motionStream.dispose()
      }
    })

    test("jogs the first joint", async () => {
      // Opened like the JoggingPanel does it
      const jogger = await JoggerConnection.open(nova, MOTION_GROUP)
      const getJoints = () =>
        jogger.motionStream.rapidlyChangingMotionState.joint_position
      try {
        await jogger.setJoggingMode("jogging")
        const start = [...getJoints()]

        await jogger.rotateJoints({
          joint: 0,
          direction: "+",
          velocityValue: 0.2,
          velocityUnit: "rad/s",
        })
        await sleep(1000)
        await jogger.stop()

        await expect
          .poll(() => getJoints()[0], { timeout: 5000 })
          .toBeGreaterThan(start[0] + 0.05)
        expect(getJoints()[1]).toBeCloseTo(start[1])
      } finally {
        await jogger.dispose()
        jogger.motionStream.dispose()
      }
    })
  },
)
