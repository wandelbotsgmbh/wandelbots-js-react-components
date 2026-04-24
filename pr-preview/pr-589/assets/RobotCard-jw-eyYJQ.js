import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-CMbDIWTY.js";import{Ma as n,l as r,o as i}from"./iframe-BYoHjiUl.js";import{t as a}from"./mdx-react-shim-Dat_waQX.js";function o(e){let n={code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i,{title:`Components/RobotCard/Usage Docs`}),`
`,(0,c.jsx)(n.h1,{id:`robotcard`,children:`RobotCard`}),`
`,(0,c.jsxs)(n.p,{children:[`The `,(0,c.jsx)(n.code,{children:`RobotCard`}),` component is a responsive card that displays a 3D robot with states and controls, designed for multi-robot monitoring interfaces.`]}),`
`,(0,c.jsx)(n.h2,{id:`features`,children:`Features`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Responsive Material-UI Card`}),` that adapts to container size`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Robot name display`}),` in Typography h6 at top-left`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Program state indicator`}),` showing current execution state combined with safety and operation modes`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Semi-transparent 3D robot model`}),` in the center with no camera movements for consistent viewing`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Runtime display`}),` with Inter font family styling (16px, 400 weight, 150% line height, 0.15px letter spacing)`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Compact cycle time component`}),` using small variant`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Transparent gray divider`}),` line for visual separation`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`"Drive to Home" button`}),` with press-and-hold functionality`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Localization support`}),` via react-i18next`]}),`
`,(0,c.jsx)(n.li,{children:(0,c.jsx)(n.strong,{children:`Material-UI theming integration`})}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`import { RobotCard } from "@wandelbots/wandelbots-js-react-components/3d"
import { NovaClient } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"

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
`})}),`
`,(0,c.jsx)(n.h2,{id:`grid-layout`,children:`Grid Layout`}),`
`,(0,c.jsx)(n.p,{children:`The component is designed to work well in CSS Grid layouts for multiple robot monitoring:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`<Box
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
`})}),`
`,(0,c.jsx)(n.h2,{id:`props`,children:`Props`}),`
`,(0,c.jsxs)(n.p,{children:[`| Prop                   | Type                   | Default  | Description                                            |
| ---------------------- | ---------------------- | -------- | ------------------------------------------------------ |
| `,(0,c.jsx)(n.code,{children:`robotName`}),`            | `,(0,c.jsx)(n.code,{children:`string`}),`               | -        | Name of the robot displayed at the top                 |
| `,(0,c.jsx)(n.code,{children:`programState`}),`         | `,(0,c.jsx)(n.code,{children:`ProgramState`}),`         | -        | Current program execution state                        |
| `,(0,c.jsx)(n.code,{children:`safetyState`}),`          | `,(0,c.jsx)(n.code,{children:`SafetyStateType`}),`      | -        | Current safety state of the robot controller           |
| `,(0,c.jsx)(n.code,{children:`operationMode`}),`        | `,(0,c.jsx)(n.code,{children:`OperationMode`}),`        | -        | Current operation mode of the robot controller         |
| `,(0,c.jsx)(n.code,{children:`runtime`}),`              | `,(0,c.jsx)(n.code,{children:`string`}),`               | -        | Runtime text to display                                |
| `,(0,c.jsx)(n.code,{children:`driveToHomeEnabled`}),`   | `,(0,c.jsx)(n.code,{children:`boolean`}),`              | `,(0,c.jsx)(n.code,{children:`false`}),`  | Whether the "Drive to Home" button should be enabled   |
| `,(0,c.jsx)(n.code,{children:`onDriveToHomePress`}),`   | `,(0,c.jsx)(n.code,{children:`() => void`}),`           | -        | Callback fired when "Drive to Home" button is pressed  |
| `,(0,c.jsx)(n.code,{children:`onDriveToHomeRelease`}),` | `,(0,c.jsx)(n.code,{children:`() => void`}),`           | -        | Callback fired when "Drive to Home" button is released |
| `,(0,c.jsx)(n.code,{children:`connectedMotionGroup`}),` | `,(0,c.jsx)(n.code,{children:`ConnectedMotionGroup`}),` | -        | Connected motion group from Nova.js                    |
| `,(0,c.jsx)(n.code,{children:`className`}),`            | `,(0,c.jsx)(n.code,{children:`string`}),`               | -        | Additional CSS class name                              |
| `,(0,c.jsx)(n.code,{children:`width`}),`                | `,(0,c.jsx)(n.code,{children:`number \\| string`}),`     | `,(0,c.jsx)(n.code,{children:`"100%"`}),` | Width for the card                                     |
| `,(0,c.jsx)(n.code,{children:`height`}),`               | `,(0,c.jsx)(n.code,{children:`number \\| string`}),`     | `,(0,c.jsx)(n.code,{children:`578`}),`    | Height for the card                                    |`]}),`
`,(0,c.jsx)(n.h2,{id:`drive-to-home-functionality`,children:`Drive to Home Functionality`}),`
`,(0,c.jsx)(n.p,{children:`The "Drive to Home" button implements press-and-hold behavior:`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Press`}),`: `,(0,c.jsx)(n.code,{children:`onDriveToHomePress`}),` is called when the button is pressed down`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Hold`}),`: The button remains visually pressed while held`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Release`}),`: `,(0,c.jsx)(n.code,{children:`onDriveToHomeRelease`}),` is called when the button is released`]}),`
`]}),`
`,(0,c.jsx)(n.p,{children:`This pattern allows for implementing robot movement that continues only while the user is actively pressing the button, providing a safety mechanism for robot control.`}),`
`,(0,c.jsx)(n.h2,{id:`resizing`,children:`Resizing`}),`
`,(0,c.jsx)(n.p,{children:`The card is responsive and adapts to its container:`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Uses `,(0,c.jsx)(n.code,{children:`width="100%"`}),` by default to fill the container`]}),`
`,(0,c.jsx)(n.li,{children:`Set explicit dimensions when needed`}),`
`,(0,c.jsx)(n.li,{children:`Minimum dimensions are enforced (300px width, 400px height)`}),`
`,(0,c.jsx)(n.li,{children:`The 3D viewport and other content scales appropriately`}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`robot-transparency`,children:`Robot Transparency`}),`
`,(0,c.jsxs)(n.p,{children:[`The robot is rendered with semi-transparency (`,(0,c.jsx)(n.code,{children:`rgba(255, 255, 255, 0.3)`}),`) to create a subtle, non-intrusive appearance that matches the card's design aesthetic.`]}),`
`,(0,c.jsx)(n.h2,{id:`localization`,children:`Localization`}),`
`,(0,c.jsx)(n.p,{children:`The component uses these translation keys:`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`RobotCard.Runtime.lb`}),` - "Runtime" label`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`RobotCard.DriveToHome.bt`}),` - "Drive to Home" button text`]}),`
`]}),`
`,(0,c.jsx)(n.p,{children:`Add these to your translation files:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-json`,children:`{
  "RobotCard.Runtime.lb": "Runtime",
  "RobotCard.DriveToHome.bt": "Drive to Home"
}
`})}),`
`,(0,c.jsx)(n.h2,{id:`styling`,children:`Styling`}),`
`,(0,c.jsx)(n.p,{children:`The component follows Material-UI theming and can be customized via the theme:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`const theme = createTheme({
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
`})}),`
`,(0,c.jsx)(n.h2,{id:`performance-considerations`,children:`Performance Considerations`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`The 3D viewport is optimized with fixed camera positioning`}),`
`,(0,c.jsx)(n.li,{children:`The component uses React.memo for the robot visualization`}),`
`,(0,c.jsx)(n.li,{children:`Consider using virtualization for large numbers of robot cards`}),`
`]})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=n(),a(),r()}))();export{s as default};