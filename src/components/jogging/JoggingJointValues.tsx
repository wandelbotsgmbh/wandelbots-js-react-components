import { observer } from "mobx-react-lite"
import { useActiveRobot } from "./RobotPadContext"
import { Stack, Typography } from "@mui/material"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

export const JoggingJointValues = observer(() => {
  const activeRobot = useActiveRobot()
  const valueHolderRef = useRef<HTMLPreElement>(null)
  const { t } = useTranslation()

  function getCurrentValueString() {
    const joints =
      activeRobot.rapidlyChangingMotionState.state.joint_position.joints
    return `{${joints.map((j) => parseFloat(j.toFixed(4))).join(", ")}}`
  }

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
})
