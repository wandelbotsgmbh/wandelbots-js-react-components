import { Button, Stack } from "@mui/material"
import { observer } from "mobx-react-lite"
import type React from "react"
import { useTranslation } from "react-i18next"
import { LoadingCover } from "../LoadingCover"
import { TransparentOverlay } from "../TransparentOverlay"
import type { JoggingStore } from "./JoggingStore"

export const JoggingActivationRequired = observer(
  ({ store, children }: { store: JoggingStore; children: React.ReactNode }) => {
    const { t } = useTranslation()

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

    return (
      <Stack sx={{ position: "relative" }}>
        {renderOverlay()}
        {children}
      </Stack>
    )
  },
)
