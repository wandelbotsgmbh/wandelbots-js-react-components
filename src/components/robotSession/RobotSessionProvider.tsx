import { createContext, type ReactNode, useContext } from "react"
import type { RobotSession } from "../../lib/robotSession/RobotSession"

const RobotSessionContext = createContext<RobotSession | null>(null)

/**
 * Gives the connected components inside it their robot, e.g.
 * `<RobotControl />`. Several robots on a page: one provider each, or a
 * `session` prop on the component.
 */
export function RobotSessionProvider({
  session,
  children,
}: {
  session: RobotSession
  children: ReactNode
}) {
  return (
    <RobotSessionContext.Provider value={session}>
      {children}
    </RobotSessionContext.Provider>
  )
}

/** The session of the nearest {@link RobotSessionProvider} */
export function useRobotSession(): RobotSession {
  return useRobotSessionOf(undefined)
}

/**
 * @internal The session a connected component was given, else the one of
 * its {@link RobotSessionProvider}
 */
export function useRobotSessionOf(session: RobotSession | undefined) {
  const robot = useOptionalRobotSessionOf(session)
  if (!robot) {
    throw new Error(
      "No robot session: put the component inside a RobotSessionProvider, or give it a `session`",
    )
  }
  return robot
}

/**
 * @internal As {@link useRobotSessionOf}, but null without either: for the
 * parts that show before a robot is loaded, e.g. the header
 */
export function useOptionalRobotSessionOf(
  session: RobotSession | null | undefined,
): RobotSession | null {
  const provided = useContext(RobotSessionContext)
  return session ?? provided
}
