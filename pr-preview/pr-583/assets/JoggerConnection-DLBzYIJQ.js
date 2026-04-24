import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-BwbqkF8g.js";import{Ma as n,l as r,o as i}from"./iframe-B6q2Ff5u.js";import{t as a}from"./mdx-react-shim-DrK5xiHK.js";function o(e){let n={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i,{title:`Jogging/JoggerConnection`}),`
`,(0,c.jsx)(n.h1,{id:`access-to-motion-groups-and-jogging`,children:`Access to Motion Groups and Jogging`}),`
`,(0,c.jsx)(n.h2,{id:`connect-to-a-motion-group`,children:`Connect to a motion group`}),`
`,(0,c.jsx)(n.p,{children:`The library provides an easy to use way to access properties of a motion group.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`import { NovaClient } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"

const nova = new NovaClient({ instanceUrl: "nova-instance-url" })
const activeRobot = await ConnectedMotionGroup.connect(nova, "motion-group-id")
`})}),`
`,(0,c.jsxs)(n.p,{children:[`This connected motion group opens a websocket and listens to changes of the current joints and the TCP pose. You can read out those values by using the `,(0,c.jsx)(n.code,{children:`rapidlyChangingMotionState`}),` of the object. Along other properties it also provides the current `,(0,c.jsx)(n.code,{children:`safetySetup`}),` and `,(0,c.jsx)(n.code,{children:`tcps`}),`.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`const newJoints = activeRobot.rapidlyChangingMotionState.joint_position
`})}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Api V2 change:`}),` Please not that joints are now directly accessible in `,(0,c.jsx)(n.code,{children:`rapidlyChangingMotionState.joint_position`}),`, previously there were nested in `,(0,c.jsx)(n.code,{children:`.rapidlyChangingMotionState.state.joint_position.joints`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`joggerconnection`,children:`JoggerConnection`}),`
`,(0,c.jsx)(n.p,{children:`Jogging in a robotics context generally refers to the manual movement of the robot via direct human input. The Wandelbots platform provides websocket-based jogging methods which can be used to build similar jogging interfaces to those found on teach pendants.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`import { NovaClient } from "@wandelbots/nova-js/v2"
import { JoggerConnection } from "@wandelbots/wandelbots-js-react-components/core"

const nova = new NovaClient({ instanceUrl: "nova-instance-url" })
const jogger = await JoggerConnection.open(nova, \`some-motion-group-id\`) // or to set options
// const jogger = await JoggerConnection.open(nova, \`some-motion-group-id\`), options)
`})}),`
`,(0,c.jsx)(n.p,{children:`The jogger's mode is set to "off" first. You'll need to set it to "jogging" or "trajectory" to be able to
send movement commands`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`// Set jogger to "jogging" mode and sends InitializeJoggingRequest to API
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
`,(0,c.jsx)(n.h3,{id:`stopping-the-jogger`,children:`Stopping the jogger`}),`
`,(0,c.jsx)(n.p,{children:`For safety purposes, let's first consider how to stop the jogger. Calling stop will stop all motion types regardless of mode:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`await jogger.stop()
`})}),`
`,(0,c.jsx)(n.p,{children:`As a failsafe, the server will also stop any jogging motions when it detects the relevant websocket has been closed. This means that if e.g. the network connection drops out or the browser tab is closed in the middle of a motion, it will stop automatically.`}),`
`,(0,c.jsx)(n.p,{children:`However, you should never totally rely on any software being able to stop the robot: always have the hardware emergency stop button within reach just in case!`}),`
`,(0,c.jsxs)(n.h3,{id:`jogging-rotating-a-joint-rotatejoints`,children:[`Jogging: Rotating a joint `,(0,c.jsx)(n.code,{children:`rotateJoints`})]}),`
`,(0,c.jsx)(n.p,{children:`This example starts joint 0 of the robot rotating in a positive direction at 1 radian per second:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`await jogger.rotateJoints({
  joint: 0,
  direction: "+",
  velocityValue: 0.1,
  velocityUnit: "rad/s",
})
`})}),`
`,(0,c.jsxs)(n.h3,{id:`jogging-moving-a-tcp-translatetcp`,children:[`Jogging: Moving a TCP `,(0,c.jsx)(n.code,{children:`translateTCP`})]}),`
`,(0,c.jsx)(n.p,{children:`This example starts moving a TCP in a positive direction along the X axis of the specified coordinate system, at a velocity of 10 millimeters per second:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`await jogger.translateTCP({
  axis: "x",
  direction: "+",
  velocityMmPerSec: 10,
})
`})}),`
`,(0,c.jsxs)(n.h3,{id:`jogging-rotating-a-tcp-rotatetcp`,children:[`Jogging: Rotating a TCP `,(0,c.jsx)(n.code,{children:`rotateTCP`})]}),`
`,(0,c.jsx)(n.p,{children:`This example starts rotating the TCP in a positive direction around the X axis of the specified coordinate system, at a velocity of 1 radians per second:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`await jogger.rotateTCP({
  axis: "x",
  direction: "+",
  velocityRadsPerSec: 1,
})
`})}),`
`,(0,c.jsxs)(n.h3,{id:`trajectory-plan-and-run-incremental-motion-runincrementalcartesianmotion`,children:[`Trajectory: Plan and run incremental motion `,(0,c.jsx)(n.code,{children:`runIncrementalCartesianMotion`})]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`await jogger.runIncrementalCartesianMotion({...})
`})}),`
`,(0,c.jsx)(n.h3,{id:`post-jogging-cleanup`,children:`Post-jogging cleanup`}),`
`,(0,c.jsx)(n.p,{children:`When you are done with a jogger, make sure to call dispose:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`await jogger.dispose()
`})}),`
`,(0,c.jsx)(n.p,{children:`This will close any open websockets and ensure things are left in a good state.`})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=n(),a(),r()}))();export{s as default};