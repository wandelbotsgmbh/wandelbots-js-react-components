import { Stack, Tab, Tabs } from "@mui/material"
import { observer, useLocalObservable } from "mobx-react-lite"
import { useEffect } from "react"
import { JoggingCartesianTab } from "./JoggingCartesianTab"
import { JoggingJointTab } from "./JoggingJointTab"
import { JoggingStore } from "./JoggingStore"
import { LoadingCover } from "../LoadingCover"
import { runInAction } from "mobx"
import { useTranslation } from "react-i18next"
import { useThemeColors } from "../../themes/wbTheme"
import { NovaClient, JoggerConnection } from "@wandelbots/wandelbots-js"

export type JoggingPanelProps = {
  nova: NovaClient
  motionGroupId: string
}

export const JoggingPanel = observer((props: JoggingPanelProps) => {
  const { t } = useTranslation()
  const { nova } = props

  const state = useLocalObservable(() => ({
    loaded: null as {
      jogger: JoggerConnection,
      joggingStore: JoggingStore
    } | null,
    jogger: null as JoggerConnection | null,
    joggingStore: null as JoggingStore | null,
    loadingError: null as unknown | null,
  }))

  async function init() {
    try {
      const jogger = await nova.connectJogger(props.motionGroupId)
      const joggingStore = await JoggingStore.loadFor(jogger)
      runInAction(() => {
        state.loaded = { jogger, joggingStore }
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
    if (!state.loaded) return

    const {
      currentTab,
      selectedTcpId,
      selectedCoordSystemId,
      selectedDiscreteIncrement,
    } = state.loaded.joggingStore

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
    state.loaded?.joggingStore.currentTab,
    state.loaded?.joggingStore.selectedTcpId,
    state.loaded?.joggingStore.selectedCoordSystemId,
    state.loaded?.joggingStore.selectedDiscreteIncrement,
  ])

  useEffect(() => {
    if (!state.loaded) return

    // Set the robot to default control mode (JoZi says is important for physical robot jogging)

    async function init() {
      try {
        await nova.api.controller.setDefaultMode(
          state.loaded.jogger.motionStream.controllerId,
          "MODE_CONTROL",
        )
      } catch (err) {
        console.error(err)
      }
    }

    init()
  }, [state.loaded?.jogger.motionStream.controllerId])

  if (!state.loaded) {
    return (
      <JoggingPanelOuter>
        <LoadingCover message="Loading jogging" error={state.loadingError} />
      </JoggingPanelOuter>
    )
  }

  const { joggingStore: store, jogger } = state.loaded

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
            <JoggingCartesianTab store={store} />
          )}
          {store.currentTab.id === "joint" && (
            <JoggingJointTab store={store} />
          )}
        </Stack>
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
