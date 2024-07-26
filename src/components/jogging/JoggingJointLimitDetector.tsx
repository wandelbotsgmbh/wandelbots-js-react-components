import { Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { isEqual } from "lodash-es"
import { MotionStreamConnection } from "@wandelbots/wandelbots-js"
import { useAnimationFrame } from "../utils/hooks"
import { JoggingStore } from "./JoggingStore"

/**
 * Monitors the active robot motion state and displays a message if
 * any joint limits are reached.
 */
export const JoggingJointLimitDetector = ({ store }: { store: JoggingStore }) => {
  const { t } = useTranslation()

  const [jointLimitsReached, setJointLimitsReached] = useState(
    store.jogger.motionStream.rapidlyChangingMotionState.state.joint_limit_reached
      .limit_reached,
  )

  useAnimationFrame(() => {
    const newLimitsReached =
      store.jogger.motionStream.rapidlyChangingMotionState.state.joint_limit_reached
        .limit_reached

    if (!isEqual(jointLimitsReached, newLimitsReached)) {
      setJointLimitsReached(newLimitsReached)
    }
  })

  const jointLimitReachedIndices: number[] = []
  jointLimitsReached.forEach((limitReached, index) => {
    if (limitReached) jointLimitReachedIndices.push(index)
  })

  if (!jointLimitReachedIndices.length) return null

  return (
    <Typography
      color="error"
      sx={{
        padding: "1rem",
        textAlign: "center",
      }}
    >
      {t("Jogging.JointLimitsReached.lb", {
        jointNumbers: jointLimitReachedIndices.map((i) => i + 1).join(", "),
      })}
    </Typography>
  )
}
