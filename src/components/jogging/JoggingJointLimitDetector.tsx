import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import isEqual from "lodash-es/isEqual.js"
import { observer } from "mobx-react-lite"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAnimationFrame } from "../utils/hooks"
import type { JoggingStore } from "./JoggingStore"

/**
 * Monitors the active robot motion state and displays a message if
 * any joint limits are reached.
 */
export const JoggingJointLimitDetector = observer(
  ({ store }: { store: JoggingStore }) => {
    const { t } = useTranslation()

    const [jointLimitsReached, setJointLimitsReached] = useState(
      store.jogger.motionStream.rapidlyChangingMotionState.joint_limit_reached
        .limit_reached,
    )
    const jointLimitsReachedRef = useRef(jointLimitsReached)

    useAnimationFrame(() => {
      const newLimitsReached =
        store.jogger.motionStream.rapidlyChangingMotionState.joint_limit_reached
          .limit_reached

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Typography
          data-testid="jogging-joint-limit-detector"
          aria-label="jogging-joint-limit-detector"
          color="error"
          variant="body2"
          sx={{
            fontSize: "0.75rem",
            lineHeight: 1.2,
            visibility: jointLimitReachedIndices.length ? "visible" : "hidden",
          }}
        >
          {t("Jogging.JointLimitsReached.lb", {
            jointNumbers: jointLimitReachedIndices.map((i) => i + 1).join(", "),
          })}
        </Typography>
      </Box>
    )
  },
)
