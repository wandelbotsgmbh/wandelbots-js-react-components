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
  type ConnectedMotionGroup,
  JoggingButtons,
  JoggingCartesianAxisControl,
  JoggingGizmo,
  JoggingGizmoOrientation,
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
import { type ReactNode, useRef, useState } from "react"
import type { Quaternion } from "three"
import { startJogging, stopJogging, useJoggingStore } from "../connections"
import { cannotJog, useToolFrame } from "../jogging"
import { FitCamera, MotionGroupModel, Viewport } from "../scene"
import type { PageProps } from "."
import { CurrentPoseBarDemo } from "./CurrentPoseBarDemo"
import { RobotControlPanelDemo } from "./RobotControlPanelDemo"

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

  const panel = (
    <Section
      title="RobotControlPanel"
      description="The whole Robot control panel of the design, built from the parts below. Translate and Rotate: the TCP and the frame to jog along, Continuous (jog while held) or Increment (one step per click), the velocity, the step size, and the gizmo or the buttons (the switch at the top right of the jog area). Joint: a JoggingJointSlider per joint, one joint at a time, and the joint velocity. Move to: type a pose or take the current one, and hold the button to move there (planned as the pose changes, paused on release). It is wired to the JoggingStore of the motion group. The 3D view next to it turns its gizmo: orbit the view, and the gizmo turns with it."
    >
      {withStore((store) => (
        <RobotControlPanelDemo
          instance={instance}
          store={store}
          motionGroup={motionGroup}
        />
      ))}
    </Section>
  )
  const poseBar = (
    <Section
      title="CurrentPoseBar"
      description="The bar under the 3D view: the current position of the TCP in a TCP and a frame of the bar's own (not the panel's), the button to copy it as Move to reads it, Orientation format (the gear: rotation vector, Euler angles in any of NOVA's 24 conventions, or quaternion; radians or degrees), and the state of the motion stream, or the last jog error. Jog with the panel above to see the values change."
    >
      {withStore((store) => (
        <CurrentPoseBarDemo store={store} />
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
  const jointSliders = (
    <Section
      title="JoggingJointSlider"
      description="Joint 1 as a slider across its limits; an app shows one per joint. Hover the track to see the goal under the pointer; press there to jog the joint toward it until it gets there or you let go. While held, the goal follows the pointer. A held arrow key jogs the focused slider toward a limit. Below it, joint 2, disabled."
    >
      {withStore((store) => (
        <JointSliders store={store} />
      ))}
    </Section>
  )
  const gizmo = (
    <Section
      title="JoggingGizmo and JoggingGizmoOrientation"
      description="Moves the TCP along an axis while a handle is held (Translate), or turns it about one (Rotate): an axis of the world frame, or of the tool. JoggingGizmoOrientation in the 3D view turns the gizmo like the camera, and its frameQuaternion like the tool when it jogs along the tool's axes: orbit the view or turn the tool, and the gizmo turns with it."
    >
      {withStore((store) => (
        <Gizmos store={store} motionGroup={motionGroup} />
      ))}
    </Section>
  )
  const buttons = (
    <Section
      title="JoggingButtons"
      description="Moves the TCP along an axis while a button is held (Translate), or turns it about one (Rotate): an axis of the world frame, or of the tool. It takes the same props as JoggingGizmo, but does not turn with the 3D view: X+ is X+ of the frame, wherever the camera looks from."
    >
      {withStore((store) => (
        <Buttons store={store} />
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
        {/* The whole panel first, across both columns */}
        <Box sx={{ gridColumn: "1 / -1" }}>{panel}</Box>
        <Box sx={{ gridColumn: "1 / -1" }}>{poseBar}</Box>
        <Stack gap={3}>
          {cartesian}
          {velocity}
          {jointSliders}
          {modal}
        </Stack>
        <Stack gap={3}>
          {joint}
          {gizmo}
          {buttons}
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

const JointSliders = observer(({ store }: { store: JoggingStore }) => {
  const [angleUnit, setAngleUnit] = useState<"deg" | "rad">("deg")
  // A prismatic joint (a linear axis) is in mm
  const linear = store.jointType !== JointTypeEnum.RevoluteJoint
  const limits = (index: number) =>
    store.motionGroupDescription.operation_limits.auto_limits?.joints?.[index]
      ?.position
  const values =
    store.jogger.motionStream.rapidlyChangingMotionState.joint_position
  const sixAxis = values.length === 6

  return (
    <Stack gap={2}>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={angleUnit}
        onChange={(_, value) => value && setAngleUnit(value)}
        aria-label="Angle unit"
        sx={{ alignSelf: "flex-start" }}
      >
        <ToggleButton value="deg">Degrees</ToggleButton>
        <ToggleButton value="rad">Radians</ToggleButton>
      </ToggleButtonGroup>
      <JoggingJointSlider
        label="J1"
        name={sixAxis ? "Base" : undefined}
        value={values[0] ?? 0}
        min={limits(0)?.lower_limit}
        max={limits(0)?.upper_limit}
        linear={linear}
        angleUnit={angleUnit}
        onJogStart={(direction) => startJogging(store, { joint: 0, direction })}
        onJogStop={() => stopJogging(store)}
        // Joints jog without the inverse solver
        disabled={store.isLocked}
      />
      <Stack gap={1}>
        <Typography variant="caption" color="text.secondary">
          Joint 2, disabled
        </Typography>
        <JoggingJointSlider
          label="J2"
          name={sixAxis ? "Shoulder" : undefined}
          value={values[1] ?? 0}
          min={limits(1)?.lower_limit}
          max={limits(1)?.upper_limit}
          linear={linear}
          angleUnit={angleUnit}
          onJogStart={() => {}}
          onJogStop={() => {}}
          disabled
        />
      </Stack>
    </Stack>
  )
})

const Gizmos = observer(
  ({
    store,
    motionGroup,
  }: {
    store: JoggingStore
    motionGroup: ConnectedMotionGroup
  }) => {
    const orientation = useRef<Quaternion | null>(null)
    const [motion, setMotion] = useState<Motion>("translate")
    const [frame, setFrame] = useState<Frame>("world")
    const toolFrame = useToolFrame(store)
    const disabled = cannotJog(store)

    return (
      <Stack gap={2}>
        <JogOptions
          motion={motion}
          onMotion={setMotion}
          frame={frame}
          onFrame={setFrame}
        >
          <TcpOrientation store={store} />
        </JogOptions>
        <Stack direction="row" gap={3} flexWrap="wrap" alignItems="flex-start">
          <Box
            sx={{
              position: "relative",
              width: 260,
              height: 260,
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <Viewport>
              <FitCamera>
                {(refit) => (
                  <MotionGroupModel
                    motionGroup={motionGroup}
                    onModelLoaded={refit}
                  />
                )}
              </FitCamera>
              {/* Anywhere in the 3D view: it translates NOVA's Z up itself */}
              <JoggingGizmoOrientation target={orientation} />
            </Viewport>
          </Box>
          <JoggingGizmo
            orientation={orientation}
            frameQuaternion={frame === "tool" ? toolFrame : undefined}
            motion={motion}
            onJogStart={(axis, direction) =>
              startJogging(store, {
                axis,
                direction,
                rotate: motion === "rotate",
                tool: frame === "tool",
              })
            }
            onJogStop={() => stopJogging(store)}
            disabled={disabled}
          />
          <Stack gap={1}>
            <Typography variant="caption" color="text.secondary">
              Disabled, and with activeHandle X+ (Rx+ when rotating)
            </Typography>
            <JoggingGizmo
              orientation={orientation}
              motion={motion}
              onJogStart={() => {}}
              onJogStop={() => {}}
              disabled
              size={120}
            />
            <JoggingGizmo
              orientation={orientation}
              motion={motion}
              onJogStart={() => {}}
              onJogStop={() => {}}
              activeHandle={{ axis: "x", direction: "+" }}
              size={120}
            />
          </Stack>
        </Stack>
      </Stack>
    )
  },
)

const Buttons = observer(({ store }: { store: JoggingStore }) => {
  const [motion, setMotion] = useState<Motion>("translate")
  const [frame, setFrame] = useState<Frame>("world")

  return (
    <Stack gap={2}>
      <JogOptions
        motion={motion}
        onMotion={setMotion}
        frame={frame}
        onFrame={setFrame}
      />
      <JoggingButtons
        motion={motion}
        onJogStart={(axis, direction) =>
          startJogging(store, {
            axis,
            direction,
            rotate: motion === "rotate",
            tool: frame === "tool",
          })
        }
        onJogStop={() => stopJogging(store)}
        disabled={cannotJog(store)}
      />
      <Typography variant="caption" color="text.secondary">
        Disabled, and disabled with activeHandle X+ (Rx+ when rotating), as
        while a step runs
      </Typography>
      <Stack direction="row" gap={3} flexWrap="wrap">
        <JoggingButtons
          motion={motion}
          onJogStart={() => {}}
          onJogStop={() => {}}
          disabled
        />
        <JoggingButtons
          motion={motion}
          onJogStart={() => {}}
          onJogStop={() => {}}
          disabled
          activeHandle={{ axis: "x", direction: "+" }}
        />
      </Stack>
    </Stack>
  )
})

type Motion = "translate" | "rotate"
type Frame = "world" | "tool"

/**
 * Translate or rotate, along the world's or the tool's axes: what an app's
 * jogging panel lets pick for the gizmo and the buttons
 */
function JogOptions({
  motion,
  onMotion,
  frame,
  onFrame,
  children,
}: {
  motion: Motion
  onMotion: (motion: Motion) => void
  frame: Frame
  onFrame: (frame: Frame) => void
  children?: ReactNode
}) {
  return (
    <Stack direction="row" gap={3} alignItems="center" flexWrap="wrap">
      <ToggleButtonGroup
        exclusive
        size="small"
        value={motion}
        onChange={(_, value) => value && onMotion(value)}
        aria-label="Motion"
      >
        <ToggleButton value="translate">Translate</ToggleButton>
        <ToggleButton value="rotate">Rotate</ToggleButton>
      </ToggleButtonGroup>
      <Stack direction="row" gap={1} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          Move along the axes of
        </Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={frame}
          onChange={(_, value) => value && onFrame(value)}
          aria-label="Move along the axes of"
        >
          <ToggleButton value="world">World</ToggleButton>
          <ToggleButton value="tool">Tool</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {children}
    </Stack>
  )
}

/** The TCP's orientation, as NOVA gives it: a rotation vector, in degrees */
const TcpOrientation = observer(({ store }: { store: JoggingStore }) => {
  const orientation =
    store.jogger.motionStream.rapidlyChangingMotionState.tcp_pose?.orientation
  const degrees = (value: number | undefined) =>
    value === undefined ? "–" : `${((value * 180) / Math.PI).toFixed(1)}°`
  return (
    <Typography variant="body2" color="text.secondary">
      TCP orientation:{" "}
      <span data-testid="tcp-orientation">
        {[0, 1, 2].map((i) => degrees(orientation?.[i])).join(" ")}
      </span>
    </Typography>
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
