import{i as e}from"./preload-helper-Cs4UwXAW.js";import{Ga as t,d as n,l as r,n as i,o as a}from"./iframe-BvHxi_cZ.js";import{t as o}from"./mdx-react-shim-X3p0ODal.js";import{RobotStory as s,t as c}from"./Robot.stories-B41TiZ7H.js";function l(e){let t={code:`code`,h1:`h1`,p:`p`,pre:`pre`,...n(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a,{title:`3D View/Model Visualization/Robot`}),`
`,(0,d.jsx)(t.h1,{id:`robot`,children:`Robot`}),`
`,(0,d.jsxs)(t.p,{children:[`This `,(0,d.jsx)(t.code,{children:`Robot`}),` component adds the robot to the 3D viewport. Use it together with the `,(0,d.jsx)(t.code,{children:`ConnectedMotionGroup`}),` from this library:`]}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-tsx`,children:`import { NovaClient } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"
import { Robot } from "@wandelbots/wandelbots-js-react-components/3d"

const nova = new NovaClient({ instanceUrl: "https://your-nova-instance.com" })
const connectedMotionGroup = await ConnectedMotionGroup.connect(nova, "0@your-motion-group-id");

<Robot connectedMotionGroup={connectedMotionGroup} />
`})}),`
`,(0,d.jsx)(t.p,{children:`The robot model are loaded from your connected Nova instance.`}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-tsx`,children:`const file = await nova.api.motionGroupModels.getMotionGroupGlbModel(modelFromController)
const url = URL.createObjectURL(file)
return url
`})}),`
`,(0,d.jsxs)(t.p,{children:[`In case you want to use the application offline, you can download the models and host them locally. You can override the URL resolver of the `,(0,d.jsx)(t.code,{children:`Robot`}),` component by passing a `,(0,d.jsx)(t.code,{children:`getModel`}),` function like:`]}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-tsx`,children:`<Robot
  getModel={() => \`public/\${connectedMotionGroup.modelFromController}.glb\`}
  connectedMotionGroup={connectedMotionGroup}
/>
`})}),`
`,(0,d.jsx)(i,{of:s})]})}function u(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(l,{...e})}):l(e)}var d;e((()=>{d=t(),o(),r(),c()}))();export{u as default};