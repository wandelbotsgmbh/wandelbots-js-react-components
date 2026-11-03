import Box from "@mui/material/Box"
import Portal from "@mui/material/Portal"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import {
  ColorsBlue900,
  ColorsGreen100,
  ColorsGreen500,
  ColorsGreen800,
  ColorsGreen900,
  ColorsLightBlue100,
  ColorsLightBlue700,
  ColorsLightBlue900,
  ColorsRed100,
  ColorsRed500,
  ColorsRed800,
  ColorsRed900,
} from "@wandelbots/design-tokens"
import { ElevationCard, PrimaryButton, SecondaryButton } from "@wandelbots/mui"
import { JointTypeEnum } from "@wandelbots/nova-js/v2"
import {
  type AxisControlComponentColors,
  JoggingCartesianAxisControl,
  JoggingJointValueControl,
  type JoggingStore,
  LoadingCover,
  LoadingErrorMessage,
  NoMotionGroupModal,
  VelocitySlider,
  VelocitySliderLabel,
} from "@wandelbots/wandelbots-js-react-components"
import { observer } from "mobx-react-lite"
import { type ReactNode, useState } from "react"
import { useJoggingStore } from "../connections"
import type { PageProps } from "."

/**
 * The small parts alone, to check their look. The parts that move the robot
 * or show its values use a JoggingStore of the selected motion group.
 */
export function BuildingBlocksPage({ instance, motionGroup }: PageProps) {
  const jogging = useJoggingStore(instance, motionGroup.motionGroupId)
  const store = jogging.value

  function withStore(render: (store: JoggingStore) => ReactNode) {
    return store ? (
      render(store)
    ) : (
      <DemoBox>
        <LoadingCover message="Loading jogging" error={jogging.error} />
      </DemoBox>
    )
  }

  const cartesian = (
    <Section
      title="JoggingCartesianAxisControl"
      description="Moves the TCP along the axis while a button is pressed, and shows the TCP position. The colors are from the design tokens."
    >
      {withStore((store) => (
        <CartesianAxisControls store={store} />
      ))}
    </Section>
  )
  const joint = (
    <Section
      title="JoggingJointValueControl"
      description="Moves a joint while a button is pressed, and shows its position and limits."
    >
      {withStore((store) => (
        <JointValueControls store={store} />
      ))}
    </Section>
  )
  const velocity = (
    <Section
      title="VelocitySlider and VelocitySliderLabel"
      description="The velocity of the JoggingStore: with the default label, with a custom label, and the label alone."
    >
      {withStore((store) => (
        <VelocitySliders store={store} />
      ))}
    </Section>
  )
  const loadingCover = (
    <Section
      title="LoadingCover and LoadingErrorMessage"
      description="Loading, loading for a long time (the text shows after softTimeout), an error, and the error message alone."
    >
      <LoadingCoverStates />
    </Section>
  )
  const modal = (
    <Section
      title="NoMotionGroupModal"
      description="The modal that an app shows when the cell has no motion group. It has no close button of its own."
    >
      <NoMotionGroupModalButton baseUrl={instance.url} />
    </Section>
  )

  // Two columns on a wide screen, so that most parts fit on one screen
  return (
    <Box sx={{ position: "absolute", inset: 0, overflowY: "auto" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          alignItems: "start",
          gap: 3,
          p: 3,
        }}
      >
        <Stack gap={3}>
          {cartesian}
          {velocity}
          {modal}
        </Stack>
        <Stack gap={3}>
          {joint}
          {loadingCover}
        </Stack>
      </Box>
    </Box>
  )
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <ElevationCard component="section" sx={{ p: 3 }}>
      <Stack gap={2}>
        <Box>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
        {children}
      </Stack>
    </ElevationCard>
  )
}

