import type { GroupProps } from "@react-three/fiber"
import type { Collider } from "@wandelbots/wandelbots-js"
import ColliderElement from "./ColliderElement"

export type MeshChildrenProvider = (
  key: string,
  collider: Collider,
) => React.ReactNode

type ColliderCollectionProps = {
  name?: string
  colliders: Record<string, Collider>
  meshChildrenProvider: MeshChildrenProvider
} & GroupProps

export default function ColliderCollection({
  name,
  colliders,
  meshChildrenProvider,
  ...props
}: ColliderCollectionProps) {
  return (
    <group name={name} {...props}>
      {Object.entries(colliders).map(([colliderKey, collider]) => (
        <ColliderElement
          key={colliderKey}
          name={colliderKey}
          collider={collider}
          children={meshChildrenProvider(colliderKey, collider)}
        />
      ))}
    </group>
  )
}
