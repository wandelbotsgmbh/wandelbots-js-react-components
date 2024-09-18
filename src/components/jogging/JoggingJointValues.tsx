import { Stack } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useRef } from "react"
import { CopyableText } from "../CopyableText"
import { useAnimationFrame } from "../utils/hooks"
import type { JoggingStore } from "./JoggingStore"

export const JoggingJointValues = observer(
  ({ store }: { store: JoggingStore }) => {
    const poseHolderRef = useRef<HTMLDivElement>(null)

    function getCurrentPoseString() {
      const { joints } =
        store.jogger.motionStream.rapidlyChangingMotionState.state
          .joint_position
      return `[${joints.map((j) => parseFloat(j.toFixed(4))).join(", ")}]`
    }

    useAnimationFrame(() => {
      if (!poseHolderRef.current) return
      poseHolderRef.current.textContent = getCurrentPoseString()
    })

    return (
      <Stack
        alignItems="left"
        spacing={2}
        sx={{
          padding: "16px",
          "& label": {
            opacity: 0.7,
            fontSize: "12px",
            marginBottom: "4px",
          },
        }}
      >
        <CopyableText
          // label={"Pose"}
          value={getCurrentPoseString()}
          ref={poseHolderRef}
        />
      </Stack>
    )
  },
)
