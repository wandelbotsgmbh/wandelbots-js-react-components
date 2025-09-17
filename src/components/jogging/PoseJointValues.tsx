import { Button, Stack } from "@mui/material"
import type { Joints } from "@wandelbots/nova-api/v1"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { externalizeComponent } from "../../externalizeComponent"
import { CopyableText } from "../CopyableText"

export type PoseJointValuesProps = {
  joints: Joints
  showCopyButton?: boolean
}

export const PoseJointValues = externalizeComponent(
  observer(({ joints, showCopyButton = false }: PoseJointValuesProps) => {
    const [copyMessage, setCopyMessage] = useState<string | null>(null)
    const poseString = `[${joints.joints.map((j: number) => parseFloat(j.toFixed(4))).join(", ")}]`

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
        data-testid="pose-joint-values"
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
