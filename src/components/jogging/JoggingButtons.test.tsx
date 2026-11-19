import { fireEvent, render, screen } from "@testing-library/react"
import { I18nextProvider } from "react-i18next"
import { describe, expect, it, vi } from "vitest"
import { i18n } from "../../i18n/config"
import type { JogHandle } from "./jogHandle"
import { JoggingButtons } from "./JoggingButtons"

type Props = {
  motion?: "translate" | "rotate"
  activeHandle?: JogHandle | null
  disabled?: boolean
}

function setup(props: Props = {}) {
  const onJogStart = vi.fn()
  const onJogStop = vi.fn()
  const buttons = (p: Props) => (
    <I18nextProvider i18n={i18n}>
      <JoggingButtons onJogStart={onJogStart} onJogStop={onJogStop} {...p} />
    </I18nextProvider>
  )
  const view = render(buttons(props))
  const rerender = (p: Props) => view.rerender(buttons(p))
  return { onJogStart, onJogStop, rerender }
}

const button = (name: string) =>
  screen.getByRole("button", { name: `Jog ${name}` })

describe("JoggingButtons", () => {
  it("has a button for each direction of each axis, named like the gizmo's handles", () => {
    setup()

    for (const name of ["X-", "X+", "Y-", "Y+", "Z-", "Z+"]) {
      expect(button(name)).toBeVisible()
      expect(button(name)).toHaveTextContent(name)
    }
  })

  it("jogs along the held button's axis and direction until it is let go", () => {
    const { onJogStart, onJogStop } = setup()

    fireEvent.pointerDown(button("Y-"), { button: 0, pointerId: 1 })
    expect(onJogStart).toHaveBeenCalledWith("y", "-")
    expect(button("Y-")).toHaveAttribute("aria-pressed", "true")

    fireEvent.pointerUp(button("Y-"))
    expect(onJogStop).toHaveBeenCalledTimes(1)
    expect(button("Y-")).toHaveAttribute("aria-pressed", "false")
  })

  it("jogs while Space is held, so it works from the keyboard", () => {
    const { onJogStart, onJogStop } = setup()

    fireEvent.keyDown(button("Z+"), { key: " " })
    expect(onJogStart).toHaveBeenCalledWith("z", "+")

    fireEvent.keyUp(button("Z+"), { key: " " })
    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("in rotate mode, turns about the held button's axis, named like the rotate handles", () => {
    const { onJogStart } = setup({ motion: "rotate" })

    for (const name of ["Rx-", "Rx+", "Ry-", "Ry+", "Rz-", "Rz+"]) {
      expect(button(name)).toHaveTextContent(name)
    }
    expect(screen.queryByRole("button", { name: "Jog X+" })).toBeNull()

    fireEvent.pointerDown(button("Rx+"), { button: 0, pointerId: 1 })
    expect(onJogStart).toHaveBeenCalledWith("x", "+")
  })

  it("stops a running jog when the motion changes, so a translation never goes on as a rotation", () => {
    const { onJogStop, rerender } = setup({ motion: "translate" })

    fireEvent.pointerDown(button("X+"), { button: 0, pointerId: 1 })
    rerender({ motion: "rotate" })

    expect(onJogStop).toHaveBeenCalledTimes(1)
    expect(button("Rx+")).toHaveAttribute("aria-pressed", "false")
  })

  it("shows the active handle as pressed while no button is held, e.g. a running step", () => {
    setup({ activeHandle: { axis: "x", direction: "+" } })

    expect(button("X+")).toHaveAttribute("aria-pressed", "true")
    expect(button("X-")).toHaveAttribute("aria-pressed", "false")
  })

  it("does not jog while disabled", () => {
    const { onJogStart } = setup({ disabled: true })

    expect(button("X+")).toBeDisabled()
    fireEvent.pointerDown(button("X+"), { button: 0, pointerId: 1 })
    expect(onJogStart).not.toHaveBeenCalled()
  })
})
