import { Home, Person, Settings, Work } from "@mui/icons-material"
import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react"
import { AppHeader, type AppItem } from "../src/components/AppHeader"

const meta: Meta<typeof AppHeader> = {
  title: "Navigation/AppHeader",
  component: AppHeader,
  tags: ["!dev"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A top navigation header component that displays the current app and provides a dropdown menu to navigate to other apps. Features a blur backdrop when the dropdown is open.",
      },
    },
  },
  argTypes: {
    appIcon: {
      description: "Icon component for the current app",
      control: false,
    },
    appName: {
      description: "Display name of the current app",
      control: "text",
    },
    apps: {
      description: "Array of available apps to navigate to",
      control: false,
    },
    onAppSelect: {
      description: "Callback when an app is selected from the dropdown",
      action: "app selected",
    },
    sx: {
      description: "Additional MUI styling",
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof AppHeader>

const sampleApps: AppItem[] = [
  {
    id: "home",
    name: "Dashboard",
    icon: <Home />,
    href: "/dashboard",
  },
  {
    id: "settings",
    name: "Settings",
    icon: <Settings />,
    href: "/settings",
  },
  {
    id: "profile",
    name: "Profile",
    icon: <Person />,
    onClick: () => console.log("Navigate to profile"),
  },
  {
    id: "workspace",
    name: "Workspace",
    icon: <Work />,
    href: "/workspace",
  },
]

export const Interactive: Story = {
  args: {
    appIcon: <Home />,
    appName: "Robot Control Studio",
    apps: sampleApps,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example showing the app header with a dropdown menu. Click the dropdown arrow to see the available apps. The background will blur when the menu is open.",
      },
    },
  },
}

export const WithoutDropdown: Story = {
  args: {
    appIcon: <Work />,
    appName: "Single App Mode",
    apps: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "App header without dropdown menu when no other apps are available.",
      },
    },
  },
}

export const LongAppName: Story = {
  args: {
    appIcon: <Settings />,
    appName: "Very Long Application Name That Might Overflow",
    apps: sampleApps,
  },
  parameters: {
    docs: {
      description: {
        story: "Example with a longer app name to test text handling.",
      },
    },
  },
}

export const WithFullPageContext: Story = {
  args: {
    appIcon: <Work />,
    appName: "Robot Control Studio",
    apps: sampleApps,
  },
  render: (args) => (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#1F2233" }}>
      <AppHeader {...args} />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Welcome to Robot Control Studio
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, color: "rgba(255, 255, 255, 0.7)" }}
        >
          This is a full page example showing how the AppHeader looks in a real
          application context. Click the dropdown arrow to see the blur backdrop
          effect over the page content.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                  Robot Status
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Current robot is online and ready for operations. All systems
                  are functioning normally.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                  Recent Activities
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  • Program execution completed successfully
                  <br />• Safety zones updated
                  <br />• Motion group calibrated
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={12}>
            <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                  System Overview
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  This dummy content demonstrates how the AppHeader integrates
                  with a full application layout. The blur backdrop effect
                  becomes visible when you open the app selection dropdown menu,
                  providing focus on the navigation options while keeping the
                  page content subtly visible in the background.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Full page example showing the AppHeader in a realistic application context with dummy content. " +
          "This demonstrates the blur backdrop effect when the dropdown menu is opened.",
      },
    },
  },
}
