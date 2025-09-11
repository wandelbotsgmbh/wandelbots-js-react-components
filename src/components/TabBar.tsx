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
        <Box sx={{ px: 0, py: 0 }}>
          <Tabs
            value={currentValue}
            onChange={handleTabChange}
            sx={{
              minHeight: "32px",
              backgroundColor: "transparent",
              "& .MuiTabs-indicator": {
                display: "none", // Hide the default indicator
              },
              "& .MuiTabs-flexContainer": {
                gap: 2,
              },
            }}
          >
            {items.map((item, index) => (
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
                  "&:hover": {
                    opacity: currentValue === index ? 1 : 0.6,
                  },
                  "&.Mui-selected": {
                    opacity: 1,
                    backgroundColor: (theme) =>
                      theme.palette.backgroundPaperElevation?.[11] || "#32344B",
                    color: "text.primary",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                  "&:active": {
                    transform: "none",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Border line */}
        <Box sx={{ mt: "32px", borderBottom: 1, borderColor: "divider" }} />

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
