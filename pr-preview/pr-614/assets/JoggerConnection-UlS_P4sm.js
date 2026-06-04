import{j as n,M as s}from"./iframe-Boc2Vj5X.js";import{useMDXComponents as i}from"./index-DAPNWzz5.js";import"./preload-helper-Dp1pzeXC.js";function t(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...i(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(s,{title:"Jogging/JoggerConnection"}),`
`,n.jsx(e.h1,{id:"access-to-motion-groups-and-jogging",children:"Access to Motion Groups and Jogging"}),`
`,n.jsx(e.h2,{id:"connect-to-a-motion-group",children:"Connect to a motion group"}),`
`,n.jsx(e.p,{children:"The library provides an easy to use way to access properties of a motion group."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`import { Nova } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"

const nova = new Nova({ instanceUrl: "nova-instance-url" })
const activeRobot = await ConnectedMotionGroup.connect(nova, "motion-group-id")
`})}),`
`,n.jsxs(e.p,{children:["This connected motion group opens a websocket and listens to changes of the current joints and the TCP pose. You can read out those values by using the ",n.jsx(e.code,{children:"rapidlyChangingMotionState"})," of the object. Along other properties it also provides the current ",n.jsx(e.code,{children:"safetySetup"})," and ",n.jsx(e.code,{children:"tcps"}),"."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`const newJoints = activeRobot.rapidlyChangingMotionState.joint_position
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Api V2 change:"})," Please not that joints are now directly accessible in ",n.jsx(e.code,{children:"rapidlyChangingMotionState.joint_position"}),", previously there were nested in ",n.jsx(e.code,{children:".rapidlyChangingMotionState.state.joint_position.joints"}),"."]}),`
`,n.jsx(e.h2,{id:"joggerconnection",children:"JoggerConnection"}),`
`,n.jsx(e.p,{children:"Jogging in a robotics context generally refers to the manual movement of the robot via direct human input. The Wandelbots platform provides websocket-based jogging methods which can be used to build similar jogging interfaces to those found on teach pendants."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`import { Nova } from "@wandelbots/nova-js/v2"
import { JoggerConnection } from "@wandelbots/wandelbots-js-react-components/core"

const nova = new Nova({ instanceUrl: "nova-instance-url" })
const jogger = await JoggerConnection.open(nova, \`some-motion-group-id\`) // or to set options
// const jogger = await JoggerConnection.open(nova, \`some-motion-group-id\`), options)
`})}),`
`,n.jsx(e.p,{children:`The jogger's mode is set to "off" first. You'll need to set it to "jogging" or "trajectory" to be able to
send movement commands`}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`// Set jogger to "jogging" mode and sends InitializeJoggingRequest to API
await jogger.setJoggingMode("jogging")

// You can update options ater initializing like this:
await jogger.setOptions({
  tcp: "Flange", // TCP id
  timeout: 3000 // How long the promise should wait when server does not respond to init request
  orientation: "tool",
})

// For planned motions, use "trajectory" mode
await jogger.setJoggingMode("trajectory")
await jogger.rotateTCP({...}) // Error: Continuous jogging websocket not connected; ...
await jogger.runIncrementalCartesianMotion({...}) // Plan and run trajectory
`})}),`
`,n.jsx(e.h3,{id:"stopping-the-jogger",children:"Stopping the jogger"}),`
`,n.jsx(e.p,{children:"For safety purposes, let's first consider how to stop the jogger. Calling stop will stop all motion types regardless of mode:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`await jogger.stop()
`})}),`
`,n.jsx(e.p,{children:"As a failsafe, the server will also stop any jogging motions when it detects the relevant websocket has been closed. This means that if e.g. the network connection drops out or the browser tab is closed in the middle of a motion, it will stop automatically."}),`
`,n.jsx(e.p,{children:"However, you should never totally rely on any software being able to stop the robot: always have the hardware emergency stop button within reach just in case!"}),`
`,n.jsxs(e.h3,{id:"jogging-rotating-a-joint-rotatejoints",children:["Jogging: Rotating a joint ",n.jsx(e.code,{children:"rotateJoints"})]}),`
`,n.jsx(e.p,{children:"This example starts joint 0 of the robot rotating in a positive direction at 1 radian per second:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`await jogger.rotateJoints({
  joint: 0,
  direction: "+",
  velocityValue: 0.1,
  velocityUnit: "rad/s",
})
`})}),`
`,n.jsxs(e.h3,{id:"jogging-moving-a-tcp-translatetcp",children:["Jogging: Moving a TCP ",n.jsx(e.code,{children:"translateTCP"})]}),`
`,n.jsx(e.p,{children:"This example starts moving a TCP in a positive direction along the X axis of the specified coordinate system, at a velocity of 10 millimeters per second:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`await jogger.translateTCP({
  axis: "x",
  direction: "+",
  velocityMmPerSec: 10,
})
`})}),`
`,n.jsxs(e.h3,{id:"jogging-rotating-a-tcp-rotatetcp",children:["Jogging: Rotating a TCP ",n.jsx(e.code,{children:"rotateTCP"})]}),`
`,n.jsx(e.p,{children:"This example starts rotating the TCP in a positive direction around the X axis of the specified coordinate system, at a velocity of 1 radians per second:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`await jogger.rotateTCP({
  axis: "x",
  direction: "+",
  velocityRadsPerSec: 1,
})
`})}),`
`,n.jsxs(e.h3,{id:"trajectory-plan-and-run-incremental-motion-runincrementalcartesianmotion",children:["Trajectory: Plan and run incremental motion ",n.jsx(e.code,{children:"runIncrementalCartesianMotion"})]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`await jogger.runIncrementalCartesianMotion({...})
`})}),`
`,n.jsx(e.h3,{id:"post-jogging-cleanup",children:"Post-jogging cleanup"}),`
`,n.jsx(e.p,{children:"When you are done with a jogger, make sure to call dispose:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`await jogger.dispose()
`})}),`
`,n.jsx(e.p,{children:"This will close any open websockets and ensure things are left in a good state."})]})}function g(o={}){const{wrapper:e}={...i(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(t,{...o})}):t(o)}export{g as default};
