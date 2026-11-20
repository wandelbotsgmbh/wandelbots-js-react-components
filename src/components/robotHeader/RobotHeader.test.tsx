import { fireEvent, render, screen, within } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { RobotHeader, type RobotHeaderProps } from "./RobotHeader"

function setup(props: Partial<RobotHeaderProps> = {}) {
  const onMotionGroupChange = vi.fn()
  const all = (p: Partial<RobotHeaderProps>): RobotHeaderProps => ({
    appName: "Robot Pad",
    motionGroup: {
      options: [
        { id: "0@ur5e", label: "0@ur5e" },
        { id: "1@robotarm", label: "1@Robotarm" },
      ],
      value: "1@robotarm",
      onChange: onMotionGroupChange,
    },
    ...p,
  })
  const view = render(<RobotHeader {...all(props)} />)
  const rerender = (p: Partial<RobotHeaderProps>) =>
    view.rerender(<RobotHeader {...all({ ...props, ...p })} />)
  return { onMotionGroupChange, rerender }
}

const activation = () =>
  screen.getByRole("switch", { name: /Activat|Deactivat/ })

describe("RobotHeader", () => {
  it("shows the app's name and the selected motion group", () => {
    setup()

    expect(screen.getByRole("heading", { name: "Robot Pad" })).toBeVisible()
    expect(
      screen.getByRole("combobox", { name: "Motion group" }),
    ).toHaveTextContent("1@Robotarm")
  })

  it("lets the app change the motion group", () => {
    const { onMotionGroupChange } = setup()

    fireEvent.mouseDown(screen.getByRole("combobox", { name: "Motion group" }))
    fireEvent.click(
      within(screen.getByRole("listbox")).getByRole("option", {
        name: "0@ur5e",
      }),
    )
    expect(onMotionGroupChange).toHaveBeenCalledWith("0@ur5e")
  })

  it("switches to an app of the app menu", () => {
    const onClick = vi.fn()
    const onAppSelect = vi.fn()
    setup({
      apps: [
        { id: "home", name: "Homescreen", icon: null, onClick },
        { id: "settings", name: "Settings", icon: null },
      ],
      onAppSelect,
    })

    fireEvent.click(screen.getByRole("button", { name: "Apps" }))
    fireEvent.click(screen.getByRole("menuitem", { name: "Homescreen" }))
    expect(onClick).toHaveBeenCalled()
    expect(onAppSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "home" }),
    )
    expect(screen.queryByRole("menu")).toBeNull()
  })

  it("has a search button only when the app can search", () => {
    const onSearch = vi.fn()
    const { rerender } = setup()
    expect(screen.queryByRole("button", { name: "Search" })).toBeNull()

    rerender({ onSearch })
    fireEvent.click(screen.getByRole("button", { name: "Search" }))
    expect(onSearch).toHaveBeenCalled()
  })

  it("shows the activation of the robot as RobotPad does", () => {
    const onToggle = vi.fn()
    const { rerender } = setup({ activation: { state: "inactive", onToggle } })
    expect(screen.getByText("Activate")).toBeVisible()
    expect(activation()).not.toBeChecked()

    fireEvent.click(activation())
    expect(onToggle).toHaveBeenCalledTimes(1)

    // While it changes, the switch waits
    rerender({ activation: { state: "activating", onToggle } })
    expect(screen.getByText("Activating")).toBeVisible()
    expect(activation()).toBeDisabled()

    rerender({ activation: { state: "active", onToggle } })
    expect(screen.getByText("Activated")).toBeVisible()
    expect(activation()).toBeChecked()
    expect(activation()).toBeEnabled()

    rerender({ activation: { state: "deactivating", onToggle } })
    expect(screen.getByText("Deactivating")).toBeVisible()
    expect(activation()).toBeChecked()
    expect(activation()).toBeDisabled()
  })

  it("keeps the switch off while the robot cannot be activated", () => {
    setup({
      activation: { state: "inactive", disabled: true, onToggle: vi.fn() },
    })

    expect(activation()).toBeDisabled()
  })

  it("shows the app's own buttons at the right", () => {
    setup({ actions: <button type="button">Add robot</button> })

    expect(screen.getByRole("button", { name: "Add robot" })).toBeVisible()
  })
})
