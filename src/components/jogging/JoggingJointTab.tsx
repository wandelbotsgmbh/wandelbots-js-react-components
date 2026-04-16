import { Divider, Stack, Typography, useTheme } from "@mui/material"
import { observer } from "mobx-react-lite"
import type { ReactNode } from "react"
import { JoggingJointLimitDetector } from "./JoggingJointLimitDetector"
import { JoggingJointValueControl } from "./JoggingJointValueControl"
import { type JoggingStore, JointCategory } from "./JoggingStore"
import { JoggingVelocitySlider } from "./JoggingVelocitySlider"

export const JoggingJointTab = observer(
  ({ store, children }: { store: JoggingStore; children: ReactNode }) => {
    const theme = useTheme()
    async function startJointJogging(opts: {
      joint: number
      direction: "-" | "+",
    }) {
      await store.activate()

      await store.jogger.rotateJoints({
        joint: opts.joint,
        direction: opts.direction,
        velocityUnit:
          store.jointCategory === JointCategory.PRISMATIC
            ? "mm/s"
            : "rad/s",
        velocityValue:
          store.jointCategory === JointCategory.PRISMATIC
            ? store.translationVelocityMmPerSec
            : store.rotationVelocityRadsPerSec,

      })
    }

    async function stopJointJogging() {
      await store.jogger.stop()
      await store.deactivate()
    }

    return (
      <Stack
        data-testid="jogging-joint-tab"
        aria-label="jogging-joint-tab"
        flexGrow={1}
        gap={2}
        sx={{ padding: "18px 24px" }}
      >
        <JoggingVelocitySlider
          store={store}
          useDegree={
            store.jointCategory === JointCategory.REVOLUTE
          }
        />

        <Divider />

        <Stack
          justifyContent="center"
          alignItems="stretch"
          sx={{ flexGrow: "1" }}
        >
          <Stack
            data-testid="jogging-joint-value-controls-wrapper"
            aria-label="jogging-joint-value-controls-wrapper"
            alignItems="center"
            gap="24px"
          >
            {store.jogger.motionStream.joints.map((joint) => {
              const jointLimits =
                store.motionGroupDescription.operation_limits.auto_limits
                  ?.joints?.[joint.index]?.position

              return (
                <Stack
                  key={`joint-${joint.index}`}
                  data-testid={`jogging-joint-tab-${joint.index}`}
                  aria-label={`jogging-joint-tab-${joint.index}`}
                  direction="row"
                  alignItems="center"
                  justifyContent={"center"}
                  spacing={1.5}
                  width={"100%"}
                >
                  {store.showJointsLegend && (
                    <Typography
                      color={
                        store.isLocked
                          ? theme.palette.text.disabled
                          : theme.palette.text.secondary
                      }
                    >
                      {`G${joint.index + 1}`}
                    </Typography>
                  )}

                  <JoggingJointValueControl
                    data-testid={`jogging-joint-value-control-${joint.index}`}
                    aria-label={`jogging-joint-value-control-${joint.index}`}
                    disabled={store.isLocked}
                    lowerLimit={jointLimits?.lower_limit}
                    upperLimit={jointLimits?.upper_limit}
                    useDegree={
                      store.jointCategory === JointCategory.REVOLUTE
                    }

                    getValue={() => {
                      const value =
                        store.jogger.motionStream.rapidlyChangingMotionState
                          .joint_position[joint.index]
                      return value !== undefined
                        ? value
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
                </Stack>
              )
            })}
          </Stack>
        </Stack>
        <JoggingJointLimitDetector store={store} />

        {children && <Divider />}

        {/* Custom content */}
        {children}
      </Stack>
    )
  },
)
