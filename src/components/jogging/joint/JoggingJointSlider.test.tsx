import { act, fireEvent, render, screen } from "@testing-library/react"
import { I18nextProvider } from "react-i18next"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { i18n } from "../../../i18n/config"
import { JoggingJointSlider } from "./JoggingJointSlider"

// The track is 200 px wide from x = 0, so a press at x is at x / 200 of the
// way from the lower limit (-2 rad) to the upper one (+2 rad)
const TRACK_WIDTH = 200
const xOf = (value: number) => ((value + 2) / 4) * TRACK_WIDTH

beforeEach(() => {
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
    left: 0,
    top: 0,
    right: TRACK_WIDTH,
    bottom: 20,
    width: TRACK_WIDTH,
    height: 20,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

type Props = { value?: number; disabled?: boolean }

function setup(props: Props = {}) {
  const onJogStart = vi.fn()
  const onJogStop = vi.fn()
  const slider = (p: Props) => (
    <I18nextProvider i18n={i18n}>
      <JoggingJointSlider
        label="J2"
        name="Shoulder"
        value={p.value ?? 0}
        min={-2}
        max={2}
        onJogStart={onJogStart}
        onJogStop={onJogStop}
        disabled={p.disabled}
      />
    </I18nextProvider>
  )
  const view = render(slider(props))
  const rerender = (p: Props) => view.rerender(slider(p))
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
const move = (x: number, buttons = 1, pointerId = 1) =>
  fireEvent.pointerMove(track(), { pointerId, clientX: x, buttons })
const release = () => fireEvent.pointerUp(track(), { pointerId: 1 })

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

  it("does not jog for a press on the joint itself", () => {
    const { onJogStart, onJogStop } = setup()

    press(xOf(0) + 2)
    release()

    expect(onJogStart).not.toHaveBeenCalled()
    expect(onJogStop).not.toHaveBeenCalled()
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

  it("jogs toward a limit while an arrow key is held", () => {
    const { onJogStart, onJogStop } = setup()

    fireEvent.keyDown(track(), { key: "ArrowRight" })
    expect(onJogStart).toHaveBeenLastCalledWith("+")
    fireEvent.keyUp(track(), { key: "ArrowRight" })
    expect(onJogStop).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(track(), { key: "ArrowLeft" })
    expect(onJogStart).toHaveBeenLastCalledWith("-")
  })

  it("stops at the limit an arrow key jogs to", () => {
    const { onJogStop, rerender } = setup()

    fireEvent.keyDown(track(), { key: "ArrowRight" })
    rerender({ value: 2 })

    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("does not start with Cmd held, as macOS then sends no key release", () => {
    const { onJogStart } = setup()

    fireEvent.keyDown(track(), { key: "ArrowRight", metaKey: true })

    expect(onJogStart).not.toHaveBeenCalled()
  })

  it("ends a key hold on any other key, as Cmd pressed during it swallows the release", () => {
    const { onJogStop } = setup()

    fireEvent.keyDown(track(), { key: "ArrowRight" })
    fireEvent.keyDown(track(), { key: "Meta" })

    expect(onJogStop).toHaveBeenCalledTimes(1)
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
})
