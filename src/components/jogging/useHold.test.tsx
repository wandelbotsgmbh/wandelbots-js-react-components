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
  ] as const)("stops once when %s", (_, event) => {
    const { onStop, press } = setup()

    press("a")
    fireEvent[event](screen.getByRole("button", { name: "a" }))
    fireEvent.pointerUp(screen.getByRole("button", { name: "a" }))

    expect(onStop).toHaveBeenCalledTimes(1)
  })

  it("holds with Space or Enter, without restarting on key repeat", () => {
    const { onStart, onStop } = setup()
    const button = screen.getByRole("button", { name: "a" })

    fireEvent.keyDown(button, { key: " " })
    fireEvent.keyDown(button, { key: " ", repeat: true })
    fireEvent.keyUp(button, { key: " " })
    fireEvent.keyDown(button, { key: "Enter" })
    fireEvent.keyUp(button, { key: "Enter" })

    expect(onStart).toHaveBeenCalledTimes(2)
    expect(onStop).toHaveBeenCalledTimes(2)
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
