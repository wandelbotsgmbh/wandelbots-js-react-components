import { Euler } from "three"

// Ported from RobotPad (src/3d/modelRotations.ts)

/**
 * The rotation from a motion group model's own frame to NOVA's: the GLTF
 * models are authored Y-up, NOVA is Z-up, so model `(x, y, z)` is NOVA
 * `(x, -z, y)`. A 3D view in NOVA's Z-up frame turns the model by it; the
 * robots use it to bring NOVA values (such as the kinematic chain offset)
 * into the model's frame.
 *
 * Revolute robots and linear axes share this authoring convention, so one
 * rotation serves both. Catalog linear axes lay their rail along model +X;
 * the chain offset's rotation is applied on the joint node that starts the
 * DH chain, from the kinematic model (see `chainOffsetRestFrame`).
 */
export const MODEL_ROTATION = new Euler(Math.PI / 2, 0, 0)
