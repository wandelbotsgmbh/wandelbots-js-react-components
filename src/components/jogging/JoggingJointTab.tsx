import { Button, Divider, Stack } from "@mui/material"
import { radiansToDegrees } from "@wandelbots/wandelbots-js"
import { observer } from "mobx-react-lite"
import type { ReactNode } from "react"
import { JoggingActivationRequired } from "./JoggingActivationRequired"
import { JoggingCartesianValues } from "./JoggingCartesianValues"
import { JoggingJointLimitDetector } from "./JoggingJointLimitDetector"
import { JoggingJointRotationControl } from "./JoggingJointRotationControl"
import type { JoggingStore } from "./JoggingStore"
import { JoggingVelocitySlider } from "./JoggingVelocitySlider"

export const JoggingJointTab = observer(
  ({ store, children }: { store: JoggingStore; children: ReactNode }) => {
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
      <Stack flexGrow={1} gap={2} sx={{ padding: "18px 24px" }}>
        <JoggingVelocitySlider store={store} />
        <Divider />

        <Stack
          justifyContent="center"
          alignItems="stretch"
          sx={{ flexGrow: "1" }}
          id="JointControls"
        >
          <JoggingActivationRequired store={store}>
            <Stack alignItems="center" gap="24px" sx={{ flexGrow: 1 }}>
              {store.jogger.motionStream.joints.map((joint) => {
                const jointLimits =
                  store.motionGroupSpec.mechanical_joint_limits?.[joint.index]
                const lowerLimitDegs =
                  jointLimits?.lower_limit !== undefined
                    ? radiansToDegrees(jointLimits.lower_limit)
                    : undefined
                const upperLimitDegs =
                  jointLimits?.upper_limit !== undefined
                    ? radiansToDegrees(jointLimits.upper_limit)
                    : undefined

                return (
                  <JoggingJointRotationControl
                    key={`joint-${joint.index}`}
                    disabled={store.isLocked}
                    lowerLimitDegs={lowerLimitDegs}
                    upperLimitDegs={upperLimitDegs}
                    getValueDegs={() => {
                      const value =
                        store.jogger.motionStream.rapidlyChangingMotionState
                          .state.joint_position.joints[joint.index]
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
                )
              })}
            </Stack>
          </JoggingActivationRequired>
        </Stack>
        <JoggingJointLimitDetector store={store} />

        <Divider />

        {/* Show Wandelscript string for the current coords */}
        <Stack
          direction="row"
          gap={"12px"}
          sx={{ minWidth: 0, overflow: "hidden" }}
        >
          <JoggingCartesianValues store={store} />
          <Button variant="contained" color="secondary">
            Save
          </Button>
        </Stack>

        {/* Custom content */}
        {children}
      </Stack>
    )
  },
)
