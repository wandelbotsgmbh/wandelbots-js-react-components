import { autorun } from "mobx"
import { useEffect, type EffectCallback } from "react"

/**
 * Run code once on component mount. Shorthand for useEffect(effect, []).
 */
export function useMounted(effect: EffectCallback) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: pre-biome code
  useEffect(effect, [])
}

/**
 * Initialize a mobx autorun watcher on component mount, and
 * clean it up when the component unmounts.
 */
export function useAutorun(view: Parameters<typeof autorun>[0]) {
  useMounted(() => {
    return autorun(view)
  })
}

/**
 * Run a callback on every animation frame. Cleans up
 * after component unmount.
 */
export function useAnimationFrame(callback: () => void) {
  return useMounted(() => {
    let frameId: number

    function frame() {
      callback()
      frameId = requestAnimationFrame(frame)
    }

    frameId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(frameId)
    }
  })
}
