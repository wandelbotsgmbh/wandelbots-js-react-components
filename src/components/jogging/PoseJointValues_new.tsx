import { Button, Stack, Typography } from "@mui/material"
import type { MotionStreamConnection } from "@wandelbots/nova-js/v1"
import { observer } from "mobx-react-lite"
import { useRef, useState } from "react"
import { CopyableText } from "../CopyableText"
import { useAnimationFrame } from "../utils/hooks"

export const PoseJointValues = observer(
  ({
    motionStream,
    showCopyButton = true,
  }: {
    motionStream: MotionStreamConnection
    showCopyButton?: boolean
  }) => {
    const poseHolderRef = useRef<HTMLDivElement>(null)
    const [copyMessage, setCopyMessage] = useState("")

    function getCurrentPoseString() {
      const { joints } =
        motionStream.rapidlyChangingMotionState.state.joint_position
      return `[${joints.map((j) => parseFloat(j.toFixed(4))).join(", ")}]`
    }

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(getCurrentPoseString())
        setCopyMessage("Copied!")
        setTimeout(() => setCopyMessage(""), 2000)
      } catch {
        setCopyMessage("Copy failed")
        setTimeout(() => setCopyMessage(""), 2000)
      }
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
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ flexGrow: 1, minWidth: 0, overflow: "hidden" }}
      >
        <CopyableText value={getCurrentPoseString()} ref={poseHolderRef} />
        {showCopyButton && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleCopy}
            sx={{ flexShrink: 0 }}
          >
            Copy
          </Button>
        )}
        {copyMessage && (
          <Typography variant="caption" color="success.main">
            {copyMessage}
          </Typography>
        )}
      </Stack>
    )
  },
)
