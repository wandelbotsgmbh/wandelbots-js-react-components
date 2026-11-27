import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"

import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import type { JoggingStore } from "./JoggingStore"

type Props = {
  store: JoggingStore
}

export const StreamStateSection = observer(({ store }: Props) => {
  const { t } = useTranslation()

  const theme = useTheme()

  const statusStream =
    store.jogger.motionStream.rapidlyChangingMotionState.execute?.details?.state
      ?.kind ?? "KIND_UNKNOWN"

  // A latched jog error (e.g. a collision that stopped an incremental jog)
  // takes precedence over the live state, since the live state resets to
  // normal as soon as the motion stops -- which would otherwise hide the
  // problem from the user almost immediately. Prefer a friendlier
  // translation over the raw backend message where one is known.
  const jogError = store.lastJogError
  const jogErrorTranslationKey = store.lastJogErrorTranslationKey

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
        color={jogError ? "error" : undefined}
        sx={{
          fontSize: "0.75rem", // Smaller than body2
          lineHeight: 1.2,
          textAlign: "right",
        }}
        data-testid={jogError ? "JOG_ERROR" : statusStream}
      >
        {jogError
          ? jogErrorTranslationKey
            ? t(jogErrorTranslationKey)
            : jogError
          : t(`Jogging.StreamStateSection.${statusStream}.lb`)}
      </Typography>
    </Box>
  )
})