/** A box of a fixed size for parts that fill their parent */
function DemoBox({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <Stack gap={1}>
      {label && (
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      )}
      <Box
        sx={{
          position: "relative",
          width: 300,
          height: 170,
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Stack>
  )
}

/** Axis colors from the design tokens (the default colors of the library are internal) */
function axisColors(
  background: string,
  button: string,
  pressed: string,
  text: string,
): AxisControlComponentColors {
  return {
    color: text,
    labelColor: text,
    backgroundColor: background,
    borderColor: background,
    buttonBackgroundColor: {
      default: button,
      hovered: button,
      disabled: button,
      pressed,
    },
  }
}

const AXES = [
  {
    axis: "x",
    colors: axisColors(ColorsRed800, ColorsRed500, ColorsRed900, ColorsRed100),
  },
  {
    axis: "y",
    colors: axisColors(
      ColorsGreen800,
      ColorsGreen500,
      ColorsGreen900,
      ColorsGreen100,
    ),
  },
  {
    axis: "z",
    colors: axisColors(
      ColorsLightBlue900,
      ColorsLightBlue700,
      ColorsBlue900,
      ColorsLightBlue100,
    ),
  },
] as const

function AxisLabel({ children }: { children: ReactNode }) {
  return <Typography sx={{ fontSize: 24 }}>{children}</Typography>
}

const CartesianAxisControls = observer(({ store }: { store: JoggingStore }) => {
  async function startJogging(axis: "x" | "y" | "z", direction: "-" | "+") {
    await store.jogger.setJoggingMode("jogging")
    await store.jogger.translateTCP({
      axis,
      direction,
      velocityMmPerSec: store.translationVelocityMmPerSec,
    })
  }

  async function stopJogging() {
    await store.jogger.stop()
    await store.deactivate()
  }

  // Without an inverse solver (a linear axis or a turntable), the TCP cannot
  // move along an axis: JoggingPanel then has no cartesian tab
  const disabled = store.isLocked || store.inverseSolver === null

  function tcpPosition(index: number) {
    const position =
      store.jogger.motionStream.rapidlyChangingMotionState.tcp_pose?.position
    const value = position?.[index]
    return value === undefined ? "–" : `${value.toFixed(1)} mm`
  }

  return (
    <Stack direction="row" gap={4} flexWrap="wrap" alignItems="flex-end">
      <Stack gap={2}>
        {AXES.map(({ axis, colors }, index) => (
          <JoggingCartesianAxisControl
            key={axis}
            colors={colors}
            label={<AxisLabel>{axis.toUpperCase()}</AxisLabel>}
            getDisplayedValue={() => tcpPosition(index)}
            startJogging={(direction) => startJogging(axis, direction)}
            stopJogging={stopJogging}
            disabled={disabled}
          />
        ))}
      </Stack>
      <Stack gap={2}>
        <Typography variant="caption" color="text.secondary">
          Disabled, and with activeJoggingDirection "+"
        </Typography>
        <JoggingCartesianAxisControl
          colors={AXES[0].colors}
          label={<AxisLabel>X</AxisLabel>}
          getDisplayedValue={() => tcpPosition(0)}
          startJogging={() => {}}
          stopJogging={() => {}}
          disabled
        />
        <JoggingCartesianAxisControl
          colors={AXES[0].colors}
          label={<AxisLabel>X</AxisLabel>}
          getDisplayedValue={() => tcpPosition(0)}
          startJogging={() => {}}
          stopJogging={() => {}}
          activeJoggingDirection="+"
        />
      </Stack>
    </Stack>
  )
})

const JointValueControls = observer(({ store }: { store: JoggingStore }) => {
  const revolute = store.jointType === JointTypeEnum.RevoluteJoint

  async function startJogging(direction: "-" | "+") {
    await store.jogger.setJoggingMode("jogging")
    await store.jogger.rotateJoints({
      joint: 0,
      direction,
      velocityUnit: revolute ? "rad/s" : "mm/s",
      velocityValue: revolute
        ? store.rotationVelocityRadsPerSec
        : store.translationVelocityMmPerSec,
    })
  }

  async function stopJogging() {
    await store.jogger.stop()
    await store.deactivate()
  }

  function jointProps(index: number) {
    const limits =
      store.motionGroupDescription.operation_limits.auto_limits?.joints?.[index]
        ?.position
    return {
      useDegree: revolute,
      lowerLimit: limits?.lower_limit,
      upperLimit: limits?.upper_limit,
      getValue: () =>
        store.jogger.motionStream.rapidlyChangingMotionState.joint_position[
          index
        ],
    }
  }

  return (
    <Stack direction="row" gap={4} flexWrap="wrap">
      <Stack gap={1} sx={{ width: 260 }}>
        <Typography variant="caption" color="text.secondary">
          Joint 1
        </Typography>
        <JoggingJointValueControl
          {...jointProps(0)}
          startJogging={startJogging}
          stopJogging={stopJogging}
          disabled={store.isLocked}
        />
      </Stack>
      <Stack gap={1} sx={{ width: 260 }}>
        <Typography variant="caption" color="text.secondary">
          Joint 2, disabled
        </Typography>
        <JoggingJointValueControl
          {...jointProps(1)}
          startJogging={() => {}}
          stopJogging={() => {}}
          disabled
        />
      </Stack>
    </Stack>
  )
})

const VelocitySliders = observer(({ store }: { store: JoggingStore }) => (
  <Stack gap={2} sx={{ maxWidth: 480 }}>
    <VelocitySlider
      store={store}
      useDegree
      velocity={store.velocityInDisplayUnits(true)}
      min={store.minVelocityInDisplayUnits(true)}
      max={store.maxVelocityInDisplayUnits(true)}
      onVelocityChange={store.setVelocityFromSlider}
    />
    <VelocitySlider
      store={store}
      useDegree={false}
      velocity={store.velocityInDisplayUnits(false)}
      min={store.minVelocityInDisplayUnits(false)}
      max={store.maxVelocityInDisplayUnits(false)}
      onVelocityChange={store.setVelocityFromSlider}
      renderValue={(value) => (
        <VelocitySliderLabel value={`v = ${value} mm/s`} />
      )}
    />
    <Box sx={{ alignSelf: "flex-start" }}>
      <VelocitySliderLabel value="ω = 30 °/s" />
    </Box>
  </Stack>
))

const EXAMPLE_ERROR = new Error(
  "Example error: the controller did not answer within 5 seconds",
)
const OTHER_EXAMPLE_ERROR = new Error("Example error: the model is missing")

function LoadingCoverStates() {
  return (
    <Stack direction="row" gap={2} flexWrap="wrap">
      <DemoBox label="Loading">
        {/* A long softTimeout keeps the text for a slow load hidden */}
        <LoadingCover message="Loading the robot" softTimeout={3_600_000} />
      </DemoBox>
      <DemoBox label="Slow (after softTimeout)">
        <LoadingCover message="Loading the robot" softTimeout={1} />
      </DemoBox>
      <DemoBox label="Error">
        <LoadingCover message="Loading the robot" error={EXAMPLE_ERROR} />
      </DemoBox>
      <DemoBox label="LoadingErrorMessage">
        <LoadingErrorMessage
          loadingMessage="Loading the robot"
          error={OTHER_EXAMPLE_ERROR}
        />
      </DemoBox>
    </Stack>
  )
}

function NoMotionGroupModalButton({ baseUrl }: { baseUrl: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <PrimaryButton onClick={() => setOpen(true)}>
        Show NoMotionGroupModal
      </PrimaryButton>
      {open && (
        <>
          <NoMotionGroupModal baseUrl={baseUrl} />
          {/* Over the modal, which cannot close itself */}
          <Portal>
            <SecondaryButton
              onClick={() => setOpen(false)}
              sx={{
                position: "fixed",
                top: 0,
                right: 0,
                m: 2,
                zIndex: (theme) => theme.zIndex.modal + 1,
              }}
            >
              Close the modal
            </SecondaryButton>
          </Portal>
        </>
      )}
    </Box>
  )
}
