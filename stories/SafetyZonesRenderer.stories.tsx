import type { Meta, StoryObj } from "@storybook/react-vite"
import { Vector3 } from "three"
import { SafetyZonesRenderer } from "../src"
import { Setup } from "../src/Setup"
import {
  dhParams,
  safetyZonesCapsule,
  safetyZonesHull,
  safetyZonesLozenge,
  safetyZonesPlane,
  safetyZonesPrism,
  safetyZonesSphere,
} from "./robots/safetyZones"

const meta: Meta<typeof SafetyZonesRenderer> = {
  tags: ["!dev"],
  title: "3D View/SafetyZonesRenderer",
  component: SafetyZonesRenderer,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Setup cameraPosition={new Vector3(0, 0, 10)}>
          <group position={[0, 0, 0]}>
            <Story />
          </group>
        </Setup>
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof SafetyZonesRenderer>

function SafetyZonesRendererScene(
  props: React.ComponentProps<typeof SafetyZonesRenderer>,
) {

  return (
    <SafetyZonesRenderer {...props} />
  )
}
export const SafetyZoneRenderer = {
  args: {
    safetyZones: {
      ...safetyZonesPlane,
      ...safetyZonesCapsule,
      ...safetyZonesHull,
      ...safetyZonesPrism,
      ...safetyZonesLozenge,
      ...safetyZonesSphere,
    },
    dhParameters: dhParams
  },
  render: (args) => <SafetyZonesRendererScene {...args} />,
  name: "Safety Zones",
} satisfies Story