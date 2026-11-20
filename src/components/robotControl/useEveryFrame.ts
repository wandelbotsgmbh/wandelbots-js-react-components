import { useEffect, useRef, useState } from "react"

/**
 * `read()`, read every animation frame while `active`: for what follows the
 * robot, which changes too fast for a prop. It renders only when the value
 * changes, so `read` returns a string, a number or a boolean.
 */
export function useEveryFrame<T extends string | number | boolean>(
  read: () => T,
  active: boolean,
): T {
  const latest = useRef(read)
  latest.current = read
  const [value, setValue] = useState(read)

  useEffect(() => {
    if (!active) return
    let frame = 0
    const follow = () => {
      setValue(latest.current())
      frame = requestAnimationFrame(follow)
    }
    follow()
    return () => cancelAnimationFrame(frame)
  }, [active])

  return value
}
