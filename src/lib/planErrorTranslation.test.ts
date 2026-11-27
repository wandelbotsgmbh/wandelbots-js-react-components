import { describe, expect, test } from "vitest"
import deTranslations from "../i18n/locales/de/translations.json"
import enTranslations from "../i18n/locales/en/translations.json"
import { planErrorTranslationKey } from "./planErrorTranslation"

describe("planErrorTranslationKey", () => {
  test.each([
    ["FeedbackSingularity", "Jogging.TargetPose.Error.Singularity.lb"],
    ["FeedbackCollision", "Jogging.TargetPose.Error.Collision.lb"],
    // The reachability failures share one message
    ["FeedbackOutOfWorkspace", "Jogging.TargetPose.Error.NotReachable.lb"],
    ["FeedbackJointLimitExceeded", "Jogging.TargetPose.Error.NotReachable.lb"],
    ["FeedbackAxisRangeExceeded", "Jogging.TargetPose.Error.NotReachable.lb"],
    [
      "FeedbackNoSolutionInCurrentConfiguration",
      "Jogging.TargetPose.Error.NotReachable.lb",
    ],
    // What the store reports for a coordinate system it cannot resolve
    ["FeedbackUnknown", "Jogging.TargetPose.Error.PlanningFailed.lb"],
    ["FeedbackTorqueExceeded", "Jogging.TargetPose.Error.PlanningFailed.lb"],
  ])("explains %s with a text in English and German", (errorFeedbackName, key) => {
    expect(planErrorTranslationKey(errorFeedbackName)).toBe(key)
    expect(enTranslations).toHaveProperty([key])
    expect(deTranslations).toHaveProperty([key])
  })
})
