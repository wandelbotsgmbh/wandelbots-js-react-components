import { Button, Stack, Tab, Tabs, useTheme } from "@mui/material"
import { NovaClient } from "@wandelbots/wandelbots-js"
import { isString } from "lodash-es"
import { runInAction } from "mobx"
import { observer, useLocalObservable } from "mobx-react-lite"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../../externalizeComponent"
import { LoadingCover } from "../LoadingCover"
import { TransparentOverlay } from "../TransparentOverlay"
import { useReaction } from "../utils/hooks"
import { JoggingCartesianTab } from "./JoggingCartesianTab"
import { JoggingJointTab } from "./JoggingJointTab"
import { JoggingStore } from "./JoggingStore"

export type JoggingPanelProps = {
  /** Either an existing NovaClient or the base url of a deployed Nova instance */
  nova: NovaClient | string
  /** Id of the motion group to move e.g. 0@ur5e */
  motionGroupId: string
  /** Callback with the jogging panel's state store for further customization/config */
  onSetup?: (store: JoggingStore) => void
  /** Any children will go at the bottom of the panel under the default contents */
  children?: React.ReactNode
  /** Set this to true to disable jogging UI temporarily e.g. when a program is executing */
  locked?: boolean
}

/**
 * A high-level, opinionated UI panel for jogging a robot using the Wandelbots Platform API
 */
export const JoggingPanel = externalizeComponent(
  observer((props: JoggingPanelProps) => {
    const { t } = useTranslation()
    const theme = useTheme()

    const nova = isString(props.nova)
      ? new NovaClient({ instanceUrl: props.nova })
      : props.nova

    const state = useLocalObservable(() => ({
      joggingStore: null as JoggingStore | null,
      loadingError: null as unknown | null,
    }))

    async function init() {
      runInAction(() => {
        state.loadingError = null
        state.joggingStore = null
      })

      try {
        const jogger = await nova.connectJogger(props.motionGroupId)
        const joggingStore = await JoggingStore.loadFor(jogger)
        runInAction(() => {
          state.joggingStore = joggingStore
        })
        if (props.onSetup) {
          props.onSetup(joggingStore)
        }
      } catch (err) {
        state.loadingError = err
      }
    }

    useEffect(() => {
      init()
      return () => {
        state.joggingStore?.dispose()
      }
    }, [props.nova])

    useEffect(() => {
      const store = state.joggingStore
      if (!store) return

      if (props.locked) {
        store.locks.add("external")
      } else {
        store.locks.delete("external")
      }
    }, [props.locked])

    return (
      <Stack
        sx={{
          maxWidth: "460px",
          minWidth: "350px",
          overflowY: "auto",
          position: "relative",
          height: "100%",
        }}
      >
        {state.joggingStore ? (
          <JoggingPanelInner store={state.joggingStore}>
            {props.children}
          </JoggingPanelInner>
        ) : (
          <LoadingCover message="Loading jogging" error={state.loadingError} />
        )}
      </Stack>
    )
  }),
)

const JoggingPanelInner = observer(
  ({
    store,
    children,
  }: {
    store: JoggingStore
    children?: React.ReactNode
  }) => {
    const { t } = useTranslation()

    // Jogger is only active as long as the tab is focused
    useEffect(() => {
      function deactivate() {
        store.deactivate()
      }

      function activate() {
        store.activate()
      }

      window.addEventListener("blur", deactivate)
      window.addEventListener("focus", activate)

      return () => {
        window.removeEventListener("blur", deactivate)
        window.removeEventListener("focus", activate)
      }
    })

    // Update jogging mode on jogger based on user selections
    useReaction(
      () => [
        store.currentTab,
        store.selectedTcpId,
        store.activeCoordSystemId,
        store.activeDiscreteIncrement,
      ],
      () => {
        if (store.activationState === "active") store.activate()
      },
    )

    function renderOverlay() {
      if (store.activationState === "inactive" && !store.activationError) {
        return (
          <TransparentOverlay>
            <Button
              color="primary"
              variant="contained"
              onClick={() => store.activate({ manual: true })}
              disabled={store.isLocked}
            >
              {t("Jogging.Activate.bt")}
            </Button>
          </TransparentOverlay>
        )
      } else if (store.activationState === "loading" || store.activationError) {
        return (
          <TransparentOverlay>
            <LoadingCover
              message={t("Jogging.Activating.lb")}
              error={store.activationError}
            />
          </TransparentOverlay>
        )
      }
    }

    function renderTabContent() {
      if (store.currentTab.id === "cartesian") {
        return (
          <>
            <JoggingCartesianTab store={store} />
            {children}
          </>
        )
      } else if (store.currentTab.id === "joint") {
        return (
          <>
            <JoggingJointTab store={store} />
            {children}
          </>
        )
      }
    }

    return (
      <Stack flexGrow={1} height="100%">
        {/* Tab selection */}
        <Tabs
          value={store.tabIndex}
          onChange={store.onTabChange}
          variant="fullWidth"
        >
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
        <Stack flexGrow={1} position="relative">
          {/* {renderOverlay()} */}
          {renderTabContent()}
        </Stack>
      </Stack>
    )
  },
)
