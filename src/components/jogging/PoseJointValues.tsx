import { Button, Stack, Typography } from "@mui/material"
import type {
  ConnectedMotionGroup,
  MotionGroupStateResponse,
  MotionStreamConnection,
} from "@wandelbots/nova-js/v1"
import { observer } from "mobx-react-lite"
import { useRef, useState } from "react"
import { CopyableText } from "../CopyableText"
import { useAnimationFrame } from "../utils/hooks"

/** Minimal interface for what PoseJointValues needs from motion stream */
type MotionStateProvider = {
  rapidlyChangingMotionState: MotionGroupStateResponse
}

/** Creates a motion state provider from either a MotionStreamConnection or ConnectedMotionGroup */
function createMotionStateProvider(
  motionStream?: MotionStreamConnection,
  connectedMotionGroup?: ConnectedMotionGroup,
): MotionStateProvider | undefined {
  if (motionStream) {
    return motionStream
  }
  if (connectedMotionGroup) {
    return {
      rapidlyChangingMotionState:
        connectedMotionGroup.rapidlyChangingMotionState,
    }
  }
  return undefined
}

export type PoseJointValuesProps = {
  /** Either a MotionStreamConnection or ConnectedMotionGroup */
  motionStream?: MotionStreamConnection
  connectedMotionGroup?: ConnectedMotionGroup
  showCopyButton?: boolean
}

export const PoseJointValues = observer(
  ({
    motionStream,
    connectedMotionGroup,
    showCopyButton = false,
  }: PoseJointValuesProps) => {
    const poseHolderRef = useRef<HTMLDivElement>(null)
    const [copyMessage, setCopyMessage] = useState("")

    const activeMotionStream = createMotionStateProvider(
      motionStream,
      connectedMotionGroup,
    )

    if (!activeMotionStream) {
      throw new Error(
        "PoseJointValues requires either motionStream or connectedMotionGroup prop",
      )
    }

    function getCurrentPoseString() {
      if (!activeMotionStream) return ""
      const { joints } =
        activeMotionStream.rapidlyChangingMotionState.state.joint_position
      return `[${joints.map((j: number) => parseFloat(j.toFixed(4))).join(", ")}]`
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
