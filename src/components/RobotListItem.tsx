import ErrorIcon from "@mui/icons-material/Error"
import { Box, Divider, Typography, useTheme } from "@mui/material"
import { observer } from "mobx-react-lite"
import type { ComponentType } from "react"
import { externalizeComponent } from "../externalizeComponent"
import { RobotIcon } from "../icons"
import {
  RobotSetupReadinessIndicator,
  RobotSetupReadinessState,
} from "./RobotSetupReadinessIndicator"

export interface RobotListItemProps {
  /** The name of the robot */
  robotName: string
  /** The type/model of the robot (will try to derive from nova if not provided) */
  robotType?: string
  /** The current setup readiness state of the robot */
  setupState: RobotSetupReadinessState
  /**
   * Component to render for the precondition indicator.
   * Defaults to RobotSetupReadinessIndicator.
   * Pass null or undefined to hide the indicator.
   */
  PreconditionComponent?: ComponentType<{
    setupState: RobotSetupReadinessState
  }> | null
  /** Additional CSS class name */
  className?: string
}

/**
 * A list item component that displays robot information and setup readiness state.
 *
 * Features:
 * - Shows robot name, type, and customizable precondition component
 * - Color-coded icon based on readiness state (robot icon for ready, warning for issues)
 * - Styled with consistent border, background, and spacing
 * - Responsive layout with proper spacing and alignment
 * - Flexible precondition component that can be customized or hidden
 */
export const RobotListItem = externalizeComponent(
  observer(
    ({
      robotName,
      robotType,
      setupState,
      PreconditionComponent = RobotSetupReadinessIndicator,
      className,
    }: RobotListItemProps) => {
      const theme = useTheme()

      // Use provided robot type or default
      const displayRobotType = robotType || "Robot"

      const isReady = setupState === RobotSetupReadinessState.READY

      return (
        <Box
          className={className}
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            background:
              theme.palette.backgroundPaperElevation?.[8] || "#292B3F",
            borderRadius: "8px",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flex: 1,
            }}
          >
            {/* Robot/Warning Icon */}
            {isReady ? (
              <Box
                sx={{
                  fontSize: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 24,
                  height: 24,
                  "& svg": {
                    fill: `${theme.palette.primary.main} !important`,
                  },
                  "& svg path": {
                    fill: `${theme.palette.primary.main} !important`,
                  },
                }}
              >
                <RobotIcon />
              </Box>
            ) : (
              <ErrorIcon
                sx={{
                  color: theme.palette.error.main,
                  fontSize: 24,
                }}
              />
            )}

            {/* Robot Name */}
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              {robotName}
            </Typography>

            {/* Divider */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: theme.palette.text.secondary,
                opacity: 0.3,
                width: "1px",
              }}
            />

            {/* Robot Type */}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              {displayRobotType}
            </Typography>
          </Box>

          {/* Setup Readiness Indicator */}
          {PreconditionComponent && (
            <PreconditionComponent setupState={setupState} />
          )}
        </Box>
      )
    },
  ),
)
