import type {
  CollisionScene,
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/wandelbots-js"
import * as THREE from "three"
import ColliderCollection, {
  type MeshChildrenProvider,
} from "./ColliderCollection"
import CollisionMotionGroupElement from "./CollisionMotionGroup"

type MotionGroupData = {
  state: MotionGroupStateResponse
  dhParameters: DHParameter[]
  mountingPosition: THREE.Vector3
}

type CollisionSceneElementProps = {
  scene: CollisionScene
  meshChildrenProvider: MeshChildrenProvider
  motionGroupStates: Record<string, MotionGroupData>
}

export default function CollisionSceneElement({
  scene,
  motionGroupStates,
  meshChildrenProvider,
}: CollisionSceneElementProps) {
  const colliders = scene.colliders
  const motionGroups = scene.motion_groups ?? {}
  return (
    <group>
      {colliders && (
        <ColliderCollection
          meshChildrenProvider={meshChildrenProvider}
          colliders={colliders}
        />
      )}
      {Object.entries(motionGroups)
        .filter(
          ([motionGroupKey, _]) =>
            motionGroupStates[motionGroupKey] !== undefined,
        )
        .map(([motionGroupKey, motionGroup]) => (
          <CollisionMotionGroupElement
            key={motionGroupKey}
            name={motionGroupKey}
            motionGroup={motionGroup}
            mountingPosition={
              motionGroupStates[motionGroupKey].mountingPosition
            }
            dhParameters={motionGroupStates[motionGroupKey].dhParameters}
            meshChildrenProvider={meshChildrenProvider}
            rapidlyChangingMotionState={motionGroupStates[motionGroupKey].state}
          />
        ))}
    </group>
  )
}
