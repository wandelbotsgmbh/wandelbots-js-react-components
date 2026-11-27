// Ported from RobotPad (src/util/planErrorTranslation.ts)

/** The planner's failures that share the "not reachable" message */
const NOT_REACHABLE_FEEDBACK = [
  "FeedbackOutOfWorkspace",
  "FeedbackJointLimitExceeded",
  "FeedbackAxisRangeExceeded",
  "FeedbackNoSolutionInCurrentConfiguration",
]

/**
 * The translation key that explains why the planner rejected a target, from
 * the `errorFeedbackName` of a rejected `TrajectoryExecutionStore.planTrajectory`
 * (e.g. "FeedbackOutOfWorkspace"). Reachability-type failures share one
 * message; anything unrecognized gets the generic fallback. The texts are in
 * the library's `i18n`.
 */
export function planErrorTranslationKey(errorFeedbackName: string): string {
  if (errorFeedbackName === "FeedbackSingularity") {
    return "Jogging.TargetPose.Error.Singularity.lb"
  }
  if (errorFeedbackName === "FeedbackCollision") {
    return "Jogging.TargetPose.Error.Collision.lb"
  }
  if (NOT_REACHABLE_FEEDBACK.includes(errorFeedbackName)) {
    return "Jogging.TargetPose.Error.NotReachable.lb"
  }
  return "Jogging.TargetPose.Error.PlanningFailed.lb"
}
