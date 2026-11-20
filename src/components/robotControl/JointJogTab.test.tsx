import {
  act,
  createEvent,
  fireEvent,
  render,
  screen,
} from "@testing-library/react"
import { I18nextProvider } from "react-i18next"
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from "vitest"
import { i18n } from "../../i18n/config"
import {
  RobotControlPanel,
  type RobotControlJoints,
  type RobotControlPanelProps,
} from "./RobotControlPanel"

// Every element is 200 px wide from x = 300: a joint slider's track spans
// its limits (-2 to +2 rad) over it, so x = 450 is +1 rad
const TRACK_LEFT = 300
const TRACK_WIDTH = 200
const xOf = (value: number) => TRACK_LEFT + ((value + 2) / 4) * TRACK_WIDTH

let boundingRect: MockInstance | undefined

beforeEach(() => {
  boundingRect = vi
    .spyOn(Element.prototype, "getBoundingClientRect")
    .mockReturnValue({
      left: TRACK_LEFT,
      top: 0,
      right: TRACK_LEFT + TRACK_WIDTH,
      bottom: 20,
      width: TRACK_WIDTH,
      height: 20,
      x: TRACK_LEFT,
      y: 0,
      toJSON: () => ({}),
    })
})

// Only this spy: restoring all mocks would also undo the ResizeObserver of
// the test setup, which the panel's tabs need
afterEach(() => {
  boundingRect?.mockRestore()
})

function setup(joints: Partial<RobotControlJoints> | null = {}) {
  const onJogStart = vi.fn()
  const onJogStop = vi.fn()
  const onVelocityChange = vi.fn()
  const props: RobotControlPanelProps = {
    velocity: {
      translate: { value: 125, min: 1, max: 250 },
      rotate: { value: 0.1, min: 0.01, max: 1 },
    },
    onVelocityChange: vi.fn(),
    onJogStart: vi.fn(),
    onJogStop: vi.fn(),
    joints:
      joints === null
        ? undefined
        : {
            joints: [
              { value: 0, min: -2, max: 2, name: "Base" },
              { value: 0, min: -2, max: 2, name: "Shoulder" },
            ],
            // 50 °/s, of 1 to 60 °/s
            velocity: {
              value: (50 * Math.PI) / 180,
              min: Math.PI / 180,
              max: Math.PI / 3,
            },
            onVelocityChange,
            onJogStart,
            onJogStop,
            ...joints,
          },
  }
  render(
    <I18nextProvider i18n={i18n}>
      <RobotControlPanel {...props} />
    </I18nextProvider>,
  )
  return { onJogStart, onJogStop, onVelocityChange }
}

const jointTab = () => screen.getByRole("tab", { name: "Joint" })
const joint = (name: string) => screen.getByRole("slider", { name })
const press = (element: HTMLElement, x: number, pointerId = 1) =>
  fireEvent.pointerDown(element, {
    button: 0,
    buttons: 1,
    pointerId,
    pointerType: "mouse",
    clientX: x,
  })
const release = (element: HTMLElement, pointerId = 1) =>
  fireEvent.pointerUp(element, { pointerId })

describe("RobotControlPanel's Joint tab", () => {
  it("is there only when the app gives the joints", () => {
    setup(null)
    expect(screen.queryByRole("tab", { name: "Joint" })).toBeNull()
  })

  it("shows a slider per joint, named J1, J2, … and what the joint is", () => {
    setup()
    fireEvent.click(jointTab())

    expect(joint("J1 Base")).toBeVisible()
    expect(joint("J2 Shoulder")).toBeVisible()
    // No jog controls of the other tabs
    expect(screen.queryByRole("button", { name: "Jog X+" })).toBeNull()
  })

  it("jogs the pressed joint toward the press until it is let go", () => {
    const { onJogStart, onJogStop } = setup()
    fireEvent.click(jointTab())

    press(joint("J2 Shoulder"), xOf(1))
    expect(onJogStart).toHaveBeenCalledWith(1, "+")
    release(joint("J2 Shoulder"))
    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("jogs one joint at a time: a second finger on another joint jogs nothing, and the others show as unavailable", () => {
    const { onJogStart, onJogStop } = setup()
    fireEvent.click(jointTab())

    // Two fingers in the same frame: the second presses before the panel
    // re-renders, while J2 still shows as available
    const pointerDown = (name: string, x: number, pointerId: number) =>
      createEvent.pointerDown(joint(name), {
        button: 0,
        buttons: 1,
        pointerId,
        pointerType: "touch",
        clientX: x,
      })
    act(() => {
      fireEvent(joint("J1 Base"), pointerDown("J1 Base", xOf(1), 1))
      fireEvent(joint("J2 Shoulder"), pointerDown("J2 Shoulder", xOf(-1), 2))
    })

    expect(onJogStart.mock.calls).toEqual([[0, "+"]])
    expect(joint("J2 Shoulder")).toHaveAttribute("aria-disabled", "true")
    expect(joint("J1 Base")).not.toHaveAttribute("aria-disabled")

    // The ignored finger lets go: the jogging joint goes on
    release(joint("J2 Shoulder"), 2)
    expect(onJogStop).not.toHaveBeenCalled()
  })

  it("stops a joint jog when the tab changes", () => {
    const { onJogStop } = setup()
    fireEvent.click(jointTab())

    press(joint("J1 Base"), xOf(1))
    fireEvent.click(screen.getByRole("tab", { name: "Translate" }))

    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("shows the joint velocity in °/s and reports a change in rad/s", () => {
    const { onVelocityChange } = setup()
    fireEvent.click(jointTab())

    expect(screen.getByText("50°/s")).toBeVisible()
    fireEvent.change(screen.getByRole("slider", { name: "Velocity" }), {
      target: { value: 20 },
    })
    expect(onVelocityChange).toHaveBeenCalledWith(
      expect.closeTo(Math.PI / 9, 10),
    )
  })

  it("shows linear axes and their velocity in mm and mm/s", () => {
    setup({
      linear: true,
      joints: [{ value: 250, min: 0, max: 1000 }],
      velocity: { value: 100, min: 1, max: 250 },
    })
    fireEvent.click(jointTab())

    expect(screen.getByText("100 mm/s")).toBeVisible()
    expect(joint("J1")).toHaveAttribute("aria-valuetext", "250.0 mm")
  })

  it("jogs no joint while disabled", () => {
    const onJogStart = vi.fn()
    render(
      <I18nextProvider i18n={i18n}>
        <RobotControlPanel
          disabled
          velocity={{
            translate: { value: 125, min: 1, max: 250 },
            rotate: { value: 0.1, min: 0.01, max: 1 },
          }}
          onVelocityChange={vi.fn()}
          onJogStart={vi.fn()}
          onJogStop={vi.fn()}
          joints={{
            joints: [{ value: 0, min: -2, max: 2 }],
            velocity: { value: 0.5, min: 0.01, max: 1 },
            onVelocityChange: vi.fn(),
            onJogStart,
            onJogStop: vi.fn(),
          }}
        />
      </I18nextProvider>,
    )
    fireEvent.click(jointTab())

    press(joint("J1"), xOf(1))
    expect(onJogStart).not.toHaveBeenCalled()
  })
})
