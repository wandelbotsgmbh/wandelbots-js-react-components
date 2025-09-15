import { Stack } from "@mui/material"
import { poseToWandelscriptString } from "@wandelbots/nova-js"
import type { TcpPose } from "@wandelbots/nova-js/v1"
import { observer } from "mobx-react-lite"
import { externalizeComponent } from "../../externalizeComponent"
import { CopyableText } from "../CopyableText"

export type PoseCartesianValuesProps = {
  pose: TcpPose
}

export const PoseCartesianValues = externalizeComponent(
  observer(({ pose }: PoseCartesianValuesProps) => {
    return (
      <Stack
        alignItems="left"
        spacing={2}
        sx={{ flexGrow: 1, minWidth: 0, overflow: "hidden" }}
        data-testid="pose-cartesian-values"
      >
        <CopyableText value={poseToWandelscriptString(pose)} />
      </Stack>
    )
  }),
)
