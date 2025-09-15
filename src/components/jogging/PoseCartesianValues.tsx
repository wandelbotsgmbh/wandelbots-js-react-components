import { Button, Stack, Typography } from "@mui/material"
import { poseToWandelscriptString } from "@wandelbots/nova-js"
import type {
  ConnectedMotionGroup,
  MotionGroupStateResponse,
  MotionStreamConnection,
} from "@wandelbots/nova-js/v1"
import { observer } from "mobx-react-lite"
import { useRef, useState } from "react"
import { externalizeComponent } from "../../externalizeComponent"
import { CopyableText } from "../CopyableText"
import { useAutorun } from "../utils/hooks"

export type PoseCartesianValuesProps = {
  /** Either a MotionStreamConnection or ConnectedMotionGroup */
  motionStream?: MotionStreamConnection
  connectedMotionGroup?: ConnectedMotionGroup
  showCopyButton?: boolean
}

export const PoseCartesianValues = externalizeComponent(
  observer(
    ({
      motionStream,
      connectedMotionGroup,
      showCopyButton = false,
    }: PoseCartesianValuesProps) => {
      const poseHolderRef = useRef<HTMLDivElement>(null)
      const [copyMessage, setCopyMessage] = useState("")

      if (!motionStream && !connectedMotionGroup) {
        throw new Error(
          "PoseCartesianValues requires either motionStream or connectedMotionGroup prop",
        )
      }

      function getCurrentPoseString() {
        let tcpPose: MotionGroupStateResponse["tcp_pose"] | undefined
        if (motionStream) {
          tcpPose = motionStream.rapidlyChangingMotionState.tcp_pose
        } else if (connectedMotionGroup) {
          tcpPose = connectedMotionGroup.rapidlyChangingMotionState.tcp_pose
        }
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

      useAutorun(() => {
        if (!poseHolderRef.current) {
          return
        }

        let tcpPose: MotionGroupStateResponse["tcp_pose"] | undefined
        if (motionStream) {
          tcpPose = motionStream.rapidlyChangingMotionState.tcp_pose
        } else if (connectedMotionGroup) {
          tcpPose = connectedMotionGroup.rapidlyChangingMotionState.tcp_pose
        }

        if (!tcpPose) return

        const newPoseContent = poseToWandelscriptString(tcpPose)

        requestAnimationFrame(() => {
          if (
            poseHolderRef.current &&
            poseHolderRef.current.textContent !== newPoseContent
          ) {
            poseHolderRef.current.textContent = newPoseContent
          }
        })
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
  ),
)
