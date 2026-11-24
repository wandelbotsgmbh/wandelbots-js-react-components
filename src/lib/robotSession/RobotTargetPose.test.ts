import { observable, reaction, runInAction } from "mobx"
import { describe, expect, onTestFinished, test, vi } from "vitest"
import deTranslations from "../../i18n/locales/de/translations.json"
import enTranslations from "../../i18n/locales/en/translations.json"
import { jointValuesEqual } from "../motionStateUpdate"
import type {
  PlanTrajectoryResult,
  TrajectoryExecutionStore,
  TrajectoryTarget,
} from "../TrajectoryExecutionStore"
import type { RobotPose } from "./robotPose"
import { RobotTargetPose } from "./RobotTargetPose"

// Ported from RobotPad (unit/TargetPoseStore.test.ts), where this was the
// TargetPoseStore

/**
 * A minimal stand-in for the parts of a session that the target pose reads:
 * the jogging tab, the live state and the trajectory; and why the robot may
 * not move. Observable so the target pose's reactions fire like in an app.
 */
function makeFakeRobot() {
  const planTrajectory = vi.fn(
    async (): Promise<PlanTrajectoryResult> => ({ ok: true }),
  )
  const stopAndReset = vi.fn(async () => {})
  const hold = vi.fn((_target?: TrajectoryTarget) => true)
  const release = vi.fn(async () => {})
  const app = observable({
    reasonNotMoveable: null as { code: string; message?: string } | null,
  })

  const robot = observable(
    {
      motionGroupId: "0@controller",
      jogging: { selectedTabId: "cartesian" as "cartesian" | "joint" },
      trajectory: {
        planTrajectory,
        stopAndReset,
        hold,
        release,
        trajectoryState: "idle" as TrajectoryExecutionStore["trajectoryState"],
        executionState: undefined as TrajectoryExecutionStore["executionState"],
        isPlanOutdated: false,
        lastError: null as string | null,
        holdsExecutionSession: false,
      },
      state: {
        jointPose: [0, 0.5, 1, 1.5],
        rapidlyChangingMotionState: {
          joint_position: [0, 0.5, 1, 1.5] as number[],
        },
        displayedTcpPose: {
          position: [100, 200, 300],
          orientation: [0.1, 0.2, 0.3],
        },
        displayedTcpPoseReference: {
          pose: { position: [100, 200, 300], orientation: [0.1, 0.2, 0.3] },
          tcpId: "tcp1",
          coordinateSystemId: "world",
        },
        /** At joint values within 0.001; this stand-in has no TCP to be at */
        isAt(pose: RobotPose) {
          return (
            pose.type === "joint" &&
            jointValuesEqual(
              pose.joints,
              robot.state.rapidlyChangingMotionState.joint_position,
              0.001,
            )
          )
        },
      },
    },
    {},
    { deep: true },
  )

  return { robot, app, planTrajectory, stopAndReset, hold, release }
}

function cartesianPose(
  position: number[],
  coordSystemId = "world",
  tcpId = "tcp1",
  motionGroupId = "0@controller",
): RobotPose {
  return {
    type: "cartesian",
    motionGroupId,
    tcpPose: {
      pose: { position, orientation: [0, 0, 0] },
      coordSystemId,
      tcpId,
    },
  }
}

function makeStore() {
  const fake = makeFakeRobot()
  const store = new RobotTargetPose(
    {
      motionGroupId: fake.robot.motionGroupId,
      state: fake.robot.state,
      jogging: fake.robot.jogging,
      trajectory: fake.robot.trajectory,
      notMoveableReason: () => fake.app.reasonNotMoveable,
    } as unknown as ConstructorParameters<typeof RobotTargetPose>[0],
    { info: vi.fn(), debug: vi.fn(), warn: vi.fn() },
  )
  onTestFinished(() => store.dispose())
  return { store, ...fake }
}

