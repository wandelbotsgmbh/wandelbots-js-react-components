import { Typography } from "@mui/material"
import isEqual from "lodash-es/isEqual"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAnimationFrame } from "../utils/hooks"
import type { JoggingStore } from "./JoggingStore"

/**
 * Monitors the active robot motion state and displays a message if
 * any joint limits are reached.
 */
export const JoggingJointLimitDetector = ({
  store,
}: {
  store: JoggingStore
}) => {
  const { t } = useTranslation()

  const [jointLimitsReached, setJointLimitsReached] = useState(
    store.jogger.motionStream.rapidlyChangingMotionState.state
      .joint_limit_reached.limit_reached,
  )
  const jointLimitsReachedRef = useRef(jointLimitsReached)

  useAnimationFrame(() => {
    const newLimitsReached =
      store.jogger.motionStream.rapidlyChangingMotionState.state
        .joint_limit_reached.limit_reached

    if (!isEqual(jointLimitsReachedRef.current, newLimitsReached)) {
      jointLimitsReachedRef.current = newLimitsReached
      setJointLimitsReached(newLimitsReached)
    }
  })

  const jointLimitReachedIndices: number[] = []
  for (const [index, limitReached] of jointLimitsReached.entries()) {
    if (limitReached) jointLimitReachedIndices.push(index)
  }

  return (
    <Typography
      color="error"
      sx={{
        margin: "0.5rem 1rem",
        textAlign: "center",
        minHeight: "1.5rem",
        visibility: jointLimitReachedIndices.length ? "visible" : "hidden",
      }}
    >
      {t("Jogging.JointLimitsReached.lb", {
        jointNumbers: jointLimitReachedIndices.map((i) => i + 1).join(", "),
      })}
    </Typography>
  )
}
