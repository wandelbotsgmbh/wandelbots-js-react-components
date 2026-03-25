import * as THREE from "three"
import type { DHParameter } from "@wandelbots/nova-js/v2"

export interface CoplanarityResult {
  isCoplanar: boolean
  normal?: THREE.Vector3
}

export function radiansToDegree(radians: number): number {
  return radians * (180 / Math.PI)
}

export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

export function tryParseJson(json: unknown): any {
  try {
    return JSON.parse(json as string)
  } catch {
    return undefined
  }
}

export function tryStringifyJson(json: unknown): string | undefined {
  try {
    return JSON.stringify(json)
  } catch {
    return undefined
  }
}

export function orientationToQuaternion(orientation: THREE.Vector3): THREE.Quaternion {
  const angle = orientation.length()
  const quaternion = new THREE.Quaternion()
  if (angle > 1e-6) {
    const axis = orientation.clone().normalize()
    quaternion.setFromAxisAngle(axis, angle)
  }
  return quaternion
}

export function dhParametersToPlaneSize(dhParameters: DHParameter[]) {
  const defaultPlaneSize = 5
  if (!dhParameters || dhParameters.length === 0) {
    return defaultPlaneSize
  }
  const reachRadiusM = dhParameters.reduce((sum, p) => {
    return sum + (Math.abs(p.a ?? 0) / 1000) + (Math.abs(p.d ?? 0) / 1000)
  }, 0)
  const size = reachRadiusM * 2
  if (!Number.isFinite(size) || size <= 0) {
    return defaultPlaneSize
  }
  return size
}


export function verticesToCoplanarity(vertices: THREE.Vector3[]): CoplanarityResult {
  if (vertices.length < 3) {
    console.log("Not enough vertices to define a plane")
    return { isCoplanar: false }
  }

  // Convert Vector3d to THREE.Vector3
  const v0 = new THREE.Vector3(vertices[0].x, vertices[0].y, vertices[0].z)
  const v1 = new THREE.Vector3(vertices[1].x, vertices[1].y, vertices[1].z)
  const v2 = new THREE.Vector3(vertices[2].x, vertices[2].y, vertices[2].z)

  const vector1 = new THREE.Vector3().subVectors(v1, v0)
  const vector2 = new THREE.Vector3().subVectors(v2, v0)
  const normal = new THREE.Vector3().crossVectors(vector1, vector2).normalize()

  // Check if all remaining vertices lie on the same plane
  for (let i = 3; i < vertices.length; i++) {
    const vi = new THREE.Vector3(vertices[i].x, vertices[i].y, vertices[i].z)
    const vector = new THREE.Vector3().subVectors(vi, v0)
    const dotProduct = normal.dot(vector)
    if (Math.abs(dotProduct) > 1e-6) {
      // Allowing a small tolerance
      console.log("Vertices are not on the same plane")
      return { isCoplanar: false }
    }
  }

  return { isCoplanar: true, normal }
}