import { tryParseJson } from "@wandelbots/nova-js"
import type {
  JointTrajectory,
  MotionCommand,
  Nova,
} from "@wandelbots/nova-js/v2"
import type {
  JoggingStore,
  RobotControlMoveState,
  RobotControlPose,
} from "@wandelbots/wandelbots-js-react-components"
import { useEffect, useMemo, useRef, useState } from "react"

type Socket = ReturnType<Nova["openReconnectingWebsocket"]>

const PLANNING_FAILED =
  "Planning a motion to this pose failed. Please change the pose coordinates."

/** RobotPad's words for a pose the planner rejects (planErrorTranslation) */
function planErrorMessage(errorFeedbackName: string): string {
  if (errorFeedbackName === "FeedbackSingularity") {
    return "The current pose would create a singularity. Please change the pose coordinates."
  }
  if (errorFeedbackName === "FeedbackCollision") {
    return "Moving to the current pose would cause a collision. Please change the pose coordinates."
  }
  if (
    [
      "FeedbackOutOfWorkspace",
      "FeedbackJointLimitExceeded",
      "FeedbackAxisRangeExceeded",
      "FeedbackNoSolutionInCurrentConfiguration",
    ].includes(errorFeedbackName)
  ) {
    return "The current pose is not reachable. Please change the pose coordinates."
  }
  return PLANNING_FAILED
}

/**
 * The app's side of Move to, as RobotPad's TrajectoryExecutionStore: a new
 * target is planned and its trajectory loaded at once ("planning", then
 * "planned"), so the button can start it. NOVA's start makes it "moving";
 * the release pauses it: "stopping" until the robot stands still, then
 * "planned" again, to go on along the same trajectory. A new target, or
 * none, drops the trajectory, as `release` does before jogging: the
 * controller does not jog while a trajectory session is open.
 */
