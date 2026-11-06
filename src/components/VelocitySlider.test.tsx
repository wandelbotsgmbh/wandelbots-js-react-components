import { render, screen } from "@testing-library/react"
import { expect, test, vi } from "vitest"
import type { JoggingStore } from "./jogging/JoggingStore"
import { VelocitySlider } from "./VelocitySlider"

// Without an I18nextProvider of the app, as an app uses the slider alone
test("VelocitySlider has the translations of the library when used alone", () => {
  const store = {
    showVelocityLegend: true,
    showVelocitySliderLabel: true,
  } as JoggingStore

  render(
    <VelocitySlider
      store={store}
      velocity={10}
      min={1}
      max={100}
      useDegree={false}
      onVelocityChange={vi.fn()}
    />,
  )

  // The legend, translated (not the key "Jogging.Velocity.bt")
  expect(screen.getByText("Velocity")).toBeInTheDocument()
})
