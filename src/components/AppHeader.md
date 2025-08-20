# AppHeader Component

A navigation header component that displays the current application's icon and name, with an optional dropdown menu for switching between different applications.

## Features

- **App Branding**: Displays the current app's icon and name with custom typography
- **App Switching**: Dropdown menu with blur backdrop for navigating to other apps
- **Responsive Design**: Uses MUI AppBar for consistent styling
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Flexible Navigation**: Supports both URL navigation and custom click handlers

## Usage

```tsx
import {
  AppHeader,
  type AppItem,
} from "@wandelbots/wandelbots-js-react-components"
import { Home, Settings, Person } from "@mui/icons-material"

const apps: AppItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: <Home />,
    href: "/dashboard",
  },
  {
    id: "settings",
    name: "Settings",
    icon: <Settings />,
    onClick: () => navigateToSettings(),
  },
]

function MyApp() {
  return (
    <AppHeader
      appIcon={<Person />}
      appName="Robot Control Studio"
      apps={apps}
      onAppSelect={(app) => console.log("Selected:", app.name)}
    />
  )
}
```

## Props

### AppHeaderProps

- **appIcon** (`ReactNode`): Icon component for the current application
- **appName** (`string`): Display name of the current application
- **apps** (`AppItem[]`, optional): Array of available apps for the dropdown menu
- **onAppSelect** (`(app: AppItem) => void`, optional): Callback when an app is selected
- **sx** (`SxProps`, optional): Additional MUI styling

### AppItem

- **id** (`string`): Unique identifier for the app
- **name** (`string`): Display name of the app
- **icon** (`ReactNode`): Icon component to display
- **href** (`string`, optional): URL to navigate to
- **onClick** (`() => void`, optional): Custom click handler

## Styling

The component uses the specified typography:

- Font weight: 700 (Bold)
- Font size: 20px
- Line height: 24px
- Letter spacing: 0px

The dropdown arrow uses a custom SVG icon with 56% opacity.

## Behavior

- When apps are provided, a dropdown arrow appears on the right side
- Clicking the arrow opens a menu with available apps
- The background blurs when the menu is open to focus attention
- Apps can navigate via URL (`href`) or custom handler (`onClick`)
- The menu closes automatically when an app is selected or when clicking outside
