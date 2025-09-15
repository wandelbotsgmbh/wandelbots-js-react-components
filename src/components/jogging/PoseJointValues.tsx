import { Stack } from "@mui/material"
import { observer } from "mobx-react-lite"
import { externalizeComponent } from "../../externalizeComponent"
import { CopyableText } from "../CopyableText"

export type PoseJointValuesProps = {
  pose: number[]
}

export const PoseJointValues = externalizeComponent(
  observer(({ pose }: PoseJointValuesProps) => {
    const poseString = `[${pose.map((j: number) => parseFloat(j.toFixed(4))).join(", ")}]`

    return (
      <Stack
        alignItems="left"
        spacing={2}
        sx={{ flexGrow: 1, minWidth: 0, overflow: "hidden" }}
        data-testid="pose-joint-values"
      >
        <CopyableText value={poseString} />
      </Stack>
    )
  }),
)
