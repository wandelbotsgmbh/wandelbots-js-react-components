import { Stack } from "@mui/material"
import type { MotionStreamConnection } from "@wandelbots/nova-js/v1"
import { observer } from "mobx-react-lite"
import { useRef } from "react"
import { CopyableText } from "../CopyableText"
import { useAnimationFrame } from "../utils/hooks"

export const PoseJointValues = observer(
  ({ motionStream }: { motionStream: MotionStreamConnection }) => {
    const poseHolderRef = useRef<HTMLDivElement>(null)

    function getCurrentPoseString() {
      const { joints } =
        motionStream.rapidlyChangingMotionState.state.joint_position
      return `[${joints.map((j) => parseFloat(j.toFixed(4))).join(", ")}]`
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
