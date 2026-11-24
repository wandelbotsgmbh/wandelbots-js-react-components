import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import {
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import { externalizeComponent } from "../../../externalizeComponent"
import type { JogDirection } from "../jogHandle"
import {
  formatJointLimit,
  formatJointValue,
  fractionOf,
  jointSliderRange,
  jointUnit,
  shownJointValue,
  valueAt,
  zeroFraction,
} from "./jointJog"
import {
  capturePointer,
  endsHold,
  isPointerWithin,
  preventContextMenu,
  primaryReleased,
  startsPointerHold,
} from "../holdSafety"
import { JointSliderTrack } from "./JointSliderTrack"
import { useJointJogHold } from "./useJointJogHold"

/**
 * Props of {@link JoggingJointSlider}
 */
export type JoggingJointSliderProps = {
  /** Short name of the joint, e.g. "J1" */
  label: string
  /** What the joint is, e.g. "Base", shown after the label */
  name?: string
  /** The joint's live position, in NOVA's units: radians, or mm for a linear axis */
  value: number
  /**
   * The joint's lower limit, the left end of the track. A revolute joint
   * with one limit spans one turn from it, and without limits the turn it
   * stands in. A linear axis needs both limits to be jogged with the slider:
   * without them, it only shows its value.
   */
  min?: number
  /** The joint's upper limit, the right end of the track: see `min` */
  max?: number
  /** A linear axis, in mm. Defaults to a revolute joint, in radians. */
  linear?: boolean
  /** How a revolute joint is shown: in degrees (default) or radians */
  angleUnit?: "deg" | "rad"
  /**
   * The slider was pressed: jog the joint in `direction` until `onJogStop`.
   * The joint stops on its own once it gets to the goal, and starts again
   * when the goal moves on, so one press can bring several starts and stops,
   * always in turn.
   *
   * When the goal passes the joint, onJogStop and the onJogStart of the
   * other way come in the same event. An app whose jog commands are
   * asynchronous must apply them in that order, and must not tear down its
   * jogging connection on that stop.
   */
  onJogStart: (direction: JogDirection) => void
  /**
   * The joint must stop: it got to its goal, the slider was let go, or the
   * pointer left it
   */
  onJogStop: () => void
  disabled?: boolean
}

/**
 * How close (px) to the joint a goal counts as there, and does not jog it:
 * the pointer's jitter must not. A mouse or pen keeps still, so a goal a
 * pixel off jogs the joint (4 px would be over 10° on a joint with a wide
 * range). A finger trembles by a few pixels, and lands less precisely than
 * that anyway.
 */
function deadZonePx(pointerType: string): number {
  return pointerType === "mouse" || pointerType === "pen" ? 1 : 4
}

/**
 * How far (px) off the slider the pointer that holds it may stray before it
 * has left it, which ends the hold as a release does: half a thumb, by which
 * the thumb overhangs the track at a limit. A drag to a limit overshoots the
 * end of the track, and a finger wanders off a strip as narrow as the
 * slider. The press itself must be on the slider.
 */
const LEAVE_MARGIN_PX = 8

/**
 * One joint as a slider across its limits, with the thumb at the joint's
 * value and the limits below. Hovering the track shows the goal under the
 * pointer; pressing there jogs the joint toward it until it gets there, the
 * slider is let go, or the pointer leaves the slider. While held, the goal
 * follows the pointer, and the joint turns around when the goal passes it.
 * Only a pointer jogs: the keyboard reaches the slider, which says the
 * joint's value, but an arrow key on it moves nothing.
 *
 * An app shows one slider per joint. It moves nothing itself: onJogStart and
 * onJogStop leave that to the app, which also keeps to one joint at a time.
 */
export const JoggingJointSlider = externalizeComponent(
  ({
    label,
    name,
    value,
    min,
    max,
    linear = false,
    angleUnit = "deg",
    onJogStart,
    onJogStop,
    disabled = false,
  }: JoggingJointSliderProps) => {
    const theme = useTheme()
    const rail = useRef<HTMLDivElement>(null)
    const { hold, isHolding, holdingPointer, begin, moveGoal, end } =
      useJointJogHold({ value, onJogStart, onJogStop, disabled })
    const [hoverGoal, setHoverGoal] = useState<number | null>(null)

    useEffect(() => {
      if (disabled) setHoverGoal(null)
    }, [disabled])

    const range = jointSliderRange({ min, max, linear }, value)
    const unit = jointUnit(linear, angleUnit)
    const format = (v: number) => formatJointValue(v, unit)

    /** The goal under the pointer, and how close to the joint counts as there */
    function pointed({ clientX, pointerType }: PointerEvent<HTMLElement>) {
      if (!range || !rail.current) return null
      const rect = rail.current.getBoundingClientRect()
      if (rect.width <= 0) return null
      return {
        goal: valueAt((clientX - rect.left) / rect.width, range),
        deadband:
          (deadZonePx(pointerType) / rect.width) * (range.max - range.min),
      }
    }

    function onPointerDown(event: PointerEvent<HTMLElement>) {
      if (!startsPointerHold(event) || disabled || isHolding()) return
      const at = pointed(event)
      if (!at) return
      // Before the jog starts: the pointer's moves and its release reach the
      // slider wherever they happen, so a release anywhere and a leave end
      // the jog, even if the app fails to start it
      capturePointer(event.currentTarget, event.pointerId)
      begin(at.goal, at.deadband, event.pointerId, event.currentTarget)
    }

    function onPointerMove(event: PointerEvent<HTMLElement>) {
      const at = pointed(event)
      const holds = holdingPointer() === event.pointerId
      // The holding pointer left the slider: as a release. Its capture
      // brings its moves here from anywhere, so the browser sends no leave.
      if (holds && !isPointerWithin(event, LEAVE_MARGIN_PX)) {
        setHoverGoal(null)
        end()
        return
      }
      setHoverGoal(disabled ? null : (at?.goal ?? null))
      if (!holds) return
      if (primaryReleased(event)) {
        end()
        return
      }
      if (at) moveGoal(at.goal, at.deadband)
    }

    function endPointer(event: PointerEvent<HTMLElement>) {
      if (holdingPointer() === event.pointerId) end()
    }

    // The keyboard starts no jog: a key only ends one
    function onKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (isHolding() && endsHold(event)) end()
    }

    const goal = hold?.goal ?? hoverGoal
    const limits = range && {
      min: formatJointLimit(range.min, unit),
      max: formatJointLimit(range.max, unit),
    }

    const header = (
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", gap: 1, mb: "-4px" }}
      >
        <Typography variant="body2" noWrap>
          {label}
          {name && (
            <Box component="span" sx={{ color: "text.secondary" }}>
              {` - ${name}`}
            </Box>
          )}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}
        >
          {format(value)}
          {range && goal !== null && (
            <Box component="span" sx={{ color: "text.secondary" }}>
              {` / ${format(goal)}`}
            </Box>
          )}
        </Typography>
      </Stack>
    )

    if (!range) {
      // Nothing to jog it across: only its value, on a bare rail
      return (
        <Stack data-testid="jogging-joint-slider">
          {header}
          <Box aria-hidden sx={{ position: "relative", height: 44 }}>
            <JointSliderTrack
              at={null}
              goalAt={null}
              held={false}
              zeroAt={null}
              disabled
            />
          </Box>
        </Stack>
      )
    }

    return (
      <Stack data-testid="jogging-joint-slider">
        {header}
        <Box
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={name ? `${label} ${name}` : label}
          aria-valuemin={shownJointValue(range.min, unit)}
          aria-valuemax={shownJointValue(range.max, unit)}
          aria-valuenow={shownJointValue(value, unit)}
          aria-valuetext={format(value)}
          aria-disabled={disabled || undefined}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerLeave={(event) => {
            setHoverGoal(null)
            // Only a pointer that could not be captured leaves for the browser
            endPointer(event)
          }}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onLostPointerCapture={endPointer}
          onKeyDown={onKeyDown}
          onBlur={end}
          onContextMenu={preventContextMenu}
          sx={{
            position: "relative",
            height: 44,
            borderRadius: 1,
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "default" : "pointer",
            // A press must stay a press: no scrolling or text selection
            touchAction: "none",
            userSelect: "none",
            outline: "none",
            // The design system's focus mark, as on its buttons
            "&:focus-visible": {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: "2px",
            },
          }}
        >
          <JointSliderTrack
            railRef={rail}
            at={fractionOf(value, range)}
            goalAt={goal === null ? null : fractionOf(goal, range)}
            held={hold !== null}
            zeroAt={zeroFraction(range)}
            limits={limits ?? undefined}
            disabled={disabled}
          />
        </Box>
      </Stack>
    )
  },
)
