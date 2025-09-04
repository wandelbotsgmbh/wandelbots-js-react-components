import {
  CheckCircle,
  Error as ErrorIcon,
  History,
  PlayArrow,
  Settings,
  SmartToy,
} from "@mui/icons-material"
import {
  Alert,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react"
import { TabBar } from "../src/index"

const meta: Meta<typeof TabBar> = {
  title: "Navigation/TabBar",
  component: TabBar,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component: `
A styled tab bar component with configurable tabs and content. 
Features the Wandelbots design system styling with rounded tabs and smooth transitions.

**Features:**
- Configurable tab items with labels and content
- Optional icons for tabs
- Internationalization support (i18next)
- Smooth hover and selection animations
- Responsive design with overflow handling
        `,
      },
    },
  },
  argTypes: {
    items: {
      description: "Array of tab items to display",
      control: { type: "object" },
    },
    defaultActiveTab: {
      description: "Index of the tab that should be active by default",
      control: { type: "number", min: 0, max: 10 },
    },
    onTabChange: {
      description: "Callback function called when tab selection changes",
      action: "tab changed",
    },
    sx: {
      description: "Additional MUI styling",
      control: { type: "object" },
    },
  },
}

export default meta
type Story = StoryObj<typeof TabBar>

// Sample content components for the stories
const ProgramPreviewContent = () => (
  <Box sx={{ p: 0 }}>
    <Card sx={{ mb: 3, backgroundColor: "transparent" }} elevation={0}>
      <CardContent sx={{ p: 0 }}>
        <Typography variant="h6" gutterBottom>
          3D Preview
        </Typography>
        <Box
          sx={{
            height: 300,
            bgcolor: "grey.900",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            border: "2px dashed",
            borderColor: "grey.300",
          }}
        >
          <Typography color="text.secondary">
            3D Preview will be implemented here
          </Typography>
        </Box>
      </CardContent>
    </Card>
    <Typography variant="body2" color="text.secondary">
      This tab shows a preview of the robot program with 3D visualization and
      trajectory display.
    </Typography>
  </Box>
)

const DetailsContent = () => (
  <Box sx={{ p: 0 }}>
    <Card sx={{ mb: 3, backgroundColor: "transparent" }} elevation={0}>
      <CardContent sx={{ p: 0 }}>
        <Typography variant="h6" gutterBottom>
          Robot Information
        </Typography>
        <List>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <SmartToy color="success" />
            </ListItemIcon>
            <ListItemText
              primary="UR5e Robot Arm"
              secondary="Status: Connected and Ready"
            />
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText
              primary="Safety Systems"
              secondary="All safety checks passed"
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
    <Typography variant="body2" color="text.secondary">
      Detailed information about the program configuration, robot status, and
      system requirements.
    </Typography>
  </Box>
)

const UpdateHistoryContent = () => (
  <Box sx={{ p: 3 }}>
    <Card sx={{ backgroundColor: "transparent" }} elevation={0}>
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <History />
          Change Log
        </Typography>
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "auto 1fr" }}>
          <Typography variant="body2" color="text.secondary">
            2025-03-03
          </Typography>
          <Typography variant="body2">
            v2.0 release - Major performance improvements
          </Typography>

          <Typography variant="body2" color="text.secondary">
            2025-01-28
          </Typography>
          <Typography variant="body2">
            v1.08 release - Bug fixes and stability improvements
          </Typography>

          <Typography variant="body2" color="text.secondary">
            2024-12-15
          </Typography>
          <Typography variant="body2">
            v1.05 release - Initial release with basic functionality
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Box>
)

const SettingsContent = () => (
  <Box sx={{ p: 3 }}>
    <Alert severity="info" sx={{ mb: 2 }}>
      Configuration settings would be displayed here
    </Alert>
    <Typography variant="body2" color="text.secondary">
      This tab contains various configuration options and settings for the
      application.
    </Typography>
  </Box>
)

export const Interactive: Story = {
  args: {
    items: [
      {
        id: "tab1",
        label: "First Tab",
        content: (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Content for first tab
            </Typography>
          </Box>
        ),
      },
      {
        id: "tab2",
        label: "Second Tab",
        content: (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Content for second tab
            </Typography>
          </Box>
        ),
      },
      {
        id: "tab3",
        label: "Third Tab",
        content: (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Content for third tab
            </Typography>
          </Box>
        ),
      },
    ],
    defaultActiveTab: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive TabBar component with controls. Adjust the tab items, default active tab, and other properties using the controls panel below.",
      },
    },
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: "preview",
        label: "Program Preview",
        content: <ProgramPreviewContent />,
        icon: <PlayArrow />,
      },
      {
        id: "details",
        label: "Details",
        content: <DetailsContent />,
        icon: <SmartToy />,
      },
      {
        id: "history",
        label: "Update History",
        content: <UpdateHistoryContent />,
        icon: <History />,
      },
    ],
    defaultActiveTab: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "TabBar with icons and rich content. Shows how tabs can include icons and more complex content sections.",
      },
    },
  },
}

export const WithErrorStates: Story = {
  args: {
    items: [
      {
        id: "overview",
        label: "Overview",
        content: (
          <Box sx={{ p: 3 }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              System is running normally
            </Alert>
            <Typography>All systems operational</Typography>
          </Box>
        ),
        icon: <CheckCircle />,
      },
      {
        id: "errors",
        label: "Errors",
        content: (
          <Box sx={{ p: 3 }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              Critical error detected
            </Alert>
            <Typography color="error">Robot communication timeout</Typography>
          </Box>
        ),
        icon: <ErrorIcon />,
      },
      {
        id: "settings",
        label: "Settings",
        content: <SettingsContent />,
        icon: <Settings />,
      },
    ],
    defaultActiveTab: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example with error states and different severity levels. The error tab is selected by default.",
      },
    },
  },
}
