import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-BwbqkF8g.js";import{Ma as n,c as r,l as i,o as a}from"./iframe-B6q2Ff5u.js";import{t as o}from"./mdx-react-shim-DrK5xiHK.js";import{Default as s,n as c,t as l}from"./JoggingPanel.stories-BBC8nqzl.js";function u(e){let n={a:`a`,code:`code`,h1:`h1`,p:`p`,pre:`pre`,...t(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a,{of:l}),`
`,(0,f.jsx)(n.h1,{id:`jogging-panel`,children:`Jogging Panel`}),`
`,(0,f.jsxs)(n.p,{children:[`The `,(0,f.jsx)(n.code,{children:`JoggingPanel`}),` is a high-level user interface for manually moving a robot using the Wandelbots stack. It needs only a `,(0,f.jsx)(n.code,{children:`NovaClient`}),` instance from `,(0,f.jsx)(n.a,{href:`https://github.com/wandelbotsgmbh/nova-js`,rel:`nofollow`,children:`@wandelbots/nova-js/v2`}),` and the id of a motion group to connect to.
It can be used to quickly create a jogging panel to control a robot. It `,(0,f.jsx)(n.code,{children:`automatically detects`}),` the `,(0,f.jsx)(n.code,{children:`type of Joint`}),` and displays the correct controls for it. Joints can rotate or translate. The `,(0,f.jsx)(n.code,{children:`JoggingStore`}),` uses the `,(0,f.jsx)(n.code,{children:`inverseSolver`}),` and `,(0,f.jsx)(n.code,{children:`jointType`}),` fetched from the API to determine the correct jogging controls and tabs.`]}),`
`,(0,f.jsx)(n.pre,{children:(0,f.jsx)(n.code,{className:`language-tsx`,children:`import { NovaClient } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"

const connectedMotionGroup = ConnectedMotionGroup.connect(nova, motionGroupId)

<JoggingPanel
  nova={wandelApp.nova}
  motionGroupId={connectedMotionGroup.motionGroupId}
/>
`})}),`
`,(0,f.jsx)(r,{of:s})]})}function d(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,f.jsx)(n,{...e,children:(0,f.jsx)(u,{...e})}):u(e)}var f;e((()=>{f=n(),o(),i(),c()}))();export{d as default};