import { act, fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { useHold } from "./useHold"

type Target = "a" | "b"

function Controls(props: {
  onStart: (target: Target) => void
  onStop: () => void
  disabled?: boolean
}) {
  const { handlersFor, held } = useHold<Target>({
    ...props,
    isSame: (a, b) => a === b,
  })
  return (
    <div>
      <button type="button" {...handlersFor("a")}>
        a
      </button>
      <button type="button" {...handlersFor("b")}>
        b
      </button>
      <output>{held ?? "none"}</output>
    </div>
  )
}

function setup(disabled = false) {
  const onStart = vi.fn()
  const onStop = vi.fn()
  const view = render(
    <Controls onStart={onStart} onStop={onStop} disabled={disabled} />,
  )
  const press = (name: Target) =>
    fireEvent.pointerDown(screen.getByRole("button", { name }), {
      button: 0,
      pointerId: 1,
    })
  return { onStart, onStop, press, view }
}

const button = (name: Target) => screen.getByRole("button", { name })

function setVisibility(state: DocumentVisibilityState) {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    get: () => state,
  })
  document.dispatchEvent(new Event("visibilitychange"))
}

describe("useHold", () => {
  it("runs while a control is held and stops once on release", () => {
    const { onStart, onStop, press } = setup()

    press("a")
    expect(onStart).toHaveBeenCalledWith("a")
    expect(screen.getByRole("status")).toHaveTextContent("a")

    fireEvent.pointerUp(screen.getByRole("button", { name: "a" }))
    fireEvent.pointerUp(screen.getByRole("button", { name: "a" }))
    expect(onStop).toHaveBeenCalledTimes(1)
    expect(screen.getByRole("status")).toHaveTextContent("none")
  })

  it("ignores a second control while one is held", () => {
    const { onStart, onStop, press } = setup()

    press("a")
    press("b")
    fireEvent.pointerUp(screen.getByRole("button", { name: "b" }))

    expect(onStart).toHaveBeenCalledTimes(1)
    expect(onStop).not.toHaveBeenCalled()
  })

  it("ignores a press with another mouse button than the main one", () => {
    const { onStart } = setup()

    fireEvent.pointerDown(screen.getByRole("button", { name: "a" }), {
      button: 2,
      pointerId: 1,
    })

    expect(onStart).not.toHaveBeenCalled()
  })

  it.each([
    ["the pointer is cancelled", "pointerCancel"],
    ["the pointer capture is lost", "lostPointerCapture"],
    ["the control loses focus", "blur"],
  ] as const)("stops when %s, without waiting for a release", (_, event) => {
    const { onStop, press } = setup()
    const a = screen.getByRole("button", { name: "a" })

    press("a")
    fireEvent[event](a)
    expect(onStop).toHaveBeenCalledTimes(1)

    // A release that still comes stops nothing more
    fireEvent.pointerUp(a)
    expect(onStop).toHaveBeenCalledTimes(1)
  })

  it("captures the pointer, so a release off the control still reaches it", () => {
    // jsdom has no pointer capture of its own
    const setPointerCapture = vi.fn()
    const original = HTMLElement.prototype.setPointerCapture
    HTMLElement.prototype.setPointerCapture = setPointerCapture
    try {
      setup()
      fireEvent.pointerDown(screen.getByRole("button", { name: "a" }), {
        button: 0,
        pointerId: 7,
      })

      expect(setPointerCapture).toHaveBeenCalledWith(7)
    } finally {
      HTMLElement.prototype.setPointerCapture = original
    }
  })

  it("stops once in all when a release is followed by an unmount", () => {
    const { onStop, press, view } = setup()

    press("a")
    fireEvent.pointerUp(screen.getByRole("button", { name: "a" }))
    view.unmount()

    expect(onStop).toHaveBeenCalledTimes(1)
  })

  // The keyboard does not jog: a key held on a focused control moves nothing
  it.each([
    ["Space", { key: " " }],
    ["Enter", { key: "Enter" }],
    ["Cmd+Enter", { key: "Enter", metaKey: true }],
    ["an auto-repeated Space", { key: " ", repeat: true }],
  ])("does not start with %s, and leaves the key to the browser", (_, key) => {
    const { onStart, onStop } = setup()

    const down = fireEvent.keyDown(button("a"), key)
    const up = fireEvent.keyUp(button("a"), key)

    expect(onStart).not.toHaveBeenCalled()
    expect(onStop).not.toHaveBeenCalled()
    expect(screen.getByRole("status")).toHaveTextContent("none")
    // Not prevented
    expect(down).toBe(true)
    expect(up).toBe(true)
  })

  // A new key press may bring a release that never arrives (Cmd, on macOS)
  it.each([
    ["Cmd", { key: "Meta", metaKey: true }],
    ["Enter", { key: "Enter" }],
    ["Space", { key: " " }],
  ])("stops a pointer hold once when a key is pressed, e.g. %s, and starts none with it", (_, key) => {
    const { onStart, onStop, press } = setup()

    press("a")
    fireEvent.keyDown(button("a"), key)
    expect(onStop).toHaveBeenCalledTimes(1)
    expect(screen.getByRole("status")).toHaveTextContent("none")

    fireEvent.keyDown(button("a"), { ...key, repeat: true })
    fireEvent.keyUp(button("a"), key)
    expect(onStop).toHaveBeenCalledTimes(1)
    expect(onStart).toHaveBeenCalledTimes(1)
  })

  it("goes on through the auto-repeat of a key that was down before the press", () => {
    const { onStop, press } = setup()

    press("a")
    fireEvent.keyDown(button("a"), { key: "a", repeat: true })

    expect(onStop).not.toHaveBeenCalled()
  })

  it("stops a pointer hold when a move shows the primary button is up: its release never arrived, or came while another button stays pressed", () => {
    const { onStop, press } = setup()
    const a = screen.getByRole("button", { name: "a" })

    press("a")
    fireEvent.pointerMove(a, { pointerId: 1, buttons: 3 })
    expect(onStop).not.toHaveBeenCalled()
    fireEvent.pointerMove(a, { pointerId: 1, buttons: 2 })

    expect(onStop).toHaveBeenCalledTimes(1)
  })

  it("keeps the hold when another pointer moves over the control without a button", () => {
    const { onStop, press } = setup()

    press("a")
    fireEvent.pointerMove(button("a"), { pointerId: 2, buttons: 0 })

    expect(onStop).not.toHaveBeenCalled()
  })

  // On macOS a Ctrl+click is a main-button press that opens the context
  // menu, and the menu swallows the release
  it("does not start on Ctrl+click", () => {
    const { onStart } = setup()

    fireEvent.pointerDown(screen.getByRole("button", { name: "a" }), {
      button: 0,
      ctrlKey: true,
      pointerId: 1,
    })

    expect(onStart).not.toHaveBeenCalled()
  })

  it("keeps the context menu off the controls", () => {
    setup()

    const shown = fireEvent.contextMenu(
      screen.getByRole("button", { name: "a" }),
    )

    expect(shown).toBe(false)
  })

  it("does not start while disabled", () => {
    const { onStart, press } = setup(true)

    press("a")

    expect(onStart).not.toHaveBeenCalled()
  })

  it("stops when it becomes disabled", () => {
    const { onStart, onStop, press, view } = setup()

    press("a")
    view.rerender(<Controls onStart={onStart} onStop={onStop} disabled />)

    expect(onStop).toHaveBeenCalledTimes(1)
  })

  it("stops when it unmounts", () => {
    const { onStop, press, view } = setup()

    press("a")
    view.unmount()

    expect(onStop).toHaveBeenCalledTimes(1)
  })

  it("stops when the window loses focus, e.g. switching to another app", () => {
    const { onStop, press } = setup()

    press("a")
    act(() => {
      window.dispatchEvent(new Event("blur"))
    })

    expect(onStop).toHaveBeenCalledTimes(1)
  })

  it("stops when the tab is hidden", () => {
    const { onStop, press } = setup()

    press("a")
    act(() => setVisibility("hidden"))
    setVisibility("visible")

    expect(onStop).toHaveBeenCalledTimes(1)
  })
})
