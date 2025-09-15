import { Button, Stack, Typography } from "@mui/material"
import type {
  ConnectedMotionGroup,
  MotionStreamConnection,
} from "@wandelbots/nova-js/v1"
import { observer } from "mobx-react-lite"
import { useRef, useState } from "react"
import { externalizeComponent } from "../../externalizeComponent"
import { CopyableText } from "../CopyableText"
import { useAutorun } from "../utils/hooks"

export type PoseJointValuesProps = {
  /** Either a MotionStreamConnection or ConnectedMotionGroup */
  motionStream?: MotionStreamConnection
  connectedMotionGroup?: ConnectedMotionGroup
  showCopyButton?: boolean
}

export const PoseJointValues = externalizeComponent(
  observer(
    ({
      motionStream,
      connectedMotionGroup,
      showCopyButton = false,
    }: PoseJointValuesProps) => {
      const poseHolderRef = useRef<HTMLDivElement>(null)
      const [copyMessage, setCopyMessage] = useState("")

      if (!motionStream && !connectedMotionGroup) {
        throw new Error(
          "PoseJointValues requires either motionStream or connectedMotionGroup prop",
        )
      }

      function getCurrentPoseString() {
        let joints: number[]
        if (motionStream) {
          joints =
            motionStream.rapidlyChangingMotionState.state.joint_position.joints
        } else if (connectedMotionGroup) {
          joints =
            connectedMotionGroup.rapidlyChangingMotionState.state.joint_position
              .joints
        } else {
          return ""
        }
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

      useAutorun(() => {
        if (!poseHolderRef.current) {
          return
        }

        let joints: number[]
        if (motionStream) {
          joints =
            motionStream.rapidlyChangingMotionState.state.joint_position.joints
        } else if (connectedMotionGroup) {
          joints =
            connectedMotionGroup.rapidlyChangingMotionState.state.joint_position
              .joints
        } else {
          return
        }

        const newPoseContent = `[${joints.map((j: number) => parseFloat(j.toFixed(4))).join(", ")}]`

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
