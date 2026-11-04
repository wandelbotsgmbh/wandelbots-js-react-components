/**
 * The test data of the Playwright tests on the NOVA instance: one virtual
 * UR5e with 2 safety zones, and a stored collision setup. The global setup
 * adds them with unique names, so the tests also work on an instance that
 * other people use, and they do not touch the robots of other people.
 */
import { setTimeout as sleep } from "node:timers/promises"
import {
  type CollisionSetup,
  Nova,
  type SafetyZone,
} from "@wandelbots/nova-js/v2"
import { novaInstance } from "../novaInstance"

/** The cell that the playground shows (CELL_ID of playground/vite.config.ts) */
export const CELL = process.env.CELL_ID || "cell"

export const NO_INSTANCE_MESSAGE =
  "The Playwright tests need a NOVA instance. Set NOVA_INSTANCE_URL (and NOVA_ACCESS_TOKEN for a cloud instance), or WANDELAPI_BASE_URL in .env.local, and build the playground again (`pnpm run test:playground` does both builds and tests). In pull requests, the workflow e2e creates an instance."

/**
 * Two keep-out zones behind the robot: the 3D view shows them next to the
 * robot, and the jogging of the tests (in front of the robot) does not come
 * near them. In mm, in the world coordinate system ("").
 */
export const SAFETY_ZONES: SafetyZone[] = [
  {
    id: 1,
    name: "e2e sphere",
    restricted: true,
    active: true,
    // The first motion group of the controller (0@<controller>)
    mg_uid: 0,
    uid_ref_cs: "",
    geometry: {
      id: "e2e-sphere",
      inverted: false,
      sphere: { center: [-450, 250, 350], radius: 150 },
    },
  },
  {
    id: 2,
    name: "e2e box",
    restricted: true,
    active: true,
    mg_uid: 0,
    uid_ref_cs: "",
    geometry: {
      id: "e2e-box",
      inverted: false,
      // A corner and its 3 neighbor corners: 400 x 300 x 500 mm
      box: {
        center: [-700, -500, 0],
        neighbour: [-300, -500, 0, -700, -200, 0, -700, -500, 500],
      },
    },
  },
]

/** A table under the robot and a ball next to it, in mm */
export const COLLISION_SETUP = {
  colliders: {
    table: {
      shape: {
        shape_type: "box",
        size_x: 1000,
        size_y: 800,
        size_z: 40,
        box_type: "FULL",
      },
      pose: { position: [200, 0, -20], orientation: [0, 0, 0] },
    },
    ball: {
      shape: { shape_type: "sphere", radius: 100 },
      pose: { position: [400, 450, 200], orientation: [0, 0, 0] },
    },
  },
} satisfies CollisionSetup

/** The names of the test data. The global setup passes them to the tests. */
export type TestData = {
  /** The virtual robot controller, for example e2e-1a2b3c4d */
  controller: string
  /** Its motion group, for example 0@e2e-1a2b3c4d */
  motionGroup: string
  /** The key of the stored collision setup */
  collisionSetup: string
}

/** The names that the global setup chose (environment variables) */
export function testData(): TestData {
  const controller = process.env.E2E_CONTROLLER
  const collisionSetup = process.env.E2E_COLLISION_SETUP
  if (!controller || !collisionSetup) {
    throw new Error(
      "E2E_CONTROLLER and E2E_COLLISION_SETUP are not set. Start the tests with `playwright test`: its global setup sets them.",
    )
  }
  return { controller, motionGroup: `0@${controller}`, collisionSetup }
}

/** A NOVA client for the instance of the tests (see e2e/novaInstance.ts) */
export function createNova(): Nova {
  const instance = novaInstance()
  if (!instance.url) {
    throw new Error(NO_INSTANCE_MESSAGE)
  }
  return new Nova({
    instanceUrl: instance.url,
    accessToken: instance.accessToken,
  })
}

/** For the polls: a request that hangs counts as a failed try */
const REQUEST_TIMEOUT = { timeout: 10_000 }

