import { Stack, Typography, useTheme } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { runInAction } from "mobx"
import { observer, useLocalObservable } from "mobx-react-lite"
import {
  JoggingPanel,
  type JoggingPanelProps,
  type JoggingStore,
} from "../src/index"

const JoggingPanelWrapper = (props: JoggingPanelProps) => {
  const theme = useTheme()

  return (
    <Stack
      direction="column"
      gap={4}
      sx={{
        maxWidth: "min-content",
      }}
    >
      <Stack gap={2}>
        <Typography
          variant="h6"
          component="h3"
          color={theme.palette.text.primary}
        >
          Default Jogging Panel
        </Typography>
        <JoggingPanel
          {...props}
          sx={{
            width: "320px",
            backgroundColor: theme.palette.backgroundPaperElevation?.[5],
          }}
        />
      </Stack>

      <Stack gap={2}>
        <Typography
          variant="h6"
          component="h3"
          color={theme.palette.text.primary}
        >
          Jogging Panel with Custom Controls
        </Typography>
        <ChildrenDemoJoggingPanel props={props} />
      </Stack>

      <Stack gap={2}>
        <Typography
          variant="h6"
          component="h3"
          color={theme.palette.text.primary}
        >
          Jogging Panel Blocked by Another Connection
        </Typography>
        <BlockedJoggingPanel props={props} />
      </Stack>
    </Stack>
  )
}

const meta: Meta<typeof JoggingPanel> = {
  title: "Jogging/JoggingPanel",
  tags: ["!dev"],
  component: JoggingPanelWrapper,
}
export default meta

export const Default: StoryObj<typeof JoggingPanel> = {
  args: {
    nova: "https://mock.example.com",
    motionGroupId: "0@mock-ur5e",
  },
  argTypes: {
    nova: {
      control: {
        type: "text",
      },
    },
  },
}

const ChildrenDemoJoggingPanel = observer(
  ({ props }: { props: JoggingPanelProps }) => {
    const theme = useTheme()

    const state = useLocalObservable(() => ({
      joggingStore: null as JoggingStore | null,
    }))

    return (
      <JoggingPanel
        {...props}
        sx={{
          width: "460px",
          backgroundColor: theme.palette.backgroundPaperElevation?.[5],
        }}
        onSetup={(store) => runInAction(() => (state.joggingStore = store))}
      >
        {state.joggingStore && (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              background: theme.palette.backgroundPaperElevation?.[7],
              borderRadius: "16px",
              minHeight: "200px",
            }}
          >
            <Typography color={theme.palette.text.primary}>
              {`${state.joggingStore.currentTab.id} children`}
            </Typography>
          </Stack>
        )}
      </JoggingPanel>
    )
  },
)

const BlockedJoggingPanel = observer(
  ({ props }: { props: JoggingPanelProps }) => {
    const theme = useTheme()

    const state = useLocalObservable(() => ({
      joggingStore: null as JoggingStore | null,
    }))

    return (
      <JoggingPanel
        {...props}
        onSetup={(store) =>
          runInAction(() => {
            state.joggingStore = store
            state.joggingStore.blocked = true
          })
        }
        sx={{
          width: "320px",
          backgroundColor: theme.palette.backgroundPaperElevation?.[5],
        }}
      />
    )
  },
)
