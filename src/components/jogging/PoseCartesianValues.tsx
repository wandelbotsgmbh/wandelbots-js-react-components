import { Button, Stack, Typography } from "@mui/material"
import { poseToWandelscriptString } from "@wandelbots/nova-js"
import type {
  ConnectedMotionGroup,
  MotionGroupStateResponse,
  MotionStreamConnection,
} from "@wandelbots/nova-js/v1"
import { observer } from "mobx-react-lite"
import { useRef, useState } from "react"
import { CopyableText } from "../CopyableText"
import { useAnimationFrame } from "../utils/hooks"

/** Minimal interface for what PoseCartesianValues needs from motion stream */
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

export type PoseCartesianValuesProps = {
  /** Either a MotionStreamConnection or ConnectedMotionGroup */
  motionStream?: MotionStreamConnection
  connectedMotionGroup?: ConnectedMotionGroup
  showCopyButton?: boolean
}

export const PoseCartesianValues = observer(
  ({
    motionStream,
    connectedMotionGroup,
    showCopyButton = false,
  }: PoseCartesianValuesProps) => {
    const poseHolderRef = useRef<HTMLDivElement>(null)
    const [copyMessage, setCopyMessage] = useState("")

    const activeMotionStream = createMotionStateProvider(
      motionStream,
      connectedMotionGroup,
    )

    if (!activeMotionStream) {
      throw new Error(
        "PoseCartesianValues requires either motionStream or connectedMotionGroup prop",
      )
    }

    function getCurrentPoseString() {
      if (!activeMotionStream) return ""
      const tcpPose = activeMotionStream.rapidlyChangingMotionState.tcp_pose
      if (!tcpPose) return ""
      return poseToWandelscriptString(tcpPose)
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
