import { tryParseJson } from "@wandelbots/nova-js"

// Ported from RobotPad (src/jogging/JoggingStore.ts)

/**
 * Pulls a short, human-readable message out of the various shapes a jogger
 * error can arrive in (raw JSON strings from the continuous jogging socket,
 * `InitializeMovementResponse`/`StartMovementResponse`-like objects, or
 * those wrapped in a `{ result: ... }` envelope from the trajectory socket).
 */
export function extractJogErrorMessage(err: unknown): string {
  if (typeof err === "string") {
    const parsed = tryParseJson(err)
    return parsed ? extractJogErrorMessage(parsed) : err
  }

  if (err && typeof err === "object") {
    // biome-ignore lint/suspicious/noExplicitAny: normalizing an unknown error shape
    const anyErr = err as any
    return (
      // PlanTrajectoryFailedResponse: the feedback name identifies the
      // failure cause (e.g. "FeedbackSingularity") and is translated to a
      // friendly message by getJogErrorTranslationKey
      anyErr.error_feedback?.error_feedback_name ||
      anyErr.add_trajectory_error?.message ||
      anyErr.message ||
      anyErr.result?.add_trajectory_error?.message ||
      anyErr.result?.message ||
      "Jogging motion failed"
    )
  }

  return "Jogging motion failed"
}

/**
 * Known raw backend error messages that are too technical to show to end
 * users as-is, mapped to a translation key with a more helpful explanation.
 * Add new patterns here as more confusing backend messages are found;
 * anything not matched here is still shown to the user via the raw message.
 */
const JOG_ERROR_TRANSLATION_KEYS: Array<{
  pattern: RegExp
  translationKey: string
}> = [
  // Trajectory-planning failure causes, identified by the error_feedback_name
  // of a PlanTrajectoryFailedResponse (see extractJogErrorMessage)
  {
    pattern: /^FeedbackSingularity$/,
    translationKey: "Jogging.StreamStateSection.Error.Singularity.lb",
  },
  {
    pattern: /^FeedbackJointLimitExceeded$/,
    translationKey: "Jogging.StreamStateSection.Error.JointLimit.lb",
  },
  {
    pattern: /^FeedbackOutOfWorkspace$/,
    translationKey: "Jogging.StreamStateSection.Error.OutOfWorkspace.lb",
  },
  {
    pattern: /^FeedbackCollision$/,
    translationKey: "Jogging.StreamStateSection.Error.Collision.lb",
  },
  {
    pattern: /^FeedbackNoSolutionInCurrentConfiguration$/,
    translationKey:
      "Jogging.StreamStateSection.Error.NoSolutionInConfiguration.lb",
  },
  {
    // Catch-all for the remaining Feedback* causes we have no specific
    // message for -- must stay after the specific patterns above
    pattern: /^Feedback\w+$/,
    translationKey: "Jogging.StreamStateSection.Error.PlanningFailed.lb",
  },
]

/** The translation key of a friendlier text for a raw jog error, or null */
export function getJogErrorTranslationKey(message: string): string | null {
  return (
    JOG_ERROR_TRANSLATION_KEYS.find(({ pattern }) => pattern.test(message))
      ?.translationKey ?? null
  )
}
