import { observer } from "mobx-react-lite"
import { Stack, Typography } from "@mui/material"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { JoggingStore } from "./JoggingStore"
import { useAnimationFrame } from "../utils/hooks"

export const JoggingJointValues = observer(
  ({ store }: { store: JoggingStore }) => {
    const valueHolderRef = useRef<HTMLPreElement>(null)
    const { t } = useTranslation()

    function getCurrentValueString() {
      const { joints } =
        store.jogger.motionStream.rapidlyChangingMotionState.state
          .joint_position
      return `{${joints.map((j) => parseFloat(j.toFixed(4))).join(", ")}}`
    }

    useAnimationFrame(() => {
      if (!valueHolderRef.current) return
      valueHolderRef.current.textContent = getCurrentValueString()
    })

    return (
      <Stack alignItems="center" marginTop="0.8rem">
        <Typography
          sx={{
            fontSize: "12px",
            marginTop: "0.8rem",
          }}
        >
          {t("Jogging.Joints.JointValues.lb")}
        </Typography>
        <Typography
          component="pre"
          ref={valueHolderRef}
          sx={{
            fontSize: "14px",
            opacity: 0.6,
          }}
        >
          {getCurrentValueString()}
        </Typography>
      </Stack>
    )
  },
)
