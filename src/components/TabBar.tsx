import type { SxProps } from "@mui/material"
import { Box, Tab, Tabs } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { externalizeComponent } from "../externalizeComponent"

export interface TabItem {
  /** Unique identifier for the tab */
  id: string
  /** Label text for the tab */
  label: string
  /** Content to display when tab is active */
  content: React.ReactNode
  /** Optional icon component to display with the tab */
  icon?: React.ReactElement
  /** Optional badge configuration */
  badge?: {
    /** Badge content (number or string) */
    content: React.ReactNode
    /** Badge color variant */
    color?:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning"
    /** Maximum number to display (e.g., 99+) */
    max?: number
    /** Show badge even when content is zero */
    showZero?: boolean
  }
}

export interface TabBarProps {
  /** Array of tab items to display */
  items: TabItem[]
  /** Controlled active tab index */
  activeTab?: number
  /** Default active tab index */
  defaultActiveTab?: number
  /** Callback when tab changes */
  onTabChange?: (index: number) => void
  /** Additional styling */
  sx?: SxProps
  /** Ref to the root container element */
  ref?: React.Ref<HTMLDivElement>
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

/**
 * A styled tab bar component with configurable tabs and content.
 * Features the same styling as the Wandelbots design system with rounded tabs
 * and smooth transitions.
 */
export const TabBar = externalizeComponent(
  observer((props: TabBarProps) => {
    const {
      items,
      activeTab,
      defaultActiveTab = 0,
      onTabChange,
      sx,
      ref,
    } = props
    const isControlled = activeTab !== undefined
    const [uncontrolledActiveTab, setUncontrolledActiveTab] =
      useState(defaultActiveTab)

    // Keep uncontrolled state in range when items change
    useEffect(() => {
      if (isControlled) return
      if (items.length === 0) return
      if (
        uncontrolledActiveTab < 0 ||
        uncontrolledActiveTab > items.length - 1
      ) {
        setUncontrolledActiveTab(0)
      }
    }, [items.length, isControlled, uncontrolledActiveTab])

    const currentValue = isControlled ? activeTab! : uncontrolledActiveTab

    const handleTabChange = (
      _event: React.SyntheticEvent,
      newValue: number,
    ) => {
      if (!isControlled) {
        setUncontrolledActiveTab(newValue)
      }
      onTabChange?.(newValue)
    }

    return (
      <Box
        ref={ref}
        sx={{ height: "100%", display: "flex", flexDirection: "column", ...sx }}
      >
        {/* Tabs */}
        <Box
          sx={{
            px: 0,
            py: 0,
            overflow: "visible",
            // Extra padding to prevent badge clipping
            // Top: accommodates badge positioned at top: -6px with 20px height
            // Right: accommodates badge positioned at right: -8px with 20px width
            paddingTop: (theme) => theme.spacing(2), // 16px
            paddingRight: (theme) => theme.spacing(2.5), // 20px
          }}
        >
          <Tabs
            value={currentValue}
            onChange={handleTabChange}
            sx={{
              minHeight: "32px",
              backgroundColor: "transparent",
              overflow: "visible",
              "& .MuiTabs-indicator": {
                display: "none", // Hide the default indicator
              },
              "& .MuiTabs-flexContainer": {
                gap: 2,
                overflow: "visible",
                paddingTop: 0,
                paddingBottom: 0,
              },
              "& .MuiTabs-scroller": {
                overflow: "visible !important",
              },
              "& .MuiTab-root": {
                overflow: "visible",
              },
            }}
          >
            {items.map((item, index) => {
              // Helper functions for badge logic
              const getBadgeContent = () => {
                if (!item.badge) return ""
                const content = item.badge.content
                const max = item.badge.max

                // Handle numeric content with max limit
                if (typeof content === "number" && max && content > max) {
                  return `${max}+`
                }

                return String(content)
              }

              const shouldShowBadge = () => {
                if (!item.badge) return false
                const content = item.badge.content
                const showZero = item.badge.showZero

                // If content is 0 and showZero is false, hide badge
                if (content === 0 && !showZero) return false

                return true
              }

              const badgeContent = getBadgeContent()
              const showBadge = shouldShowBadge()

              return (
                <Tab
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  iconPosition="start"
                  disableRipple
                  sx={{
                    minHeight: "32px",
                    height: "32px",
                    padding: "0px 10px",
                    borderRadius: "12px",
                    backgroundColor: (theme) =>
                      theme.palette.backgroundPaperElevation?.[11] || "#32344B",
                    color: "text.primary",
                    opacity: currentValue === index ? 1 : 0.38,
                    fontSize: "13px",
                    transition: "all 0.2s ease-in-out",
                    position: "relative",
                    "&:hover": {
                      opacity: currentValue === index ? 1 : 0.6,
                    },
                    "&.Mui-selected": {
                      opacity: 1,
                      backgroundColor: (theme) =>
                        theme.palette.backgroundPaperElevation?.[11] ||
                        "#32344B",
                      color: "text.primary",
                    },
                    "&:focus": {
                      outline: "none",
                    },
                    "&:active": {
                      transform: "none",
                    },
                    ...(showBadge && {
                      "&::after": {
                        content: `"${badgeContent}"`,
                        position: "absolute",
                        // Position badge in top-right corner, extending outside tab bounds
                        top: -6, // Positions badge above the tab
                        right: -8, // Positions badge to the right of the tab
                        // Badge sizing - MUI Badge standard small size
                        minWidth: "20px", // Min width for single digits
                        height: "20px", // Fixed height for consistent appearance
                        borderRadius: "10px", // Half of height for circular shape
                        backgroundColor: (theme) => {
                          const colors = {
                            error: theme.palette.error.main,
                            info: theme.palette.info.main,
                            success: theme.palette.success.main,
                            warning: theme.palette.warning.main,
                            primary: theme.palette.primary.main,
                            secondary: theme.palette.secondary.main,
                            default: theme.palette.grey[500],
                          }
                          return (
                            colors[item.badge?.color || "error"] || colors.error
                          )
                        },
                        color: "white",
                        fontSize: "12px", // Readable size for badge content
                        fontWeight: 600, // Semi-bold for better visibility
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "2px 6px", // Horizontal padding for wider content (e.g., "99+")
                        zIndex: 1,
                        pointerEvents: "none", // Allow clicks to pass through to tab
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)", // Subtle depth
                      },
                    }),
                  }}
                />
              )
            })}
          </Tabs>
        </Box>

        {/* Border line */}
        <Box
          sx={{
            mt: (theme) => theme.spacing(2),
            borderBottom: 1,
            borderColor: "divider",
          }}
        />

        {/* Tab Content */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {items.map((item, index) => (
            <TabPanel key={item.id} value={currentValue} index={index}>
              {item.content}
            </TabPanel>
          ))}
        </Box>
      </Box>
    )
  }),
)
