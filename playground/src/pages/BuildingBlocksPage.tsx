import Box from "@mui/material/Box"
import Portal from "@mui/material/Portal"
import Stack from "@mui/material/Stack"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
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
  CurrentPoseBar,
  type JogAxis,
  type JogDirection,
  JoggingButtons,
  JoggingCartesianAxisControl,
  JoggingGizmo,
  JoggingJointSlider,
  JoggingJointValueControl,
  type JoggingStore,
  LoadingCover,
  LoadingErrorMessage,
  NoMotionGroupModal,
  VelocitySlider,
  VelocitySliderLabel,
} from "@wandelbots/wandelbots-js-react-components"
import { observer } from "mobx-react-lite"
import { type ReactNode, useEffect, useState } from "react"
import { Quaternion } from "three"
import { startJogging, stopJogging, useJoggingStore } from "../connections"
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

  const simpleParts = (
    <Section
      title="JoggingGizmo, JoggingButtons, JoggingJointSlider and CurrentPoseBar"
      description="The simple parts: plain props and callbacks, no store. This page moves the robot with its JoggingStore in onJogStart and onJogStop. Hold a control to move; let go, leave it or press a key to stop."
    >
      {withStore((store) => (
        <SimpleParts store={store} />
      ))}
    </Section>
  )
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
          {simpleParts}
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
            startJogging={(direction) =>
              startJogging(store, { axis, direction })
            }
            stopJogging={() => stopJogging(store)}
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
          startJogging={(direction) =>
            startJogging(store, { joint: 0, direction })
          }
          stopJogging={() => stopJogging(store)}
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

/** A value that changes on every frame, as the motion state does */
function useEveryFrameValue<T>(read: () => T): T {
  const [value, setValue] = useState(read)
  useEffect(() => {
    let frame = 0
    const update = () => {
      setValue(read)
      frame = requestAnimationFrame(update)
    }
    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [read])
  return value
}

const SimpleParts = observer(({ store }: { store: JoggingStore }) => {
  const [motion, setMotion] = useState<"translate" | "rotate">("translate")
  // No 3D view on this page: the gizmo shows the axes as seen from the front
  const [orientation] = useState(() => ({ current: new Quaternion() }))
  const [readJoints] = useState(
    () => () =>
      store.jogger.motionStream.rapidlyChangingMotionState.joint_position.join(
        " ",
      ),
  )
  const joints = useEveryFrameValue(readJoints).split(" ").map(Number)

  // Without an inverse solver (a linear axis or a turntable), the TCP cannot
  // move along an axis
  const tcpDisabled = store.isLocked || store.inverseSolver === null
  const linear = store.jointType !== JointTypeEnum.RevoluteJoint
  const limits =
    store.motionGroupDescription.operation_limits.auto_limits?.joints

  const jogTcp = (axis: JogAxis, direction: JogDirection) =>
    startJogging(store, { axis, direction, rotate: motion === "rotate" })
  const stop = () => stopJogging(store)

  return (
    <Stack gap={3}>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={motion}
        onChange={(_, value) => value && setMotion(value)}
      >
        <ToggleButton value="translate">Translate</ToggleButton>
        <ToggleButton value="rotate">Rotate</ToggleButton>
      </ToggleButtonGroup>
      <Stack direction="row" gap={4} flexWrap="wrap" alignItems="center">
        <DemoBox label="JoggingGizmo">
          <Box sx={{ width: 220, height: 220 }}>
            <JoggingGizmo
              orientation={orientation}
              motion={motion}
              onJogStart={jogTcp}
              onJogStop={stop}
              disabled={tcpDisabled}
            />
          </Box>
        </DemoBox>
        <DemoBox label="JoggingButtons">
          <JoggingButtons
            motion={motion}
            onJogStart={jogTcp}
            onJogStop={stop}
            disabled={tcpDisabled}
          />
        </DemoBox>
      </Stack>
      <Stack gap={2} sx={{ maxWidth: 420 }}>
        {joints.map((value, index) => (
          <JoggingJointSlider
            // biome-ignore lint/suspicious/noArrayIndexKey: one slider per joint, in order
            key={index}
            label={`J${index + 1}`}
            value={value}
            min={limits?.[index]?.position?.lower_limit}
            max={limits?.[index]?.position?.upper_limit}
            linear={linear}
            onJogStart={(direction) =>
              startJogging(store, { joint: index, direction })
            }
            onJogStop={stop}
            disabled={store.isLocked}
          />
        ))}
      </Stack>
      <CurrentPoseBar
        getCurrentPose={() => {
          const pose =
            store.jogger.motionStream.rapidlyChangingMotionState.tcp_pose
          if (!pose?.position || !pose.orientation) return null
          const [x = 0, y = 0, z = 0] = pose.position
          const [rx = 0, ry = 0, rz = 0] = pose.orientation
          return { position: [x, y, z], orientation: [rx, ry, rz] }
        }}
      />
    </Stack>
  )
})
