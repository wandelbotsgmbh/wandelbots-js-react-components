import type {
  CollisionScene,
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/wandelbots-js"
import ColliderCollection, {
  type MeshChildrenProvider,
} from "./ColliderCollection"
import CollisionMotionGroupElement from "./CollisionMotionGroup"

type CollisionSceneElementProps = {
  scene: CollisionScene
  meshChildrenProvider: MeshChildrenProvider
  rapidlyChangingMotionStates: Record<string, MotionGroupStateResponse>
}

export default function CollisionSceneElement({
  scene,
  rapidlyChangingMotionStates,
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
      {Object.entries(motionGroups).map(([motionGroupKey, motionGroup]) => (
        <CollisionMotionGroupElement
          key={motionGroupKey}
          name={motionGroupKey}
          motionGroup={motionGroup}
          dhParameters={dhParameters}
          meshChildrenProvider={meshChildrenProvider}
          rapidlyChangingMotionState={
            rapidlyChangingMotionStates[motionGroupKey]
          }
        />
      ))}
    </group>
  )
}

const dhParameters: DHParameter[] = [
  {
    a: 0,
    d: 290,
    alpha: -1.5707963267948966,
    theta: 0,
    reverse_rotation_direction: false,
  },
  {
    a: 270,
    d: 0,
    alpha: 0,
    theta: -1.5707963267948966,
    reverse_rotation_direction: false,
  },
  {
    a: 70,
    d: 0,
    alpha: -1.5707963267948966,
    theta: 0,
    reverse_rotation_direction: false,
  },
  {
    a: 0,
    d: 302,
    alpha: 1.5707963267948966,
    theta: 0,
    reverse_rotation_direction: false,
  },
  {
    a: 0,
    d: 0,
    alpha: -1.5707963267948966,
    theta: 0,
    reverse_rotation_direction: false,
  },
  {
    a: 0,
    d: 72,
    alpha: 0,
    theta: -3.1415926535897931,
    reverse_rotation_direction: false,
  },
]
