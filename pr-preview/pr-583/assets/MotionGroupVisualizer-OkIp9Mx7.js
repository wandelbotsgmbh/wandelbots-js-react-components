import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-BwbqkF8g.js";import{Ma as n,l as r,n as i,o as a}from"./iframe-B6q2Ff5u.js";import{t as o}from"./mdx-react-shim-DrK5xiHK.js";import{MotionGroupVisualizerStory as s,t as c}from"./MotionGroupVisualizer.stories-oxSWNKW_.js";function l(e){let n={code:`code`,h1:`h1`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a,{title:`3D View/Model Visualization/MotionGroupVisualizer`}),`
`,(0,d.jsx)(n.h1,{id:`motiongroupvisualizer`,children:`MotionGroupVisualizer`}),`
`,(0,d.jsxs)(n.p,{children:[`This `,(0,d.jsx)(n.code,{children:`MotionGroupVisualizer`}),` component adds the robot or linear axis to the 3D viewport. It can be used on top of a robot or linear axis if we want to include the internal differentiation of what should be rendered.`]}),`
`,(0,d.jsxs)(n.p,{children:[`The differentiation is dependent on the `,(0,d.jsx)(n.code,{children:`inverseSolver`}),` and `,(0,d.jsx)(n.code,{children:`dhParameters`}),` variables, which must be passed as a prop:`]}),`
`,(0,d.jsxs)(n.ul,{children:[`
`,(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:`dhParameters`}),` have to include the `,(0,d.jsx)(n.code,{children:`type`}),` attribute, that determines, which joint type is supported by the deliver model`]}),`
`,(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:`inverseSolver`}),` set (e.g. string): `,(0,d.jsx)(n.code,{children:`SupportedRobot`}),` component is returned.`]}),`
`,(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:`inverseSolver`}),` null: `,(0,d.jsx)(n.code,{children:`SupportedLinearAxis`}),` component is returned.`]}),`
`,(0,d.jsxs)(n.li,{children:[`Note: If `,(0,d.jsx)(n.code,{children:`inverseSolver`}),` is null but the first joint is a `,(0,d.jsx)(n.code,{children:`RevoluteJoint`}),`, it is treated as a turntable and `,(0,d.jsx)(n.code,{children:`SupportedRobot`}),` is returned`]}),`
`]}),`
`,(0,d.jsxs)(n.p,{children:[`Use it together with the `,(0,d.jsx)(n.code,{children:`ConnectedMotionGroup`}),` from this library:`]}),`
`,(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:`language-tsx`,children:`import { NovaClient } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"
import { MotionGroupVisualizer } from "@wandelbots/wandelbots-js-react-components/3d"

const instanceUrl = "https://your-nova-instance.com"
const nova = new NovaClient({ instanceUrl })
const connectedMotionGroup = await ConnectedMotionGroup.connect(nova, "0@your-motion-group-id");

const { inverse_solver } = await nova.api.motionGroupModels.getMotionGroupKinematicModel(connectedMotionGroup.modelFromController)

<MotionGroupVisualizer
  instanceUrl={instanceUrl}
  modelFromController={connectedMotionGroup.modelFromController}
  rapidlyChangingMotionState={connectedMotionGroup.rapidlyChangingMotionState}
  dhParameters={connectedMotionGroup.dhParameters ?? []}
  inverseSolver={inverse_solver}
/>
`})}),`
`,(0,d.jsx)(n.p,{children:`The model files are loaded from your connected Nova instance.`}),`
`,(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:`language-tsx`,children:`const file = await nova.api.motionGroupModels.getMotionGroupGlbModel(modelFromController)
const url = URL.createObjectURL(file)
return url
`})}),`
`,(0,d.jsxs)(n.p,{children:[`In case you want to use the application offline, you can download the models and host them locally. You can override the URL resolver of the `,(0,d.jsx)(n.code,{children:`MotionGroupVisualizer`}),` component by passing a `,(0,d.jsx)(n.code,{children:`getModel`}),` function like:`]}),`
`,(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:`language-tsx`,children:`<MotionGroupVisualizer
  instanceUrl={instanceUrl}
  modelFromController={connectedMotionGroup.modelFromController}
  rapidlyChangingMotionState={connectedMotionGroup.rapidlyChangingMotionState}
  dhParameters={connectedMotionGroup.dhParameters ?? []}
  inverseSolver={inverse_solver}
  getModel={() => \`public/\${connectedMotionGroup.modelFromController}.glb\`}
/>
`})}),`
`,(0,d.jsx)(i,{of:s})]})}function u(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(l,{...e})}):l(e)}var d;e((()=>{d=n(),o(),r(),c()}))();export{u as default};