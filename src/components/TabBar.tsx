import type { SxProps } from "@mui/material"
import { Box, Tab, Tabs } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useState } from "react"
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
    const { items, defaultActiveTab = 0, onTabChange, sx, ref } = props
    const [activeTab, setActiveTab] = useState(defaultActiveTab)

    const handleTabChange = (
      _event: React.SyntheticEvent,
      newValue: number,
    ) => {
      setActiveTab(newValue)
      onTabChange?.(newValue)
    }

    return (
      <Box
        ref={ref}
        sx={{ height: "100%", display: "flex", flexDirection: "column", ...sx }}
      >
        {/* Tabs */}
        <Box sx={{ px: 3, pt: 3, pb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              minHeight: "auto",
              backgroundColor: "transparent",
              mt: 3,
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
                  minHeight: "auto",
                  minWidth: "auto",
                  padding: "4px 8px",
                  borderRadius: "10px",
                  backgroundColor: (theme) =>
                    theme.palette.backgroundPaperElevation?.[11] || "#32344B",
                  color: "text.primary",
                  opacity: activeTab === index ? 1 : 0.38,
                  textTransform: "none",
                  fontWeight: 500,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    opacity: activeTab === index ? 1 : 0.6,
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
        <Box sx={{ mx: 3, borderBottom: 1, borderColor: "divider" }} />

        {/* Tab Content */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {items.map((item, index) => (
            <TabPanel key={item.id} value={activeTab} index={index}>
              {item.content}
            </TabPanel>
          ))}
        </Box>
      </Box>
    )
  }),
)
