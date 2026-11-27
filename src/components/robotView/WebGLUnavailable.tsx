import RefreshIcon from "@mui/icons-material/Refresh"
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"

/**
 * What the 3D view shows when the browser cannot draw 3D: what to do about
 * it, and a button to reload the page
 */
export function WebGLUnavailable() {
  const { t } = useTranslation()

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        gap: "16px",
        textAlign: "center",
      }}
    >
      <ReportProblemOutlinedIcon
        sx={{ fontSize: 48, color: "text.secondary" }}
      />
      <Typography variant="h6">{t("RobotView.WebGLUnavailable.ti")}</Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", maxWidth: 420 }}
      >
        {t("RobotView.WebGLUnavailable.pg")}
      </Typography>
      <Button
        variant="outlined"
        startIcon={<RefreshIcon />}
        onClick={() => window.location.reload()}
      >
        {t("RobotView.WebGLUnavailable.Reload.bt")}
      </Button>
    </Stack>
  )
}
