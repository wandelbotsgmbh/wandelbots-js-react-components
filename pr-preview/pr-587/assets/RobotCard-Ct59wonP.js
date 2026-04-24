import{j as e,M as r}from"./iframe-CtlxfIm5.js";import{useMDXComponents as i}from"./index-Dfa7621Y.js";import"./preload-helper-Dp1pzeXC.js";function t(o){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Components/RobotCard/Usage Docs"}),`
`,e.jsx(n.h1,{id:"robotcard",children:"RobotCard"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"RobotCard"})," component is a responsive card that displays a 3D robot with states and controls, designed for multi-robot monitoring interfaces."]}),`
`,e.jsx(n.h2,{id:"features",children:"Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive Material-UI Card"})," that adapts to container size"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Robot name display"})," in Typography h6 at top-left"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Program state indicator"})," showing current execution state combined with safety and operation modes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Semi-transparent 3D robot model"})," in the center with no camera movements for consistent viewing"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Runtime display"})," with Inter font family styling (16px, 400 weight, 150% line height, 0.15px letter spacing)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Compact cycle time component"})," using small variant"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Transparent gray divider"})," line for visual separation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:'"Drive to Home" button'})," with press-and-hold functionality"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Localization support"})," via react-i18next"]}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Material-UI theming integration"})}),`
`]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { RobotCard } from "@wandelbots/wandelbots-js-react-components/3d"
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
`,e.jsx(n.h2,{id:"grid-layout",children:"Grid Layout"}),`
`,e.jsx(n.p,{children:"The component is designed to work well in CSS Grid layouts for multiple robot monitoring:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Box
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
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop                   | Type                   | Default  | Description                                            |
| ---------------------- | ---------------------- | -------- | ------------------------------------------------------ |
| `,e.jsx(n.code,{children:"robotName"}),"            | ",e.jsx(n.code,{children:"string"}),`               | -        | Name of the robot displayed at the top                 |
| `,e.jsx(n.code,{children:"programState"}),"         | ",e.jsx(n.code,{children:"ProgramState"}),`         | -        | Current program execution state                        |
| `,e.jsx(n.code,{children:"safetyState"}),"          | ",e.jsx(n.code,{children:"SafetyStateType"}),`      | -        | Current safety state of the robot controller           |
| `,e.jsx(n.code,{children:"operationMode"}),"        | ",e.jsx(n.code,{children:"OperationMode"}),`        | -        | Current operation mode of the robot controller         |
| `,e.jsx(n.code,{children:"runtime"}),"              | ",e.jsx(n.code,{children:"string"}),`               | -        | Runtime text to display                                |
| `,e.jsx(n.code,{children:"driveToHomeEnabled"}),"   | ",e.jsx(n.code,{children:"boolean"}),"              | ",e.jsx(n.code,{children:"false"}),`  | Whether the "Drive to Home" button should be enabled   |
| `,e.jsx(n.code,{children:"onDriveToHomePress"}),"   | ",e.jsx(n.code,{children:"() => void"}),`           | -        | Callback fired when "Drive to Home" button is pressed  |
| `,e.jsx(n.code,{children:"onDriveToHomeRelease"})," | ",e.jsx(n.code,{children:"() => void"}),`           | -        | Callback fired when "Drive to Home" button is released |
| `,e.jsx(n.code,{children:"connectedMotionGroup"})," | ",e.jsx(n.code,{children:"ConnectedMotionGroup"}),` | -        | Connected motion group from Nova.js                    |
| `,e.jsx(n.code,{children:"className"}),"            | ",e.jsx(n.code,{children:"string"}),`               | -        | Additional CSS class name                              |
| `,e.jsx(n.code,{children:"width"}),"                | ",e.jsx(n.code,{children:"number \\| string"}),"     | ",e.jsx(n.code,{children:'"100%"'}),` | Width for the card                                     |
| `,e.jsx(n.code,{children:"height"}),"               | ",e.jsx(n.code,{children:"number \\| string"}),"     | ",e.jsx(n.code,{children:"578"}),"    | Height for the card                                    |"]}),`
`,e.jsx(n.h2,{id:"drive-to-home-functionality",children:"Drive to Home Functionality"}),`
`,e.jsx(n.p,{children:'The "Drive to Home" button implements press-and-hold behavior:'}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Press"}),": ",e.jsx(n.code,{children:"onDriveToHomePress"})," is called when the button is pressed down"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hold"}),": The button remains visually pressed while held"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Release"}),": ",e.jsx(n.code,{children:"onDriveToHomeRelease"})," is called when the button is released"]}),`
`]}),`
`,e.jsx(n.p,{children:"This pattern allows for implementing robot movement that continues only while the user is actively pressing the button, providing a safety mechanism for robot control."}),`
`,e.jsx(n.h2,{id:"resizing",children:"Resizing"}),`
`,e.jsx(n.p,{children:"The card is responsive and adapts to its container:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Uses ",e.jsx(n.code,{children:'width="100%"'})," by default to fill the container"]}),`
`,e.jsx(n.li,{children:"Set explicit dimensions when needed"}),`
`,e.jsx(n.li,{children:"Minimum dimensions are enforced (300px width, 400px height)"}),`
`,e.jsx(n.li,{children:"The 3D viewport and other content scales appropriately"}),`
`]}),`
`,e.jsx(n.h2,{id:"robot-transparency",children:"Robot Transparency"}),`
`,e.jsxs(n.p,{children:["The robot is rendered with semi-transparency (",e.jsx(n.code,{children:"rgba(255, 255, 255, 0.3)"}),") to create a subtle, non-intrusive appearance that matches the card's design aesthetic."]}),`
`,e.jsx(n.h2,{id:"localization",children:"Localization"}),`
`,e.jsx(n.p,{children:"The component uses these translation keys:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"RobotCard.Runtime.lb"}),' - "Runtime" label']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"RobotCard.DriveToHome.bt"}),' - "Drive to Home" button text']}),`
`]}),`
`,e.jsx(n.p,{children:"Add these to your translation files:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
  "RobotCard.Runtime.lb": "Runtime",
  "RobotCard.DriveToHome.bt": "Drive to Home"
}
`})}),`
`,e.jsx(n.h2,{id:"styling",children:"Styling"}),`
`,e.jsx(n.p,{children:"The component follows Material-UI theming and can be customized via the theme:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`const theme = createTheme({
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
`,e.jsx(n.h2,{id:"performance-considerations",children:"Performance Considerations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The 3D viewport is optimized with fixed camera positioning"}),`
`,e.jsx(n.li,{children:"The component uses React.memo for the robot visualization"}),`
`,e.jsx(n.li,{children:"Consider using virtualization for large numbers of robot cards"}),`
`]})]})}function a(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{a as default};
