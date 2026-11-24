import { act, fireEvent, render, screen } from "@testing-library/react"
import { I18nextProvider } from "react-i18next"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { i18n } from "../../../i18n/config"
import { JoggingJointSlider } from "./JoggingJointSlider"

// The track is 200 px wide from x = 300, so a press at x is at
// (x - 300) / 200 of the way from the lower limit (-2 rad) to the upper one
// (+2 rad). A goal worked out without the track's offset would be wrong.
const TRACK_LEFT = 300
const TRACK_WIDTH = 200
const xOf = (value: number) => TRACK_LEFT + ((value + 2) / 4) * TRACK_WIDTH
// The slider's box, as the mock below lays it out
const BOX = {
  left: TRACK_LEFT,
  top: 0,
  right: TRACK_LEFT + TRACK_WIDTH,
  bottom: 20,
}
// How far off its box the holding pointer may stray before it has left
const MARGIN = 8

beforeEach(() => {
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
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

afterEach(() => {
  vi.restoreAllMocks()
  restorePointerCapture()
  restorePointerCapture = () => {}
})

/** Gives jsdom the pointer capture of a browser, and says what was asked of it */
function withPointerCapture() {
  const captured = new Set<number>()
  const proto = HTMLElement.prototype
  const original = {
    set: proto.setPointerCapture,
    has: proto.hasPointerCapture,
    release: proto.releasePointerCapture,
  }
  proto.setPointerCapture = vi.fn((id: number) => {
    captured.add(id)
  })
  proto.hasPointerCapture = vi.fn((id: number) => captured.has(id))
  proto.releasePointerCapture = vi.fn((id: number) => {
    captured.delete(id)
  })
  const mocks = {
    set: vi.mocked(proto.setPointerCapture),
    release: vi.mocked(proto.releasePointerCapture),
  }
  restorePointerCapture = () => {
    proto.setPointerCapture = original.set
    proto.hasPointerCapture = original.has
    proto.releasePointerCapture = original.release
  }
  return mocks
}
let restorePointerCapture = () => {}

type Props = {
  value?: number
  disabled?: boolean
  min?: number | null
  max?: number | null
  linear?: boolean
  angleUnit?: "deg" | "rad"
  onJogStart?: (direction: "+" | "-") => void
}

function setup(props: Props = {}) {
  const onJogStart = vi.fn(props.onJogStart)
  const onJogStop = vi.fn()
  const slider = (p: Props) => (
    <I18nextProvider i18n={i18n}>
      <JoggingJointSlider
        label="J2"
        name="Shoulder"
        value={p.value ?? 0}
        // null leaves a limit out; undefined takes the default ±2 rad
        min={p.min === null ? undefined : (p.min ?? -2)}
        max={p.max === null ? undefined : (p.max ?? 2)}
        linear={p.linear}
        angleUnit={p.angleUnit}
        onJogStart={onJogStart}
        onJogStop={onJogStop}
        disabled={p.disabled}
      />
    </I18nextProvider>
  )
  const view = render(slider(props))
  const rerender = (p: Props) => view.rerender(slider({ ...props, ...p }))
  return { onJogStart, onJogStop, rerender, unmount: view.unmount }
}

const track = () => screen.getByRole("slider", { name: "J2 Shoulder" })

const press = (x: number, init: object = {}) =>
  fireEvent.pointerDown(track(), {
    button: 0,
    buttons: 1,
    pointerId: 1,
    clientX: x,
    ...init,
  })
const move = (x: number, buttons = 1, pointerId = 1, pointerType?: string) =>
  fireEvent.pointerMove(track(), {
    pointerId,
    clientX: x,
    buttons,
    pointerType,
  })
const release = (pointerId = 1) => fireEvent.pointerUp(track(), { pointerId })
/** A move of the holding pointer to a place on the page, its button still down */
const moveTo = (x: number, y: number) =>
  fireEvent.pointerMove(track(), {
    pointerId: 1,
    buttons: 1,
    clientX: x,
    clientY: y,
  })

/** The emotion style rules in the document */
const styleRules = () => document.querySelectorAll("style[data-emotion]").length

describe("JoggingJointSlider", () => {
  it("is a slider named after its joint, with its value and limits", () => {
    setup()

    expect(track()).toHaveAttribute("aria-valuetext", "0.0°")
    expect(screen.getByText("J2")).toBeVisible()
    expect(screen.getByText("-115°")).toBeVisible()
    expect(screen.getByText("+115°")).toBeVisible()
  })

  it("jogs toward where its track is pressed, until it is let go", () => {
    const { onJogStart, onJogStop } = setup()

    press(xOf(1))
    expect(onJogStart).toHaveBeenCalledWith("+")

    release()
    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("jogs the other way for a press below the joint's value", () => {
    const { onJogStart } = setup()

    press(xOf(-1.5))

    expect(onJogStart).toHaveBeenCalledWith("-")
  })

  it("does not jog for a finger on the joint itself, nor for the finger's jitter", () => {
    const { onJogStart, onJogStop } = setup()

    press(xOf(0) + 3, { pointerType: "touch" })
    move(xOf(0) - 3, 1, 1, "touch")
    release()

    expect(onJogStart).not.toHaveBeenCalled()
    expect(onJogStop).not.toHaveBeenCalled()
  })

  // A mouse or pen keeps still, so only the track's pixels limit how small a
  // jog can be: on a joint with a wide range, 4 px would be over 10°
  it.each([
    "mouse",
    "pen",
  ])("jogs for a %s press 2 px off the joint", (pointerType) => {
    const { onJogStart } = setup()

    press(xOf(0) - 2, { pointerType })
    expect(onJogStart.mock.calls).toEqual([["-"]])
    release()

    // On the joint's own pixel, it does not jog; 2 px on, it does
    press(xOf(0) + 0.5, { pointerType })
    expect(onJogStart).toHaveBeenCalledTimes(1)
    move(xOf(0) + 2, 1, 1, pointerType)
    expect(onJogStart.mock.calls).toEqual([["-"], ["+"]])
  })

  it("stops when the joint gets to the goal, and jogs on when the pointer moves on", () => {
    const { onJogStart, onJogStop, rerender } = setup()

    press(xOf(1))
    rerender({ value: 1.02 })
    expect(onJogStop).toHaveBeenCalledTimes(1)

    move(xOf(1.8))
    expect(onJogStart.mock.calls).toEqual([["+"], ["+"]])
  })

  it("turns around when the goal moves past the joint while held", () => {
    const { onJogStart, onJogStop } = setup()

    press(xOf(1))
    move(xOf(-1))

    expect(onJogStop).toHaveBeenCalledTimes(1)
    expect(onJogStart.mock.calls).toEqual([["+"], ["-"]])
  })

  it("follows one pointer: a second finger cannot take over", () => {
    const { onJogStart, onJogStop } = setup()

    press(xOf(1))
    press(xOf(-1), { pointerId: 2 })
    move(xOf(-1.5), 1, 2)

    expect(onJogStart.mock.calls).toEqual([["+"]])
    expect(onJogStop).not.toHaveBeenCalled()
  })

  it("shows the goal under the pointer after the joint's value", () => {
    setup()

    move(xOf(1), 0)

    // 1 rad
    expect(screen.getByText("/ 57.3°")).toBeVisible()
  })

  // The keyboard does not jog, as in RobotPad: only a pointer that holds the
  // slider moves the joint
  it.each([
    "ArrowRight",
    "ArrowLeft",
    "ArrowUp",
    "ArrowDown",
    " ",
    "Enter",
  ])("does not jog with the key %j, held or not, and leaves it to the browser", (key) => {
    const { onJogStart, onJogStop } = setup()

    // Still reached by the keyboard, and named
    track().focus()
    expect(track()).toHaveFocus()
    const down = fireEvent.keyDown(track(), { key })
    fireEvent.keyDown(track(), { key, repeat: true })
    fireEvent.keyDown(track(), { key, metaKey: true })
    const up = fireEvent.keyUp(track(), { key })

    expect(onJogStart).not.toHaveBeenCalled()
    expect(onJogStop).not.toHaveBeenCalled()
    // Not prevented: an arrow key scrolls the page as anywhere else
    expect(down).toBe(true)
    expect(up).toBe(true)
  })

  it("ignores Ctrl+click and the context menu, whose menu would swallow the release", () => {
    const { onJogStart } = setup()

    press(xOf(1), { ctrlKey: true })

    expect(onJogStart).not.toHaveBeenCalled()
    expect(fireEvent.contextMenu(track())).toBe(false)
  })

  it("does not jog while disabled, and stops a jog when it becomes disabled", () => {
    const { onJogStart, onJogStop, rerender } = setup({ disabled: true })

    press(xOf(1))
    expect(onJogStart).not.toHaveBeenCalled()

    rerender({ disabled: false })
    press(xOf(1))
    rerender({ disabled: true })
    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("stops when a move shows that no button is pressed any more: the release never arrived", () => {
    const { onJogStop } = setup()

    press(xOf(1))
    move(xOf(1.2), 0)

    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("captures the pointer, so its moves and its release reach the slider wherever they happen", () => {
    const capture = withPointerCapture()
    setup()

    press(xOf(1), { pointerId: 7 })

    expect(capture.set).toHaveBeenCalledWith(7)
  })

  it("stops when the pointer leaves the slider, as on a release, and stops once", () => {
    const { onJogStart, onJogStop } = setup()

    press(xOf(1))
    moveTo(xOf(1.2), 120)
    expect(onJogStop).toHaveBeenCalledTimes(1)

    // Out there, it steers nothing, and the release that still comes stops
    // nothing more
    moveTo(xOf(-1), 120)
    release()
    expect(onJogStart).toHaveBeenCalledTimes(1)
    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("does not jog again when the pointer comes back without a new press", () => {
    const { onJogStart } = setup()

    press(xOf(1))
    moveTo(xOf(1), 120)
    moveTo(xOf(-1), 10)

    expect(onJogStart.mock.calls).toEqual([["+"]])
  })

  // A drag to a limit overshoots the end of the track, where the thumb
  // overhangs it, and a finger wanders off a strip this narrow
  it.each([
    ["past the upper limit", { x: BOX.right + MARGIN, y: 10 }, { x: 1, y: 0 }],
    ["past the lower limit", { x: BOX.left - MARGIN, y: 10 }, { x: -1, y: 0 }],
    ["above", { x: xOf(1.5), y: BOX.top - MARGIN }, { x: 0, y: -1 }],
    ["below", { x: xOf(1.5), y: BOX.bottom + MARGIN }, { x: 0, y: 1 }],
  ])("lets the holding pointer stray a little off the slider %s, and stops a pixel further", (_, at, further) => {
    const { onJogStop } = setup()

    // On the side of the joint that the pointer strays to: no turning around
    press(at.x < xOf(0) ? xOf(-1) : xOf(1))
    moveTo(at.x, at.y)
    expect(onJogStop).not.toHaveBeenCalled()

    moveTo(at.x + further.x, at.y + further.y)
    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("jogs to the limit for a pointer that strayed past the end of the track", () => {
    const { onJogStart, onJogStop } = setup()

    press(xOf(1))
    moveTo(BOX.right + MARGIN, 10)

    // +2 rad, the upper limit
    expect(screen.getByText("/ 114.6°")).toBeVisible()
    expect(onJogStart.mock.calls).toEqual([["+"]])
    expect(onJogStop).not.toHaveBeenCalled()
  })

  it("shows no goal once the holding pointer has left", () => {
    setup()

    move(xOf(1), 0)
    press(xOf(1))
    moveTo(xOf(1.2), 10)
    expect(screen.getByText("/ 68.8°")).toBeVisible()
    moveTo(xOf(1.2), 120)

    expect(screen.queryByText(/^\/ /)).toBeNull()
  })

  // A captured pointer never leaves the slider for the browser; one that
  // could not be captured does
  it("stops when a pointer it could not capture leaves the slider, but not for another pointer", () => {
    const { onJogStop } = setup()

    press(xOf(1))
    fireEvent.pointerLeave(track(), { pointerId: 2 })
    expect(onJogStop).not.toHaveBeenCalled()

    fireEvent.pointerLeave(track(), { pointerId: 1 })
    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("gives the pointer back when the hold ends before its release, so the slider it left shows no goal for it", () => {
    const capture = withPointerCapture()
    setup()

    press(xOf(1))
    expect(capture.release).not.toHaveBeenCalled()
    moveTo(xOf(1), 120)

    expect(capture.release).toHaveBeenCalledExactlyOnceWith(1)
  })

  it("stops when the window loses focus", () => {
    const { onJogStop } = setup()

    press(xOf(1))
    act(() => {
      window.dispatchEvent(new Event("blur"))
    })

    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("stops when it is removed", () => {
    const { onJogStop, unmount } = setup()

    press(xOf(1))
    unmount()

    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("stops when the browser cancels the pointer or takes its capture away", () => {
    const { onJogStop } = setup()

    press(xOf(1))
    fireEvent.pointerCancel(track(), { pointerId: 1 })
    expect(onJogStop).toHaveBeenCalledTimes(1)

    press(xOf(1))
    fireEvent.lostPointerCapture(track(), { pointerId: 1 })
    expect(onJogStop).toHaveBeenCalledTimes(2)
  })

  it("stops when the slider loses focus", () => {
    const { onJogStop } = setup()

    press(xOf(1))
    fireEvent.blur(track())

    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("stops when the tab is hidden", () => {
    const { onJogStop } = setup()
    const visibility = vi
      .spyOn(document, "visibilityState", "get")
      .mockReturnValue("hidden")

    press(xOf(1))
    act(() => {
      document.dispatchEvent(new Event("visibilitychange"))
    })

    expect(onJogStop).toHaveBeenCalledTimes(1)
    visibility.mockRestore()
  })

  it("does not stop when a second pointer, which it ignores, is released", () => {
    const { onJogStop } = setup()

    press(xOf(1))
    press(xOf(-1), { pointerId: 2 })
    release(2)

    expect(onJogStop).not.toHaveBeenCalled()
  })

  it("stops when the primary button is released while another stays pressed", () => {
    const { onJogStop } = setup()

    press(xOf(1))
    // The right button joins, then the left one lets go: the browser sends
    // no pointerup until the last button is up
    move(xOf(1), 3)
    move(xOf(1), 2)

    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("ends a pointer hold on a key press, as the gizmo and the buttons do: Cmd can take the release away", () => {
    const { onJogStart, onJogStop } = setup()

    press(xOf(1))
    fireEvent.keyDown(track(), { key: "Meta", metaKey: true })
    expect(onJogStop).toHaveBeenCalledTimes(1)

    // No key starts a jog after that, nor does its auto-repeat
    fireEvent.keyDown(track(), { key: "ArrowRight" })
    fireEvent.keyDown(track(), { key: "ArrowRight", repeat: true })
    expect(onJogStart).toHaveBeenCalledTimes(1)
    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("ends a pointer hold on a key press also while the slider does not have the focus", () => {
    const { onJogStop } = setup()

    press(xOf(1))
    fireEvent.keyDown(document.body, { key: "Shift" })

    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("goes on through the auto-repeat of a key that was down before the press", () => {
    const { onJogStop } = setup()

    press(xOf(1))
    fireEvent.keyDown(track(), { key: "a", repeat: true })

    expect(onJogStop).not.toHaveBeenCalled()
  })

  it("steers by the joint's live value: after it arrived, a goal behind it jogs back", () => {
    const { onJogStart, rerender } = setup()

    press(xOf(1))
    rerender({ value: 1.02 })
    move(xOf(0.5))

    expect(onJogStart.mock.calls).toEqual([["+"], ["-"]])
  })

  it("starts once per direction: moving the goal on the same side starts nothing new", () => {
    const { onJogStart } = setup()

    press(xOf(1))
    move(xOf(1.5))
    move(xOf(0.8))

    expect(onJogStart).toHaveBeenCalledTimes(1)
  })

  it("holds the joint where it stopped while the pointer rests, even after an overshoot", () => {
    const { onJogStart, rerender } = setup()

    press(xOf(1))
    // The stop lands 0.15 rad (7.5 px) past the goal
    rerender({ value: 1.15 })
    move(xOf(1))
    move(xOf(1) + 1)
    expect(onJogStart).toHaveBeenCalledTimes(1)

    // A real move of the pointer jogs the joint to it again
    move(xOf(0.5))
    expect(onJogStart.mock.calls).toEqual([["+"], ["-"]])
  })

  it("stops on release even when the app's onJogStart throws", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {})
    const swallow = (event: ErrorEvent) => event.preventDefault()
    window.addEventListener("error", swallow)
    const { onJogStop } = setup({
      onJogStart: () => {
        throw new Error("the app failed after sending the jog")
      },
    })

    try {
      press(xOf(1))
    } catch {
      // the app's error, passed on
    }
    release()

    expect(onJogStop).toHaveBeenCalledTimes(1)
    window.removeEventListener("error", swallow)
    errors.mockRestore()
  })

  it("shows no goal while disabled", () => {
    setup({ disabled: true })

    move(xOf(1), 0)

    expect(screen.queryByText("/ 57.3°")).toBeNull()
  })

  it("shows the goal under the pointer after a release, not the one before the press", () => {
    setup()

    move(xOf(1), 0)
    press(xOf(1))
    move(xOf(-1))
    release()

    expect(screen.getByText("/ -57.3°")).toBeVisible()
  })

  it("adds no style rules as the joint moves: positions are not baked into classes", () => {
    const { rerender } = setup()
    rerender({ value: 0.001 })
    const before = styleRules()

    for (let i = 2; i < 40; i++) rerender({ value: i * 0.001 })
    for (let x = 0; x < 20; x++) move(xOf(-1) + x, 0)

    expect(styleRules()).toBe(before)
  })

  it("spans the turn the joint is in when a revolute joint has no limits", () => {
    // 270°: the turn from +180° to +540°
    const { onJogStart } = setup({
      value: (3 * Math.PI) / 2,
      min: null,
      max: null,
    })

    expect(screen.getByText("+180°")).toBeVisible()
    expect(screen.getByText("+540°")).toBeVisible()
    // The joint stands a quarter of the way along that turn
    press(TRACK_LEFT + TRACK_WIDTH * 0.75)
    expect(onJogStart).toHaveBeenCalledWith("+")
    release()
    press(TRACK_LEFT + TRACK_WIDTH * 0.1)
    expect(onJogStart).toHaveBeenLastCalledWith("-")
  })

  it("spans one turn from the one limit it has", () => {
    setup({ max: null })

    // -2 rad and -2 rad + 360°
    expect(screen.getByText("-115°")).toBeVisible()
    expect(screen.getByText("+245°")).toBeVisible()
  })

  it("is no slider for a linear axis without limits: there is nothing to jog it across", () => {
    setup({ linear: true, min: null, max: null, value: 523.4 })

    expect(screen.queryByRole("slider")).toBeNull()
    expect(screen.getByText("523.4 mm")).toBeVisible()
  })
})
