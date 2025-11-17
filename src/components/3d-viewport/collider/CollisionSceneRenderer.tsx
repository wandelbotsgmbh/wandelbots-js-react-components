import type { CollisionScene } from "@wandelbots/nova-js/v1"
import ColliderCollection, {
  type MeshChildrenProvider,
} from "./ColliderCollection"

type CollisionSceneRendererProps = {
  scene: CollisionScene
  meshChildrenProvider: MeshChildrenProvider
}

export default function CollisionSceneRenderer({
  scene,
  meshChildrenProvider,
}: CollisionSceneRendererProps) {
  const colliders = scene.colliders
  return (
    <group>
      {colliders && (
        <ColliderCollection
          meshChildrenProvider={meshChildrenProvider}
          colliders={colliders}
        />
      )}
    </group>
  )
}
