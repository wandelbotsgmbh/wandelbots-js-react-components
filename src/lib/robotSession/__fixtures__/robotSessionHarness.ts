import type { Nova, RobotControllerState } from "@wandelbots/nova-js/v2"
import { vi } from "vitest"
import type { ControllerStateSource } from "../../controllerStateSource"
import {
  createRobotSessionLoad,
  type LoadRobotSessionOptions,
} from "../loadRobotSession"

// A real RobotSession on a fake NOVA: the description, model, coordinate
// systems and streams of a virtual UR5e, which a test feeds by hand

export const CONTROLLER_ID = "ur5e"
export const MOTION_GROUP_ID = "0@ur5e"

export function motionGroupState() {
  return {
    motion_group: MOTION_GROUP_ID,
    joint_position: [0, 0, 0, 0, 0, 0],
    joint_limit_reached: { limit_reached: [false] },
    tcp: "Flange",
    tcp_pose: { position: [400, 0, 300], orientation: [Math.PI, 0, 0] },
    flange_pose: { position: [400, 0, 300], orientation: [Math.PI, 0, 0] },
  }
}

export function controllerState(
  overrides: Partial<Record<"mode" | "safety_state", string>> = {},
) {
  return {
    controller: CONTROLLER_ID,
    mode: "MODE_MONITOR",
    safety_state: "SAFETY_STATE_NORMAL",
    operation_mode: "OPERATION_MODE_AUTO",
    motion_groups: [motionGroupState()],
    ...overrides,
  } as unknown as RobotControllerState
}

/** A controller state source that the test feeds by hand */
export class FakeStateSource
  extends EventTarget
  implements ControllerStateSource
{
  readyState = 1
  url =
    "ws://nova.test/api/nats (subject: nova.v2.cells.cell.controllers.ur5e.state)"
  reconnect = vi.fn()
  close = vi.fn()
  firstMessage = vi.fn(async () => ({
    data: JSON.stringify(controllerState()),
  })) as unknown as () => Promise<MessageEvent>
  nextMessage = () =>
    new Promise<MessageEvent>((resolve) =>
      this.addEventListener("message", (e) => resolve(e as MessageEvent), {
        once: true,
      }),
    )
  parse = (data: unknown) => JSON.parse(data as string) as RobotControllerState

  send(state: RobotControllerState) {
    this.dispatchEvent(
      new MessageEvent("message", { data: JSON.stringify(state) }),
    )
  }
}

export function makeHarness() {
  const socket = {
    url: "ws://nova.test/api/v2/cells/cell/controllers/ur5e/motion-groups/0@ur5e/state-stream",
    firstMessage: vi.fn().mockResolvedValue({
      data: JSON.stringify({ result: motionGroupState() }),
    }),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    close: vi.fn(),
    dispose: vi.fn(),
  }
  const source = new FakeStateSource()

  const api = {
    motionGroup: {
      getMotionGroupDescription: vi.fn().mockResolvedValue({
        motion_group_model: "UniversalRobots_UR5e",
        serial_number: "robot-serial-42",
        dh_parameters: [{ type: "REVOLUTE_JOINT" }],
        operation_limits: { auto_limits: { joints: [] } },
        tcps: { Flange: { name: "Flange", pose: {} } },
      }),
    },
    controller: {
      getRobotController: vi
        .fn()
        .mockResolvedValue({ configuration: { kind: "VirtualController" } }),
      listCoordinateSystems: vi
        .fn()
        .mockResolvedValue([{ coordinate_system: "" }]),
      getCurrentRobotControllerState: vi
        .fn()
        .mockResolvedValue(controllerState()),
      setDefaultMode: vi.fn().mockResolvedValue(undefined),
    },
    opts: {
      axiosInstance: {
        get: vi.fn(async (url: string) => ({
          data: url.endsWith("/description")
            ? { name: "custom-UniversalRobots_UR5e-1" }
            : { inverse_solver: "UR" },
        })),
      },
    },
  }

  const nova = {
    // MotionStreamConnection makes its own client from the instance URL
    config: { instanceUrl: "http://nova.test" },
    api,
    openReconnectingWebsocket: vi.fn().mockReturnValue(socket),
  } as unknown as Nova

  function load(options: LoadRobotSessionOptions = {}) {
    return createRobotSessionLoad(nova, MOTION_GROUP_ID, {
      stateSource: () => source,
      retryDelaysMs: [],
      ...options,
    })
  }

  return { api, socket, source, load }
}