export function useMoveTo(nova: Nova, cellId: string, store: JoggingStore) {
  const [view, setView] = useState<{
    state: RobotControlMoveState
    error: string | null
  }>({ state: "idle", error: null })
  // The state for the callbacks, which run outside of rendering
  const state = useRef<RobotControlMoveState>("idle")
  const socket = useRef<Socket | null>(null)
  const latestTarget = useRef(0)
  // A start sent, and NOVA has not confirmed it yet
  const startSent = useRef(false)
  // The button was let go before NOVA confirmed the start: pause then
  const pauseOnStart = useRef(false)

  const moveTo = useMemo(() => {
    const motion = store.jogger.motionStream
    const motionGroup = motion.motionGroupId

    function setState(next: RobotControlMoveState, error?: string | null) {
      state.current = next
      setView((view) => ({
        state: next,
        error: error === undefined ? view.error : error,
      }))
    }

    /** The trajectory to `pose` from where the robot stands, or why not */
    async function plan(pose: RobotControlPose): Promise<JointTrajectory> {
      const description = motion.description
      // The offset of the TCP, when NOVA gives its orientation as a rotation
      // vector (the mock UR5e has only its flange, without an offset)
      const tcp = store.tcpsById[store.selectedTcpId]
      const tcpOffset =
        tcp?.orientation?.length === 3
          ? { position: tcp.position, orientation: tcp.orientation }
          : undefined
      const command: MotionCommand = {
        limits_override: {
          tcp_velocity_limit: store.translationVelocityMmPerSec,
        },
        path: {
          path_definition_name: "PathCartesianPTP",
          target_pose: {
            position: pose.position,
            orientation: pose.orientation,
          },
        },
      }
      const { response } = await nova.api.trajectoryPlanning.planTrajectory(
        cellId,
        {
          motion_group_setup: {
            motion_group_model: description.motion_group_model,
            cycle_time: description.cycle_time ?? 0,
            mounting: description.mounting,
            ...(tcpOffset && { tcp_offset: tcpOffset }),
          },
          start_joint_position:
            motion.rapidlyChangingMotionState.joint_position,
          motion_commands: [command],
        },
      )
      if ("error_feedback" in response) {
        const name =
          (response.error_feedback as { error_feedback_name?: string })
            ?.error_feedback_name ?? "FeedbackUnknown"
        throw new PlanRejected(planErrorMessage(name))
      }
      return response
    }

    /** Ends the trajectory session: jogging needs the robot */
    function release() {
      latestTarget.current++
      startSent.current = false
      pauseOnStart.current = false
      socket.current?.close()
      socket.current = null
      setState("idle")
    }

    /**
     * Resolves once the robot stands still, as RobotPad's waitUntilStopped:
     * the motion stream gives new joints only while they change
     */
    async function waitUntilStopped() {
      let last = motion.rapidlyChangingMotionState.joint_position
      for (let i = 0; i < 100; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        const now = motion.rapidlyChangingMotionState.joint_position
        if (now === last) return
        last = now
      }
    }

    function pause(session: Socket) {
      session.sendJson({ message_type: "PauseMovementRequest" })
      void waitUntilStopped().then(() => {
        if (socket.current === session) setState("planned")
      })
    }

    /** Opens a session and loads the trajectory, as RobotPad on a new target */
    function load(trajectory: JointTrajectory): Socket {
      const session = nova.openReconnectingWebsocket(
        `/cells/${cellId}/controllers/${motion.controllerId}/execution/trajectory`,
      )
      session.addEventListener("message", (event: MessageEvent) => {
        if (socket.current !== session) return
        const result = tryParseJson(event.data)?.result
        switch (result?.kind) {
          case "INITIALIZE_RECEIVED":
            if (result.add_trajectory_error) {
              release()
              setState("idle", PLANNING_FAILED)
            } else {
              setState("planned")
            }
            break
          case "START_RECEIVED":
            startSent.current = false
            setState("moving")
            if (pauseOnStart.current) {
              pauseOnStart.current = false
              pause(session)
            }
            break
          case "PAUSE_RECEIVED":
            // Only while the robot still slows down: one at its target
            // stands still before this arrives
            if (state.current === "moving") setState("stopping")
            break
          case "MOTION_ERROR":
            console.error("Move to failed:", result.message)
            release()
            setState("idle", String(result.message))
            break
        }
      })
      session.sendJson({
        message_type: "InitializeMovementRequest",
        trajectory: {
          message_type: "TrajectoryData",
          motion_group: motionGroup,
          tcp: store.selectedTcpId,
          data: trajectory,
        },
      })
      return session
    }

    return {
      getCurrentPose(): RobotControlPose | null {
        const pose = motion.rapidlyChangingMotionState.tcp_pose
        if (!pose?.position || !pose.orientation) return null
        return {
          position: pose.position as [number, number, number],
          orientation: pose.orientation as [number, number, number],
        }
      },

      async onTargetChange(pose: RobotControlPose | null) {
        // A new target, or none: the loaded trajectory leads elsewhere
        release()
        const mine = latestTarget.current
        if (!pose) {
          setState("idle", null)
          return
        }
        setState("planning", null)
        try {
          const trajectory = await plan(pose)
          if (mine !== latestTarget.current) return
          socket.current = load(trajectory)
        } catch (error) {
          if (mine !== latestTarget.current) return
          if (!(error instanceof PlanRejected)) {
            console.error("Planning the move failed:", error)
          }
          setState(
            "idle",
            error instanceof PlanRejected ? error.message : PLANNING_FAILED,
          )
        }
      },

      onMoveStart() {
        if (state.current !== "planned" || !socket.current) return
        startSent.current = true
        pauseOnStart.current = false
        socket.current.sendJson({
          message_type: "StartMovementRequest",
          direction: "DIRECTION_FORWARD",
        })
      },

      onMoveStop() {
        const session = socket.current
        if (!session) return
        if (state.current === "moving") pause(session)
        else if (startSent.current) pauseOnStart.current = true
      },

      release,
    }
  }, [nova, cellId, store])

  // The session ends with the page
  useEffect(() => () => moveTo.release(), [moveTo])

  return { ...moveTo, ...view }
}

/** The planner cannot move the TCP there: the message says why */
class PlanRejected extends Error {}
