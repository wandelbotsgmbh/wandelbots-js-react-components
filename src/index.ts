import { externalizeComponent } from "./externalizeComponent"

export type * from "./components/wandelscript-editor/WandelscriptEditor"
import { WandelscriptEditor as WE } from "./components/wandelscript-editor/WandelscriptEditor"
export const WandelscriptEditor = externalizeComponent(WE)

export type * from "./components/robots/SupportedRobot"
import { SupportedRobot as SR } from "./components/robots/SupportedRobot"
export const SupportedRobot = externalizeComponent(SR)

export type * from "./components/robots/Robot"
import { Robot as R } from "./components/robots/Robot"
export const Robot = externalizeComponent(R)

export type * from "./components/3d-viewport/PresetEnvironment"
import { PresetEnvironment as PE } from "./components/3d-viewport/PresetEnvironment"
export const PresetEnvironment = externalizeComponent(PE)

export type * from "./components/3d-viewport/SafetyZonesRenderer"
import { SafetyZonesRenderer as SZR } from "./components/3d-viewport/SafetyZonesRenderer"
export const SafetyZonesRenderer = externalizeComponent(SZR)

export type * from "./components/jogging/JoggingCartesianAxisControl"
import { JoggingCartesianAxisControl as JCAC } from "./components/jogging/JoggingCartesianAxisControl"
export const JoggingCartesianAxisControl = externalizeComponent(JCAC)

export type * from "./components/jogging/JoggingJointRotationControl"
import { JoggingJointRotationControl as JJRC } from "./components/jogging/JoggingJointRotationControl"
export const JoggingJointRotationControl = externalizeComponent(JJRC)

export type { JoggingStore } from "./components/jogging/JoggingStore"
export type * from "./components/jogging/JoggingPanel"
import { JoggingPanel as JP } from "./components/jogging/JoggingPanel"
export const JoggingPanel = externalizeComponent(JP)

export type * from "./components/VelocitySlider"
import { VelocitySlider as VS } from "./components/VelocitySlider"
export const VelocitySlider = externalizeComponent(VS)

export * from "./components/utils/hooks"
export * from "./components/robots/AxisConfig"
