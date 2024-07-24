import { Stack, Tab, Tabs } from "@mui/material"
import { observer, useLocalObservable } from "mobx-react-lite"
import { useActiveRobot } from "./RobotPadContext"
import { useEffect } from "react"
import { JoggingCartesianTab } from "./JoggingCartesianTab"
import { JoggingJointTab } from "./JoggingJointTab"
import { JoggingStore } from "./JoggingStore"
import { LoadingScreen } from "./LoadingScreen"
import { MotionGroupJogger } from "./MotionGroupJogger"
import { runInAction } from "mobx"
import { useTranslation } from "react-i18next"
import { useThemeColors } from "@/theme"
import { LoadingButton } from "@/components/LoadingButton"
import { JoggingDebugTab } from "./JoggingDebugTab"

export const JoggingPanel = observer(() => {
  const activeRobot = useActiveRobot()
  const { t } = useTranslation()
  const { robotPad } = activeRobot
  const { nova } = robotPad

  const state = useLocalObservable(() => ({
    jogger: null as MotionGroupJogger | null,
    loadingError: null as unknown | null,
    savingPoint: false,
  }))

  async function init() {
    try {
      const store =
        activeRobot.joggingStore || (await JoggingStore.loadFor(activeRobot))
      runInAction(() => {
        activeRobot.joggingStore = store
        state.jogger = new MotionGroupJogger({
          nova: nova,
          motionGroupId: activeRobot.motionGroupId,
          numJoints: activeRobot.joints.length,
        })
      })
    } catch (err) {
      state.loadingError = err
    }
  }

  useEffect(() => {
    init()
    return () => {
      state.jogger?.dispose()
    }
  }, [])

  // Set correct jogging mode on jogger based on user selections
  useEffect(() => {
    if (!activeRobot.joggingStore || !state.jogger) return

    const {
      currentTab,
      selectedTcpId,
      selectedCoordSystemId,
      selectedDiscreteIncrement,
    } = activeRobot.joggingStore

    if (currentTab.id !== "cartesian" && currentTab.id !== "joint") return

    const cartesianJoggingOpts = {
      tcpId: selectedTcpId,
      coordSystemId: selectedCoordSystemId,
    }

    if (selectedDiscreteIncrement && currentTab.id === "cartesian") {
      state.jogger.setJoggingMode("increment", cartesianJoggingOpts)
    } else {
      state.jogger.setJoggingMode(currentTab.id, cartesianJoggingOpts)
    }
  }, [
    activeRobot.joggingStore?.currentTab,
    activeRobot.joggingStore?.selectedTcpId,
    activeRobot.joggingStore?.selectedCoordSystemId,
    activeRobot.joggingStore?.selectedDiscreteIncrement,
  ])

  useEffect(() => {
    // Set the robot to default control mode (JoZi says is important for physical robot jogging)

    async function init() {
      try {
        await nova.api.controller.setDefaultMode(
          activeRobot.controllerId,
          "MODE_CONTROL",
        )
      } catch (err) {
        console.error(err)
      }
    }

    init()
  }, [activeRobot.controllerId])

  const store = activeRobot.joggingStore
  const jogger = state.jogger

  if (!store || !jogger) {
    return (
      <JoggingPanelOuter>
        <LoadingScreen message="Loading jogging" error={state.loadingError} />
      </JoggingPanelOuter>
    )
  }

  async function savePoint() {
    if (state.savingPoint) return

    runInAction(() => {
      state.savingPoint = true
    })

    try {
      const flangePose =
        activeRobot.rapidlyChangingMotionState.state.flange_pose
      const tcpPose = activeRobot.rapidlyChangingMotionState.tcp_pose!
      const jointPosition =
        activeRobot.rapidlyChangingMotionState.state.joint_position
      if (!tcpPose || !flangePose) return

      const worldPose =
        await nova.api.coordinateSystems.transformInCoordinateSystem(
          "world",
          flangePose,
        )

      activeRobot.savePointFromJogging({
        jointAnglesInRads: jointPosition.joints,
        worldPositionInMm: worldPose.position,
        worldRotationInRads: worldPose.orientation || { x: 0, y: 0, z: 0 },
        tcpPose: {
          position: tcpPose.position,
          orientation: tcpPose.orientation || { x: 0, y: 0, z: 0 },
          coordSystemId: tcpPose.coordinate_system || "world",
          tcpId: tcpPose.tcp,
        },
      })
    } finally {
      runInAction(() => {
        state.savingPoint = false
      })
    }
  }

  return (
    <JoggingPanelOuter>
      <Stack flexGrow={1}>
        {/* Tab selection */}
        <Tabs value={store.tabIndex} onChange={store.onTabChange}>
          {store.tabs.map((tab) => (
            <Tab
              key={tab.id}
              label={tab.label}
              id={`jogging-tab-${tab.id}`}
              aria-controls={`jogging-tab-${tab.id}`}
            />
          ))}
        </Tabs>

        {/* Current tab content */}
        <Stack flexGrow={1}>
          {store.currentTab.id === "cartesian" && (
            <JoggingCartesianTab store={store} jogger={jogger} />
          )}
          {store.currentTab.id === "joint" && (
            <JoggingJointTab store={store} jogger={jogger} />
          )}
          {store.currentTab.id === "debug" && <JoggingDebugTab />}
        </Stack>

        {/* Add point button => goto points tool */}
        {store.selectedTabId === "cartesian" && (
          <Stack
            alignItems={"center"}
            sx={{
              marginBottom: "1rem",
            }}
          >
            <LoadingButton
              loading={state.savingPoint}
              variant="contained"
              sx={{
                width: "90%",
                maxWidth: "250px",
              }}
              onClick={savePoint}
              disabled={robotPad.isLocked}
            >
              {t("Jogging.SavePose.bt")}
            </LoadingButton>
          </Stack>
        )}
      </Stack>
    </JoggingPanelOuter>
  )
})

function JoggingPanelOuter({ children }: { children: React.ReactNode }) {
  const colors = useThemeColors()
  return (
    <Stack
      sx={{
        borderLeftStyle: "solid",
        borderColor: colors.borderColorDefault,
        width: `30%`,
        maxWidth: "460px",
        minWidth: "350px",
        overflowY: "auto",
        maxHeight: `calc(100vh - 64px)`,
        position: "relative",
      }}
    >
      {children}
    </Stack>
  )
}
