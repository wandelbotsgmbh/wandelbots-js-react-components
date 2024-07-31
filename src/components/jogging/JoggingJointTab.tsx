import { Stack, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"
import { radiansToDegrees } from "@wandelbots/wandelbots-js"
import type { JoggingStore } from "./JoggingStore"
import { JoggingVelocitySlider } from "./JoggingVelocitySlider"
import { JoggingJointRotationControl } from "./JoggingJointRotationControl"
import { JoggingJointValues } from "./JoggingJointValues"

export const JoggingJointTab = observer(
  ({ store }: { store: JoggingStore; }) => {
    async function startJointJogging(opts: {
      joint: number
      direction: "-" | "+"
    }) {
      await store.jogger.startJointRotation({
        joint: opts.joint,
        direction: opts.direction,
        velocityRadsPerSec: store.rotationVelocityRadsPerSec,
      })
    }

    async function stopJointJogging() {
      await store.jogger.stop()
    }
  
    return (
      <Stack>
        <JoggingJointValues store={store} />
        <Stack>
          {store.jogger.motionStream.joints.map((joint) => {
            const jointLimits =
              store.motionGroupSpec.mechanical_joint_limits?.[
                joint.index
              ]
            const lowerLimitDegs =
              jointLimits?.lower_limit !== undefined
                ? radiansToDegrees(jointLimits.lower_limit)
                : undefined
            const upperLimitDegs =
              jointLimits?.upper_limit !== undefined
                ? radiansToDegrees(jointLimits.upper_limit)
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
                <JoggingJointRotationControl
                  key={joint.index}
                  disabled={store.isLocked}
                  lowerLimitDegs={lowerLimitDegs}
                  upperLimitDegs={upperLimitDegs}
                  getValueDegs={() => {
                    const value =
                      store.jogger.motionStream.rapidlyChangingMotionState.state
                        .joint_position.joints[joint.index]
                    return value !== undefined
                      ? radiansToDegrees(value)
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
        <JoggingVelocitySlider store={store} />
      </Stack>
    )
  },
)
