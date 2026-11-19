import { tryParseJson } from "@wandelbots/nova-js"
import type {
  MotionCommand,
  Nova,
  JointTrajectory,
} from "@wandelbots/nova-js/v2"
import type {
  JoggingStore,
  RobotControlPose,
} from "@wandelbots/wandelbots-js-react-components"
import { useEffect, useMemo, useRef, useState } from "react"

type MoveToState = { planning: boolean; error: string | null }

type Socket = ReturnType<Nova["openReconnectingWebsocket"]>

/**
 * The app's side of Move to, as RobotPad does it: a typed pose is planned at
 * once, to tell whether the TCP can get there; holding the button plans
 * from where the robot stands, loads the trajectory and starts it, and the
 * release pauses it. A press after a pause goes on along the same
 * trajectory, until jogging takes the robot (`release`).
 */
export function useMoveTo(nova: Nova, cellId: string, store: JoggingStore) {
  const [state, setState] = useState<MoveToState>({
    planning: false,
    error: null,
  })
  const socket = useRef<Socket | null>(null)
  // The press that runs: a newer one, or the release, makes an older
  // press that still plans or loads move nothing
  const press = useRef(0)
  const latestTarget = useRef(0)

  const moveTo = useMemo(() => {
    const motion = store.jogger.motionStream
    const motionGroup = motion.motionGroupId

    /** The trajectory to `pose`, from the joints the robot stands at */
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
            ?.error_feedback_name ?? "unknown"
        throw new Error(`The TCP cannot move to this pose (${name})`)
      }
      return response
    }

    /** Ends the trajectory session: jogging needs the robot */
    function release() {
      press.current++
      socket.current?.close()
      socket.current = null
    }

    /** Opens a session and loads the trajectory; resolves once NOVA has it */
    function load(trajectory: JointTrajectory): Promise<Socket> {
      const next = nova.openReconnectingWebsocket(
        `/cells/${cellId}/controllers/${motion.controllerId}/execution/trajectory`,
      )
      return new Promise((resolve, reject) => {
        next.addEventListener("message", (event: MessageEvent) => {
          const result = tryParseJson(event.data)?.result
          if (result?.kind === "INITIALIZE_RECEIVED") {
            if (result.add_trajectory_error) {
              reject(new Error(result.add_trajectory_error.message))
            } else resolve(next)
          } else if (result?.kind === "MOTION_ERROR") {
            console.error("Move to failed:", result.message)
          }
        })
        next.sendJson({
          message_type: "InitializeMovementRequest",
          trajectory: {
            message_type: "TrajectoryData",
            motion_group: motionGroup,
            tcp: store.selectedTcpId,
            data: trajectory,
          },
        })
      })
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
        // A new target: the loaded trajectory leads elsewhere
        release()
        const mine = ++latestTarget.current
        if (!pose) {
          setState({ planning: false, error: null })
          return
        }
        setState({ planning: true, error: null })
        try {
          await plan(pose)
          if (mine === latestTarget.current) {
            setState({ planning: false, error: null })
          }
        } catch (error) {
          if (mine === latestTarget.current) {
            setState({
              planning: false,
              error: String((error as Error).message),
            })
          }
        }
      },

      async onMoveStart(pose: RobotControlPose) {
        const mine = ++press.current
        try {
          if (!socket.current) {
            const trajectory = await plan(pose)
            if (mine !== press.current) return
            const loaded = await load(trajectory)
            if (mine !== press.current) {
              loaded.close()
              return
            }
            socket.current = loaded
          }
          socket.current.sendJson({
            message_type: "StartMovementRequest",
            direction: "DIRECTION_FORWARD",
          })
        } catch (error) {
          console.error("Move to failed:", error)
        }
      },

      onMoveStop() {
        press.current++
        socket.current?.sendJson({ message_type: "PauseMovementRequest" })
      },

      release,
    }
  }, [nova, cellId, store])

  // The session ends with the page
  useEffect(() => () => moveTo.release(), [moveTo])

  return { ...moveTo, ...state }
}
