import { fireEvent, render, screen } from "@testing-library/react"
import { useState } from "react"
import { I18nextProvider } from "react-i18next"
import { describe, expect, it, vi } from "vitest"
import { i18n } from "../../i18n/config"
import type { JogMotion, RobotControlVelocity } from "./RobotControlPanel"
import { VelocityRow } from "./VelocityRow"

const MM_PER_S: RobotControlVelocity = { value: 125, min: 1, max: 250 }
// 10 °/s, of 1 to 60 °/s, as the hook gives a store's limits: in rad/s
const RAD_PER_S: RobotControlVelocity = {
  value: Math.PI / 18,
  min: 1 * (Math.PI / 180),
  max: 60 * (Math.PI / 180),
}

type RowProps = {
  motion?: JogMotion
  velocity?: RobotControlVelocity
  disabled?: boolean
}

/** The row in an app that takes every velocity the row reports */
function setup(props: RowProps = {}) {
  const onChange = vi.fn()
  function App({
    motion = "translate",
    velocity = motion === "rotate" ? RAD_PER_S : MM_PER_S,
    disabled = false,
  }: RowProps) {
    const [values, setValues] = useState<Partial<Record<JogMotion, number>>>({})
    return (
      <I18nextProvider i18n={i18n}>
        <VelocityRow
          motion={motion}
          velocity={{ ...velocity, value: values[motion] ?? velocity.value }}
          onChange={(value) => {
            onChange(value)
            setValues({ ...values, [motion]: value })
          }}
          disabled={disabled}
        />
      </I18nextProvider>
    )
  }
  const view = render(<App {...props} />)
  return {
    onChange,
    rerender: (next: RowProps) => view.rerender(<App {...props} {...next} />),
  }
}

const field = () => screen.getByRole("textbox", { name: "Velocity" })
const slider = () => screen.getByRole("slider", { name: "Velocity" })
const type = (text: string) =>
  fireEvent.change(field(), { target: { value: text } })
const pressKey = (key: string) => fireEvent.keyDown(field(), { key })

