import type { OperationLimits } from "@wandelbots/nova-js/v2"

// Ported from RobotPad (src/jogging/JoggingStore.ts)

/**
 * Default rotation jogging velocity in °/s, for cartesian TCP rotation and
 * revolute joint jogging.
 */
export const DEFAULT_ROTATION_VELOCITY_DEG_PER_SEC = 5

/**
 * Upper bound for the TCP velocity in manual reduced-speed mode (T1). ISO 10218-1
 * limits the TCP to 250 mm/s there, and NOVA documents the same for manual mode.
 */
export const T1_MAX_TCP_VELOCITY_MM_PER_SEC = 250

/**
 * Default cartesian translation jogging velocity in mm/s: 10 % of the motion
 * group's T1 max. The T1 max is the lowest valid manual TCP velocity limit the
 * controller reports, capped at {@link T1_MAX_TCP_VELOCITY_MM_PER_SEC}, so
 * most robots start at 25 mm/s.
 *
 * `manual_limits` counts alongside `manual_t1_limits` because controllers
 * without a separate T1 mode (e.g. Yaskawa) report their reduced speed there.
 */
export function getDefaultTranslationVelocityMmPerSec(
  operationLimits: OperationLimits | undefined,
): number {
  const reportedLimits = [
    operationLimits?.manual_t1_limits?.tcp?.velocity,
    operationLimits?.manual_limits?.tcp?.velocity,
  ].filter(
    (limit): limit is number =>
      typeof limit === "number" && Number.isFinite(limit) && limit > 0,
  )
  const t1Max = Math.min(T1_MAX_TCP_VELOCITY_MM_PER_SEC, ...reportedLimits)
  // Divide rather than multiply by 0.1, so that e.g. 249 mm/s gives exactly 24.9
  return t1Max / 10
}
