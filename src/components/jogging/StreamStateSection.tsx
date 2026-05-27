import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import type JoggingStore from "./JoggingStore"
import { useTheme } from "@mui/material/styles"

type Props = {
  store: JoggingStore
}

export const StreamStateSection = observer(({ store }: Props) => {
  const { t } = useTranslation()

  const theme = useTheme()

  const statusStream =
    store.jogger.motionStream.rapidlyChangingMotionState.execute?.details?.state
      ?.kind ?? "KIND_UNKNOWN"

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: "0.75rem", // Smaller than body2
          lineHeight: 1.2,
        }}
      >
        {t("Jogging.StreamStateSection.lb")}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: "0.75rem", // Smaller than body2
          lineHeight: 1.2,
        }}
        data-testid={statusStream}
      >
        {t(`Jogging.StreamStateSection.${statusStream}.lb`)}
      </Typography>
    </Box>
  )
})