describe("VelocityRow", () => {
  it("shows the velocity in a field named Velocity, with its unit, above the slider", () => {
    setup()

    expect(field()).toHaveValue("125")
    expect(field()).toHaveAttribute("aria-invalid", "false")
    expect(screen.getByText("mm/s")).toBeVisible()
    expect(slider()).toHaveAttribute("aria-valuenow", "125")
  })

  it("applies a typed velocity on Enter, and the slider follows", () => {
    const { onChange } = setup()

    type("30")
    // Typed, not applied yet
    expect(onChange).not.toHaveBeenCalled()
    pressKey("Enter")

    expect(onChange).toHaveBeenCalledExactlyOnceWith(30)
    expect(field()).toHaveValue("30")
    expect(slider()).toHaveAttribute("aria-valuenow", "30")
  })

  it("applies a typed velocity when the field is left", () => {
    const { onChange } = setup()

    type("40")
    fireEvent.blur(field())

    expect(onChange).toHaveBeenCalledExactlyOnceWith(40)
    expect(field()).toHaveValue("40")
  })

  it("selects the velocity when the field gets the focus, so typing replaces it, and applies nothing when the field is left as it was", () => {
    const { onChange } = setup()
    const input = field() as HTMLInputElement

    fireEvent.focus(input)
    expect([input.selectionStart, input.selectionEnd]).toEqual([0, 3])

    fireEvent.blur(input)
    pressKey("Enter")
    expect(onChange).not.toHaveBeenCalled()
  })

  it("takes a comma as the decimal separator", () => {
    const { onChange } = setup()

    type("12,5")
    pressKey("Enter")

    expect(onChange).toHaveBeenCalledExactlyOnceWith(12.5)
    expect(field()).toHaveValue("12.5")
  })

  it("follows the slider", () => {
    const { onChange } = setup()

    fireEvent.change(slider(), { target: { value: 31 } })

    expect(onChange).toHaveBeenCalledExactlyOnceWith(31)
    expect(field()).toHaveValue("31")
  })

  it("flags a velocity out of range on the field, and neither applies nor corrects it", () => {
    const { onChange } = setup()

    type("999")
    expect(field()).toHaveAccessibleDescription(
      "Enter a value between 1 mm/s and 250 mm/s",
    )
    expect(field()).toHaveAttribute("aria-invalid", "true")

    pressKey("Enter")
    fireEvent.blur(field())
    expect(onChange).not.toHaveBeenCalled()
    expect(field()).toHaveValue("999")
    expect(field()).toHaveAttribute("aria-invalid", "true")
    expect(slider()).toHaveAttribute("aria-valuenow", "125")
  })

  it("lets the slider replace a refused velocity, and its error goes", () => {
    setup()
    type("999")

    fireEvent.change(slider(), { target: { value: 31 } })

    expect(field()).toHaveValue("31")
    expect(field()).toHaveAttribute("aria-invalid", "false")
    expect(field()).toHaveAccessibleDescription("")
  })

  it("flags text that is no number, and Escape shows the applied velocity again", () => {
    const { onChange } = setup()

    type("abc")
    expect(field()).toHaveAccessibleDescription("Enter a number")
    expect(field()).toHaveAttribute("aria-invalid", "true")
    type("")
    expect(field()).toHaveAccessibleDescription("Enter a number")

    pressKey("Escape")
    expect(field()).toHaveValue("125")
    expect(field()).toHaveAttribute("aria-invalid", "false")
    expect(field()).toHaveAccessibleDescription("")
    expect(onChange).not.toHaveBeenCalled()
  })

  it("shows a rotation in °/s with its own range, and reports it in rad/s", () => {
    const { onChange } = setup({ motion: "rotate" })
    expect(field()).toHaveValue("10")
    expect(screen.getByText("°/s")).toBeVisible()

    type("90")
    expect(field()).toHaveAccessibleDescription(
      "Enter a value between 1°/s and 60°/s",
    )
    pressKey("Enter")
    expect(onChange).not.toHaveBeenCalled()

    type("45")
    pressKey("Enter")
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0]?.[0]).toBeCloseTo(Math.PI / 4, 12)
    expect(field()).toHaveValue("45")
    expect(field()).toHaveAttribute("aria-invalid", "false")
  })

  // 60 °/s as rad/s and back is 59.99999999999999 °/s
  it("takes the limit itself, in the field and on the slider, though rad/s in °/s is not exact", () => {
    const { onChange } = setup({ motion: "rotate" })
    expect(slider()).toHaveAttribute("aria-valuemin", "1")
    expect(slider()).toHaveAttribute("aria-valuemax", "60")

    type("60")
    expect(field()).toHaveAttribute("aria-invalid", "false")
    pressKey("Enter")
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(field()).toHaveValue("60")
  })

  // 99 °/s is a hair more in rad/s when computed as the row does than as the
  // limit here, and 3 °/s a hair less
  it("reports the app's own limit for a limit that was typed, not a velocity beyond it", () => {
    const velocity = {
      value: Math.PI / 18,
      min: 3 * (Math.PI / 180),
      max: 99 * (Math.PI / 180),
    }
    const { onChange } = setup({ motion: "rotate", velocity })

    type("99")
    pressKey("Enter")
    expect(onChange).toHaveBeenLastCalledWith(velocity.max)

    type("3")
    pressKey("Enter")
    expect(onChange).toHaveBeenLastCalledWith(velocity.min)
  })

  it("drops a typed velocity when the row shows another motion", () => {
    const { rerender } = setup()
    type("200")

    // 200 is no rotation velocity, and nobody typed it for one
    rerender({ motion: "rotate" })
    expect(field()).toHaveValue("10")
    expect(field()).toHaveAttribute("aria-invalid", "false")
  })

  it("takes no typing while disabled", () => {
    setup({ disabled: true })

    expect(field()).toBeDisabled()
    expect(slider()).toBeDisabled()
  })
})
