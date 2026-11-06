import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { capitalize } from "@mui/material/utils"
import { lowerFirst } from "lodash-es"
import { useEffect, useState } from "react"
import { makeErrorMessage } from "./utils/errorHandling"

export const LoadingCover = (props: {
  message?: string
  error?: unknown
  softTimeout?: number
}) => {
  const softTimeout = props.softTimeout || 3000

  const [showSlowLoadingMessage, setShowSlowLoadingMessage] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSlowLoadingMessage(true)
    }, softTimeout)

    return () => clearTimeout(timeout)
  })

  return (
    <Stack
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      sx={{ color: "text.primary" }}
    >
      {props.error ? (
        <LoadingErrorMessage
          loadingMessage={props.message}
          error={props.error}
        />
      ) : (
        <>
          <CircularProgress sx={{ mb: 3 }} />
          {!!props.message && (
            <Typography variant="body1">{props.message}</Typography>
          )}
          <Typography
            variant="body2"
            sx={{
              visibility: showSlowLoadingMessage ? "visible" : "hidden",
              mt: 2,
              color: "text.secondary",
            }}
          >
            {"This is taking longer than expected..."}
          </Typography>
        </>
      )}
    </Stack>
  )
}

export const LoadingErrorMessage = (props: {
  loadingMessage?: string
  error: unknown
}) => {
  const errorMessage = makeErrorMessage(props.error)
  const stack = props.error instanceof Error ? props.error.stack : null

  return (
    <Stack
      sx={{
        maxHeight: "100%",
        maxWidth: "min(100%, 800px)",
        p: 2,
        overflow: "auto",
        color: "error.main",
      }}
    >
      <Typography variant="body1">
        {(props.loadingMessage
          ? `Error while ${lowerFirst(capitalize(props.loadingMessage))} - `
          : "") + errorMessage}
      </Typography>
      {stack && (
        <Box
          component="pre"
          sx={{
            typography: "body2",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            mt: 2,
            pb: 6,
          }}
        >
          {stack}
        </Box>
      )}
    </Stack>
  )
}

export default LoadingCover
