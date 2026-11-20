import Apps from "@mui/icons-material/Apps"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { FontFamilyBrand } from "@wandelbots/design-tokens"
import { SearchFilled } from "@wandelbots/icons/SearchFilled"
import { type ReactNode, useState } from "react"
import { useTranslation } from "react-i18next"
import type { AppItem } from "../AppHeader"

type AppNavigationProps = {
  appIcon?: ReactNode
  appName: string
  apps: AppItem[]
  onAppSelect?: (app: AppItem) => void
  onSearch?: () => void
}

const GROUP_BUTTON = {
  minWidth: 0,
  padding: "4px 10px",
  color: "text.primary",
  "& svg": { width: "16px", height: "16px" },
} as const

/**
 * The left of the header, as Figma's header-navigation: the app menu and
 * search in one button group, then the app's icon and name
 */
export function AppNavigation({
  appIcon,
  appName,
  apps,
  onAppSelect,
  onSearch,
}: AppNavigationProps) {
  const { t } = useTranslation()
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)

  function select(app: AppItem) {
    setMenuAnchor(null)
    if (app.onClick) app.onClick()
    else if (app.href) window.location.href = app.href
    onAppSelect?.(app)
  }

  return (
    <Stack direction="row" sx={{ gap: "8px", alignItems: "center" }}>
      <ButtonGroup
        variant="outlined"
        color="secondary"
        sx={(theme) => ({
          borderRadius: "10px",
          boxShadow: theme.shadows[2],
          "& .MuiButtonGroup-grouped": { borderColor: theme.palette.divider },
        })}
      >
        <Button
          aria-label={t("RobotHeader.Apps.bt")}
          aria-haspopup="menu"
          aria-expanded={menuAnchor !== null}
          disabled={apps.length === 0}
          onClick={(event) => setMenuAnchor(event.currentTarget)}
          sx={GROUP_BUTTON}
        >
          <Apps />
        </Button>
        {onSearch && (
          <Button
            aria-label={t("RobotHeader.Search.bt")}
            onClick={onSearch}
            sx={GROUP_BUTTON}
          >
            <SearchFilled />
          </Button>
        )}
      </ButtonGroup>

      <Stack direction="row" sx={{ gap: "4px", alignItems: "center" }}>
        {appIcon && (
          <Box
            sx={{
              display: "flex",
              "& svg": { width: "25px", height: "25px" },
            }}
          >
            {appIcon}
          </Box>
        )}
        <Typography
          component="h1"
          noWrap
          sx={{
            fontFamily: FontFamilyBrand,
            fontWeight: 700,
            fontSize: "16px",
            letterSpacing: "0.24px",
          }}
        >
          {appName}
        </Typography>
      </Stack>

      <Menu
        anchorEl={menuAnchor}
        open={menuAnchor !== null}
        onClose={() => setMenuAnchor(null)}
        sx={{ "& .MuiPaper-root": { minWidth: 200, mt: 1 } }}
      >
        {apps.map((app) => (
          <MenuItem key={app.id} onClick={() => select(app)}>
            {app.icon && (
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                {app.icon}
              </Box>
            )}
            {app.name}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  )
}
