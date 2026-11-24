/**
 * Whether the browser can make a WebGL context: a quick check before the 3D
 * view mounts.
 *
 * three.js' `WebGLRenderer` throws when the browser cannot make a WebGL
 * context (WebGL turned off, no GPU, a blocked driver, …). It throws inside
 * React Three Fiber's async setup, where no React error boundary catches it
 * reliably: only an "Uncaught (in promise)" shows. Checking first lets the
 * view say so instead of mounting a canvas that never comes up.
 */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas")
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    return gl != null
  } catch {
    return false
  }
}
