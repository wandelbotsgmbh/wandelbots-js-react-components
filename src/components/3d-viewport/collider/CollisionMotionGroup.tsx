import type {
  CollisionMotionGroup,
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/wandelbots-js"
import * as THREE from "three"
import { DHRobot } from "../../robots/DHRobot"
import { getDHTransform } from "../../utils/dhParameter"
import ColliderCollection, {
  type MeshChildrenProvider,
} from "./ColliderCollection"

type CollisionMotionGroupElementProps = {
  name?: string
  motionGroup: CollisionMotionGroup
  rapidlyChangingMotionState: MotionGroupStateResponse
  dhParameters: DHParameter[]

  meshChildrenProvider: MeshChildrenProvider
}

export default function CollisionMotionGroupElement({
  name,
  motionGroup,
  rapidlyChangingMotionState,
  dhParameters,
  meshChildrenProvider,
}: CollisionMotionGroupElementProps) {
  const joints = rapidlyChangingMotionState.state.joint_position?.joints
  const jointTransform = new THREE.Matrix4()
  const jointTransforms = getJointTransforms()
  const toolTransform = jointTransform

  console.log(joints, jointTransforms)
  if (!joints) {
    return null
  }

  function getJointTransforms() {
    jointTransform.identity()

    return joints?.map((joint, jointIndex) => {
      jointTransform.multiply(getDHTransform(dhParameters[jointIndex], joint))
      return {
        position: new THREE.Vector3().applyMatrix4(jointTransform),
        rotation: new THREE.Euler().setFromRotationMatrix(jointTransform),
      }
    })
  }

  return (
    <group name={name} position={new THREE.Vector3(0, 0, -1)}>
      <DHRobot
        dhParameters={dhParameters}
        rapidlyChangingMotionState={rapidlyChangingMotionState}
      />
      {motionGroup.link_chain &&
        motionGroup.link_chain.map((chainSegment, jointIndex) => (
          <group name="robot" {...(jointTransforms ?? [])[jointIndex]}>
            <ColliderCollection
              colliders={chainSegment}
              meshChildrenProvider={meshChildrenProvider}
            />
          </group>
        ))}
      {motionGroup.tool && (
        <group
          name="tool"
          position={new THREE.Vector3(0, 0, 0).applyMatrix4(toolTransform)}
          rotation={new THREE.Euler().setFromRotationMatrix(toolTransform)}
        >
          <ColliderCollection
            colliders={motionGroup.tool}
            meshChildrenProvider={meshChildrenProvider}
          />
        </group>
      )}
    </group>
  )
}
