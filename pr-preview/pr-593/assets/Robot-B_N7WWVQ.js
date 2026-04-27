import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-D_7OwatM.js";import{Ma as n,l as r,n as i,o as a}from"./iframe-DpqMHKse.js";import{t as o}from"./mdx-react-shim-KhjDAwK7.js";import{RobotStory as s,t as c}from"./Robot.stories-CeAFdU8u.js";function l(e){let n={code:`code`,h1:`h1`,p:`p`,pre:`pre`,...t(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a,{title:`3D View/Model Visualization/Robot`}),`
`,(0,d.jsx)(n.h1,{id:`robot`,children:`Robot`}),`
`,(0,d.jsxs)(n.p,{children:[`This `,(0,d.jsx)(n.code,{children:`Robot`}),` component adds the robot to the 3D viewport. Use it together with the `,(0,d.jsx)(n.code,{children:`ConnectedMotionGroup`}),` from this library:`]}),`
`,(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:`language-tsx`,children:`import { NovaClient } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"
import { Robot } from "@wandelbots/wandelbots-js-react-components/3d"

const nova = new NovaClient({ instanceUrl: "https://your-nova-instance.com" })
const connectedMotionGroup = await ConnectedMotionGroup.connect(nova, "0@your-motion-group-id");

<Robot connectedMotionGroup={connectedMotionGroup} />
`})}),`
`,(0,d.jsx)(n.p,{children:`The robot model are loaded from your connected Nova instance.`}),`
`,(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:`language-tsx`,children:`const file = await nova.api.motionGroupModels.getMotionGroupGlbModel(modelFromController)
const url = URL.createObjectURL(file)
return url
`})}),`
`,(0,d.jsxs)(n.p,{children:[`In case you want to use the application offline, you can download the models and host them locally. You can override the URL resolver of the `,(0,d.jsx)(n.code,{children:`Robot`}),` component by passing a `,(0,d.jsx)(n.code,{children:`getModel`}),` function like:`]}),`
`,(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:`language-tsx`,children:`<Robot
  getModel={() => \`public/\${connectedMotionGroup.modelFromController}.glb\`}
  connectedMotionGroup={connectedMotionGroup}
/>
`})}),`
`,(0,d.jsx)(i,{of:s})]})}function u(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(l,{...e})}):l(e)}var d;e((()=>{d=n(),o(),r(),c()}))();export{u as default};