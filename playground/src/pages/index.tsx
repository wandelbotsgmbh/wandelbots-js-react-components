import { Jog } from "@wandelbots/icons/Jog"
import { JointKinematics } from "@wandelbots/icons/JointKinematics"
import { Robot } from "@wandelbots/icons/Robot"
import { RobotArm } from "@wandelbots/icons/RobotArm"
import { SafetyStateNormal } from "@wandelbots/icons/SafetyStateNormal"
import { SpaceDashboardFilled } from "@wandelbots/icons/SpaceDashboardFilled"
import { ViewModuleFilled } from "@wandelbots/icons/ViewModuleFilled"
import type { RobotSession } from "@wandelbots/wandelbots-js-react-components"
import type { FC, ReactNode } from "react"
import type { PlaygroundInstance } from "../instance"
import { BuildingBlocksPage } from "./BuildingBlocksPage"
import { GhostsPage } from "./GhostsPage"
import { JoggingPage } from "./JoggingPage"
import { JointLimitsPage } from "./JointLimitsPage"
import { LayoutsPage } from "./LayoutsPage"
import { ModelsPage } from "./ModelsPage"
import { SafetyPage } from "./SafetyPage"

/** Every page gets the instance and the session of the top bar's motion group */
export type PageProps = {
  instance: PlaygroundInstance
  session: RobotSession
  /** All motion groups of the cell, for a page with a select of its own */
  motionGroupIds: string[]
  /** Selects another motion group, as the top bar's select does */
  onMotionGroupChange: (motionGroupId: string) => void
  /** Opens another page, as the top bar's app menu does */
  onPageChange: (page: PageId) => void
}

type Page = {
  /** The value of `?page=` in the URL */
  id: string
  name: string
  icon: ReactNode
  Component: FC<PageProps>
}

/** The pages of the playground, in the order of the app menu */
export const PAGES = [
  { id: "jogging", name: "Jogging", icon: <Jog />, Component: JoggingPage },
  {
    id: "joint-limits",
    name: "Joint limits",
    icon: <JointKinematics />,
    Component: JointLimitsPage,
  },
  {
    id: "safety",
    name: "Safety and collisions",
    icon: <SafetyStateNormal />,
    Component: SafetyPage,
  },
  {
    id: "models",
    name: "Robot models",
    icon: <RobotArm />,
    Component: ModelsPage,
  },
  {
    id: "ghosts",
    name: "Ghosts",
    icon: <Robot />,
    Component: GhostsPage,
  },
  {
    id: "layouts",
    name: "Layouts",
    icon: <SpaceDashboardFilled />,
    Component: LayoutsPage,
  },
  {
    id: "building-blocks",
    name: "Building blocks",
    icon: <ViewModuleFilled />,
    Component: BuildingBlocksPage,
  },
] as const satisfies readonly Page[]

export type PageId = (typeof PAGES)[number]["id"]

export function isPageId(value: unknown): value is PageId {
  return PAGES.some((page) => page.id === value)
}

export function pageById(id: PageId): Page {
  return PAGES.find((page) => page.id === id) ?? PAGES[0]
}
