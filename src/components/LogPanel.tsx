import type { SxProps } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useEffect, useMemo, useRef } from "react"
import { externalizeComponent } from "../externalizeComponent"
import { LogStore } from "./LogStore"
import { LogViewer } from "./LogViewer"

export type LogPanelProps = {
  /** Log store instance to use, or create one automatically if not provided */
  store?: LogStore
  /** Height of the component */
  height?: string | number
  /** Additional styles */
  sx?: SxProps
  /** Ref to the log store for external access */
  onStoreReady?: (store: LogStore) => void
}

/**
 * A complete log panel component with built-in state management.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [logStore, setLogStore] = useState<LogStore>()
 *
 *   return (
 *     <LogPanel
 *       height={400}
 *       onStoreReady={setLogStore}
 *     />
 *   )
 * }
 *
 * // Then use the store to add messages
 * logStore?.addInfo("Operation completed successfully")
 * logStore?.addError("Something went wrong")
 * logStore?.addWarning("Warning message")
 * ```
 */
export const LogPanel = externalizeComponent(
  observer((props: LogPanelProps) => {
    const { store: externalStore, onStoreReady, ...logViewerProps } = props
    const onStoreReadyRef = useRef(onStoreReady)

    // Update ref when callback changes
    useEffect(() => {
      onStoreReadyRef.current = onStoreReady
    }, [onStoreReady])

    const store = useMemo(() => {
      const logStore = externalStore || new LogStore()
      onStoreReadyRef.current?.(logStore)
      return logStore
    }, [externalStore])

    const handleClear = () => {
      store.clearMessages()
    }

    return (
      <LogViewer
        {...logViewerProps}
        messages={store.messages}
        onClear={handleClear}
      />
    )
  }),
)