describe("RobotTargetPose", () => {
  test("starts in view phase showing the live pose", () => {
    const { store } = makeStore()
    expect(store.phase).toBe("view")
    expect(store.displayString).toBe("(100, 200, 300, 0.1, 0.2, 0.3)")
  })

  // A positioner or a turntable: the live state has no TCP pose to show,
  // and none to read a typed pose's TCP and coordinate system from
  test("shows no pose and takes no typed one for a motion group without a TCP pose", () => {
    const { store, robot } = makeStore()
    runInAction(() => {
      Object.defineProperty(robot.state, "displayedTcpPoseReference", {
        get() {
          throw new Error("Invalid current TCP pose position")
        },
      })
      ;(robot.state as { displayedTcpPose: unknown }).displayedTcpPose = null
    })

    expect(store.displayString).toBe("")
    store.beginEdit()
    store.setDraft("(1, 2, 3, 0, 0, 0)")
    expect(store.draftValid).toBe(false)
  })

  test("beginEdit seeds the draft with the displayed pose", () => {
    const { store } = makeStore()
    store.beginEdit()
    expect(store.phase).toBe("editing")
    expect(store.draft).toBe("(100, 200, 300, 0.1, 0.2, 0.3)")
    expect(store.draftValid).toBe(true)
  })

  test("flags syntactically invalid drafts while typing", () => {
    const { store } = makeStore()
    store.beginEdit()

    // The design's example: user forgets a comma between values
    store.setDraft("(-110, -400, -120 -2.3032, -2.4923, -2.6396)")
    expect(store.draftValid).toBe(false)

    store.setDraft("(-110, -400, -120, -2.3032, -2.4923, -2.6396)")
    expect(store.draftValid).toBe(true)
  })

  test.each([
    "world",
    "offset-300x",
  ])("confirmEdit stages cartesian values in the displayed %s frame", async (coordinateSystemId) => {
    const { store, robot, planTrajectory } = makeStore()
    runInAction(() => {
      robot.state.displayedTcpPoseReference.coordinateSystemId =
        coordinateSystemId
    })
    store.beginEdit()
    store.setDraft("(1, 2, 3, 0.4, 0.5, 0.6)")
    await store.confirmEdit()

    expect(planTrajectory).toHaveBeenCalledWith({
      type: "cartesian",
      pose: { position: [1, 2, 3], orientation: [0.4, 0.5, 0.6] },
      coordinateSystemId,
    })
    expect(store.phase).toBe("staged")
    expect(store.displayString).toBe("(1, 2, 3, 0.4, 0.5, 0.6)")
    expect(store.stagedPose).toEqual({
      type: "cartesian",
      motionGroupId: "0@controller",
      tcpPose: {
        pose: { position: [1, 2, 3], orientation: [0.4, 0.5, 0.6] },
        coordSystemId: coordinateSystemId,
        tcpId: "tcp1",
      },
    })
  })

  // What a panel with its own pose field calls: it has the numbers already
  test("plan stages a pose without the text draft, for the pose's own TCP and coordinate system", async () => {
    const { store, planTrajectory } = makeStore()
    const pose: RobotPose = {
      type: "cartesian",
      motionGroupId: "0@controller",
      tcpPose: {
        pose: { position: [1.23456, 2, 3], orientation: [0.4, 0.5, 0.6] },
        coordSystemId: "offset-300x",
        tcpId: "tcp2",
      },
    }
    store.beginEdit()

    await store.plan(pose)

    // The numbers as given, not through the text
    expect(planTrajectory).toHaveBeenCalledWith({
      type: "cartesian",
      pose: { position: [1.23456, 2, 3], orientation: [0.4, 0.5, 0.6] },
      coordinateSystemId: "offset-300x",
    })
    expect(store.phase).toBe("staged")
    expect(store.stagedPose).toEqual(pose)
    expect(store.displayString).toBe("(1.2, 2, 3, 0.4, 0.5, 0.6)")
  })

  test("plan stages joints as well, whichever tab the jogging store shows", async () => {
    const { store, planTrajectory } = makeStore()

    await store.plan({
      type: "joint",
      motionGroupId: "0@controller",
      joints: [0.1, 0.2, 0.3, 0.4],
    })

    expect(planTrajectory).toHaveBeenCalledWith({
      type: "joint",
      joints: [0.1, 0.2, 0.3, 0.4],
    })
    expect(store.phase).toBe("staged")
    expect(store.displayString).toBe("[0.1, 0.2, 0.3, 0.4]")
  })

  test("plan stages a pose that the planner rejects with its reason", async () => {
    const { store, planTrajectory } = makeStore()
    planTrajectory.mockResolvedValueOnce({
      ok: false,
      errorFeedbackName: "FeedbackOutOfWorkspace",
    })

    await store.plan({
      type: "joint",
      motionGroupId: "0@controller",
      joints: [9, 9, 9, 9],
    })

    expect(store.phase).toBe("error")
    expect(store.staged?.errorKey).toBe(
      "Jogging.TargetPose.Error.NotReachable.lb",
    )
  })

  test("confirmEdit does nothing while the draft is invalid", async () => {
    const { store, planTrajectory } = makeStore()
    store.beginEdit()
    store.setDraft("not a pose")
    await store.confirmEdit()

    expect(planTrajectory).not.toHaveBeenCalled()
    expect(store.phase).toBe("editing")
  })

  test("maps planner rejections to the design's error messages", async () => {
    const { store, planTrajectory } = makeStore()

    planTrajectory.mockResolvedValueOnce({
      ok: false,
      errorFeedbackName: "FeedbackOutOfWorkspace",
    })
    store.beginEdit()
    store.setDraft("(9999, 0, 0, 0, 0, 0)")
    await store.confirmEdit()

    expect(store.phase).toBe("error")
    expect(store.staged?.errorKey).toBe(
      "Jogging.TargetPose.Error.NotReachable.lb",
    )
    // A rejected pose can't be moved to or stored
    expect(store.stagedPose).toBeNull()

    planTrajectory.mockResolvedValueOnce({
      ok: false,
      errorFeedbackName: "FeedbackSingularity",
    })
    store.beginEdit()
    await store.confirmEdit()
    expect(store.staged?.errorKey).toBe(
      "Jogging.TargetPose.Error.Singularity.lb",
    )

    // A collision verdict can also arrive from the controller's own check
    // at trajectory initialization, not just the planner
    planTrajectory.mockResolvedValueOnce({
      ok: false,
      errorFeedbackName: "FeedbackCollision",
    })
    store.beginEdit()
    await store.confirmEdit()
    expect(store.staged?.errorKey).toBe("Jogging.TargetPose.Error.Collision.lb")

    planTrajectory.mockResolvedValueOnce({
      ok: false,
      errorFeedbackName: "FeedbackTorqueExceeded",
    })
    store.beginEdit()
    await store.confirmEdit()
    expect(store.staged?.errorKey).toBe(
      "Jogging.TargetPose.Error.PlanningFailed.lb",
    )
  })

  // RobotPad releases a selected saved pose this way: it owns the trajectory
  test("confirmEdit runs onBeforePlan before it plans", async () => {
    const { store, planTrajectory } = makeStore()
    const order: string[] = []
    store.onBeforePlan = async () => {
      order.push("onBeforePlan")
    }
    planTrajectory.mockImplementation(async () => {
      order.push("plan")
      return { ok: true }
    })

    store.beginEdit()
    store.setDraft("(1, 2, 3, 0, 0, 0)")
    await store.confirmEdit()

    expect(order).toEqual(["onBeforePlan", "plan"])
    expect(store.phase).toBe("staged")
  })

  test("resetToLive discards a staged pose and stops its trajectory", async () => {
    const { store, stopAndReset } = makeStore()
    store.beginEdit()
    store.setDraft("(1, 2, 3, 0, 0, 0)")
    await store.confirmEdit()

    await store.resetToLive()
    expect(store.phase).toBe("view")
    expect(store.displayString).toBe("(100, 200, 300, 0.1, 0.2, 0.3)")
    expect(stopAndReset).toHaveBeenCalled()
  })

  test("resetToLive after a planner rejection has no trajectory to stop", async () => {
    const { store, planTrajectory, stopAndReset } = makeStore()
    planTrajectory.mockResolvedValueOnce({
      ok: false,
      errorFeedbackName: "FeedbackOutOfWorkspace",
    })
    store.beginEdit()
    store.setDraft("(9999, 0, 0, 0, 0, 0)")
    await store.confirmEdit()

    await store.resetToLive()
    expect(store.phase).toBe("view")
    expect(stopAndReset).not.toHaveBeenCalled()
  })

  test.each([
    "cartesian",
    "joint",
  ] as const)("finishing a typed %s move restores live values for subsequent jogging", async (tab) => {
    const { store, robot, stopAndReset } = makeStore()
    runInAction(() => {
      robot.jogging.selectedTabId = tab
    })
    const target =
      tab === "cartesian"
        ? "(100, 200, 310, 0.1, 0.2, 0.3)"
        : "[0, 0.5, 1, 1.6]"
    store.beginEdit()
    store.setDraft(target)
    await store.confirmEdit()

    runInAction(() => {
      robot.trajectory.executionState = "RUNNING"
    })
    expect(store.phase).toBe("staged")
    expect(store.displayString).toBe(target)
    expect(stopAndReset).not.toHaveBeenCalled()

    runInAction(() => {
      robot.state.displayedTcpPose.position = [100, 200, 310]
      robot.state.jointPose = [0, 0.5, 1, 1.6]
      robot.trajectory.executionState = "END_OF_TRAJECTORY"
    })
    expect(store.phase).toBe("view")
    expect(store.stagedPose).toBeNull()
    expect(store.displayString).toBe(target)
    expect(stopAndReset).toHaveBeenCalledTimes(1)

    // Subsequent jog updates must reach the field without a manual Reset pose.
    for (const step of [1, 2]) {
      runInAction(() => {
        robot.state.displayedTcpPose.position = [100, 200, 310 + step]
        robot.state.jointPose = [0, 0.5, 1, 1.6 + step]
      })
      expect(store.displayString).toBe(
        tab === "cartesian"
          ? `(100, 200, ${310 + step}, 0.1, 0.2, 0.3)`
          : `[0, 0.5, 1, ${1.6 + step}]`,
      )
    }
    expect(stopAndReset).toHaveBeenCalledTimes(1)
  })

  test("pausing before arrival preserves the typed target so the move can resume", async () => {
    const { store, robot, stopAndReset } = makeStore()
    const target = "(100, 200, 310, 0.1, 0.2, 0.3)"
    store.beginEdit()
    store.setDraft(target)
    await store.confirmEdit()

    for (const state of ["RUNNING", "PAUSED_BY_USER"] as const) {
      runInAction(() => {
        robot.state.displayedTcpPose.position = [100, 200, 305]
        robot.trajectory.executionState = state
      })
      expect(store.phase).toBe("staged")
      expect(store.stagedPose).not.toBeNull()
      expect(store.displayString).toBe(target)
      expect(stopAndReset).not.toHaveBeenCalled()
    }
  })

  test("an unrelated trajectory completing does not discard an unconfirmed draft", () => {
    const { store, robot, stopAndReset } = makeStore()
    store.beginEdit()
    store.setDraft("(100, 200, 310, 0.1, 0.2, 0.3)")

    runInAction(() => {
      robot.trajectory.executionState = "END_OF_TRAJECTORY"
    })
    expect(store.phase).toBe("editing")
    expect(store.draft).toBe("(100, 200, 310, 0.1, 0.2, 0.3)")
    expect(stopAndReset).not.toHaveBeenCalled()
  })

  // RobotPad clears it this way when a saved pose gets selected
  test("clear drops the staged pose without stopping its trajectory", async () => {
    const { store, stopAndReset } = makeStore()
    store.beginEdit()
    store.setDraft("(1, 2, 3, 0, 0, 0)")
    await store.confirmEdit()
    expect(store.phase).toBe("staged")

    store.clear()
    expect(store.phase).toBe("view")
    // The saved pose selection owns the trajectory stream now; the typed
    // pose must not tear down the plan the selection just made.
    expect(stopAndReset).not.toHaveBeenCalled()
  })

  test("switching the jogging tab discards the staged pose", async () => {
    const { store, robot, stopAndReset } = makeStore()
    store.beginEdit()
    store.setDraft("(1, 2, 3, 0, 0, 0)")
    await store.confirmEdit()

    runInAction(() => {
      robot.jogging.selectedTabId = "joint"
    })
    // resetToLive is async; the phase change itself is synchronous
    expect(store.phase).toBe("view")
    await vi.waitFor(() => expect(stopAndReset).toHaveBeenCalled())
  })

  test("stages joint poses on the joint tab with the robot's joint count", async () => {
    const { store, robot, planTrajectory } = makeStore()
    runInAction(() => {
      robot.jogging.selectedTabId = "joint"
    })

    store.beginEdit()
    expect(store.draft).toBe("[0, 0.5, 1, 1.5]")

    store.setDraft("[0.1, 0.2, 0.3]") // too few joints
    expect(store.draftValid).toBe(false)

    store.setDraft("[0.1, 0.2, 0.3, 0.4]")
    await store.confirmEdit()

    expect(planTrajectory).toHaveBeenCalledWith({
      type: "joint",
      joints: [0.1, 0.2, 0.3, 0.4],
    })
    expect(store.phase).toBe("staged")
    expect(store.displayString).toBe("[0.1, 0.2, 0.3, 0.4]")
  })

  test("isRobotAtStagedPose tracks arrival at the staged joint pose", async () => {
    const { store, robot } = makeStore()
    runInAction(() => {
      robot.jogging.selectedTabId = "joint"
    })

    // Nothing staged yet
    expect(store.isRobotAtStagedPose).toBe(false)

    // Stage the pose the robot is already at
    store.beginEdit()
    store.setDraft("[0, 0.5, 1, 1.5]")
    await store.confirmEdit()
    expect(store.isRobotAtStagedPose).toBe(true)

    // Robot moves away from the staged pose
    runInAction(() => {
      robot.state.rapidlyChangingMotionState.joint_position = [0.8, 0.5, 1, 1.5]
    })
    expect(store.isRobotAtStagedPose).toBe(false)

    // Robot arrives (within settling tolerance)
    runInAction(() => {
      robot.state.rapidlyChangingMotionState.joint_position = [
        0.0005, 0.5, 1, 1.5,
      ]
    })
    expect(store.isRobotAtStagedPose).toBe(true)
  })

  test("a move that ends paused at the staged target restores the live pose", async () => {
    const { store, robot, stopAndReset } = makeStore()
    runInAction(() => {
      robot.jogging.selectedTabId = "joint"
    })

    store.beginEdit()
    store.setDraft("[0.1, 0.5, 1, 1.5]")
    await store.confirmEdit()
    expect(store.phase).toBe("staged")

    // Releasing Move to on arrival pauses the trajectory a hair before its
    // end, so the controller reports a user pause instead of a completed
    // trajectory -- the move is over all the same (RB-3805)
    // The robot drives there ...
    runInAction(() => {
      robot.trajectory.trajectoryState = "moving"
      robot.trajectory.executionState = "RUNNING"
    })
    // ... and the user releases Move to on arrival, which pauses the
    // trajectory just short of its end instead of completing it
    runInAction(() => {
      robot.state.rapidlyChangingMotionState.joint_position = [0.1, 0.5, 1, 1.5]
      robot.trajectory.trajectoryState = "planned"
      robot.trajectory.executionState = undefined
    })

    expect(store.phase).toBe("view")
    await vi.waitFor(() => expect(stopAndReset).toHaveBeenCalled())
  })

  test("a move paused away from the staged target stays staged for resuming", async () => {
    const { store, robot, stopAndReset } = makeStore()
    runInAction(() => {
      robot.jogging.selectedTabId = "joint"
    })

    store.beginEdit()
    store.setDraft("[0.8, 0.5, 1, 1.5]")
    await store.confirmEdit()

    runInAction(() => {
      robot.trajectory.trajectoryState = "moving"
      robot.trajectory.executionState = "RUNNING"
    })
    runInAction(() => {
      robot.state.rapidlyChangingMotionState.joint_position = [0.4, 0.5, 1, 1.5]
      robot.trajectory.trajectoryState = "planned"
      robot.trajectory.executionState = "PAUSED_BY_USER"
    })

    expect(store.phase).toBe("staged")
    expect(stopAndReset).not.toHaveBeenCalled()
  })

  test("a pose typed for where the robot already stands stays staged", async () => {
    const { store, robot, stopAndReset } = makeStore()
    runInAction(() => {
      robot.jogging.selectedTabId = "joint"
    })

    // No move ever ran, so arriving at the target is not a completed move
    store.beginEdit()
    store.setDraft("[0, 0.5, 1, 1.5]")
    await store.confirmEdit()

    expect(store.isRobotAtStagedPose).toBe(true)
    expect(store.phase).toBe("staged")
    expect(stopAndReset).not.toHaveBeenCalled()
  })

  // The panel shows the pose that was asked for last: one that was planned
  // before it must not stay armed behind it
  test("a pose that is not planned while the robot may not move drops the pose staged before it, and its trajectory", async () => {
    const { store, app, planTrajectory, stopAndReset } = makeStore()
    await store.plan(cartesianPose([1, 2, 3]))
    expect(store.phase).toBe("staged")

    runInAction(() => {
      app.reasonNotMoveable = { code: "deactivated" }
    })
    await store.plan(cartesianPose([9, 8, 7]))

    expect(planTrajectory).toHaveBeenCalledTimes(1)
    expect(store.staged).toBeNull()
    expect(stopAndReset).toHaveBeenCalledTimes(1)
  })

  // NOVA refuses the trajectory of a planned pose, or the move along it
  // fails: the trajectory store drops its plan and keeps the reason
  describe("when the move to the staged pose fails", () => {
    async function failed(message = "Collision detected") {
      const made = makeStore()
      await made.store.plan(cartesianPose([1, 2, 3]))
      runInAction(() => {
        made.robot.trajectory.lastError = message
        made.robot.trajectory.holdsExecutionSession = true
      })
      return made
    }

    test("the pose stays, with the reason, and is not one to move to or to store", async () => {
      const { store } = await failed()

      expect(store.phase).toBe("error")
      expect(store.staged).toMatchObject({
        errorKey: "Jogging.TargetPose.Error.MoveFailed.lb",
        errorMessage: "Collision detected",
      })
      expect(store.stagedPose).toBeNull()
      expect(store.displayString).toBe("(1, 2, 3, 0, 0, 0)")
    })

    test("the reason has a text in English and German", () => {
      const key = "Jogging.TargetPose.Error.MoveFailed.lb"
      expect(enTranslations[key]).toContain("{{message}}")
      expect(deTranslations[key]).toContain("{{message}}")
    })

    // RobotPad shows the error as its own message and clears it at once
    test("the reason stays when the app clears the trajectory's error", async () => {
      const made = makeStore()
      await made.store.plan(cartesianPose([1, 2, 3]))
      onTestFinished(
        reaction(
          () => made.robot.trajectory.lastError,
          (message) => {
            if (message) made.robot.trajectory.lastError = null
          },
        ),
      )

      runInAction(() => {
        made.robot.trajectory.lastError = "Collision detected"
      })

      expect(made.robot.trajectory.lastError).toBeNull()
      expect(made.store.staged?.errorMessage).toBe("Collision detected")
    })

    test("planning the pose again takes the failure away", async () => {
      const { store, planTrajectory } = await failed()

      await store.plan(cartesianPose([1, 2, 3]))

      expect(planTrajectory).toHaveBeenCalledTimes(2)
      expect(store.phase).toBe("staged")
      expect(store.staged?.errorMessage).toBeUndefined()
    })

    test("resetToLive hands back the trajectory that NOVA still holds", async () => {
      const { store, stopAndReset } = await failed()

      await store.resetToLive()

      expect(store.phase).toBe("view")
      expect(stopAndReset).toHaveBeenCalledTimes(1)
    })

    test("an error of a trajectory that is not a staged pose's stages nothing", async () => {
      const { store, robot } = makeStore()

      runInAction(() => {
        robot.trajectory.lastError = "Collision detected"
      })

      expect(store.staged).toBeNull()
    })

    test("an error does not replace why a pose could not be planned", async () => {
      const { store, robot, planTrajectory } = makeStore()
      planTrajectory.mockResolvedValueOnce({
        ok: false,
        errorFeedbackName: "FeedbackOutOfWorkspace",
      })
      await store.plan(cartesianPose([9999, 2, 3]))

      runInAction(() => {
        robot.trajectory.lastError = "Collision detected"
      })

      expect(store.staged?.errorKey).toBe(
        "Jogging.TargetPose.Error.NotReachable.lb",
      )
    })
  })

  // A move runs at the velocity that shows when it starts. The trajectory
  // carries the velocity it was planned with: it is outdated once the
  // jogging store has another one.
  describe("when the velocity changes", () => {
    /** A staged pose whose trajectory NOVA accepted; a plan is up to date again */
    async function staged() {
      const made = makeStore()
      made.planTrajectory.mockImplementation(async () => {
        runInAction(() => {
          made.robot.trajectory.isPlanOutdated = false
        })
        return { ok: true }
      })
      await made.store.plan(cartesianPose([1, 2, 3]))
      runInAction(() => {
        made.robot.trajectory.trajectoryState = "planned"
      })
      const outdate = () =>
        runInAction(() => {
          made.robot.trajectory.isPlanOutdated = true
        })
      return { ...made, outdate }
    }

    test("plans the staged pose again", async () => {
      const { store, planTrajectory, outdate } = await staged()

      outdate()
      expect(store.confirming).toBe(true)
      await vi.waitFor(() => expect(store.confirming).toBe(false))

      expect(planTrajectory).toHaveBeenCalledTimes(2)
      expect(planTrajectory).toHaveBeenLastCalledWith({
        type: "cartesian",
        pose: { position: [1, 2, 3], orientation: [0, 0, 0] },
        coordinateSystemId: "world",
      })
      expect(store.stagedPose).toEqual(cartesianPose([1, 2, 3]))
    })

    test("plans it again once more when the velocity changed while it was planned", async () => {
      const { store, robot, planTrajectory, outdate } = await staged()
      // The velocity moves on during the first of the plans
      planTrajectory.mockImplementationOnce(async () => ({ ok: true }))

      outdate()
      await vi.waitFor(() => expect(planTrajectory).toHaveBeenCalledTimes(3))
      await vi.waitFor(() => expect(store.confirming).toBe(false))

      expect(robot.trajectory.isPlanOutdated).toBe(false)
      expect(planTrajectory).toHaveBeenCalledTimes(3)
    })

    test("plans nothing while the robot moves along the trajectory, and plans the rest once it stopped", async () => {
      const { store, robot, planTrajectory, outdate } = await staged()
      runInAction(() => {
        robot.trajectory.trajectoryState = "moving"
      })

      outdate()
      expect(store.confirming).toBe(false)
      runInAction(() => {
        robot.trajectory.trajectoryState = "stopping"
      })
      expect(store.confirming).toBe(false)

      runInAction(() => {
        robot.trajectory.trajectoryState = "planned"
      })
      expect(store.confirming).toBe(true)
      await vi.waitFor(() => expect(store.confirming).toBe(false))
      expect(planTrajectory).toHaveBeenCalledTimes(2)
    })

    test("plans nothing for a trajectory that is not a staged pose's", async () => {
      const { store, planTrajectory, outdate } = await staged()
      // RobotPad: a saved pose was selected and planned
      store.clear()

      outdate()

      expect(store.confirming).toBe(false)
      expect(planTrajectory).toHaveBeenCalledTimes(1)
    })
  })

  describe("holding the Move to button", () => {
    test("holdMove moves along the trajectory of the staged pose, for the pose that the button shows", async () => {
      const { store, hold } = makeStore()
      await store.plan(cartesianPose([1, 2, 3], "offset-300x"))

      expect(store.holdMove(cartesianPose([1, 2, 3], "offset-300x"))).toBe(true)

      expect(hold).toHaveBeenCalledExactlyOnceWith({
        type: "cartesian",
        pose: { position: [1, 2, 3], orientation: [0, 0, 0] },
        coordinateSystemId: "offset-300x",
      })
    })

    test.each<[string, RobotPose]>([
      ["another position", cartesianPose([1, 2, 4])],
      ["another coordinate system", cartesianPose([1, 2, 3], "offset-300x")],
      ["another TCP", cartesianPose([1, 2, 3], "world", "tcp2")],
      [
        "another motion group",
        cartesianPose([1, 2, 3], "world", "tcp1", "1@c"),
      ],
      [
        "joints",
        { type: "joint", motionGroupId: "0@controller", joints: [1, 2, 3] },
      ],
    ])("holdMove moves nothing for %s than the staged pose", async (_what, shown) => {
      const { store, hold } = makeStore()
      await store.plan(cartesianPose([1, 2, 3]))

      expect(store.holdMove(shown)).toBe(false)

      expect(hold).not.toHaveBeenCalled()
    })

    test("holdMove takes a pose without an orientation as the one without a rotation", async () => {
      const { store } = makeStore()
      const withoutOrientation = cartesianPose([1, 2, 3])
      if (withoutOrientation.type === "cartesian") {
        delete withoutOrientation.tcpPose.pose.orientation
      }
      await store.plan(withoutOrientation)

      expect(store.holdMove(cartesianPose([1, 2, 3]))).toBe(true)
    })

    test("holdMove moves nothing without a staged pose, or to one that could not be planned", async () => {
      const { store, planTrajectory, hold } = makeStore()
      expect(store.holdMove(cartesianPose([1, 2, 3]))).toBe(false)

      planTrajectory.mockResolvedValueOnce({
        ok: false,
        errorFeedbackName: "FeedbackOutOfWorkspace",
      })
      await store.plan(cartesianPose([1, 2, 3]))
      expect(store.holdMove(cartesianPose([1, 2, 3]))).toBe(false)

      expect(hold).not.toHaveBeenCalled()
    })

    test("holdMove tells when the trajectory does not start", async () => {
      const { store, hold } = makeStore()
      await store.plan(cartesianPose([1, 2, 3]))
      hold.mockReturnValueOnce(false)

      expect(store.holdMove(cartesianPose([1, 2, 3]))).toBe(false)
    })

    test("releaseMove releases the trajectory", async () => {
      const { store, release } = makeStore()

      await store.releaseMove()

      expect(release).toHaveBeenCalledOnce()
    })
  })

  test("does not plan while the robot may not move", async () => {
    const { store, app, planTrajectory } = makeStore()
    store.beginEdit()
    store.setDraft("(1, 2, 3, 0, 0, 0)")

    // e.g. the robot was deactivated midway through the edit
    runInAction(() => {
      app.reasonNotMoveable = {
        code: "deactivated",
        message: "The robot must be activated first",
      }
    })
    await store.confirmEdit()

    // Planning would have failed for a reason unrelated to the coordinates,
    // so nothing is staged and no misleading error is shown
    expect(planTrajectory).not.toHaveBeenCalled()
    expect(store.phase).toBe("editing")
    expect(store.staged).toBeNull()
  })
})
