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
  directionToward,
  formatJointLimit,
  formatJointValue,
  fractionOf,
  jointSliderRange,
  jointUnit,
  shownJointValue,
  valueAt,
  zeroFraction,
} from "./jointJog"
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
  /** The joint must stop: it got to its goal, or the slider was let go */
  onJogStop: () => void
  disabled?: boolean
}

/** A goal closer than this (px) to the joint does not jog it */
const DEAD_ZONE_PX = 4

/** Which way an arrow key jogs: up the track or down */
function arrowDirection(key: string): JogDirection | null {
  if (key === "ArrowRight" || key === "ArrowUp") return "+"
  if (key === "ArrowLeft" || key === "ArrowDown") return "-"
  return null
}

/**
 * One joint as a slider across its limits, with the thumb at the joint's
 * value and the limits below. Hovering the track shows the goal under the
 * pointer; pressing there jogs the joint toward it until it gets there or
 * the slider is let go. While held, the goal follows the pointer, and the
 * joint turns around when the goal passes it. An arrow key held on the
 * focused slider jogs toward that limit.
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
    const { hold, isHolding, heldBy, begin, moveGoal, end, endIfHeldBy } =
      useJointJogHold({ value, onJogStart, onJogStop, disabled })
    const [hoverGoal, setHoverGoal] = useState<number | null>(null)

    useEffect(() => {
      if (disabled) setHoverGoal(null)
    }, [disabled])

    const range = jointSliderRange({ min, max, linear }, value)
    const unit = jointUnit(linear, angleUnit)
    const format = (v: number) => formatJointValue(v, unit)

    /** The goal under the pointer, and how close to the joint counts as there */
    function pointed(clientX: number) {
      if (!range || !rail.current) return null
      const rect = rail.current.getBoundingClientRect()
      if (rect.width <= 0) return null
      return {
        goal: valueAt((clientX - rect.left) / rect.width, range),
        deadband: (DEAD_ZONE_PX / rect.width) * (range.max - range.min),
      }
    }

    function onPointerDown(event: PointerEvent<HTMLElement>) {
      // Ctrl+click is a right click on macOS: its context menu would
      // swallow the release
      if (event.button !== 0 || event.ctrlKey || disabled || isHolding()) {
        return
      }
      const at = pointed(event.clientX)
      if (!at) return
      try {
        // Before the jog starts: dragging off the track keeps steering, and
        // a release anywhere ends the jog, even if the app fails to start it
        event.currentTarget.setPointerCapture?.(event.pointerId)
      } catch {
        // not a pointer the browser knows, e.g. in tests
      }
      begin(at.goal, at.deadband, { pointer: event.pointerId })
    }

    function onPointerMove(event: PointerEvent<HTMLElement>) {
      const at = pointed(event.clientX)
      setHoverGoal(disabled ? null : (at?.goal ?? null))
      const by = heldBy()
      if (!by || !("pointer" in by) || by.pointer !== event.pointerId) return
      // The primary button is up: its release never arrived, or came while
      // another button stays pressed (then the browser sends no pointerup)
      if ((event.buttons & 1) === 0) {
        end()
        return
      }
      if (at) moveGoal(at.goal, at.deadband)
    }

    function endPointer(event: PointerEvent<HTMLElement>) {
      endIfHeldBy((by) => "pointer" in by && by.pointer === event.pointerId)
    }

    function onKeyDown(event: KeyboardEvent<HTMLElement>) {
      const direction = arrowDirection(event.key)
      if (direction === null) {
        // Any other key ends a key hold: Cmd pressed during it would swallow
        // the release on macOS
        endIfHeldBy((by) => "key" in by)
        return
      }
      event.preventDefault()
      // macOS sends no key release while Cmd is held
      if (event.repeat || event.metaKey || disabled || !range) return
      const goal = direction === "+" ? range.max : range.min
      const deadband = (range.max - range.min) * 1e-4
      // Never against the key: at its limit, the key does nothing
      if (directionToward(value, goal, deadband) !== direction) return
      begin(goal, deadband, { key: event.key })
    }

    function onKeyUp(event: KeyboardEvent<HTMLElement>) {
      endIfHeldBy((by) => "key" in by && by.key === event.key)
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
          onPointerLeave={() => setHoverGoal(null)}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onLostPointerCapture={endPointer}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onBlur={end}
          onContextMenu={(event) => event.preventDefault()}
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
            // The design system's focus mark, as on its buttons: the slider
            // an arrow key jogs must be plain to see
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
