import { act, fireEvent, render, screen, within } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
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
        <span data-testid="inside-a">a</span>
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

/**
 * Says which element lies under the pointer, as the page does in a browser:
 * jsdom lays nothing out, and has no elementFromPoint
 */
function pointerIsOver(
  element: Element | null,
  root: Document | ShadowRoot = document,
) {
  const elementFromPoint = vi.fn((_x: number, _y: number) => element)
  root.elementFromPoint = elementFromPoint
  return elementFromPoint
}

/** A move of the holding pointer, its primary button still down */
const moveTo = (element: Element, init: object = {}) =>
  fireEvent.pointerMove(element, { pointerId: 1, buttons: 1, ...init })

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

afterEach(() => {
  Reflect.deleteProperty(document, "elementFromPoint")
  restorePointerCapture()
  restorePointerCapture = () => {}
})

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

  it("captures the pointer, so its moves and its release reach the control wherever they happen", () => {
    const capture = withPointerCapture()
    setup()

    fireEvent.pointerDown(button("a"), { button: 0, pointerId: 7 })

    expect(capture.set).toHaveBeenCalledWith(7)
  })

  it("stops when the pointer moves off the control, as on a release, and stops once", () => {
    const { onStop, press } = setup()

    press("a")
    pointerIsOver(button("b"))
    moveTo(button("a"))
    expect(onStop).toHaveBeenCalledTimes(1)
    expect(screen.getByRole("status")).toHaveTextContent("none")

    // More moves out there, and the release that still comes, stop nothing more
    moveTo(button("a"))
    fireEvent.pointerUp(button("a"), { pointerId: 1 })
    expect(onStop).toHaveBeenCalledTimes(1)
  })

  it("stops when the pointer leaves the page: nothing lies under it", () => {
    const { onStop, press } = setup()

    press("a")
    pointerIsOver(null)
    moveTo(button("a"), { clientX: -40, clientY: 12 })

    expect(onStop).toHaveBeenCalledTimes(1)
  })

  it("goes on while the pointer moves on the control, also over what is inside it", () => {
    const { onStop, press } = setup()

    press("a")
    const under = pointerIsOver(button("a"))
    moveTo(button("a"), { clientX: 31, clientY: 12 })
    pointerIsOver(screen.getByTestId("inside-a"))
    moveTo(button("a"))

    expect(onStop).not.toHaveBeenCalled()
    // Asked of the page where the pointer is
    expect(under).toHaveBeenCalledWith(31, 12)
  })

  it("does not start again when the pointer comes back without a new press", () => {
    const { onStart, onStop, press } = setup()

    press("a")
    pointerIsOver(null)
    moveTo(button("a"))
    pointerIsOver(button("a"))
    moveTo(button("a"))

    expect(onStart).toHaveBeenCalledTimes(1)
    expect(onStop).toHaveBeenCalledTimes(1)
    expect(screen.getByRole("status")).toHaveTextContent("none")
  })

  it("keeps the hold when another pointer moves off the control", () => {
    const { onStop, press } = setup()

    press("a")
    pointerIsOver(button("b"))
    moveTo(button("a"), { pointerId: 2, buttons: 0 })
    moveTo(button("a"), { pointerId: 2 })

    expect(onStop).not.toHaveBeenCalled()
  })

  // A captured pointer never leaves its control for the browser; one that
  // could not be captured does
  it("stops when a pointer it could not capture leaves the control", () => {
    const { onStop, press } = setup()

    press("a")
    fireEvent.pointerLeave(button("a"), { pointerId: 1 })
    expect(onStop).toHaveBeenCalledTimes(1)

    fireEvent.pointerUp(button("a"), { pointerId: 1 })
    expect(onStop).toHaveBeenCalledTimes(1)
  })

  it("gives the pointer back when the hold ends before its release, so the control it left shows no hover", () => {
    const capture = withPointerCapture()
    const { press } = setup()

    press("a")
    expect(capture.release).not.toHaveBeenCalled()
    pointerIsOver(null)
    moveTo(button("a"))

    expect(capture.release).toHaveBeenCalledExactlyOnceWith(1)
  })

  it("stops when the pointer leaves even when the app's onStart throws", () => {
    const swallow = (event: ErrorEvent) => event.preventDefault()
    window.addEventListener("error", swallow)
    const onStop = vi.fn()
    render(
      <Controls
        onStart={() => {
          throw new Error("the app failed after sending the jog")
        }}
        onStop={onStop}
      />,
    )

    try {
      fireEvent.pointerDown(button("a"), { button: 0, pointerId: 1 })
    } catch {
      // the app's error, passed on
    }
    pointerIsOver(null)
    moveTo(button("a"))

    expect(onStop).toHaveBeenCalledTimes(1)
    window.removeEventListener("error", swallow)
  })

  it("asks the control's own root what lies under the pointer, as the page only sees the host of a shadow tree", () => {
    const host = document.createElement("div")
    document.body.append(host)
    const shadow = host.attachShadow({ mode: "open" })
    const container = shadow.appendChild(document.createElement("div"))
    const onStop = vi.fn()
    render(<Controls onStart={vi.fn()} onStop={onStop} />, { container })
    const a = within(container).getByRole("button", { name: "a" })
    pointerIsOver(host)

    fireEvent.pointerDown(a, { button: 0, pointerId: 1 })
    pointerIsOver(a, shadow)
    moveTo(a)
    expect(onStop).not.toHaveBeenCalled()

    pointerIsOver(within(container).getByRole("button", { name: "b" }), shadow)
    moveTo(a)
    expect(onStop).toHaveBeenCalledTimes(1)
    host.remove()
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
