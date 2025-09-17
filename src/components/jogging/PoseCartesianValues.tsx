import { Button, Stack } from "@mui/material"
import { poseToWandelscriptString } from "@wandelbots/nova-js"
import type { TcpPose } from "@wandelbots/nova-js/v1"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { externalizeComponent } from "../../externalizeComponent"
import { CopyableText } from "../CopyableText"

export type PoseCartesianValuesProps = {
  tcpPose: TcpPose
  showCopyButton?: boolean
}

export const PoseCartesianValues = externalizeComponent(
  observer(({ tcpPose, showCopyButton = false }: PoseCartesianValuesProps) => {
    const [copyMessage, setCopyMessage] = useState<string | null>(null)
    const poseString = poseToWandelscriptString(tcpPose)

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(poseString)
        setCopyMessage("Copied!")
        setTimeout(() => setCopyMessage(null), 2000)
      } catch {
        setCopyMessage("Copy failed")
        setTimeout(() => setCopyMessage(null), 2000)
      }
    }

    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ flexGrow: 1, minWidth: 0, overflow: "hidden" }}
        data-testid="pose-cartesian-values"
      >
        <CopyableText value={poseString} />
        {showCopyButton && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleCopy}
            sx={{ flexShrink: 0 }}
          >
            { copyMessage ? copyMessage : "Copy"}
          </Button>
        )}
      </Stack>
    )
  }),
)
