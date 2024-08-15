import { observer } from "mobx-react-lite"
import { Stack, Typography } from "@mui/material"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import type { JoggingStore } from "./JoggingStore"
import { useAnimationFrame } from "../utils/hooks"
import { CopyableText } from "../CopyableText"

export const JoggingJointValues = observer(
  ({ store }: { store: JoggingStore }) => {
    const poseHolderRef = useRef<HTMLPreElement>(null)
    const { t } = useTranslation()

    function getCurrentPoseString() {
      const { joints } =
        store.jogger.motionStream.rapidlyChangingMotionState.state
          .joint_position
      return `{${joints.map((j) => parseFloat(j.toFixed(4))).join(", ")}}`
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
          label={"Pose"}
          value={getCurrentPoseString()}
          ref={poseHolderRef}
        />
      </Stack>
    )
  },
)
