import { Alert, AlertTitle, Backdrop, Button, Stack } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { type JoggingStore } from "./JoggingStore"

export const JoggingBlocked = observer(({ store }: { store: JoggingStore }) => {
  const { t } = useTranslation()

  return (
    <Backdrop
      open={true}
      sx={{
        position: "absolute",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: "#fff",
        background: "rgba(15, 15, 15, 0.88)",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Stack sx={{ m: 2, width: "100%" }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>{t("Jogging.Blocked.ti")}</AlertTitle>
          {t("Jogging.Blocked.lb")}
        </Alert>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => store.unblock()}
        >
          {t("Jogging.Blocked.Reenable.bt")}
        </Button>
      </Stack>
    </Backdrop>
  )
})
