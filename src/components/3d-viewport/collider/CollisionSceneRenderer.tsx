import type { CollisionSetup } from "@wandelbots/nova-js/v2"
import ColliderCollection, {
  type MeshChildrenProvider,
} from "./ColliderCollection"

type CollisionSceneRendererProps = {
  scene: CollisionSetup
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
