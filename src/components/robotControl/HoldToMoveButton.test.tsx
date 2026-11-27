import { act, fireEvent, render, screen } from "@testing-library/react"
import { I18nextProvider } from "react-i18next"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { i18n } from "../../i18n/config"
import { HoldToMoveButton } from "./HoldToMoveButton"
import type { RobotControlMoveState } from "./RobotControlPanel"

type Props = {
  state?: RobotControlMoveState
  atPose?: boolean
}

function setup(props: Props = {}) {
  const onMoveStart = vi.fn()
  const onMoveStop = vi.fn()
  const moveTo = (p: Props) => (
    <I18nextProvider i18n={i18n}>
      <HoldToMoveButton
        state={p.state ?? "planned"}
        ready
        atPose={p.atPose ?? false}
        disabled={false}
        onMoveStart={onMoveStart}
        onMoveStop={onMoveStop}
      />
    </I18nextProvider>
  )
  const view = render(moveTo(props))
  const rerender = (p: Props) => view.rerender(moveTo({ ...props, ...p }))
  return { onMoveStart, onMoveStop, rerender }
}

const button = () =>
  screen.getByRole("button", { name: /^(Move to|Moving…|Stopping…)$/ })
/** The element around the button, which holds: it stays when the button turns off */
const wrapper = () => button().parentElement as HTMLElement

const press = () => fireEvent.pointerDown(button(), { button: 0, pointerId: 1 })
const release = () => fireEvent.pointerUp(button(), { pointerId: 1 })
/** A move of the holding pointer, its primary button still down */
const move = () =>
  fireEvent.pointerMove(wrapper(), { pointerId: 1, buttons: 1 })
const wait = (ms: number) =>
  act(() => {
    vi.advanceTimersByTime(ms)
  })

/**
 * Says which element lies under the pointer, as the page does in a browser:
 * jsdom lays nothing out, and has no elementFromPoint
 */
function pointerIsOver(element: Element | null) {
  document.elementFromPoint = () => element
}

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  Reflect.deleteProperty(document, "elementFromPoint")
})

describe("HoldToMoveButton", () => {
  it("starts the move once it was held for 200 ms, and stops it on the release", () => {
    const { onMoveStart, onMoveStop } = setup()

    press()
    wait(199)
    expect(onMoveStart).not.toHaveBeenCalled()
    wait(1)
    expect(onMoveStart).toHaveBeenCalledTimes(1)

    release()
    expect(onMoveStop).toHaveBeenCalledTimes(1)
  })

  it("stops the move when the pointer leaves the button, as on a release, and stops it once", () => {
    const { onMoveStart, onMoveStop, rerender } = setup()

    press()
    wait(250)
    rerender({ state: "moving" })
    pointerIsOver(button())
    move()
    expect(onMoveStop).not.toHaveBeenCalled()

    pointerIsOver(document.body)
    move()
    expect(onMoveStop).toHaveBeenCalledTimes(1)
    expect(button()).toHaveAttribute("aria-pressed", "false")

    // Back on the button without a new press, and the release that still comes
    pointerIsOver(button())
    move()
    release()
    wait(250)
    expect(onMoveStart).toHaveBeenCalledTimes(1)
    expect(onMoveStop).toHaveBeenCalledTimes(1)
  })

  it("never starts a move when the pointer leaves the button within the 200 ms", () => {
    const { onMoveStart, onMoveStop } = setup()

    press()
    wait(100)
    pointerIsOver(document.body)
    move()
    wait(500)

    expect(onMoveStart).not.toHaveBeenCalled()
    expect(onMoveStop).not.toHaveBeenCalled()
  })

  it("goes on at the target, where the button turns off, until the pointer leaves", () => {
    const { onMoveStop, rerender } = setup()

    press()
    wait(250)
    rerender({ state: "moving", atPose: true })
    expect(button()).toBeDisabled()
    // A button that is off takes no pointer: what lies under it is the
    // element around it
    pointerIsOver(wrapper())
    move()
    expect(onMoveStop).not.toHaveBeenCalled()

    pointerIsOver(document.body)
    move()
    expect(onMoveStop).toHaveBeenCalledTimes(1)
  })

  it("does not move from the keyboard: Space or Enter held on the focused button start nothing", () => {
    const { onMoveStart } = setup()

    // Still reached by the keyboard, and named
    button().focus()
    expect(button()).toHaveFocus()
    fireEvent.keyDown(button(), { key: " " })
    wait(500)
    fireEvent.keyUp(button(), { key: " " })
    fireEvent.keyDown(button(), { key: "Enter" })
    wait(500)

    expect(onMoveStart).not.toHaveBeenCalled()
    expect(button()).toHaveAttribute("aria-pressed", "false")
  })
})