/** Adds the virtual robot with its safety zones, and the collision setup */
export async function addTestData(nova: Nova, data: TestData) {
  const { controller, motionGroup, collisionSetup } = data
  await nova.api.controller.addRobotController(CELL, {
    name: controller,
    configuration: {
      kind: "VirtualController",
      manufacturer: "universalrobots",
      type: "universalrobots-ur5e",
    },
  })
  await waitUntil(
    `The motion group ${motionGroup}`,
    () => hasMotionGroup(nova, data),
    () => controllerSummary(nova, data),
    // The first robot on a new cloud instance can need more than 2 minutes
    300_000,
  )

  // Each safety zone restarts the connection between the virtual robot and
  // the RAE of NOVA. The RAE connects again when the state of the robot is
  // requested; requests of the description alone leave the robot in
  // MODE_INITIALIZING (NOVA 26.8 and 26.9, 2026-11-04). So the check asks
  // for the state first, and for the description only when the robot is in
  // MODE_MONITOR again.
  for (const [index, zone] of SAFETY_ZONES.entries()) {
    await addSafetyZone(nova, controller, zone)
    await waitUntil(
      `The safety zone "${zone.name}" of ${motionGroup}`,
      async () =>
        (await isMonitoring(nova, data)) &&
        (await safetyZoneCount(nova, data)) === index + 1,
      () => controllerSummary(nova, data),
    )
  }

  await nova.api.storeCollisionSetups.storeCollisionSetup(
    CELL,
    collisionSetup,
    COLLISION_SETUP,
  )
}

/** Removes the collision setup and the virtual robot, also when one is missing */
export async function removeTestData(
  nova: Nova,
  { controller, collisionSetup }: TestData,
) {
  await ignoreNotFound(
    nova.api.storeCollisionSetups.deleteStoredCollisionSetup(
      CELL,
      collisionSetup,
    ),
  )
  // Waits until the controller is gone (at most 120 s)
  await ignoreNotFound(
    nova.api.controller.deleteRobotController(CELL, controller, 120),
  )
}

/**
 * Adds a safety zone. After a start or a restart, the virtual controller
 * answers 404 for some time, also when its state shows the motion group
 * already: then it tries again. On a new cloud instance, this lasted more
 * than 60 s (2026-11-05), on a laptop about 2 s.
 */
async function addSafetyZone(nova: Nova, controller: string, zone: SafetyZone) {
  const deadline = Date.now() + 300_000
  for (;;) {
    try {
      await nova.api.virtualController.addVirtualControllerSafetyZone(
        CELL,
        controller,
        zone,
      )
      return
    } catch (error) {
      if (httpStatus(error) !== 404 || Date.now() > deadline) throw error
    }
    await sleep(1000)
  }
}

async function controllerState(nova: Nova, { controller }: TestData) {
  return nova.api.controller.getCurrentRobotControllerState(
    CELL,
    controller,
    REQUEST_TIMEOUT,
  )
}

async function hasMotionGroup(nova: Nova, data: TestData) {
  const state = await controllerState(nova, data)
  return state.motion_groups.some(
    (group) => group.motion_group === data.motionGroup,
  )
}

/** The robot runs with its motion group, and nothing controls it */
async function isMonitoring(nova: Nova, data: TestData) {
  const state = await controllerState(nova, data)
  return (
    state.mode === "MODE_MONITOR" &&
    state.motion_groups.some((group) => group.motion_group === data.motionGroup)
  )
}

/** The mode and the motion groups of the robot, for an error message */
async function controllerSummary(nova: Nova, data: TestData) {
  try {
    const state = await controllerState(nova, data)
    const groups = state.motion_groups.map((group) => group.motion_group)
    return `${data.controller}: ${state.mode}, motion groups [${groups.join(", ")}]`
  } catch (error) {
    return `${data.controller}: ${error instanceof Error ? error.message : String(error)}`
  }
}

async function safetyZoneCount(
  nova: Nova,
  { controller, motionGroup }: TestData,
) {
  const description = await nova.api.motionGroup.getMotionGroupDescription(
    CELL,
    controller,
    motionGroup,
    REQUEST_TIMEOUT,
  )
  return Object.keys(description.safety_zones ?? {}).length
}

/**
 * Calls `check` every second until it returns true. After `timeoutMs`, it
 * fails with the last error and with the text of `describeState`.
 */
async function waitUntil(
  what: string,
  check: () => Promise<boolean>,
  describeState: () => Promise<string>,
  timeoutMs = 180_000,
) {
  const deadline = Date.now() + timeoutMs
  let state: string
  for (;;) {
    try {
      if (await check()) return
      state = "not yet"
    } catch (error) {
      // For example while the virtual robot restarts
      state = error instanceof Error ? error.message : String(error)
    }
    if (Date.now() > deadline) {
      throw new Error(
        `${what}: not ready after ${timeoutMs / 1000} s (${state}; ${await describeState()})`,
      )
    }
    await sleep(1000)
  }
}

async function ignoreNotFound(request: Promise<unknown>) {
  try {
    await request
  } catch (error) {
    if (httpStatus(error) !== 404) throw error
  }
}

/** The HTTP status of a failed request of the NOVA client (axios) */
export function httpStatus(error: unknown) {
  return (error as { response?: { status?: number } }).response?.status
}
