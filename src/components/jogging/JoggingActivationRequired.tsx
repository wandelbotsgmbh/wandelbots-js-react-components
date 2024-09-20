import { Button, Stack, useTheme } from "@mui/material"
import { observer } from "mobx-react-lite"
import type React from "react"
import { useTranslation } from "react-i18next"
import { LoadingCover } from "../LoadingCover"
import { TransparentOverlay } from "../TransparentOverlay"
import type { JoggingStore } from "./JoggingStore"

export const JoggingActivationRequired = observer(
  ({ store, children }: { store: JoggingStore; children: React.ReactNode }) => {
    const { t } = useTranslation()
    const theme = useTheme()

    function renderOverlay() {
      if (store.activationState === "inactive" && !store.activationError) {
        return (
          <TransparentOverlay
            sx={{
              borderRadius: "6px",
              backgroundColor: `color-mix(in srgb, ${theme.palette.backgroundPaperElevation?.[5]}, transparent)`,
            }}
          >
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
          <TransparentOverlay
            sx={{
              backgroundColor: `color-mix(in srgb, ${theme.palette.backgroundPaperElevation?.[5]}, transparent)`,
            }}
          >
            <LoadingCover
              message={t("Jogging.Activating.lb")}
              error={store.activationError}
            />
          </TransparentOverlay>
        )
      }
    }

    return (
      <Stack sx={{ position: "relative", padding: "6px" }}>
        {renderOverlay()}
        {children}
      </Stack>
    )
  },
)
