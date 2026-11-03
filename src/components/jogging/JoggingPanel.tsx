import MoveIcon from "@mui/icons-material/OpenWith"
import ShareIcon from "@mui/icons-material/Share"
import Stack from "@mui/material/Stack"
import type { SxProps } from "@mui/material/styles"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { runInAction } from "mobx"
import { observer, useLocalObservable } from "mobx-react-lite"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../../externalizeComponent"
import { JoggerConnection } from "../../lib/JoggerConnection"
import type { NovaConnection } from "../../lib/novaConnection"
import { LoadingCover } from "../LoadingCover"
import { JoggingBlocked } from "./JoggingBlocked"
import { JoggingCartesianTab } from "./JoggingCartesianTab"
import { JoggingJointTab } from "./JoggingJointTab"
import { JoggingStore } from "./JoggingStore"

export type JoggingPanelTabId = "cartesian" | "joint"

export type JoggingPanelProps = {
  /**
   * The base url of a deployed Nova instance, or a Nova client of the app.
   * The panel reads only the url and the access token of the client.
   */
  nova: NovaConnection
  /** Id of the motion group to move e.g. 0@ur5e */
  motionGroupId: string
  /** Cell id on the Nova instance. Defaults to "cell". */
  cellId?: string
  /** Callback with the jogging panel's state store for further customization/config */
  onSetup?: (store: JoggingStore) => void
  /** Any children will go at the bottom of the panel under the default contents */
  children?: React.ReactNode
  /** Set this to true to disable jogging UI temporarily e.g. when a program is executing */
  locked?: boolean
  sx?: SxProps

  /**
   * To preserve state while the jogging panel is hidden, you can create and pass a
   * JoggingStore here and it will be used instead of creating a new one.
   */
  store?: JoggingStore
}

/**
 * A high-level, opinionated UI panel for jogging a robot using the Wandelbots Platform API
 */
export const JoggingPanel = externalizeComponent(
  observer((props: JoggingPanelProps) => {
    const state = useLocalObservable(() => ({
      joggingStore: null as JoggingStore | null,
      loadingError: null as unknown | null,
    }))

    // biome-ignore lint/correctness/useExhaustiveDependencies: pre-biome code
    useEffect(() => {
      // Set by the cleanup. A store that this effect opened is closed again,
      // also when it opens after the cleanup (a fast unmount, or the second
      // mount of React StrictMode). A store of `props.store` stays open.
      let closed = false
      let ownStore: JoggingStore | undefined

      async function init() {
        runInAction(() => {
          state.loadingError = null
          state.joggingStore = null
        })

        try {
          let joggingStore = props.store
          if (!joggingStore) {
            const jogger = await JoggerConnection.open(
              props.nova,
              props.motionGroupId,
              {
                cellId: props.cellId,
              },
            )
            if (closed) {
              jogger.dispose()
              return
            }
            try {
              joggingStore = await JoggingStore.loadFor(jogger)
            } catch (err) {
              jogger.dispose()
              throw err
            }
            ownStore = joggingStore
            if (closed) {
              joggingStore.dispose()
              return
            }
          }
          runInAction(() => {
            state.joggingStore = joggingStore
          })
          if (props.onSetup) {
            props.onSetup(joggingStore)
          }
        } catch (err) {
          if (closed) return
          runInAction(() => {
            state.loadingError = err
          })
        }
      }

      init()
      return () => {
        closed = true
        ownStore?.dispose()
      }
    }, [props.store, props.nova, props.motionGroupId, props.cellId])

    useEffect(() => {
      const store = state.joggingStore
      if (!store) return

      if (props.locked) {
        store.lock("external")
      } else {
        store.unlock("external")
      }
    }, [state.joggingStore, props.locked])

    return (
      <Stack
        data-testid="jogging-panel"
        aria-label="jogging-panel"
        sx={{
          maxWidth: "460px",
          minWidth: "320px",
          position: "relative",
          ...props.sx,
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
    childrenJoint?: React.ReactNode
  }) => {
    const { t } = useTranslation()

    function renderTabContent() {
      if (store.currentTab.id === "cartesian") {
        return (
          <JoggingCartesianTab store={store}>{children}</JoggingCartesianTab>
        )
      } else if (store.currentTab.id === "joint") {
        return <JoggingJointTab store={store}>{children}</JoggingJointTab>
      }
    }

    return (
      <Stack flexGrow={1} sx={{ overflow: "hidden" }}>
        {/* Tab selection */}
        <Tabs
          data-testid="jogging-tabs"
          aria-label="jogging-tabs"
          value={store.tabIndex}
          onChange={store.onTabChange}
          variant="fullWidth"
        >
          {store.tabs.map((tab) => {
            const label =
              tab.label === "Cartesian"
                ? t("Jogging.Cartesian.bt")
                : t("Jogging.Joints.bt")

            const icon =
              tab.label === "cartesian" ? (
                <MoveIcon fontSize="small" sx={{ mr: 1 }} />
              ) : (
                <ShareIcon fontSize="small" sx={{ mr: 1 }} />
              )

            return (
              <Tab
                key={tab.id}
                data-testid={`jogging-tab-${tab.id}`}
                aria-label={`jogging-tab-${tab.id}`}
                label={
                  store.showTabIcons ? (
                    <Stack direction="row" alignItems="center">
                      {icon}
                      {label}
                    </Stack>
                  ) : (
                    label
                  )
                }
                id={`jogging-tab-${tab.id}`}
                aria-controls={`jogging-tab-${tab.id}`}
              />
            )
          })}
        </Tabs>
        {/* Current tab content */}
        <Stack
          flexGrow={1}
          position="relative"
          sx={{ overflowY: "auto", overflowX: "hidden" }}
        >
          {renderTabContent()}
        </Stack>
        {/* Overlay when jogging connection is blocked */}
        {store.blocked && <JoggingBlocked store={store} />}
      </Stack>
    )
  },
)

export default JoggingPanel
