import type { Collider } from "@wandelbots/wandelbots-js"
import type React from "react"
import ColliderElement from "./ColliderElement"

type ToolElementProps = {
  name?: string
  collider: Collider
  children?: React.ReactNode
}

export default function ToolElement({
  name,
  collider,
  children,
}: ToolElementProps) {
  return <ColliderElement name={name} collider={collider} children={children} />
}
