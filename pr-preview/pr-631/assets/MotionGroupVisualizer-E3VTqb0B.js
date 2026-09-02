import{j as e,M as i,C as s}from"./iframe-DVABygGB.js";import{useMDXComponents as r}from"./index-FD8o0OGF.js";import{MotionGroupVisualizerStory as l}from"./MotionGroupVisualizer.stories-DKbe-ivS.js";import"./preload-helper-Dp1pzeXC.js";import"./PresetEnvironment-DMCXqA6a.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./with-selector--2e-UPNk.js";import"./index-Bb8JjhAW.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./robotStoryConfig-B41MKTPt.js";import"./hooks-DOG0M4p0.js";import"./mobx.esm-D1cTsgoC.js";import"./Line-Cx_E6mRA.js";import"./externalizeComponent-B2-IdwDO.js";import"./context-BXUSAXvA.js";import"./interpolation-_RocZlIx.js";import"./ConnectedMotionGroup-BXtVF8Hb.js";import"./novaCompat-2dTa2FyQ.js";function t(n){const o={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"3D View/Model Visualization/MotionGroupVisualizer"}),`
`,e.jsx(o.h1,{id:"motiongroupvisualizer",children:"MotionGroupVisualizer"}),`
`,e.jsxs(o.p,{children:["This ",e.jsx(o.code,{children:"MotionGroupVisualizer"})," component adds the robot or linear axis to the 3D viewport. It can be used on top of a robot or linear axis if we want to include the internal differentiation of what should be rendered."]}),`
`,e.jsxs(o.p,{children:["The differentiation is dependent on the ",e.jsx(o.code,{children:"inverseSolver"})," and ",e.jsx(o.code,{children:"dhParameters"})," variables, which must be passed as a prop:"]}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"dhParameters"})," have to include the ",e.jsx(o.code,{children:"type"})," attribute, that determines, which joint type is supported by the deliver model"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"inverseSolver"})," set (e.g. string): ",e.jsx(o.code,{children:"SupportedRobot"})," component is returned."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"inverseSolver"})," null: ",e.jsx(o.code,{children:"SupportedLinearAxis"})," component is returned."]}),`
`,e.jsxs(o.li,{children:["Note: If ",e.jsx(o.code,{children:"inverseSolver"})," is null but the first joint is a ",e.jsx(o.code,{children:"RevoluteJoint"}),", it is treated as a turntable and ",e.jsx(o.code,{children:"SupportedRobot"})," is returned"]}),`
`]}),`
`,e.jsxs(o.p,{children:["Use it together with the ",e.jsx(o.code,{children:"ConnectedMotionGroup"})," from this library:"]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-tsx",children:`import { Nova } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"
import { MotionGroupVisualizer } from "@wandelbots/wandelbots-js-react-components/3d"

const instanceUrl = "https://your-nova-instance.com"
const nova = new Nova({ instanceUrl })
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
`,e.jsx(o.p,{children:"The model files are loaded from your connected Nova instance."}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-tsx",children:`const file = await nova.api.motionGroupModels.getMotionGroupGlbModel(modelFromController)
const url = URL.createObjectURL(file)
return url
`})}),`
`,e.jsxs(o.p,{children:["In case you want to use the application offline, you can download the models and host them locally. You can override the URL resolver of the ",e.jsx(o.code,{children:"MotionGroupVisualizer"})," component by passing a ",e.jsx(o.code,{children:"getModel"})," function like:"]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-tsx",children:`<MotionGroupVisualizer
  instanceUrl={instanceUrl}
  modelFromController={connectedMotionGroup.modelFromController}
  rapidlyChangingMotionState={connectedMotionGroup.rapidlyChangingMotionState}
  dhParameters={connectedMotionGroup.dhParameters ?? []}
  inverseSolver={inverse_solver}
  getModel={() => \`public/\${connectedMotionGroup.modelFromController}.glb\`}
/>
`})}),`
`,e.jsx(s,{of:l})]})}function V(n={}){const{wrapper:o}={...r(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(t,{...n})}):t(n)}export{V as default};
