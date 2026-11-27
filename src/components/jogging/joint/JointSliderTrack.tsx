import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { alpha, useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import type { Ref } from "react"

const THUMB_SIZE = 16
const RAIL_HEIGHT = 4

export type JointSliderTrackProps = {
  /** The rail, which the pointer is placed along */
  railRef?: Ref<HTMLDivElement>
  /** Where the joint is along the track, 0 to 1; null to draw no thumb */
  at: number | null
  /** Where the goal is along the track, 0 to 1; null for none */
  goalAt: number | null
  /** Whether the slider is held: the goal is the jog's, not only hovered */
  held: boolean
  /** Where the joint's zero is along the track, 0 to 1; null for none */
  zeroAt: number | null
  /** The limits below the ends of the track, as shown; omitted for none */
  limits?: { min: string; max: string }
  disabled: boolean
}

/**
 * The drawing of a joint slider: the rail across the limits, the stretch to
 * the goal, a mark at zero, the thumb at the joint, and the limits below.
 *
 * Positions change with every frame of motion: they go in `style`, not in
 * `sx`, which would add a CSS rule for each new value and never remove it.
 */
export function JointSliderTrack({
  railRef,
  at,
  goalAt,
  held,
  zeroAt,
  limits,
  disabled,
}: JointSliderTrackProps) {
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const halo = `0 0 0 8px ${alpha(primary, 0.16)}`

  return (
    <>
      <Box
        ref={railRef}
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
        {at !== null && goalAt !== null && (
          // The stretch the joint would travel: lighter while only hovered
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              borderRadius: RAIL_HEIGHT / 2,
              backgroundColor: primary,
            }}
            style={{
              left: `${Math.min(at, goalAt) * 100}%`,
              width: `${Math.abs(goalAt - at) * 100}%`,
              opacity: held ? 1 : 0.5,
            }}
          />
        )}
        {zeroAt !== null && (
          // The joint's zero
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              top: "50%",
              width: 2,
              height: 12,
              transform: "translate(-50%, -50%)",
              borderRadius: 1,
              backgroundColor: "text.secondary",
            }}
            style={{ left: `${zeroAt * 100}%` }}
          />
        )}
        {at !== null && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              boxSizing: "border-box",
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: `3px solid ${primary}`,
              backgroundColor: "background.paper",
              boxShadow: held ? halo : theme.shadows[2],
              transition: "box-shadow 150ms",
              "&:hover": disabled ? {} : { boxShadow: halo },
            }}
            style={{ left: `${at * 100}%` }}
          />
        )}
      </Box>

      {limits && (
        <Stack
          direction="row"
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 30,
            justifyContent: "space-between",
          }}
        >
          {[limits.min, limits.max].map((text, end) => (
            <Typography
              // The two ends of the track
              // biome-ignore lint/suspicious/noArrayIndexKey: see above
              key={end}
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: 10, lineHeight: "14px" }}
            >
              {text}
            </Typography>
          ))}
        </Stack>
      )}
    </>
  )
}
