import { useGLTF } from "@react-three/drei"
import type { ThreeElements } from "@react-three/fiber"
import type { DHParameter, Pose } from "@wandelbots/nova-js/v2"
import type React from "react"
import { useEffect, useMemo, useState } from "react"
import type { Group, Mesh, Object3D } from "three"
import {
  chainOffsetRestFrame,
  isFlange,
  isRootPrismaticJoint,
  JOINT_REST_SUFFIX,
  parseRobotModel,
  prismaticJointRestFrame,
  revoluteJointRestFrame,
} from "./robotModelLogic"

export type RobotModelProps = {
  modelURL: string | Promise<string>
  /**
   * The motion group's DH chain, used to hoist each joint node's rest pose
   * into a static parent (see `revoluteJointRestFrame`,
   * `isRootPrismaticJoint` and `prismaticJointRestFrame`), so the animators
   * turn or slide a joint about its own axis. Without it the model's
   * hierarchy is drawn as it is.
   */
  dhParameters?: DHParameter[]
  /**
   * The transform between the motion group's base frame and the start of
   * its DH chain (the kinematic model's `kinematic_chain_offset`), hoisted
   * onto the root joint
   */
  kinematicChainOffset?: Pose | null
  /**
   * Called after a robot model has been loaded and
   * rendered into the threejs scene, when the components above it
   * (RobotAnimator, LinearAxisAnimator) have mounted
   */
  postModelRender?: () => void
  flangeRef?: React.Ref<Group>
} & ThreeElements["group"]

function isMesh(node: Object3D): node is Mesh {
  return node.type === "Mesh"
}

// Separate component that only renders when we have a valid URL
function LoadedRobotModel({
  url,
  flangeRef,
  postModelRender,
  dhParameters = [],
  kinematicChainOffset,
  ...props
}: {
  url: string
  flangeRef?: React.Ref<Group>
  postModelRender?: () => void
  dhParameters?: DHParameter[]
  kinematicChainOffset?: Pose | null
} & ThreeElements["group"]) {
  const gltfResult = useGLTF(url)
  const parsed = parseRobotModel(gltfResult, "robot.glb")
  const gltf = parsed.gltf

  const chainOffset = useMemo(
    () => chainOffsetRestFrame(kinematicChainOffset),
    [kinematicChainOffset],
  )

  // After the commit, not in a ref callback: the refs of the components
  // above (such as the animator, which poses the joints of the new model)
  // attach only after the refs of their children
  // biome-ignore lint/correctness/useExhaustiveDependencies: called again for a new model
  useEffect(() => {
    postModelRender?.()
  }, [url, postModelRender])

  function renderNode(node: Object3D): React.ReactNode {
    try {
      if (isMesh(node)) {
        // Defensive: only render mesh if geometry exists
        if ((node as Mesh).geometry) {
          return (
            <mesh
              name={node.name}
              key={node.uuid}
              geometry={(node as Mesh).geometry}
              material={(node as Mesh).material}
              position={node.position}
              rotation={node.rotation}
            />
          )
        }
        // Fallback to empty group if geometry is missing
        return (
          <group
            name={node.name}
            key={node.uuid}
            position={node.position}
            rotation={node.rotation}
          />
        )
      }

      if (isRootPrismaticJoint(node, dhParameters)) {
        // LinearAxisAnimator drives a prismatic joint by writing
        // `position.y = +/- q`, which replaces the node's authored translation
        // and slides it along the *parent's* Y. So the rest pose lives in a
        // static parent and the joint node starts at the identity, where that
        // write means "slide q along the rail". For the root joint that rest
        // pose is the authoritative `kinematic_chain_offset`, whatever the
        // export baked into the node (see `isRootPrismaticJoint`).
        return (
          <group
            name={`${node.name}${JOINT_REST_SUFFIX}`}
            key={node.uuid}
            position={chainOffset.position}
            quaternion={chainOffset.quaternion}
          >
            <group name={node.name}>{node.children.map(renderNode)}</group>
          </group>
        )
      }

      const prismaticRest = prismaticJointRestFrame(node, dhParameters)
      if (prismaticRest) {
        // Any further prismatic row of the chain: the same hoist, but its rest
        // pose is the authored one; only the root joint carries the chain
        // offset
        return (
          <group
            name={`${node.name}${JOINT_REST_SUFFIX}`}
            key={node.uuid}
            position={prismaticRest.position}
            quaternion={prismaticRest.quaternion}
          >
            <group name={node.name}>{node.children.map(renderNode)}</group>
          </group>
        )
      }

      const restFrame = revoluteJointRestFrame(
        node,
        dhParameters,
        kinematicChainOffset ? chainOffset : undefined,
      )
      if (restFrame) {
        // The animators drive a joint by writing `rotation.y = theta +/- q`,
        // which replaces the node's Euler-Y instead of composing onto it. So
        // the static rest rotation lives in a parent and the joint node keeps
        // a pure Ry(theta) the write can safely replace.
        return (
          <group
            name={`${node.name}${JOINT_REST_SUFFIX}`}
            key={node.uuid}
            position={restFrame.position}
            quaternion={restFrame.frame}
          >
            <group name={node.name} rotation={[0, restFrame.theta, 0]}>
              {node.children.map(renderNode)}
            </group>
          </group>
        )
      }

      return (
        <group
          name={node.name}
          key={node.uuid}
          position={node.position}
          rotation={node.rotation}
          ref={isFlange(node) ? flangeRef : undefined}
        >
          {node.children.map(renderNode)}
        </group>
      )
    } catch (e) {
      console.warn("Error rendering node", node.name, e)
      return null
    }
  }

  return (
    <group {...props} dispose={null}>
      {renderNode(gltf.scene)}
    </group>
  )
}

export function GenericRobot({
  modelURL,
  flangeRef,
  postModelRender,
  dhParameters,
  kinematicChainOffset,
  ...props
}: RobotModelProps) {
  const [resolvedURL, setResolvedURL] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const resolveURL = async () => {
      try {
        const url = typeof modelURL === "string" ? modelURL : await modelURL
        if (!cancelled) {
          setResolvedURL((prev: string | null) => (prev === url ? prev : url))
        }
      } catch (error) {
        console.error("Failed to resolve model URL:", error)
      }
    }

    resolveURL()
    return () => {
      cancelled = true
    }
  }, [modelURL])

  // Don't render until we have a resolved URL
  if (!resolvedURL) {
    return null // Loading state
  }

  return (
    <LoadedRobotModel
      url={resolvedURL}
      flangeRef={flangeRef}
      postModelRender={postModelRender}
      dhParameters={dhParameters}
      kinematicChainOffset={kinematicChainOffset}
      {...props}
    />
  )
}

export default GenericRobot
