import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import type { RefObject } from "react"
import { I18nextProvider } from "react-i18next"
import { Quaternion } from "three"
import { afterEach, describe, expect, it, vi } from "vitest"
import { i18n } from "../../../i18n/config"
import { JoggingGizmo } from "./JoggingGizmo"

function setup({
  disabled = false,
  orientation = { current: new Quaternion() },
  motion,
}: {
  disabled?: boolean
  orientation?: RefObject<Quaternion | null>
  motion?: "translate" | "rotate"
} = {}) {
  const onJogStart = vi.fn()
  const onJogStop = vi.fn()
  const gizmo = (props: { motion?: "translate" | "rotate" }) => (
    <I18nextProvider i18n={i18n}>
      <JoggingGizmo
        orientation={orientation}
        onJogStart={onJogStart}
        onJogStop={onJogStop}
        disabled={disabled}
        {...props}
      />
    </I18nextProvider>
  )
  const view = render(gizmo({ motion }))
  const rerender = (props: { motion?: "translate" | "rotate" }) =>
    view.rerender(gizmo(props))
  return { onJogStart, onJogStop, rerender }
}

afterEach(() => {
  vi.useRealTimers()
})

describe("JoggingGizmo", () => {
  it("has a handle for each direction of each axis", () => {
    setup()

    for (const name of ["X+", "X-", "Y+", "Y-", "Z+", "Z-"]) {
      expect(screen.getByRole("button", { name: `Jog ${name}` })).toBeVisible()
    }
  })

  it("jogs along the held handle's axis and direction until it is let go", () => {
    const { onJogStart, onJogStop } = setup()
    const handle = screen.getByRole("button", { name: "Jog Y-" })

    fireEvent.pointerDown(handle, { button: 0, pointerId: 1 })
    expect(onJogStart).toHaveBeenCalledWith("y", "-")
    expect(handle).toHaveAttribute("aria-pressed", "true")

    fireEvent.pointerUp(handle)
    expect(onJogStop).toHaveBeenCalledTimes(1)
    expect(handle).toHaveAttribute("aria-pressed", "false")
  })

  it("in rotate mode, has a handle for each direction of each axis, named like the rotate buttons", () => {
    setup({ motion: "rotate" })

    for (const name of ["Rx+", "Rx-", "Ry+", "Ry-", "Rz+", "Rz-"]) {
      expect(screen.getByRole("button", { name: `Jog ${name}` })).toBeVisible()
    }
    expect(screen.queryByRole("button", { name: "Jog X+" })).toBeNull()
  })

  it("in rotate mode, turns about the held handle's axis until it is let go", () => {
    const { onJogStart, onJogStop } = setup({ motion: "rotate" })
    const handle = screen.getByRole("button", { name: "Jog Rz-" })

    fireEvent.pointerDown(handle, { button: 0, pointerId: 1 })
    expect(onJogStart).toHaveBeenCalledWith("z", "-")
    expect(handle).toHaveAttribute("aria-pressed", "true")

    fireEvent.pointerUp(handle)
    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("stops a running jog when the motion changes, so a translation never goes on as a rotation", () => {
    const { onJogStop, rerender } = setup({ motion: "translate" })

    fireEvent.pointerDown(screen.getByRole("button", { name: "Jog X+" }), {
      button: 0,
      pointerId: 1,
    })
    rerender({ motion: "rotate" })

    expect(onJogStop).toHaveBeenCalledTimes(1)
    expect(screen.getByRole("button", { name: "Jog Rx+" })).toHaveAttribute(
      "aria-pressed",
      "false",
    )
  })

  it("does not jog while disabled", () => {
    const { onJogStart } = setup({ disabled: true })
    const handle = screen.getByRole("button", { name: "Jog X+" })

    expect(handle).toBeDisabled()
    fireEvent.pointerDown(handle, { button: 0, pointerId: 1 })
    expect(onJogStart).not.toHaveBeenCalled()
  })

  it("stays disabled until it has an orientation, so its arrows never point the wrong way", async () => {
    const orientation: RefObject<Quaternion | null> = { current: null }
    const { onJogStart } = setup({ orientation })
    const handle = screen.getByRole("button", { name: "Jog X+" })

    expect(handle).toBeDisabled()
    fireEvent.pointerDown(handle, { button: 0, pointerId: 1 })
    expect(onJogStart).not.toHaveBeenCalled()

    // What JoggingGizmoOrientation does from the app's 3D scene
    orientation.current = new Quaternion()
    await waitFor(() => expect(handle).toBeEnabled())
  })

  it("says what is missing when no orientation arrives", () => {
    vi.useFakeTimers()
    const warn = vi.mocked(console.warn)
    warn.mockClear()

    setup({ orientation: { current: null } })
    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("JoggingGizmoOrientation"),
    )
  })
})
