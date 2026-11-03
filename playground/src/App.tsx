import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import {
  LoadingCover,
  NoMotionGroupModal,
} from "@wandelbots/wandelbots-js-react-components"
import { useEffect, useState } from "react"
import {
  listMotionGroupIds,
  useAsync,
  useConnectedMotionGroup,
} from "./connections"
import { type PlaygroundInstance, playgroundInstance } from "./instance"
import { NoInstanceScreen } from "./NoInstanceScreen"
import { pageById } from "./pages"
import { TopBar } from "./TopBar"
import { readLocation, writeLocation } from "./url"

const configuredInstance = playgroundInstance()

export function App() {
  if (!configuredInstance) return <NoInstanceScreen />
  return <Playground instance={configuredInstance} />
}

function Playground({ instance }: { instance: PlaygroundInstance }) {
  const [location, setLocation] = useState(readLocation)
  const motionGroupIds = useAsync(instance.cellId, () =>
    listMotionGroupIds(instance),
  )
  // The motion group of the URL, else the first of the cell
  const motionGroupId = location.motionGroup ?? motionGroupIds.value?.[0]
  const motionGroup = useConnectedMotionGroup(instance, motionGroupId)
  const page = pageById(location.page)

  useEffect(() => {
    writeLocation({ page: location.page, motionGroup: motionGroupId })
  }, [location.page, motionGroupId])

  useEffect(() => {
    document.title = `${page.name} · Playground`
  }, [page])

  function renderContent() {
    if (!motionGroupIds.value) {
      return (
        <LoadingCover
          message={`Loading the motion groups of the cell "${instance.cellId}"`}
          error={motionGroupIds.error}
        />
      )
    }
    if (!motionGroupId) {
      return <NoMotionGroupModal baseUrl={instance.url} />
    }
    if (!motionGroup.value) {
      return (
        <LoadingCover
          message={`Connecting to ${motionGroupId}`}
          error={motionGroup.error}
        />
      )
    }
    // Only the open page is mounted, so only one 3D view at a time
    return (
      <page.Component
        key={motionGroupId}
        instance={instance}
        motionGroup={motionGroup.value}
      />
    )
  }

  return (
    <Stack sx={{ height: "100%" }}>
      <TopBar
        instance={instance}
        page={location.page}
        onPageChange={(page) => setLocation({ ...location, page })}
        motionGroupIds={motionGroupIds.value}
        motionGroupId={motionGroupId}
        onMotionGroupChange={(id) =>
          setLocation({ ...location, motionGroup: id })
        }
        motionGroup={motionGroup.value}
      />
      <Box sx={{ position: "relative", flex: 1, minHeight: 0 }}>
        {renderContent()}
      </Box>
    </Stack>
  )
}
