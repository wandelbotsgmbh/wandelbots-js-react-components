import { Stack } from "@mui/material"
import { poseToWandelscriptString } from "@wandelbots/wandelbots-js"
import { observer } from "mobx-react-lite"
import { useRef } from "react"
import { CopyableText } from "../CopyableText"
import { useAnimationFrame } from "../utils/hooks"
import type { JoggingStore } from "./JoggingStore"

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
      const newPoseContent = getCurrentPoseString()
      if (poseHolderRef.current.textContent === newPoseContent) {
        return
      }

      poseHolderRef.current.textContent = newPoseContent
    })

    return (
      <Stack
        alignItems="left"
        spacing={2}
        sx={{ flexGrow: 1, minWidth: 0, overflow: "hidden" }}
      >
        <CopyableText value={getCurrentPoseString()} ref={poseHolderRef} />
      </Stack>
    )
  },
)
