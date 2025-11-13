# Robot Setup Readiness Indicator

The `RobotSetupReadinessIndicator` component displays the current setup readiness state of a robot system.

## Features

- **Three States**: Ready, Robot Disconnected, Precondition Not Fulfilled
- **Color-coded Indicators**:
  - Ready: Tertiary color (green)
  - Robot Disconnected/Precondition Not Fulfilled: Error color (red)
- **8px Circular Indicator**: Visual status indicator
- **Paper Elevation Background**: Material-UI paper elevation 11
- **Localization Support**: React-i18next integration
- **Accessibility**: Proper ARIA support

## Usage

```tsx
import {
  RobotSetupReadinessIndicator,
  RobotSetupReadinessState,
} from "@wandelbots/wandelbots-js-react-components"

function MyRobotPanel() {
  const [setupState, setSetupState] = useState(
    RobotSetupReadinessState.ROBOT_DISCONNECTED,
  )

  return (
    <RobotSetupReadinessIndicator
      setupState={setupState}
      className="my-custom-class"
    />
  )
}
```

## Enum Values

The `RobotSetupReadinessState` enum provides the following values:

- `READY`: Robot is ready for operation
- `ROBOT_DISCONNECTED`: Robot is disconnected from the system
- `PRECONDITION_NOT_FULFILLED`: Preconditions are not fulfilled for robot operation

## Props

| Prop         | Type                       | Required | Description                                    |
| ------------ | -------------------------- | -------- | ---------------------------------------------- |
| `setupState` | `RobotSetupReadinessState` | Yes      | The current setup readiness state of the robot |
| `className`  | `string`                   | No       | Additional CSS class name                      |

## Integration with Nova.js

This component is designed to work with robot setup states from the Wandelbots Nova platform. You can derive the setup state from various robot controller states and connection status:

```tsx
import { NovaClient } from "@wandelbots/nova-js/v2"

function determineSetupState(
  isConnected: boolean,
  preconditionsMet: boolean,
): RobotSetupReadinessState {
  if (!isConnected) {
    return RobotSetupReadinessState.ROBOT_DISCONNECTED
  }

  if (!preconditionsMet) {
    return RobotSetupReadinessState.PRECONDITION_NOT_FULFILLED
  }

  return RobotSetupReadinessState.READY
}
```

## Styling

The component follows the Wandelbots Design System and respects the current Material-UI theme. It uses:

- `theme.palette.tertiary.main` for ready state
- `theme.palette.error.main` for error states
- `theme.palette.backgroundPaperElevation[11]` for background
