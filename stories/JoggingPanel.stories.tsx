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
      direction="row"
      gap={2}
      sx={{
        maxWidth: "min-content",
      }}
    >
      <JoggingPanel
        {...props}
        sx={{
          width: "320px",
          backgroundColor: theme.palette.backgroundPaperElevation?.[5],
        }}
      />
      <ChildrenDemoJoggingPanel props={props} />
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
