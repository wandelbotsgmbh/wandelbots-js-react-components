import { Stack, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useActiveRobot } from "./RobotPadContext"
import { radiansToDegree } from "@/util/converters"
import type { JoggingStore } from "./JoggingStore"
import type { MotionGroupJogger } from "./MotionGroupJogger"
import { JoggingVelocitySlider } from "./JoggingVelocitySlider"
import { JoggingJointButtonPair } from "./JoggingJointButtonPair"
import { useTranslation } from "react-i18next"
import { JoggingJointValues } from "./JoggingJointValues"

export const JoggingJointTab = observer(
  ({ store, jogger }: { store: JoggingStore; jogger: MotionGroupJogger }) => {
    const activeRobot = useActiveRobot()
    const { robotPad } = activeRobot

    // async function runIncrementalJointJog(
    //   increment: DiscreteIncrementOption,
    //   joint: number,
    //   direction: "-" | "+",
    // ) {
    //   const currentJoints =
    //     activeRobot.rapidlyChangingMotionState.joint_position

    //   try {
    //     store.setIncrementJoggingInProgress(true)
    //     await jogger.runIncrementalJointRotation({
    //       joint,
    //       currentJoints,
    //       velocityRadsPerSec: store.rotationVelocityRadsPerSec,
    //       direction,
    //       distanceRads: degreesToRadians(increment.degrees),
    //     })
    //   } finally {
    //     store.setIncrementJoggingInProgress(false)
    //   }
    // }

    async function startJointJogging(opts: {
      joint: number
      direction: "-" | "+"
    }) {
      if (robotPad.isLocked) return

      // if (store.selectedDiscreteIncrement) {
      //   return runIncrementalJointJog(
      //     store.selectedDiscreteIncrement,
      //     opts.joint,
      //     opts.direction,
      //   )
      // }

      await jogger.startJointJogging({
        joint: opts.joint,
        direction: opts.direction,
        velocityRadsPerSec: store.rotationVelocityRadsPerSec,
      })
    }

    async function stopJointJogging() {
      // if (robotPad.isLocked) return
      // if (store.selectedDiscreteIncrement) return

      await jogger.stopJogging()
    }
    return (
      <Stack>
        <JoggingVelocitySlider store={store} />
        <JoggingJointValues />
        <Stack>
          {activeRobot.joints.map((joint) => {
            const jointLimits =
              activeRobot.motionGroupSpecification.mechanical_joint_limits?.[
                joint.index
              ]
            const lowerLimitDegs =
              jointLimits?.lower_limit !== undefined
                ? radiansToDegree(jointLimits.lower_limit)
                : undefined
            const upperLimitDegs =
              jointLimits?.upper_limit !== undefined
                ? radiansToDegree(jointLimits.upper_limit)
                : undefined

            return (
              <Stack
                direction="row"
                alignItems="center"
                gap={2}
                key={`joint-${joint.index}`}
                marginTop="0.8rem"
              >
                <Typography
                  sx={{
                    flexGrow: 1,
                    textAlign: "right",
                  }}
                >{`J${joint.index + 1}`}</Typography>
                <JoggingJointButtonPair
                  key={joint.index}
                  disabled={robotPad.isLocked}
                  lowerLimitDegs={lowerLimitDegs}
                  upperLimitDegs={upperLimitDegs}
                  getValueDegs={() => {
                    const value =
                      activeRobot.rapidlyChangingMotionState.state
                        .joint_position.joints[joint.index]
                    return value !== undefined
                      ? radiansToDegree(value)
                      : undefined
                  }}
                  startJogging={(direction: "-" | "+") =>
                    startJointJogging({
                      joint: joint.index,
                      direction,
                    })
                  }
                  stopJogging={stopJointJogging}
                />
                {/* Just to balance out the right side */}
                <Typography
                  sx={{
                    flexGrow: 1,
                  }}
                />
              </Stack>
            )
          })}
        </Stack>
      </Stack>
    )
  },
)
