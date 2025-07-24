import { OrbitControls } from "@react-three/drei"
import { Canvas, type CanvasProps } from "@react-three/fiber"
import * as React from "react"
import { Vector3 } from "three"
import { PresetEnvironment } from "./components/3d-viewport/PresetEnvironment"

type Props = React.PropsWithChildren<
  CanvasProps & {
    cameraFov?: number
    cameraPosition?: Vector3
    controls?: boolean
    lights?: boolean
  }
>

export const Setup = ({
  children,
  cameraFov = 25,
  cameraPosition = new Vector3(-2, 1, 1),
  controls = true,
  lights = true,
  ...restProps
}: Props) => (
  <Canvas
    shadows
    camera={{ position: cameraPosition, fov: cameraFov }}
    {...restProps}
  >
    {children}
    {lights && (
      <>
        <PresetEnvironment />
      </>
    )}
    {controls && <OrbitControls makeDefault />}
  </Canvas>
)
