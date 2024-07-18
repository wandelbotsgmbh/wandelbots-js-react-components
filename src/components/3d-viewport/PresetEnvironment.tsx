import { Environment, Lightformer } from "@react-three/drei"

/**
 * Renders a preset environment for the 3D scene.
 * This component wraps the scene with an `Environment` component
 * and builds a lightmap build with `Lightformers`.
 */
export function PresetEnvironment() {
  return (
    <Environment>
      <Lightformers />
    </Environment>
  )
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  return (
    <>
      {/* Ceiling */}
      <Lightformer
        intensity={5}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <group rotation={[0, 0.5, 0]}>
        <group>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={5}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[3, 1, 1]}
            />
          ))}
        </group>
      </group>
      {/* Sides */}
      <Lightformer
        intensity={40}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
      />
      <Lightformer
        intensity={20}
        rotation-y={-Math.PI}
        position={[-5, -2, -1]}
        scale={[20, 0.1, 1]}
      />

      <Lightformer
        rotation-y={Math.PI / 2}
        position={[-5, -1, -1]}
        scale={[20, 0.5, 1]}
        intensity={5}
      />
      <Lightformer
        rotation-y={-Math.PI / 2}
        position={[10, 1, 0]}
        scale={[20, 1, 1]}
        intensity={10}
      />

      {/* Key */}
      <Lightformer
        form="ring"
        color="white"
        intensity={5}
        scale={10}
        position={[-15, 4, -18]}
        target={[0, 0, 0]}
      />
    </>
  )
}
