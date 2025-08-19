import {
  ContentCopy,
  DescriptionOutlined as DocumentIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material"
import type { SxProps } from "@mui/material"
import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material"
import { observer } from "mobx-react-lite"
import { useEffect, useRef, useState } from "react"
import { externalizeComponent } from "../externalizeComponent"

export type LogLevel = "info" | "error" | "warning"

export type LogMessage = {
  id: string
  timestamp: Date
  message: string
  level: LogLevel
}

export type LogViewerProps = {
  /** Log messages to display */
  messages: LogMessage[]
  /** Callback when clear button is clicked */
  onClear?: () => void
  /** Height of the component */
  height?: string | number
  /** Additional styles */
  sx?: SxProps
}

/**
 * A log viewer component that displays timestamped log messages with different levels.
 * Features a header with document icon and clear button, and scrollable message area.
 */
export const LogViewer = externalizeComponent(
  observer((props: LogViewerProps) => {
    const { messages = [], onClear, height = 400, sx } = props
    const theme = useTheme()
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
      if (messages.length === 0) return

      const scrollContainer = scrollContainerRef.current
      if (!scrollContainer) return

      // Use a timeout to scroll after the DOM updates
      const timeoutId = setTimeout(() => {
        // Scroll the container to the bottom, not the entire browser
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }, 10)

      return () => clearTimeout(timeoutId)
    }, [messages.length])

    const formatTimestamp = (timestamp: Date) => {
      return timestamp.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    }

    const getMessageColor = (level: LogLevel) => {
      switch (level) {
        case "error":
          return theme.palette.error.main
        case "warning":
          return theme.palette.warning.main
        case "info":
        default:
          return theme.palette.text.secondary
      }
    }

    // Component for individual log messages with expand/copy functionality
    const LogMessage = ({ message }: { message: LogMessage }) => {
      const [isExpanded, setIsExpanded] = useState(false)
      const [copyTooltip, setCopyTooltip] = useState(false)
      const [isHovered, setIsHovered] = useState(false)
      const isLongMessage = message.message.length > 150

      const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(message.message)
          setCopyTooltip(true)
          setTimeout(() => setCopyTooltip(false), 2000)
        } catch (err) {
          console.error("Failed to copy message:", err)
        }
      }

      const displayMessage =
        isLongMessage && !isExpanded
          ? message.message.substring(0, 150) + "..."
          : message.message

      return (
        <Box
          key={message.id}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            display: "flex",
            gap: 1,
            fontFamily: "monospace",
            flexDirection: "column",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            borderRadius: "4px",
            padding: "2px 4px",
            margin: "-2px -4px",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* Timestamp */}
            <Typography
              component="span"
              sx={{
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "18px",
                letterSpacing: "0.4px",
                color: theme.palette.text.disabled,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              [{formatTimestamp(message.timestamp)}]
            </Typography>

            {/* Message */}
            <Typography
              component="span"
              sx={{
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "18px",
                letterSpacing: "0.4px",
                color: getMessageColor(message.level),
                wordBreak: "break-word",
                overflowWrap: "anywhere",
                hyphens: "auto",
                flex: 1,
                whiteSpace: "pre-wrap",
              }}
            >
              {displayMessage}
            </Typography>

            {/* Action buttons - only visible on hover */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 0.5,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.2s ease-in-out",
                visibility: isHovered ? "visible" : "hidden",
              }}
            >
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{
                  padding: "2px",
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
                title={copyTooltip ? "Copied!" : "Copy message"}
              >
                <ContentCopy sx={{ fontSize: 12 }} />
              </IconButton>

              {isLongMessage && (
                <IconButton
                  size="small"
                  onClick={() => setIsExpanded(!isExpanded)}
                  sx={{
                    padding: "2px",
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  {isExpanded ? (
                    <ExpandLess sx={{ fontSize: 12 }} />
                  ) : (
                    <ExpandMore sx={{ fontSize: 12 }} />
                  )}
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      )
    }

    return (
      <Paper
        sx={{
          backgroundColor:
            theme.palette.backgroundPaperElevation?.[2] || "#171927",
          backgroundImage: "none", // Override any gradient from elevation
          height,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          ...sx,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DocumentIcon
              sx={{
                fontSize: 16,
                color: theme.palette.action.active,
                opacity: 0.56,
              }}
            />
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "143%",
                letterSpacing: "0.17px",
                color: theme.palette.text.primary,
              }}
            >
              Log
            </Typography>
          </Box>
          <Button
            onClick={onClear}
            variant="text"
            sx={{
              fontWeight: 500,
              fontSize: "13px",
              lineHeight: "22px",
              letterSpacing: "0.46px",
              color: theme.palette.primary.main,
              textTransform: "none",
              minWidth: "auto",
              padding: "4px 8px",
              "&:hover": {
                backgroundColor: theme.palette.primary.main + "14", // 8% opacity
              },
            }}
          >
            Clear
          </Button>
        </Box>

        {/* Messages Container */}
        <Box
          ref={scrollContainerRef}
          sx={{
            flex: 1,
            overflow: "auto",
            padding: "8px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {messages.length === 0 ? (
            <Typography
              sx={{
                color: theme.palette.text.disabled,
                fontSize: "12px",
                fontStyle: "italic",
                textAlign: "center",
                marginTop: 2,
              }}
            >
              No log messages
            </Typography>
          ) : (
            messages.map((message) => (
              <LogMessage key={message.id} message={message} />
            ))
          )}
        </Box>
      </Paper>
    )
  }),
)
