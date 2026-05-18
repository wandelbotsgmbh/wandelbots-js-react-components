import{i as e}from"./preload-helper-Cs4UwXAW.js";import{Ga as t,c as n,d as r,l as i,o as a}from"./iframe-BvHxi_cZ.js";import{t as o}from"./mdx-react-shim-X3p0ODal.js";import{Default as s,n as c,t as l}from"./JoggingPanel.stories-DtpHpHRt.js";function u(e){let t={a:`a`,code:`code`,h1:`h1`,p:`p`,pre:`pre`,...r(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a,{of:l}),`
`,(0,f.jsx)(t.h1,{id:`jogging-panel`,children:`Jogging Panel`}),`
`,(0,f.jsxs)(t.p,{children:[`The `,(0,f.jsx)(t.code,{children:`JoggingPanel`}),` is a high-level user interface for manually moving a robot using the Wandelbots stack. It needs only a `,(0,f.jsx)(t.code,{children:`NovaClient`}),` instance from `,(0,f.jsx)(t.a,{href:`https://github.com/wandelbotsgmbh/nova-js`,rel:`nofollow`,children:`@wandelbots/nova-js/v2`}),` and the id of a motion group to connect to.
It can be used to quickly create a jogging panel to control a robot. It `,(0,f.jsx)(t.code,{children:`automatically detects`}),` the `,(0,f.jsx)(t.code,{children:`type of Joint`}),` and displays the correct controls for it. Joints can rotate or translate. The `,(0,f.jsx)(t.code,{children:`JoggingStore`}),` uses the `,(0,f.jsx)(t.code,{children:`inverseSolver`}),` and `,(0,f.jsx)(t.code,{children:`jointType`}),` fetched from the API to determine the correct jogging controls and tabs.`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-tsx`,children:`import { NovaClient } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"

const connectedMotionGroup = ConnectedMotionGroup.connect(nova, motionGroupId)

<JoggingPanel
  nova={wandelApp.nova}
  motionGroupId={connectedMotionGroup.motionGroupId}
/>
`})}),`
`,(0,f.jsx)(n,{of:s})]})}function d(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(u,{...e})}):u(e)}var f;e((()=>{f=t(),o(),i(),c()}))();export{d as default};