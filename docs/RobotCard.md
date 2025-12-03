# RobotCard

The `RobotCard` component is a responsive card that displays a 3D robot with states and controls, designed for multi-robot monitoring interfaces.

## Features

- **Responsive Material-UI Card** that adapts to container size
- **Robot name display** in Typography h6 at top-left
- **Program state indicator** showing current execution state combined with safety and operation modes
- **Semi-transparent 3D robot model** in the center with no camera movements for consistent viewing
- **Runtime display** with Inter font family styling (16px, 400 weight, 150% line height, 0.15px letter spacing)
- **Compact cycle time component** using small variant
- **Transparent gray divider** line for visual separation
- **"Drive to Home" button** with press-and-hold functionality
- **Localization support** via react-i18next
- **Material-UI theming integration**

## Usage

```tsx
import { RobotCard } from "@wandelbots/wandelbots-js-react-components"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components"

function RobotDashboard() {
  const connectedMotionGroup = ConnectedMotionGroup.connect(nova, "0@ur5e")

  const handleDriveToHomePress = () => {
    console.log("Starting robot movement to home position")
    // Start robot movement
  }

  const handleDriveToHomeRelease = () => {
    console.log("Stopping robot movement")
    // Stop robot movement
  }

  if (!connectedMotionGroup) {
    return <div>Loading robot...</div>
  }

  return (
    <RobotCard
      robotName="UR5e Station A"
      programState="idle"
      safetyState="SAFETY_STATE_NORMAL"
      operationMode="OPERATION_MODE_AUTO"
      runtime="2h 45m 12s"
      driveToHomeEnabled={true}
      onDriveToHomePress={handleDriveToHomePress}
      onDriveToHomeRelease={handleDriveToHomeRelease}
      connectedMotionGroup={connectedMotionGroup}
      width="100%"
      height={578}
    />
  )
}
```

## Grid Layout

The component is designed to work well in CSS Grid layouts for multiple robot monitoring:

```tsx
<Box
  sx={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: 3,
  }}
>
  {robots.map((robot) => (
    <RobotCard
      key={robot.id}
      robotName={robot.name}
      programState={robot.state}
      safetyState={robot.safetyState}
      operationMode={robot.operationMode}
      runtime={robot.runtime}
      driveToHomeEnabled={robot.state === "idle"}
      connectedMotionGroup={robot.connectedMotionGroup}
      width="100%"
      height={500}
    />
  ))}
</Box>
```

## Props

| Prop                   | Type                   | Default  | Description                                            |
| ---------------------- | ---------------------- | -------- | ------------------------------------------------------ |
| `robotName`            | `string`               | -        | Name of the robot displayed at the top                 |
| `programState`         | `ProgramState`         | -        | Current program execution state                        |
| `safetyState`          | `SafetyStateType`      | -        | Current safety state of the robot controller           |
| `operationMode`        | `OperationMode`        | -        | Current operation mode of the robot controller         |
| `runtime`              | `string`               | -        | Runtime text to display                                |
| `driveToHomeEnabled`   | `boolean`              | `false`  | Whether the "Drive to Home" button should be enabled   |
| `onDriveToHomePress`   | `() => void`           | -        | Callback fired when "Drive to Home" button is pressed  |
| `onDriveToHomeRelease` | `() => void`           | -        | Callback fired when "Drive to Home" button is released |
| `connectedMotionGroup` | `ConnectedMotionGroup` | -        | Connected motion group from Nova.js                    |
| `className`            | `string`               | -        | Additional CSS class name                              |
| `width`                | `number \| string`     | `"100%"` | Width for the card                                     |
| `height`               | `number \| string`     | `578`    | Height for the card                                    |

## Drive to Home Functionality

The "Drive to Home" button implements press-and-hold behavior:

- **Press**: `onDriveToHomePress` is called when the button is pressed down
- **Hold**: The button remains visually pressed while held
- **Release**: `onDriveToHomeRelease` is called when the button is released

This pattern allows for implementing robot movement that continues only while the user is actively pressing the button, providing a safety mechanism for robot control.

## Resizing

The card is responsive and adapts to its container:

- Uses `width="100%"` by default to fill the container
- Set explicit dimensions when needed
- Minimum dimensions are enforced (300px width, 400px height)
- The 3D viewport and other content scales appropriately

## Robot Transparency

The robot is rendered with semi-transparency (`rgba(255, 255, 255, 0.3)`) to create a subtle, non-intrusive appearance that matches the card's design aesthetic.

## Localization

The component uses these translation keys:

- `RobotCard.Runtime.lb` - "Runtime" label
- `RobotCard.DriveToHome.bt` - "Drive to Home" button text

Add these to your translation files:

```json
{
  "RobotCard.Runtime.lb": "Runtime",
  "RobotCard.DriveToHome.bt": "Drive to Home"
}
```

## Styling

The component follows Material-UI theming and can be customized via the theme:

```tsx
const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          // Custom card styling
        },
      },
    },
  },
})
```

## Performance Considerations

- The 3D viewport is optimized with fixed camera positioning
- The component uses React.memo for the robot visualization
- Consider using virtualization for large numbers of robot cards
