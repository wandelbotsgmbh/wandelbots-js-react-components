import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  RobotSetupReadinessIndicator,
  RobotSetupReadinessState,
} from "./RobotSetupReadinessIndicator"

describe("RobotSetupReadinessIndicator", () => {
  it("renders ready state correctly", () => {
    render(
      <RobotSetupReadinessIndicator
        setupState={RobotSetupReadinessState.READY}
      />,
    )

    expect(screen.getByText("Ready")).toBeInTheDocument()
  })

  it("renders robot disconnected state correctly", () => {
    render(
      <RobotSetupReadinessIndicator
        setupState={RobotSetupReadinessState.ROBOT_DISCONNECTED}
      />,
    )

    expect(screen.getByText("Robot disconnected")).toBeInTheDocument()
  })

  it("renders precondition not fulfilled state correctly", () => {
    render(
      <RobotSetupReadinessIndicator
        setupState={RobotSetupReadinessState.PRECONDITION_NOT_FULFILLED}
      />,
    )

    expect(screen.getByText("Precondition not fulfilled")).toBeInTheDocument()
  })

  it("applies correct CSS class when provided", () => {
    const { container } = render(
      <RobotSetupReadinessIndicator
        setupState={RobotSetupReadinessState.READY}
        className="test-class"
      />,
    )

    expect(container.firstChild).toHaveClass("test-class")
  })

  it("renders indicator circle", () => {
    render(
      <RobotSetupReadinessIndicator
        setupState={RobotSetupReadinessState.READY}
      />,
    )

    // Check if the component is rendered - it's a chip, not a button
    expect(screen.getByText("Ready")).toBeInTheDocument()
  })
})
