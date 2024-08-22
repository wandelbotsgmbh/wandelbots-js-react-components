import { observer } from "mobx-react-lite"
import { Stack } from "@mui/material"
import { useRef } from "react"
import { poseToWandelscriptString } from "@wandelbots/wandelbots-js"
import { useAnimationFrame } from "../utils/hooks"
import type { JoggingStore } from "./JoggingStore"
import { CopyableText } from "../CopyableText"

export const JoggingCartesianValues = observer(
  ({ store }: { store: JoggingStore }) => {
    const poseHolderRef = useRef<HTMLDivElement>(null)

    function getCurrentPoseString() {
      const tcpPose =
        store.jogger.motionStream.rapidlyChangingMotionState.tcp_pose
      if (!tcpPose) return ""
      return poseToWandelscriptString(tcpPose)
    }

    useAnimationFrame(() => {
      if (!poseHolderRef.current) {
        return
      }

      poseHolderRef.current.textContent = getCurrentPoseString()
    })

    return (
      <Stack
        alignItems="left"
        spacing={2}
        sx={{
          padding: "8px 16px",
          paddingTop: "16px",
          "& label": {
            opacity: 0.7,
            fontSize: "12px",
            marginBottom: "4px",
          },
        }}
      >
        <CopyableText
          label={"Pose"}
          value={getCurrentPoseString()}
          ref={poseHolderRef}
        />
      </Stack>
    )
  },
)
