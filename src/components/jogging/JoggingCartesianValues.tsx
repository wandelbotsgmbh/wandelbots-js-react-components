import { observer } from "mobx-react-lite"
import { useActiveRobot } from "./RobotPadContext"
import { Stack, Typography } from "@mui/material"
import { useRef } from "react"
import { poseToWandelscriptString } from "@/util/converters"
import { useAutorun } from "@/util/hooks"

export const JoggingCartesianValues = observer(() => {
  const activeRobot = useActiveRobot()
  const joggingStore = activeRobot.joggingStore
  if (!joggingStore) return null

  const worldStringRef = useRef<HTMLPreElement>(null)
  const poseStringRef = useRef<HTMLPreElement>(null)

  function getCurrentWorldString() {
    const tcpPose = activeRobot.rapidlyChangingMotionState.tcp_pose
    if (!tcpPose) return ""

    return poseToWandelscriptString(tcpPose)
  }

  function getCurrentPoseString() {
    const tcpPose = activeRobot.rapidlyChangingMotionState.tcp_pose
    if (!tcpPose) return ""
    return poseToWandelscriptString(tcpPose)
  }

  useAutorun(() => {
    const poseString = getCurrentPoseString()

    requestAnimationFrame(() => {
      if (!poseStringRef.current) {
        return
      }
      poseStringRef.current.textContent = poseString
    })
  })

  return (
    <Stack alignItems="center" marginTop="0.8rem">
      {/* <Typography
        sx={{
          fontSize: "12px",
        }}
      >
        {joggingStore.selectedTcpId} - {"world"}
      </Typography>
      <Typography
        component="pre"
        ref={worldStringRef}
        sx={{
          fontSize: "14px",
          opacity: 0.6,
        }}
      >
        {getCurrentWorldString()}
      </Typography> */}

      <Typography
        sx={{
          fontSize: "12px",
          marginTop: "0.8rem",
        }}
      >
        {joggingStore.selectedTcpId} - {joggingStore.selectedCoordSystem?.name}
      </Typography>
      <Typography
        component="pre"
        ref={poseStringRef}
        sx={{
          fontSize: "14px",
          opacity: 0.6,
        }}
      ></Typography>
    </Stack>
  )
})
