import { autorun, reaction } from "mobx"
import { useEffect, type EffectCallback } from "react"

/**
 * Run code once on component mount. Shorthand for useEffect(effect, []).
 */
export function useMounted(effect: EffectCallback) {
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
 * Initialize a mobx reaction watcher on component mount, and
 * clean it up when the component unmounts.
 */
export function useReaction<T>(
  expression: Parameters<typeof reaction<T>>[0],
  effect: Parameters<typeof reaction<T>>[1],
  opts?: Parameters<typeof reaction<T>>[2],
) {
  useMounted(() => {
    return reaction(expression, effect, opts)
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
      console.log("Cleaning up animation frame")
      cancelAnimationFrame(frameId)
    }
  })
}
