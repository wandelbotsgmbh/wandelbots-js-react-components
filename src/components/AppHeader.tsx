import {
  alpha,
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Menu,
  MenuItem,
  type SxProps,
  Toolbar,
  Typography,
} from "@mui/material"
import { observer } from "mobx-react-lite"
import { type MouseEvent, type ReactNode, useState } from "react"
import { externalizeComponent } from "../externalizeComponent"
import { DropdownArrowIcon } from "../icons/DropdownArrowIcon"

export type AppItem = {
  /** Unique identifier for the app */
  id: string
  /** Display name of the app */
  name: string
  /** Icon component to display */
  icon: ReactNode
  /** URL or callback to navigate to the app */
  href?: string
  /** Click handler for the app */
  onClick?: () => void
}

export type AppHeaderProps = {
  /** Current app icon */
  appIcon: ReactNode
  /** Current app name */
  appName: string
  /** List of other available apps */
  apps?: AppItem[]
  /** Callback when an app is selected */
  onAppSelect?: (app: AppItem) => void
  /** Disable the menu button */
  disabled?: boolean
  /** Additional styling */
  sx?: SxProps
}

/**
 * A top navigation header component that displays the current app and provides
 * a dropdown menu to navigate to other apps.
 */
export const AppHeader = externalizeComponent(
  observer((props: AppHeaderProps) => {
    const {
      appIcon,
      appName,
      apps = [],
      onAppSelect,
      disabled = false,
      sx,
    } = props
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const isMenuOpen = Boolean(anchorEl)

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
      setAnchorEl(null)
    }

    const handleAppSelect = (app: AppItem) => {
      handleMenuClose()

      if (app.onClick) {
        app.onClick()
      } else if (app.href) {
        window.location.href = app.href
      }

      onAppSelect?.(app)
    }

    return (
      <>
        <AppBar
          position="static"
          sx={{
            boxShadow: "none",
            backgroundImage: "none",
            "& .MuiAppBar-root": {
              backgroundImage: "none",
              backgroundColor: "transparent",
            },
            ...sx,
          }}
        >
          <Toolbar sx={{ minHeight: "62px !important" }}>
            {/* App Icon */}
            <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
              {appIcon}
            </Box>

            {/* App Name and Dropdown */}
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Typography
                component="h1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {appName}
              </Typography>

              {/* Dropdown Button */}
              {apps.length > 0 && (
                <IconButton
                  color="inherit"
                  aria-label="switch app"
                  aria-controls="app-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  disabled={disabled}
                  sx={{
                    ml: 1,
                    width: 28,
                    height: 28,
                    borderRadius: "6px",
                    padding: 0,
                    backgroundColor: (theme) =>
                      alpha(theme.palette.common.white, 0.1),
                    opacity: 1,
                    "&:hover": {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.common.white, 0.16),
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: "8px",
                      width: "8px",
                      height: "6px",
                    },
                  }}
                >
                  <DropdownArrowIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Backdrop for blur effect */}
        <Backdrop
          open={isMenuOpen}
          onClick={handleMenuClose}
          sx={{
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: (theme) => theme.zIndex.modal - 1,
          }}
        />

        {/* Dropdown Menu */}
        <Menu
          id="app-menu"
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            zIndex: (theme) => theme.zIndex.modal,
            "& .MuiPaper-root": {
              minWidth: 200,
              mt: 1,
            },
          }}
        >
          {apps.map((app) => (
            <MenuItem key={app.id} onClick={() => handleAppSelect(app)}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {app.icon}
              </Box>
              <Typography variant="body1" sx={{ ml: 2 }}>
                {app.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </>
    )
  }),
)
