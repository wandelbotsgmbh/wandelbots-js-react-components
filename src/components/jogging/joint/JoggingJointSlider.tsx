import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { alpha, useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { type KeyboardEvent, type PointerEvent, useRef, useState } from "react"
import { externalizeComponent } from "../../../externalizeComponent"
import type { JogDirection } from "../jogHandle"
import {
  formatJointLimit,
  formatJointValue,
  fractionOf,
  type JointRange,
  jointSliderRange,
  jointUnit,
  shownJointValue,
  valueAt,
  zeroFraction,
} from "./jointJog"
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
   * without limits spans a full turn.
   */
  min?: number
  /** The joint's upper limit, the right end of the track */
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
   */
  onJogStart: (direction: JogDirection) => void
  /** The joint must stop: it got to its goal, or the slider was let go */
  onJogStop: () => void
  disabled?: boolean
}

/** A goal closer than this (px) to the joint does not jog it */
const DEAD_ZONE_PX = 4

const THUMB_SIZE = 16
const RAIL_HEIGHT = 4

/** Which goal an arrow key jogs toward: the upper limit or the lower one */
function arrowGoal(key: string, range: JointRange): number | null {
  if (key === "ArrowRight" || key === "ArrowUp") return range.max
  if (key === "ArrowLeft" || key === "ArrowDown") return range.min
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
 * onJogStop leave that to the app, which also keeps to one joint at a time,
 * e.g. by disabling the other sliders while one jogs.
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
    const { hold, begin, moveGoal, end } = useJointJogHold({
      value,
      onJogStart,
      onJogStop,
      disabled,
    })
    const [hoverGoal, setHoverGoal] = useState<number | null>(null)

    const range = jointSliderRange({ min, max, linear })
    const unit = jointUnit(linear, angleUnit)
    const format = (v: number) => formatJointValue(v, unit)
    const primary = theme.palette.primary.main

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
      if (event.button !== 0 || event.ctrlKey || disabled) return
      const at = pointed(event.clientX)
      if (!at || !begin(at.goal, at.deadband, { pointer: event.pointerId })) {
        return
      }
      try {
        // So that dragging off the track keeps steering, and a release
        // anywhere ends the jog
        event.currentTarget.setPointerCapture?.(event.pointerId)
      } catch {
        // not a pointer the browser knows, e.g. in tests
      }
    }

    function onPointerMove(event: PointerEvent<HTMLElement>) {
      const at = pointed(event.clientX)
      if (!hold) {
        setHoverGoal(at?.goal ?? null)
        return
      }
      if (!("pointer" in hold.by) || hold.by.pointer !== event.pointerId) {
        return
      }
      // A release that never arrived: no button is pressed any more
      if (event.buttons === 0) {
        end()
        return
      }
      if (at) moveGoal(at.goal, at.deadband)
    }

    function endPointer(event: PointerEvent<HTMLElement>) {
      if (hold && "pointer" in hold.by && hold.by.pointer === event.pointerId) {
        end()
      }
    }

    function onKeyDown(event: KeyboardEvent<HTMLElement>) {
      const target = range ? arrowGoal(event.key, range) : null
      if (target === null) {
        // Any other key ends a key hold: Cmd pressed during it would swallow
        // the release on macOS
        if (hold && "key" in hold.by) end()
        return
      }
      event.preventDefault()
      // macOS sends no key release while Cmd is held
      if (event.repeat || event.metaKey || disabled || !range) return
      begin(target, (range.max - range.min) * 1e-4, { key: event.key })
    }

    function onKeyUp(event: KeyboardEvent<HTMLElement>) {
      if (hold && "key" in hold.by && hold.by.key === event.key) end()
    }

    const goal = hold?.goal ?? hoverGoal
    const at = range ? fractionOf(value, range) : 0.5
    const goalAt = range && goal !== null ? fractionOf(goal, range) : null
    const zeroAt = range ? zeroFraction(range) : null

    return (
      <Stack data-testid="jogging-joint-slider">
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
            {goal !== null && (
              <Box component="span" sx={{ color: "text.secondary" }}>
                {` / ${format(goal)}`}
              </Box>
            )}
          </Typography>
        </Stack>

        <Box
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={name ? `${label} ${name}` : label}
          aria-valuemin={range ? shownJointValue(range.min, unit) : undefined}
          aria-valuemax={range ? shownJointValue(range.max, unit) : undefined}
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
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "default" : "pointer",
            // A press must stay a press: no scrolling or text selection
            touchAction: "none",
            userSelect: "none",
            outline: "none",
            "&:focus-visible .jogging-joint-thumb, &:hover .jogging-joint-thumb":
              disabled
                ? {}
                : { boxShadow: `0 0 0 8px ${alpha(primary, 0.16)}` },
          }}
        >
          {/* The rail across the limits; the pointer is placed along it */}
          <Box
            ref={rail}
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              height: RAIL_HEIGHT,
              transform: "translateY(-50%)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: RAIL_HEIGHT / 2,
                backgroundColor: alpha(primary, 0.38),
              }}
            />
            {goalAt !== null && (
              // The stretch the joint would travel: lighter while only hovered
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${Math.min(at, goalAt) * 100}%`,
                  width: `${Math.abs(goalAt - at) * 100}%`,
                  borderRadius: RAIL_HEIGHT / 2,
                  backgroundColor: primary,
                  opacity: hold ? 1 : 0.5,
                }}
              />
            )}
            {zeroAt !== null && (
              // The joint's zero
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  left: `${zeroAt * 100}%`,
                  top: "50%",
                  width: 2,
                  height: 12,
                  transform: "translate(-50%, -50%)",
                  borderRadius: 1,
                  backgroundColor: "text.secondary",
                }}
              />
            )}
            <Box
              className="jogging-joint-thumb"
              sx={{
                position: "absolute",
                left: `${at * 100}%`,
                top: "50%",
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                border: `3px solid ${primary}`,
                backgroundColor: "background.paper",
                boxShadow: theme.shadows[2],
                transition: "box-shadow 150ms",
              }}
            />
          </Box>

          {range && (
            <Stack
              direction="row"
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 30,
                justifyContent: "space-between",
                color: "text.secondary",
                fontSize: 10,
                lineHeight: "14px",
                letterSpacing: "0.4px",
              }}
            >
              <span>{formatJointLimit(range.min, unit)}</span>
              <span>{formatJointLimit(range.max, unit)}</span>
            </Stack>
          )}
        </Box>
      </Stack>
    )
  },
)
