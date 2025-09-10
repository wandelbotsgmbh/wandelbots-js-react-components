import type { ThreeElements } from "@react-three/fiber"
import type { Collider } from "@wandelbots/nova-api/v1"
import ColliderElement from "./ColliderElement"

export type MeshChildrenProvider = (
  key: string,
  collider: Collider,
) => React.ReactNode

type ColliderCollectionProps = {
  name?: string
  colliders: Record<string, Collider>
  meshChildrenProvider: MeshChildrenProvider
} & ThreeElements["group"]

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
