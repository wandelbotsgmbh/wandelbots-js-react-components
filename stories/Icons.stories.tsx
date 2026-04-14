import type { Meta, StoryObj } from "@storybook/react"
import type { ComponentType } from "react"
import {
  ControllerTypePhysicalIcon,
  ControllerTypeVirtualIcon,
  OperationModeAutomaticIcon,
  OperationModeErrorIcon,
  OperationModeManualIcon,
  SafetyStateErrorIcon,
  SafetyStateEstopIcon,
  SafetyStateManualActionRequiredIcon,
  SafetyStateNormalIcon,
  SafetyStateStopIcon,
} from "../src/components/safetyBar/icons"
import {
  AxisXIcon,
  AxisYIcon,
  AxisZIcon,
  HomeIcon,
  JogMinusIcon,
  JogPlusIcon,
  JoggingIcon,
  OrientationCoordSystemIcon,
  OrientationToolIcon,
  RobotIcon,
  RotationIcon,
} from "../src/icons/index"

const icons: Record<string, ComponentType<{ style?: React.CSSProperties }>> = {
  AxisXIcon,
  AxisYIcon,
  AxisZIcon,
  HomeIcon,
  JogMinusIcon,
  JogPlusIcon,
  JoggingIcon,
  OrientationCoordSystemIcon,
  OrientationToolIcon,
  RobotIcon,
  RotationIcon,
  ControllerTypePhysicalIcon,
  ControllerTypeVirtualIcon,
  OperationModeAutomaticIcon,
  OperationModeErrorIcon,
  OperationModeManualIcon,
  SafetyStateErrorIcon,
  SafetyStateEstopIcon,
  SafetyStateManualActionRequiredIcon,
  SafetyStateNormalIcon,
  SafetyStateStopIcon,
}

const IconGallery = () => (
  <>
    <style>{`.icon-gallery svg, .icon-gallery path { fill: #FFFFFF !important; }`}</style>
    <div
      className="icon-gallery"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 16,
        background: "#020617",
        padding: 24,
        borderRadius: 12,
      }}
    >
      {Object.entries(icons).map(([name, Icon]) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: 12,
            borderRadius: 8,
            border: "1px solid rgba(142, 86, 252, 0.24)",
            background: "rgba(142, 86, 252, 0.06)",
            minHeight: 80,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
            }}
          >
            <Icon style={{ fontSize: 32 }} />
          </div>
          <span
            style={{
              fontSize: 11,
              textAlign: "center",
              wordBreak: "break-all",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  </>
)

const meta: Meta = {
  title: "Components/Icons",
  component: IconGallery,
  tags: ["!dev"],
  parameters: {
    layout: "padded",
  },
}

export default meta

type Story = StoryObj

export const Interactive: Story = {}
