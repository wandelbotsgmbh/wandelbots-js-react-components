"use client"
import { useEffect } from "react"

const defaultWarn = console.warn

export default function ConsoleFilter() {
  useEffect(() => {
    console.warn = (data) => {
      // This message is caused by a bug from useSpring in combination with Canvas "demand" frameloop.
      // For now we can only suppress this warning there are no sideeffects yet
      // See https://github.com/pmndrs/react-spring/issues/1586#issuecomment-915051856
      if (
        data ===
        "Cannot call the manual advancement of rafz whilst frameLoop is not set as demand"
      ) {
        return
      }

      defaultWarn(data)
    }
  }, [])

  return <></>
}
