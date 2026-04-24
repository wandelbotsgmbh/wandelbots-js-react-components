import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
function getBaseUrl(): string {
  const currentUrl = window.location.href
  return currentUrl.substring(
    0,
    currentUrl.indexOf("/", currentUrl.indexOf("//") + 2),
  )
}

export type NoMotionGroupModalProps = {
  baseUrl: string
}

export function NoMotionGroupModal({
  baseUrl = getBaseUrl(),
  ...props
}: NoMotionGroupModalProps) {
  return (
    <Dialog
      aria-labelledby="no-motion-group-modal-title"
      open={true}
      fullWidth
      sx={{
        "& .MuiModal-backdrop": {
          backdropFilter: "blur(10px)",
        },
        "& .MuiDialog-paper": {
          "::before": {
            content: '""',
            height: "8px",
            width: "100%",
            background: "linear-gradient(90deg, #FF0E65 0%, #47D3FF 100%)",
          },
          background: "#101629",
        },
      }}
    >
      <DialogTitle id="no-motion-group-modal-title">
        No motion group found
      </DialogTitle>

      <DialogContent
        sx={{
          marginTop: "3rem",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        <Typography color="#fff">Found no devices to connect to.</Typography>
        <Typography color="#fff">
          Please ensure a motion group has been created.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Stack width="100%" maxWidth="300px" margin="auto" marginBottom="2rem">
          <Button
            href={`${baseUrl}/settings`}
            variant="contained"
            sx={{
              borderRadius: "8px",
              width: "100%",
            }}
          >
            Go to settings app
          </Button>
          <Button
            href={`${baseUrl}`}
            variant="text"
            sx={{
              marginTop: "1rem",
              color: "#fff",
              textDecoration: "underline",
              fontSize: "0.75rem",
            }}
          >
            Back to Homescreen
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}

export default NoMotionGroupModal
