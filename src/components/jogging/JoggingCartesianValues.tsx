import { observer } from "mobx-react-lite"
import { Stack, Typography } from "@mui/material"
import { useRef } from "react"
import { poseToWandelscriptString } from "@wandelbots/wandelbots-js"
import { useAnimationFrame } from "../utils/hooks"
import { JoggingStore } from "./JoggingStore"

export const JoggingCartesianValues = observer(
  ({ store }: { store: JoggingStore }) => {
    const poseStringRef = useRef<HTMLPreElement>(null)

    function getCurrentPoseString() {
      const tcpPose =
        store.jogger.motionStream.rapidlyChangingMotionState.tcp_pose
      if (!tcpPose) return ""
      return poseToWandelscriptString(tcpPose)
    }

    useAnimationFrame(() => {
      if (!poseStringRef.current) {
        return
      }

      poseStringRef.current.textContent = getCurrentPoseString()
    })

    return (
      <Stack alignItems="center" marginTop="0.8rem">
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
  },
)
