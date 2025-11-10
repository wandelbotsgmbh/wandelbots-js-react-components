import MoveIcon from "@mui/icons-material/OpenWith"
import ShareIcon from "@mui/icons-material/Share"
import { Stack, Tab, Tabs, type SxProps } from "@mui/material"
import { NovaClient } from "@wandelbots/nova-js/v2"
import { isString } from "lodash-es"
import { runInAction } from "mobx"
import { observer, useLocalObservable } from "mobx-react-lite"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../../externalizeComponent"
import { JoggerConnection } from "../../lib/JoggerConnection"
import { LoadingCover } from "../LoadingCover"
import { JoggingBlocked } from "./JoggingBlocked"
import { JoggingCartesianTab } from "./JoggingCartesianTab"
import { JoggingJointTab } from "./JoggingJointTab"
import { JoggingStore } from "./JoggingStore"

export type JoggingPanelTabId = "cartesian" | "joint"

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
        let joggingStore = props.store
        if (!joggingStore) {
          const jogger = await JoggerConnection.open(nova, props.motionGroupId)
          joggingStore = await JoggingStore.loadFor(jogger)
        }
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
      return props.store
        ? () => null
        : () => {
            state.joggingStore?.dispose()
          }
    }, [props.store, props.nova, props.motionGroupId])

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
        sx={{
          maxWidth: "460px",
          minWidth: "320px",
          position: "relative",
          ...props.sx,
        }}
      >
        {state.joggingStore ? (
          <JoggingPanelInner
            store={state.joggingStore}
            children={props.children}
          ></JoggingPanelInner>
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
          <>
            <JoggingCartesianTab store={store}>{children}</JoggingCartesianTab>
          </>
        )
      } else if (store.currentTab.id === "joint") {
        return (
          <>
            <JoggingJointTab store={store}>{children}</JoggingJointTab>
          </>
        )
      }
    }

    return (
      <Stack flexGrow={1} sx={{ overflow: "hidden" }}>
        {/* Tab selection */}
        <Tabs
          value={store.tabIndex}
          onChange={store.onTabChange}
          variant="fullWidth"
        >
          {store.tabs.map((tab) => {
            const label =
              tab.label === "cartesian"
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
